const fs = require('fs');
const path = require('path');
const { generateAvatarSvg } = require('../utils/icon_generator.js');

function getUtools() {
  if (typeof utools !== 'undefined') return utools;
  if (typeof window !== 'undefined' && window.utools) return window.utools;
  return null;
}

/**
 * Collect all known apps from custom JSON directory, downloaded apps, and builtin sources
 * @returns {Array<{appId: string, appName: string, icon: string, source: string, count: number, filePath?: string}>}
 */
function getLoadedAppList() {
  const appMap = new Map();
  const uTools = getUtools();
  const storagePath = uTools && uTools.dbStorage ? uTools.dbStorage.getItem('sqlite_db_path') : null;

  // 1. Scan storagePath subdirectories (json_hotkeys, hotkeycheatsheet, builtin)
  if (storagePath && fs.existsSync(storagePath)) {
    const subDirs = ['json_hotkeys', 'hotkeycheatsheet', 'builtin'];
    for (const sub of subDirs) {
      const dir = path.join(storagePath, sub);
      if (!fs.existsSync(dir)) continue;

      const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
      for (const file of files) {
        const filePath = path.join(dir, file);
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const data = JSON.parse(content);
          if (data && (data.appId || data.appName)) {
            const appId = data.appId || path.basename(file, '.json');
            const appName = data.appName || appId;
            const count = Array.isArray(data.shortcuts) ? data.shortcuts.length : 0;
            const icon = data.icon || (data.shortcuts && data.shortcuts[0] && data.shortcuts[0].icon) || null;

            if (!appMap.has(appId)) {
              appMap.set(appId, {
                appId,
                appName,
                icon,
                source: sub === 'json_hotkeys' ? '用户自定义/导入' : sub,
                count,
                filePath
              });
            }
          }
        } catch (e) {
          // ignore corrupted files
        }
      }
    }
  }

  // 2. Scan builtin cheatsheet data
  try {
    const isMac = uTools && typeof uTools.isMacOs === 'function' ? uTools.isMacOs() : process.platform === 'darwin';
    const platformDir = isMac ? 'mac' : 'win';
    const builtinDataDir = path.join(__dirname, '../../infrastructure/data/cheatsheet_builtin', platformDir);
    if (fs.existsSync(builtinDataDir)) {
      const files = fs.readdirSync(builtinDataDir).filter(f => f.endsWith('.json'));
      for (const file of files) {
        const filePath = path.join(builtinDataDir, file);
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const data = JSON.parse(content);
          if (data && (data.appId || data.appName)) {
            const appId = data.appId || path.basename(file, '.json');
            if (!appMap.has(appId)) {
              const appName = data.appName || appId;
              const count = Array.isArray(data.shortcuts) ? data.shortcuts.length : 0;
              const icon = data.icon || (data.shortcuts && data.shortcuts[0] && data.shortcuts[0].icon) || null;
              appMap.set(appId, {
                appId,
                appName,
                icon,
                source: '内置数据',
                count,
                filePath
              });
            }
          }
        } catch (e) {
          // ignore
        }
      }
    }
  } catch (e) {
    // ignore
  }

  return Array.from(appMap.values());
}

/**
 * The /icon command implementation
 * Manages and customizes application icons
 */
class IconCommand {
  constructor() {
    this.keyword = '/icon';
  }

  description() {
    return '管理与设置应用图标（支持选择本地图标文件或动态生成渐变徽标）';
  }

  match(searchWord) {
    return searchWord.toLowerCase().startsWith(this.keyword);
  }

  async execute(searchWord, callbackSetList) {
    if (typeof callbackSetList !== 'function') return;

    const query = searchWord.toLowerCase().startsWith(this.keyword)
      ? searchWord.substring(this.keyword.length).trim().toLowerCase()
      : searchWord.trim().toLowerCase();

    const apps = getLoadedAppList();

    const filtered = query
      ? apps.filter(app =>
          app.appName.toLowerCase().includes(query) ||
          app.appId.toLowerCase().includes(query)
        )
      : apps;

    if (filtered.length === 0) {
      callbackSetList([{
        title: query ? `未找到匹配 [${query}] 的应用` : '暂无已加载的应用',
        description: '请先使用 /import 导入或 /download 下载快捷键数据',
        icon: 'logo.png',
        action: 'noop'
      }]);
      return;
    }

    const displayList = filtered.map(app => {
      const displayIcon = app.icon || generateAvatarSvg(app.appName);
      return {
        title: app.appName,
        description: `ID: ${app.appId} · 来源: ${app.source} · 共 ${app.count} 条快捷键 · 点击配置图标`,
        icon: displayIcon,
        appId: app.appId,
        appName: app.appName,
        filePath: app.filePath,
        currentIcon: app.icon,
        action: 'manage_app_icon'
      };
    });

    callbackSetList(displayList);
  }
}

module.exports = IconCommand;
module.exports.getLoadedAppList = getLoadedAppList;
