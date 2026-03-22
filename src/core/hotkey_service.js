/**
 * Hotkey Service - Handles data fetching and parsing from hotkeycheatsheet.com
 */

const slashCommandManager = require('./slash_command_manager.js');
const sqliteService = require('../infrastructure/sqlite_service.js');


class HotkeyCheatsheetParser {
  /**
   * Parse the HTML content from hotkeycheatsheet.com
   * @param {string} htmlContent 
   * @returns {Promise<Array>}
   */
  async parseAppList(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    const apps = [];

    // Strategy 1: DOM parsing with SVG/Background-Image extraction
    const cards = doc.querySelectorAll('a[href*="/hotkey-cheatsheet/"]');
    
    for (const card of cards) {
      try {
        const nameEl = card.querySelector('h3, h2, p, strong, .text-lg, .font-bold') || card;
        const name = nameEl.textContent.trim();
        if (name.length < 2 || name.includes('更多') || name.includes('View all')) continue;

        const href = card.getAttribute('href');
        if (!href) continue;
        const id = href.split('/').filter(p => !!p).pop().split('?')[0];

        // Extract hotkeys count
        const countEl = card.querySelector('p');
        let hotkeysCount = 0;
        let countText = '';
        if (countEl && countEl !== nameEl) {
          countText = countEl.textContent.trim();
          const match = countText.match(/(\d+)/);
          if (match) hotkeysCount = parseInt(match[1]);
        }

        // Extract Icon
        let icon = null;
        // Check for SVG
        const svgEl = card.querySelector('svg');
        if (svgEl) {
          icon = this.svgToBase64(svgEl.outerHTML);
        }
        
        // Check for background-image in style
        if (!icon) {
          const divWithStyle = card.querySelector('div[style*="background-image"]');
          if (divWithStyle) {
            const style = divWithStyle.getAttribute('style');
            const bgMatch = style.match(/url\(['"]?(.*?)['"]?\)/);
            if (bgMatch && bgMatch[1]) {
              icon = bgMatch[1].startsWith('data:') ? bgMatch[1] : bgMatch[1];
            }
          }
        }

        const iconUrl = icon ? null : `https://hotkeycheatsheet.com/api/v1/apps/${id}/icon`;

        apps.push({
          id,
          name,
          hotkeysCount,
          description: (countText ? `${countText} ` : '') + '(hotkeycheatsheet)', 
          iconUrl,
          icon: icon && icon.startsWith('data:') ? icon : null, // If it's a URL, we'll fetch it later
          platforms: [] 
        });
      } catch (e) {
        console.warn('Failed to parse card', e);
      }
    }

    if (apps.length > 0) return apps;

    // Strategy 2: Fallback to __NEXT_DATA__
    try {
      const nextDataEl = doc.getElementById('__NEXT_DATA__');
      if (nextDataEl) {
        const nextData = JSON.parse(nextDataEl.textContent);
        const pageProps = nextData.props?.pageProps;
        if (pageProps) {
          const findApps = (obj) => {
            if (Array.isArray(obj) && obj.length > 5 && (obj[0].id || obj[0].slug)) return obj;
            if (obj && typeof obj === 'object') {
              for (const k in obj) {
                const found = findApps(obj[k]);
                if (found) return found;
              }
            }
            return null;
          };
          
          const rawApps = findApps(pageProps);
          if (rawApps) {
            return rawApps.map(app => {
              const count = app.hotkeysCount || app.hotkeys_count || 0;
              const countStr = count > 0 ? `${count} hotkeys ` : '';
              return {
                id: app.id || app.slug,
                name: app.name || app.title,
                hotkeysCount: count,
                description: (app.description || countStr) + '(hotkeycheatsheet)',
                iconUrl: null,
                icon: app.icon || null,
                platforms: app.platforms || []
              };
            });
          }
        }
      }
    } catch (e) {
      console.warn('Failed to parse __NEXT_DATA__', e);
    }

    return apps;
  }

  /**
   * Convert SVG string to Base64 Data URL
   * @param {string} svgString 
   * @returns {string}
   */
  svgToBase64(svgString) {
    try {
      // Ensure the svg has the xmlns attribute for proper rendering as a data URL
      if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
        svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      const base64 = (typeof Buffer !== 'undefined') 
        ? Buffer.from(svgString).toString('base64')
        : btoa(unescape(encodeURIComponent(svgString)));
      return `data:image/svg+xml;base64,${base64}`;
    } catch (e) {
      console.error('Failed to convert SVG to base64', e);
      return null;
    }
  }

  /**
   * Fetch an image and convert to Base64
   * @param {string} url 
   * @returns {Promise<string>}
   */
  async imageToBase64(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.error(`Failed to convert image ${url} to base64`, e);
      return null;
    }
  }
}

class HotkeyDataLoader {
  constructor() {
    this.parser = new HotkeyCheatsheetParser();
  }

  getLang() {
    const locale = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language.toLowerCase() : '';
    return locale.includes('zh') ? 'zh' : '';
  }

  getPlatformUrl() {
    const lang = this.getLang();
    const isMac = utools.isMacOs();
    const platform = isMac ? 'macos' : 'windows';
    return lang 
      ? `https://hotkeycheatsheet.com/${lang}/os/${platform}` 
      : `https://hotkeycheatsheet.com/os/${platform}`;
  }

  async fetchAndProcess(callbackSetList, force = false) {
    const lang = this.getLang();
    const storageId = `hotkey_app_list_${lang || 'default'}`;
    const baseUrl = this.getPlatformUrl();
    
    try {
      // Check cache first (24h)
      const cached = utools.db.get(storageId);
      if (!force && cached && cached.data && (Date.now() - cached.updatedAt < 24 * 60 * 60 * 1000)) {
        console.log('[HotkeyDataLoader] Using cached app list from', new Date(cached.updatedAt).toLocaleString());
        return cached.data;
      }

      callbackSetList([{ title: '获取列表中...', description: `正在从 hotkeycheatsheet.com 拉取最新的应用列表 (${utools.isMacOs() ? 'Mac' : 'Windows'})`, icon: 'icons/loading.gif' }]);
      
      const response = await fetch(baseUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const html = await response.text();
      
      let apps = await this.parser.parseAppList(html);
      
      // Sort alphabetically by name (Req 1)
      apps.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

      callbackSetList([{ title: '转换图标中...', description: `已找到 ${apps.length} 个应用，正在转换本地图标...`, icon: 'icons/loading.gif' }]);

      // Process icons in batches 
      const batchSize = 10;
      for (let i = 0; i < apps.length; i += batchSize) {
        const batch = apps.slice(i, i + batchSize);
        await Promise.all(batch.map(async app => {
          if (app.iconUrl && !app.icon) {
            app.icon = await this.parser.imageToBase64(app.iconUrl);
          }
        }));
      }

      const storageData = {
        _id: `hotkey_app_list_${lang || 'default'}`,
        data: apps,
        updatedAt: Date.now()
      };

      const existing = utools.db.get(storageData._id);
      if (existing) {
        utools.db.put({ ...storageData, _rev: existing._rev });
      } else {
        utools.db.put(storageData);
      }

      return apps;
    } catch (e) {
      console.error('Failed to fetch app list', e);
      callbackSetList([{ 
        title: '拉取失败', 
        description: '请检查网络连接或稍后再试: ' + e.message, 
        action: 'noop'
      }]);
      return null;
    }
  }

  async fetchAndProcessAppHotkeys(id, callbackSetList, passedIcon = null) {
    id = id.replace(/\/+$/, '');
    const lang = this.getLang();
    const baseUrl = lang ? `https://hotkeycheatsheet.com/${lang}/hotkey-cheatsheet/${id}` : `https://hotkeycheatsheet.com/hotkey-cheatsheet/${id}`;
    
    try {
      if (callbackSetList) {
        callbackSetList([{ title: '获取数据中...', description: `正在解析 [${id}] 的快捷键数据...`, icon: 'icons/loading.gif' }]);
      }
      const response = await fetch(baseUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const html = await response.text();
      
      let appData = null;
      let allHotkeys = [];

      // Strategy 1: Robust extraction from Next.js server components (__next_f)
      const extractFlightEntries = (html) => {
          const regex = /self\.__next_f\.push\(\[\d+,\s*"((?:[^"\\]|\\.)*)"\]\)/g;
          let match;
          let fullStream = '';
          while ((match = regex.exec(html)) !== null) {
              try {
                  fullStream += JSON.parse('"' + match[1] + '"');
              } catch (e) {}
          }
          
          const entries = new Map();
          const parts = fullStream.split(/\n/);
          for (const part of parts) {
               const colonIdx = part.indexOf(':');
               if (colonIdx === -1) continue;
               const id = part.substring(0, colonIdx);
               const data = part.substring(colonIdx + 1);
               entries.set(id, data);
          }
          return entries;
      };

      const flightEntries = extractFlightEntries(html);
      const resolveRef = (data, entries) => {
          if (typeof data !== 'string' || !data.startsWith('$')) return data;
          const refId = data.substring(1);
          const refData = entries.get(refId);
          if (!refData) return data;
          try {
              // Strip Flight type prefixes like I, H, etc.
              const cleanData = refData.replace(/^[A-Z](?=[\[\{])/, '');
              return JSON.parse(cleanData);
          } catch (e) {
              return refData;
          }
      };

      // Find the entry that has allHotkeys
      for (const [id, rawContent] of flightEntries) {
          if (rawContent.includes('"allHotkeys":')) {
              try {
                  // Strip type prefix and parse as JSON if possible
                  const cleanContent = rawContent.replace(/^[A-Z](?=[\[\{])/, '');
                  const content = JSON.parse(cleanContent);
                  
                  // content might be an object or an array (RSC tree)
                  const findKey = (obj) => {
                      if (!obj || typeof obj !== 'object') return null;
                      if (obj.allHotkeys) return obj.allHotkeys;
                      if (Array.isArray(obj)) {
                          for (const item of obj) {
                              const found = findKey(item);
                              if (found) return found;
                          }
                      } else {
                          for (const k in obj) {
                              const found = findKey(obj[k]);
                              if (found) return found;
                          }
                      }
                      return null;
                  };
                  
                  let allHotkeysRaw = findKey(content);
                  if (allHotkeysRaw) {
                      // Resolve if it's a reference
                      if (typeof allHotkeysRaw === 'string' && allHotkeysRaw.startsWith('$')) {
                          allHotkeys = resolveRef(allHotkeysRaw, flightEntries);
                      } else {
                          allHotkeys = allHotkeysRaw;
                      }
                      
                      // If allHotkeys is a string (double encoded), parse it
                      if (typeof allHotkeys === 'string') {
                          try { allHotkeys = JSON.parse(allHotkeys); } catch(e){}
                      }
                      
                      if (Array.isArray(allHotkeys)) break;
                  }
              } catch (e) {
                  // Fallback to manual string extraction if JSON parse fails
                  const searchKey = '"allHotkeys":';
                  const idx = rawContent.indexOf(searchKey);
                  if (idx !== -1) {
                      let valueStart = idx + searchKey.length;
                      while (valueStart < rawContent.length && /\s/.test(rawContent[valueStart])) valueStart++;
                      
                      if (rawContent[valueStart] === '"' && rawContent[valueStart+1] === '$') {
                          let refId = '';
                          for (let i = valueStart + 2; i < rawContent.length; i++) {
                              if (rawContent[i] === '"') break;
                              refId += rawContent[i];
                          }
                          const refData = flightEntries.get(refId);
                          if (refData) {
                              try {
                                  const cleanRef = refData.replace(/^[A-Z](?=[\[\{])/, '');
                                  allHotkeys = JSON.parse(cleanRef);
                                  break;
                              } catch(e){}
                          }
                      } else if (rawContent[valueStart] === '[') {
                          // Try to extract balanced array from raw string
                          const extractBalanced = (text, start) => {
                              let depth = 0; let inStr = false; let esc = false;
                              for (let i = start; i < text.length; i++) {
                                  const c = text[i];
                                  if (esc) { esc = false; continue; }
                                  if (c === '\\') { esc = true; continue; }
                                  if (c === '"') { inStr = !inStr; continue; }
                                  if (inStr) continue;
                                  if (c === '[') depth++;
                                  else if (c === ']') {
                                      depth--;
                                      if (depth === 0) return text.substring(start, i + 1);
                                  }
                              }
                              return null;
                          };
                          const rawArrayStr = extractBalanced(rawContent, valueStart);
                          if (rawArrayStr) {
                              try {
                                  // Double unescape for nested JSON in string
                                  const unescaped = JSON.parse('"' + rawArrayStr + '"');
                                  allHotkeys = JSON.parse(unescaped);
                                  break;
                              } catch (e) {}
                          }
                      }
                  }
              }
          }
      }

      // Strategy 2: Legacy DOM parse (__NEXT_DATA__)
      if (!allHotkeys || allHotkeys.length === 0) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const nextDataEl = doc.getElementById('__NEXT_DATA__');
        if (nextDataEl) {
            const nextData = JSON.parse(nextDataEl.textContent);
            appData = nextData.props?.pageProps?.app;
        }
      }

      if ((!appData || !appData.categories) && (!allHotkeys || allHotkeys.length === 0)) {
          throw new Error('未找到快捷键数据，网页结构可能已更改或该应用无数据。');
      }

      const isMac = utools.isMacOs();
      const targetOs = isMac ? 'MacOS' : 'Windows';
      let compiledShortcuts = [];
      const appName = (appData && (appData.name || appData.title)) ? (appData.name || appData.title) : id;

      let appIcon = passedIcon;
      if (!appIcon) {
        const storageId = `hotkey_app_list_${lang || 'default'}`;
        const cachedAppList = utools.db.get(storageId);
        if (cachedAppList && cachedAppList.data) {
            const matchedApp = cachedAppList.data.find(a => a.id === id);
            if (matchedApp && matchedApp.icon) appIcon = matchedApp.icon;
        }
      }

      const normalizeKey = (k) => {
          let keyStr = String(k).toLowerCase().trim();
          if (keyStr === 'cmd' || keyStr === '⌘' || keyStr === 'command') return 'command';
          if (keyStr === 'opt' || keyStr === '⌥' || keyStr === 'alt' || keyStr === 'option') return isMac ? 'option' : 'alt';
          if (keyStr === 'ctrl' || keyStr === '⌃' || keyStr === 'control') return 'ctrl';
          if (keyStr === 'shift' || keyStr === '⇧') return 'shift';
          if (keyStr === 'enter' || keyStr === 'return' || keyStr === '↩') return 'enter';
          if (keyStr === 'arrowup' || keyStr === 'up arrow' || keyStr === 'up') return 'up';
          if (keyStr === 'arrowdown' || keyStr === 'down arrow' || keyStr === 'down') return 'down';
          if (keyStr === 'arrowleft' || keyStr === 'left arrow' || keyStr === 'left') return 'left';
          if (keyStr === 'arrowright' || keyStr === 'right arrow' || keyStr === 'right') return 'right';
          if (keyStr === 'esc' || keyStr === '⎋' || keyStr === 'escape') return 'esc';
          if (keyStr === 'tab' || keyStr === '⇥') return 'tab';
          if (keyStr === 'backspace' || keyStr === '⌫') return 'backspace';
          if (keyStr === 'delete' || keyStr === '⌦') return 'delete';
          if (keyStr === 'space' || keyStr === '␣') return 'space';
          return keyStr;
      };

      const processBinding = (binding) => {
          if (!binding) return null;
          let rawKeys = [];
          if (typeof binding === 'string') {
              rawKeys = binding.split('+').map(s => s.trim());
          } else {
              rawKeys = Array.isArray(binding) ? binding : [binding];
          }
          return rawKeys.map(normalizeKey).filter(k => !!k);
      };

      if (allHotkeys && Array.isArray(allHotkeys)) {
          const processItem = (item, parentCategory = '') => {
              if (!item) return;
              
              const name = item.name || item.action || item.title || '';
              const categoryName = item.sectionName || item.groupName || item.section || item.category || parentCategory || '';

              // Handle nested items (Categories/Sections)
              if (item.items && Array.isArray(item.items)) {
                  for (const subItem of item.items) {
                      processItem(subItem, categoryName);
                  }
                  return;
              }

              if (item.hotkeys && Array.isArray(item.hotkeys)) {
                  if (typeof item.hotkeys[0] === 'object' && !Array.isArray(item.hotkeys[0])) {
                      // Format: Array of objects {keys: [], os: []}
                      for (const hk of item.hotkeys) {
                          if (!hk.keys) continue;
                          const osList = Array.isArray(hk.os) ? hk.os.map(o => String(o).toLowerCase()) : [String(hk.os || 'any').toLowerCase()];
                          
                          const targetOsLower = targetOs.toLowerCase();
                          const isMatch = osList.some(o => {
                              if (o === 'any') return true;
                              if (targetOsLower === 'macos') return o === 'macos' || o === 'mac';
                              if (targetOsLower === 'windows') return o === 'windows' || o === 'win';
                              return o === targetOsLower;
                          });
                          
                          if (isMatch) {
                              const keys = processBinding(hk.keys);
                              if (!keys || keys.length === 0) {
                                  console.warn(`[HotkeyService] Empty keys for ${name} from binding:`, hk.keys);
                                  continue;
                              }
                              
                              const keyword = `${appName} ${id} ${categoryName} ${name}`.toLowerCase();
                              // Req 3: Data Enrichment - Title and Description
                              compiledShortcuts.push({
                                  title: `${name} (${keys.join(' + ')})`,
                                  description: `${appName} (hotkeycheatsheet)`,
                                  keys,
                                  keyword,
                                  category: categoryName,
                                  icon: appIcon
                              });
                          } else {
                              // Skip log for performance, maybe just a count later
                          }
                      }
                  } else {
                      // Format: Flat list (Legacy or Snippet)
                      const isSnippetFormat = item.hotkeys.some(hk => hk && (hk.mac || hk.win));
                      
                      if (isSnippetFormat) {
                          for (const hk of item.hotkeys) {
                              const binding = isMac ? hk.mac : hk.win;
                              const keys = processBinding(binding);
                              if (!keys || keys.length === 0) continue;
                              
                              const itemTitle = hk.name || hk.title || hk.action || name || '';
                              const keyword = `${appName} ${id} ${categoryName} ${itemTitle}`.toLowerCase();
                              // Req 3: Data Enrichment
                              compiledShortcuts.push({
                                  title: `${itemTitle} (${keys.join(' + ')})`,
                                  description: `${appName} (hotkeycheatsheet)`,
                                  keys,
                                  keyword,
                                  category: categoryName,
                                  icon: appIcon
                              });
                          }
                      } else {
                          const hasCorrectOs = !item.os || item.os === targetOs;
                          if (hasCorrectOs) {
                              const hotkeySets = Array.isArray(item.hotkeys[0]) ? item.hotkeys : [item.hotkeys];
                              for (const binding of hotkeySets) {
                                  const keys = processBinding(binding);
                                  if (!keys || keys.length === 0) continue;
                                  
                                   const keyword = `${appName} ${id} ${categoryName} ${name}`.toLowerCase();
                                  // Req 3: Data Enrichment
                                  compiledShortcuts.push({
                                      title: `${name} (${keys.join(' + ')})`,
                                      description: `${appName} (hotkeycheatsheet)`,
                                      keys,
                                      keyword,
                                      category: categoryName,
                                      icon: appIcon
                                  });
                              }
                          }
                      }
                  }
              }
          };

          for (const topItem of allHotkeys) {
              processItem(topItem);
          }
      } else if (appData && appData.categories) {
          // Legacy format
          for (const cat of appData.categories) {
              const categoryName = cat.name || cat.title || '';
              if (cat.hotkeys) {
                  for (const hk of cat.hotkeys) {
                      const binding = isMac ? hk.macShortcut : hk.windowsShortcut;
                      const keys = processBinding(binding);
                      if (!keys || keys.length === 0) continue;

                      const title = hk.title || '';
                      const description = hk.description || '';
                      const keyword = `${appName} ${id} ${categoryName} ${title} ${description}`.toLowerCase();
                      
                      // Req 3: Data Enrichment
                      compiledShortcuts.push({
                          title: `${title} (${keys.join(' + ')})`,
                          description: `${appName} (hotkeycheatsheet)`,
                          keys,
                          keyword,
                          category: categoryName,
                          icon: appIcon
                      });
                  }
              }
          }
      }

      if (compiledShortcuts.length === 0) {
          throw new Error('解析完成，但未能找到适用于当前平台的有效快捷键。');
      }

      const docToSave = {
          _id: `hotkeys_app_${id}`,
          appId: id,
          name: appName,
          shortcuts: compiledShortcuts,
          updatedAt: Date.now()
      };

      console.log(`[HotkeyService] Saving ${compiledShortcuts.length} shortcuts for ${appName} (ID: ${id}) to storage`);
      
      // Save to SQLite (Primary)
      const savedToSqlite = await sqliteService.saveAppHotkeys(id, appName, appIcon, compiledShortcuts);

      if (savedToSqlite) {
          console.log(`[HotkeyService] Successfully saved ${id} to SQLite`);
          // If successfully saved to SQLite, we should CLEAN UP any existing data in utools.db for this app to free up space (1MB limit)
          const existing = utools.db.get(docToSave._id);
          if (existing) {
              utools.db.remove(existing);
              console.log(`[HotkeyService] Removed legacy utools.db record for ${id}`);
          }
      } else {
          // Fallback to utools.db ONLY if SQLite is not available/configured
          console.warn(`[HotkeyService] SQLite not active. Saving to utools.db (subject to 1MB limit)`);
          const existing = utools.db.get(docToSave._id);
          let res;
          if (existing) {
              res = utools.db.put({ ...docToSave, _rev: existing._rev });
          } else {
              res = utools.db.put(docToSave);
          }

          if (res && res.error) {
              console.error('[HotkeyService] utools.db Save failed:', res);
              throw new Error(`数据库保存失败: ${res.message || '未知错误'}`);
          }
          console.log('[HotkeyService] utools.db Save successful (Fallback mode)');
      }

      // Refresh global state
      if (typeof enter === 'function') {
          enter();
      } else {
          try {
              require('../infrastructure/common_method.js').enter();
          } catch (e) {
              console.warn('[HotkeyService] Failed to call enter() for refresh', e);
          }
      }
      
      return true;

    } catch (e) {
      console.error('Failed to fetch and process app hotkeys', e);
      throw e;
    }
  }
}

const dataLoader = new HotkeyDataLoader();

/**
 * The /download command implementation
 */
class DownloadCommand {
  constructor() {
    this.keyword = '/download';
  }

  description() {
    const lang = dataLoader.getLang();
    const storageId = `hotkey_app_list_${lang || 'default'}`;
    const existing = utools.db.get(storageId);
    let timeStr = '从未同步';
    if (existing && existing.updatedAt) {
      timeStr = new Date(existing.updatedAt).toLocaleDateString();
    }
    return `下载快捷键配置。上次同步：${timeStr}`;
  }

  match(searchWord) {
    return searchWord.toLowerCase().startsWith(this.keyword);
  }

  async execute(searchWord, callbackSetList) {
    if (!this.cachedApps) {
      this.cachedApps = await dataLoader.fetchAndProcess(callbackSetList);
    }
    
    if (this.cachedApps) {
      // Handle both cases: 
      // 1. Full command: "/download vs"
      // 2. Cleared input: "vs" (after selecting /download)
      const query = searchWord.toLowerCase().startsWith(this.keyword)
        ? searchWord.replace(this.keyword, '').trim().toLowerCase()
        : searchWord.trim().toLowerCase();

      const filteredApps = query 
        ? this.cachedApps.filter(app => app.name.toLowerCase().includes(query))
        : this.cachedApps;

      const displayList = filteredApps.map(app => {
        let description = app.description || `${app.id}`;
        // If hotkeysCount is available but not already in description (for legacy cache support)
        if (app.hotkeysCount && !description.includes('hotkey') && !description.includes('快捷键')) {
           const isZh = dataLoader.getLang() === 'zh';
           const countText = isZh ? `${app.hotkeysCount} 条快捷键` : `${app.hotkeysCount} hotkeys`;
           description = `${countText} (hotkeycheatsheet)`;
        }

        return {
          title: app.name,
          description: description,
          icon: app.icon || 'logo.png',
          id: app.id,
          action: 'download_app_hotkeys'
        };
      });

      // Add a "Back" option at the top if we are in specialized mode (no command prefix)
      // and not currently filtering, or just to provide a way out.
      if (!searchWord.toLowerCase().startsWith(this.keyword)) {
        displayList.unshift({
          title: '🔄 强制刷新列表',
          description: '从服务器重新获取最新的应用列表（跳过缓存）',
          icon: 'logo.png',
          action: 'refresh_app_list'
        });
        displayList.unshift({
          title: '↩ 返回主搜索',
          description: '退出下载模式，搜索本地已有的快捷键',
          icon: 'logo.png',
          action: 'noop'
        });
      }

      callbackSetList(displayList);
    }
  }

  async refresh(callbackSetList) {
    this.cachedApps = await dataLoader.fetchAndProcess(callbackSetList, true);
    this.execute('', callbackSetList);
  }
}

// Register self
slashCommandManager.register(new DownloadCommand());

/**
 * The /path command implementation
 */
class PathCommand {
  constructor() {
    this.keyword = '/path';
  }

  description() {
    const savedPath = utools.dbStorage.getItem('sqlite_db_path');
    return `设置 SQLite 数据库存放路径。当前路径：${savedPath || '未设置'}`;
  }

  match(searchWord) {
    return searchWord.toLowerCase().startsWith(this.keyword);
  }

  async execute(searchWord, callbackSetList) {
    const paths = utools.showOpenDialog({
      title: '选择 SQLite 数据库存放目录',
      properties: ['openDirectory', 'createDirectory']
    });

    if (paths && paths.length > 0) {
      const selectedPath = paths[0];
      utools.dbStorage.setItem('sqlite_db_path', selectedPath);
      
      const success = await sqliteService.init(selectedPath);
      
      if (success) {
        // Migration logic: Move existing records from utools.db to the newly set SQLite
        try {
          const dbDocs = utools.db.allDocs('hotkeys_app_');
          if (dbDocs.length > 0) {
            console.log(`[PathCommand] Found ${dbDocs.length} legacy apps in utools.db. Starting migration...`);
            let migratedCount = 0;
            for (const rawDoc of dbDocs) {
              const doc = rawDoc.doc || rawDoc.value || rawDoc;
              if (!doc) continue;
              
              const appId = doc.appId || (doc._id ? doc._id.replace('hotkeys_app_', '') : 'unknown');
              const appName = doc.name || appId;
              const shortcuts = doc.shortcuts || doc.data || [];
              const appIcon = doc.icon || (shortcuts.length > 0 ? shortcuts[0].icon : null);
              
              const ok = await sqliteService.saveAppHotkeys(appId, appName, appIcon, shortcuts);
              if (ok) {
                utools.db.remove(doc);
                migratedCount++;
              }
            }
            console.log(`[PathCommand] Migration complete. Moved ${migratedCount} apps to SQLite.`);
          }
        } catch (e) {
          console.error('[PathCommand] Migration failed', e);
        }

        callbackSetList([{
          title: '路径设置成功',
          description: `数据库已初始化在: ${selectedPath}。已将旧数据迁入。`,
          icon: 'logo.png',
          action: 'noop'
        }]);
        // Refresh to apply new data if any
        try {
          require('../infrastructure/common_method.js').enter();
        } catch(e){}
      } else {
        callbackSetList([{
          title: '路径设置失败',
          description: '无法在选定目录初始化数据库，请检查权限。',
          icon: 'logo.png',
          action: 'noop'
        }]);
      }
    } else {
      callbackSetList([{
        title: '已取消',
        description: '未更改数据库路径。',
        icon: 'logo.png',
        action: 'noop'
      }]);
    }
  }
}

slashCommandManager.register(new PathCommand());

module.exports = { dataLoader };
