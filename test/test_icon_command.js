const assert = require('assert');
const fs = require('fs');
const path = require('path');

const IconCommand = require('../src/core/slash_commands/icon.js');
const iconActionHandler = require('../src/core/action_handlers/icon_action_handler.js');
const importFileHandler = require('../src/core/action_handlers/import_file_handler.js');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

describe('IconCommand and IconActionHandler Suite', () => {
  const tempUserData = path.join(__dirname, 'temp_icon_test_data');
  const mockJsonDir = path.join(tempUserData, 'json_hotkeys');
  const storageMock = new Map();
  let originalUtools;

  beforeEach(() => {
    originalUtools = global.utools;
    if (fs.existsSync(tempUserData)) {
      fs.rmSync(tempUserData, { recursive: true, force: true });
    }
    fs.mkdirSync(mockJsonDir, { recursive: true });

    storageMock.set('sqlite_db_path', tempUserData);

    global.utools = {
      dbStorage: {
        getItem: (key) => storageMock.get(key),
        setItem: (key, val) => storageMock.set(key, val)
      },
      getPath: () => tempUserData,
      isMacOs: () => true,
      isWindows: () => false,
      showNotification: (msg) => {},
      showOpenDialog: () => [path.join(__dirname, '../logo.png')]
    };

    fs.writeFileSync(path.join(mockJsonDir, 'one-commander-3.json'), JSON.stringify({
      appId: 'one-commander-3',
      appName: 'One Commander 3',
      shortcuts: [{ title: 'Copy path', keys: ['ctrl', 'c'] }]
    }), 'utf-8');
  });

  afterEach(() => {
    global.utools = originalUtools;
    if (fs.existsSync(tempUserData)) {
      fs.rmSync(tempUserData, { recursive: true, force: true });
    }
  });

  it('should match /icon command', () => {
    const iconCmd = new IconCommand();
    assert.strictEqual(iconCmd.keyword, '/icon');
    assert.strictEqual(iconCmd.match('/icon'), true);
    assert.strictEqual(iconCmd.match('/icon test'), true);
    assert.strictEqual(iconCmd.match('/download'), false);
  });

  it('should list loaded apps and filter by query', async () => {
    const iconCmd = new IconCommand();
    let list = [];
    await iconCmd.execute('/icon', (res) => { list = res; });

    assert(Array.isArray(list));
    const ocItem = list.find(item => item.appId === 'one-commander-3');
    assert.ok(ocItem, 'one-commander-3 should be listed');
    assert.strictEqual(ocItem.appName, 'One Commander 3');

    let filtered = [];
    await iconCmd.execute('/icon one', (res) => { filtered = res; });
    assert(filtered.some(item => item.appId === 'one-commander-3'));
  });

  it('should render manage_app_icon sub-menu', () => {
    let subMenuList = [];
    iconActionHandler.handle({
      action: 'manage_app_icon',
      appId: 'one-commander-3',
      appName: 'One Commander 3'
    }, {
      callbackSetList: (l) => { subMenuList = l; }
    });

    assert.strictEqual(subMenuList.length, 3);
    assert.strictEqual(subMenuList[0].action, 'pick_app_icon_file');
    assert.strictEqual(subMenuList[1].action, 'generate_app_avatar');
    assert.strictEqual(subMenuList[2].action, 'return_to_icon_list');
  });

  it('should generate avatar and save to icons/ directory with relative path in json', () => {
    let result = [];
    iconActionHandler.handle({
      action: 'generate_app_avatar',
      appId: 'one-commander-3',
      appName: 'One Commander 3'
    }, {
      callbackSetList: (l) => { result = l; }
    });

    assert(result.length > 0);
    const savedJson = JSON.parse(fs.readFileSync(path.join(mockJsonDir, 'one-commander-3.json'), 'utf-8'));
    assert.strictEqual(savedJson.icon, '../icons/one-commander-3.svg');
    assert.strictEqual(savedJson.shortcuts[0].icon, undefined);
    assert(fs.existsSync(path.join(tempUserData, 'icons', 'one-commander-3.svg')));
  });

  it('should pick local icon file and copy to icons/ directory', async () => {
    const mockPng = path.join(tempUserData, 'local_icon.png');
    fs.writeFileSync(mockPng, 'mock_image_binary');
    global.utools.showOpenDialog = () => [mockPng];

    let result = [];
    iconActionHandler.handle({
      action: 'pick_app_icon_file',
      appId: 'one-commander-3',
      appName: 'One Commander 3'
    }, {
      callbackSetList: (l) => { result = l; }
    });

    await sleep(200);

    const savedJson = JSON.parse(fs.readFileSync(path.join(mockJsonDir, 'one-commander-3.json'), 'utf-8'));
    assert.strictEqual(savedJson.icon, '../icons/one-commander-3.png');
    assert.strictEqual(savedJson.shortcuts[0].icon, undefined);
    assert(fs.existsSync(path.join(tempUserData, 'icons', 'one-commander-3.png')));
  });

  it('should import defkey file and save avatar into icons/ directory', async () => {
    const sampleDefkey = `========================================
Test Import App keyboard shortcuts
========================================
https://defkey.com/test-import-app-shortcuts
Last update: 2026-01-01

General
----------------------------------------
Ctrl + S        Save Document
`;
    const sampleTxtPath = path.join(tempUserData, 'sample.txt');
    fs.writeFileSync(sampleTxtPath, sampleDefkey, 'utf-8');

    global.utools.showOpenDialog = () => [sampleTxtPath];

    importFileHandler.handle({}, {
      callbackSetList: (list) => {
        assert(list[0].icon.startsWith('file://'));
      }
    });

    await sleep(100);

    const importedJsonPath = path.join(mockJsonDir, 'test-import-app.json');
    assert(fs.existsSync(importedJsonPath));
    const importedDoc = JSON.parse(fs.readFileSync(importedJsonPath, 'utf-8'));
    assert.strictEqual(importedDoc.icon, '../icons/test-import-app.svg');
    assert.strictEqual(importedDoc.shortcuts[0].icon, undefined);
    assert(fs.existsSync(path.join(tempUserData, 'icons', 'test-import-app.svg')));
  });

  it('should automatically import sibling image file if present in same directory', async () => {
    const sampleDefkey = `========================================
App With Icon keyboard shortcuts
========================================
https://defkey.com/app-with-icon-shortcuts
Last update: 2026-01-01

General
----------------------------------------
Ctrl + C        Copy
`;
    const txtPath = path.join(tempUserData, 'App With Icon.txt');
    const siblingPngPath = path.join(tempUserData, 'App With Icon.png');
    fs.writeFileSync(txtPath, sampleDefkey, 'utf-8');
    fs.writeFileSync(siblingPngPath, 'sibling_png_content');

    global.utools.showOpenDialog = () => [txtPath];

    importFileHandler.handle({}, {
      callbackSetList: (list) => {
        assert(list[0].icon.startsWith('file://'));
      }
    });

    await sleep(100);

    const importedJsonPath = path.join(mockJsonDir, 'app-with-icon.json');
    assert(fs.existsSync(importedJsonPath));
    const importedDoc = JSON.parse(fs.readFileSync(importedJsonPath, 'utf-8'));
    assert.strictEqual(importedDoc.icon, '../icons/app-with-icon.png');
    assert(fs.existsSync(path.join(tempUserData, 'icons', 'app-with-icon.png')));
    assert.strictEqual(fs.readFileSync(path.join(tempUserData, 'icons', 'app-with-icon.png'), 'utf-8'), 'sibling_png_content');
  });
});
