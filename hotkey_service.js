/**
 * Hotkey Service - Handles data fetching and parsing from hotkeycheatsheet.com
 */

const slashCommandManager = require('./slash_command_manager.js');

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

    // Strategy 1: DOM parsing with SVG extraction (Most direct and up-to-date)
    // The selector a[href*="/hotkey-cheatsheet/"] covers both /hotkey-cheatsheet/ and /zh/hotkey-cheatsheet/
    const cards = doc.querySelectorAll('a[href*="/hotkey-cheatsheet/"]');
    
    for (const card of cards) {
      try {
        const nameEl = card.querySelector('h3, h2, p, strong') || card;
        const name = nameEl.textContent.trim();
        // Skip some generic links that might match the href pattern but aren't app cards
        if (name.length < 2 || name.includes('更多') || name.includes('View all')) continue;

        const descEl = card.querySelector('p:last-of-type');
        const description = descEl ? descEl.textContent.trim() : '';
        
        const href = card.getAttribute('href');
        if (!href) continue;
        const id = href.split('/').pop().split('?')[0];

        // NEW: Extract inline SVG
        let icon = null;
        const svgEl = card.querySelector('svg');
        if (svgEl) {
          icon = this.svgToBase64(svgEl.outerHTML);
        }

        const iconUrl = icon ? null : `https://hotkeycheatsheet.com/api/v1/apps/${id}/icon`;

        apps.push({
          id,
          name,
          description,
          iconUrl,
          icon, // If we have the SVG Base64, we use it directly
          platforms: [] 
        });
      } catch (e) {
        console.warn('Failed to parse card', e);
      }
    }

    if (apps.length > 0) return apps;

    // Strategy 2: Fallback to __NEXT_DATA__ JSON
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
            return rawApps.map(app => ({
              id: app.id || app.slug,
              name: app.name || app.title,
              description: app.description || `${app.hotkeysCount || 0} hotkeys`,
              iconUrl: null,
              icon: app.icon || null,
              platforms: app.platforms || []
            }));
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
      const base64 = btoa(unescape(encodeURIComponent(svgString)));
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
    const locale = utools.getNativeId().toLowerCase();
    return locale.includes('zh') ? 'zh' : '';
  }

  async fetchAndProcess(callbackSetList) {
    const lang = this.getLang();
    const baseUrl = lang ? `https://hotkeycheatsheet.com/${lang}` : 'https://hotkeycheatsheet.com';
    
    try {
      callbackSetList([{ title: '获取列表中...', description: '正在从 hotkeycheatsheet.com 拉取最新的应用列表', icon: 'icons/loading.gif' }]);
      
      const response = await fetch(baseUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const html = await response.text();
      
      let apps = await this.parser.parseAppList(html);
      
      // Limit to first N apps for icon conversion if list is too long, or do all
      // For UX, we can show the list immediately and update icons in background, 
      // but the spec says store icons locally.
      
      callbackSetList([{ title: '转换图标中...', description: `已找到 ${apps.length} 个应用，正在转换本地图标...` }]);

      // Process icons in batches 
      const batchSize = 10;
      for (let i = 0; i < apps.length; i += batchSize) {
        const batch = apps.slice(i, i + batchSize);
        await Promise.all(batch.map(async app => {
          // Skip if icon is already present (from JSON)
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

      // Persistence (Using utools.db for larger storage capacity and proper _rev handling)
      const storageId = storageData._id;
      const existing = utools.db.get(storageId);
      
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
        description: '请检查网络连接或稍后再试: ' + e.message + ' (点击复制)', 
        action: 'copyText', 
        data: e.message 
      }]);
      return null;
    }
  }

  async fetchAndProcessAppHotkeys(id) {
    const lang = this.getLang();
    const baseUrl = lang ? `https://hotkeycheatsheet.com/${lang}/hotkey-cheatsheet/${id}` : `https://hotkeycheatsheet.com/hotkey-cheatsheet/${id}`;
    
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const html = await response.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const nextDataEl = doc.getElementById('__NEXT_DATA__');
      if (!nextDataEl) {
          throw new Error('未找到 __NEXT_DATA__，无法解析快捷键数据。');
      }

      const nextData = JSON.parse(nextDataEl.textContent);
      
      let appData = nextData.props?.pageProps?.app;

      if (!appData || !appData.categories) {
          throw new Error('详情数据格式异常。');
      }

      const isMac = utools.isMacOs();
      let compiledShortcuts = [];
      const appName = appData.name || appData.title || id;

      for (const cat of appData.categories) {
          const categoryName = cat.name || cat.title || '';
          if (cat.hotkeys) {
              for (const hk of cat.hotkeys) {
                  const shortcutBinding = isMac ? hk.macShortcut : hk.windowsShortcut;
                  if (!shortcutBinding || shortcutBinding.length === 0) continue;

                  let rawKeys = Array.isArray(shortcutBinding) ? shortcutBinding : [shortcutBinding];
                  const keys = rawKeys.map(k => {
                      let keyStr = String(k).toLowerCase().trim();
                      if (keyStr === 'cmd' || keyStr === '⌘' || keyStr === 'command') return 'command';
                      if (keyStr === 'opt' || keyStr === '⌥' || keyStr === 'alt' || keyStr === 'option') return isMac ? 'option' : 'alt';
                      if (keyStr === 'ctrl' || keyStr === '⌃' || keyStr === 'control') return 'ctrl';
                      if (keyStr === 'shift' || keyStr === '⇧') return 'shift';
                      if (keyStr === 'enter' || keyStr === 'return' || keyStr === '↩') return 'enter';
                      return keyStr;
                  });

                  const title = hk.title || '';
                  const description = hk.description || '';
                  
                  const keyword = `${appName} ${id} ${categoryName} ${title} ${description}`.toLowerCase();
                  
                  compiledShortcuts.push({
                      title,
                      description,
                      keys,
                      keyword,
                      category: categoryName
                  });
              }
          }
      }

      if (compiledShortcuts.length === 0) {
          throw new Error('该应用没有当前平台的有效快捷键。');
      }

      const docToSave = {
          _id: `hotkeys_app_${id}`,
          appId: id,
          name: appName,
          shortcuts: compiledShortcuts,
          updatedAt: Date.now()
      };

      const existing = utools.db.get(docToSave._id);
      if (existing) {
          utools.db.put({ ...docToSave, _rev: existing._rev });
      } else {
          utools.db.put(docToSave);
      }

      require('./common_method.js').enter();
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
    const apps = await dataLoader.fetchAndProcess(callbackSetList);
    if (apps) {
      const displayList = apps.map(app => ({
        title: app.name,
        description: app.description,
        icon: app.icon || 'logo.png',
        id: app.id,
        action: 'download_app_hotkeys'
      }));
      callbackSetList(displayList);
    }
  }
}

// Register self
slashCommandManager.register(new DownloadCommand());

module.exports = { dataLoader };
