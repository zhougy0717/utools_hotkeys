const fs = require('fs');
const path = require('path');
const { normalizeAppId } = require('./app_id_normalizer.js');

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

    // Get current storage path for custom JSON
    const configPath = utools.db.get('sqlite_db_path');
    const basePath = configPath ? configPath.value : null;

    let allShortcuts = [];
    
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
            }
        } catch (e) {
            console.error(`[ShortcutsLoader] Failed to execute plugin ${file}:`, e);
        }
    }

    /**
     * Aggregation Logic (priority order):
     * 1. json_hotkeys (User Custom JSON)  — highest priority
     * 2. builtin (Plugin built-in data)   — secondary
     * 3. hotkeycheatsheet (Downloaded)    — lowest
     *
     * When the same app (by normalized ID) exists in multiple sources,
     * only the highest-priority source's data is kept.
     */

    const getLoaderName = (inst) => inst.constructor.name;

    // Track which normalized app IDs have been claimed by higher-priority sources
    const claimedApps = new Set();

    // Phase 1: json_hotkeys (highest priority)
    results.filter(r => getLoaderName(r.loader) === 'JsonHotkeysLoader')
           .forEach(r => {
               const data = r.data.shortcuts || (Array.isArray(r.data) ? r.data : []);
               const jsonHotkeysOnly = data.filter(s => s._source === 'json_hotkeys');
               jsonHotkeysOnly.forEach(s => claimedApps.add(normalizeAppId(s.appId)));
               allShortcuts = allShortcuts.concat(jsonHotkeysOnly);
           });

    // Phase 2: cheatsheet_builtin (secondary priority, NEW)
    results.filter(r => getLoaderName(r.loader) === 'CheatsheetBuiltinLoader')
           .forEach(r => {
               const filtered = r.data.filter(s => !claimedApps.has(normalizeAppId(s.appId)));
               filtered.forEach(s => claimedApps.add(normalizeAppId(s.appId)));
               allShortcuts = allShortcuts.concat(filtered);
           });

    // Phase 3: builtin (tertiary priority, filtered by claimed)
    // 3a: Exported builtin/ JSON files take precedence over hardcoded BuiltinLoader
    results.filter(r => getLoaderName(r.loader) === 'JsonHotkeysLoader')
           .forEach(r => {
               const data = r.data.shortcuts || (Array.isArray(r.data) ? r.data : []);
               const builtinExported = data.filter(s =>
                   s._source === 'builtin' && !claimedApps.has(normalizeAppId(s.appId))
               );
               builtinExported.forEach(s => claimedApps.add(normalizeAppId(s.appId)));
               allShortcuts = allShortcuts.concat(builtinExported);
           });
    // 3b: Hardcoded BuiltinLoader (skipped for apps already covered by exported builtin/ or cheatsheet)
    results.filter(r => getLoaderName(r.loader) === 'BuiltinLoader')
           .forEach(r => {
               const filtered = r.data.filter(s => !claimedApps.has(normalizeAppId(s.appId)));
               // Register builtin app IDs so hotkeycheatsheet won't duplicate
               filtered.forEach(s => claimedApps.add(normalizeAppId(s.appId)));
               allShortcuts = allShortcuts.concat(filtered);
           });

    // Phase 4: hotkeycheatsheet (lowest priority, filtered by claimed)
    results.filter(r => getLoaderName(r.loader) === 'JsonHotkeysLoader')
           .forEach(r => {
               const data = r.data.shortcuts || (Array.isArray(r.data) ? r.data : []);
               const hotkeycheatsheetOnly = data.filter(s =>
                   s._source === 'hotkeycheatsheet' && !claimedApps.has(normalizeAppId(s.appId))
               );
               hotkeycheatsheetOnly.forEach(s => claimedApps.add(normalizeAppId(s.appId)));
               allShortcuts = allShortcuts.concat(hotkeycheatsheetOnly);
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