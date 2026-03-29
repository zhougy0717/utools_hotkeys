# Support OpenCode Shortcuts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Crawl OpenCode.ai shortcuts from 小众软件论坛 and integrate them into the plugin's unified shortcut system.

**Architecture:** 
- A specialized scraper script fetches and parses Discourse topic content into a standardized JSON file.
- A new data directory `src/infrastructure/data/opencode/` stores the crawled data.
- A dedicated `OpencodeLoader` in `src/infrastructure/loaders/` ensures the data is aggregated into the main shortcut list.

**Tech Stack:** Node.js (built-in `https`, `fs`), Regex/String manipulation for HTML parsing.

---

### Task 1: Environment and Directory Setup

**Files:**
- Create: `src/infrastructure/data/opencode/`

- [ ] **Step 1: Create the data directory**
```bash
mkdir -p src/infrastructure/data/opencode
```

### Task 2: Implement Scraper Script

**Files:**
- Create: `scripts/crawl_opencode_shortcuts.js`

- [ ] **Step 1: Write the scraper script**
The script should:
1. Fetch JSON from `https://meta.appinn.net/t/topic/80370.json`.
2. Extract the `cooked` HTML from the first post.
3. Parse headers (`<h2>`) as categories.
4. Parse tables (`<table>`) following headers as shortcuts.
5. Standardize key names (e.g., `Ctrl` -> `control`, `Super` -> `command`, `←` -> `left`).
6. Replace `<leader>` with `control` and `x`.
7. Write results to `src/infrastructure/data/opencode/opencode.json`.

```javascript
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
        'ctrl': 'control',
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
    const leader = ['control', 'x'];
    
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
                        const keyGroups = [];
                        
                        if (codeMatches.length > 0) {
                            codeMatches.forEach(codeHtml => {
                                const group = codeHtml.replace(/<\/?code>/g, '').trim();
                                let keys = [];
                                if (group.includes('<leader>')) {
                                    const parts = group.replace('<leader>', '').split('+').filter(Boolean).map(normalizeKey);
                                    keys = [...leader, ...parts];
                                } else {
                                    keys = group.split('+').filter(Boolean).map(normalizeKey);
                                }
                                if (keys.length > 0) {
                                    shortcuts.push({
                                        title,
                                        description: `${title} (OpenCode)`,
                                        keys,
                                        keyword: `opencode ${category} ${title}`,
                                        category
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
```

### Task 3: Implement Opencode Loader

**Files:**
- Create: `src/infrastructure/loaders/opencode_loader.js`

- [ ] **Step 1: Write the loader code**
```javascript
const fs = require('fs');
const path = require('path');

class OpencodeLoader {
    load() {
        const dataFile = path.join(__dirname, '../data/opencode/opencode.json');
        if (!fs.existsSync(dataFile)) {
            console.warn(`[OpencodeLoader] Data file not found: ${dataFile}`);
            return [];
        }

        try {
            const content = fs.readFileSync(dataFile, 'utf8');
            const data = JSON.parse(content);

            if (data && Array.isArray(data.shortcuts)) {
                return data.shortcuts.map(item => ({
                    ...item,
                    appId: data.appId,
                    appName: data.appName,
                    _source: 'opencode'
                }));
            }
        } catch (e) {
            console.error('[OpencodeLoader] Failed to parse opencode.json:', e);
        }
        return [];
    }
}

module.exports = OpencodeLoader;
```

### Task 4: Integration and Execution

**Files:**
- Modify: `src/infrastructure/shortcuts_loader.js`

- [ ] **Step 1: Register OpencodeLoader in aggregation logic**
Add a new phase for opencode in `loadAllShortcuts()`.

- [ ] **Step 2: Run the scraper script**
Run: `node scripts/crawl_opencode_shortcuts.js`
Expected: "Successfully saved X shortcuts to ..."

- [ ] **Step 3: Verify the output JSON**
Check `src/infrastructure/data/opencode/opencode.json` structure.

- [ ] **Step 4: Verify integration**
Run the plugin (or a test script) to ensure `OpencodeLoader` is called.
