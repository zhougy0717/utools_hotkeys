// src/infrastructure/app_id_normalizer.js

/**
 * Alias map: maps known variant app IDs to a canonical form.
 * Both sides of a pair are mapped to the SAME canonical key.
 * Add new aliases here when new cross-source conflicts are discovered.
 */
const ALIAS_GROUPS = [
    ['vscode', 'visual-studio-code', 'visualstudiocode'],
    ['jet_brains', 'intellij-idea', 'jetbrains'],
];

// Build lookup: variant -> canonical (first element in group, normalized)
const _aliasLookup = new Map();
for (const group of ALIAS_GROUPS) {
    const canonical = group[0].toLowerCase().replace(/[-_ ]/g, '');
    for (const variant of group) {
        _aliasLookup.set(variant.toLowerCase().replace(/[-_ ]/g, ''), canonical);
    }
}

/**
 * Normalize an appId for cross-source deduplication.
 * 1. Lowercase
 * 2. Strip separators (-, _, space)
 * 3. Apply alias mapping
 *
 * @param {string} appId
 * @returns {string} Normalized canonical key
 */
function normalizeAppId(appId) {
    if (!appId) return '';
    const stripped = String(appId).toLowerCase().replace(/[-_ ]/g, '');
    return _aliasLookup.get(stripped) || stripped;
}

module.exports = { normalizeAppId, ALIAS_GROUPS };
