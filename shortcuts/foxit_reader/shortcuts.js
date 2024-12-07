class ShortcutList {
    constructor() {
        this._name = 'foxit_reader'
        this._dir = __dirname
        this._shortcutData = [
            {
                "title": "阅读模式 Ctrl + H",
                "description": "阅读模式",
                "keyword": "reading mode yue du mo shi",
                "keys": ["h", "ctrl"]
            },
            {
                "title": "全屏 F11",
                "description": "全屏",
                "keyword": "full screen quan ping",
                "keys": ["f11"]
            },
            {
                "title": "放大 Ctrl + +",
                "description": "放大",
                "keyword": "enlarge fang da",
                "keys": ["+", "ctrl"]
            },
            {
                "title": "缩小 Ctrl + -",
                "description": "缩小",
                "keyword": "reduce suo xiao",
                "keys": ["-", "ctrl"]
            },
            {
                "title": "实际大小 Ctrl + 1",
                "description": "实际大小",
                "keyword": "actual size shi ji da xiao",
                "keys": ["1", "ctrl"]
            },
            {
                "title": "适合页面 Ctrl + 0",
                "description": "适合页面",
                "keyword": "fit page shi he ye mian",
                "keys": ["0", "ctrl"]
            },
            {
                "title": "适合宽度 Ctrl + 2",
                "description": "适合宽度",
                "keyword": "fit width shi he kuan du",
                "keys": ["2", "ctrl"]
            },
            {
                "title": "向右旋转 Ctrl + Shift + +",
                "description": "向右旋转",
                "keyword": "rotate right xiang you xuan zhuan",
                "keys": ["+", "ctrl", "shift"]
            },
            {
                "title": "打印 Ctrl + P",
                "description": "打印",
                "keyword": "print da yin",
                "keys": ["p", "ctrl"]
            },
            {
                "title": "标尺 Ctrl + R",
                "description": "标尺",
                "keyword": "ruler chi bi",
                "keys": ["r", "ctrl"]
            },
            {
                "title": "隐藏导航面板 F4",
                "description": "隐藏导航面板",
                "keyword": "hide navigation panel yin cang dao hang mian ban",
                "keys": ["f4"]
            },
            {
                "title": "手型工具 Alt + 3",
                "description": "点击或者拖拽着围绕文档平移",
                "keyword": "hand tool shou xing gong ju",
                "keys": ["3", "alt"]
            },
            {
                "title": "选择文本和图像 Alt + 6",
                "description": "选择文本和图像用于复制",
                "keyword": "select text and image xuan ze wen ben he tu xiang",
                "keys": ["6", "alt"]
            },
            {
                "title": "高亮 Shift + H",
                "description": "高亮文本",
                "keyword": "highlight gao liang",
                "keys": ["h", "shift"]
            },
            {
                "title": "波浪下划线 Shift + U",
                "description": "给文本添加锯齿形的下划线",
                "keyword": "wavy underline bo lang xia hua xian",
                "keys": ["u", "shift"]
            },
            {
                "title": "下划线 Ctrl + U",
                "description": "为文本添加下划线",
                "keyword": "underline xia hua xian",
                "keys": ["u", "ctrl"]
            },
            {
                "title": "删除线 Shift + S",
                "description": "穿过文本划一条线",
                "keyword": "strikethrough shan chu xian",
                "keys": ["s", "shift"]
            },
            {
                "title": "替换文本 Ctrl + Shift + R",
                "description": "删除选择的文本，并使用一个注释弹出框插入替代文本",
                "keyword": "replace text ti huan wen ben",
                "keys": ["r", "ctrl", "shift"]
            },
            {
                "title": "插入文本 Shift + I",
                "description": "使用一个注释弹出框插入替代文本",
                "keyword": "insert text cha ru wen ben",
                "keys": ["i", "shift"]
            },
            {
                "title": "备注 Ctrl + Shift + N",
                "description": "插入一个用于简洁说明的备注",
                "keyword": "note bi zhu",
                "keys": ["n", "ctrl", "shift"]
            },
            {
                "title": "打字机 Shift + T",
                "description": "添加一行文本",
                "keyword": "typewriter da zi ji",
                "keys": ["t", "shift"]
            },
            {
                "title": "文本框 Shift + E",
                "description": "创建一个文本框",
                "keyword": "text box wen ben kuang",
                "keys": ["e", "shift"]
            },
            {
                "title": "注释框 Shift + C",
                "description": "创建一个文本框；一次点击设定箭头位置，再次点击设定文本框位置",
                "keyword": "annotation box zhu shi kuang",
                "keys": ["c", "shift"]
            }
        ]
        console.log(`${this._dir}`)
    }

    get() {
        if (!utools.isWindows()) {
            return []
        }
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name}`
            sc['icon'] = `shortcuts/${this._name}/foxit.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()