const assert = require('assert');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { defaultSyncService } = require('../src/infrastructure/app_feature_sync_service.js');
const downloadAppHandler = require('../src/core/action_handlers/download_app_handler.js');
const importFileHandler = require('../src/core/action_handlers/import_file_handler.js');
const { dataLoader } = require('../src/core/hotkeycheatsheet.js');

describe('FeatureSync Integration - Download, Import, Startup Lifecycle (SPEC-00018)', () => {
    let tempDir;
    let registeredFeatures;
    let originalUtools;

    beforeEach(() => {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'integration-test-'));
        registeredFeatures = [];
        originalUtools = global.utools;

        global.utools = {
            isMacOs: () => false,
            isWindows: () => true,
            dbStorage: {
                getItem: (k) => k === 'sqlite_db_path' ? tempDir : null,
                setItem: () => {}
            },
            showNotification: () => {},
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

        // Configure defaultSyncService storageAdapter with tempDir
        defaultSyncService.storageAdapter.rootDir = tempDir;
        defaultSyncService.storageAdapter.dataDir = tempDir;

        const originalPluginJson = path.resolve(__dirname, '../plugin.json');
        if (fs.existsSync(originalPluginJson)) {
            fs.copyFileSync(originalPluginJson, path.join(tempDir, 'plugin.json'));
        }
    });

    afterEach(() => {
        try {
            fs.rmSync(tempDir, { recursive: true, force: true });
        } catch (e) {}
        if (originalUtools) {
            global.utools = originalUtools;
        }
    });

    it('TC-007: should trigger syncApp when DownloadAppHandler successfully processes an app', async () => {
        // Mock dataLoader.fetchAndProcessAppHotkeys to succeed without network
        const originalFetch = dataLoader.fetchAndProcessAppHotkeys;
        dataLoader.fetchAndProcessAppHotkeys = async () => true;

        const ui = {
            showLoading: () => {},
            showSuccess: () => {},
            showError: () => {},
            update: () => {}
        };

        await downloadAppHandler.handle({ id: 'cursor', title: 'Cursor', icon: 'logo.png' }, ui);

        dataLoader.fetchAndProcessAppHotkeys = originalFetch;

        const activeApps = defaultSyncService.getCurrentMatchApps();
        assert.ok(activeApps.includes('Cursor.app'), 'Should include Cursor.app after download');
        assert.ok(activeApps.includes('Cursor.exe') || activeApps.includes('cursor.exe'), 'Should include Cursor.exe');
    });

    it('TC-008: should trigger syncApp when ImportFileHandler imports a defkey file', (done) => {
        const sampleTxt = `================================================================================
Sample Tool keyboard shortcuts
================================================================================
https://defkey.com/sample-tool-shortcuts
Last update: 2023-01-01

General
-------
Ctrl + S                         Save project
`;
        const txtPath = path.join(tempDir, 'sample_tool.txt');
        fs.writeFileSync(txtPath, sampleTxt, 'utf-8');

        global.utools.showOpenDialog = () => [txtPath];

        const ui = {
            callbackSetList: (list) => {
                try {
                    const activeApps = defaultSyncService.getCurrentMatchApps();
                    assert.ok(activeApps.includes('Sample Tool.app') || activeApps.includes('Sample Tool.exe') || activeApps.includes('sample-tool.exe'), 'Should include sample app patterns');
                    done();
                } catch (err) {
                    done(err);
                }
            }
        };

        importFileHandler.handle({}, ui, {});
    });

    it('TC-009: should execute syncAll on preload module startup', async () => {
        const cheatsheetDir = path.join(tempDir, 'hotkeycheatsheet');
        fs.mkdirSync(cheatsheetDir, { recursive: true });
        fs.writeFileSync(path.join(cheatsheetDir, 'notion.json'), JSON.stringify({ appId: 'notion', appName: 'Notion' }));

        await defaultSyncService.syncAll();
        const activeApps = defaultSyncService.getCurrentMatchApps();
        assert.ok(activeApps.includes('Notion.app'), 'Should sync Notion.app on syncAll');
    });
});
