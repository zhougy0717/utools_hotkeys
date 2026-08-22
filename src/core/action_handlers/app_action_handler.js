const AppMappingStorage = require('../../infrastructure/app_mapping_storage.js');
const AppFeatureSyncService = require('../../infrastructure/app_feature_sync_service.js');

/**
 * AppActionHandler - Handles application process mapping configuration actions
 */
class AppActionHandler {
    constructor(options = {}) {
        this.mappingStorage = options.mappingStorage || AppMappingStorage.defaultMappingStorage;
        this.syncService = options.syncService || AppFeatureSyncService.defaultSyncService;
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
        const customMappings = this.mappingStorage.getCustomMappingsForApp(appId);
        const icon = itemData.icon || 'logo.png';

        const customDesc = customMappings.length > 0
            ? `已手动添加 ${customMappings.length} 个: ${customMappings.join(', ')}`
            : '当前无手动添加的进程名（使用默认规则）';

        const menuItems = [
            {
                title: `➕ 添加/追加自定义进程名`,
                description: `为 [${appName}] 添加操作系统进程名 (如 ${appName}.exe, ${appName}.app 等)`,
                icon: icon,
                appId: appId,
                appName: appName,
                action: 'prompt_add_app_mapping'
            },
            {
                title: `📋 管理/删除自定义进程名 (${customMappings.length})`,
                description: customDesc,
                icon: icon,
                appId: appId,
                appName: appName,
                action: 'list_custom_app_mappings'
            },
            {
                title: `🔄 重置为默认推导规则`,
                description: `清除 [${appName}] 的所有手动配置项，恢复默认自动推导`,
                icon: icon,
                appId: appId,
                appName: appName,
                action: 'reset_app_mappings'
            }
        ];

        ui.callbackSetList(menuItems);
    }

    /**
     * Prompt user to add process name with helpful suggestions
     */
    handlePromptAdd(itemData, ui) {
        const appId = itemData.appId;
        const appName = itemData.appName || appId;
        const icon = itemData.icon || 'logo.png';

        const cleanNoSpace = appName.replace(/\s+/g, '');
        const suggestions = [
            `${appName}.exe`,
            `${cleanNoSpace}.exe`,
            `${appName}.app`,
            `${cleanNoSpace}.app`,
            `${appId}.exe`
        ];
        const uniqueSuggestions = Array.from(new Set(suggestions));

        const list = uniqueSuggestions.map(sug => ({
            title: `➕ 绑定: ${sug}`,
            description: `点击立即将 [${sug}] 绑定至 [${appName}]`,
            icon: icon,
            appId: appId,
            appName: appName,
            processName: sug,
            action: 'confirm_add_app_mapping'
        }));

        list.push({
            title: `↩️ 返回 [${appName}] 配置菜单`,
            description: '取消添加并返回',
            icon: icon,
            appId: appId,
            appName: appName,
            action: 'select_app_for_mapping'
        });

        ui.callbackSetList(list);
    }

    /**
     * Confirm adding a process name mapping
     */
    async handleConfirmAdd(itemData, ui) {
        const appId = itemData.appId;
        const appName = itemData.appName || appId;
        const processName = itemData.processName;

        if (processName) {
            this.mappingStorage.addMapping(appId, processName);
            await this.syncService.syncApp(appId, appName);
        }

        // Re-render submenu
        this.handleSelectApp(itemData, ui);
    }

    /**
     * List all custom mappings with delete options
     */
    handleListCustom(itemData, ui) {
        const appId = itemData.appId;
        const appName = itemData.appName || appId;
        const customMappings = this.mappingStorage.getCustomMappingsForApp(appId);
        const icon = itemData.icon || 'logo.png';

        if (customMappings.length === 0) {
            ui.callbackSetList([
                {
                    title: `[${appName}] 暂无手动添加的自定义进程名`,
                    description: '点击返回配置菜单添加新进程名',
                    icon: icon,
                    appId: appId,
                    appName: appName,
                    action: 'select_app_for_mapping'
                }
            ]);
            return;
        }

        const items = customMappings.map(p => ({
            title: `❌ 删除: ${p}`,
            description: `点击移除该自定义进程匹配规则`,
            icon: icon,
            appId: appId,
            appName: appName,
            processName: p,
            action: 'delete_single_app_mapping'
        }));

        items.push({
            title: `↩️ 返回 [${appName}] 配置菜单`,
            description: '返回上级操作',
            icon: icon,
            appId: appId,
            appName: appName,
            action: 'select_app_for_mapping'
        });

        ui.callbackSetList(items);
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

        this.handleSelectApp(itemData, ui);
    }
}

const defaultAppActionHandler = new AppActionHandler();

module.exports = AppActionHandler;
module.exports.defaultAppActionHandler = defaultAppActionHandler;
