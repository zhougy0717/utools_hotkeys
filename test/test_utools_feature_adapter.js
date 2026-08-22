const assert = require('assert');
const path = require('path');
const fs = require('fs');
const os = require('os');
const UToolsFeatureAdapter = require('../src/infrastructure/utools_feature_adapter.js');

describe('UToolsFeatureAdapter - Environment & Persistence Adapter (SPEC-00018)', () => {
    let adapter;
    let tempDir;

    beforeEach(() => {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'adapter-test-'));
        adapter = new UToolsFeatureAdapter({
            rootDir: path.resolve(__dirname, '..'),
            dataDir: tempDir
        });
    });

    afterEach(() => {
        try {
            fs.rmSync(tempDir, { recursive: true, force: true });
        } catch (e) {}
        delete global.window;
        delete global.utools;
    });

    it('TC-001: should load base plugin.json and extract app_shortcuts feature', () => {
        const baseFeature = adapter.getBaseAppShortcutsFeature();
        assert.ok(baseFeature, 'Base feature should exist');
        assert.strictEqual(baseFeature.code, 'app_shortcuts');
        assert.ok(Array.isArray(baseFeature.cmds));
        assert.ok(Array.isArray(baseFeature.cmds[0].match.app));
        assert.ok(baseFeature.cmds[0].match.app.includes('Google Chrome.app'));
    });

    it('TC-002: should scan hotkeycheatsheet and json_hotkeys directories for installed apps', () => {
        const cheatsheetDir = path.join(tempDir, 'hotkeycheatsheet');
        const jsonHotkeysDir = path.join(tempDir, 'json_hotkeys');
        fs.mkdirSync(cheatsheetDir, { recursive: true });
        fs.mkdirSync(jsonHotkeysDir, { recursive: true });

        fs.writeFileSync(path.join(cheatsheetDir, 'cursor.json'), JSON.stringify({ appId: 'cursor', appName: 'Cursor' }));
        fs.writeFileSync(path.join(jsonHotkeysDir, 'one-commander.json'), JSON.stringify({ appId: 'one-commander', appName: 'One Commander' }));
        fs.writeFileSync(path.join(jsonHotkeysDir, 'invalid.json'), 'invalid json');

        const apps = adapter.getInstalledApps();
        assert.strictEqual(apps.length, 2);
        const appIds = apps.map(a => a.appId);
        assert.ok(appIds.includes('cursor'));
        assert.ok(appIds.includes('one-commander'));
    });

    it('TC-003: should safely invoke utools.setFeature and utools.getFeatures with mocks', () => {
        let setCalledWith = null;
        global.utools = {
            getFeatures: (codes) => {
                if (codes.includes('app_shortcuts')) {
                    return [{ code: 'app_shortcuts', cmds: [{ match: { app: ['Test.app'] } }] }];
                }
                return [];
            },
            setFeature: (feature) => {
                setCalledWith = feature;
                return true;
            }
        };

        const feature = adapter.getUToolsFeature('app_shortcuts');
        assert.ok(feature);
        assert.strictEqual(feature.code, 'app_shortcuts');

        const success = adapter.setUToolsFeature({ code: 'app_shortcuts', test: 123 });
        assert.strictEqual(success, true);
        assert.deepStrictEqual(setCalledWith, { code: 'app_shortcuts', test: 123 });
    });

    it('TC-004: should gracefully handle missing utools global object', () => {
        delete global.utools;
        delete global.window;

        const feature = adapter.getUToolsFeature('app_shortcuts');
        assert.ok(feature);
        assert.strictEqual(feature.code, 'app_shortcuts');

        const success = adapter.setUToolsFeature({ code: 'app_shortcuts' });
        assert.strictEqual(typeof success, 'boolean');
    });
});
