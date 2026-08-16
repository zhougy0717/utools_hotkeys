const assert = require('assert');
const DownloadCommand = require('../src/core/slash_commands/download.js');
const actionRegistry = require('../src/core/action_registry.js');
require('../src/core/action_handlers/index.js');

describe('DownloadCommand - Parallel Defkey Source & Timeout Handling (UT-09, UT-10)', () => {
  let originalUtools;

  beforeEach(() => {
    originalUtools = global.utools;
    global.utools = {
      isMacOs: () => true,
      db: {
        get: () => null,
        put: () => {}
      },
      dbStorage: {
        getItem: () => null
      },
      shellOpenExternal: (url) => {
        global.openedUrl = url;
      }
    };
  });

  afterEach(() => {
    global.utools = originalUtools;
    global.openedUrl = null;
  });

  it('UT-09: should show parallel Defkey item alongside hotkeycheatsheet results when successful', async () => {
    const cmd = new DownloadCommand();
    cmd.cachedApps = [
      { id: 'vscode', name: 'VS Code', description: 'Code Editor' }
    ];

    let resultList = null;
    await cmd.execute('/download vs code', (list) => {
      resultList = list;
    });

    assert.ok(Array.isArray(resultList));
    assert.strictEqual(resultList.length, 2);

    // First item is hotkeycheatsheet app
    assert.strictEqual(resultList[0].id, 'vscode');
    assert.strictEqual(resultList[0].action, 'download_app_hotkeys');

    // Second item is parallel Defkey item
    const defkeyItem = resultList[1];
    assert.strictEqual(defkeyItem.action, 'open_external_url');
    assert.ok(defkeyItem.title.includes('Defkey'));
    assert.ok(defkeyItem.url.includes('defkey.com/search?q=vs%20code'));
  });

  it('UT-10: should show error item and parallel Defkey item on timeout or error', async () => {
    const cmd = new DownloadCommand();
    cmd.cachedApps = null;
    // Mock dataLoader to throw Timeout / AbortError
    const { dataLoader } = require('../src/core/hotkeycheatsheet.js');
    const origFetch = dataLoader.fetchAndProcess;
    dataLoader.fetchAndProcess = async () => {
      const err = new Error('The operation was aborted due to timeout');
      err.name = 'AbortError';
      throw err;
    };

    try {
      let resultList = null;
      await cmd.execute('/download photoshop', (list) => {
        resultList = list;
      });

      assert.ok(Array.isArray(resultList));
      assert.strictEqual(resultList.length, 2);

      // First item is error notice
      assert.ok(resultList[0].title.includes('超时 (30s)'));
      assert.strictEqual(resultList[0].action, 'noop');

      // Second item is Defkey option
      assert.strictEqual(resultList[1].action, 'open_external_url');
      assert.ok(resultList[1].title.includes('Defkey'));
      assert.ok(resultList[1].url.includes('defkey.com/search?q=photoshop'));
    } finally {
      dataLoader.fetchAndProcess = origFetch;
    }
  });

  it('actionRegistry dispatching open_external_url should invoke utools.shellOpenExternal', () => {
    actionRegistry.handle('open_external_url', { action: 'open_external_url', url: 'https://defkey.com/search?q=test' });
    assert.strictEqual(global.openedUrl, 'https://defkey.com/search?q=test');
  });
});
