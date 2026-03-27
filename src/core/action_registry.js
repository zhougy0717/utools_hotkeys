/**
 * Action Registry - Centralized dispatcher for uTools list actions.
 * Decouples select() events from concrete implementation.
 */
class ActionRegistry {
  constructor() {
    this.handlers = new Map();
  }

  /**
   * Register a handler for a specific action
   * @param {string} action - Action name (e.g., 'download_app_hotkeys')
   * @param {Object} handler - Object with handle(itemData, ui) method
   */
  register(action, handler) {
    this.handlers.set(action, handler);
  }

  /**
   * Check if an action has a registered handler
   * @param {string} action 
   * @returns {boolean}
   */
  has(action) {
    return this.handlers.has(action);
  }

  /**
   * Dispatch action to the registered handler
   * @param {string} action 
   * @param {Object} itemData - Data from selected list item
   * @param {Object} ui - Instance of UIAdapter
   * @param {Object} context - Optional context (e.g., activeCommand)
   */
  handle(action, itemData, ui, context) {
    const handler = this.handlers.get(action);
    if (handler && typeof handler.handle === 'function') {
      return handler.handle(itemData, ui, context);
    }
    console.warn(`[ActionRegistry] No handler found for action: ${action}`);
    return null;
  }
}

const actionRegistry = new ActionRegistry();

module.exports = actionRegistry;
