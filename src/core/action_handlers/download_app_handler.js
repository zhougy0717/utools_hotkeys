const { dataLoader } = require('../hotkeycheatsheet.js');

/**
 * DownloadAppHandler - Handles the 'download_app_hotkeys' action.
 * Fetches hotkeys from hotkeycheatsheet.com and updates UI status.
 */
class DownloadAppHandler {
  async handle(itemData, ui) {
    if (!itemData.id) {
       console.error('[DownloadAppHandler] Missing app ID in itemData');
       ui.showError('操作失败', '找不到应用 ID');
       return;
    }

    // 1. Show initial loading status
    ui.showLoading(
        '正在获取数据...', 
        `正在获取 [${itemData.title}] 的快捷键...`, 
        itemData.icon || 'logo.png'
    );

    try {
      // 2. Perform the actual data fetch
      // Note: we pass ui.update as the callbackSetList for internal progress reporting
      await dataLoader.fetchAndProcessAppHotkeys(
          itemData.id, 
          (list) => ui.update(list), 
          itemData.icon
      );

      // 3. Show final success message
      ui.showSuccess(
          '下载成功！', 
          `[${itemData.title}] 下载完成，按回车返回或直接开始搜索。`, 
          itemData.icon || 'logo.png'
      );
    } catch (e) {
      // 4. Handle errors
      console.error('[DownloadAppHandler] Fetch failed:', e);
      ui.showError(
          '下载失败', 
          e.message || '未知错误，请检查网络连接。', 
          itemData.icon || 'logo.png'
      );
    }
  }
}

module.exports = new DownloadAppHandler();
