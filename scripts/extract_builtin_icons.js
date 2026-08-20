const fs = require('fs');
const path = require('path');

const BUILTIN_DIR = path.join(__dirname, '../src/infrastructure/data/cheatsheet_builtin');
const DEFAULT_ICONS_DIR = path.join(__dirname, '../icons');

/**
 * Parses Data URI into mimeType, extension, and binary Buffer.
 */
function parseDataUri(dataUri) {
    if (typeof dataUri !== 'string' || !dataUri.startsWith('data:')) {
        return null;
    }

    const match = dataUri.match(/^data:([^;]+);base64,(.*)$/);
    if (!match) return null;

    const mimeType = match[1];
    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, 'base64');
    
    let extension = 'png';
    if (mimeType.includes('svg') || buffer.toString('utf8', 0, 100).includes('<svg')) {
        extension = 'svg';
    } else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) {
        extension = 'jpg';
    } else if (mimeType.includes('webp')) {
        extension = 'webp';
    }

    return {
        mimeType,
        extension,
        buffer
    };
}

/**
 * Cleans a parsed JSON document: extracts Base64 icon into target icons directory,
 * replaces top-level icon with relative path, and strips redundant Base64 from shortcut items.
 */
function cleanJsonDoc(doc, iconsDir = DEFAULT_ICONS_DIR) {
    if (!doc || !doc.appId) {
        return { doc, cleaned: false };
    }

    const appId = doc.appId;
    let base64IconStr = null;

    // Check top-level icon
    if (typeof doc.icon === 'string' && doc.icon.startsWith('data:')) {
        base64IconStr = doc.icon;
    } else if (Array.isArray(doc.shortcuts)) {
        // Fallback to first item with Base64 icon
        const firstWithIcon = doc.shortcuts.find(s => typeof s.icon === 'string' && s.icon.startsWith('data:'));
        if (firstWithIcon) {
            base64IconStr = firstWithIcon.icon;
        }
    }

    let isCleaned = false;

    if (base64IconStr) {
        const parsed = parseDataUri(base64IconStr);
        if (parsed) {
            const iconFileName = `${appId}.${parsed.extension}`;
            const diskPath = path.join(iconsDir, iconFileName);

            // Write icon file if it doesn't exist or is overwritten
            if (!fs.existsSync(iconsDir)) {
                fs.mkdirSync(iconsDir, { recursive: true });
            }
            fs.writeFileSync(diskPath, parsed.buffer);

            // Update top-level icon
            doc.icon = `icons/${iconFileName}`;
            isCleaned = true;
        }
    }

    // Clean redundant Base64 icons inside shortcuts array
    if (Array.isArray(doc.shortcuts)) {
        doc.shortcuts.forEach(s => {
            if (typeof s.icon === 'string' && s.icon.startsWith('data:')) {
                delete s.icon;
                isCleaned = true;
            }
        });
    }

    return {
        doc,
        cleaned: isCleaned
    };
}

/**
 * Scans directories and extracts icons.
 */
function extractIconsFromData(baseDir = BUILTIN_DIR, iconsDir = DEFAULT_ICONS_DIR) {
    if (!fs.existsSync(baseDir)) {
        console.warn(`[IconExtractor] Base directory not found: ${baseDir}`);
        return { totalFiles: 0, cleanedFiles: 0, extractedIcons: 0 };
    }

    const platforms = ['mac', 'win'];
    let totalFiles = 0;
    let cleanedFiles = 0;
    const extractedIcons = new Set();

    for (const platform of platforms) {
        const pDir = path.join(baseDir, platform);
        if (!fs.existsSync(pDir)) continue;

        const files = fs.readdirSync(pDir).filter(f => f.endsWith('.json'));
        for (const file of files) {
            totalFiles++;
            const filePath = path.join(pDir, file);
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const initialSize = Buffer.byteLength(content, 'utf8');
                const data = JSON.parse(content);

                const { doc, cleaned } = cleanJsonDoc(data, iconsDir);
                if (cleaned) {
                    cleanedFiles++;
                    const updatedContent = JSON.stringify(doc, null, 2);
                    const newSize = Buffer.byteLength(updatedContent, 'utf8');
                    fs.writeFileSync(filePath, updatedContent, 'utf8');

                    if (doc.icon && doc.icon.startsWith('icons/')) {
                        extractedIcons.add(doc.icon);
                    }

                    const savedKb = ((initialSize - newSize) / 1024).toFixed(1);
                    console.log(`[IconExtractor] [${platform}] Cleaned ${file}: ${(initialSize/1024).toFixed(1)}KB -> ${(newSize/1024).toFixed(1)}KB (Saved ${savedKb}KB)`);
                }
            } catch (e) {
                console.error(`[IconExtractor] Failed to process ${filePath}:`, e);
            }
        }
    }

    return {
        totalFiles,
        cleanedFiles,
        extractedIcons: extractedIcons.size
    };
}

// If run directly from CLI
if (require.main === module) {
    console.log('[IconExtractor] Starting extraction of Base64 icons in cheatsheet_builtin...');
    const result = extractIconsFromData();
    console.log(`[IconExtractor] Done! Total files: ${result.totalFiles}, Cleaned: ${result.cleanedFiles}, Icons extracted: ${result.extractedIcons}`);
}

module.exports = {
    parseDataUri,
    cleanJsonDoc,
    extractIconsFromData
};
