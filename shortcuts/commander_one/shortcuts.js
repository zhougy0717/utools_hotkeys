class ShortcutList {

    constructor() {
        this._name = 'commander_one'
        this._appName = 'commander one pro'
        this._dir = __dirname
        this._shortcutData = [
            {
                "title": "偏好设置 command + ,",
                "description": "偏好设置",
                "keyword": "preference pianhao shezhi",
                "keys": [",", "command"]
            },
            {
                "title": "隐藏Commander One专业版 command + H",
                "description": "隐藏Commander One专业版",
                "keyword": "hide Commander One zhuan ye ban yincang Commander One zhuan ye ban",
                "keys": ["h", "command"]
            },
            {
                "title": "隐藏其他 command + option + H",
                "description": "隐藏其他",
                "keyword": "hide others yincang qita",
                "keys": ["h", "option", "command"]
            },
            {
                "title": "退出Commander One专业版 command + Q",
                "description": "退出Commander One专业版",
                "keyword": "quit Commander One zhuan ye ban tuichu Commander One zhuan ye ban",
                "keys": ["q", "command"]
            },
            {
                "title": "新建窗口 command + N",
                "description": "新建窗口",
                "keyword": "new window xinjian chuangkou",
                "keys": ["n", "command"]
            },
            {
                "title": "新文件 shift + F4",
                "description": "新文件",
                "keyword": "new file xinwen jian",
                "keys": ["f4", "shift"]
            },
            {
                "title": "新文件夹 F7",
                "description": "新文件夹",
                "keyword": "new folder directory xin wenjianjia",
                "keys": ["f7"]
            },
            {
                "title": "创建符号链接 command + L",
                "description": "创建符号链接",
                "keyword": "make alias link zhizuo tishen lianjie",
                "keys": ["l", "command"]
            },
            {
                "title": "重复 command + D",
                "description": "重复",
                "keyword": "repeat chongfu",
                "keys": ["d", "command"]
            },
            {
                "title": "前往文件夹 command + shift + G",
                "description": "前往文件夹",
                "keyword": "go to folder qianwang wenjianjia",
                "keys": ["g", "shift", "command"]
            },
            {
                "title": "显示简介 command + I",
                "description": "显示简介",
                "keyword": "show info xianshi jianjie",
                "keys": ["i", "command"]
            },
            {
                "title": "编辑 F4",
                "description": "编辑",
                "keyword": "edit bianji",
                "keys": ["f4"]
            },
            {
                "title": "复制 F5",
                "description": "复制",
                "keyword": "copy kaobei",
                "keys": ["f5"]
            },
            {
                "title": "复制路径 ctrl + command + C",
                "description": "复制路径",
                "keyword": "copy kaobei path lujing",
                "keys": ["c", "ctrl", "command"]
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
                "title": "查找 option + F7",
                "description": "查找",
                "keyword": "find search chazhao sousuo",
                "keys": ["f7", "option"]
            },
            {
                "title": "在Spotlight中搜索 ctrl + option + F7",
                "description": "查找",
                "keyword": "find spotlight search chazhao sousuo",
                "keys": ["f7", "ctrl", "option"]
            },
            {
                "title": "获取Finder信息 command + I",
                "description": "获取Finder信息",
                "keyword": "get Finder info huoqu Finder xinxi",
                "keys": ["i", "command"]
            },
            {
                "title": "快速查看 command + Y",
                "description": "快速查看",
                "keyword": "quick look kuaisu chakan",
                "keys": ["y", "command"]
            },
            {
                "title": "在Finder中显示 command + option + O",
                "description": "在Finder中显示",
                "keyword": "show in Finder zai Finder zhong xianshi",
                "keys": ["o", "command", "option"]
            },
            {
                "title": "连接服务器 command + K",
                "description": "连接服务器",
                "keyword": "connect server lianjie fuwuqi",
                "keys": ["k", "command"]
            },
            {
                "title": "连接网盘 command + F",
                "description": "连接网盘",
                "keyword": "connect netdisk lianjie wangpan",
                "keys": ["f", "command"]
            },
            {
                "title": "查看 F3",
                "description": "查看",
                "keyword": "preview yulan chakan",
                "keys": ["f3"]
            },
            {
                "title": "移动 F6",
                "description": "移动",
                "keyword": "move yi dong",
                "keys": ["f6"]
            },
            {
                "title": "重命名 shift + F6",
                "description": "重命名",
                "keyword": "rename chongmingming",
                "keys": ["f6", "shift"]
            },
            {
                "title": "删除 F8",
                "description": "删除",
                "keyword": "delete shanchu",
                "keys": ["f8"]
            },
            {
                "title": "永久删除 command + option + delete",
                "description": "永久删除",
                "keyword": "permanently delete yongjiu shanchu",
                "keys": ["delete", "option", "command"]
            },
            {
                "title": "压缩 ctrl + F5",
                "description": "压缩",
                "keyword": "compress yasuo",
                "keys": ["f5", "ctrl"]
            },
            {
                "title": "解压缩 ctrl + F9",
                "description": "解压缩",
                "keyword": "decompress jieyasuo",
                "keys": ["f9", "ctrl"]
            },
            {
                "title": "新建标签 command + T",
                "description": "新建标签",
                "keyword": "new tab xinjian biaogei",
                "keys": ["t", "command"]
            },
            {
                "title": "重复当前标签 command + shift + T",
                "description": "重复当前标签",
                "keyword": "repeat current tab chongfu dangqian biaogei",
                "keys": ["t", "shift", "command"]
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
                "title": "标签排序方式 option + command + 1",
                "description": "标签排序方式",
                "keyword": "tab sorting method biaogei paixu fangshi",
                "keys": ["1", "option", "command"]
            },
            {
                "title": "标签大小 option + command + 3",
                "description": "标签大小",
                "keyword": "tab size biaogei daxiao",
                "keys": ["3", "option", "command"]
            },
            {
                "title": "修改日期 option + command + 4",
                "description": "修改日期",
                "keyword": "modified date xiugai riqi",
                "keys": ["4", "option", "command"]
            },
            {
                "title": "创建日期 option + command + 5",
                "description": "创建日期",
                "keyword": "creation date chuangjian riqi",
                "keys": ["5", "option", "command"]
            },
            {
                "title": "添加日期 option + command + 6",
                "description": "添加日期",
                "keyword": "add date tianjia riqi",
                "keys": ["6", "option", "command"]
            },
            {
                "title": "最后访问日期 option + command + 7",
                "description": "最后访问日期",
                "keyword": "last accessed date zuihou fangwen riqi",
                "keys": ["7", "option", "command"]
            },
            {
                "title": "权限 option + command + 9",
                "description": "权限",
                "keyword": "permission quanxian",
                "keys": ["9", "option", "command"]
            },
            {
                "title": "升序 option + command + D",
                "description": "升序",
                "keyword": "ascending order shengxu",
                "keys": ["d", "option", "command"]
            },
            {
                "title": "降序 option + command + shift + D",
                "description": "降序",
                "keyword": "descending order jiangxu",
                "keys": ["d", "shift", "option", "command"]
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
                "title": "为图标 fn + I",
                "description": "为图标",
                "keyword": "for icon wei tubiao",
                "keys": ["i", "fn"]
            },
            {
                "title": "为列表 fn + L",
                "description": "为列表",
                "keyword": "for list wei liebiao",
                "keys": ["l", "fn"]
            },
            {
                "title": "为分栏 fn + U",
                "description": "为分栏",
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
                "title": "进入全屏 ctrl + command + F",
                "description": "进入全屏",
                "keyword": "enter full - screen jinru quanping",
                "keys": ["f", "ctrl", "command"]
            },
            {
                "title": "显示上一个标签页 ctrl + command + ←",
                "description": "显示上一个标签页",
                "keyword": "show previous tab xianshi shangyige biaogeiye",
                "keys": ["left", "ctrl", "command"]
            },
            {
                "title": "显示下一个标签页 ctrl + command + →",
                "description": "显示下一个标签页",
                "keyword": "show next tab xianshi xiayige biaogeiye",
                "keys": ["right", "ctrl", "command"]
            },
            {
                "title": "源和目标交换 option + shift + E",
                "description": "源和目标交换",
                "keyword": "exchange jiaohuan",
                "keys": ["e", "option", "shift"]
            },
            {
                "title": "源和目标显示相同窗口 option + E",
                "description": "源和目标显示相同窗口",
                "keyword": "same xiangtong",
                "keys": ["e", "option"]
            },
            {
                "title": "显示所有标签页 shift + command + \\",
                "description": "显示所有标签页",
                "keyword": "all tab show xianshi suoyou biaoqian",
                "keys": ["\\", "command", "shift"]
            },
            {
                "title": "后退 command + [",
                "description": "后退",
                "keyword": "go back hou tui",
                "keys": ["[", "command"]
            },
            {
                "title": "前进 command + ]",
                "description": "前进",
                "keyword": "go forward qian jin",
                "keys": ["]", "command"]
            },
            {
                "title": "上层文件夹 command + ↑",
                "description": "上层文件夹",
                "keyword": "parent folder shang ceng wen jian jia",
                "keys": ["command", "uparrow"]
            },
            {
                "title": "主文件夹 command + shift + H",
                "description": "主文件夹",
                "keyword": "home folder zhu wen jian jia",
                "keys": ["h", "shift", "command"]
            },
            {
                "title": "桌面 command + shift + D",
                "description": "桌面",
                "keyword": "desktop zhuo mian",
                "keys": ["d", "shift", "command"]
            },
            {
                "title": "文稿 command + shift + O",
                "description": "文稿",
                "keyword": "document wen gao",
                "keys": ["o", "shift", "command"]
            },
            {
                "title": "下载 command + shift + L",
                "description": "下载",
                "keyword": "download xia zai",
                "keys": ["l", "shift", "command"]
            },
            {
                "title": "应用程序 command + shift + A",
                "description": "应用程序",
                "keyword": "applications ying yong cheng xu",
                "keys": ["a", "shift", "command"]
            },
            {
                "title": "实用工具 command + shift + U",
                "description": "实用工具",
                "keyword": "utilities shi yong gong ju",
                "keys": ["u", "shift", "command"]
            }
        ];
    }

    get() {
        if (!utools.isMacOs()) {
            return []
        }
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name} ${this._appName}`
            sc['icon'] = `shortcuts/${this._name}/commander_one.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()