const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');
const { normalizeAppId } = require('../../infrastructure/app_id_normalizer.js');

const CheatsheetBuiltinLoader = require('../../infrastructure/loaders/cheatsheet_builtin_loader.js');
const OpencodeLoader = require('../../infrastructure/loaders/opencode_loader.js');
const BuiltinLoader = require('../../infrastructure/loaders/builtin_loader.js');

class BuiltinExportService {
    /**
     * @param {Array} [customLoaders] Optional loaders for testing/customization.
     */
    constructor(customLoaders = null) {
        if (Array.isArray(customLoaders)) {
            this.loaders = customLoaders;
        } else {
            this.loaders = [
                new CheatsheetBuiltinLoader(),
                new OpencodeLoader(),
                new BuiltinLoader()
            ];
        }
    }

    /**
     * Aggregates shortcuts from all built-in loaders with priority deduplication:
     * CheatsheetBuiltinLoader > OpencodeLoader > BuiltinLoader
     * @returns {Array} Aggregated array of shortcut items.
     */
    getAggregatedBuiltinShortcuts() {
        const claimedApps = new Set();
        let aggregated = [];

        for (const loader of this.loaders) {
            try {
                if (typeof loader.load !== 'function') continue;
                const result = loader.load();
                const items = Array.isArray(result) ? result : (result && Array.isArray(result.shortcuts) ? result.shortcuts : []);

                // Filter items by unclaimed appIds
                const unclaimedItems = items.filter(item => {
                    const normId = normalizeAppId(item.appId);
                    return normId && !claimedApps.has(normId);
                });

                // Claim appIds
                items.forEach(item => {
                    const normId = normalizeAppId(item.appId);
                    if (normId) {
                        claimedApps.add(normId);
                    }
                });

                aggregated = aggregated.concat(unclaimedItems);
            } catch (err) {
                console.error(`[BuiltinExportService] Error executing loader ${loader.constructor.name}:`, err);
            }
        }

        return aggregated;
    }

    /**
     * Resolves source icon and copies it into target icons directory.
     * @returns {string} Relative icon path for JSON (e.g. "icons/app.png") or empty string.
     */
    resolveAndCopyIcon(sourceIcon, appId, iconsDir) {
        if (!sourceIcon || typeof sourceIcon !== 'string') {
            return '';
        }

        try {
            // Case 1: Base64 URI
            if (sourceIcon.startsWith('data:')) {
                const match = sourceIcon.match(/^data:([^;]+);base64,(.*)$/);
                if (match) {
                    const mime = match[1];
                    const ext = mime.includes('svg') ? 'svg' : 'png';
                    const iconFileName = `${appId}.${ext}`;
                    const destPath = path.join(iconsDir, iconFileName);
                    fs.writeFileSync(destPath, Buffer.from(match[2], 'base64'));
                    return path.join('icons', iconFileName);
                }
            }

            // Case 2: file:// URI
            let diskSourcePath = sourceIcon;
            if (sourceIcon.startsWith('file://')) {
                diskSourcePath = fileURLToPath(sourceIcon);
            } else if (!path.isAbsolute(sourceIcon)) {
                // Relative to plugin project root (from src/core/services -> ../../../)
                const projectRoot = path.resolve(__dirname, '../../../');
                diskSourcePath = path.resolve(projectRoot, sourceIcon);
            }

            if (fs.existsSync(diskSourcePath)) {
                const ext = path.extname(diskSourcePath) || '.png';
                const iconFileName = `${appId}${ext}`;
                const destPath = path.join(iconsDir, iconFileName);
                fs.copyFileSync(diskSourcePath, destPath);
                return path.join('icons', iconFileName);
            }
        } catch (err) {
            console.warn(`[BuiltinExportService] Failed to copy icon for ${appId}:`, err);
        }

        return '';
    }

    /**
     * Exports all built-in shortcuts to <targetBaseDir>/builtin/
     * @param {string} targetBaseDir The base folder configured by the user.
     * @returns {Object} Result summary { success, appCount, shortcutCount, exportDir, iconsDir }
     */
    exportToDirectory(targetBaseDir) {
        if (!targetBaseDir) {
            throw new Error('Target base directory is required for export.');
        }

        const exportDir = path.join(targetBaseDir, 'builtin');
        const iconsDir = path.join(exportDir, 'icons');

        if (!fs.existsSync(exportDir)) {
            fs.mkdirSync(exportDir, { recursive: true });
        }
        if (!fs.existsSync(iconsDir)) {
            fs.mkdirSync(iconsDir, { recursive: true });
        }

        const allShortcuts = this.getAggregatedBuiltinShortcuts();

        // Group by appId
        const groups = allShortcuts.reduce((acc, shortcut) => {
            const appId = shortcut.appId || 'unknown';
            if (!acc[appId]) acc[appId] = [];
            acc[appId].push(shortcut);
            return acc;
        }, {});

        const appIds = Object.keys(groups);
        let successCount = 0;
        let totalShortcutsCount = 0;

        for (const appId of appIds) {
            const shortcuts = groups[appId];
            if (shortcuts.length === 0) continue;

            const firstShortcut = shortcuts[0];
            const appName = firstShortcut.appName || appId;

            // Resolve and copy icon
            const sourceIcon = firstShortcut.icon || '';
            const localIconPath = this.resolveAndCopyIcon(sourceIcon, appId, iconsDir);

            // Prepare shortcuts
            const processedShortcuts = shortcuts.map(s => {
                const item = { ...s };
                // Set relative icon or fallback
                item.icon = localIconPath || item.icon;
                item.description = item.description 
                    ? (item.description.includes('(builtin)') ? item.description : `${item.description} (builtin)`)
                    : '(builtin)';
                delete item._source;
                return item;
            });

            const docContent = {
                appId: appId,
                appName: appName,
                icon: localIconPath || firstShortcut.icon || '',
                updatedAt: Date.now(),
                shortcuts: processedShortcuts
            };

            const jsonPath = path.join(exportDir, `${appId}.json`);
            fs.writeFileSync(jsonPath, JSON.stringify(docContent, null, 2), 'utf8');

            successCount++;
            totalShortcutsCount += processedShortcuts.length;
        }

        return {
            success: true,
            appCount: successCount,
            shortcutCount: totalShortcutsCount,
            exportDir: exportDir,
            iconsDir: iconsDir
        };
    }
}

module.exports = BuiltinExportService;
