const path = require('path');
const fs = require('fs');

/**
 * The /path command implementation.
 * Shows current configuration and provides an item to trigger the path picker.
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
    const savedPath = utools.dbStorage.getItem('sqlite_db_path');
    
    // Determine query if any (though /path doesn't need much filtering)
    const query = searchWord.toLowerCase().startsWith(this.keyword)
      ? searchWord.substring(this.keyword.length).trim().toLowerCase()
      : searchWord.trim().toLowerCase();

    const items = [
      {
        title: '选择快捷键数据存放目录',
        description: `当前目录: ${savedPath || '未设置'}`,
        icon: 'logo.png',
        action: 'pick_data_directory'
      }
    ];

    if (savedPath) {
      items.push({
        title: '打开当前数据存放目录',
        description: savedPath,
        icon: 'logo.png',
        action: 'open_data_directory'
      });
    }

    // Filter items based on query if needed
    const filtered = query 
      ? items.filter(i => i.title.includes(query) || (i.description && i.description.includes(query)))
      : items;

    callbackSetList(filtered);
  }
}

module.exports = PathCommand;
