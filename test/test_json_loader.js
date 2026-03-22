const assert = require('assert');
const path = require('path');
const fs = require('fs');

/**
 * Mock global utools for the loader's platform checks
 */
global.utools = {
    isMacOs: () => false,
    isWindows: () => true,
    db: {
        allDocs: () => [],
        get: () => ({ value: 'test_path' })
    }
};

const JsonHotkeysLoader = require('../src/infrastructure/loaders/json_hotkeys_loader.js');

function setupMockDir(mockBasePath) {
    // Cleanup if exists
    if (fs.existsSync(mockBasePath)) {
        fs.rmSync(mockBasePath, { recursive: true, force: true });
    }
    fs.mkdirSync(mockBasePath, { recursive: true });
    const jsonDir = path.join(mockBasePath, 'json_hotkeys');
    fs.mkdirSync(jsonDir, { recursive: true });
    
    // Valid JSON
    const validJSON = [
        { "title": "Test 1", "keys": ["{cmd_or_ctrl}", "t"] }
    ];
    fs.writeFileSync(path.join(jsonDir, 'test_valid.json'), JSON.stringify(validJSON));

    // Invalid JSON
    fs.writeFileSync(path.join(jsonDir, 'test_invalid.json'), 'invalid content');
}

function runTests() {
    console.log('Running JsonHotkeysLoader manual tests...');
    const loader = new JsonHotkeysLoader();
    const mockBasePath = path.join(__dirname, 'mock_config');
    
    try {
        // Test 1: Load valid JSON
        console.log('- Test 1: 载入存在的 JSON 文件');
        setupMockDir(mockBasePath);
        const results = loader.load(mockBasePath);
        assert(Array.isArray(results), '结果应为数组');
        const item = results.find(r => r.title === 'Test 1');
        assert(item, '应找到 Test 1');
        console.log('  Passed.');

        // Test 2: Placeholder conversion (Windows)
        console.log('- Test 2: 占位符转换 (Windows)');
        global.utools.isWindows = () => true;
        global.utools.isMacOs = () => false;
        const resultsWin = loader.load(mockBasePath);
        const itemWin = resultsWin.find(r => r.title === 'Test 1');
        assert(itemWin.keys.includes('ctrl'), 'Windows 下应包含 ctrl');
        console.log('  Passed.');

        // Test 3: Placeholder conversion (Mac)
        console.log('- Test 3: 占位符转换 (Mac)');
        global.utools.isWindows = () => false;
        global.utools.isMacOs = () => true;
        const resultsMac = loader.load(mockBasePath);
        const itemMac = resultsMac.find(r => r.title === 'Test 1');
        assert(itemMac.keys.includes('command'), 'Mac 下应包含 command');
        console.log('  Passed.');

        // Test 4: Handle invalid JSON
        console.log('- Test 4: 非法 JSON 处理 (不溢出)');
        const resultsErr = loader.load(mockBasePath);
        assert(resultsErr.length > 0, '应成功加载其他正常文件');
        console.log('  Passed.');

        console.log('\nAll JsonHotkeysLoader tests passed!');
    } catch (e) {
        console.error('\nTest failed:', e);
        process.exit(1);
    }
}

// Support both mocha and direct node run
if (typeof describe !== 'undefined') {
    describe('JsonHotkeysLoader 单元测试', () => {
        it('should pass all manual logic', () => {
            runTests();
        });
    });
} else {
    runTests();
}
