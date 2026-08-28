const assert = require('assert');
const { normalizeAppId } = require('../src/infrastructure/app_id_normalizer.js');

describe('normalizeAppId', () => {
    it('should lowercase and strip separators', () => {
        assert.strictEqual(normalizeAppId('Visual-Studio-Code'), 'vscode');
        assert.strictEqual(normalizeAppId('jet_brains'), 'jetbrains');
        assert.strictEqual(normalizeAppId('PDF Expert'), 'pdfexpert');
    });

    it('should resolve known aliases to canonical ID', () => {
        // vscode ↔ visual-studio-code 都应归一到同一 key
        assert.strictEqual(normalizeAppId('vscode'), normalizeAppId('visual-studio-code'));
        // jet_brains ↔ intellij-idea
        assert.strictEqual(normalizeAppId('jet_brains'), normalizeAppId('intellij-idea'));
        // SPEC-00017 新增别名
        assert.strictEqual(normalizeAppId('CodeArts-IDE'), normalizeAppId('vscode'));
        assert.strictEqual(normalizeAppId('codearts'), normalizeAppId('vscode'));
        assert.strictEqual(normalizeAppId('codeartside'), normalizeAppId('vscode'));
        assert.strictEqual(normalizeAppId('vscode-huawei'), normalizeAppId('vscode'));
        assert.strictEqual(normalizeAppId('MarginNote 4'), normalizeAppId('margin-note'));
    });

    it('should return identical keys for equivalent app IDs', () => {
        assert.strictEqual(normalizeAppId('margin_note'), normalizeAppId('margin-note'));
        assert.strictEqual(normalizeAppId('commander_one'), normalizeAppId('commander-one'));
        assert.strictEqual(normalizeAppId('Commander One PRO'), normalizeAppId('commander_one'));
        assert.strictEqual(normalizeAppId('Commander One'), normalizeAppId('commander_one'));
        assert.strictEqual(normalizeAppId('One Commander 3'), normalizeAppId('one-commander-3'));
        assert.strictEqual(normalizeAppId('onecommander'), normalizeAppId('one-commander-3'));
        assert.strictEqual(normalizeAppId('QSpace Pro'), normalizeAppId('qspace'));
        assert.strictEqual(normalizeAppId('DEVONthink 3'), normalizeAppId('devonthink'));
        assert.strictEqual(normalizeAppId('DEVONthink Pro'), normalizeAppId('devonthink'));
        assert.strictEqual(normalizeAppId('DEVONthink Pro 3'), normalizeAppId('devonthink'));
        assert.strictEqual(normalizeAppId('PotPlayerMini64'), normalizeAppId('potplayer'));
        assert.strictEqual(normalizeAppId('WeLinkPC'), normalizeAppId('welink'));
        assert.strictEqual(normalizeAppId('Magnet'), normalizeAppId('magnet_macos'));
        assert.strictEqual(normalizeAppId('Folo'), normalizeAppId('follow'));
        assert.strictEqual(normalizeAppId('WINWORD'), normalizeAppId('microsoft-word'));
        assert.strictEqual(normalizeAppId('POWERPNT'), normalizeAppId('microsoft-powerpoint'));
        assert.strictEqual(normalizeAppId('pycharm64'), normalizeAppId('pycharm'));
    });

    it('should handle undefined and empty string', () => {
        assert.strictEqual(normalizeAppId(''), '');
        assert.strictEqual(normalizeAppId(undefined), '');
    });
});
