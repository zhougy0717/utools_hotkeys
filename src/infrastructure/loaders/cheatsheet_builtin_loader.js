const fs = require('fs');
const path = require('path');

/**
 * Loader for pre-processed CheatSheet builtin data.
 */
class CheatsheetBuiltinLoader {
    /**
     * Loads shortcuts from src/infrastructure/data/cheatsheet_builtin/{platform}/
     */
    load() {
        const platform = utools.isMacOs() ? 'mac' : 'win';
        const dataDir = path.join(__dirname, '../data/cheatsheet_builtin/', platform);

        if (!fs.existsSync(dataDir)) {
            console.warn(`[CheatsheetBuiltinLoader] Data directory not found: ${dataDir}`);
            return [];
        }

        const allShortcuts = [];
        try {
            const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

            for (const file of files) {
                const filePath = path.join(dataDir, file);
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    const data = JSON.parse(content);

                    if (data && Array.isArray(data.shortcuts)) {
                        const appId = data.appId || path.basename(file, '.json');
                        const appName = data.appName || appId;

                        const processed = data.shortcuts.map(item => {
                            const newItem = {
                                ...item,
                                appId: appId,
                                appName: appName,
                                _source: 'cheatsheet_builtin'
                            };

                            // Resolve icon path (prioritize item icon, fallback to top-level icon)
                            let iconPath = newItem.icon || data.icon;
                            if (iconPath && !iconPath.startsWith('data:') && !iconPath.startsWith('http') && !iconPath.startsWith('file://')) {
                                const projectRoot = path.join(__dirname, '..', '..', '..');
                                const absPath = path.isAbsolute(iconPath)
                                    ? iconPath
                                    : path.resolve(projectRoot, iconPath);
                                newItem.icon = require('url').pathToFileURL(absPath).href;
                            } else if (iconPath) {
                                newItem.icon = iconPath;
                            }

                            return newItem;
                        });
                        allShortcuts.push(...processed);
                    }
                } catch (e) {
                    console.error(`[CheatsheetBuiltinLoader] Failed to parse ${file}:`, e);
                }
            }
        } catch (e) {
            console.error('[CheatsheetBuiltinLoader] Error scanning directory:', e);
        }

        console.log(`[CheatsheetBuiltinLoader] Loaded ${allShortcuts.length} shortcuts from ${platform} platform.`);
        return allShortcuts;
    }
}

module.exports = CheatsheetBuiltinLoader;
