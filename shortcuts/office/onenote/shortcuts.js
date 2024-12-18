var ShortcutTemplate = require('../../../shortcut_template.js')

class ShortcutList {

    constructor() {
        this._name = 'onenote'
        this._appName = 'microsoft onenote'
        this._dir = __dirname
        const template = new ShortcutTemplate('./shortcuts/office/onenote/template.js')
        const common = template.get()
        if (!utools.isWindows() && !utools.isMacOs()) {
            this._shortcutData = []
        }
        else {
            if (utools.isWindows()) {
                this._shortcutData = require('./win.js')
            }
            else {
                this._shortcutData = require('./mac.js')
            }
            this._shortcutData = this._shortcutData.concat(common)
        }
    }

    get() {
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name} ${this._appName}`
            sc['keyword'] += ' office'
            sc['icon'] = `shortcuts/office/${this._name}/onenote.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()