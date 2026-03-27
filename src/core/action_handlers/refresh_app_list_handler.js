/**
 * RefreshAppListHandler - Handles the 'refresh_app_list' action.
 * Triggers a forced refresh of the app list from the server.
 */
class RefreshAppListHandler {
  handle(itemData, ui, context) {
    const { activeCommand } = context || {};
    
    if (activeCommand && typeof activeCommand.refresh === 'function') {
      return activeCommand.refresh((list) => ui.update(list));
    }
    
    console.warn('[RefreshAppListHandler] No active command with refresh() found in context');
  }
}

module.exports = new RefreshAppListHandler();
