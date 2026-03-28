const path = require('path');
const fs = require('fs');
const BuiltinLoader = require('../../infrastructure/loaders/builtin_loader.js');

/**
 * ExecuteExportHandler - Handles the 'execute_builtin_export' action.
 * Performs the actual export of builtin shortcuts to the configured path.
 */
class ExecuteExportHandler {
  async handle(itemData, ui, context) {
    const savedPath = utools.dbStorage.getItem('sqlite_db_path');
    if (!savedPath) {
      utools.showNotification('未设置数据库路径，请先使用 /path 设置');
      return;
    }

    const exportDir = path.join(savedPath, 'builtin');
    const iconsDir = path.join(exportDir, 'icons');

    try {
      // 1. Create directories
      if (!fs.existsSync(exportDir)) {
        fs.mkdirSync(exportDir, { recursive: true });
      }
      if (!fs.existsSync(iconsDir)) {
        fs.mkdirSync(iconsDir, { recursive: true });
      }

      // 2. Load and group data
      const loader = new BuiltinLoader();
      const allShortcuts = loader.load();
      
      const groups = allShortcuts.reduce((acc, shortcut) => {
        const appId = shortcut.appId || 'unknown';
        if (!acc[appId]) acc[appId] = [];
        acc[appId].push(shortcut);
        return acc;
      }, {});

      const appIds = Object.keys(groups);
      let successCount = 0;

      // 3. Process each group
      for (const appId of appIds) {
        const shortcuts = groups[appId];
        if (shortcuts.length === 0) continue;

        // Icon handling
        let localIconPath = '';
        const firstShortcut = shortcuts[0];
        if (firstShortcut.icon) {
          try {
            // Resolve internal icon path against the plugin root
            // Note: In search logic, __dirname is src/core/action_handlers/
            // Root is ../../../
            const sourceIconPath = path.isAbsolute(firstShortcut.icon) 
              ? firstShortcut.icon 
              : path.join(__dirname, '../../../', firstShortcut.icon);
            
            if (fs.existsSync(sourceIconPath)) {
              const iconExt = path.extname(sourceIconPath) || '.png';
              const iconFileName = `${appId}${iconExt}`;
              const destIconPath = path.join(iconsDir, iconFileName);
              
              fs.copyFileSync(sourceIconPath, destIconPath);
              localIconPath = path.join('icons', iconFileName);
            }
          } catch (err) {
            console.warn(`[ExecuteExportHandler] Failed to copy icon for ${appId}:`, err);
          }
        }

        // Prepare JSON
        const appName = firstShortcut.appName || appId;
        const processedShortcuts = shortcuts.map(s => ({
          ...s,
          icon: localIconPath || s.icon,
          description: s.description ? `${s.description} (builtin)` : '(builtin)'
        }));

        const content = {
          appId: appId,
          appName: appName,
          updatedAt: Date.now(),
          shortcuts: processedShortcuts
        };

        // Write file
        const jsonPath = path.join(exportDir, `${appId}.json`);
        fs.writeFileSync(jsonPath, JSON.stringify(content, null, 2), 'utf8');
        successCount++;
      }

      utools.showNotification(`成功导出 ${successCount} 个应用分类至: ${exportDir}`);
      
      // Update UI to show completion
      ui.update([{
        title: '导出成功',
        description: `已保存 ${successCount} 个文件至: ${exportDir}`,
        icon: 'logo.png',
        action: 'noop'
      }]);

    } catch (e) {
      console.error('[ExecuteExportHandler] Export failed:', e);
      utools.showNotification('导出失败: ' + e.message);
    }
  }
}

module.exports = new ExecuteExportHandler();
