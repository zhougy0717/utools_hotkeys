const fs = require('fs');
const path = require('path');
const https = require('https');

/**
 * Advanced Icon Fetcher with Statistics, Proper Exit, and Robust Fallbacks
 */

const BUILTIN_DIR = path.join(__dirname, '../src/infrastructure/data/cheatsheet_builtin');
const OPENCODE_FILE = path.join(__dirname, '../src/infrastructure/data/opencode/opencode.json');

const SLUG_MAP = {
    'microsoft-edge': 'edge',
    'google-chrome': 'chrome',
    'visual-studio-code': 'vscode',
    'intellij-idea': 'idea', // Correct slug for IntelliJ IDEA is 'idea'
    'microsoft-word': 'word',
    'microsoft-excel': 'excel',
    'microsoft-powerpoint': 'ppt',
    'microsoft-visual-studio': 'visual-studio',
    'navicat-premium': 'navicat',
    'sublime-text': 'sublime',
    'postman': 'postman',
    'pycharm': 'pycharm',
    'phpstorm': 'phpstorm',
    'webstorm': 'webstorm',
    'typora': 'typora'
};

const OPTIONS = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
    timeout: 15000 // 15s timeout
};

const stats = {
    total: 0,
    success: 0,
    alreadyDone: 0,
    fail: 0,
    failedApps: []
};

async function download(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, OPTIONS, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Status ${res.statusCode}`));
                return;
            }
            const chunks = [];
            res.on('data', (c) => chunks.push(c));
            res.on('end', () => resolve(Buffer.concat(chunks)));
        });
        
        req.on('error', reject);
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Request Timeout'));
        });
    });
}

function svgToBase64(svgString) {
    if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
        svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    return `data:image/svg+xml;base64,${Buffer.from(svgString).toString('base64')}`;
}

async function fetchIconMap(platform) {
    const url = `https://hotkeycheatsheet.com/os/${platform}`;
    console.log(`[IconFetcher] Scalloping ${url}...`);
    
    const iconMap = {};
    try {
        const data = await download(url);
        const html = data.toString();
        
        const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
        if (nextDataMatch) {
            try {
                const jsonData = JSON.parse(nextDataMatch[1]);
                const findApps = (obj) => {
                    if (Array.isArray(obj) && obj.length > 5 && (obj[0].id || obj[0].slug)) return obj;
                    if (obj && typeof obj === 'object') {
                        for (const k in obj) {
                            const found = findApps(obj[k]);
                            if (found) return found;
                        }
                    }
                    return null;
                };
                const apps = findApps(jsonData.props?.pageProps) || [];
                apps.forEach(app => {
                    const slug = app.slug || app.id;
                    if (slug && app.icon) iconMap[slug] = app.icon;
                });
            } catch (e) {}
        }

        const linkRegex = /<a[^>]*href="[^"]*\/hotkey-cheatsheet\/([^"?#]+)[^"]*"[^>]*>([\s\S]*?)<\/a>/g;
        let match;
        while ((match = linkRegex.exec(html)) !== null) {
            const slug = match[1];
            const content = match[2];
            if (iconMap[slug]) continue;
            const svgMatch = content.match(/<svg[\s\S]*?<\/svg>/);
            if (svgMatch) { iconMap[slug] = svgMatch[0]; continue; }
            const bgMatch = content.match(/style="[^"]*background-image:\s*url\(['"]?(.*?)['"]?\)/);
            if (bgMatch) iconMap[slug] = bgMatch[1];
        }
        return iconMap;
    } catch (e) {
        console.error(`[IconFetcher] Error fetching list for ${platform}: ${e.message}`);
        return iconMap;
    }
}

async function fetchIconFromDetailPage(slug) {
    const url = `https://hotkeycheatsheet.com/hotkey-cheatsheet/${slug}`;
    console.log(`[IconFetcher] Attempting detail page fallback for slug: ${slug}...`);
    try {
        const data = await download(url);
        const html = data.toString();
        
        // Strategy 1: JSON __NEXT_DATA__
        const nextMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
        if (nextMatch) {
            try {
                const jsonData = JSON.parse(nextMatch[1]);
                const findApp = (obj) => {
                    if (obj && typeof obj === 'object') {
                       if (obj.slug === slug && obj.icon) return obj;
                       for (const k in obj) {
                           const found = findApp(obj[k]);
                           if (found) return found;
                       }
                    }
                    return null;
                };
                const app = findApp(jsonData.props?.pageProps);
                if (app && app.icon) return app.icon;
            } catch (e) {}
        }
        
        // Strategy 2: Inline SVG in HTML
        // Looking for the main app icon SVG
        const svgMatch = html.match(/<svg[^>]*class="[^"]*w-\d+ h-\d+[^"]*"[\s\S]*?<\/svg>/) || 
                         html.match(/<svg[^>]*class="[^"]*icon[^"]*"[\s\S]*?<\/svg>/) ||
                         html.match(/<svg[\s\S]*?<\/svg>/);
        if (svgMatch) return svgMatch[0];

        // Strategy 3: Background Image in HTML
        const bgMatch = html.match(/background-image:\s*url\(['"]?(.*?)['"]?\)/);
        if (bgMatch) return bgMatch[1];

    } catch (e) {
        console.warn(`[IconFetcher] Error in detail page for ${slug}: ${e.message}`);
    }
    return null;
}

async function prepareIconBase64(iconValue, slug) {
    if (!iconValue) return null;
    if (iconValue.startsWith('data:')) return iconValue;
    if (iconValue.includes('<svg')) return svgToBase64(iconValue);
    
    if (iconValue.startsWith('http')) {
        try {
            const data = await download(iconValue);
            let mimeType = 'image/png';
            if (data.toString().includes('<svg')) mimeType = 'image/svg+xml';
            else if (data[0] === 0x89 && data[1] === 0x50) mimeType = 'image/png';
            return `data:${mimeType};base64,${data.toString('base64')}`;
        } catch (e) {}
    }

    // Last resort: standard API pattern
    const apiLink = `https://hotkeycheatsheet.com/api/v1/apps/${slug}/icon`;
    try {
        const data = await download(apiLink);
        let mimeType = 'image/png';
        if (data.toString().includes('<svg')) mimeType = 'image/svg+xml';
        return `data:${mimeType};base64,${data.toString('base64')}`;
    } catch (e) {}

    return null;
}

async function processDirectory(dirName, iconMap) {
    const dir = path.join(BUILTIN_DIR, dirName);
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    for (const file of files) {
        stats.total++;
        const filePath = path.join(dir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);
        const appId = data.appId;
        const slug = SLUG_MAP[appId] || appId;
        
        // Skip if already has base64 icon
        if (data.icon && data.icon.startsWith('data:image')) {
            console.log(`[IconFetcher] [${dirName}] ${appId} already has icon. Skipping.`);
            stats.alreadyDone++;
            continue;
        }

        console.log(`[IconFetcher] [${dirName}] Processing ${appId} (slug: ${slug})...`);
        
        let rawIcon = iconMap[slug];
        if (!rawIcon) {
            rawIcon = await fetchIconFromDetailPage(slug);
        }

        const base64Icon = await prepareIconBase64(rawIcon, slug);
        
        if (base64Icon) {
            data.icon = base64Icon;
            if (data.shortcuts) {
                data.shortcuts.forEach(s => s.icon = base64Icon);
            }
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
            stats.success++;
            console.log(`[IconFetcher] SUCCESS: ${appId}`);
        } else {
            stats.fail++;
            stats.failedApps.push(`${dirName}/${appId}`);
            console.error(`[IconFetcher] FAILED: ${appId} (Could not find or convert icon)`);
        }
    }
}

async function processOpencode() {
    if (!fs.existsSync(OPENCODE_FILE)) return;
    console.log(`[IconFetcher] Processing OpenCode (Special Case)...`);
    const fileContent = fs.readFileSync(OPENCODE_FILE, 'utf8');
    const data = JSON.parse(fileContent);
    data.icon = 'icons/opencode.png';
    if (data.shortcuts) {
        data.shortcuts.forEach(s => s.icon = 'icons/opencode.png');
    }
    fs.writeFileSync(OPENCODE_FILE, JSON.stringify(data, null, 2), 'utf8');
    console.log(`[IconFetcher] SUCCESS: OpenCode (Set to local path)`);
}

async function main() {
    try {
        console.log('[IconFetcher] Starting fully logic-compliant crawler...');
        
        const macMap = await fetchIconMap('macos');
        const winMap = await fetchIconMap('windows');
        
        await processDirectory('mac', macMap);
        await processDirectory('win', winMap);
        await processOpencode();
        
        console.log('\n' + '='.repeat(40));
        console.log('       ICON DOWNLOAD STATISTICS');
        console.log('='.repeat(40));
        console.log(`Total Processed:  ${stats.total}`);
        console.log(`Already Had Icon: ${stats.alreadyDone}`);
        console.log(`Successfully Fixed: ${stats.success}`);
        console.log(`Failed:           ${stats.fail}`);
        console.log('='.repeat(40));
        
        if (stats.failedApps.length > 0) {
            console.log('\nFAILED APPLICATIONS:');
            stats.failedApps.forEach(app => console.log(`- ${app}`));
            console.log('\nTIP: Please check if the slug in SLUG_MAP is correct for these apps.');
        } else {
            console.log('\nALL ICONS DOWNLOADED SUCCESSFULLY! 🎉');
        }
        console.log('='.repeat(40) + '\n');
    } catch (err) {
        console.error('[IconFetcher] Unexpected fatal error:', err);
    } finally {
        process.exit(0);
    }
}

main();
