const assert = require('assert');
const AppMappingStorage = require('../src/infrastructure/app_mapping_storage.js');

describe('AppMappingStorage - Custom Process Mappings Storage (SPEC-00019)', () => {
    let mockStorage = {};
    let storageAdapter;
    let mappingStorage;

    beforeEach(() => {
        mockStorage = {};
        storageAdapter = {
            getItem: (key) => mockStorage[key] || null,
            setItem: (key, val) => { mockStorage[key] = val; }
        };
        mappingStorage = new AppMappingStorage({ storageAdapter });
    });

    it('TC-001: should return empty object when no mappings stored', () => {
        const mappings = mappingStorage.getCustomMappings();
        assert.deepStrictEqual(mappings, {});
        assert.deepStrictEqual(mappingStorage.getCustomMappingsForApp('one-commander'), []);
    });

    it('TC-002: should add custom process name for an app with trimming and deduplication', () => {
        const res1 = mappingStorage.addMapping('one-commander', '  OneCommander.exe  ');
        assert.strictEqual(res1, true);

        // Deduplication
        const res2 = mappingStorage.addMapping('one-commander', 'OneCommander.exe');
        assert.strictEqual(res2, true);

        const list = mappingStorage.getCustomMappingsForApp('one-commander');
        assert.deepStrictEqual(list, ['OneCommander.exe']);
    });

    it('TC-003: should reject empty or invalid process names', () => {
        assert.strictEqual(mappingStorage.addMapping('one-commander', ''), false);
        assert.strictEqual(mappingStorage.addMapping('one-commander', '   '), false);
        assert.strictEqual(mappingStorage.addMapping('', 'test.exe'), false);
        assert.strictEqual(mappingStorage.addMapping(null, 'test.exe'), false);
        assert.deepStrictEqual(mappingStorage.getCustomMappingsForApp('one-commander'), []);
    });

    it('TC-004: should remove specific custom mapping', () => {
        mappingStorage.addMapping('one-commander', 'OneCommander.exe');
        mappingStorage.addMapping('one-commander', 'OneCommander.app');

        const removed = mappingStorage.removeMapping('one-commander', 'OneCommander.exe');
        assert.strictEqual(removed, true);

        const list = mappingStorage.getCustomMappingsForApp('one-commander');
        assert.deepStrictEqual(list, ['OneCommander.app']);
    });

    it('TC-005: should reset all custom mappings for an app', () => {
        mappingStorage.addMapping('one-commander', 'OneCommander.exe');
        mappingStorage.addMapping('figma', 'FigmaBeta.exe');

        const resetRes = mappingStorage.resetMappings('one-commander');
        assert.strictEqual(resetRes, true);

        assert.deepStrictEqual(mappingStorage.getCustomMappingsForApp('one-commander'), []);
        assert.deepStrictEqual(mappingStorage.getCustomMappingsForApp('figma'), ['FigmaBeta.exe']);
    });

    it('TC-006: should get all unique mapped process names across apps', () => {
        mappingStorage.addMapping('one-commander', 'OneCommander.exe');
        mappingStorage.addMapping('figma', 'FigmaBeta.exe');
        mappingStorage.addMapping('figma', 'OneCommander.exe'); // duplicate process name

        const allNames = mappingStorage.getAllMappedProcessNames();
        assert.deepStrictEqual(allNames.sort(), ['FigmaBeta.exe', 'OneCommander.exe'].sort());
    });

    it('TC-007: should fallback safely when storage is corrupted or null', () => {
        mockStorage['custom_app_process_mappings'] = 'invalid-json';
        assert.deepStrictEqual(mappingStorage.getCustomMappings(), {});
    });
});
