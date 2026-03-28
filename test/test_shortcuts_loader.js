const assert = require('assert');
const path = require('path');
const fs = require('fs');

// Mock utools globally for testing
global.utools = {
    isMacOs: () => false,
    isWindows: () => true,
    db: {
        allDocs: (prefix) => [],
        get: (key) => {
            if (key === 'sqlite_db_path') return { value: path.join(__dirname, 'mock_config') };
            return { value: null };
        }
    },
    showNotification: (msg) => console.log('Notification:', msg),
    getUserDataPath: () => __dirname
};

// Mock sqliteService
const sqliteService = require('../src/infrastructure/sqlite_service.js');
sqliteService.getAllShortcuts = () => [];
sqliteService.getDownloadedApps = () => [];

const loadAllShortcuts = require('../src/infrastructure/shortcuts_loader.js');

function test1() {
    console.log('Test 1: 应该能正常加载并返回数组');
    const shortcuts = loadAllShortcuts();
    assert(Array.isArray(shortcuts));
    console.log(`Loaded ${shortcuts.length} shortcuts`);
}

function test2() {
    console.log('Test 2: 在 Windows 环境下不应该包含 macos 专属快捷键');
    global.utools.isMacOs = () => false;
    global.utools.isWindows = () => true;
    const shortcuts = loadAllShortcuts();
    const hasMagnet = shortcuts.some(s => s.title && s.title.includes('Magnet'));
    assert.strictEqual(hasMagnet, false, 'Windows 环境下不应出现 Magnet 快捷键');
}

function test3() {
    console.log('Test 3: 应该正确转换占位符 {cmd_or_ctrl}');
    global.utools.isMacOs = () => false;
    global.utools.isWindows = () => true;
    const shortcuts = loadAllShortcuts();
    const vsCodeShortcuts = shortcuts.filter(s => s.title && s.title.includes('VSCode'));
    if (vsCodeShortcuts.length > 0) {
        const hasCtrl = vsCodeShortcuts.some(s => s.title && s.title.toLowerCase().includes('ctrl'));
        assert(hasCtrl, 'Windows 下 {cmd_or_ctrl} 应转换为 ctrl');
    }
}

function test5() {
    console.log('Test 5: json_hotkeys 应覆盖 builtin 中的同名应用 (优先级去重)');
    const { normalizeAppId } = require('../src/infrastructure/app_id_normalizer.js');
    
    // Setup: 在 mock_config/json_hotkeys/ 放一个 vscode.json
    const mockBasePath = path.join(__dirname, 'mock_config');
    const jsonDir = path.join(mockBasePath, 'json_hotkeys');
    if (!fs.existsSync(jsonDir)) fs.mkdirSync(jsonDir, { recursive: true });
    
    const customVscode = {
        appId: 'vscode',
        appName: 'VS Code (Custom)',
        shortcuts: [
            { title: 'Custom Shortcut (ctrl+k)', keys: ['ctrl', 'k'], keyword: 'vscode custom' }
        ]
    };
    fs.writeFileSync(path.join(jsonDir, 'vscode.json'), JSON.stringify(customVscode));
    
    // Clear require cache so shortcuts_loader re-discovers files
    delete require.cache[require.resolve('../src/infrastructure/shortcuts_loader.js')];
    delete require.cache[require.resolve('../src/infrastructure/loaders/json_hotkeys_loader.js')];
    const loadAll = require('../src/infrastructure/shortcuts_loader.js');
    const shortcuts = loadAll();
    
    // vscode shortcuts should come from json_hotkeys (Custom), NOT builtin
    const vscodeShortcuts = shortcuts.filter(s =>
        normalizeAppId(s.appId) === normalizeAppId('vscode')
    );
    
    const hasCustom = vscodeShortcuts.some(s => s.title && s.title.includes('Custom Shortcut'));
    assert(hasCustom, 'json_hotkeys 中的 vscode 应被加载');
    
    // All vscode shortcuts should be from json_hotkeys source
    const hasBuiltin = vscodeShortcuts.some(s => s._source === undefined);
    assert(!hasBuiltin, 'builtin 中的 vscode 应被过滤掉');
    
    // Cleanup
    fs.unlinkSync(path.join(jsonDir, 'vscode.json'));
    console.log('  Passed.');
}

try {
    test1();
    test2();
    test3();
    test5();
    console.log('\nFinal Integration tests passed!');
} catch (e) {
    console.error('\nTest failed:', e);
    process.exit(1);
}
