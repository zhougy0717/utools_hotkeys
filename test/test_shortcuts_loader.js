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

function test4() {
    console.log('Test 4: 应该聚合自定义 JSON 快捷键');
    const shortcuts = loadAllShortcuts();
    const hasCustom = shortcuts.some(s => s.title && s.title.includes('自定义 JSON'));
    assert(hasCustom, '应包含来自 template.json 的自定义快捷键');
    console.log('  Passed.');
}

try {
    test1();
    test2();
    test3();
    test4();
    console.log('\nFinal Integration tests passed!');
} catch (e) {
    console.error('\nTest failed:', e);
    process.exit(1);
}
