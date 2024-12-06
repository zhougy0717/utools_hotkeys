var ShortcutTemplate = require('../../shortcut_template.js')
class ShortcutList {

    constructor() {
        this._dir = __dirname
        const template = new ShortcutTemplate('./template.js')
        this._shortcutData = template.get()
        console.log(`${this._dir}`)
    }

    get() {
        for (let sc of this._shortcutData) {
            sc['keyword'] += ' follow'
            sc['keyword'] += ' mac'
            sc['icon'] = `shortcuts/follow/icon.ico`
        }
        return this._shortcutData
    }

    name() {
        return 'follow'
    }
}

module.exports = new ShortcutList()