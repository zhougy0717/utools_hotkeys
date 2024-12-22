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
                "title": "新建文件夹 shift + command + N",
                "description": "新建文件夹",
                "keyword": "new folder xinjian wenjianjia",
                "keys": ["n", "command", "shift"]
            },
            {
                "title": "用所选项目新建文件夹 ctrl + command + N",
                "description": "用所选项目新建文件夹",
                "keyword": "new folder with selected item yongsuoxuanxiangmu xinjian wenjianjia",
                "keys": ["n", "ctrl", "command"]
            },
            {
                "title": "打开 command + O",
                "description": "打开",
                "keyword": "open kaipi",
                "keys": ["o", "command"]
            },
            {
                "title": "关闭窗口 shift + command + W",
                "description": "关闭窗口",
                "keyword": "close window guanbi chuangkou",
                "keys": ["w", "command", "shift"]
            },
            {
                "title": "关闭标签页 command + W",
                "description": "关闭标签页",
                "keyword": "close tab guanbi biaogeiye",
                "keys": ["w", "command"]
            },
            {
                "title": "保存 command + S",
                "description": "保存",
                "keyword": "save baocun",
                "keys": ["s", "command"]
            },
            {
                "title": "在编辑器打开 command + D",
                "description": "在编辑器打开",
                "keyword": "open in editor zai bianjiqi daikai",
                "keys": ["e", "command"]
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
                "title": "快速查看 command + Y",
                "description": "快速查看",
                "keyword": "quick look kuaisu chakan",
                "keys": ["y", "command"]
            },
            {
                "title": "移到废纸篓 command + backspace",
                "description": "移到废纸篓",
                "keyword": "move to trash yi dao feizhilou",
                "keys": ["backspace", "command"]
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
                "title": "个人 shift + command + H",
                "description": "个人",
                "keyword": "personal geren",
                "keys": ["h", "shift", "command"]
            },
            {
                "title": "iCloud云盘 shift + command + I",
                "description": "iCloud云盘",
                "keyword": "iCloud drive iCloud yunpan",
                "keys": ["i", "shift", "command"]
            },
            {
                "title": "应用程序 Utilities shift + command + A",
                "description": "应用程序Utilities",
                "keyword": "applications Utilities yingyongchengxu Utilities",
                "keys": ["a", "shift", "command"]
            },
            {
                "title": "前往位置 command + L",
                "description": "前往位置",
                "keyword": "go to location qianwang weizhi",
                "keys": ["l", "command"]
            },
            {
                "title": "显示为图标 command + 1",
                "description": "显示为图标",
                "keyword": "for icon wei tubiao",
                "keys": ["1", "command"]
            },
            {
                "title": "显示为列表 command + 2",
                "description": "显示为列表",
                "keyword": "for list wei liebiao",
                "keys": ["2", "command"]
            },
            {
                "title": "显示为分栏 command + 3",
                "description": "显示为分栏",
                "keyword": "for column wei fenlan",
                "keys": ["3", "command"]
            },
            {
                "title": "显示预览 shift + command + P",
                "description": "显示预览",
                "keyword": "show preview xianshi yulan",
                "keys": ["p", "shift", "command"]
            },
            {
                "title": "显示工作区 option + command + G",
                "description": "显示工作区",
                "keyword": "show workspace xianshi gongzuoqu",
                "keys": ["g", "option", "command"]
            },
            {
                "title": "显示预览 option + command + P",
                "description": "显示预览",
                "keyword": "show preview xianshi yulan",
                "keys": ["p", "option", "command"]
            },
            {
                "title": "新建工作区 command + N",
                "description": "新建工作区",
                "keyword": "new workspace xinjian gongzuoqu",
                "keys": ["n", "command"]
            },
            {
                "title": "新建工作区标签页 command + T",
                "description": "新建工作区标签页",
                "keyword": "new workspace tab xinjian gongzuoqu biaogeiye",
                "keys": ["t", "command"]
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
                "title": "进入全屏 ctrl + command + F",
                "description": "进入全屏",
                "keyword": "enter full - screen jinru quanping",
                "keys": ["f", "ctrl", "command"]
            },
            {
                "title": "显示上一个标签页 ctrl + shift + tab",
                "description": "显示上一个标签页",
                "keyword": "show previous tab xianshi shangyige biaogeiye",
                "keys": ["tab", "ctrl", "shift"]
            },
            {
                "title": "显示下一个标签页 ctrl + tab",
                "description": "显示下一个标签页",
                "keyword": "show next tab xianshi xiayige biaogeiye",
                "keys": ["tab", "ctrl"]
            },
            {
                "title": "隐藏左侧栏 command + option + S",
                "description": "隐藏左侧栏",
                "keyword": "hide left sidebar yin cang zuo ce lan",
                "keys": ["s", "option", "command"]
            },
            {
                "title": "显示所有标签页 shift + command + \\",
                "description": "显示所有标签页",
                "keyword": "show all tabs xian shi suo you biao qian ye",
                "keys": ["\\", "command", "shift"]
            },
            {
                "title": "隐藏标签页栏 command + shift + T",
                "description": "隐藏标签页栏",
                "keyword": "hide tabs sidebar yin cang biao qian ye lan",
                "keys": ["t", "shift", "command"]
            },
            {
                "title": "显示状态栏 command + /",
                "description": "显示状态栏",
                "keyword": "show status bar xian shi zhuang tai lan",
                "keys": ["/", "command"]
            },
            {
                "title": "查看显示选项 command + J",
                "description": "查看显示选项",
                "keyword": "view display options cha kan xian shi xuan xiang",
                "keys": ["j", "command"]
            },
            {
                "title": "进入全屏 ctrl + command + F",
                "description": "进入全屏",
                "keyword": "enter full - screen jin ru quan ping",
                "keys": ["f", "command", "ctrl"]
            },
            {
                "title": "返回 command + [",
                "description": "返回",
                "keyword": "return fan hui",
                "keys": ["[", "command"]
            },
            {
                "title": "前进 command + ]",
                "description": "前进",
                "keyword": "forward qian jin",
                "keys": ["]", "command"]
            },
            {
                "title": "上层文件夹 command + ↑",
                "description": "上层文件夹",
                "keyword": "parent folder shang ceng wen jian jia",
                "keys": ["up", "command"]
            },
            {
                "title": "文稿 command + shift + O",
                "description": "文稿",
                "keyword": "document wen gao",
                "keys": ["o", "shift", "command"]
            },
            {
                "title": "桌面 command + shift + D",
                "description": "桌面",
                "keyword": "desktop zhuo mian",
                "keys": ["d", "shift", "command"]
            }
        ];
    }

    get() {
        if (!utools.isMacOs()) {
            return []
        }
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