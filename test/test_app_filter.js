const assert = require('assert');
const appFilter = require('../src/adapter/app_filter.js');

describe('AppFilter - Alias Normalization and Window Matching (SPEC-00017)', () => {
    let mockShortcuts;

    beforeEach(() => {
        global.window = {
            utools: {
                dbStorage: {
                    getItem: () => ({})
                }
            }
        };

        mockShortcuts = [
            {
                title: 'VSCode Command Palette Ctrl+Shift+P',
                description: 'Show Command Palette',
                keys: ['p', 'ctrl', 'shift'],
                keyword: 'visual studio code 全局 显示命令面板',
                appId: 'visual-studio-code',
                appName: 'Visual Studio Code'
            },
            {
                title: 'Chrome New Tab Ctrl+T',
                description: 'New Tab',
                keys: ['t', 'ctrl'],
                keyword: 'google chrome 标签页 新建标签页',
                appId: 'google-chrome',
                appName: 'Google Chrome'
            },
            {
                title: 'MarginNote Extract',
                description: 'Extract note',
                keys: ['e', 'ctrl'],
                keyword: 'margin note 摘录',
                appId: 'margin-note',
                appName: 'MarginNote'
            },
            {
                title: 'Legacy Custom Tool Action',
                description: 'Custom action without appId',
                keys: ['c', 'ctrl'],
                keyword: 'my-custom-tool 自定义操作',
                appName: 'Custom Tool'
            }
        ];
    });

    afterEach(() => {
        delete global.window;
    });

    it('TC-001: should match VSCode shortcuts when front window is CodeArts-IDE.exe', () => {
        const action = { payload: { app: 'CodeArts-IDE.exe' } };
        const result = appFilter(action, mockShortcuts);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].appId, 'visual-studio-code');
    });

    it('TC-002: should match VSCode shortcuts when front window is Visual Studio Code.app', () => {
        const action = { payload: { app: 'Visual Studio Code.app' } };
        const result = appFilter(action, mockShortcuts);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].appId, 'visual-studio-code');
    });

    it('TC-003: should match VSCode shortcuts when front window is Code.exe', () => {
        const action = { payload: { app: 'Code.exe' } };
        const result = appFilter(action, mockShortcuts);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].appId, 'visual-studio-code');
    });

    it('TC-004: should match MarginNote shortcuts when front window is MarginNote 4.app', () => {
        const action = { payload: { app: 'MarginNote 4.app' } };
        const result = appFilter(action, mockShortcuts);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].appId, 'margin-note');
    });

    it('TC-005: should fallback to keyword match when item has no appId', () => {
        const action = { payload: { app: 'my-custom-tool.exe' } };
        const result = appFilter(action, mockShortcuts);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].title, 'Legacy Custom Tool Action');
    });

    it('TC-006: should return empty array when matching unknown app', () => {
        const action = { payload: { app: 'unknown_app.exe' } };
        const result = appFilter(action, mockShortcuts);
        assert.deepStrictEqual(result, []);
    });

    it('TC-007: should sort results by hitTimeStamp descending', () => {
        global.window.utools.dbStorage.getItem = () => ({
            'VSCode Command Palette Ctrl+Shift+P': 100,
            'VSCode New Window': 500
        });

        const testShortcuts = [
            {
                title: 'VSCode Command Palette Ctrl+Shift+P',
                keyword: 'visual studio code',
                appId: 'visual-studio-code'
            },
            {
                title: 'VSCode New Window',
                keyword: 'visual studio code',
                appId: 'visual-studio-code'
            }
        ];

        const action = { payload: { app: 'CodeArts-IDE.exe' } };
        const result = appFilter(action, testShortcuts);
        assert.strictEqual(result.length, 2);
        assert.strictEqual(result[0].title, 'VSCode New Window');
        assert.strictEqual(result[1].title, 'VSCode Command Palette Ctrl+Shift+P');
    });

    it('TC-008: should match shortcuts using custom process name from AppMappingStorage (SPEC-00019)', () => {
        global.window.utools.dbStorage.getItem = (key) => {
            if (key === 'custom_app_process_mappings') {
                return {
                    'one-commander': ['OneCommander.exe', 'OneCommanderCustom.exe']
                };
            }
            return {};
        };

        const testShortcuts = [
            {
                title: 'One Commander New Tab',
                appId: 'one-commander',
                appName: 'One Commander',
                keyword: 'one commander'
            },
            {
                title: 'Chrome New Tab',
                appId: 'google-chrome',
                appName: 'Google Chrome',
                keyword: 'chrome'
            }
        ];

        const action = { payload: { app: 'OneCommanderCustom.exe' } };
        const result = appFilter(action, testShortcuts);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].appId, 'one-commander');
    });

    it('TC-009: should match when app is a full path on macOS or Windows', () => {
        const macAction = { payload: { app: '/Applications/Google Chrome.app' } };
        const macResult = appFilter(macAction, mockShortcuts);
        assert.strictEqual(macResult.length, 1);
        assert.strictEqual(macResult[0].appId, 'google-chrome');

        const winAction = { payload: { app: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' } };
        const winResult = appFilter(winAction, mockShortcuts);
        assert.strictEqual(winResult.length, 1);
        assert.strictEqual(winResult[0].appId, 'google-chrome');
    });

    it('TC-010: should match Directory Opus when front window is dopus.exe', () => {
        const dopusShortcuts = [
            {
                title: 'Dopus Rename F2',
                appId: 'directory_opus',
                appName: 'Directory Opus',
                keyword: 'rename'
            }
        ];
        const action = { payload: { app: 'dopus.exe' } };
        const result = appFilter(action, dopusShortcuts);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].appId, 'directory_opus');
    });

    it('TC-011: should never leak lazynvim shortcuts when in Chrome or Directory Opus', () => {
        const mixedShortcuts = [
            {
                title: 'Chrome New Tab',
                appId: 'google-chrome',
                appName: 'Google Chrome',
                keyword: 'chrome tab'
            },
            {
                title: 'LazyNvim Change Inside',
                appId: 'lazynvim',
                appName: 'LazyNvim',
                keyword: 'lazynvim nvim c d w chrome dopus'
            }
        ];

        const action = { payload: { app: 'Google Chrome.app' } };
        const result = appFilter(action, mixedShortcuts);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].appId, 'google-chrome');
        assert.strictEqual(result[0].title, 'Chrome New Tab');
    });

    it('TC-012: should match Commander One when front window is Commander One PRO.app', () => {
        const commanderShortcuts = [
            {
                title: 'Commander One New Tab',
                appId: 'commander_one',
                appName: 'Commander One',
                keyword: 'commander one tab'
            }
        ];
        const action = { payload: { app: 'Commander One PRO.app' } };
        const result = appFilter(action, commanderShortcuts);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].appId, 'commander_one');
    });

    it('TC-013: should match QSpace Pro when front window is QSpace Pro.app', () => {
        const qspaceShortcuts = [
            {
                title: 'QSpace New Tab',
                appId: 'qspace',
                appName: 'QSpace',
                keyword: 'qspace tab'
            }
        ];
        const action = { payload: { app: 'QSpace Pro.app' } };
        const result = appFilter(action, qspaceShortcuts);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].appId, 'qspace');
    });

    it('TC-014: should match Microsoft Word when front window is WINWORD.EXE', () => {
        const wordShortcuts = [
            {
                title: 'Word Save Ctrl+S',
                appId: 'microsoft-word',
                appName: 'Microsoft Word',
                keyword: 'word save'
            }
        ];
        const action = { payload: { app: 'WINWORD.EXE' } };
        const result = appFilter(action, wordShortcuts);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].appId, 'microsoft-word');
    });

    it('TC-015: should match DEVONthink when front window is DEVONthink.app or DEVONthink Pro.app', () => {
        const devonShortcuts = [
            {
                title: 'DEVONthink Navigate',
                appId: 'devonthink',
                appName: 'DEVONthink',
                keyword: 'navigate'
            }
        ];
        const action1 = { payload: { app: 'DEVONthink.app' } };
        const result1 = appFilter(action1, devonShortcuts);
        assert.strictEqual(result1.length, 1);
        assert.strictEqual(result1[0].appId, 'devonthink');

        const action2 = { payload: { app: 'DEVONthink Pro.app' } };
        const result2 = appFilter(action2, devonShortcuts);
        assert.strictEqual(result2.length, 1);
        assert.strictEqual(result2[0].appId, 'devonthink');
    });
});


