/* test/test_normalization.js */
const assert = require('assert');

// Mock utools.simulateKeyboardTap
const mockUtools = {
    lastTap: null,
    simulateKeyboardTap: function(...args) {
        this.lastTap = args;
    }
};

global.utools = mockUtools;

// Define the normalization logic (to be moved to common_method.js)
const modifiers = ['command', 'control', 'ctrl', 'shift', 'option', 'alt', 'meta'];
function normalizeKeys(keys) {
    if (keys.length > 1 && modifiers.includes(keys[0].toLowerCase())) {
        const mainKeyIndex = keys.findIndex(k => !modifiers.includes(k.toLowerCase()));
        if (mainKeyIndex !== -1) {
            const mainKey = keys[mainKeyIndex];
            const remainingKeys = keys.filter((_, index) => index !== mainKeyIndex);
            return [mainKey, ...remainingKeys];
        }
    }
    return keys;
}

// Test cases
try {
    // Case 1: Already normalized
    assert.deepStrictEqual(normalizeKeys(['c', 'command']), ['c', 'command'], 'Should keep normalized sequence');

    // Case 2: Misordered (modifier first)
    assert.deepStrictEqual(normalizeKeys(['ctrl', 'shift', 'v']), ['v', 'ctrl', 'shift'], 'Should move "v" to front');

    // Case 3: Multiple modifiers
    assert.deepStrictEqual(normalizeKeys(['command', 'option', '3']), ['3', 'command', 'option'], 'Should move "3" to front');

    // Case 4: Special keys
    assert.deepStrictEqual(normalizeKeys(['ctrl', 'enter']), ['enter', 'ctrl'], 'Should handle "enter" as main key');

    // Case 5: Case sensitivity
    assert.deepStrictEqual(normalizeKeys(['CTRL', 'C']), ['C', 'CTRL'], 'Should handle uppercase modifiers');

    console.log('✅ Normalization tests passed!');
} catch (e) {
    console.error('❌ Normalization tests failed:');
    console.error(e.message);
    process.exit(1);
}
