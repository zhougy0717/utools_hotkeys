const assert = require('assert');

describe('Preload and Slash Command Lifecycle', () => {
  let mockUtools;
  let onPluginEnterCallback;
  let onPluginOutCallback;

  beforeEach(() => {
    onPluginEnterCallback = null;
    onPluginOutCallback = null;

    mockUtools = {
      isMacOs: () => true,
      isWindows: () => false,
      db: {
        get: () => null
      },
      dbStorage: {
        getItem: (key) => key === 'sqlite_db_path' ? null : {},
        setItem: () => {}
      },
      onPluginEnter: (cb) => { onPluginEnterCallback = cb; },
      onPluginOut: (cb) => { onPluginOutCallback = cb; },
      setSubInputValue: () => {},
      hideMainWindow: () => {}
    };

    global.window = {
      utools: mockUtools,
      exports: {}
    };
    global.utools = mockUtools;

    // Clear module cache to reload preload.js with mock
    delete require.cache[require.resolve('../src/adapter/preload.js')];
  });

  afterEach(() => {
    delete global.window;
    delete global.utools;
  });

  it('should reset active command when entering plugin or onPluginOut', () => {
    require('../src/adapter/preload.js');
    const shortcutsFeature = global.window.exports['shortcuts'];

    let uiList = null;
    const callbackSetList = (list) => { uiList = list; };

    // 1. Initial enter
    shortcutsFeature.args.enter({}, callbackSetList);
    assert.ok(Array.isArray(uiList), 'Should load initial shortcuts');

    // 2. User searches (which sets lastCallbackSetList)
    shortcutsFeature.args.search({}, '/', callbackSetList);

    // 3. Select a slash command (e.g. /download)
    const mockSlashCommand = {
      keyword: '/download',
      execute: (query, cb) => {
        if (typeof cb === 'function') {
          cb([{ title: 'Download Item 1' }]);
        }
      }
    };
    shortcutsFeature.args.select({}, {
      action: 'slash_command',
      command: mockSlashCommand
    });
    assert.strictEqual(uiList[0].title, 'Download Item 1');

    // 4. User types while slash command is active -> routes to slash command
    shortcutsFeature.args.search({}, 'vs', callbackSetList);
    assert.strictEqual(uiList[0].title, 'Download Item 1');

    // 5. User exits plugin via ESC (triggering onPluginOut) or re-enters via enter()
    if (typeof onPluginOutCallback === 'function') {
      onPluginOutCallback();
    }
    shortcutsFeature.args.enter({}, callbackSetList);

    // 6. User searches for a normal shortcut -> should NOT route to slash command
    shortcutsFeature.args.search({}, 'copy', callbackSetList);
    // Result should be normal shortcuts filtering, not 'Download Item 1'
    const hasDownloadItem = uiList && uiList.some(item => item.title === 'Download Item 1');
    assert.strictEqual(hasDownloadItem, false, 'Should not return slash command items after re-entering');
  });

  it('should reset active command on app_shortcuts enter', () => {
    require('../src/adapter/preload.js');
    const appShortcutsFeature = global.window.exports['app_shortcuts'];

    let uiList = null;
    const callbackSetList = (list) => { uiList = list; };

    // 1. Enter app_shortcuts
    appShortcutsFeature.args.enter({ payload: { app: 'Visual Studio Code.app' } }, callbackSetList);
    appShortcutsFeature.args.search({ payload: { app: 'Visual Studio Code.app' } }, '/', callbackSetList);

    // 2. Select slash command
    const mockSlashCommand = {
      keyword: '/icon',
      execute: (query, cb) => {
        if (typeof cb === 'function') {
          cb([{ title: 'Icon Item' }]);
        }
      }
    };
    appShortcutsFeature.args.select({ payload: { app: 'Visual Studio Code.app' } }, {
      action: 'slash_command',
      command: mockSlashCommand
    });
    assert.strictEqual(uiList[0].title, 'Icon Item');

    // 3. Re-enter app_shortcuts
    appShortcutsFeature.args.enter({ payload: { app: 'Visual Studio Code.app' } }, callbackSetList);

    // 4. Search should not route to icon command
    appShortcutsFeature.args.search({ payload: { app: 'Visual Studio Code.app' } }, 'format', callbackSetList);
    const hasIconItem = uiList && uiList.some(item => item.title === 'Icon Item');
    assert.strictEqual(hasIconItem, false, 'Should not return slash command items after re-entering app_shortcuts');
  });
});
