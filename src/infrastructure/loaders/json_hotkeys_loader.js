const fs = require('fs');
const path = require('path');

/**
 * Loader for user-defined JSON hotkeys stored in the configured path.
 */
class JsonHotkeysLoader {
    /**
     * Loads all JSON hotkeys from {basePath}/json_hotkeys/
     * @param {string} basePath The user configured storage path
     */
    load(basePath) {
        if (!basePath) return [];

        const jsonDir = path.join(basePath, 'json_hotkeys');
        if (!fs.existsSync(jsonDir)) {
            return [];
        }

        let allCustomShortcuts = [];
        try {
            const files = fs.readdirSync(jsonDir).filter(f => f.endsWith('.json'));
            for (const file of files) {
                const filePath = path.join(jsonDir, file);
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    const data = JSON.parse(content);
                    if (Array.isArray(data)) {
                        const processed = data.map(item => this.processItem(item));
                        allCustomShortcuts = allCustomShortcuts.concat(processed);
                    }
                } catch (e) {
                    console.error(`[JsonHotkeysLoader] Failed to parse ${file}:`, e);
                }
            }
        } catch (e) {
            console.error(`[JsonHotkeysLoader] Failed to read directory ${jsonDir}:`, e);
        }

        return allCustomShortcuts;
    }

    /**
     * Processes individual shortcut items: placeholder replacement and field fallback.
     */
    processItem(item) {
        const newItem = { ...item };
        
        // Transform keys placeholders
        if (Array.isArray(newItem.keys)) {
            newItem.keys = newItem.keys.map(k => this.updatePlaceHolder(k));
        }

        // Handle other string fields if they contain placeholders (unlikely but safe)
        if (typeof newItem.title === 'string') newItem.title = this.updatePlaceHolder(newItem.title);
        if (typeof newItem.description === 'string') newItem.description = this.updatePlaceHolder(newItem.description);

        // Fallback for missing search fields
        if (!newItem.keyword && newItem.title) newItem.keyword = newItem.title;
        if (!newItem.description && newItem.title) newItem.description = newItem.title;

        return newItem;
    }

    /**
     * Replaces cross-platform placeholders like {cmd_or_ctrl}
     */
    updatePlaceHolder(val) {
        if (typeof val !== 'string') return val;
        let newVal = val;
        if (val.includes('{cmd_or_ctrl}')) {
            if (utools.isMacOs()) {
                newVal = val.replace(/{cmd_or_ctrl}/g, 'command');
            } else if (utools.isWindows()) {
                newVal = val.replace(/{cmd_or_ctrl}/g, 'ctrl');
            }
        }
        if (newVal.includes('{opt_or_alt}')) {
            if (utools.isMacOs()) {
                newVal = newVal.replace(/{opt_or_alt}/g, 'option');
            } else if (utools.isWindows()) {
                newVal = newVal.replace(/{opt_or_alt}/g, 'alt');
            }
        }
        return newVal;
    }
}

module.exports = JsonHotkeysLoader;
