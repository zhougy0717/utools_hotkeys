const fs = require('fs');
const path = require('path');

/**
 * The /path command implementation
 */
class PathCommand {
  constructor() {
    this.keyword = '/path';
  }

  description() {
    const savedPath = utools.dbStorage.getItem('sqlite_db_path');
    return `设置快捷键数据存放目录。当前目录：${savedPath || '未设置'}`;
  }

  match(searchWord) {
    return searchWord.toLowerCase().startsWith(this.keyword);
  }

  async execute(searchWord, callbackSetList) {
    const paths = utools.showOpenDialog({
      title: '选择快捷键数据存放目录',
      properties: ['openDirectory', 'createDirectory']
    });

    if (paths && paths.length > 0) {
      const selectedPath = paths[0];
      utools.dbStorage.setItem('sqlite_db_path', selectedPath);
      
      // Create json_hotkeys directory and template if not exists
      try {
        const jsonDir = path.join(selectedPath, 'json_hotkeys');
        if (!fs.existsSync(jsonDir)) {
          fs.mkdirSync(jsonDir, { recursive: true });
        }
        
        const templatePath = path.join(jsonDir, 'template.json');
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
        console.log('[PathCommand] Updated json_hotkeys/template.json');
      } catch (e) {
        console.warn('[PathCommand] Failed to initialize json_hotkeys folder', e);
      }

      callbackSetList([{
        title: '路径设置成功',
        description: `数据关联目录已设置在: ${selectedPath}`,
        icon: 'logo.png',
        action: 'noop'
      }]);
      // Refresh to apply new data if any
      try {
        require('../../infrastructure/common_method.js').enter();
      } catch(e){}
    } else {
      callbackSetList([{
        title: '已取消',
        description: '未更改数据存放目录。',
        icon: 'logo.png',
        action: 'noop'
      }]);
    }
  }
}

module.exports = PathCommand;
