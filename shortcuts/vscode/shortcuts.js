var ShortcutTemplate = require('../../shortcut_template.js')

class ShortcutList {

    constructor() {
        this._name = 'vscode'
        this._appName = 'visual studio code'
        this._dir = __dirname
        const template = new ShortcutTemplate('./shortcuts/vscode/template.js')
        const common = template.get()
        if (!utools.isMacOs() && !utools.isWindows()) {
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
            sc['icon'] = `shortcuts/${this._name}/vscode.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()