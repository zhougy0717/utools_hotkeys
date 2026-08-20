const assert = require('assert');
const fs = require('fs');
const path = require('path');
const ExportCommand = require('../src/core/slash_commands/export.js');
const { ExecuteExportHandler } = require('../src/core/action_handlers/execute_export_handler.js');
const BuiltinExportService = require('../src/core/services/builtin_export_service.js');

describe('Full Builtin Export Integration', () => {
    const tempExportBase = path.join(__dirname, 'mock_full_export');
    let originalUtools;

    beforeEach(() => {
        if (!fs.existsSync(tempExportBase)) {
            fs.mkdirSync(tempExportBase, { recursive: true });
        }

        // Mock global utools if needed
        originalUtools = global.utools;
        global.utools = {
            dbStorage: {
                getItem: (key) => {
                    if (key === 'sqlite_db_path') return tempExportBase;
                    return null;
                }
            },
            isMacOs: () => true,
            isWindows: () => false,
            showNotification: (msg) => {
                // console.log('[MockNotification]', msg);
            }
        };
    });

    afterEach(() => {
        global.utools = originalUtools;
        if (fs.existsSync(tempExportBase)) {
            fs.rmSync(tempExportBase, { recursive: true, force: true });
        }
    });

    it('should export all built-in loaders (Cheatsheet, Opencode, Legacy) to destination', async () => {
        const handler = new ExecuteExportHandler();
        const uiMock = {
            update: (items) => {
                assert.ok(items && items.length > 0);
                assert.strictEqual(items[0].title, '导出成功');
            }
        };

        await handler.handle({}, uiMock, {});

        const exportDir = path.join(tempExportBase, 'builtin');
        const iconsDir = path.join(exportDir, 'icons');

        assert.ok(fs.existsSync(exportDir), 'Export dir should exist');
        assert.ok(fs.existsSync(iconsDir), 'Icons dir should exist');

        const exportedFiles = fs.readdirSync(exportDir).filter(f => f.endsWith('.json'));
        console.log(`[Integration Test] Total exported JSON apps: ${exportedFiles.length}`);

        // Check essential apps from different loaders
        // 1. From Cheatsheet Builtin (mac)
        assert.ok(exportedFiles.includes('google-chrome.json'), 'Should export google-chrome');
        assert.ok(exportedFiles.includes('intellij-idea.json'), 'Should export intellij-idea');
        assert.ok(exportedFiles.includes('visual-studio-code.json'), 'Should export visual-studio-code');
        assert.ok(exportedFiles.includes('microsoft-word.json'), 'Should export microsoft-word');

        // 2. From Opencode
        assert.ok(exportedFiles.includes('opencode.json'), 'Should export opencode');

        // 3. From Legacy Builtin
        assert.ok(exportedFiles.includes('vim.json'), 'Should export vim');
        assert.ok(exportedFiles.includes('tmux.json'), 'Should export tmux');

        // Verify Schema for google-chrome.json
        const chromeJson = JSON.parse(fs.readFileSync(path.join(exportDir, 'google-chrome.json'), 'utf8'));
        assert.strictEqual(chromeJson.appId, 'google-chrome');
        assert.strictEqual(chromeJson.appName, 'Google Chrome');
        assert.ok(Array.isArray(chromeJson.shortcuts));
        assert.ok(chromeJson.shortcuts.length > 0);
        assert.ok(chromeJson.shortcuts[0].description.includes('(builtin)'));

        // Verify Schema for vim.json
        const vimJson = JSON.parse(fs.readFileSync(path.join(exportDir, 'vim.json'), 'utf8'));
        assert.strictEqual(vimJson.appId, 'vim');
        assert.ok(Array.isArray(vimJson.shortcuts));
        assert.ok(vimJson.shortcuts.length > 0);

        // Verify icons copied to iconsDir
        const iconFiles = fs.readdirSync(iconsDir);
        console.log(`[Integration Test] Total copied icons: ${iconFiles.length}`);
        assert.ok(iconFiles.length > 0, 'Icons should be copied');
    });

    it('should notify user if database path is not configured', async () => {
        global.utools.dbStorage.getItem = () => null;

        let notifiedMsg = '';
        global.utools.showNotification = (msg) => {
            notifiedMsg = msg;
        };

        const handler = new ExecuteExportHandler();
        await handler.handle({}, { update: () => {} }, {});

        assert.ok(notifiedMsg.includes('未设置数据路径'));
    });
});
