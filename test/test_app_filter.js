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
});
