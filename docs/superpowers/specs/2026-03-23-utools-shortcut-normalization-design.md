# Design: uTools Shortcut Sequence Normalization

## Context
uTools' `simulateKeyboardTap(key, ...modifiers)` requires the primary "key" (e.g., 'c', 'v', 'enter') as the first argument. If a modifier like `command` or `ctrl` is passed as the first argument, the tap may fail or behave incorrectly.

Currently, some data sources (like `macos.js` or `windows.js`) or user-defined shortcuts might have sequences where the modifier is at the front, e.g., `['ctrl', 'shift', 'c']`.

## Objective
Refactor the "sink" function `hitKeys` in `src/infrastructure/common_method.js` to automatically normalize the key sequence before calling `utools.simulateKeyboardTap`.

## Proposed Changes

### 1. Refactor `hitKeys` in `src/infrastructure/common_method.js`

Modify the function to:
1. Define a list of known modifier keys.
2. Check if the first element of the `keys` array is a modifier.
3. If it is, find the first non-modifier (the "main" key) in the array.
4. Reorder the array so the main key is first, followed by the modifiers.

#### Implementation Logic:
```javascript
hitKeys = (keys) => {
    // List of keys that must not be at the first position
    const modifiers = ['command', 'control', 'ctrl', 'shift', 'option', 'alt', 'meta'];

    if (keys.length > 1 && modifiers.includes(keys[0].toLowerCase())) {
        const mainKeyIndex = keys.findIndex(k => !modifiers.includes(k.toLowerCase()));
        
        if (mainKeyIndex !== -1) {
            const mainKey = keys[mainKeyIndex];
            // Get all other keys (excluding the identified main key)
            const remainingKeys = keys.filter((_, index) => index !== mainKeyIndex);
            // Construct normalization: mainKey followed by all modifiers
            const normalizedKeys = [mainKey, ...remainingKeys];
            
            utools.simulateKeyboardTap(...normalizedKeys);
            return;
        }
    }

    // Default to original sequence if already normalized or if no main key is found
    utools.simulateKeyboardTap(...keys);
}
```

## Testing Plan
- **Standard Sequence**: `['c', 'command']` should remain `['c', 'command']`.
- **Misordered Sequence**: `['ctrl', 'shift', 'v']` should become `['v', 'ctrl', 'shift']`.
- **Single Modifier**: `['shift']` should remain `['shift']`.
- **Special Keys**: `['ctrl', 'enter']` should become `['enter', 'ctrl']`.
- **Case Sensitivity**: Modifiers in uppercase should also be handled.

## Impacts
- No changes required to existing data files (backward compatibility).
- Automatically fixes all loaders (Builtin, SQLite, Custom JSON).
