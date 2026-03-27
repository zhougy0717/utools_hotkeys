/**
 * UI Adapter - Standardizes UI feedback for uTools list mode.
 * Decouples business logic from uTools-specific list item structures.
 */
class UIAdapter {
  /**
   * @param {Function} callbackSetList - The uTools callback function
   */
  constructor(callbackSetList) {
    this.callbackSetList = callbackSetList;
  }

  /**
   * Show a loading state in the list
   * @param {string} title - Main title
   * @param {string} description - Status description
   * @param {string} icon - Icon path (default is loading.gif)
   */
  showLoading(title, description, icon = 'icons/loading.gif') {
    if (typeof this.callbackSetList === 'function') {
      this.callbackSetList([{
        title: title || '正在处理...',
        description: description || '请稍候...',
        icon: icon
      }]);
    }
  }

  /**
   * Show a success state in the list
   * @param {string} title - Success title
   * @param {string} description - Detail message
   * @param {string} icon - Icon path (default is logo.png)
   */
  showSuccess(title, description, icon = 'logo.png') {
    if (typeof this.callbackSetList === 'function') {
      this.callbackSetList([{
        title: title || '操作成功',
        description: description || '按回车返回或直接开始搜索。',
        icon: icon,
        action: 'noop' // Reset action to allow going back
      }]);
    }
  }

  /**
   * Show an error state in the list
   * @param {string} title - Error title
   * @param {string} description - Error detail or message
   * @param {string} icon - Icon path
   */
  showError(title, description, icon = 'logo.png') {
    if (typeof this.callbackSetList === 'function') {
      this.callbackSetList([{
        title: title || '操作失败',
        description: description || '请重试',
        icon: icon,
        action: 'noop'
      }]);
    }
  }

  /**
   * Direct update with raw list data if needed
   * @param {Array} list 
   */
  update(list) {
    if (typeof this.callbackSetList === 'function') {
      this.callbackSetList(list);
    }
  }
}

module.exports = UIAdapter;
