/**
 * The /import command implementation
 * Allows users to select a Defkey plain text export file (.txt) and import it to json_hotkeys/
 */
class ImportCommand {
  constructor() {
    this.keyword = '/import';
  }

  description() {
    return '导入 Defkey 导出的快捷键文本文件 (.txt)';
  }

  match(searchWord) {
    return searchWord.toLowerCase().startsWith(this.keyword);
  }

  async execute(searchWord, callbackSetList) {
    if (typeof callbackSetList === 'function') {
      callbackSetList([
        {
          title: '📁 选择 Defkey 文本文件 (.txt) 导入...',
          description: '选择本地 Defkey 导出的 .txt 快捷键文件并自动转换存储至 json_hotkeys/',
          icon: 'logo.png',
          action: 'import_defkey_file'
        }
      ]);
    }
  }
}

module.exports = ImportCommand;
