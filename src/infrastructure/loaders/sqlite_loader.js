const sqliteService = require('../sqlite_service.js');

class SqliteLoader {
    load() {
        let shortcuts = [];
        const downloadedApps = [];

        // 1. Load from SQLite
        try {
            const sqliteShortcuts = sqliteService.getAllShortcuts();
            if (sqliteShortcuts && sqliteShortcuts.length > 0) {
                shortcuts = shortcuts.concat(sqliteShortcuts);
                const apps = sqliteService.getDownloadedApps();
                apps.forEach(app => downloadedApps.push(app.id));
            }
        } catch (e) {
            console.error('[SqliteLoader] Failed to load SQLite shortcuts', e);
        }

        // 2. Load from utools.db (Legacy)
        try {
            const dbDocs = utools.db.allDocs('hotkeys_app_');
            for (const rawDoc of dbDocs) {
                const doc = rawDoc.doc || rawDoc.value || rawDoc;
                const appId = doc.appId || (doc._id ? doc._id.replace('hotkeys_app_', '') : 'unknown');
                const data = doc.shortcuts || doc.data || [];
                if (Array.isArray(data) && data.length > 0) {
                    shortcuts = shortcuts.concat(data);
                    downloadedApps.push(appId);
                }
            }
        } catch (e) {
            console.error('[SqliteLoader] Failed to load DB shortcuts', e);
        }

        // We attach the downloadedApps info to the result for the aggregator to use
        // or just return an object with both.
        return {
            shortcuts,
            downloadedApps
        };
    }
}

module.exports = SqliteLoader;
