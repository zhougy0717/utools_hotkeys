const fs = require('fs');
const path = require('path');
const { defaultParserRegistry } = require('../parsers/text_parser_registry.js');

/**
 * Action Handler for 'import_defkey_file'
 */
async function importFileHandler(item) {
  try {
    if (typeof utools === 'undefined' || !utools.showOpenDialog) {
      console.warn('[importFileHandler] utools.showOpenDialog is not available');
      return;
    }

    const filePaths = utools.showOpenDialog({
      filters: [{ name: 'Text Files', extensions: ['txt'] }],
      properties: ['openFile']
    });

    if (!filePaths || filePaths.length === 0) {
      return;
    }

    const selectedPath = filePaths[0];
    if (!fs.existsSync(selectedPath)) {
      if (utools.showNotification) utools.showNotification('导入失败: 选中的文件不存在');
      return;
    }

    const content = fs.readFileSync(selectedPath, 'utf-8');
    const parser = defaultParserRegistry.findParser(content);

    if (!parser) {
      if (utools.showNotification) {
        utools.showNotification('导入失败: 未能识别文件格式，请确保为有效的 Defkey 导出文本文件');
      }
      return;
    }

    const parsedDoc = parser.parse(content);

    const savedPath = (typeof utools.dbStorage !== 'undefined' && utools.dbStorage.getItem('sqlite_db_path')) ||
      (typeof utools.getPath === 'function' ? path.join(utools.getPath('userData'), 'utools_shortcut_keys') : './');

    const targetDir = path.join(savedPath, 'json_hotkeys');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetFile = path.join(targetDir, `${parsedDoc.appId}.json`);
    fs.writeFileSync(targetFile, JSON.stringify(parsedDoc, null, 2), 'utf-8');

    if (utools.showNotification) {
      utools.showNotification(`成功导入 ${parsedDoc.appName} 快捷键 (共 ${parsedDoc.shortcuts.length} 条)`);
    }
  } catch (err) {
    console.error('[importFileHandler] Error importing file:', err);
    if (typeof utools !== 'undefined' && utools.showNotification) {
      utools.showNotification(`导入失败: ${err.message}`);
    }
  }
}

module.exports = importFileHandler;
