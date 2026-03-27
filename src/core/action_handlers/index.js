const actionRegistry = require('../action_registry.js');
const downloadAppHandler = require('./download_app_handler.js');
const noopHandler = require('./noop_handler.js');
const refreshAppListHandler = require('./refresh_app_list_handler.js');

/**
 * Initialize all core action handlers
 */
function initActionHandlers() {
  actionRegistry.register('download_app_hotkeys', downloadAppHandler);
  actionRegistry.register('noop', noopHandler);
  actionRegistry.register('refresh_app_list', refreshAppListHandler);
  
  console.log('[ActionRegistry] Handlers initialized');
}

// Auto-init
initActionHandlers();

module.exports = { initActionHandlers };
