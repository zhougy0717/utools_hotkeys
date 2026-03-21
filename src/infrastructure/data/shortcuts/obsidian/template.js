let shortcuts = [
    {
        title: '当前行变为checklist {cmd_or_ctrl} + l',
        description: '注意是字母l。在行首添加 - [ ]，如果已经是checklist，则会执行toggle动作。',
        keyword: 'checklist todo',
        keys: ['l', '{cmd_or_ctrl}'],
    },
    {
        title: '添加注释 {cmd_or_ctrl} + /',
        description: '添加注释, 即%% %%',
        keyword: 'comment 注释',
        keys: ['/', '{cmd_or_ctrl}'],
    },
    {
        title: '插入markdown链接 {cmd_or_ctrl} + k',
        description: '插入[](), 非[[]]',
        keyword: 'markdown link 链接',
        keys: ['k', '{cmd_or_ctrl}'],
    },
    {
        title: '切换到第一个tab {cmd_or_ctrl} + 1',
        description: '切换到第一个tab',
        keyword: '切换 tab 111',
        keys: ['1', '{cmd_or_ctrl}'],
    },
    {
        title: '切换到第一个tab {cmd_or_ctrl} + 2',
        description: '切换到第二个tab',
        keyword: '切换 tab 222',
        keys: ['2', '{cmd_or_ctrl}'],
    },
    {
        title: '切换到第一个tab {cmd_or_ctrl} + 3',
        description: '切换到第三个tab',
        keyword: '切换 tab 333',
        keys: ['3', '{cmd_or_ctrl}'],
    },
    {
        title: '切换到第一个tab {cmd_or_ctrl} + 4',
        description: '切换到第四个tab',
        keyword: '切换 tab 444',
        keys: ['4', '{cmd_or_ctrl}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '切换到第一个tab {cmd_or_ctrl} + 5',
        description: '切换到第五个tab',
        keyword: '切换 tab 555',
        keys: ['5', '{cmd_or_ctrl}'],
    },
    {
        title: '显示笔记列表 {cmd_or_ctrl} + o',
        description: '显示笔记列表',
        keyword: 'list 列表 open',
        keys: ['o', '{cmd_or_ctrl}'],
    },
    {
        title: '后退 {cmd_or_ctrl} + {opt_or_alt} + ⬅',
        description: '后退',
        keyword: '后退 back',
        keys: ['left', '{cmd_or_ctrl}', '{opt_or_alt}'],
    },
    {
        title: '前进 {cmd_or_ctrl} + {opt_or_alt} + ⮕',
        description: '前进',
        keyword: '前进 forward',
        keys: ['right', '{cmd_or_ctrl}', '{opt_or_alt}'],
    },
    {
        title: '打开设置 {cmd_or_ctrl} + ,',
        description: '打开设置',
        keyword: '设置 setting config',
        keys: [',', '{cmd_or_ctrl}'],
    },
    {
        title: '预览文件 {cmd_or_ctrl}',
        description: '把光标放在文件管理器的某个文件上，弹出浮动窗口显示这个文件的内容。记住按住{cmd_or_ctrl}键',
        keyword: 'preview 预览',
        keys: ['{cmd_or_ctrl}'],
    },
    {
        title: '删除当前段落 {cmd_or_ctrl} + d',
        description: '删除当前段落',
        keyword: 'delete 删除段落',
        keys: ['d', '{cmd_or_ctrl}'],
    },
    {
        title: '加粗 {cmd_or_ctrl} + b',
        description: '设置粗体',
        keyword: '加粗 粗体',
        keys: ['b', '{cmd_or_ctrl}'],
    },
    {
        title: '斜体 {cmd_or_ctrl} + i',
        description: '设置斜体',
        keyword: '斜体',
        keys: ['i', '{cmd_or_ctrl}'],
    },
    {
        title: '当前文件查找并替换 {cmd_or_ctrl} + {opt_or_alt} + f',
        description: '当前文件查找并替换',
        keyword: 'find replace 查找替换',
        keys: ['f', '{cmd_or_ctrl}', '{opt_or_alt}'],
    },
    {
        title: '重新打开上一个被关闭的 tab {cmd_or_ctrl} + shift + t',
        description: '重新打开上一个被关闭的 tab',
        keyword: 'open closed tab last',
        keys: ['t', '{cmd_or_ctrl}', 'shift'],
    },
    {
        title: '搜索库内文件 {cmd_or_ctrl} + o',
        description: '搜索库内文件',
        keyword: 'sousuo search open',
        keys: ['o', '{cmd_or_ctrl}'],
    },
    {
        title: '插入链接 {cmd_or_ctrl} + k',
        description: '插入链接',
        keyword: 'insert link charu lianjie',
        keys: ['k', '{cmd_or_ctrl}'],
    },
    {
        title: '打开光标处链接 {opt_or_alt} + enter',
        description: '打开光标处链接',
        keyword: 'open cursor link dakai lianjie',
        keys: ['enter', '{opt_or_alt}'],
    },
    {
        title: '在新标签中打开光标处链接 {cmd_or_ctrl} + enter',
        description: '在新标签中打开光标处链接',
        keyword: 'open cursor link in new tab dakai lianjie xin biaoqian',
        keys: ['enter', '{cmd_or_ctrl}'],
    },
    {
        "title": "在新窗口中打开光标处链接 {cmd_or_ctrl} + {opt_or_alt} + shift + enter",
        "description": "在新窗口中打开光标处链接",
        "keyword": "open link at cursor position in new window zai xin chuang kou zhong da kai guang biao chu lian jie",
        "keys": ["enter", "{cmd_or_ctrl}", "{opt_or_alt}", "shift"]
    },
    {
        "title": "在新面板中打开光标处链接 {cmd_or_ctrl} + {opt_or_alt} + enter",
        "description": "在新面板中打开光标处链接",
        "keyword": "open link at cursor position in new panel zai xin mian ban zhong da kai guang biao chu lian jie",
        "keys": ["enter", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "在右侧创建笔记 {cmd_or_ctrl} + shift + N",
        "description": "在右侧创建笔记",
        "keyword": "create note on the right zai you ce chuang jian bi ji",
        "keys": ["n", "{cmd_or_ctrl}", "shift"]
    },
    {
        "title": "增加文档属性 {cmd_or_ctrl} + ;",
        "description": "增加文档属性",
        "keyword": "add document properties zeng jia wen dang shu xing",
        "keys": [";", "{cmd_or_ctrl}"]
    },
    {
        title: '关系图谱 {opt_or_alt} + enter',
        description: '查看关系图谱',
        keyword: 'view the relationship diagram chakan guanxi tupu',
        keys: ['enter', '{opt_or_alt}'],
    },
    {
        title: '重新打开标签页 {cmd_or_ctrl} + shift + T',
        description: '重新打开标签页',
        keyword: 'reopen tab chongxin daikai biaoqian',
        keys: ['t', 'shift', '{cmd_or_ctrl}'],
    },
    {
        "title": "Templater: 从模板创建新笔记 {opt_or_alt} + N",
        "description": "Templater: 从模板创建新笔记",
        "keyword": "templater: create new note from template cong mo ban chuang jian xin bi ji",
        "keys": ["n", "{opt_or_alt}"]
    },
    {
        "title": "Templater: 跳转到下一个光标位置 {opt_or_alt} + Tab",
        "description": "Templater: 跳转到下一个光标位置",
        "keyword": "templater: jump to next cursor location tiao zhuan dao xia yi ge guang biao wei zhi",
        "keys": ["tab", "{opt_or_alt}"]
    },
    {
        "title": "Templater: 打开插入模板模式 {opt_or_alt} + E",
        "description": "Templater: 打开插入模板模式",
        "keyword": "templater: open Insert Template modal da kai cha ru mo ban mo shi",
        "keys": ["e", "{opt_or_alt}"]
    },
    {
        "title": "Templater: 替换活动文件中的模板 {opt_or_alt} + R",
        "description": "Templater: 替换活动文件中的模板",
        "keyword": "templater: replace templates in the active file ti huan huo dong wen jian zhong de mo ban",
        "keys": ["r", "{opt_or_alt}"]
    }
]

module.exports = shortcuts