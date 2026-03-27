const fs = require('fs');
const path = require('path');

/**
 * Main dispatcher for all shortcut loaders.
 * Scans the src/infrastructure/loaders/ directory and aggregates results.
 */
function loadAllShortcuts() {
    const loadersDir = path.join(__dirname, 'loaders');
    if (!fs.existsSync(loadersDir)) {
        console.error('[ShortcutsLoader] Loaders directory not found at:', loadersDir);
        return [];
    }

    // Get current storage path for custom JSON (shared with SQLite)
    const configPath = utools.db.get('sqlite_db_path');
    const basePath = configPath ? configPath.value : null;

    let allShortcuts = [];
    const downloadedSet = new Set();
    
    // Dynamically discover all loader plugins
    const loaderFiles = fs.readdirSync(loadersDir).filter(f => f.endsWith('.js'));
    const results = [];

    for (const file of loaderFiles) {
        try {
            const LoaderClass = require(path.join(loadersDir, file));
            const loader = new LoaderClass();
            if (typeof loader.load === 'function') {
                const data = loader.load(basePath);
                results.push({ loader, data });
                
                // Identify downloaded apps to avoid duplicate builtin entries
                if (data && data.downloadedApps) {
                    data.downloadedApps.forEach(appId => downloadedSet.add(appId));
                }
            }
        } catch (e) {
            console.error(`[ShortcutsLoader] Failed to execute plugin ${file}:`, e);
        }
    }

    /**
     * Aggregation Logic:
     * 1. JsonHotkeysLoader (User Custom): Highest priority, added first.
     * 2. SqliteLoader (Downloaded Apps): Secondary priority.
     * 3. BuiltinLoader (Default): Filtered by downloadedSet to prevent duplicates.
     */

    const getLoaderName = (inst) => inst.constructor.name;

    // Phase 1: Custom JSON
    results.filter(r => getLoaderName(r.loader) === 'JsonHotkeysLoader')
           .forEach(r => {
               const data = r.data.shortcuts || (Array.isArray(r.data) ? r.data : []);
               allShortcuts = allShortcuts.concat(data);
           });

    // Phase 2: SQLite / DB
    results.filter(r => getLoaderName(r.loader) === 'SqliteLoader')
           .forEach(r => {
               const data = r.data.shortcuts || r.data;
               allShortcuts = allShortcuts.concat(data);
           });

    // Phase 3: Builtin (Filtered)
    results.filter(r => getLoaderName(r.loader) === 'BuiltinLoader')
           .forEach(r => {
               const filtered = r.data.filter(s => !downloadedSet.has(s.appId));
               allShortcuts = allShortcuts.concat(filtered);
           });

    // Final Feedback for Custom Hotkeys
    const customJSON = results.find(r => getLoaderName(r.loader) === 'JsonHotkeysLoader');
    const customCount = customJSON ? (customJSON.data.shortcuts ? customJSON.data.shortcuts.length : (Array.isArray(customJSON.data) ? customJSON.data.length : 0)) : 0;
    if (customCount > 0) {
        utools.showNotification(`已成功加载 ${customCount} 个用户自定义快捷键`);
    }

    console.log(`[ShortcutsLoader] Total shortcuts aggregated: ${allShortcuts.length}`);
    return allShortcuts;
}

module.exports = loadAllShortcuts;