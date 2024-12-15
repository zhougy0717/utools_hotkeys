class ShortcutList {

    constructor() {
        this._name = 'qspace'
        this._appName = 'qspace pro'
        this._dir = __dirname
        this._shortcutData = [
            {
                "title": "清倒废纸篓 command + shift + delete",
                "description": "清倒废纸篓",
                "keyword": "empty trash kongdao feizhilou",
                "keys": ["delete", "shift", "command"]
            },
            {
                "title": "隐藏QSpace command + H",
                "description": "隐藏QSpace",
                "keyword": "hide QSpace yincang QSpace",
                "keys": ["h", "command"]
            },
            {
                "title": "隐藏其他 command + option + H",
                "description": "隐藏其他",
                "keyword": "hide others yincang qita",
                "keys": ["h", "option", "command"]
            },
            {
                "title": "退出QSpace command + Q",
                "description": "退出QSpace",
                "keyword": "quit QSpace tuichu QSpace",
                "keys": ["q", "command"]
            },
            {
                "title": "新建文件夹 command + N",
                "description": "新建文件夹",
                "keyword": "new folder xinjian wenjianjia",
                "keys": ["n", "command"]
            },
            {
                "title": "用所选项目新建文件夹 option + command + N",
                "description": "用所选项目新建文件夹",
                "keyword": "new folder with selected item yongsuoxuanxiangmu xinjian wenjianjia",
                "keys": ["n", "option", "command"]
            },
            {
                "title": "打开 command + O",
                "description": "打开",
                "keyword": "open kaipi",
                "keys": ["o", "command"]
            },
            {
                "title": "关闭窗口 command + W",
                "description": "关闭窗口",
                "keyword": "close window guanbi chuangkou",
                "keys": ["w", "command"]
            },
            {
                "title": "全部关闭 option + command + W",
                "description": "全部关闭",
                "keyword": "close all guanbi quanbu",
                "keys": ["w", "option", "command"]
            },
            {
                "title": "关闭标签页 command + W",
                "description": "关闭标签页",
                "keyword": "close tab guanbi biaogeiye",
                "keys": ["w", "command"]
            },
            {
                "title": "关闭其他标签页 option + command + W",
                "description": "关闭其他标签页",
                "keyword": "close other tabs guanbi qita biaogeiye",
                "keys": ["w", "option", "command"]
            },
            {
                "title": "保存 command + S",
                "description": "保存",
                "keyword": "save baocun",
                "keys": ["s", "command"]
            },
            {
                "title": "在编辑器打开 option + command + S",
                "description": "在编辑器打开",
                "keyword": "open in editor zai bianjiqi daikai",
                "keys": ["s", "option", "command"]
            },
            {
                "title": "显示简介 command + I",
                "description": "显示简介",
                "keyword": "show info xianshi jianjie",
                "keys": ["i", "command"]
            },
            {
                "title": "打印 command + P",
                "description": "打印",
                "keyword": "print dayin",
                "keys": ["p", "command"]
            },
            {
                "title": "创建副本 command + D",
                "description": "创建副本",
                "keyword": "create duplicate chuangjian fuben",
                "keys": ["d", "command"]
            },
            {
                "title": "快速查看 space + Y",
                "description": "快速查看",
                "keyword": "quick look kuaisu chakan",
                "keys": ["y", "space"]
            },
            {
                "title": "移到废纸篓 command + delete",
                "description": "移到废纸篓",
                "keyword": "move to trash yi dao feizhilou",
                "keys": ["delete", "command"]
            },
            {
                "title": "撤销 command + Z",
                "description": "撤销",
                "keyword": "undo chexiao",
                "keys": ["z", "command"]
            },
            {
                "title": "重做 command + shift + Z",
                "description": "重做",
                "keyword": "redo chongzuo",
                "keys": ["z", "shift", "command"]
            },
            {
                "title": "剪切 command + X",
                "description": "剪切",
                "keyword": "cut qiejian",
                "keys": ["x", "command"]
            },
            {
                "title": "拷贝 command + C",
                "description": "拷贝",
                "keyword": "copy kaobei",
                "keys": ["c", "command"]
            },
            {
                "title": "粘贴 command + V",
                "description": "粘贴",
                "keyword": "paste zhantie",
                "keys": ["v", "command"]
            },
            {
                "title": "全选 command + A",
                "description": "全选",
                "keyword": "select all quanxuan",
                "keys": ["a", "command"]
            },
            {
                "title": "查找 command + F",
                "description": "查找",
                "keyword": "find zhaoxun",
                "keys": ["f", "command"]
            },
            {
                "title": "下载 option + command + L",
                "description": "下载",
                "keyword": "download xiazai",
                "keys": ["l", "option", "command"]
            },
            {
                "title": "个人 fn + E",
                "description": "个人",
                "keyword": "personal geren",
                "keys": ["e", "fn"]
            },
            {
                "title": "iCloud云盘 option + command + I",
                "description": "iCloud云盘",
                "keyword": "iCloud drive iCloud yunpan",
                "keys": ["i", "option", "command"]
            },
            {
                "title": "应用程序 Utilities option + command + U",
                "description": "应用程序Utilities",
                "keyword": "applications Utilities yingyongchengxu Utilities",
                "keys": ["u", "option", "command"]
            },
            {
                "title": "前往位置 option + command + L",
                "description": "前往位置",
                "keyword": "go to location qianwang weizhi",
                "keys": ["l", "option", "command"]
            },
            {
                "title": "显示为图标 fn + I",
                "description": "显示为图标",
                "keyword": "for icon wei tubiao",
                "keys": ["i", "fn"]
            },
            {
                "title": "显示为列表 fn + L",
                "description": "显示为列表",
                "keyword": "for list wei liebiao",
                "keys": ["l", "fn"]
            },
            {
                "title": "显示为分栏 fn + U",
                "description": "显示为分栏",
                "keyword": "for column wei fenlan",
                "keys": ["u", "fn"]
            },
            {
                "title": "显示工作区 shift + command + G",
                "description": "显示工作区",
                "keyword": "show workspace xianshi gongzuoqu",
                "keys": ["g", "shift", "command"]
            },
            {
                "title": "显示预览 option + command + P",
                "description": "显示预览",
                "keyword": "show preview xianshi yulan",
                "keys": ["p", "option", "command"]
            },
            {
                "title": "新建工作区 option + command + N",
                "description": "新建工作区",
                "keyword": "new workspace xinjian gongzuoqu",
                "keys": ["n", "option", "command"]
            },
            {
                "title": "新建工作区标签页 option + command + T",
                "description": "新建工作区标签页",
                "keyword": "new workspace tab xinjian gongzuoqu biaogeiye",
                "keys": ["t", "option", "command"]
            },
            {
                "title": "显示状态栏 option + command + /",
                "description": "显示状态栏",
                "keyword": "show status bar xianshi zhuangtailan",
                "keys": ["/", "option", "command"]
            },
            {
                "title": "最小化 command + M",
                "description": "最小化",
                "keyword": "minimize zui xiaohua",
                "keys": ["m", "command"]
            },
            {
                "title": "全部最小化 option + command + M",
                "description": "全部最小化",
                "keyword": "minimize all zui xiaohua quanbu",
                "keys": ["m", "option", "command"]
            },
            {
                "title": "填充 option + command + F",
                "description": "填充",
                "keyword": "fill tianchong",
                "keys": ["f", "option", "command"]
            },
            {
                "title": "居中 fn + C",
                "description": "居中",
                "keyword": "center ju zhong",
                "keys": ["c", "fn"]
            },
            {
                "title": "进入全屏 control + command + F",
                "description": "进入全屏",
                "keyword": "enter full - screen jinru quanping",
                "keys": ["f", "control", "command"]
            },
            {
                "title": "显示上一个标签页 control + command + ←",
                "description": "显示上一个标签页",
                "keyword": "show previous tab xianshi shangyige biaogeiye",
                "keys": ["left", "control", "command"]
            },
            {
                "title": "显示下一个标签页 control + command + →",
                "description": "显示下一个标签页",
                "keyword": "show next tab xianshi xiayige biaogeiye",
                "keys": ["right", "control", "command"]
            }
        ];
    }

    get() {
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name} ${this._appName}`
            sc['icon'] = `shortcuts/${this._name}/qspace.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()