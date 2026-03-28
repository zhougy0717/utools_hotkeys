const path = require('path');
const fs = require('fs');
const BuiltinLoader = require('../../infrastructure/loaders/builtin_loader.js');

/**
 * The /export command implementation
 * Exports builtin shortcuts to a directory, grouped by appId.
 */
class ExportCommand {
  constructor() {
    this.keyword = '/export';
  }

  description() {
    return '导出内置快捷键到目录（按应用拆分并包含图标）';
  }

  match(searchWord) {
    return searchWord.toLowerCase().startsWith(this.keyword);
  }

  async execute(searchWord, callbackSetList) {
    const savedPath = utools.dbStorage.getItem('sqlite_db_path');
    
    if (!savedPath) {
      return callbackSetList([{
        title: '路径未设置',
        description: '导出之前请先使用 /path 设置快捷键数据存放目录',
        icon: 'logo.png',
        action: 'noop'
      }]);
    }

    const exportPath = path.join(savedPath, 'builtin');
    
    callbackSetList([{
      title: '确认导出内置快捷键',
      description: `准备导出至: ${exportPath} (内置/icons 目录下也将保存图标)`,
      icon: 'logo.png',
      action: 'execute_builtin_export'
    }]);
  }
}

module.exports = ExportCommand;
