class ShortcutList {

    constructor() {
        this._name = 'directory_opus'
        this._shortName = 'dopus'
        this._dir = __dirname
        this._shortcutData = [
            // 窗口类热键
            {
                title: '内联重命名 F2',
                description: '内联重命名',
                keyword: 'rename cmm',
                keys: ['f2']
            },
            {
                title: '搜索 F3',
                description: '搜索',
                keyword: 'search sousuo',
                keys: ['f3']
            },
            {
                title: 'Everything（局部） -',
                description: '使用Everything搜索本目录',
                keyword: 'search sousuo everything local current',
                keys: ['-']
            },
            {
                title: 'Everything（全局） -',
                description: '使用Everything搜索全局',
                keyword: 'search sousuo everything global',
                keys: ['=', "shift"]
            },
            {
                title: '输入路径 ctrl + L',
                description: '输入路径',
                keyword: 'path lujing lj',
                keys: ['l', 'ctrl']
            },
            {
                title: '刷新 F5',
                description: '刷新',
                keyword: 'refresh shuaxin sx',
                keys: ['f5']
            },
            {
                title: '双栏 F6',
                description: '双栏',
                keyword: 'split panel shuanglan sl',
                keys: ['f6']
            },
            {
                title: '打开查看器窗格 F7',
                description: '打开查看器窗格',
                keyword: 'preview chakan ck',
                keys: ['f7']
            },
            {
                title: '打开文件夹树 F8',
                description: '左侧导航窗格',
                keyword: 'nav wenjianjia tree shu',
                keys: ['f8']
            },
            {
                title: '查看元数据 F9',
                description: '右侧元数据窗格',
                keyword: 'meta property yuanshuju',
                keys: ['f9']
            },
            {
                title: '折叠选定项 -',
                description: '在文件夹树中折叠选定目录',
                keyword: 'fold zhedie zd',
                keys: ['-']
            },
            {
                title: "opus查找 '",
                description: '使用opus查找',
                keyword: 'opus search',
                keys: ["'"]
            },
            {
                title: '输入路径 shift + enter',
                description: '输入路径',
                keyword: 'path lj',
                keys: ['shift', 'enter']
            },
            {
                title: '搜索标签页 shift + 2',
                description: '搜索标签页',
                keyword: 'tab search biaoqian',
                keys: ['2', 'shift']
            },
            {
                title: '范围 shift + 3',
                description: '搜索时指定范围（不知道有什么用）',
                keyword: 'scope search fanwei fw',
                keys: ['3', 'shift']
            },
            {
                title: '过滤器栏 shift + 8',
                description: '打开过滤器栏，过滤当前目录',
                keyword: 'filter search guolvqi gl',
                keys: ['8', 'shift']
            },
            {
                title: '展开所有选项 shift + 8',
                description: '文件夹树导航窗格中展开所有目录',
                keyword: 'unfold tree zhankai zk',
                keys: ['8', 'shift']
            },
            {
                title: '重复上次查找 shift + f3',
                description: '重复上次查找',
                keyword: 'search last cz chazhao',
                keys: ['f3', 'shift']
            },
            {
                title: '双文件夹树 shift + F8',
                description: '在右侧再打开一个文件夹树',
                keyword: 'nav tree wenjianjia double shuang',
                keys: ['f8', 'shift']
            },
            {
                title: '刷新缩略图 ctrl + f5',
                description: '刷新缩略图',
                keyword: 'refresh thumbnail shuaxin slt',
                keys: ['f5', 'shift']
            },
            {
                title: '上一个标签 ctrl + pgdown',
                description: '上一个标签',
                keyword: 'last tab shangyige bq',
                keys: ['pagedown', 'ctrl']
            },
            {
                title: '下一个标签 ctrl + pgup',
                description: '下一个标签',
                keyword: 'next tab xiayige bq',
                keys: ['pageup', 'ctrl']
            },
            {
                title: '放大 ctrl + shift + ➡',
                description: '下一个标签',
                keyword: 'next tab xiayige bq',
                keys: ['right', 'shift', 'ctrl']
            },
            {
                title: '选择 shift + ;',
                description: '打开选择窗格，过滤当前目录并选择条目',
                keyword: 'select xuanze xz',
                keys: [';', 'shift']
            },
            {
                title: '展开选定项目 +',
                description: '文件夹树中，展开选定的目录',
                keyword: 'unfold tree zhankai',
                keys: ['+']
            },
            {
                title: '重置缩放 ctrl + 0',
                description: '重置缩放',
                keyword: 'reset zoom chongzhi suofang cz',
                keys: ['0', 'ctrl']
            },
            {
                title: '复制文件 ctrl + 1',
                description: '复制文件到对面窗格',
                keyword: 'copy fuzhi kaobei fz kb',
                keys: ['1', 'ctrl']
            },
            {
                title: '移动文件 ctrl + 2',
                description: '移动文件到对面窗格',
                keyword: 'move yidong mv yd',
                keys: ['2', 'ctrl']
            },
            {
                title: '重命名 ctrl + 3',
                description: '重命名',
                keyword: 'rename chongmingming cmm',
                keys: ['3', 'ctrl']
            },
            {
                title: '压缩文件 ctrl + 4',
                description: '压缩文件',
                keyword: 'zip yasuo ys',
                keys: ['4', 'ctrl']
            },
            {
                title: '全选 ctrl + A',
                description: '全选',
                keyword: 'all qx',
                keys: ['a', 'ctrl']
            },
            {
                title: '属性和时间 ctrl + B',
                description: '更改文件属性和时间',
                keyword: 'property time shuxing shijian sx sj',
                keys: ['b', 'ctrl']
            },
            {
                title: '添加到收藏栏 ctrl + D',
                description: '添加到收藏栏',
                keyword: 'stare shoucang sc',
                keys: ['d', 'ctrl']
            },
            {
                title: '打开新窗格 ctrl + E',
                description: '打开新的Directory Opus窗口',
                keyword: 'new window xin chuangkou',
                keys: ['e', 'ctrl']
            },
            {
                title: '查找文件 ctrl + F',
                description: '查找文件',
                keyword: 'find search chazhao',
                keys: ['f', 'ctrl']
            },
            {
                title: '新建压缩文件 ctrl + H',
                description: '新建压缩文件',
                keyword: 'zip yasuo',
                keys: ['h', 'ctrl']
            },
            {
                title: '反向选择 ctrl + I',
                description: '反向选择',
                keyword: 'select reverse fanxiang xuanze',
                keys: ['i', 'ctrl']
            },
            {
                title: '计算文件夹大小 ctrl + K',
                description: '计算文件夹大小',
                keyword: 'calc size jisuan',
                keys: ['k', 'ctrl']
            },
            {
                title: '编辑元数据 ctrl + M',
                description: '编辑元数据',
                keyword: 'meta edit bianji',
                keys: ['m', 'ctrl']
            },
            {
                title: '新建文件夹 ctrl + N',
                description: '新建文件夹',
                keyword: 'new dir folder wenjianjia',
                keys: ['n', 'ctrl']
            },
            {
                title: '新建文本文档 ctrl + O',
                description: '新建文本文档',
                keyword: 'new text wenben wb',
                keys: ['o', 'ctrl']
            },
            {
                title: '输入描述数据 ctrl + P',
                description: '输入描述数据',
                keyword: 'desc miaoshu',
                keys: ['p', 'ctrl']
            },
            {
                title: 'FTP链接 ctrl + Q',
                description: 'FTP链接',
                keyword: 'ftp',
                keys: ['q', 'ctrl']
            },
            {
                title: '条件选择 ctrl + S',
                description: '条件选择',
                keyword: 'conditional tiaojian select',
                keys: ['s', 'ctrl']
            },
            {
                title: '为当前文件夹新建标签页 ctrl + T',
                description: '为当前文件夹新建标签页',
                keyword: 'new tab biaoqian',
                keys: ['t', 'ctrl']
            },
            {
                title: '查找重复文件 ctrl + U',
                description: '查找重复文件',
                keyword: 'duplicate file chongfu',
                keys: ['u', 'ctrl']
            },
            {
                title: '关闭标签页 ctrl + W',
                description: '关闭标签页',
                keyword: 'close tab guan',
                keys: ['w', 'ctrl']
            },
            {
                title: '同步 ctrl + Y',
                description: '同步',
                keyword: 'sync tongbu',
                keys: ['y', 'ctrl']
            },
            {
                title: '撤销 ctrl + Z',
                description: '撤销',
                keyword: 'undo chexiao',
                keys: ['z', 'ctrl']
            },
            {
                title: '自动调整属性栏宽度 ctrl + +',
                description: '自动调整属性栏宽度',
                keyword: 'auto set width zidong kuandu',
                keys: ['+', 'ctrl']
            },
            {
                title: '放大 ctrl + =',
                description: '放大',
                keyword: 'zoom in fangda',
                keys: ['=', 'ctrl']
            },
            {
                title: '缩小 ctrl + -',
                description: '缩小',
                keyword: 'zoom out suoxiao small',
                keys: ['-', 'ctrl']
            },
            {
                title: '前一标签页（目标） ctrl + shift + PageUp',
                description: '前一标签页（目标）',
                keyword: 'last tab qian',
                keys: ['pageup', 'shift', 'ctrl']
            },
            {
                title: '后一标签页（目标） ctrl + shift + PageDown',
                description: '后一标签页（目标）',
                keyword: 'next tab hou',
                keys: ['pagedown', 'shift', 'ctrl']
            },
            {
                title: '复制为 ctrl + shift + 1',
                description: '复制为',
                keyword: 'copy as fuzhi kaobei',
                keys: ['1', 'shift', 'ctrl']
            },
            {
                title: '移动为 ctrl + shift + 2',
                description: '移动为',
                keyword: 'move as yidong',
                keys: ['2', 'shift', 'ctrl']
            },
            {
                title: '添加到不同的压缩文件 ctrl + shift + 4',
                description: '添加到不同的压缩文件',
                keyword: 'add zip tianjia yasuo',
                keys: ['4', 'shift', 'ctrl']
            },
            {
                title: '恢复过滤器 ctrl + shift + 8',
                description: '恢复过滤器',
                keyword: 'reset filter huifu guolv',
                keys: ['8', 'shift', 'ctrl']
            },
            {
                title: '管理员 ctrl + shift + A',
                description: '管理员',
                keyword: 'admin guanliyuan',
                keys: ['a', 'shift', 'ctrl']
            },
            {
                title: '收藏栏 ctrl + shift + B',
                description: '收藏栏',
                keyword: 'fav shoucang',
                keys: ['b', 'shift', 'ctrl']
            },
            {
                title: '复制完整路径 ctrl + shift + C',
                description: '复制完整路径',
                keyword: 'copy path lujing kaobei',
                keys: ['c', 'shift', 'ctrl']
            },
            {
                title: '详情 ctrl + shift + D',
                description: '详情',
                keyword: 'detail xiangqing',
                keys: ['d', 'shift', 'ctrl']
            },
            {
                title: '详细信息+缩略图 ctrl + shift + H',
                description: '详细信息+缩略图',
                keyword: 'detail thumb xiangxi suolue',
                keys: ['h', 'shift', 'ctrl']
            },
            {
                title: '缩略图 ctrl + shift + M',
                description: '缩略图',
                keyword: 'thumb suoluetu',
                keys: ['m', 'shift', 'ctrl']
            },
            {
                title: '复制文件名称 ctrl + shift + N',
                description: '复制文件名称',
                keyword: 'copy file name kaobei wenjianming',
                keys: ['n', 'shift', 'ctrl']
            },
            {
                title: '编辑站点列表 ctrl + shift + Q',
                description: '编辑站点列表',
                keyword: 'edit site list',
                keys: ['q', 'shift', 'ctrl']
            },
            {
                title: '取消关闭标签 ctrl + shift + W',
                description: '取消关闭标签',
                keyword: 'cancel close tab quxiao guanbi biaoqian',
                keys: ['w', 'shift', 'ctrl']
            },
            {
                title: '属性 alt + enter',
                description: '属性',
                keyword: 'property shuxing',
                keys: ['enter', 'alt']
            },
            {
                title: '主页 alt + home',
                description: '主页',
                keyword: 'home zhuye',
                keys: ['home', 'alt']
            },
            {
                title: '返回 alt + ⬅',
                description: '返回',
                keyword: 'back fanhui',
                keys: ['left', 'alt']
            },
            {
                title: '折叠文件夹 alt + ⬆',
                description: '折叠文件夹',
                keyword: 'fold dir zhedie',
                keys: ['up', 'alt']
            },
            {
                title: '前进 alt + ➡',
                description: '前进',
                keyword: 'forward qianjin',
                keys: ['up', 'alt']
            },
            {
                title: '展开文件夹 alt + ⬇',
                description: '展开文件夹',
                keyword: 'unfold dir folder zhankai',
                keys: ['down', 'alt']
            },
            {
                title: '关闭窗口 alt + F4',
                description: '关闭窗口',
                keyword: 'close window guanbi chuangkou',
                keys: ['f4', 'alt']
            },
            {
                title: 'DOS命令 shift + /',
                description: 'DOS命令',
                keyword: 'dos cmd mingling',
                keys: ['/', 'shift']
            },
            {
                title: '命令 shift + .',
                description: '命令',
                keyword: 'cmd mingling',
                keys: ['.', 'shift']
            },
            {
                title: 'WSL命令 shift + \\',
                description: 'WSL命令',
                keyword: 'wsl cmd mingling',
                keys: ['\\', 'shift']
            },
            // 系统范围热键
            {
                title: '新建窗口 win + shift + E',
                description: '新建窗口',
                keyword: 'new window xin chuangkou',
                keys: ['e', 'shift', "meta"]
            }
            // 查看器热键
            // 略
        ];
        console.log(`${this._dir}`)
    }

    get() {
        if (!utools.isWindows()) {
            return []
        }
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._shortName}`
            sc['keyword'] += ' win'
            sc['icon'] = `shortcuts/${this._name}/icon.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()