const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock uTools environment
const tempUserData = path.join(__dirname, 'temp_icon_test_data');
if (fs.existsSync(tempUserData)) {
  fs.rmSync(tempUserData, { recursive: true, force: true });
}
fs.mkdirSync(tempUserData, { recursive: true });

const storageMock = new Map();
storageMock.set('sqlite_db_path', tempUserData);

global.utools = {
  dbStorage: {
    getItem: (key) => storageMock.get(key),
    setItem: (key, val) => storageMock.set(key, val)
  },
  getPath: () => tempUserData,
  isMacOs: () => true,
  isWindows: () => false,
  showNotification: (msg) => console.log('  [Notification]', msg),
  showOpenDialog: (opts) => [path.join(__dirname, '../logo.png')]
};

const IconCommand = require('../src/core/slash_commands/icon.js');
const iconActionHandler = require('../src/core/action_handlers/icon_action_handler.js');
const slashCommandManager = require('../src/core/slash_command_manager.js');
const importFileHandler = require('../src/core/action_handlers/import_file_handler.js');

console.log('Testing /icon command and icon actions...');

// 1. Test Command Registration & Matching
const iconCmd = new IconCommand();
assert.strictEqual(iconCmd.keyword, '/icon');
assert.strictEqual(iconCmd.match('/icon'), true);
assert.strictEqual(iconCmd.match('/icon test'), true);
assert.strictEqual(iconCmd.match('/download'), false);
console.log('  ✓ IconCommand match passed');

// 2. Test getLoadedAppList and execute
// First, create a mock json in tempUserData/json_hotkeys
const mockJsonDir = path.join(tempUserData, 'json_hotkeys');
fs.mkdirSync(mockJsonDir, { recursive: true });
fs.writeFileSync(path.join(mockJsonDir, 'one-commander-3.json'), JSON.stringify({
  appId: 'one-commander-3',
  appName: 'One Commander 3',
  shortcuts: [{ title: 'Copy path', keys: ['ctrl', 'c'] }]
}), 'utf-8');

let returnedList = null;
iconCmd.execute('/icon', (list) => {
  returnedList = list;
});

assert(Array.isArray(returnedList));
assert(returnedList.length > 0);
const ocItem = returnedList.find(item => item.appId === 'one-commander-3');
assert(ocItem, 'one-commander-3 should be listed in /icon');
assert.strictEqual(ocItem.appName, 'One Commander 3');
assert(ocItem.icon.startsWith('data:image/svg+xml;base64,'), 'Should have generated avatar icon');
console.log('  ✓ IconCommand execution & app discovery passed');

// 3. Test filter by query
let filteredList = null;
iconCmd.execute('/icon one', (list) => {
  filteredList = list;
});
assert(filteredList.some(item => item.appId === 'one-commander-3'));
console.log('  ✓ IconCommand query filtering passed');

// 4. Test manage_app_icon sub-menu
let subMenuList = null;
iconActionHandler.handle({
  action: 'manage_app_icon',
  appId: 'one-commander-3',
  appName: 'One Commander 3',
  currentIcon: ocItem.icon
}, {
  callbackSetList: (list) => { subMenuList = list; }
});

assert(Array.isArray(subMenuList));
assert.strictEqual(subMenuList.length, 3);
assert.strictEqual(subMenuList[0].action, 'pick_app_icon_file');
assert.strictEqual(subMenuList[1].action, 'generate_app_avatar');
assert.strictEqual(subMenuList[2].action, 'return_to_icon_list');
console.log('  ✓ manage_app_icon sub-menu generation passed');

// 5. Test generate_app_avatar action
let generateResultList = null;
iconActionHandler.handle({
  action: 'generate_app_avatar',
  appId: 'one-commander-3',
  appName: 'One Commander 3'
}, {
  callbackSetList: (list) => { generateResultList = list; }
});

assert(generateResultList && generateResultList.length > 0);
const savedJson = JSON.parse(fs.readFileSync(path.join(mockJsonDir, 'one-commander-3.json'), 'utf-8'));
assert(savedJson.icon.startsWith('data:image/svg+xml;base64,'));
assert.strictEqual(savedJson.shortcuts[0].icon, savedJson.icon);
console.log('  ✓ generate_app_avatar action passed');

// 6. Test Defkey import automatic letter avatar injection
const sampleDefkey = `
========================================
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
    assert(list[0].icon.startsWith('data:image/svg+xml;base64,'));
    console.log('  ✓ Defkey import with automatic dynamic avatar passed');
  }
});

setTimeout(() => {
  const importedJsonPath = path.join(mockJsonDir, 'test-import-app.json');
  if (fs.existsSync(importedJsonPath)) {
    const importedDoc = JSON.parse(fs.readFileSync(importedJsonPath, 'utf-8'));
    assert(importedDoc.icon.startsWith('data:image/svg+xml;base64,'));
    assert(importedDoc.shortcuts[0].icon.startsWith('data:image/svg+xml;base64,'));
    console.log('  ✓ Imported JSON verified with SVG avatar');
  }

  // Cleanup
  fs.rmSync(tempUserData, { recursive: true, force: true });
  console.log('All /icon and avatar tests completed successfully! 🎉');
}, 300);
