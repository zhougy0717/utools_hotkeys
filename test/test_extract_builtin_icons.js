const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { extractIconsFromData, parseDataUri, cleanJsonDoc } = require('../scripts/extract_builtin_icons.js');

describe('Icon Extractor Utility', () => {
    const tempDir = path.join(__dirname, 'mock_extract_icons');
    const mockIconsDir = path.join(tempDir, 'icons');

    beforeEach(() => {
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        if (!fs.existsSync(mockIconsDir)) {
            fs.mkdirSync(mockIconsDir, { recursive: true });
        }
    });

    afterEach(() => {
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    it('should correctly parse SVG Data URI', () => {
        const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10"/></svg>';
        const base64 = Buffer.from(svgContent).toString('base64');
        const dataUri = `data:image/svg+xml;base64,${base64}`;

        const parsed = parseDataUri(dataUri);
        assert.ok(parsed);
        assert.strictEqual(parsed.mimeType, 'image/svg+xml');
        assert.strictEqual(parsed.extension, 'svg');
        assert.strictEqual(parsed.buffer.toString('utf8'), svgContent);
    });

    it('should correctly parse PNG Data URI', () => {
        const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
        const dataUri = `data:image/png;base64,${pngHeader.toString('base64')}`;

        const parsed = parseDataUri(dataUri);
        assert.ok(parsed);
        assert.strictEqual(parsed.mimeType, 'image/png');
        assert.strictEqual(parsed.extension, 'png');
        assert.deepStrictEqual(parsed.buffer, pngHeader);
    });

    it('should clean JSON doc and replace Base64 with relative icon path', () => {
        const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><circle r="5"/></svg>';
        const dataUri = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;

        const rawDoc = {
            appId: 'test-app',
            appName: 'Test App',
            icon: dataUri,
            shortcuts: [
                {
                    title: 'Shortcut 1',
                    icon: dataUri,
                    keys: ['a', 'command']
                },
                {
                    title: 'Shortcut 2',
                    icon: dataUri,
                    keys: ['b', 'command']
                }
            ]
        };

        const result = cleanJsonDoc(rawDoc, mockIconsDir);
        assert.ok(result.cleaned);
        assert.strictEqual(result.doc.icon, 'icons/test-app.svg');
        // Sub-items should have redundant base64 removed
        assert.strictEqual(result.doc.shortcuts[0].icon, undefined);
        assert.strictEqual(result.doc.shortcuts[1].icon, undefined);

        // Verify physical icon file was saved
        const savedIconPath = path.join(mockIconsDir, 'test-app.svg');
        assert.ok(fs.existsSync(savedIconPath));
        assert.strictEqual(fs.readFileSync(savedIconPath, 'utf8'), svgContent);
    });

    it('should skip JSON docs that already use relative icon path without Base64', () => {
        const rawDoc = {
            appId: 'existing-app',
            appName: 'Existing App',
            icon: 'icons/existing-app.png',
            shortcuts: [
                {
                    title: 'Shortcut 1',
                    keys: ['x']
                }
            ]
        };

        const result = cleanJsonDoc(rawDoc, mockIconsDir);
        assert.strictEqual(result.cleaned, false);
        assert.strictEqual(result.doc.icon, 'icons/existing-app.png');
    });
});
