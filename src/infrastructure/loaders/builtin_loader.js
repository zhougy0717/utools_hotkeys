const fs = require('fs');
const path = require('path');

class BuiltinLoader {
    constructor() {
        this.appIdAliases = {
            'jet_brains': 'intellij-idea'
        };
    }

    updatePlaceHolder(val) {
        if (typeof val !== 'string') return val;
        let newVal = val;
        if (val.includes('{cmd_or_ctrl}')) {
            if (utools.isMacOs()) {
                newVal = val.replace(/{cmd_or_ctrl}/g, 'command');
            } else if (utools.isWindows()) {
                newVal = val.replace(/{cmd_or_ctrl}/g, 'ctrl');
            }
        }
        val = newVal;
        if (val.includes('{opt_or_alt}')) {
            if (utools.isMacOs()) {
                newVal = val.replace(/{opt_or_alt}/g, 'option');
            } else if (utools.isWindows()) {
                newVal = val.replace(/{opt_or_alt}/g, 'alt');
            }
        }
        return newVal;
    }

    handleArr(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                this.handleArr(arr[i]);
            } else {
                arr[i] = this.updatePlaceHolder(arr[i]);
            }
        }
    }

    handleTemplate(arr) {
        arr.forEach(x => {
            for (let key in x) {
                if (Array.isArray(x[key])) {
                    this.handleArr(x[key]);
                } else {
                    x[key] = this.updatePlaceHolder(x[key]);
                }
            }
        });
    }

    load() {
        const macos = require('../data/json/macos.js');
        const windows = require('../data/json/windows.js');
        const magnet_macos = require('../data/json/magnet_macos.js');
        const tmux = require('../data/json/tmux.js');
        const vim = require('../data/json/vim.js');

        const shortcutTable = { macos, windows, magnet_macos, tmux, vim };
        let loaded = [];

        const requireAll = (directory) => {
            if (!fs.existsSync(directory)) return;
            const files = fs.readdirSync(directory);
            for (let file of files) {
                const filePath = path.join(directory, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    requireAll(filePath);
                } else if (path.basename(file) === 'shortcuts.js') {
                    const sc = require(filePath);
                    loaded = loaded.concat(sc);
                }
            }
        };

        requireAll(path.join(__dirname, '../data/shortcuts'));

        for (let k of loaded) {
            const name = k.name();
            const sc = k.get();
            if (sc.length !== 0) {
                shortcutTable[name] = sc;
            }
        }

        let shortcuts = [];
        for (let k in shortcutTable) {
            // Platform filtering
            if (k.includes('template')) {
                if (!utools.isMacOs() && !utools.isWindows()) continue;
                this.handleTemplate(shortcutTable[k]);
            } else {
                if (utools.isMacOs() && k.includes('windows')) continue;
                if (utools.isWindows() && k.includes('macos')) continue;
            }

            // Add appId tags to builtin shortcuts if they don't have it (optional, for deduplication later)
            const appId = this.appIdAliases[k] || k;
            const data = shortcutTable[k].map(s => ({ ...s, appId: appId }));
            shortcuts = shortcuts.concat(data);
        }

        return shortcuts;
    }
}

module.exports = BuiltinLoader;
