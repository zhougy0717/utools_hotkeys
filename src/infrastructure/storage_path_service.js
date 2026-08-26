const path = require('path');
const fs = require('fs');

/**
 * UToolsStorageAdapter - Default adapter for utools.dbStorage Key-Value operations
 */
class UToolsStorageAdapter {
    getUtools() {
        if (typeof utools !== 'undefined') return utools;
        if (typeof window !== 'undefined' && window.utools) return window.utools;
        return null;
    }

    getItem(key) {
        const uTools = this.getUtools();
        if (uTools && uTools.dbStorage && typeof uTools.dbStorage.getItem === 'function') {
            return uTools.dbStorage.getItem(key);
        }
        return null;
    }

    setItem(key, value) {
        const uTools = this.getUtools();
        if (uTools && uTools.dbStorage && typeof uTools.dbStorage.setItem === 'function') {
            uTools.dbStorage.setItem(key, value);
        }
    }

    removeItem(key) {
        const uTools = this.getUtools();
        if (uTools && uTools.dbStorage && typeof uTools.dbStorage.removeItem === 'function') {
            uTools.dbStorage.removeItem(key);
        }
    }
}

/**
 * UToolsDeviceInfoProvider - Provides machine unique ID and system default directories
 */
class UToolsDeviceInfoProvider {
    getUtools() {
        if (typeof utools !== 'undefined') return utools;
        if (typeof window !== 'undefined' && window.utools) return window.utools;
        return null;
    }

    getDeviceId() {
        const uTools = this.getUtools();
        if (uTools && typeof uTools.getNativeId === 'function') {
            try {
                const nativeId = uTools.getNativeId();
                if (nativeId && typeof nativeId === 'string' && nativeId.trim() !== '') {
                    return nativeId.trim();
                }
            } catch (e) {
                console.warn('[UToolsDeviceInfoProvider] Failed to getNativeId:', e.message);
            }
        }
        return 'default_device';
    }

    getDefaultDataDirectory() {
        const uTools = this.getUtools();
        if (uTools && typeof uTools.getPath === 'function') {
            try {
                const userData = uTools.getPath('userData');
                if (userData) {
                    return path.join(userData, 'utools_shortcut_keys');
                }
            } catch (e) {
                console.warn('[UToolsDeviceInfoProvider] Failed to getPath(userData):', e.message);
            }
        }
        return path.join(process.cwd(), 'data');
    }
}

/**
 * StoragePathService - Manages device-isolated shortcut data directory configuration (SPEC-00022)
 */
class StoragePathService {
    constructor(options = {}) {
        this.storageAdapter = options.storageAdapter || new UToolsStorageAdapter();
        this.deviceInfoProvider = options.deviceInfoProvider || new UToolsDeviceInfoProvider();
        this.fs = options.fs || fs;
    }

    /**
     * Build device-specific storage key to prevent cross-device path pollution
     * @returns {string}
     */
    getDeviceSpecificKey() {
        const deviceId = this.deviceInfoProvider.getDeviceId() || 'default_device';
        return `shortcut_data_path_${deviceId}`;
    }

    /**
     * Get user-configured path for the current device without fallback.
     * Automatically attempts to migrate legacy configuration if valid.
     * @returns {string|null}
     */
    getCurrentConfiguredPath() {
        const key = this.getDeviceSpecificKey();
        const value = this.storageAdapter.getItem(key);
        if (value && typeof value === 'string' && value.trim() !== '') {
            return value.trim();
        }

        // Try migrating legacy global configuration if present and valid
        return this.migrateLegacyConfig();
    }

    /**
     * Get resolved data directory:
     * 1. Current device-isolated path
     * 2. Auto-migrated legacy path (if locally valid)
     * 3. System default userData path
     * @returns {string}
     */
    getDataDirectory() {
        const configured = this.getCurrentConfiguredPath();
        if (configured) {
            return configured;
        }

        // Fallback to system default directory
        return this.deviceInfoProvider.getDefaultDataDirectory();
    }

    /**
     * Set data directory for current device
     * @param {string} newPath 
     * @returns {boolean}
     */
    setDataDirectory(newPath) {
        if (!newPath || typeof newPath !== 'string') return false;
        const cleanPath = newPath.trim();
        if (!cleanPath) return false;

        const key = this.getDeviceSpecificKey();
        this.storageAdapter.setItem(key, cleanPath);
        return true;
    }

    /**
     * Reset/clear data directory for current device
     * @returns {boolean}
     */
    resetDataDirectory() {
        const key = this.getDeviceSpecificKey();
        this.storageAdapter.removeItem(key);
        return true;
    }

    /**
     * Migrate legacy sqlite_db_path to shortcut_data_path_${deviceId}
     * Only migrates if the legacy path physically exists on the current local filesystem.
     * @returns {string|null}
     */
    migrateLegacyConfig() {
        try {
            const legacyPath = this.storageAdapter.getItem('sqlite_db_path');
            if (legacyPath && typeof legacyPath === 'string' && legacyPath.trim() !== '') {
                const cleanLegacy = legacyPath.trim();
                if (this.fs.existsSync(cleanLegacy)) {
                    const key = this.getDeviceSpecificKey();
                    this.storageAdapter.setItem(key, cleanLegacy);
                    return cleanLegacy;
                }
            }
        } catch (e) {
            console.warn('[StoragePathService] Legacy migration check failed:', e.message);
        }
        return null;
    }
}

const defaultStoragePathService = new StoragePathService();

module.exports = StoragePathService;
module.exports.UToolsStorageAdapter = UToolsStorageAdapter;
module.exports.UToolsDeviceInfoProvider = UToolsDeviceInfoProvider;
module.exports.defaultStoragePathService = defaultStoragePathService;
