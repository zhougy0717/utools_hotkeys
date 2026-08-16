const fs = require('fs');
const path = require('path');
const { defaultParserRegistry } = require('../parsers/text_parser_registry.js');
const { generateAvatarSvg } = require('../utils/icon_generator.js');

function getUtools() {
  if (typeof utools !== 'undefined') return utools;
  if (typeof window !== 'undefined' && window.utools) return window.utools;
  return null;
}

/**
 * Action Handler for 'import_defkey_file'
 */
const importFileHandler = {
  handle(itemData, ui, context) {
    const uTools = getUtools();
    if (!uTools || typeof uTools.showOpenDialog !== 'function') {
      console.warn('[importFileHandler] utools.showOpenDialog is not available');
      return;
    }

    // 使用 setTimeout 异步弹出对话框，避免主进程事件冲突
    setTimeout(() => {
      try {
        const filePaths = uTools.showOpenDialog({
          title: '选择 Defkey 文本文件 (.txt)',
          filters: [{ name: 'Text Files', extensions: ['txt'] }],
          properties: ['openFile']
        });

        if (!filePaths || filePaths.length === 0) {
          if (ui && typeof ui.callbackSetList === 'function') {
            ui.callbackSetList([{
              title: '已取消导入',
              description: '未选择任何 Defkey 文本文件',
              icon: 'logo.png',
              action: 'noop'
            }]);
          }
          return;
        }

        const selectedPath = filePaths[0];
        if (!fs.existsSync(selectedPath)) {
          if (uTools.showNotification) uTools.showNotification('导入失败: 选中的文件不存在');
          return;
        }

        const content = fs.readFileSync(selectedPath, 'utf-8');
        const parser = defaultParserRegistry.findParser(content);

        if (!parser) {
          const msg = '导入失败: 未能识别文件格式，请确保为有效的 Defkey 导出文本文件';
          if (uTools.showNotification) uTools.showNotification(msg);
          if (ui && typeof ui.callbackSetList === 'function') {
            ui.callbackSetList([{
              title: '❌ 导入失败',
              description: '未能识别文件格式，请确保为包含 Defkey 快捷键的 .txt 文件',
              icon: 'logo.png',
              action: 'noop'
            }]);
          }
          return;
        }

        const parsedDoc = parser.parse(content);

        // Auto-generate dynamic gradient letter avatar if no icon is set
        if (!parsedDoc.icon) {
          parsedDoc.icon = generateAvatarSvg(parsedDoc.appName);
        }

        if (Array.isArray(parsedDoc.shortcuts)) {
          parsedDoc.shortcuts.forEach(s => {
            if (!s.icon) {
              s.icon = parsedDoc.icon;
            }
          });
        }

        const savedPath = (uTools.dbStorage && uTools.dbStorage.getItem('sqlite_db_path')) ||
          (typeof uTools.getPath === 'function' ? path.join(uTools.getPath('userData'), 'utools_shortcut_keys') : './');

        const targetDir = path.join(savedPath, 'json_hotkeys');
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }

        const targetFile = path.join(targetDir, `${parsedDoc.appId}.json`);
        fs.writeFileSync(targetFile, JSON.stringify(parsedDoc, null, 2), 'utf-8');

        // Trigger cache refresh
        try {
          const { enter } = require('../../infrastructure/common_method.js');
          if (typeof enter === 'function') {
            enter();
          }
        } catch (e) {
          // ignore
        }

        const successMsg = `成功导入 ${parsedDoc.appName} 快捷键 (共 ${parsedDoc.shortcuts.length} 条)`;
        if (uTools.showNotification) {
          uTools.showNotification(successMsg);
        }

        if (ui && typeof ui.callbackSetList === 'function') {
          ui.callbackSetList([{
            title: `✅ 已成功导入 ${parsedDoc.appName}`,
            description: `共 ${parsedDoc.shortcuts.length} 条快捷键，已保存至 json_hotkeys/${parsedDoc.appId}.json`,
            icon: parsedDoc.icon || 'logo.png',
            action: 'noop'
          }]);
        }
      } catch (err) {
        console.error('[importFileHandler] Error importing file:', err);
        if (uTools && uTools.showNotification) {
          uTools.showNotification(`导入失败: ${err.message}`);
        }
        if (ui && typeof ui.callbackSetList === 'function') {
          ui.callbackSetList([{
            title: '❌ 导入发生异常',
            description: err.message,
            icon: 'logo.png',
            action: 'noop'
          }]);
        }
      }
    }, 100);
  }
};

module.exports = importFileHandler;
