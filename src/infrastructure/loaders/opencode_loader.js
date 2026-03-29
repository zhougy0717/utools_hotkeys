const fs = require('fs');
const path = require('path');

/**
 * Loader for crawled OpenCode.ai shortcut data.
 */
class OpencodeLoader {
    /**
     * Loads shortcuts from src/infrastructure/data/opencode/opencode.json
     */
    load() {
        const dataFile = path.join(__dirname, '../data/opencode/opencode.json');
        if (!fs.existsSync(dataFile)) {
            console.warn(`[OpencodeLoader] Data file not found: ${dataFile}`);
            return [];
        }

        try {
            const content = fs.readFileSync(dataFile, 'utf8');
            const data = JSON.parse(content);

            if (data && Array.isArray(data.shortcuts)) {
                return data.shortcuts.map(item => ({
                    ...item,
                    appId: data.appId,
                    appName: data.appName,
                    _source: 'opencode'
                }));
            }
        } catch (e) {
            console.error('[OpencodeLoader] Failed to parse opencode.json:', e);
        }
        return [];
    }
}

module.exports = OpencodeLoader;
