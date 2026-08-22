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

        uiCalls = [];
        mockUi = {
            callbackSetList: (list) => {
                uiCalls.push(list);
            }
        };

        handler = new AppActionHandler({
            mappingStorage: mockStorage,
            syncService: mockSyncService
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
});
