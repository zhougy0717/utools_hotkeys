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

    _getAppCommand() {
        if (this.appCommand) return this.appCommand;
        try {
            return require('../slash_commands/app.js').defaultAppCommand;
        } catch (e) {
            return null;
        }
    }

    /**
     * Main action dispatcher
     */
    async handle(itemData, ui, context = {}) {
        const action = itemData.action;
        if (!action) return;

        switch (action) {
            case 'select_app_for_mapping':
                return this.handleSelectApp(itemData, ui);
            case 'prompt_add_app_mapping':
                return this.handlePromptAdd(itemData, ui);
            case 'confirm_add_app_mapping':
                return this.handleConfirmAdd(itemData, ui);
            case 'list_custom_app_mappings':
                return this.handleListCustom(itemData, ui);
            case 'delete_single_app_mapping':
                return this.handleDeleteSingle(itemData, ui);
            case 'reset_app_mappings':
                return this.handleReset(itemData, ui);
            case 'return_to_app_list':
                return this.handleReturnToList(ui);
            default:
                break;
        }
    }

    /**
     * Render management submenu for a selected application
     */
    handleSelectApp(itemData, ui) {
        const appId = itemData.appId;
        const appName = itemData.appName || appId;
        const icon = itemData.icon || 'logo.png';

        const cmd = this._getAppCommand();
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
    handlePromptAdd(itemData, ui) {
        const appId = itemData.appId;
        const appName = itemData.appName || appId;
        const icon = itemData.icon || 'logo.png';

        const uTools = typeof window !== 'undefined' && window.utools ? window.utools : (typeof utools !== 'undefined' ? utools : null);
        const isMac = uTools && typeof uTools.isMacOs === 'function' ? uTools.isMacOs() : process.platform === 'darwin';

        const defaultVal = isMac ? `${appName}.app` : `${appName}.exe`;

        const cmd = this._getAppCommand();
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
    async handleConfirmAdd(itemData, ui) {
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
        this.handleSelectApp(itemData, ui);
    }

    /**
     * List all custom mappings with delete options
     */
    handleListCustom(itemData, ui) {
        const appId = itemData.appId;
        const appName = itemData.appName || appId;
        const icon = itemData.icon || 'logo.png';

        const cmd = this._getAppCommand();
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
    async handleDeleteSingle(itemData, ui) {
        const appId = itemData.appId;
        const appName = itemData.appName || appId;
        const processName = itemData.processName;

        if (processName) {
            this.mappingStorage.removeMapping(appId, processName);
            await this.syncService.syncApp(appId, appName);
        }

        this.handleListCustom(itemData, ui);
    }

    /**
     * Reset mappings and re-sync
     */
    async handleReset(itemData, ui) {
        const appId = itemData.appId;
        const appName = itemData.appName || appId;

        this.mappingStorage.resetMappings(appId);
        await this.syncService.syncApp(appId, appName);

        const uTools = typeof window !== 'undefined' && window.utools ? window.utools : (typeof utools !== 'undefined' ? utools : null);
        if (uTools && typeof uTools.showNotification === 'function') {
            uTools.showNotification(`已重置 [${appName}] 的进程匹配规则为默认推导`);
        }

        this.handleSelectApp(itemData, ui);
    }

    /**
     * Return to main /app list
     */
    handleReturnToList(ui) {
        const cmd = this._getAppCommand();
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
