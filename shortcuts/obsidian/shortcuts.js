var ShortcutTemplate = require('../../shortcut_template.js')

class ShortcutList {

    constructor() {
        this._name = 'obsidian'
        this._appName = 'obsidian'
        this._dir = __dirname
        const template = new ShortcutTemplate('./shortcuts/obsidian/template.js')
        this._shortcutData = template.get()
        console.log(`${this._dir}`) 
    }

    get() {
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name} ${this._appName}`
            sc['icon'] = `shortcuts/${this._name}/obsidian.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()