const { dataLoader } = require('../hotkeycheatsheet.js');

/**
 * The /download command implementation
 */
class DownloadCommand {
  constructor() {
    this.keyword = '/download';
    this.fetchPromise = null;
    this.cachedApps = null;
  }

  description() {
    const lang = dataLoader.getLang();
    const storageId = `hotkey_app_list_${lang || 'default'}`;
    const existing = utools.db.get(storageId);
    let timeStr = '从未同步';
    if (existing && existing.updatedAt) {
      existing.updatedAt = Number(existing.updatedAt);
      timeStr = new Date(existing.updatedAt).toLocaleDateString();
    }
    return `下载快捷键配置。上次同步：${timeStr}`;
  }

  match(searchWord) {
    return searchWord.toLowerCase().startsWith(this.keyword);
  }

  async execute(searchWord, callbackSetList) {
    if (!this.cachedApps) {
      if (!this.fetchPromise) {
        this.fetchPromise = dataLoader.fetchAndProcess(callbackSetList);
      }
      try {
        const apps = await this.fetchPromise;
        if (apps) this.cachedApps = apps;
      } finally {
        this.fetchPromise = null;
      }
    }
    
    if (this.cachedApps) {
      const query = searchWord.toLowerCase().startsWith(this.keyword)
        ? searchWord.substring(this.keyword.length).trim().toLowerCase()
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

      if (typeof callbackSetList === 'function') {
        callbackSetList(displayList);
      }
    }
  }

  async refresh(callbackSetList) {
    this.cachedApps = await dataLoader.fetchAndProcess(callbackSetList, true);
    this.execute('', callbackSetList);
  }
}

module.exports = DownloadCommand;
