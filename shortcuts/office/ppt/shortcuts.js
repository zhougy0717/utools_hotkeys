var ShortcutTemplate = require('../../../shortcut_template.js')

class ShortcutList {

    constructor() {
        this._name = 'ppt'
        this._dir = __dirname
        const template = new ShortcutTemplate('./shortcuts/office/ppt/template.js')
        this._shortcutData = template.get()
        console.log(`${this._dir}`)
    }

    get() {
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name}`
            sc['keyword'] += ' office ppt'
            sc['icon'] = `shortcuts/office/${this._name}/ppt.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()