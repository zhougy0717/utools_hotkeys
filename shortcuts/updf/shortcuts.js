class ShortcutList {
    constructor() {
        this._name = 'updf'
        this._dir = __dirname
        if (utools.isMacOs()) {
            this._shortcutData = require('./mac.js')
        }
        else if (utools.isWindows()) {
            this._shortcutData = require('./win.js')
        }
        else {
            this._shortcutData = []
        }
        console.log(`${this._dir}`)
    }

    get() {
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name}`
            sc['keyword'] += ' win'
            sc['icon'] = `shortcuts/${this._name}/updf.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()