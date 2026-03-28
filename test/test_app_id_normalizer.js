const assert = require('assert');
const { normalizeAppId } = require('../src/infrastructure/app_id_normalizer.js');

describe('normalizeAppId', () => {
    it('should lowercase and strip separators', () => {
        assert.strictEqual(normalizeAppId('Visual-Studio-Code'), 'visualstudiocode');
        assert.strictEqual(normalizeAppId('jet_brains'), 'jetbrains');
        assert.strictEqual(normalizeAppId('PDF Expert'), 'pdfexpert');
    });

    it('should resolve known aliases to canonical ID', () => {
        // vscode ↔ visual-studio-code 都应归一到同一 key
        assert.strictEqual(normalizeAppId('vscode'), normalizeAppId('visual-studio-code'));
        // jet_brains ↔ intellij-idea
        assert.strictEqual(normalizeAppId('jet_brains'), normalizeAppId('intellij-idea'));
    });

    it('should return identical keys for equivalent app IDs', () => {
        assert.strictEqual(normalizeAppId('margin_note'), normalizeAppId('margin-note'));
        assert.strictEqual(normalizeAppId('commander_one'), normalizeAppId('commander-one'));
    });

    it('should handle undefined and empty string', () => {
        assert.strictEqual(normalizeAppId(''), '');
        assert.strictEqual(normalizeAppId(undefined), '');
    });
});
