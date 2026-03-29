const fs = require('fs');
const path = require('path');
const https = require('https');

const TARGET_URL = 'https://meta.appinn.net/t/topic/80370.json';
const OUTPUT_FILE = path.join(__dirname, '../src/infrastructure/data/opencode/opencode.json');

async function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

function normalizeKey(key) {
    const map = {
        'ctrl': 'ctrl',
        'control': 'ctrl',
        'alt': 'option',
        'shift': 'shift',
        'super': 'command',
        'esc': 'escape',
        'backspace': 'backspace',
        'delete': 'delete',
        'pageup': 'pageup',
        'pagedown': 'pagedown',
        'home': 'home',
        'end': 'end',
        'enter': 'enter',
        'tab': 'tab',
        '←': 'left',
        '→': 'right',
        '↑': 'up',
        '↓': 'down'
    };
    const k = key.toLowerCase().trim();
    return map[k] || k;
}

function parseShortcuts(cookedHtml) {
    const shortcuts = [];
    const leader = ['x', 'ctrl'];
    
    // Split into categories using <h2>
    const categorySplits = cookedHtml.split(/<h2.*?>/);
    categorySplits.shift(); // First part is intro

    categorySplits.forEach((content) => {
        // Extract category name from the part before </h2>
        const categoryNameMatch = content.match(/^(.*?)<\/h2>/);
        if (!categoryNameMatch) return;
        const category = categoryNameMatch[1].replace(/<a.*?>.*?<\/a>/g, '').trim();

        const tableMatch = content.match(/<tbody>(.*?)<\/tbody>/s);
        if (tableMatch) {
            const rows = tableMatch[1].match(/<tr>(.*?)<\/tr>/gs);
            if (rows) {
                rows.forEach(row => {
                    const cols = row.match(/<td>(.*?)<\/td>/gs);
                    if (cols && cols.length >= 2) {
                        const title = cols[0].replace(/<\/?td>/g, '').trim();
                        if (title === '功能') return; // Header row
                        
                        let keysHtml = cols[1].replace(/<\/?td>/g, '').trim();
                        // Extract codes
                        const codeMatches = keysHtml.match(/<code>(.*?)<\/code>/g) || [];
                        
                        if (codeMatches.length > 0) {
                            codeMatches.forEach(codeHtml => {
                                const group = codeHtml.replace(/<\/?code>/g, '').trim();
                                let keys = [];
                                if (group.includes('<leader>') || group.includes('&lt;leader&gt;')) {
                                    const parts = group.replace('<leader>', '').replace('&lt;leader&gt;', '').replace(/\+/g, ' ').split(/\s+/).filter(Boolean).map(normalizeKey);
                                    keys = [leader, parts];
                                } else {
                                    keys = group.replace(/\+/g, ' ').split(/\s+/).filter(Boolean).map(normalizeKey);
                                }
                                if (keys.length > 0) {
                                    const displayGroup = group.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                                    let description = title;
                                    if (displayGroup.includes('<leader>')) {
                                        description += ' (<leader>默认为Ctrl + x)';
                                    }
                                    shortcuts.push({
                                        title: `${title}: ${displayGroup}`,
                                        description,
                                        keys,
                                        keyword: `opencode ${category} ${title}`,
                                        category,
                                        icon: 'icons/opencode.png'
                                    });
                                }
                            });
                        }
                    }
                });
            }
        }
    });

    return shortcuts;
}

async function main() {
    console.log('Fetching OpenCode shortcuts from meta.appinn.net...');
    const data = await fetchJson(TARGET_URL);
    const cooked = data.post_stream.posts[0].cooked;
    
    const shortcuts = parseShortcuts(cooked);
    const result = {
        appId: 'opencode',
        appName: 'OpenCode',
        icon: 'icons/opencode.png',
        updatedAt: Date.now(),
        shortcuts
    };

    if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
        fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    }
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
    console.log(`Successfully saved ${shortcuts.length} shortcuts to ${OUTPUT_FILE}`);
}

main().catch(console.error);
