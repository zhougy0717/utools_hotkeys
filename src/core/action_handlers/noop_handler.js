const { enter } = require('../../infrastructure/common_method.js');
const appShortcutMethod = require('../../adapter/app_filter.js');

/**
 * NoopHandler - Handles the 'noop' action.
 * Resets the UI state and returns to the main list.
 */
class NoopHandler {
  handle(itemData, ui, context) {
    // Clear active command state
    if (context && typeof context.clearActiveCommand === 'function') {
        context.clearActiveCommand();
    }
    
    // Clear sub input for better UX when returning
    if (typeof utools !== 'undefined') {
        utools.setSubInputValue('');
    }

    // Refresh the list with the correct scope (app_shortcuts vs shortcuts)
    if (context && context.mainList) {
        ui.update(context.mainList);
    } else {
        // Fallback
        const result = enter();
        ui.update(result[0]);
    }
  }
}

module.exports = new NoopHandler();
