const fs = require('fs');
const path = require('path');
const { generateAvatarSvg, fileToBase64 } = require('../utils/icon_generator.js');

function getUtools() {
  if (typeof utools !== 'undefined') return utools;
  if (typeof window !== 'undefined' && window.utools) return window.utools;
  return null;
}

/**
 * Ensures the target JSON file exists in user custom json_hotkeys directory,
 * saves/copies icon to icons/ directory, and updates JSON with relative icon path.
 * @param {string} appId
 * @param {string} appName
 * @param {{type: 'file'|'svg_content'|'path', sourcePath?: string, content?: string, path?: string}|string} iconOption
 * @param {string} [originalFilePath]
 * @returns {{customFilePath: string, iconPath: string, fileUrl: string}}
 */
function updateAppIcon(appId, appName, iconOption, originalFilePath) {
  const uTools = getUtools();
  const storagePath = (uTools && uTools.dbStorage && uTools.dbStorage.getItem('sqlite_db_path')) ||
    (uTools && typeof uTools.getPath === 'function' ? path.join(uTools.getPath('userData'), 'utools_shortcut_keys') : './');

  const customDir = path.join(storagePath, 'json_hotkeys');
  if (!fs.existsSync(customDir)) {
    fs.mkdirSync(customDir, { recursive: true });
  }

  const iconsDir = path.join(storagePath, 'icons');
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  let relativeIconPath = '';
  let absoluteIconPath = '';

  if (typeof iconOption === 'string') {
    // Backward compatibility if raw string passed
    if (iconOption.startsWith('data:image/svg')) {
      const destFile = path.join(iconsDir, `${appId}.svg`);
      fs.writeFileSync(destFile, iconOption, 'utf-8');
      relativeIconPath = `../icons/${appId}.svg`;
      absoluteIconPath = destFile;
    } else if (iconOption.startsWith('data:image/')) {
      const destFile = path.join(iconsDir, `${appId}.png`);
      const base64Data = iconOption.replace(/^data:image\/\w+;base64,/, '');
      fs.writeFileSync(destFile, Buffer.from(base64Data, 'base64'));
      relativeIconPath = `../icons/${appId}.png`;
      absoluteIconPath = destFile;
    } else {
      relativeIconPath = iconOption;
      absoluteIconPath = path.isAbsolute(iconOption) ? iconOption : path.join(customDir, iconOption);
    }
  } else if (iconOption && iconOption.type === 'file') {
    const srcFile = iconOption.sourcePath;
    const ext = path.extname(srcFile) || '.png';
    const destFile = path.join(iconsDir, `${appId}${ext}`);
    fs.copyFileSync(srcFile, destFile);
    relativeIconPath = `../icons/${appId}${ext}`;
    absoluteIconPath = destFile;
  } else if (iconOption && iconOption.type === 'svg_content') {
    const destFile = path.join(iconsDir, `${appId}.svg`);
    fs.writeFileSync(destFile, iconOption.content, 'utf-8');
    relativeIconPath = `../icons/${appId}.svg`;
    absoluteIconPath = destFile;
  } else if (iconOption && iconOption.type === 'path') {
    relativeIconPath = iconOption.path;
    absoluteIconPath = path.isAbsolute(iconOption.path) ? iconOption.path : path.join(customDir, iconOption.path);
  }

  const customFilePath = path.join(customDir, `${appId}.json`);
  let docData = null;

  if (fs.existsSync(customFilePath)) {
    const raw = fs.readFileSync(customFilePath, 'utf-8');
    docData = JSON.parse(raw);
  } else if (originalFilePath && fs.existsSync(originalFilePath)) {
    const raw = fs.readFileSync(originalFilePath, 'utf-8');
    docData = JSON.parse(raw);
  } else {
    docData = {
      appId,
      appName,
      updatedAt: new Date().toISOString().split('T')[0],
      shortcuts: []
    };
  }

  // Construct clean formatted doc with icon placed near the top
  const cleanDoc = {
    appId: docData.appId || appId,
    appName: docData.appName || appName,
    icon: relativeIconPath,
    platform: docData.platform || 'windows',
    source: docData.source || 'defkey',
    sourceUrl: docData.sourceUrl || undefined,
    updatedAt: docData.updatedAt || new Date().toISOString().split('T')[0],
    shortcuts: Array.isArray(docData.shortcuts) ? docData.shortcuts.map(s => {
      const { icon, ...rest } = s;
      return rest;
    }) : []
  };

  fs.writeFileSync(customFilePath, JSON.stringify(cleanDoc, null, 2), 'utf-8');

  // Trigger reload of global shortcuts cache
  try {
    const { enter } = require('../../infrastructure/common_method.js');
    if (typeof enter === 'function') {
      enter();
    }
  } catch (e) {
    console.warn('[IconActionHandler] Failed to re-enter common_method:', e);
  }

  const fileUrl = fs.existsSync(absoluteIconPath)
    ? require('url').pathToFileURL(absoluteIconPath).href
    : relativeIconPath;

  return { customFilePath, iconPath: relativeIconPath, fileUrl, absoluteIconPath };
}


/**
 * IconActionHandler - Handles icon customization workflows
 */
const iconActionHandler = {
  handle(itemData, ui, context) {
    const uTools = getUtools();
    const action = itemData.action;

    // 1. Show sub-menu options for chosen application
    if (action === 'manage_app_icon') {
      const currentIcon = itemData.currentIcon || generateAvatarSvg(itemData.appName, { asDataUrl: true });
      const subOptions = [
        {
          title: `📁 为 [${itemData.appName}] 选择本地图标文件...`,
          description: '支持 .png, .jpg, .svg, .ico, .webp 文件，自动复制到 icons/ 目录',
          icon: currentIcon,
          appId: itemData.appId,
          appName: itemData.appName,
          filePath: itemData.filePath,
          action: 'pick_app_icon_file'
        },
        {
          title: `🎨 一键生成 [${itemData.appName}] 渐变字母徽标`,
          description: '生成现代 Squircle 矢量徽标并保存至 icons/ 目录',
          icon: generateAvatarSvg(itemData.appName, { asDataUrl: true }),
          appId: itemData.appId,
          appName: itemData.appName,
          filePath: itemData.filePath,
          action: 'generate_app_avatar'
        },
        {
          title: '↩ 返回应用列表',
          description: '返回 /icon 应用选择列表',
          icon: 'logo.png',
          action: 'return_to_icon_list'
        }
      ];

      if (ui && typeof ui.callbackSetList === 'function') {
        ui.callbackSetList(subOptions);
      }
      return;
    }

    // 2. Pick local icon file
    if (action === 'pick_app_icon_file') {
      if (!uTools || typeof uTools.showOpenDialog !== 'function') {
        console.warn('[IconActionHandler] showOpenDialog not available');
        return;
      }

      setTimeout(() => {
        try {
          const filePaths = uTools.showOpenDialog({
            title: `选择 [${itemData.appName}] 的图标文件`,
            filters: [
              { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'svg', 'webp', 'ico', 'gif'] }
            ],
            properties: ['openFile']
          });

          if (!filePaths || filePaths.length === 0) {
            // Fallback: If user cancelled and app has no icon, auto-generate letter avatar
            const generatedAvatar = generateAvatarSvg(itemData.appName);
            const { fileUrl } = updateAppIcon(itemData.appId, itemData.appName, { type: 'svg_content', content: generatedAvatar }, itemData.filePath);
            
            if (uTools.showNotification) {
              uTools.showNotification(`未选择文件，已为 [${itemData.appName}] 自动生成渐变字母徽标并保存至 icons/`);
            }
            if (ui && typeof ui.callbackSetList === 'function') {
              ui.callbackSetList([{
                title: `🎨 已自动生成 [${itemData.appName}] 渐变徽标`,
                description: '未选择本地文件，已保存至 icons/ 并在配置中引用',
                icon: fileUrl,
                action: 'noop'
              }]);
            }
            return;
          }

          const selectedPath = filePaths[0];
          if (!fs.existsSync(selectedPath)) {
            throw new Error('所选图片文件不存在');
          }

          const { fileUrl, iconPath } = updateAppIcon(itemData.appId, itemData.appName, { type: 'file', sourcePath: selectedPath }, itemData.filePath);

          if (uTools.showNotification) {
            uTools.showNotification(`成功更新 [${itemData.appName}] 图标`);
          }

          if (ui && typeof ui.callbackSetList === 'function') {
            ui.callbackSetList([{
              title: `✅ 已成功更新 [${itemData.appName}] 图标`,
              description: `图标文件已复制至 icons/ 目录，JSON 引用: ${iconPath}`,
              icon: fileUrl,
              action: 'noop'
            }]);
          }
        } catch (err) {
          console.error('[IconActionHandler] Failed to pick icon:', err);
          if (uTools && uTools.showNotification) {
            uTools.showNotification(`设置图标失败: ${err.message}`);
          }
        }
      }, 100);
      return;
    }

    // 3. Generate letter avatar directly
    if (action === 'generate_app_avatar') {
      const generatedAvatar = generateAvatarSvg(itemData.appName);
      const { fileUrl, iconPath } = updateAppIcon(itemData.appId, itemData.appName, { type: 'svg_content', content: generatedAvatar }, itemData.filePath);

      if (uTools && uTools.showNotification) {
        uTools.showNotification(`已为 [${itemData.appName}] 生成渐变字母徽标并保存至 icons/`);
      }

      if (ui && typeof ui.callbackSetList === 'function') {
        ui.callbackSetList([{
          title: `🎨 已成功生成 [${itemData.appName}] 渐变徽标`,
          description: `矢量徽标已保存至 icons/ 目录，JSON 引用: ${iconPath}`,
          icon: fileUrl,
          action: 'noop'
        }]);
      }
      return;
    }


    // 4. Return to icon command list
    if (action === 'return_to_icon_list') {
      const IconCommand = require('../slash_commands/icon.js');
      const cmd = new IconCommand();
      cmd.execute('', ui ? ui.callbackSetList : null);
    }
  }
};

module.exports = iconActionHandler;
module.exports.updateAppIcon = updateAppIcon;
