const STORAGE_KEY = 'custom_app_process_mappings';

/**
 * Default adapter for uTools dbStorage
 */
class DefaultStorageAdapter {
    getItem(key) {
        const uTools = typeof window !== 'undefined' && window.utools ? window.utools : (typeof utools !== 'undefined' ? utools : null);
        if (uTools && uTools.dbStorage && typeof uTools.dbStorage.getItem === 'function') {
            return uTools.dbStorage.getItem(key);
        }
        return null;
    }

    setItem(key, value) {
        const uTools = typeof window !== 'undefined' && window.utools ? window.utools : (typeof utools !== 'undefined' ? utools : null);
        if (uTools && uTools.dbStorage && typeof uTools.dbStorage.setItem === 'function') {
            uTools.dbStorage.setItem(key, value);
        }
    }
}

/**
 * AppMappingStorage - Manages custom application process/window mappings in utools.dbStorage
 */
class AppMappingStorage {
    constructor(options = {}) {
        this.storageAdapter = options.storageAdapter || new DefaultStorageAdapter();
    }

    /**
     * Get all custom app process mappings
     * @returns {Object.<string, Array<string>>} Map of appId -> array of process names
     */
    getCustomMappings() {
        try {
            const raw = this.storageAdapter.getItem(STORAGE_KEY);
            if (!raw) return {};
            if (typeof raw === 'object' && !Array.isArray(raw)) return raw;
            if (typeof raw === 'string') {
                const parsed = JSON.parse(raw);
                return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {};
            }
            return {};
        } catch (e) {
            return {};
        }
    }

    /**
     * Get custom mapped process names for a specific application
     * @param {string} appId
     * @returns {Array<string>}
     */
    getCustomMappingsForApp(appId) {
        if (!appId || typeof appId !== 'string') return [];
        const mappings = this.getCustomMappings();
        const list = mappings[appId.trim()];
        return Array.isArray(list) ? list : [];
    }

    /**
     * Add a custom process name mapping for an application
     * @param {string} appId
     * @param {string} processName
     * @returns {boolean}
     */
    addMapping(appId, processName) {
        if (!appId || typeof appId !== 'string' || !processName || typeof processName !== 'string') {
            return false;
        }

        const cleanAppId = appId.trim();
        const cleanProcess = processName.trim();
        if (!cleanAppId || !cleanProcess) {
            return false;
        }

        const mappings = this.getCustomMappings();
        if (!Array.isArray(mappings[cleanAppId])) {
            mappings[cleanAppId] = [];
        }

        if (!mappings[cleanAppId].includes(cleanProcess)) {
            mappings[cleanAppId].push(cleanProcess);
        }

        this.storageAdapter.setItem(STORAGE_KEY, mappings);
        return true;
    }

    /**
     * Remove a custom process name mapping for an application
     * @param {string} appId
     * @param {string} processName
     * @returns {boolean}
     */
    removeMapping(appId, processName) {
        if (!appId || typeof appId !== 'string' || !processName || typeof processName !== 'string') {
            return false;
        }

        const cleanAppId = appId.trim();
        const cleanProcess = processName.trim();
        const mappings = this.getCustomMappings();

        if (!Array.isArray(mappings[cleanAppId])) {
            return true;
        }

        mappings[cleanAppId] = mappings[cleanAppId].filter(p => p !== cleanProcess);
        this.storageAdapter.setItem(STORAGE_KEY, mappings);
        return true;
    }

    /**
     * Reset all custom mappings for an application
     * @param {string} appId
     * @returns {boolean}
     */
    resetMappings(appId) {
        if (!appId || typeof appId !== 'string') {
            return false;
        }

        const cleanAppId = appId.trim();
        const mappings = this.getCustomMappings();
        delete mappings[cleanAppId];
        this.storageAdapter.setItem(STORAGE_KEY, mappings);
        return true;
    }

    /**
     * Get all mapped process names across all applications
     * @returns {Array<string>}
     */
    getAllMappedProcessNames() {
        const mappings = this.getCustomMappings();
        const allNames = new Set();
        for (const appId in mappings) {
            if (Array.isArray(mappings[appId])) {
                mappings[appId].forEach(p => allNames.add(p));
            }
        }
        return Array.from(allNames);
    }
}

const defaultMappingStorage = new AppMappingStorage();

module.exports = AppMappingStorage;
module.exports.defaultMappingStorage = defaultMappingStorage;
