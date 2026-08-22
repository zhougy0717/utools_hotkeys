const { ALIAS_GROUPS, normalizeAppId } = require('./app_id_normalizer.js');

/**
 * AppPatternInferer - Derives cross-platform window process/bundle match patterns for uTools match.app.
 */
class AppPatternInferer {
    /**
     * Capitalize words in a string (e.g. "sublime-text" -> "Sublime-Text" or "Sublime Text")
     * @param {string} str
     * @returns {string}
     */
    capitalizeWords(str) {
        if (!str) return '';
        return String(str)
            .split(/[-_\s]+/)
            .filter(Boolean)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    /**
     * Infer window match patterns for a single app.
     * @param {string} appId
     * @param {string} appName
     * @returns {Array<string>}
     */
    inferPatterns(appId, appName) {
        const patterns = new Set();
        const cleanName = typeof appName === 'string' ? appName.trim() : '';
        const cleanId = typeof appId === 'string' ? appId.trim() : '';

        if (!cleanName && !cleanId) {
            return [];
        }

        // 1. macOS Patterns
        if (cleanName) {
            patterns.add(`${cleanName}.app`);
        }
        if (cleanId) {
            const capId = this.capitalizeWords(cleanId);
            if (capId) {
                patterns.add(`${capId}.app`);
            }
            patterns.add(`${cleanId}.app`);
        }

        // 2. Windows Patterns
        if (cleanName) {
            patterns.add(`${cleanName}.exe`);
        }
        if (cleanId) {
            patterns.add(`${cleanId}.exe`);
            patterns.add(`${cleanId.toUpperCase()}.EXE`);
        }

        // 3. Alias Expansion via ALIAS_GROUPS
        const targetNormId = normalizeAppId(cleanId || cleanName);
        if (targetNormId) {
            for (const group of ALIAS_GROUPS) {
                const groupCanonical = group[0].toLowerCase().replace(/[-_ ]/g, '');
                if (groupCanonical === targetNormId || group.some(v => normalizeAppId(v) === targetNormId)) {
                    for (const alias of group) {
                        if (!alias) continue;
                        patterns.add(`${alias}.exe`);
                        patterns.add(`${alias.toUpperCase()}.EXE`);
                        patterns.add(`${alias}.app`);
                        const capAlias = this.capitalizeWords(alias);
                        if (capAlias) {
                            patterns.add(`${capAlias}.app`);
                            patterns.add(`${capAlias}.exe`);
                        }
                    }
                }
            }
        }

        return Array.from(patterns).filter(Boolean);
    }

    /**
     * Infer patterns for a list of apps and return deduplicated array.
     * @param {Array<{appId?: string, appName?: string, id?: string, name?: string}>} apps
     * @returns {Array<string>}
     */
    inferPatternsForList(apps = []) {
        if (!Array.isArray(apps)) return [];
        const aggregated = new Set();

        for (const app of apps) {
            if (!app) continue;
            const id = app.appId || app.id || '';
            const name = app.appName || app.name || '';
            const patterns = this.inferPatterns(id, name);
            for (const p of patterns) {
                aggregated.add(p);
            }
        }

        return Array.from(aggregated);
    }
}

module.exports = AppPatternInferer;
