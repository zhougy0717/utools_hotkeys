const assert = require('assert');
const path = require('path');
const fs = require('fs');
const importFileHandler = require('../src/core/action_handlers/import_file_handler.js');
const loadAllShortcuts = require('../src/infrastructure/shortcuts_loader.js');
const DownloadCommand = require('../src/core/slash_commands/download.js');

describe('Defkey End-to-End Integration & Priority Verification', () => {
  const tempDir = path.join(__dirname, 'mock_integration_env');
  let originalUtools;

  const sampleDefkeyTxt = `================================================================================
One Commander 3 keyboard shortcuts
================================================================================
https://defkey.com/one-commander-3-shortcuts
Last update: 2023-05-01 12:00:00

Window Navigation
-----------------
Ctrl + Shift + W                 Close all tabs
Alt + Left arrow                 Go back
`;

  beforeEach(() => {
    originalUtools = global.utools;
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    fs.mkdirSync(tempDir, { recursive: true });

    const txtFile = path.join(tempDir, 'one_commander_3.txt');
    fs.writeFileSync(txtFile, sampleDefkeyTxt, 'utf-8');

    global.utools = {
      isMacOs: () => true,
      isWindows: () => false,
      db: {
        get: () => null,
        put: () => {}
      },
      dbStorage: {
        getItem: (key) => (key === 'sqlite_db_path' ? tempDir : null)
      },
      showOpenDialog: () => [txtFile],
      showNotification: (msg) => {
        global.lastNotif = msg;
      },
      shellOpenExternal: (url) => {
        global.openedUrl = url;
      },
      getPath: () => tempDir
    };
  });

  afterEach(() => {
    global.utools = originalUtools;
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('E2E: import txt -> persist json -> ShortcutsLoader loads with highest priority', async () => {
    // 1. Execute import
    await importFileHandler({ action: 'import_defkey_file' });

    const jsonPath = path.join(tempDir, 'json_hotkeys', 'one-commander-3.json');
    assert.strictEqual(fs.existsSync(jsonPath), true);

    // 2. Load all shortcuts
    const allShortcuts = loadAllShortcuts(tempDir);
    const importedShortcuts = allShortcuts.filter(s => s.appName === 'One Commander 3' || s.appId === 'one-commander-3');

    assert.ok(importedShortcuts.length >= 2, 'Should load at least 2 imported shortcuts');
    const closeTabs = importedShortcuts.find(s => s.title === 'Close all tabs');
    assert.ok(closeTabs);
    // On Mac, placeholder {cmd_or_ctrl} is resolved to 'command'
    assert.deepStrictEqual(closeTabs.keys, ['command', 'shift', 'w']);
  });

  it('E2E: download command integrates with Defkey search navigation', async () => {
    const cmd = new DownloadCommand();
    cmd.cachedApps = [];

    let candidateList = [];
    await cmd.execute('/download obsidian', (list) => {
      candidateList = list;
    });

    const defkeyOption = candidateList.find(item => item.action === 'open_external_url');
    assert.ok(defkeyOption, 'Defkey parallel option should be present');
    assert.ok(defkeyOption.url.includes('defkey.com/search?q=obsidian'));
  });
});
