var ShortcutTemplate = require('../../shortcut_template.js')
class ShortcutList {

    constructor() {
        this._dir = __dirname
        const template = new ShortcutTemplate('./shortcuts/follow/template.js')
        this._shortcutData = template.get()
        console.log(`${this._dir}`)
    }

    get() {
        for (let sc of this._shortcutData) {
            sc['keyword'] += ' follow'
            if (utools.isWindows()) {
                sc['keyword'] += ' win'
            }
            else if (utools.isMacOs()) {
                sc['keyword'] += ' mac'
            }
            else {
                return []
            }
            sc['icon'] = `shortcuts/follow/icon.ico`
        }
        return this._shortcutData
    }

    name() {
        return 'follow'
    }
}

module.exports = new ShortcutList()