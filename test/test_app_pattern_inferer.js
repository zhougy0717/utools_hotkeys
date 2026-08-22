const assert = require('assert');
const AppPatternInferer = require('../src/infrastructure/app_pattern_inferer.js');

describe('AppPatternInferer - Window Matching Pattern Derivation (SPEC-00018)', () => {
    let inferer;

    beforeEach(() => {
        inferer = new AppPatternInferer();
    });

    it('TC-001: should infer macOS and Windows patterns for standard app (Cursor)', () => {
        const patterns = inferer.inferPatterns('cursor', 'Cursor');
        assert.ok(patterns.includes('Cursor.app'), 'Should include Cursor.app');
        assert.ok(patterns.includes('Cursor.exe'), 'Should include Cursor.exe');
        assert.ok(patterns.includes('cursor.exe'), 'Should include cursor.exe');
    });

    it('TC-002: should infer alias-expanded patterns for VSCode', () => {
        const patterns = inferer.inferPatterns('visual-studio-code', 'Visual Studio Code');
        assert.ok(patterns.includes('Visual Studio Code.app'), 'Should include Visual Studio Code.app');
        assert.ok(patterns.includes('Code.exe') || patterns.includes('code.exe'), 'Should include code.exe or Code.exe');
        assert.ok(patterns.includes('codearts-ide.exe') || patterns.includes('CodeArts-IDE.exe'), 'Should include codearts-ide.exe');
    });

    it('TC-003: should safely handle empty or invalid inputs', () => {
        assert.deepStrictEqual(inferer.inferPatterns('', ''), []);
        assert.deepStrictEqual(inferer.inferPatterns(null, null), []);
        assert.deepStrictEqual(inferer.inferPatterns(undefined, undefined), []);
    });

    it('TC-004: should infer patterns for a list of apps and deduplicate', () => {
        const apps = [
            { appId: 'cursor', appName: 'Cursor' },
            { appId: 'figma', appName: 'Figma' },
            { appId: 'cursor', appName: 'Cursor' } // duplicate
        ];
        const patterns = inferer.inferPatternsForList(apps);
        assert.ok(patterns.includes('Cursor.app'));
        assert.ok(patterns.includes('Figma.app'));
        assert.ok(patterns.includes('Figma.exe'));
        // Check deduplication
        const countCursorApp = patterns.filter(p => p === 'Cursor.app').length;
        assert.strictEqual(countCursorApp, 1);
    });

    it('TC-005: should capitalize hyphenated app ids for app bundle names', () => {
        const patterns = inferer.inferPatterns('sublime-text', 'Sublime Text');
        assert.ok(patterns.includes('Sublime Text.app'));
        assert.ok(patterns.includes('Sublime-Text.app') || patterns.includes('SublimeText.app') || patterns.includes('sublime-text.exe'));
    });
});
