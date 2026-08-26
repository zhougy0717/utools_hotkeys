const assert = require('assert');
const path = require('path');
const fs = require('fs');
const StoragePathService = require('../src/infrastructure/storage_path_service.js');

describe('StoragePathService - Device Isolated Storage Path (SPEC-00022)', () => {
    class MockStorageAdapter {
        constructor(initial = {}) {
            this.store = { ...initial };
        }
        getItem(key) {
            return this.store[key] !== undefined ? this.store[key] : null;
        }
        setItem(key, value) {
            this.store[key] = value;
        }
        removeItem(key) {
            delete this.store[key];
        }
    }

    class MockDeviceInfoProvider {
        constructor(deviceId, defaultPath) {
            this.deviceId = deviceId;
            this.defaultPath = defaultPath || '/mock/default/userData/utools_shortcut_keys';
        }
        getDeviceId() {
            return this.deviceId;
        }
        getDefaultDataDirectory() {
            return this.defaultPath;
        }
    }

    describe('TC-PATH-01: Multi-device Isolation', () => {
        it('should isolate storage paths across different devices using deviceId', () => {
            const sharedStorage = new MockStorageAdapter();

            const devAProvider = new MockDeviceInfoProvider('device_mac_001', '/default/mac');
            const devBProvider = new MockDeviceInfoProvider('device_win_002', 'C:\\default\\win');

            const serviceA = new StoragePathService({
                storageAdapter: sharedStorage,
                deviceInfoProvider: devAProvider
            });
            const serviceB = new StoragePathService({
                storageAdapter: sharedStorage,
                deviceInfoProvider: devBProvider
            });

            // Set different paths on device A and B
            assert.strictEqual(serviceA.setDataDirectory('/Users/dev/ShortcutsMac'), true);
            assert.strictEqual(serviceB.setDataDirectory('D:\\ShortcutsWin'), true);

            // Verify device A and B read their own configured paths
            assert.strictEqual(serviceA.getDataDirectory(), '/Users/dev/ShortcutsMac');
            assert.strictEqual(serviceB.getDataDirectory(), 'D:\\ShortcutsWin');

            // Verify raw keys in shared storage
            assert.strictEqual(sharedStorage.getItem('shortcut_data_path_device_mac_001'), '/Users/dev/ShortcutsMac');
            assert.strictEqual(sharedStorage.getItem('shortcut_data_path_device_win_002'), 'D:\\ShortcutsWin');
        });
    });

    describe('TC-PATH-02: Valid Legacy Config Migration', () => {
        it('should automatically migrate legacy sqlite_db_path if directory exists on current device', () => {
            const tempValidDir = path.join(__dirname, 'mock_valid_dir');
            if (!fs.existsSync(tempValidDir)) {
                fs.mkdirSync(tempValidDir, { recursive: true });
            }

            try {
                const storage = new MockStorageAdapter({
                    'sqlite_db_path': tempValidDir
                });
                const deviceProvider = new MockDeviceInfoProvider('device_mac_001');
                const service = new StoragePathService({
                    storageAdapter: storage,
                    deviceInfoProvider: deviceProvider
                });

                // Initially, device specific key is empty
                assert.strictEqual(storage.getItem('shortcut_data_path_device_mac_001'), null);

                // Reading data directory triggers migration
                const resolved = service.getDataDirectory();
                assert.strictEqual(resolved, tempValidDir);

                // Now migrated to device specific key
                assert.strictEqual(storage.getItem('shortcut_data_path_device_mac_001'), tempValidDir);
            } finally {
                if (fs.existsSync(tempValidDir)) {
                    fs.rmdirSync(tempValidDir);
                }
            }
        });
    });

    describe('TC-PATH-03: Invalid Legacy Config Defense', () => {
        it('should reject legacy sqlite_db_path if directory does NOT exist on current device and fallback to default', () => {
            const nonExistentPath = '/non/existent/path/on/other/os/shortcuts';
            const storage = new MockStorageAdapter({
                'sqlite_db_path': nonExistentPath
            });
            const deviceProvider = new MockDeviceInfoProvider('device_win_002', 'C:\\default\\userData\\utools_shortcut_keys');
            const service = new StoragePathService({
                storageAdapter: storage,
                deviceInfoProvider: deviceProvider
            });

            // Reading should NOT migrate invalid path and should fallback to default path
            const resolved = service.getDataDirectory();
            assert.strictEqual(resolved, 'C:\\default\\userData\\utools_shortcut_keys');
            assert.strictEqual(storage.getItem('shortcut_data_path_device_win_002'), null);
        });
    });

    describe('TC-PATH-04: Default Directory Fallback', () => {
        it('should fallback to default userData directory when no config exists', () => {
            const storage = new MockStorageAdapter();
            const deviceProvider = new MockDeviceInfoProvider('device_new_003', '/custom/default/userData/path');
            const service = new StoragePathService({
                storageAdapter: storage,
                deviceInfoProvider: deviceProvider
            });

            assert.strictEqual(service.getCurrentConfiguredPath(), null);
            assert.strictEqual(service.getDataDirectory(), '/custom/default/userData/path');
        });
    });

    describe('TC-PATH-05 & TC-PATH-06: Set Data Directory & Input Validation', () => {
        it('should validate inputs and update device specific path', () => {
            const storage = new MockStorageAdapter();
            const deviceProvider = new MockDeviceInfoProvider('device_001');
            const service = new StoragePathService({
                storageAdapter: storage,
                deviceInfoProvider: deviceProvider
            });

            // Invalid inputs
            assert.strictEqual(service.setDataDirectory(''), false);
            assert.strictEqual(service.setDataDirectory('   '), false);
            assert.strictEqual(service.setDataDirectory(null), false);
            assert.strictEqual(service.setDataDirectory(undefined), false);
            assert.strictEqual(service.setDataDirectory(123), false);

            // Valid input
            assert.strictEqual(service.setDataDirectory('/valid/custom/path'), true);
            assert.strictEqual(service.getCurrentConfiguredPath(), '/valid/custom/path');
            assert.strictEqual(service.getDataDirectory(), '/valid/custom/path');

            // Reset directory
            assert.strictEqual(service.resetDataDirectory(), true);
            assert.strictEqual(service.getCurrentConfiguredPath(), null);
        });
    });

    describe('Default Adapter and Device Provider in uTools environment', () => {
        it('should correctly initialize with default global utools if available or fallback', () => {
            const service = new StoragePathService();
            const dir = service.getDataDirectory();
            assert.ok(typeof dir === 'string' && dir.length > 0);
        });
    });
});
