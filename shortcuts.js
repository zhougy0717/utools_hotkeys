
// This file is generated by a python parser, because I don't know how to read a config file during utools runtime.
// Shy😓
// Date 2023-09-24 17:01:40
    

const vscode_macos = require('./json/vscode_macos.js')
const macos = require('./json/macos.js')
const windows = require('./json/windows.js')
const obsidian_macos = require('./json/obsidian_macos.js')

let shortcutTable = {
    vscode_macos: vscode_macos,
    macos: macos,
    windows: windows,
    obsidian_macos: obsidian_macos,
}

let shortcuts = []
for (k in shortcutTable) {
    if (utools.isMacOs()) {
        if (k.includes('windows')) {
            continue
        }
    }
    else {
        if (k.includes('macos')) {
            continue
        }
    }
    shortcuts = shortcuts.concat(shortcutTable[k])
}
module.exports = shortcuts