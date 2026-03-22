const path = require('path');
const fs = require('fs');
const initSqlJs = require('sql.js');

/**
 * SqliteService - Handles SQLite database operations using sql.js (Pure JS/WASM).
 * This ensures portability and avoids native build issues.
 */
class SqliteService {
    constructor() {
        this.db = null;
        this.dbPath = null;
        this.SQL = null;
        this.isInitializing = false;
    }

    /**
     * Initialize the database connection and tables
     * @param {string} directoryPath - The directory where hotkeys.db will be stored
     */
    async init(directoryPath) {
        if (!directoryPath) return false;
        if (this.isInitializing) return true;
        this.isInitializing = true;

        try {
            if (!this.SQL) {
                // Initialize WASM
                this.SQL = await initSqlJs({
                    // For uTools/Electron environment, we try to find the wasm in node_modules
                    locateFile: file => path.join(__dirname, '../../node_modules/sql.js/dist/sql-wasm.wasm')
                });
            }

            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, { recursive: true });
            }

            this.dbPath = path.join(directoryPath, 'hotkeys.db');
            
            if (fs.existsSync(this.dbPath)) {
                // Load existing database from file
                const fileBuffer = fs.readFileSync(this.dbPath);
                this.db = new this.SQL.Database(fileBuffer);
            } else {
                // Create new database
                this.db = new this.SQL.Database();
                this.initTables();
                this.saveToFile();
            }

            console.log(`[SqliteService] sql.js initialized at ${this.dbPath}`);
            this.isInitializing = false;
            return true;
        } catch (e) {
            console.error('[SqliteService] Failed to initialize sql.js', e);
            this.isInitializing = false;
            return false;
        }
    }

    /**
     * Internal: Write the in-memory database back to disk
     */
    saveToFile() {
        if (!this.db || !this.dbPath) return;
        try {
            const data = this.db.export();
            const buffer = Buffer.from(data);
            fs.writeFileSync(this.dbPath, buffer);
        } catch (e) {
            console.error('[SqliteService] Failed to save database to file', e);
        }
    }

    /**
     * Create tables if they don't exist
     */
    initTables() {
        if (!this.db) return;

        this.db.run(`
            CREATE TABLE IF NOT EXISTS apps (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                icon TEXT,
                updated_at INTEGER NOT NULL
            )
        `);

        this.db.run(`
            CREATE TABLE IF NOT EXISTS shortcuts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                app_id TEXT NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                keys_json TEXT NOT NULL,
                keyword TEXT,
                category TEXT,
                icon TEXT,
                FOREIGN KEY (app_id) REFERENCES apps(id) ON DELETE CASCADE
            )
        `);

        this.db.run(`CREATE INDEX IF NOT EXISTS idx_shortcuts_app_id ON shortcuts(app_id)`);
    }

    /**
     * Check if the service is initialized and ready
     */
    isInitialized() {
        return !!this.db;
    }

    /**
     * Save application hotkeys to the database
     * @param {string} appId 
     * @param {string} appName 
     * @param {string} appIcon 
     * @param {Array} shortcuts 
     */
    async saveAppHotkeys(appId, appName, appIcon, shortcuts) {
        if (!this.db) {
            const savedPath = utools.dbStorage.getItem('sqlite_db_path');
            if (savedPath) await this.init(savedPath);
            if (!this.db) return false;
        }

        const updatedAt = Date.now();

        try {
            // Start transaction
            this.db.run('BEGIN TRANSACTION');

            // Check if app exists
            const existingApp = this.db.prepare('SELECT id FROM apps WHERE id = ?');
            existingApp.bind([appId]);
            const exists = existingApp.step();
            existingApp.free();

            if (exists) {
                this.db.run('UPDATE apps SET name = ?, icon = ?, updated_at = ? WHERE id = ?', 
                    [appName, appIcon, updatedAt, appId]);
                this.db.run('DELETE FROM shortcuts WHERE app_id = ?', [appId]);
            } else {
                this.db.run('INSERT INTO apps (id, name, icon, updated_at) VALUES (?, ?, ?, ?)', 
                    [appId, appName, appIcon, updatedAt]);
            }

            const insertStmt = this.db.prepare(`
                INSERT INTO shortcuts (app_id, title, description, keys_json, keyword, category, icon)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `);

            for (const sc of shortcuts) {
                insertStmt.run([
                    appId,
                    sc.title,
                    sc.description,
                    JSON.stringify(sc.keys),
                    sc.keyword,
                    sc.category,
                    sc.icon
                ]);
            }
            insertStmt.free();

            // Commit transaction
            this.db.run('COMMIT');

            this.saveToFile();
            console.log(`[SqliteService] Saved ${shortcuts.length} shortcuts for ${appName} to SQLite file`);
            return true;
        } catch (e) {
            console.error(`[SqliteService] Failed to save hotkeys for ${appId}`, e);
            try { this.db.run('ROLLBACK'); } catch(re) {}
            return false;
        }
    }

    /**
     * Get all shortcuts from all downloaded apps
     * @returns {Array}
     */
    getAllShortcuts() {
        if (!this.db) return [];

        try {
            const res = this.db.exec('SELECT * FROM shortcuts');
            if (res.length === 0) return [];

            const columns = res[0].columns;
            const values = res[0].values;
            
            const results = values.map(row => {
                const item = {};
                columns.forEach((col, idx) => item[col] = row[idx]);
                return {
                    title: item.title,
                    description: item.description,
                    keys: JSON.parse(item.keys_json),
                    keyword: item.keyword,
                    category: item.category,
                    icon: item.icon
                };
            });
            return results;
        } catch (e) {
            console.error('[SqliteService] Failed to fetch all shortcuts', e);
            return [];
        }
    }

    /**
     * Get list of downloaded apps
     * @returns {Array}
     */
    getDownloadedApps() {
        if (!this.db) return [];
        try {
            const res = this.db.exec('SELECT id, name FROM apps ORDER BY name ASC');
            if (res.length === 0) return [];
            
            const columns = res[0].columns;
            return res[0].values.map(row => {
                const item = {};
                columns.forEach((col, idx) => item[col] = row[idx]);
                return item;
            });
        } catch (e) {
            console.error('[SqliteService] Failed to fetch downloaded apps', e);
            return [];
        }
    }
}

module.exports = new SqliteService();
