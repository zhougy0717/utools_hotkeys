const fs = require('fs');
const path = require('path');

/**
 * UToolsFeatureAdapter - Manages interactions with uTools runtime feature APIs,
 * local storage directory scanning, and development environment persistence.
 */
class UToolsFeatureAdapter {
    constructor(options = {}) {
        this.rootDir = options.rootDir || path.resolve(__dirname, '../../');
        this.dataDir = options.dataDir || null;
    }

    getUtools() {
        if (typeof utools !== 'undefined') return utools;
        if (typeof window !== 'undefined' && window.utools) return window.utools;
        return null;
    }

    getDataDirectory() {
        if (this.dataDir) return this.dataDir;
        const uTools = this.getUtools();
        if (uTools) {
            if (uTools.dbStorage && typeof uTools.dbStorage.getItem === 'function') {
                const configPath = uTools.dbStorage.getItem('sqlite_db_path');
                if (configPath) return configPath;
            }
            if (typeof uTools.getPath === 'function') {
                try {
                    return path.join(uTools.getPath('userData'), 'utools_shortcut_keys');
                } catch (e) {}
            }
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
        const baseDir = this.getDataDirectory();
        const subDirs = ['hotkeycheatsheet', 'json_hotkeys'];
        const apps = [];
        const seenAppIds = new Set();

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
                        if (appId && !seenAppIds.has(appId)) {
                            seenAppIds.add(appId);
                            apps.push({ appId, appName });
                        }
                    } catch (e) {
                        // ignore malformed files
                    }
                }
            } catch (e) {
                // ignore readdir errors
            }
        }

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
