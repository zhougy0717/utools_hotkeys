const assert = require('assert');
const path = require('path');
const fs = require('fs');
const os = require('os');
const AppFeatureSyncService = require('../src/infrastructure/app_feature_sync_service.js');
const UToolsFeatureAdapter = require('../src/infrastructure/utools_feature_adapter.js');

describe('AppFeatureSyncService - Dynamic Feature Injection & Sync (SPEC-00018)', () => {
    let syncService;
    let tempDir;
    let adapter;
    let registeredFeatures;

    let originalUtools;

    beforeEach(() => {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sync-test-'));
        registeredFeatures = [];
        originalUtools = global.utools;

        global.utools = {
            isMacOs: () => false,
            isWindows: () => true,
            getFeatures: (codes) => registeredFeatures.filter(f => codes.includes(f.code)),
            setFeature: (feature) => {
                const idx = registeredFeatures.findIndex(f => f.code === feature.code);
                if (idx !== -1) {
                    registeredFeatures[idx] = feature;
                } else {
                    registeredFeatures.push(feature);
                }
                return true;
            }
        };

        const originalPluginJson = path.resolve(__dirname, '../plugin.json');
        if (fs.existsSync(originalPluginJson)) {
            fs.copyFileSync(originalPluginJson, path.join(tempDir, 'plugin.json'));
        }

        adapter = new UToolsFeatureAdapter({
            rootDir: tempDir,
            dataDir: tempDir
        });

        syncService = new AppFeatureSyncService({
            storageAdapter: adapter
        });
    });

    afterEach(() => {
        try {
            fs.rmSync(tempDir, { recursive: true, force: true });
        } catch (e) {}
        if (originalUtools) {
            global.utools = originalUtools;
        }
    });

    it('TC-004: should incrementally sync a single newly downloaded app (Figma)', async () => {
        const success = await syncService.syncApp('figma', 'Figma');
        assert.strictEqual(success, true);

        const currentApps = syncService.getCurrentMatchApps();
        assert.ok(currentApps.includes('Figma.app'), 'Should contain Figma.app');
        assert.ok(currentApps.includes('Figma.exe'), 'Should contain Figma.exe');
        assert.ok(currentApps.includes('figma.exe'), 'Should contain figma.exe');
        // Ensure baseline apps are preserved
        assert.ok(currentApps.includes('Google Chrome.app'), 'Should keep base apps');
    });

    it('TC-005: should be idempotent when syncing the same app repeatedly', async () => {
        await syncService.syncApp('figma', 'Figma');
        const countFirst = syncService.getCurrentMatchApps().length;

        await syncService.syncApp('figma', 'Figma');
        const countSecond = syncService.getCurrentMatchApps().length;

        assert.strictEqual(countFirst, countSecond, 'Should not introduce duplicate entries');
    });

    it('TC-006: should perform full sync on cold start with all installed apps', async () => {
        const cheatsheetDir = path.join(tempDir, 'hotkeycheatsheet');
        const jsonHotkeysDir = path.join(tempDir, 'json_hotkeys');
        fs.mkdirSync(cheatsheetDir, { recursive: true });
        fs.mkdirSync(jsonHotkeysDir, { recursive: true });

        fs.writeFileSync(path.join(cheatsheetDir, 'cursor.json'), JSON.stringify({ appId: 'cursor', appName: 'Cursor' }));
        fs.writeFileSync(path.join(jsonHotkeysDir, 'onecommander.json'), JSON.stringify({ appId: 'onecommander', appName: 'One Commander' }));

        const success = await syncService.syncAll();
        assert.strictEqual(success, true);

        const currentApps = syncService.getCurrentMatchApps();
        assert.ok(currentApps.includes('Cursor.app'));
        assert.ok(currentApps.includes('One Commander.app') || currentApps.includes('One Commander.exe') || currentApps.includes('onecommander.exe'));
        assert.ok(currentApps.includes('Google Chrome.app'), 'Should preserve base apps');
    });

    it('TC-007: should safely handle invalid or empty syncApp parameters', async () => {
        const initialCount = syncService.getCurrentMatchApps().length;
        const result = await syncService.syncApp('', '');
        const afterCount = syncService.getCurrentMatchApps().length;

        assert.strictEqual(result, true);
        assert.strictEqual(initialCount, afterCount);
    });

    it('TC-008: should merge custom mappings when syncing a single app (SPEC-00019)', async () => {
        const mockMappingStorage = {
            getCustomMappingsForApp: (appId) => appId === 'one-commander' ? ['OneCommanderCustom.exe'] : [],
            getAllMappedProcessNames: () => ['OneCommanderCustom.exe']
        };

        const customSyncService = new AppFeatureSyncService({
            storageAdapter: adapter,
            mappingStorage: mockMappingStorage
        });

        const success = await customSyncService.syncApp('one-commander', 'One Commander');
        assert.strictEqual(success, true);

        const currentApps = customSyncService.getCurrentMatchApps();
        assert.ok(currentApps.includes('OneCommanderCustom.exe'), 'Should include custom mapped process name');
        assert.ok(currentApps.includes('One Commander.app'), 'Should also include auto inferred pattern');
    });

    it('TC-009: should merge all custom mappings when executing syncAll (SPEC-00019)', async () => {
        const mockMappingStorage = {
            getCustomMappingsForApp: () => [],
            getAllMappedProcessNames: () => ['CustomToolA.exe', 'CustomToolB.app']
        };

        const customSyncService = new AppFeatureSyncService({
            storageAdapter: adapter,
            mappingStorage: mockMappingStorage
        });

        const success = await customSyncService.syncAll();
        assert.strictEqual(success, true);

        const currentApps = customSyncService.getCurrentMatchApps();
        assert.ok(currentApps.includes('CustomToolA.exe'));
        assert.ok(currentApps.includes('CustomToolB.app'));
        assert.ok(currentApps.includes('Google Chrome.app'));
    });
});

