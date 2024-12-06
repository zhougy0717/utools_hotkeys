class ShortcutTemplate {
    constructor (file) {
        this._shortcutData = require('./shortcuts/follow/template.js')
        handleTemplate(this._shortcutData)
    }

    get() {
        return this._shortcutData
    }

    handleTemplate (arr) {
        arr.forEach(x => {
            for (key in x) {
                if (Array.isArray(x[key])) {
                    handleArr(x[key])
                }
                else {
                    x[key] = updatePlaceHolder(x[key])
                }
            }
        })
    }

    handleArr(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                handleArr(arr[i]);
            } else {
                let val = arr[i]
                arr[i] = updatePlaceHolder(val)
            }
        }
    }

    updatePlaceHolder (val) {
        let newVal = val
        if (val.includes('{cmd_or_ctrl}')) {
            if (utools.isMacOs()) {
                newVal = val.replace(/{cmd_or_ctrl}/g, 'command')
            }
            else if (utools.isWindows()) {
                newVal = val.replace(/{cmd_or_ctrl}/g, 'ctrl')
            }
        }
        val = newVal
        if (val.includes('{opt_or_alt}')) {
            if (utools.isMacOs()) {
                newVal = val.replace(/{opt_or_alt}/g, 'option')
            }
            else if (utools.isWindows()) {
                newVal = val.replace(/{opt_or_alt}/g, 'alt')
            }
        }
        return newVal
    }
}

module.exports = ShortcutTemplate
