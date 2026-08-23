const AppMappingStorage = require('../../infrastructure/app_mapping_storage.js');
const AppFeatureSyncService = require('../../infrastructure/app_feature_sync_service.js');

/**
 * AppActionHandler - Handles application process mapping configuration actions
 */
class AppActionHandler {
    constructor(options = {}) {
        this.mappingStorage = options.mappingStorage || AppMappingStorage.defaultMappingStorage;
        this.syncService = options.syncService || AppFeatureSyncService.defaultSyncService;
        this.appCommand = options.appCommand || null;
    }

    _getAppCommand(context = {}) {
        if (context && context.activeCommand) return context.activeCommand;
        if (this.appCommand) return this.appCommand;
        return null;
    }

    /**
     * Main action dispatcher
     */
    async handle(itemData, ui, context = {}) {
        const action = itemData.action;
        if (!action) return;

        switch (action) {
            case 'select_app_for_mapping':
                return this.handleSelectApp(itemData, ui, context);
            case 'prompt_add_app_mapping':
                return this.handlePromptAdd(itemData, ui, context);
            case 'confirm_add_app_mapping':
                return this.handleConfirmAdd(itemData, ui, context);
            case 'list_custom_app_mappings':
                return this.handleListCustom(itemData, ui, context);
            case 'delete_single_app_mapping':
                return this.handleDeleteSingle(itemData, ui, context);
            case 'reset_app_mappings':
                return this.handleReset(itemData, ui, context);
            case 'return_to_app_list':
                return this.handleReturnToList(ui, context);
            default:
                break;
        }
    }

    /**
     * Render management submenu for a selected application
     */
    handleSelectApp(itemData, ui, context = {}) {
        const appId = itemData.appId;
        const appName = itemData.appName || appId;
        const icon = itemData.icon || 'logo.png';

        const cmd = this._getAppCommand(context);
        if (cmd) {
            cmd.setAppMenuState({ appId, appName, icon, filePath: itemData.filePath });
        }

        const uTools = typeof window !== 'undefined' && window.utools ? window.utools : (typeof utools !== 'undefined' ? utools : null);
        if (uTools && typeof uTools.setSubInputValue === 'function') {
            uTools.setSubInputValue('');
        }

        if (cmd) {
            cmd.execute('', ui ? ui.callbackSetList : null);
        }
    }

    /**
     * Prompt user to add process name with editable text input prefilled
     */
    handlePromptAdd(itemData, ui, context = {}) {
        const appId = itemData.appId;
        const appName = itemData.appName || appId;
        const icon = itemData.icon || 'logo.png';

        const uTools = typeof window !== 'undefined' && window.utools ? window.utools : (typeof utools !== 'undefined' ? utools : null);
        const isMac = uTools && typeof uTools.isMacOs === 'function' ? uTools.isMacOs() : process.platform === 'darwin';

        const defaultVal = isMac ? `${appName}.app` : `${appName}.exe`;

        const cmd = this._getAppCommand(context);
        if (cmd) {
            cmd.setEditProcessState({ appId, appName, icon, filePath: itemData.filePath });
        }

        // Prefill uTools search/sub-input box for the user to edit directly
        if (uTools && typeof uTools.setSubInputValue === 'function') {
            uTools.setSubInputValue(defaultVal);
        }

        if (cmd) {
            cmd.execute(defaultVal, ui ? ui.callbackSetList : null);
        }
    }

    /**
     * Confirm adding a process name mapping
     */
    async handleConfirmAdd(itemData, ui, context = {}) {
        const appId = itemData.appId;
        const appName = itemData.appName || appId;
        const processName = itemData.processName;

        const uTools = typeof window !== 'undefined' && window.utools ? window.utools : (typeof utools !== 'undefined' ? utools : null);

        if (processName && processName.trim()) {
            this.mappingStorage.addMapping(appId, processName.trim());
            await this.syncService.syncApp(appId, appName);
            if (uTools && typeof uTools.showNotification === 'function') {
                uTools.showNotification(`已成功绑定进程 [${processName.trim()}] 至 [${appName}]`);
            }
        }

        // Return to app menu state
        this.handleSelectApp(itemData, ui, context);
    }

    /**
     * List all custom mappings with delete options
     */
    handleListCustom(itemData, ui, context = {}) {
        const appId = itemData.appId;
        const appName = itemData.appName || appId;
        const icon = itemData.icon || 'logo.png';

        const cmd = this._getAppCommand(context);
        if (cmd) {
            cmd.setListCustomState({ appId, appName, icon, filePath: itemData.filePath });
        }

        const uTools = typeof window !== 'undefined' && window.utools ? window.utools : (typeof utools !== 'undefined' ? utools : null);
        if (uTools && typeof uTools.setSubInputValue === 'function') {
            uTools.setSubInputValue('');
        }

        if (cmd) {
            cmd.execute('', ui ? ui.callbackSetList : null);
        }
    }

    /**
     * Delete a single custom mapping and re-sync
     */
    async handleDeleteSingle(itemData, ui, context = {}) {
        const appId = itemData.appId;
        const appName = itemData.appName || appId;
        const processName = itemData.processName;

        if (processName) {
            this.mappingStorage.removeMapping(appId, processName);
            await this.syncService.syncApp(appId, appName);
        }

        this.handleListCustom(itemData, ui, context);
    }

    /**
     * Reset mappings and re-sync
     */
    async handleReset(itemData, ui, context = {}) {
        const appId = itemData.appId;
        const appName = itemData.appName || appId;

        this.mappingStorage.resetMappings(appId);
        await this.syncService.syncApp(appId, appName);

        const uTools = typeof window !== 'undefined' && window.utools ? window.utools : (typeof utools !== 'undefined' ? utools : null);
        if (uTools && typeof uTools.showNotification === 'function') {
            uTools.showNotification(`已重置 [${appName}] 的进程匹配规则为默认推导`);
        }

        this.handleSelectApp(itemData, ui, context);
    }

    /**
     * Return to main /app list
     */
    handleReturnToList(ui, context = {}) {
        const cmd = this._getAppCommand(context);
        if (cmd) {
            cmd.reset();
        }

        const uTools = typeof window !== 'undefined' && window.utools ? window.utools : (typeof utools !== 'undefined' ? utools : null);
        if (uTools && typeof uTools.setSubInputValue === 'function') {
            uTools.setSubInputValue('');
        }

        if (cmd) {
            cmd.execute('', ui ? ui.callbackSetList : null);
        }
    }
}

const defaultAppActionHandler = new AppActionHandler();

module.exports = AppActionHandler;
module.exports.defaultAppActionHandler = defaultAppActionHandler;
