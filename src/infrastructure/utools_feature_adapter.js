const fs = require('fs');
const path = require('path');
const { defaultStoragePathService } = require('./storage_path_service.js');

/**
 * UToolsFeatureAdapter - Manages interactions with uTools runtime feature APIs,
 * local storage directory scanning, and development environment persistence.
 */
class UToolsFeatureAdapter {
    constructor(options = {}) {
        this.rootDir = options.rootDir || path.resolve(__dirname, '../../');
        this.dataDir = options.dataDir || null;
        this.storagePathService = options.storagePathService || defaultStoragePathService;
    }

    getUtools() {
        if (typeof utools !== 'undefined') return utools;
        if (typeof window !== 'undefined' && window.utools) return window.utools;
        return null;
    }

    getDataDirectory() {
        if (this.dataDir) return this.dataDir;
        if (this.storagePathService && typeof this.storagePathService.getDataDirectory === 'function') {
            return this.storagePathService.getDataDirectory();
        }
        return process.cwd();
    }

    getBasePluginJson() {
        try {
            const pluginJsonPath = path.join(this.rootDir, 'plugin.json');
            if (fs.existsSync(pluginJsonPath)) {
                const raw = fs.readFileSync(pluginJsonPath, 'utf8');
                return JSON.parse(raw);
            }
        } catch (e) {
            console.warn('[UToolsFeatureAdapter] Failed to read plugin.json:', e.message);
        }
        return null;
    }

    getBaseAppShortcutsFeature() {
        const pluginJson = this.getBasePluginJson();
        if (pluginJson && Array.isArray(pluginJson.features)) {
            const feature = pluginJson.features.find(f => f.code === 'app_shortcuts');
            if (feature) {
                return JSON.parse(JSON.stringify(feature)); // deep clone
            }
        }
        // Fallback default structure if plugin.json cannot be read
        return {
            platform: ['darwin', 'win32'],
            code: 'app_shortcuts',
            explain: '查找应用快捷键',
            cmds: [
                {
                    type: 'window',
                    label: '查找应用快捷键',
                    match: {
                        app: []
                    }
                }
            ]
        };
    }

    getInstalledApps() {
        const apps = [];
        const seenAppIds = new Set();

        const addApp = (appId, appName) => {
            if (appId && !seenAppIds.has(appId)) {
                seenAppIds.add(appId);
                apps.push({ appId, appName: appName || appId });
            }
        };

        // 1. Scan storage directories (user-configured and downloaded data)
        const baseDir = this.getDataDirectory();
        const subDirs = ['hotkeycheatsheet', 'json_hotkeys', 'builtin'];

        for (const sub of subDirs) {
            const dirPath = path.join(baseDir, sub);
            if (!fs.existsSync(dirPath)) continue;

            try {
                const files = fs.readdirSync(dirPath);
                for (const file of files) {
                    if (!file.endsWith('.json')) continue;
                    const filePath = path.join(dirPath, file);
                    try {
                        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                        const appId = content.appId || path.basename(file, '.json');
                        const appName = content.appName || appId;
                        addApp(appId, appName);
                    } catch (e) {
                        // ignore malformed files
                    }
                }
            } catch (e) {
                // ignore readdir errors
            }
        }

        // 2. Scan built-in shortcuts (data/shortcuts/ directory)
        const scanShortcutsDir = (dir) => {
            if (!fs.existsSync(dir)) return;
            try {
                const items = fs.readdirSync(dir);
                for (const item of items) {
                    const itemPath = path.join(dir, item);
                    try {
                        const stat = fs.statSync(itemPath);
                        if (stat.isDirectory()) {
                            const scFile = path.join(itemPath, 'shortcuts.js');
                            if (fs.existsSync(scFile)) {
                                try {
                                    const mod = require(scFile);
                                    const appId = typeof mod.name === 'function' ? mod.name() : item;
                                    const appName = mod._appName || mod._shortName || appId;
                                    addApp(appId, appName);
                                } catch (e) {
                                    addApp(item, item);
                                }
                            }
                            scanShortcutsDir(itemPath);
                        }
                    } catch (e) {}
                }
            } catch (e) {}
        };
        scanShortcutsDir(path.join(this.rootDir, 'src/infrastructure/data/shortcuts'));

        // 3. Scan built-in JSON sources (cheatsheet_builtin and opencode)
        const scanJsonDir = (dir) => {
            if (!fs.existsSync(dir)) return;
            try {
                const items = fs.readdirSync(dir);
                for (const item of items) {
                    const itemPath = path.join(dir, item);
                    try {
                        const stat = fs.statSync(itemPath);
                        if (stat.isDirectory()) {
                            scanJsonDir(itemPath);
                        } else if (item.endsWith('.json')) {
                            try {
                                const content = JSON.parse(fs.readFileSync(itemPath, 'utf8'));
                                const appId = content.appId || path.basename(item, '.json');
                                const appName = content.appName || appId;
                                addApp(appId, appName);
                            } catch (e) {}
                        }
                    } catch (e) {}
                }
            } catch (e) {}
        };
        scanJsonDir(path.join(this.rootDir, 'src/infrastructure/data/cheatsheet_builtin'));
        scanJsonDir(path.join(this.rootDir, 'src/infrastructure/data/opencode'));

        return apps;
    }

    getUToolsFeature(code = 'app_shortcuts') {
        const uTools = this.getUtools();
        if (uTools && typeof uTools.getFeatures === 'function') {
            try {
                const features = uTools.getFeatures([code]);
                if (Array.isArray(features) && features.length > 0) {
                    return features[0];
                }
            } catch (e) {
                console.warn('[UToolsFeatureAdapter] utools.getFeatures call failed:', e.message);
            }
        }
        return this.getBaseAppShortcutsFeature();
    }

    setUToolsFeature(feature) {
        if (!feature) return false;
        const uTools = this.getUtools();
        if (uTools && typeof uTools.setFeature === 'function') {
            try {
                return !!uTools.setFeature(feature);
            } catch (e) {
                console.error('[UToolsFeatureAdapter] utools.setFeature failed:', e);
                return false;
            }
        }
        return true; // Graceful fallback in non-uTools test environments
    }
}

module.exports = UToolsFeatureAdapter;
