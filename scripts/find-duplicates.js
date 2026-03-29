const fs = require('fs');
const path = require('path');
const { normalizeAppId } = require('../src/infrastructure/app_id_normalizer.js');

function getFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile());
}

function getDirs(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
}

// 1. Get apps in cheatsheet_builtin
const builtinMacDir = path.join(__dirname, '../src/infrastructure/data/cheatsheet_builtin/mac');
const builtinWinDir = path.join(__dirname, '../src/infrastructure/data/cheatsheet_builtin/win');
const builtinMac = getFiles(builtinMacDir).map(f => path.basename(f, '.json'));
const builtinWin = getFiles(builtinWinDir).map(f => path.basename(f, '.json'));
const builtinTotal = Array.from(new Set([...builtinMac, ...builtinWin]));

// 2. Get apps in json
const jsonDir = path.join(__dirname, '../src/infrastructure/data/json');
const jsonApps = getFiles(jsonDir).map(f => path.basename(f, '.js'));

// 3. Get apps in shortcuts
const shortcutsBaseDir = path.join(__dirname, '../src/infrastructure/data/shortcuts');
const shortcutsRoot = getDirs(shortcutsBaseDir);
let shortcutsApps = [];
for (const dir of shortcutsRoot) {
    if (dir === 'office') {
        const officeSub = getDirs(path.join(shortcutsBaseDir, 'office'));
        shortcutsApps.push(...officeSub.map(s => `office_${s}`));
    } else {
        shortcutsApps.push(dir);
    }
}

// 4. Comparison
console.log('Duplicate report between cheatsheet_builtin and (json OR shortcuts):');
console.log('--------------------------------------------------------------');

const duplicates = [];

for (const builtinId of builtinTotal) {
    const normBuiltin = normalizeAppId(builtinId);
    
    // Check in jsonApps
    for (const jsonId of jsonApps) {
        if (normalizeAppId(jsonId) === normBuiltin) {
            duplicates.push({ builtin: builtinId, other: jsonId, source: 'json', norm: normBuiltin });
        }
    }
    
    // Check in shortcutsApps
    for (const shortcutId of shortcutsApps) {
        if (normalizeAppId(shortcutId) === normBuiltin) {
            duplicates.push({ builtin: builtinId, other: shortcutId, source: 'shortcuts', norm: normBuiltin });
        }
    }
}

duplicates.forEach(d => {
    console.log(`Match: Built-in "${d.builtin}" matches ${d.source} "${d.other}" (Normalized: ${d.norm})`);
});

if (duplicates.length === 0) {
    console.log('No duplicates found.');
}
