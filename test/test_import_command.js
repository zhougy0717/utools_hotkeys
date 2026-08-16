const assert = require('assert');
const path = require('path');
const fs = require('fs');
const ImportCommand = require('../src/core/slash_commands/import.js');
const importFileHandler = require('../src/core/action_handlers/import_file_handler.js');

describe('ImportCommand and importFileHandler', () => {
  const tempDir = path.join(__dirname, 'temp_import_test');
  let originalUtools;

  beforeEach(() => {
    originalUtools = global.utools;
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    fs.mkdirSync(tempDir, { recursive: true });

    // Mock utools
    global.utools = {
      isMacOs: () => true,
      dbStorage: {
        getItem: (key) => (key === 'sqlite_db_path' ? tempDir : null)
      },
      showOpenDialog: (options) => {
        return [path.join(tempDir, 'sample_defkey.txt')];
      },
      showNotification: (msg) => {
        global.lastNotification = msg;
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

  it('ImportCommand should return candidates matching /import', async () => {
    const cmd = new ImportCommand();
    assert.strictEqual(cmd.match('/import'), true);

    let candidates = null;
    await cmd.execute('/import', (list) => {
      candidates = list;
    });

    assert.ok(Array.isArray(candidates));
    assert.strictEqual(candidates.length, 1);
    assert.strictEqual(candidates[0].action, 'import_defkey_file');
  });

  it('importFileHandler should parse valid txt and write to json_hotkeys directory', async () => {
    const sampleTxt = `================================================================================
Sample Tool keyboard shortcuts
================================================================================
https://defkey.com/sample-tool-shortcuts
Last update: 2023-01-01

General
-------
Ctrl + S                         Save project
`;
    const samplePath = path.join(tempDir, 'sample_defkey.txt');
    fs.writeFileSync(samplePath, sampleTxt, 'utf-8');

    await importFileHandler({ action: 'import_defkey_file' });

    const expectedJsonPath = path.join(tempDir, 'json_hotkeys', 'sample-tool.json');
    assert.strictEqual(fs.existsSync(expectedJsonPath), true);

    const savedContent = JSON.parse(fs.readFileSync(expectedJsonPath, 'utf-8'));
    assert.strictEqual(savedContent.appName, 'Sample Tool');
    assert.strictEqual(savedContent.appId, 'sample-tool');
    assert.strictEqual(savedContent.shortcuts.length, 1);
    assert.deepStrictEqual(savedContent.shortcuts[0].keys, ['{cmd_or_ctrl}', 's']);
    assert.ok(global.lastNotification.includes('成功导入 Sample Tool'));
  });

  it('importFileHandler should notify error when parsing fails', async () => {
    const badPath = path.join(tempDir, 'sample_defkey.txt');
    fs.writeFileSync(badPath, 'bad content', 'utf-8');

    await importFileHandler({ action: 'import_defkey_file' });
    assert.ok(global.lastNotification.includes('导入失败'));
  });
});
