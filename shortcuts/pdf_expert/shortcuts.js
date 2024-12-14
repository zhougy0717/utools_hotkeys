class ShortcutList {

    constructor() {
        this._name = 'pdf_expert'
        this._appName = 'pdf expert'
        this._dir = __dirname
        this._shortcutData = [
            {
                "title": "单页 Command + 1",
                "description": "单页",
                "keyword": "single page dan ye",
                "keys": ["1", "command"]
            },
            {
                "title": "双页 Command + 2",
                "description": "双页",
                "keyword": "double pages shuang ye",
                "keys": ["2", "command"]
            },
            {
                "title": "双页（首屏单页显示） Command + 3",
                "description": "双页（首屏单页显示）",
                "keyword": "double pages (first page single display) shuang ye (shou ping dan ye xian shi)",
                "keys": ["3", "command"]
            },
            {
                "title": "缩略图 Command + 4",
                "description": "缩略图",
                "keyword": "thumbnail suo lv tu",
                "keys": ["4", "command"]
            },
            {
                "title": "水平 command + 5",
                "description": "水平",
                "keyword": "horizontal shui ping",
                "keys": ["5", "command"]
            },
            {
                "title": "垂直 command + 6",
                "description": "垂直",
                "keyword": "vertical chui zhi",
                "keys": ["6", "command"]
            },
            {
                "title": "放大 command + +",
                "description": "放大",
                "keyword": "enlarge fang da",
                "keys": ["+", "command"]
            },
            {
                "title": "缩小 command + -",
                "description": "缩小",
                "keyword": "reduce suo xiao",
                "keys": ["-", "command"]
            },
            {
                "title": "缩放到 100% command + 0",
                "description": "缩放到 100%",
                "keyword": "zoom to 100% suo fang dao yi bai bai fen zhi yi bai",
                "keys": ["0", "command"]
            },
            {
                "title": "缩放至适应宽度 command + 9",
                "description": "缩放至适应宽度",
                "keyword": "zoom to fit width suo fang zhi shi ying kuan du",
                "keys": ["9", "command"]
            },
            {
                "title": "缩放至适应页面 command + 8",
                "description": "缩放至适应页面",
                "keyword": "zoom to fit page suo fang zhi shi ying ye mian",
                "keys": ["8", "command"]
            },
            {
                "title": "书签 Option + Command + 1",
                "description": "书签",
                "keyword": "bookmark shu qian",
                "keys": ["1", "command", "option"]
            },
            {
                "title": "大纲 Option + Command + 2",
                "description": "大纲",
                "keyword": "outline da gang",
                "keys": ["2", "command", "option"]
            },
            {
                "title": "批注摘要 Option + Command + 3",
                "description": "批注摘要",
                "keyword": "annotation summary pi zhu zhai yao",
                "keys": ["3", "command", "option"]
            },
            {
                "title": "缩略图面板 Option + Command + 4",
                "description": "缩略图面板",
                "keyword": "thumbnail panel suo lv tu mian ban",
                "keys": ["4", "command", "option"]
            },
            {
                "title": "隐藏左边面板 Option + Command + 0",
                "description": "隐藏左边面板",
                "keyword": "hide left panel yin cang zuo bian mian ban",
                "keys": ["0", "command", "option"]
            },
            {
                "title": "高亮 ctrl + command + H",
                "description": "高亮",
                "keyword": "highlight gao liang",
                "keys": ["h", "ctrl", "command"]
            },
            {
                "title": "下划线 ctrl + command + U",
                "description": "下划线",
                "keyword": "underline xia hua xian",
                "keys": ["u", "ctrl", "command"]
            },
            {
                "title": "删除线 ctrl + command + S",
                "description": "删除线",
                "keyword": "strikethrough shan chu xian",
                "keys": ["s", "ctrl", "command"]
            },
            {
                "title": "文本 ctrl + command + T",
                "description": "文本",
                "keyword": "text wen ben",
                "keys": ["t", "ctrl", "command"]
            },
            {
                "title": "笔 ctrl + command + P",
                "description": "笔",
                "keyword": "pen bi",
                "keys": ["p", "ctrl", "command"]
            },
            {
                "title": "橡皮擦 ctrl + command + E",
                "description": "橡皮擦",
                "keyword": "eraser xiang pi ca",
                "keys": ["e", "ctrl", "command"]
            },
            {
                "title": "笔记 ctrl + command + N",
                "description": "笔记",
                "keyword": "note bi ji",
                "keys": ["n", "ctrl", "command"]
            },
            {
                "title": "矩形 ctrl + command + R",
                "description": "矩形",
                "keyword": "rectangle ju xing",
                "keys": ["r", "ctrl", "command"]
            },
            {
                "title": "椭圆形 ctrl + command + O",
                "description": "椭圆形",
                "keyword": "oval tuo yuan xing",
                "keys": ["o", "ctrl", "command"]
            },
            {
                "title": "线条 ctrl + command + L",
                "description": "线条",
                "keyword": "line xian tiao",
                "keys": ["l", "ctrl", "command"]
            },
            {
                "title": "箭头 ctrl + command + A",
                "description": "箭头",
                "keyword": "arrow jian tou",
                "keys": ["a", "ctrl", "command"]
            },
            {
                "title": "双箭头 ctrl + command + D",
                "description": "双箭头",
                "keyword": "double arrow shuang jian tou",
                "keys": ["d", "ctrl", "command"]
            },
            {
                "title": "裁剪 ctrl + K",
                "description": "裁剪",
                "keyword": "crop caijian",
                "keys": ["k", "ctrl"]
            },
            {
                "title": "新建 Command + N",
                "description": "新建",
                "keyword": "new jian xin",
                "keys": ["n", "command"]
            },
            {
                "title": "新标签 Command + T",
                "description": "新标签",
                "keyword": "new tab xin biao qian",
                "keys": ["t", "command"]
            },
            {
                "title": "打开... Command + O",
                "description": "打开...",
                "keyword": "open...da kai",
                "keys": ["o", "command"]
            },
            {
                "title": "关闭窗口 Shift + Command + W",
                "description": "关闭窗口",
                "keyword": "close window guan bi chuang kou",
                "keys": ["w", "shift", "command"]
            },
            {
                "title": "关闭所有窗口 Option + Shift + Command + W",
                "description": "关闭所有窗口",
                "keyword": "close all windows guan bi suo you chuang kou",
                "keys": ["w", "option", "shift", "command"]
            },
            {
                "title": "关闭标签 Command + W",
                "description": "关闭标签",
                "keyword": "close tab guan bi biao qian",
                "keys": ["w", "command"]
            },
            {
                "title": "保存 Command + S",
                "description": "保存",
                "keyword": "save bao cun",
                "keys": ["s", "command"]
            },
            {
                "title": "另存为... Shift + Command + S",
                "description": "另存为...",
                "keyword": "save as...ling cun wei",
                "keys": ["s", "shift", "command"]
            },
            {
                "title": "属性 Command + I",
                "description": "属性",
                "keyword": "property shuxing",
                "keys": ["i", "command"]
            },
            {
                "title": "打印... Command + P",
                "description": "打印...",
                "keyword": "print...da yin",
                "keys": ["p", "command"]
            }
        ];
        console.log(`${this._dir}`)
    }

    get() {
        if (!utools.isMacOs()) {
            return []
        }
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name} ${this._appName}`
            sc['keyword'] += ' mac'
            sc['icon'] = `shortcuts/${this._name}/pdf_expert.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()