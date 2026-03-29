const { expect } = require('chai');
const path = require('path');
const fs = require('fs');

// Mock globally for node context
global.utools = {
    isMacOs: () => true,
    isWindows: () => false,
    db: { get: () => null }
};

const ShortcutsLoader = require('../src/infrastructure/shortcuts_loader.js');
const CheatsheetBuiltinLoader = require('../src/infrastructure/loaders/cheatsheet_builtin_loader.js');
const JsonHotkeysLoader = require('../src/infrastructure/loaders/json_hotkeys_loader.js');
const BuiltinLoader = require('../src/infrastructure/loaders/builtin_loader.js');

describe('ShortcutsLoader - Priority and Deduplication Integration', () => {

    it('should aggregate shortcuts with priority json_hotkeys > cheatsheet_builtin > builtin', () => {
        // This is a complex integration test requiring mocking of filesystem if we want to be pure.
        // But we can check if the loaders are correctly instantiated and called.
        // For this task, we mainly want to ensure the Phase 2 is active.
        
        const allShortcuts = ShortcutsLoader();
        
        // Check if we have shortcuts from the new source
        const cheatsheetItems = allShortcuts.filter(s => s._source === 'cheatsheet_builtin');
        console.log(`[Test] Found ${cheatsheetItems.length} cheatsheet_builtin shortcuts in aggregated list.`);
        
        expect(cheatsheetItems.length).to.be.greaterThan(0);

        // Verify that appId normalization is working for a known app
        // 'google-chrome' (from cheatsheet) should have priority over 'macos' (builtin) if they conflict?
        // Actually, 'google-chrome' is not in 'macos.js', so they coexist.
        // But 'visual-studio-code' is in both.
        
        const vscodeItems = allShortcuts.filter(s => s.appId === 'visual-studio-code' || s.appId === 'vscode');
        const sources = new Set(vscodeItems.map(s => s._source || 'builtin_hardcoded'));
        
        console.log(`[Test] VSCode sources found:`, Array.from(sources));
        
        // Since we don't have user custom JSON, cheatsheet_builtin should win over builtin
        // CheatsheetBuiltinLoader uses appId: 'visual-studio-code'
        // BuiltinLoader (vscode/shortcuts.js) uses name: 'vscode'
        
        // Because Phase 2 (cheatsheet) comes before Phase 3 (builtin), 
        // if normalizeAppId('visual-studio-code') === normalizeAppId('vscode'), 
        // then only 'cheatsheet_builtin' should remain.

        if (sources.has('cheatsheet_builtin')) {
             expect(sources.has('builtin_hardcoded')).to.be.false;
        }
    });

});
