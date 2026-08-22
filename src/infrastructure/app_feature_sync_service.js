const AppPatternInferer = require('./app_pattern_inferer.js');
const UToolsFeatureAdapter = require('./utools_feature_adapter.js');

/**
 * AppFeatureSyncService - Manages dynamic registration and aggregation synchronization
 * for uTools window matching feature (`app_shortcuts`).
 */
class AppFeatureSyncService {
    constructor(options = {}) {
        this.inferer = options.inferer || new AppPatternInferer();
        this.storageAdapter = options.storageAdapter || new UToolsFeatureAdapter();
    }

    /**
     * Helper to clone and safely ensure cmds[0].match.app structure.
     * @param {Object} rawFeature
     * @returns {Object}
     */
    _ensureFeatureStructure(rawFeature) {
        const feature = rawFeature ? JSON.parse(JSON.stringify(rawFeature)) : this.storageAdapter.getBaseAppShortcutsFeature();
        if (!feature.code) feature.code = 'app_shortcuts';
        if (!feature.explain) feature.explain = '查找应用快捷键';
        if (!Array.isArray(feature.platform)) feature.platform = ['darwin', 'win32'];
        if (!Array.isArray(feature.cmds) || feature.cmds.length === 0) {
            feature.cmds = [{ type: 'window', label: '查找应用快捷键', match: { app: [] } }];
        }
        if (!feature.cmds[0].match) {
            feature.cmds[0].match = { app: [] };
        }
        if (!Array.isArray(feature.cmds[0].match.app)) {
            feature.cmds[0].match.app = [];
        }
        return feature;
    }

    /**
     * Get the current active list of match.app strings.
     * @returns {Array<string>}
     */
    getCurrentMatchApps() {
        const feature = this._ensureFeatureStructure(this.storageAdapter.getUToolsFeature('app_shortcuts'));
        return feature.cmds[0].match.app;
    }

    /**
     * Incrementally sync a newly downloaded or imported app into uTools feature.
     * @param {string} appId
     * @param {string} appName
     * @returns {Promise<boolean>}
     */
    async syncApp(appId, appName) {
        try {
            const patterns = this.inferer.inferPatterns(appId, appName);
            if (!patterns || patterns.length === 0) {
                return true;
            }

            const currentFeature = this._ensureFeatureStructure(this.storageAdapter.getUToolsFeature('app_shortcuts'));
            const existingApps = currentFeature.cmds[0].match.app;

            const mergedSet = new Set(existingApps);
            let hasNew = false;
            for (const p of patterns) {
                if (!mergedSet.has(p)) {
                    mergedSet.add(p);
                    hasNew = true;
                }
            }

            if (hasNew) {
                currentFeature.cmds[0].match.app = Array.from(mergedSet);
                this.storageAdapter.setUToolsFeature(currentFeature);

                if (this.storageAdapter.isDevEnvironment()) {
                    this.storageAdapter.writeLocalPluginJson(currentFeature);
                }
            }

            return true;
        } catch (e) {
            console.error('[AppFeatureSyncService] syncApp failed:', e);
            return false;
        }
    }

    /**
     * Cold start synchronization: Aggregates base plugin.json apps and all installed apps.
     * @returns {Promise<boolean>}
     */
    async syncAll() {
        try {
            const baseFeature = this._ensureFeatureStructure(this.storageAdapter.getBaseAppShortcutsFeature());
            const baseApps = baseFeature.cmds[0].match.app;

            const installedApps = this.storageAdapter.getInstalledApps();
            const inferredPatterns = this.inferer.inferPatternsForList(installedApps);

            const mergedSet = new Set([...baseApps, ...inferredPatterns]);
            baseFeature.cmds[0].match.app = Array.from(mergedSet);

            this.storageAdapter.setUToolsFeature(baseFeature);

            if (this.storageAdapter.isDevEnvironment()) {
                this.storageAdapter.writeLocalPluginJson(baseFeature);
            }

            return true;
        } catch (e) {
            console.error('[AppFeatureSyncService] syncAll failed:', e);
            return false;
        }
    }
}

const defaultSyncService = new AppFeatureSyncService();

module.exports = AppFeatureSyncService;
module.exports.defaultSyncService = defaultSyncService;
