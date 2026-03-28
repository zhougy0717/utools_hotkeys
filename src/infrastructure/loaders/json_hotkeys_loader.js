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
        if (!basePath) return { shortcuts: [], downloadedApps: [] };

        const allCustomShortcuts = [];
        const downloadedApps = [];

        try {
            // Scan subdirectories: user custom, exported builtin, and downloaded
            const scanDirs = ['json_hotkeys', 'builtin', 'hotkeycheatsheet'];
            for (const subDir of scanDirs) {
                const dirPath = path.join(basePath, subDir);
                const files = this.scanRecursive(dirPath);
                for (const filePath of files) {
                    try {
                        const content = fs.readFileSync(filePath, 'utf8');
                        const data = JSON.parse(content);
                        
                        // Unified Schema: { appId, appName, shortcuts: [...] }
                        if (data && Array.isArray(data.shortcuts)) {
                            const appId = data.appId || path.basename(filePath, '.json');
                            downloadedApps.push(appId);
                            
                            const processed = data.shortcuts.map(item => {
                                const processedItem = this.processItem(item);
                                
                                // Resolve relative icon paths against the JSON file's directory
                                // Skip data URIs (base64) and URLs
                                if (processedItem.icon 
                                    && !path.isAbsolute(processedItem.icon)
                                    && !processedItem.icon.startsWith('data:')
                                    && !processedItem.icon.startsWith('http')) {
                                    processedItem.icon = path.join(path.dirname(filePath), processedItem.icon);
                                }

                                // Ensure each shortcut carries its appId for global tracking
                                processedItem.appId = appId;
                                processedItem.appName = data.appName || appId;
                                // Tag source subdirectory for priority-based deduplication
                                processedItem._source = subDir;
                                return processedItem;
                            });
                            allCustomShortcuts.push(...processed);
                        } 
                        // Legacy support removed per SPEC-00010, but we can log non-compliant files
                        else if (Array.isArray(data)) {
                            console.warn(`[JsonHotkeysLoader] Skipping legacy array format in ${filePath}. Please migrate to object schema.`);
                        }
                    } catch (e) {
                        console.error(`[JsonHotkeysLoader] Failed to parse ${filePath}:`, e);
                    }
                }
            }
        } catch (e) {
            console.error(`[JsonHotkeysLoader] Failed to process basePath ${basePath}:`, e);
        }

        return { shortcuts: allCustomShortcuts, downloadedApps };
    }

    /**
     * Recursively scans a directory for .json files.
     * @param {string} dir Directory to scan
     * @returns {string[]} List of absolute file paths
     */
    scanRecursive(dir) {
        let results = [];
        if (!fs.existsSync(dir)) return results;
        
        const list = fs.readdirSync(dir);
        for (const file of list) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat && stat.isDirectory()) {
                results = results.concat(this.scanRecursive(filePath));
            } else if (file.endsWith('.json')) {
                results.push(filePath);
            }
        }
        return results;
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
