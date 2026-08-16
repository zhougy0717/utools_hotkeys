const assert = require('assert');
const { DefkeyParser } = require('../src/core/parsers/defkey_parser.js');

describe('DefkeyParser (UT-01 ~ UT-08)', () => {
  const parser = new DefkeyParser();

  const validDefkeySample = `================================================================================
One Commander 3 keyboard shortcuts
================================================================================
https://defkey.com/one-commander-3-shortcuts
Last update: 2023-01-05 10:00:00

Program operations
------------------
Ctrl + Shift + F12               Open settings
Alt + Up arrow                   Navigate up
Del                              Delete selected
Shift + F10                      Context menu
\\ then Ctrl + C                  (if no file is selected) Copy current path

Tabs
----
Ctrl + T                         New tab
Ctrl + W                         Close tab
`;

  it('UT-01: canParse should return true for valid Defkey banner & url', () => {
    assert.strictEqual(parser.canParse(validDefkeySample), true);
  });

  it('UT-02: canParse should return false for non-defkey content', () => {
    assert.strictEqual(parser.canParse('# Random Markdown Document\nSome content'), false);
    assert.strictEqual(parser.canParse(''), false);
    assert.strictEqual(parser.canParse(null), false);
  });

  it('UT-03: should parse basic metadata (appName, appId, sourceUrl, updatedAt)', () => {
    const result = parser.parse(validDefkeySample);
    assert.strictEqual(result.appName, 'One Commander 3');
    assert.strictEqual(result.appId, 'one-commander-3');
    assert.strictEqual(result.source, 'defkey');
    assert.strictEqual(result.sourceUrl, 'https://defkey.com/one-commander-3-shortcuts');
    assert.strictEqual(result.updatedAt, '2023-01-05 10:00:00');
  });

  it('UT-04: should parse sections and shortcuts with key combination', () => {
    const result = parser.parse(validDefkeySample);
    const settingsItem = result.shortcuts.find(s => s.title === 'Open settings');
    assert.ok(settingsItem, 'Settings item should exist');
    assert.strictEqual(settingsItem.section, 'Program operations');
    assert.deepStrictEqual(settingsItem.keys, ['{cmd_or_ctrl}', 'shift', 'f12']);
  });

  it('UT-05: should normalize special keys (arrow keys, del, etc.)', () => {
    const result = parser.parse(validDefkeySample);
    const navUp = result.shortcuts.find(s => s.title === 'Navigate up');
    assert.deepStrictEqual(navUp.keys, ['{opt_or_alt}', 'up']);

    const delItem = result.shortcuts.find(s => s.title === 'Delete selected');
    assert.deepStrictEqual(delItem.keys, ['delete']);

    const contextItem = result.shortcuts.find(s => s.title === 'Context menu');
    assert.deepStrictEqual(contextItem.keys, ['shift', 'f10']);
  });

  it('UT-06: should normalize sequence keys (e.g. \\ then Ctrl + C)', () => {
    const result = parser.parse(validDefkeySample);
    const seqItem = result.shortcuts.find(s => s.title === 'Copy current path');
    assert.ok(seqItem);
    assert.deepStrictEqual(seqItem.keys, ['\\', 'then', '{cmd_or_ctrl}', 'c']);
  });

  it('UT-07: should split title and description if paren notes present', () => {
    const result = parser.parse(validDefkeySample);
    const seqItem = result.shortcuts.find(s => s.title === 'Copy current path');
    assert.strictEqual(seqItem.description, 'if no file is selected');
  });

  it('UT-08: should handle invalid or short text gracefully', () => {
    assert.throws(() => {
      parser.parse('Too short');
    }, /Invalid Defkey format/);
  });
});
