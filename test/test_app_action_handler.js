const assert = require('assert');
const AppActionHandler = require('../src/core/action_handlers/app_action_handler.js');

describe('AppActionHandler - Application Process Mapping Actions (SPEC-00019)', () => {
    let mockStorage;
    let mockSyncService;
    let syncedApps;
    let uiCalls;
    let mockUi;
    let handler;

    beforeEach(() => {
        const stored = {};
        mockStorage = {
            getCustomMappingsForApp: (appId) => stored[appId] || [],
            addMapping: (appId, p) => {
                if (!stored[appId]) stored[appId] = [];
                if (!stored[appId].includes(p)) stored[appId].push(p);
                return true;
            },
            removeMapping: (appId, p) => {
                if (stored[appId]) stored[appId] = stored[appId].filter(x => x !== p);
                return true;
            },
            resetMappings: (appId) => {
                delete stored[appId];
                return true;
            }
        };

        syncedApps = [];
        mockSyncService = {
            syncApp: async (appId, appName) => {
                syncedApps.push({ appId, appName });
                return true;
            }
        };

        let currentCommandState = 'LIST';
        const mockAppCommand = {
            state: 'LIST',
            setAppMenuState: (app) => { currentCommandState = 'APP_MENU'; },
            setEditProcessState: (app) => { currentCommandState = 'EDIT_PROCESS'; },
            setListCustomState: (app) => { currentCommandState = 'LIST_CUSTOM'; },
            reset: () => { currentCommandState = 'LIST'; },
            execute: (word, cb) => {
                if (currentCommandState === 'EDIT_PROCESS') {
                    cb([
                        { title: `💾 确认保存: ${word}`, action: 'confirm_add_app_mapping', processName: word },
                        { title: `➕ 【预设项】OneCommander.exe (无空格版)`, action: 'confirm_add_app_mapping' },
                        { title: `➕ 【预设项】One Commander.app (Mac 兼容版)`, action: 'confirm_add_app_mapping' },
                        { title: `↩️ 返回 [One Commander] 配置菜单`, action: 'select_app_for_mapping' }
                    ]);
                } else if (currentCommandState === 'APP_MENU') {
                    cb([
                        { title: `➕ 添加/追加自定义进程名`, action: 'prompt_add_app_mapping' },
                        { title: `📋 管理/删除自定义进程名`, action: 'list_custom_app_mappings' },
                        { title: `🔄 重置为默认推导规则`, action: 'reset_app_mappings' },
                        { title: `↩️ 返回应用列表`, action: 'return_to_app_list' }
                    ]);
                } else if (currentCommandState === 'LIST_CUSTOM') {
                    const mappings = mockStorage.getCustomMappingsForApp('one-commander');
                    const items = mappings.map(p => ({
                        title: `❌ 删除: ${p}`,
                        action: 'delete_single_app_mapping',
                        processName: p
                    }));
                    items.push({ title: `↩️ 返回 [One Commander] 配置菜单`, action: 'select_app_for_mapping' });
                    cb(items);
                } else {

                    cb([{ title: 'One Commander', action: 'select_app_for_mapping' }]);
                }
            }
        };


        uiCalls = [];
        mockUi = {
            callbackSetList: (list) => {
                uiCalls.push(list);
            }
        };

        handler = new AppActionHandler({
            mappingStorage: mockStorage,
            syncService: mockSyncService,
            appCommand: mockAppCommand
        });
    });

    it('TC-001: should render submenu on select_app_for_mapping', async () => {
        await handler.handle({
            action: 'select_app_for_mapping',
            appId: 'one-commander',
            appName: 'One Commander'
        }, mockUi);

        assert.strictEqual(uiCalls.length, 1);
        const menu = uiCalls[0];
        assert.ok(menu.length >= 3);
        assert.ok(menu.some(item => item.action === 'prompt_add_app_mapping'));
        assert.ok(menu.some(item => item.action === 'list_custom_app_mappings'));
        assert.ok(menu.some(item => item.action === 'reset_app_mappings'));
    });

    it('TC-002: should add mapping and trigger sync on confirm_add_app_mapping', async () => {
        await handler.handle({
            action: 'confirm_add_app_mapping',
            appId: 'one-commander',
            appName: 'One Commander',
            processName: 'OneCommander.exe'
        }, mockUi);

        assert.deepStrictEqual(mockStorage.getCustomMappingsForApp('one-commander'), ['OneCommander.exe']);
        assert.strictEqual(syncedApps.length, 1);
        assert.strictEqual(syncedApps[0].appId, 'one-commander');

        // Should render updated submenu
        assert.strictEqual(uiCalls.length, 1);
    });

    it('TC-003: should list custom mappings with delete options on list_custom_app_mappings', async () => {
        mockStorage.addMapping('one-commander', 'OneCommander.exe');
        mockStorage.addMapping('one-commander', 'OneCommander.app');

        await handler.handle({
            action: 'list_custom_app_mappings',
            appId: 'one-commander',
            appName: 'One Commander'
        }, mockUi);

        assert.strictEqual(uiCalls.length, 1);
        const list = uiCalls[0];
        assert.strictEqual(list.length, 3); // 2 delete items + 1 back item
        assert.ok(list.some(item => item.action === 'delete_single_app_mapping' && item.processName === 'OneCommander.exe'));
    });

    it('TC-004: should delete mapping and re-sync on delete_single_app_mapping', async () => {
        mockStorage.addMapping('one-commander', 'OneCommander.exe');

        await handler.handle({
            action: 'delete_single_app_mapping',
            appId: 'one-commander',
            appName: 'One Commander',
            processName: 'OneCommander.exe'
        }, mockUi);

        assert.deepStrictEqual(mockStorage.getCustomMappingsForApp('one-commander'), []);
        assert.strictEqual(syncedApps.length, 1);
    });

    it('TC-005: should reset all mappings and re-sync on reset_app_mappings', async () => {
        mockStorage.addMapping('one-commander', 'OneCommander.exe');

        await handler.handle({
            action: 'reset_app_mappings',
            appId: 'one-commander',
            appName: 'One Commander'
        }, mockUi);

        assert.deepStrictEqual(mockStorage.getCustomMappingsForApp('one-commander'), []);
        assert.strictEqual(syncedApps.length, 1);
    });

    it('TC-006: should set editing mode on prompt_add_app_mapping', async () => {
        await handler.handle({
            action: 'prompt_add_app_mapping',
            appId: 'one-commander',
            appName: 'One Commander'
        }, mockUi);

        assert.strictEqual(uiCalls.length, 1);
        assert.ok(uiCalls[0].some(item => item.action === 'confirm_add_app_mapping'));
    });
});

