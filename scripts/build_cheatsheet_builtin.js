const fs = require('fs');
const path = require('path');

/**
 * SPEC-00012: Build script for converting CheatSheet data to Unified Plugin Format.
 */

const SOURCE_DIR = path.join(__dirname, '../CheatSheet/src-tauri/shortcuts');
const OUTPUT_DIR_MAC = path.join(__dirname, '../src/infrastructure/data/cheatsheet_builtin/mac');
const OUTPUT_DIR_WIN = path.join(__dirname, '../src/infrastructure/data/cheatsheet_builtin/win');

// Standard icons mapping
const ICON_MAP = {
    'google-chrome': 'icons/google_chrome.png',
    'visual-studio-code': 'icons/vscode.png',
    'intellij-idea': 'icons/intellij-idea.png',
    'microsoft-word': 'icons/office_word.png',
    'microsoft-excel': 'icons/office_excel.png',
    'microsoft-powerpoint': 'icons/office_ppt.png',
    'sublime-text': 'icons/sublimetext.png'
};

const DEFAULT_ICONS = {
    mac: 'icons/macos.png',
    win: 'icons/windows.png'
};

function main() {
    console.log('[BuildCheatsheet] Starting build process...');

    // Ensure output directories exist and are clean
    [OUTPUT_DIR_MAC, OUTPUT_DIR_WIN].forEach(dir => {
        if (fs.existsSync(dir)) {
            fs.readdirSync(dir).forEach(file => fs.unlinkSync(path.join(dir, file)));
        } else {
            fs.mkdirSync(dir, { recursive: true });
        }
    });

    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`[BuildCheatsheet] Source directory not found: ${SOURCE_DIR}`);
        return;
    }

    const files = fs.readdirSync(SOURCE_DIR)
                    .filter(f => f.endsWith('.json') && f !== 'CheatSheet.json');

    const timestamp = Date.now();
    let appCount = 0;
    let totalShortcuts = 0;

    for (const file of files) {
        try {
            const data = JSON.parse(fs.readFileSync(path.join(SOURCE_DIR, file), 'utf8'));
            if (!data.name || !data.categories) continue;

            const appName = data.name;
            const appId = appName.toLowerCase().replace(/ /g, '-');

            const macShortcuts = [];
            const winShortcuts = [];

            for (const category of data.categories) {
                if (!Array.isArray(category.shortcuts)) continue;

                for (const sc of category.shortcuts) {
                    if (sc.command && sc.command.mac) {
                        macShortcuts.push(buildShortcutItem(sc, category.name, 'mac', appName, appId));
                    }
                    if (sc.command && sc.command.win) {
                        winShortcuts.push(buildShortcutItem(sc, category.name, 'win', appName, appId));
                    }
                }
            }

            if (macShortcuts.length > 0) {
                fs.writeFileSync(
                    path.join(OUTPUT_DIR_MAC, `${appId}.json`),
                    JSON.stringify({ appId, appName, updatedAt: timestamp, shortcuts: macShortcuts }, null, 2)
                );
            }
            if (winShortcuts.length > 0) {
                fs.writeFileSync(
                    path.join(OUTPUT_DIR_WIN, `${appId}.json`),
                    JSON.stringify({ appId, appName, updatedAt: timestamp, shortcuts: winShortcuts }, null, 2)
                );
            }

            appCount++;
            totalShortcuts += (macShortcuts.length + winShortcuts.length);

        } catch (e) {
            console.error(`[BuildCheatsheet] Error processing ${file}:`, e);
        }
    }

    console.log(`[BuildCheatsheet] Build completed! Processed ${appCount} apps, total ${totalShortcuts} shortcuts.`);
}

function buildShortcutItem(sc, categoryName, platform, appName, appId) {
    const commandStr = sc.command[platform];
    const keys = parseKeys(commandStr);
    
    // Normalize icon: prioritize specific match, fallback to platform default
    const icon = ICON_MAP[appId] || DEFAULT_ICONS[platform];

    return {
        title: `${sc.description} ${commandStr}`,
        description: `${sc.description} (cheatsheet)`,
        keys: keys,
        keyword: `${appName} ${categoryName} ${sc.description}`.toLowerCase(),
        category: categoryName,
        icon: icon
    };
}

function parseKeys(commandStr) {
    // Handle "|" (Alternatives) - Take the first one
    if (commandStr.includes('|')) {
        commandStr = commandStr.split('|')[0].trim();
    }

    // Handle "&" (Sequential Steps) - Convert to nested array
    if (commandStr.includes('&')) {
        return commandStr.split('&').map(part => parseSingleCombo(part.trim()));
    }

    return parseSingleCombo(commandStr);
}

function parseSingleCombo(comboStr) {
    const parts = comboStr.split('+').map(p => p.trim().toLowerCase());
    const modifiers = ['ctrl', 'command', 'shift', 'option', 'alt', 'control', 'meta', 'win'];
    
    const mainKeys = parts.filter(p => !modifiers.includes(p));
    const modKeys = parts.filter(p => modifiers.includes(p));

    // Mapping some keys to standard uTools/Electron key names
    const keyMap = {
        'plus': 'equal', // Often '+' is shift+equal on keyboards
        'esc': 'escape',
        'enter': 'enter',
        'space': 'space',
        'backspace': 'backspace',
        'tab': 'tab',
        'pgdn': 'pagedown',
        'pgup': 'pageup',
        'ins': 'insert',
        'del': 'delete',
        'up': 'up',
        'down': 'down',
        'left': 'left',
        'right': 'right'
    };

    const finalMain = mainKeys.map(k => keyMap[k] || k);
    
    // Standard order: Main key first, followed by modifiers
    // This matches common_method.js's expectiation in handleShortcut for simulateKeyboardTap
    return [...finalMain, ...modKeys];
}

// Export for testing
if (require.main === module) {
    main();
} else {
    module.exports = { parseKeys, parseSingleCombo, buildShortcutItem };
}
