const path = require('path');
const BuiltinExportService = require('../services/builtin_export_service.js');

/**
 * ExecuteExportHandler - Handles the 'execute_builtin_export' action.
 * Performs the actual export of all builtin shortcuts to the configured path.
 */
class ExecuteExportHandler {
  constructor(exportService = null) {
    this.exportService = exportService || new BuiltinExportService();
  }

  async handle(itemData, ui, context) {
    const savedPath = utools.dbStorage.getItem('sqlite_db_path');
    if (!savedPath) {
      utools.showNotification('未设置数据路径，请先使用 /path 设置');
      return;
    }

    try {
      const result = this.exportService.exportToDirectory(savedPath);

      utools.showNotification(`成功导出 ${result.appCount} 个应用分类至: ${result.exportDir}`);

      // Update UI to show completion
      ui.update([{
        title: '导出成功',
        description: `已保存 ${result.appCount} 个应用（共 ${result.shortcutCount} 条快捷键）至: ${result.exportDir}`,
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
module.exports.ExecuteExportHandler = ExecuteExportHandler;

