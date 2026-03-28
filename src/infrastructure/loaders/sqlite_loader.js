// This loader is intentionally empty as SQLite dependency has been removed.
// It simply satisfies the dynamic loader in shortcuts_loader.js without loading anything.
class SqliteLoader {
    load() {
        return [];
    }
}

module.exports = SqliteLoader;
