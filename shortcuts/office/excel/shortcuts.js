var ShortcutTemplate = require('../../../shortcut_template.js')

class ShortcutList {

    constructor() {
        this._name = 'excel'
        this._appName = 'microsoft excel'
        this._dir = __dirname
        const template = new ShortcutTemplate('./shortcuts/office/excel/template.js')
        this._shortcutData = template.get()
        console.log(`${this._dir}`)
    }

    get() {
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name} ${this._appName}`
            sc['keyword'] += ' office excel'
            sc['icon'] = `shortcuts/office/${this._name}/excel.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()