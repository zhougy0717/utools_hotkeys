const fs = require('fs');
const path = require('path');
const { defaultParserRegistry } = require('../parsers/text_parser_registry.js');
const { generateAvatarSvg } = require('../utils/icon_generator.js');
const { defaultStoragePathService } = require('../../infrastructure/storage_path_service.js');

function getUtools() {
  if (typeof utools !== 'undefined') return utools;
  if (typeof window !== 'undefined' && window.utools) return window.utools;
  return null;
}

/**
 * Look for a sibling image with the same base name as the selected text file.
 * e.g., 'One Commander 3.txt' -> 'One Commander 3.png', 'One Commander 3.svg', etc.
 * @param {string} filePath Absolute path to the text file
 * @returns {string|null} Sibling image absolute path or null
 */
function findSiblingImage(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return null;
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, path.extname(filePath));
  const candidateExtensions = ['.png', '.svg', '.jpg', '.jpeg', '.webp', '.ico', '.gif'];

  // 1. Direct match check
  for (const ext of candidateExtensions) {
    const candidatePath = path.join(dir, `${baseName}${ext}`);
    if (fs.existsSync(candidatePath)) {
      return candidatePath;
    }
  }

  // 2. Case-insensitive directory scan check
  try {
    const files = fs.readdirSync(dir);
    const targetPrefix = baseName.toLowerCase() + '.';
    for (const f of files) {
      if (f.toLowerCase().startsWith(targetPrefix)) {
        const ext = path.extname(f).toLowerCase();
        if (candidateExtensions.includes(ext)) {
          return path.join(dir, f);
        }
      }
    }
  } catch (e) {
    // ignore
  }

  return null;
}

/**
 * Action Handler for 'import_defkey_file'
 */
const importFileHandler = {
  handle(itemData, ui, context) {
    const uTools = getUtools();
    if (!uTools || typeof uTools.showOpenDialog !== 'function') {
      const msg = '当前环境不支持选择文件对话框';
      console.warn(`[ImportFileHandler] ${msg}`);
      if (uTools && uTools.showNotification) uTools.showNotification(msg);
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

        const savedPath = defaultStoragePathService.getDataDirectory();

        const targetDir = path.join(savedPath, 'json_hotkeys');
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }

        const iconsDir = path.join(savedPath, 'icons');
        if (!fs.existsSync(iconsDir)) {
          fs.mkdirSync(iconsDir, { recursive: true });
        }

        // Check if there is a sibling image file with same name as txt file (e.g. app.png / app.svg)
        const siblingImg = findSiblingImage(selectedPath);
        let displayIcon = 'logo.png';

        if (siblingImg) {
          const ext = path.extname(siblingImg).toLowerCase() || '.png';
          const iconFileName = `${parsedDoc.appId}${ext}`;
          const targetIconPath = path.join(iconsDir, iconFileName);
          fs.copyFileSync(siblingImg, targetIconPath);
          parsedDoc.icon = `../icons/${iconFileName}`;
          displayIcon = require('url').pathToFileURL(targetIconPath).href;
        } else if (!parsedDoc.icon) {
          const svgAvatar = generateAvatarSvg(parsedDoc.appName);
          const iconFileName = `${parsedDoc.appId}.svg`;
          const targetIconPath = path.join(iconsDir, iconFileName);
          fs.writeFileSync(targetIconPath, svgAvatar, 'utf-8');
          parsedDoc.icon = `../icons/${iconFileName}`;
          displayIcon = require('url').pathToFileURL(targetIconPath).href;
        } else {
          const absIcon = path.isAbsolute(parsedDoc.icon) ? parsedDoc.icon : path.join(targetDir, parsedDoc.icon);
          if (fs.existsSync(absIcon)) {
            displayIcon = require('url').pathToFileURL(absIcon).href;
          }
        }

        // Clean up redundant icons from individual shortcuts
        if (Array.isArray(parsedDoc.shortcuts)) {
          parsedDoc.shortcuts.forEach(s => {
            delete s.icon;
          });
        }

        const targetFile = path.join(targetDir, `${parsedDoc.appId}.json`);
        fs.writeFileSync(targetFile, JSON.stringify(parsedDoc, null, 2), 'utf-8');

        // Dynamically sync window match pattern to uTools feature
        try {
          const { defaultSyncService } = require('../../infrastructure/app_feature_sync_service.js');
          if (defaultSyncService) {
            defaultSyncService.syncApp(parsedDoc.appId, parsedDoc.appName);
          }
        } catch (syncErr) {
          console.warn('[importFileHandler] Dynamic feature sync failed:', syncErr);
        }

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
            icon: displayIcon,
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
