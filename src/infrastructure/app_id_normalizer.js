// src/infrastructure/app_id_normalizer.js

/**
 * Alias map: maps known variant app IDs to a canonical form.
 * Both sides of a pair are mapped to the SAME canonical key.
 * Add new aliases here when new cross-source conflicts are discovered.
 */
const ALIAS_GROUPS = [
    ['vscode', 'visual-studio-code', 'visualstudiocode', 'codearts-ide', 'codeartside', 'codearts', 'vscode-huawei', 'code'],
    ['jet_brains', 'intellij-idea', 'jetbrains', 'idea', 'intellij', 'intellijidea'],
    ['google-chrome', 'googlechrome', 'chrome', 'chrom'],
    ['directory-opus', 'directoryopus', 'directory_opus', 'dopus', 'dopus64'],
    ['neovim', 'nvim', 'lazynvim', 'lazy-nvim', 'vim', 'gvim'],
    ['microsoft-excel', 'microsoftexcel', 'excel', 'office_excel'],
    ['microsoft-word', 'microsoftword', 'word', 'office_word', 'winword'],
    ['microsoft-powerpoint', 'microsoftpowerpoint', 'powerpoint', 'office_ppt', 'ppt', 'powerpnt'],
    ['microsoft-onenote', 'microsoftonenote', 'onenote', 'office_onenote'],
    ['sublime-text', 'sublimetext'],
    ['navicat-premium', 'navicatpremium'],
    ['phpstorm', 'php-storm', 'phpstorm64'],
    ['pycharm', 'py-charm', 'pycharm64', 'pycharmce', 'pycharm-ce', 'pycharm ce'],
    ['webstorm', 'web-storm', 'webstorm64'],
    ['microsoft-visual-studio', 'microsoftvisualstudio', 'visualstudio'],
    ['foxit-reader', 'foxitpdfreader', 'foxit-pdf-reader', 'foxit pdf reader', 'foxit'],
    ['margin-note', 'marginnote', 'marginnote3', 'marginnote4', 'marginnote 3', 'marginnote 4'],
    ['pdf-expert', 'pdfexpert', 'pdf expert'],
    ['commander_one', 'commander-one', 'commanderone', 'commander-one-pro', 'commanderonepro', 'commander one', 'commander one pro'],
    ['one-commander-3', 'one-commander', 'onecommander', 'onecommander3', 'one commander', 'one commander 3'],
    ['qspace', 'qspace-pro', 'qspacepro', 'qspace pro'],
    ['devonthink', 'devonthink3', 'devonthink-3', 'devonthink 3', 'devonthink pro', 'devonthink-pro', 'devonthinkpro', 'devonthink pro 3', 'devonthink-pro-3', 'devonthinkpro3'],
    ['potplayer', 'potplayermini64', 'potplayer64', 'potplayermini', 'potplayer mini'],
    ['welink', 'welinkpc', 'welink-pc', 'welink pc'],
    ['magnet', 'magnet_macos', 'magnetmacos', 'magnet macos'],
    ['follow', 'folo'],
    ['rubymine', 'ruby-mine', 'rubymine64'],
    ['clion', 'clion64'],
    ['goland', 'go-land', 'goland64'],
    ['rider', 'rider64'],
    ['datagrip', 'data-grip', 'datagrip64'],
    ['appcode', 'app-code', 'appcode64'],
    ['datalore', 'data-lore', 'datalore64'],
    ['rustrover', 'rust-rover', 'rustrover64']
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
