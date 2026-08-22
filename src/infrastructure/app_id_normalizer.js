// src/infrastructure/app_id_normalizer.js

/**
 * Alias map: maps known variant app IDs to a canonical form.
 * Both sides of a pair are mapped to the SAME canonical key.
 * Add new aliases here when new cross-source conflicts are discovered.
 */
const ALIAS_GROUPS = [
    ['vscode', 'visual-studio-code', 'visualstudiocode', 'codearts-ide', 'codeartside', 'codearts', 'vscode-huawei', 'code'],
    ['jet_brains', 'intellij-idea', 'jetbrains', 'idea'],
    ['google-chrome', 'googlechrome', 'chrome'],
    ['microsoft-excel', 'microsoftexcel', 'excel', 'office_excel'],
    ['microsoft-word', 'microsoftword', 'word', 'office_word'],
    ['microsoft-powerpoint', 'microsoftpowerpoint', 'powerpoint', 'office_ppt'],
    ['microsoft-onenote', 'microsoftonenote', 'onenote', 'office_onenote'],
    ['sublime-text', 'sublimetext'],
    ['navicat-premium', 'navicatpremium'],
    ['phpstorm', 'php-storm'],
    ['pycharm', 'py-charm'],
    ['webstorm', 'web-storm'],
    ['microsoft-visual-studio', 'microsoftvisualstudio', 'visualstudio'],
    ['foxit-reader', 'foxitpdfreader', 'foxit-pdf-reader'],
    ['margin-note', 'marginnote', 'marginnote3', 'marginnote4'],
    ['pdf-expert', 'pdfexpert']
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
