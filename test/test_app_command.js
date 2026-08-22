const assert = require('assert');
const AppCommand = require('../src/core/slash_commands/app.js');

describe('AppCommand - Application Process Mapping Slash Command (SPEC-00019)', () => {
    let command;
    let mockAppList;
    let mockMappingStorage;
    let mockInferer;

    beforeEach(() => {
        mockAppList = [
            {
                appId: 'one-commander',
                appName: 'One Commander',
                source: '用户自定义/导入',
                count: 15,
                icon: 'logo.png'
            },
            {
                appId: 'google-chrome',
                appName: 'Google Chrome',
                source: '内置数据',
                count: 50,
                icon: 'logo.png'
            }
        ];

        mockMappingStorage = {
            getCustomMappingsForApp: (appId) => appId === 'one-commander' ? ['OneCommanderCustom.exe'] : []
        };

        mockInferer = {
            inferPatterns: (appId, appName) => [`${appName}.app`, `${appName}.exe`]
        };

        command = new AppCommand({
            getAppList: () => mockAppList,
            mappingStorage: mockMappingStorage,
            inferer: mockInferer
        });
    });

    it('TC-001: should match /app and /bind commands', () => {
        assert.strictEqual(command.match('/app'), true);
        assert.strictEqual(command.match('/APP'), true);
        assert.strictEqual(command.match('/app figma'), true);
        assert.strictEqual(command.match('/bind'), true);
        assert.strictEqual(command.match('/bind chrome'), true);
        assert.strictEqual(command.match('/download'), false);
    });

    it('TC-002: should render all apps with process matching summary when query is empty', async () => {
        let renderedList = null;
        await command.execute('/app', (list) => {
            renderedList = list;
        });

        assert.ok(Array.isArray(renderedList));
        assert.strictEqual(renderedList.length, 2);

        const oneCommanderItem = renderedList.find(x => x.appId === 'one-commander');
        assert.ok(oneCommanderItem);
        assert.strictEqual(oneCommanderItem.action, 'select_app_for_mapping');
        assert.ok(oneCommanderItem.description.includes('OneCommanderCustom.exe'));
    });

    it('TC-003: should filter app list based on query', async () => {
        let renderedList = null;
        await command.execute('/app chrome', (list) => {
            renderedList = list;
        });

        assert.ok(Array.isArray(renderedList));
        assert.strictEqual(renderedList.length, 1);
        assert.strictEqual(renderedList[0].appId, 'google-chrome');
    });

    it('TC-004: should show friendly empty state when no apps match query', async () => {
        let renderedList = null;
        await command.execute('/app nonexistent', (list) => {
            renderedList = list;
        });

        assert.ok(Array.isArray(renderedList));
        assert.strictEqual(renderedList.length, 1);
        assert.ok(renderedList[0].title.includes('未找到匹配'));
        assert.strictEqual(renderedList[0].action, 'noop');
    });

    it('TC-005: should support direct binding syntax /app <app> <processName>', async () => {
        let renderedList = null;
        await command.execute('/app google-chrome chrome_custom.exe', (list) => {
            renderedList = list;
        });

        assert.ok(Array.isArray(renderedList));
        const directBindItem = renderedList.find(x => x.action === 'confirm_add_app_mapping');
        assert.ok(directBindItem);
        assert.strictEqual(directBindItem.appId, 'google-chrome');
        assert.strictEqual(directBindItem.processName, 'chrome_custom.exe');
    });

    it('TC-006: should render editable process state in EDIT_PROCESS state with default and presets', async () => {
        command.setEditProcessState({
            appId: 'one-commander',
            appName: 'One Commander',
            icon: 'logo.png'
        });

        let renderedList = null;
        await command.execute('One Commander.exe', (list) => {
            renderedList = list;
        });

        assert.ok(Array.isArray(renderedList));
        assert.strictEqual(renderedList.length, 4);
        assert.strictEqual(renderedList[0].title, '💾 确认保存: One Commander.exe');
        assert.strictEqual(renderedList[0].processName, 'One Commander.exe');
        assert.strictEqual(renderedList[1].title, '➕ 【预设项】OneCommander.exe (无空格版)');
        assert.strictEqual(renderedList[2].title, '➕ 【预设项】One Commander.app (Mac 兼容版)');
        assert.strictEqual(renderedList[3].title, '↩️ 返回 [One Commander] 配置菜单');
    });

    it('TC-007: should render app submenu in APP_MENU state', async () => {
        command.setAppMenuState({
            appId: 'one-commander',
            appName: 'One Commander',
            icon: 'logo.png'
        });

        let renderedList = null;
        await command.execute('', (list) => {
            renderedList = list;
        });

        assert.ok(Array.isArray(renderedList));
        assert.strictEqual(renderedList.length, 4);
        assert.strictEqual(renderedList[0].action, 'prompt_add_app_mapping');
        assert.strictEqual(renderedList[1].action, 'list_custom_app_mappings');
        assert.strictEqual(renderedList[2].action, 'reset_app_mappings');
        assert.strictEqual(renderedList[3].action, 'return_to_app_list');
    });

    it('TC-008: should render custom process list in LIST_CUSTOM state', async () => {
        command.setListCustomState({
            appId: 'one-commander',
            appName: 'One Commander',
            icon: 'logo.png'
        });

        let renderedList = null;
        await command.execute('', (list) => {
            renderedList = list;
        });

        assert.ok(Array.isArray(renderedList));
        assert.strictEqual(renderedList.length, 2); // 1 delete item + 1 back item
        assert.strictEqual(renderedList[0].action, 'delete_single_app_mapping');
        assert.strictEqual(renderedList[0].processName, 'OneCommanderCustom.exe');
        assert.strictEqual(renderedList[1].action, 'select_app_for_mapping');
    });
});



