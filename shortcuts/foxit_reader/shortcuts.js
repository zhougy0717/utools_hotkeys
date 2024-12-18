var ShortcutTemplate = require('../../shortcut_template.js')

class ShortcutList {
    constructor() {
        this._name = 'foxit_reader'
        this._appName = 'foxitpdfreader Foxit PDF Reader'
        this._dir = __dirname
        const template = new ShortcutTemplate('./shortcuts/obsidian/template.js')
        this._shortcutData = template.get()
    }

    get() {
        if (!utools.isWindows()) {
            return []
        }
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name} ${this._appName}`
            sc['icon'] = `shortcuts/${this._name}/foxit.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()