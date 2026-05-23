const fs = require('fs');
const path = require('path');

const pathActionHandler = {
  /**
   * Handle directory picking and creation
   * @param {Object} itemData 
   * @param {Object} ui 
   */
  handle(itemData, ui, context) {
    if (itemData.action === 'open_data_directory') {
       const savedPath = utools.dbStorage.getItem('sqlite_db_path');
       if (savedPath && fs.existsSync(savedPath)) {
          utools.shellOpenPath(savedPath);
          return;
       }
    }

    if (itemData.action !== 'pick_data_directory') return;

    // 使用 setTimeout 异步打开对话框，避免同步阻塞事件循环导致 uTools 重新获得焦点时重复触发选择事件
    setTimeout(() => {
      const paths = utools.showOpenDialog({
        title: '选择快捷键数据存放目录',
        properties: ['openDirectory', 'createDirectory']
      });

      if (paths && paths.length > 0) {
        const selectedPath = paths[0];
        utools.dbStorage.setItem('sqlite_db_path', selectedPath);
        
        this.initDataDirectory(selectedPath);

        ui.callbackSetList([{
          title: '路径设置成功',
          description: `数据关联目录已设置在: ${selectedPath}`,
          icon: 'logo.png',
          action: 'noop'
        }]);

        try {
          require('../../infrastructure/common_method.js').enter();
        } catch(e) {
          console.error('[PathActionHandler] Refresh failed', e);
        }
      } else {
        ui.callbackSetList([{
          title: '已取消',
          description: '未更改数据存放目录。',
          icon: 'logo.png',
          action: 'noop'
        }]);
      }
    }, 100);
  },

  /**
   * Initialize folder structure in the selected path
   * @param {string} selectedPath 
   */
  initDataDirectory(selectedPath) {
    try {
      const jsonDir = path.join(selectedPath, 'json_hotkeys');
      if (!fs.existsSync(jsonDir)) {
        fs.mkdirSync(jsonDir, { recursive: true });
      }
      
      const templatePath = path.join(jsonDir, 'template.json');
      if (!fs.existsSync(templatePath)) {
        const template = {
          "appId": "custom_hotkeys_template",
          "appName": "自定义快捷键模板",
          "updatedAt": Date.now(),
          "shortcuts": [
            {
              "title": "示例：浏览器刷新 (自定义 JSON)",
              "keys": ["{cmd_or_ctrl}", "r"],
              "keyword": "refresh 刷新",
              "description": "这是一个通过自定义 JSON 加载的示例快捷键"
            }
          ]
        };
        fs.writeFileSync(templatePath, JSON.stringify(template, null, 2), 'utf8');
      }
    } catch (e) {
      console.warn('[PathActionHandler] Initialization failed', e);
    }
  }
};

module.exports = pathActionHandler;
