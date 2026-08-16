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
 * copying it from source if necessary, and updates its icon.
 * @param {string} appId
 * @param {string} appName
 * @param {string} newIconBase64
 * @param {string} [originalFilePath]
 */
function updateAppIcon(appId, appName, newIconBase64, originalFilePath) {
  const uTools = getUtools();
  const storagePath = (uTools && uTools.dbStorage && uTools.dbStorage.getItem('sqlite_db_path')) ||
    (uTools && typeof uTools.getPath === 'function' ? path.join(uTools.getPath('userData'), 'utools_shortcut_keys') : './');

  const customDir = path.join(storagePath, 'json_hotkeys');
  if (!fs.existsSync(customDir)) {
    fs.mkdirSync(customDir, { recursive: true });
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

  // Update top-level icon
  docData.icon = newIconBase64;

  // Also update shortcuts icon if present
  if (Array.isArray(docData.shortcuts)) {
    docData.shortcuts.forEach(s => {
      s.icon = newIconBase64;
    });
  }

  fs.writeFileSync(customFilePath, JSON.stringify(docData, null, 2), 'utf-8');

  // Trigger reload of global shortcuts cache
  try {
    const { enter } = require('../../infrastructure/common_method.js');
    if (typeof enter === 'function') {
      enter();
    }
  } catch (e) {
    console.warn('[IconActionHandler] Failed to re-enter common_method:', e);
  }

  return customFilePath;
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
      const currentIcon = itemData.currentIcon || generateAvatarSvg(itemData.appName);
      const subOptions = [
        {
          title: `📁 为 [${itemData.appName}] 选择本地图标文件...`,
          description: '支持 .png, .jpg, .svg, .ico, .webp 文件，自动转换为高清 Base64 图标',
          icon: currentIcon,
          appId: itemData.appId,
          appName: itemData.appName,
          filePath: itemData.filePath,
          action: 'pick_app_icon_file'
        },
        {
          title: `🎨 一键生成 [${itemData.appName}] 渐变字母徽标`,
          description: '根据应用名称生成现代 Squircle 质感矢量渐变头像',
          icon: generateAvatarSvg(itemData.appName),
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
            updateAppIcon(itemData.appId, itemData.appName, generatedAvatar, itemData.filePath);
            
            if (uTools.showNotification) {
              uTools.showNotification(`未选择文件，已为 [${itemData.appName}] 自动生成渐变字母徽标`);
            }
            if (ui && typeof ui.callbackSetList === 'function') {
              ui.callbackSetList([{
                title: `🎨 已自动生成 [${itemData.appName}] 渐变徽标`,
                description: '未选择本地文件，已采用动态渐变字母徽标',
                icon: generatedAvatar,
                action: 'noop'
              }]);
            }
            return;
          }

          const selectedPath = filePaths[0];
          const iconBase64 = fileToBase64(selectedPath);
          if (!iconBase64) {
            throw new Error('未能成功读取所选图片文件');
          }

          updateAppIcon(itemData.appId, itemData.appName, iconBase64, itemData.filePath);

          if (uTools.showNotification) {
            uTools.showNotification(`成功更新 [${itemData.appName}] 图标`);
          }

          if (ui && typeof ui.callbackSetList === 'function') {
            ui.callbackSetList([{
              title: `✅ 已成功更新 [${itemData.appName}] 图标`,
              description: `图标已写入配置并生效，来源文件: ${path.basename(selectedPath)}`,
              icon: iconBase64,
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
      updateAppIcon(itemData.appId, itemData.appName, generatedAvatar, itemData.filePath);

      if (uTools && uTools.showNotification) {
        uTools.showNotification(`已为 [${itemData.appName}] 生成渐变字母徽标`);
      }

      if (ui && typeof ui.callbackSetList === 'function') {
        ui.callbackSetList([{
          title: `🎨 已成功生成 [${itemData.appName}] 渐变徽标`,
          description: '现代 Squircle 矢量字母徽标已生效',
          icon: generatedAvatar,
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
