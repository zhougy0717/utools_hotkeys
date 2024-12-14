var ShortcutTemplate = require('../../../shortcut_template.js')

class ShortcutList {

    constructor() {
        this._name = 'word'
        this._appName = ''
        if (utools.isMacOs()) {
            this._appName = 'microsoft word'
        }
        else if (utools.isWindows()) {
            this._appName = 'winword'
        }
        this._dir = __dirname
        const template = new ShortcutTemplate('./shortcuts/office/word/template.js')
        this._shortcutData = template.get()
        console.log(`${this._dir}`)
    }

    get() {
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name}`
            sc['keyword'] += ' office word'
            sc['icon'] = `shortcuts/office/${this._name}/word.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()