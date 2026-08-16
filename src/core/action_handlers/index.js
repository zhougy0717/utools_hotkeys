const actionRegistry = require('../action_registry.js');
const downloadAppHandler = require('./download_app_handler.js');
const noopHandler = require('./noop_handler.js');
const refreshAppListHandler = require('./refresh_app_list_handler.js');
const executeExportHandler = require('./execute_export_handler.js');
const pathActionHandler = require('./path_action_handler.js');
const importFileHandler = require('./import_file_handler.js');

/**
 * Initialize all core action handlers
 */
function initActionHandlers() {
  actionRegistry.register('download_app_hotkeys', downloadAppHandler);
  actionRegistry.register('noop', noopHandler);
  actionRegistry.register('refresh_app_list', refreshAppListHandler);
  actionRegistry.register('execute_builtin_export', executeExportHandler);
  actionRegistry.register('pick_data_directory', pathActionHandler);
  actionRegistry.register('open_data_directory', pathActionHandler);
  actionRegistry.register('import_defkey_file', importFileHandler);
  
  console.log('[ActionRegistry] Handlers initialized');
}

// Auto-init
initActionHandlers();

module.exports = { initActionHandlers };
