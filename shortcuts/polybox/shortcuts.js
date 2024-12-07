class ShortcutList {

    constructor() {
        this._name = 'polybox'
        this._dir = __dirname
        this._shortcutData = [
            // 窗口类热键
            {
                title: '打开polybox Option + Q',
                description: '打开polybox',
                keyword: 'polybox chrome sousuo',
                keys: ['q', 'option']
            }
        ];
        if (!utools.isMacOs()) {
            this._shortcutData[0]['keys'][1] = "alt";
        }
        console.log(`${this._dir}`)
    }

    get() {
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name}`
            sc['icon'] = `shortcuts/${this._name}/polybox.jpg`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()