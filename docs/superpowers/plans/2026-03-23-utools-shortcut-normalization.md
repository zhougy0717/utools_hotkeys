# uTools Shortcut Normalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure modifier keys (command, ctrl, etc.) are never the first argument to `utools.simulateKeyboardTap`.

**Architecture:** Centralized normalization logic within the `hitKeys` function in `src/infrastructure/common_method.js`.

**Tech Stack:** JavaScript (CommonJS).

---

### Task 1: Create Unit Test For Normalization Logic

**Files:**
- Create: `test/test_normalization.js`

- [ ] **Step 1: Create a mock-based test script to verify normalization logic**

```javascript
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
```

- [ ] **Step 2: Run the test script and verify output**

Run: `node test/test_normalization.js`
Expected: `✅ Normalization tests passed!`

- [ ] **Step 3: Commit the test script**

```bash
git add test/test_normalization.js
git commit -m "test: add unit tests for shortcut normalization logic"
```

### Task 2: Refactor `hitKeys` in `src/infrastructure/common_method.js`

**Files:**
- Modify: `src/infrastructure/common_method.js:46-48`

- [ ] **Step 1: Implement normalization logic in `hitKeys`**

Modify `src/infrastructure/common_method.js` to replace the one-line `hitKeys` with:

```javascript
hitKeys = (keys) => {
    const modifiers = ['command', 'control', 'ctrl', 'shift', 'option', 'alt', 'meta'];
    if (keys.length > 1 && modifiers.includes(keys[0].toLowerCase())) {
        const mainKeyIndex = keys.findIndex(k => !modifiers.includes(k.toLowerCase()));
        if (mainKeyIndex !== -1) {
            const mainKey = keys[mainKeyIndex];
            const remainingKeys = keys.filter((_, index) => index !== mainKeyIndex);
            const normalizedKeys = [mainKey, ...remainingKeys];
            utools.simulateKeyboardTap(...normalizedKeys);
            return;
        }
    }
    utools.simulateKeyboardTap(...keys)
}
```

- [ ] **Step 2: Update the unit test to import logic from `common_method.js` (Optional but recommended)**
Since `common_method.js` is not a clean export for unit testing (uses globals), the script above is sufficient for now.

- [ ] **Step 3: Commit the changes**

```bash
git add src/infrastructure/common_method.js
git commit -m "feat: normalize shortcut key sequence before sending to uTools"
```

### Task 3: Final Verification

- [ ] **Step 1: Final documentation check**
Ensure that the design spec is updated if any changes were made during implementation.

- [ ] **Step 2: Cleanup temporary tests**
Decide whether to keep `test/test_normalization.js` or delete it.

```bash
rm test/test_normalization.js
```
(Keep it if you want automated tests in CI).
