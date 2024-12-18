var ShortcutTemplate = require('../../shortcut_template.js')

class ShortcutList {
    constructor() {
        this._name = 'snipaste'
        this._appName = 'snipaste'
        this._dir = __dirname
        const template = new ShortcutTemplate(`./shortcuts/${this._name}/template.js`)
        this._shortcutData = template.get()
    }

    get() {
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name}`
            sc['icon'] = `shortcuts/${this._name}/snipaste.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()