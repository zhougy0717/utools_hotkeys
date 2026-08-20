const assert = require('assert');
const fs = require('fs');
const path = require('path');
const BuiltinExportService = require('../src/core/services/builtin_export_service.js');

// Mock Loaders
class MockCheatsheetLoader {
    load() {
        return [
            {
                appId: 'google-chrome',
                appName: 'Google Chrome',
                title: 'New Tab',
                keys: ['t', 'command'],
                icon: 'icons/google-chrome.svg',
                _source: 'cheatsheet_builtin'
            },
            {
                appId: 'vscode',
                appName: 'Visual Studio Code',
                title: 'Command Palette',
                keys: ['p', 'command', 'shift'],
                icon: 'icons/visual-studio-code.svg',
                _source: 'cheatsheet_builtin'
            }
        ];
    }
}

class MockOpencodeLoader {
    load() {
        return [
            {
                appId: 'opencode',
                appName: 'OpenCode',
                title: 'Open Code Action',
                keys: ['o', 'ctrl'],
                icon: 'icons/opencode.png',
                _source: 'opencode'
            },
            // Duplicate of vscode (should be deduplicated in favor of Cheatsheet)
            {
                appId: 'vscode',
                appName: 'VS Code (Opencode)',
                title: 'Duplicate Opencode VSCode',
                keys: ['x'],
                _source: 'opencode'
            }
        ];
    }
}

class MockLegacyBuiltinLoader {
    load() {
        return [
            {
                appId: 'vim',
                appName: 'Vim',
                title: 'Quit',
                keys: [':', 'q'],
                icon: 'icons/vim.png',
                _source: 'builtin'
            },
            // Duplicate of google-chrome (should be deduplicated)
            {
                appId: 'google_chrome',
                appName: 'Legacy Chrome',
                title: 'Legacy New Tab',
                keys: ['t'],
                _source: 'builtin'
            }
        ];
    }
}

describe('BuiltinExportService', () => {
    const testExportRoot = path.join(__dirname, 'mock_export_dest');
    const projectRoot = path.join(__dirname, '..');

    beforeEach(() => {
        if (!fs.existsSync(testExportRoot)) {
            fs.mkdirSync(testExportRoot, { recursive: true });
        }
    });

    afterEach(() => {
        if (fs.existsSync(testExportRoot)) {
            fs.rmSync(testExportRoot, { recursive: true, force: true });
        }
    });

    it('should aggregate shortcuts with priority cheatsheet > opencode > legacy builtin', () => {
        const service = new BuiltinExportService([
            new MockCheatsheetLoader(),
            new MockOpencodeLoader(),
            new MockLegacyBuiltinLoader()
        ]);

        const aggregated = service.getAggregatedBuiltinShortcuts();
        const appIds = [...new Set(aggregated.map(s => s.appId))];

        // Should include chrome, vscode, opencode, vim (4 apps total)
        assert.ok(appIds.includes('google-chrome'));
        assert.ok(appIds.includes('vscode'));
        assert.ok(appIds.includes('opencode'));
        assert.ok(appIds.includes('vim'));
        assert.strictEqual(appIds.length, 4);

        // VSCode should be from cheatsheet
        const vscodeItems = aggregated.filter(s => s.appId === 'vscode');
        assert.strictEqual(vscodeItems.length, 1);
        assert.strictEqual(vscodeItems[0]._source, 'cheatsheet_builtin');

        // Chrome should be from cheatsheet
        const chromeItems = aggregated.filter(s => s.appId === 'google-chrome');
        assert.strictEqual(chromeItems.length, 1);
        assert.strictEqual(chromeItems[0]._source, 'cheatsheet_builtin');
    });

    it('should export aggregated shortcuts to target directory with icons', () => {
        const service = new BuiltinExportService([
            new MockCheatsheetLoader(),
            new MockOpencodeLoader(),
            new MockLegacyBuiltinLoader()
        ]);

        const result = service.exportToDirectory(testExportRoot);
        assert.ok(result.success);
        assert.strictEqual(result.appCount, 4);

        const builtinDir = path.join(testExportRoot, 'builtin');
        const iconsDir = path.join(builtinDir, 'icons');

        assert.ok(fs.existsSync(builtinDir));
        assert.ok(fs.existsSync(iconsDir));

        // Check JSON files
        const chromeJsonPath = path.join(builtinDir, 'google-chrome.json');
        const vimJsonPath = path.join(builtinDir, 'vim.json');
        const opencodeJsonPath = path.join(builtinDir, 'opencode.json');

        assert.ok(fs.existsSync(chromeJsonPath));
        assert.ok(fs.existsSync(vimJsonPath));
        assert.ok(fs.existsSync(opencodeJsonPath));

        const chromeData = JSON.parse(fs.readFileSync(chromeJsonPath, 'utf8'));
        assert.strictEqual(chromeData.appId, 'google-chrome');
        assert.strictEqual(chromeData.appName, 'Google Chrome');
        assert.strictEqual(chromeData.shortcuts.length, 1);
        assert.ok(chromeData.shortcuts[0].description.includes('(builtin)'));

        // Check if icon was copied if source existed
        if (fs.existsSync(path.join(projectRoot, 'icons/google-chrome.svg'))) {
            assert.ok(fs.existsSync(path.join(iconsDir, 'google-chrome.svg')));
            assert.strictEqual(chromeData.icon, 'icons/google-chrome.svg');
        }
    });
});
