let shortcuts = [
    {
        title: '当前行变为checklist {cmd_or_ctrl} + l',
        description: '注意是字母l。在行首添加 - [ ]，如果已经是checklist，则会执行toggle动作。',
        keyword: 'macos obsidian checklist todo',
        keys: ['l', '{cmd_or_ctrl}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '添加注释 {cmd_or_ctrl} + /',
        description: '添加注释, 即%% %%',
        keyword: 'macos obsidian comment 注释',
        keys: ['/', '{cmd_or_ctrl}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '插入markdown链接 {cmd_or_ctrl} + k',
        description: '插入[](), 非[[]]',
        keyword: 'macos obsidian markdown link 链接',
        keys: ['k', '{cmd_or_ctrl}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '切换到第一个tab {cmd_or_ctrl} + 1',
        description: '切换到第一个tab',
        keyword: 'macos obsidian 切换 tab 111',
        keys: ['1', '{cmd_or_ctrl}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '切换到第一个tab {cmd_or_ctrl} + 2',
        description: '切换到第二个tab',
        keyword: 'macos obsidian 切换 tab 222',
        keys: ['2', '{cmd_or_ctrl}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '切换到第一个tab {cmd_or_ctrl} + 3',
        description: '切换到第三个tab',
        keyword: 'macos obsidian 切换 tab 333',
        keys: ['3', '{cmd_or_ctrl}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '切换到第一个tab {cmd_or_ctrl} + 4',
        description: '切换到第四个tab',
        keyword: 'macos obsidian 切换 tab 444',
        keys: ['4', '{cmd_or_ctrl}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '切换到第一个tab {cmd_or_ctrl} + 5',
        description: '切换到第五个tab',
        keyword: 'macos obsidian 切换 tab 555',
        keys: ['5', '{cmd_or_ctrl}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '显示笔记列表 {cmd_or_ctrl} + o',
        description: '显示笔记列表',
        keyword: 'macos obsidian list 列表 open',
        keys: ['o', '{cmd_or_ctrl}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '后退 {cmd_or_ctrl} + {opt_or_alt} + ⬅',
        description: '后退',
        keyword: 'macos obsidian 后退 back',
        keys: ['left', '{cmd_or_ctrl}', '{opt_or_alt}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '前进 {cmd_or_ctrl} + {opt_or_alt} + ⮕',
        description: '前进',
        keyword: 'macos obsidian 前进 forward',
        keys: ['right', '{cmd_or_ctrl}', '{opt_or_alt}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '打开设置 {cmd_or_ctrl} + ,',
        description: '打开设置',
        keyword: 'macos obsidian 设置 setting config',
        keys: [',', '{cmd_or_ctrl}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '预览文件 {cmd_or_ctrl}',
        description: '把光标放在文件管理器的某个文件上，弹出浮动窗口显示这个文件的内容。记住按住{cmd_or_ctrl}键',
        keyword: 'macos obsidian preview 预览',
        keys: ['{cmd_or_ctrl}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '删除当前段落 {cmd_or_ctrl} + d',
        description: '删除当前段落',
        keyword: 'macos obsidian delete 删除段落',
        keys: ['d', '{cmd_or_ctrl}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '加粗 {cmd_or_ctrl} + b',
        description: '设置粗体',
        keyword: 'macos obsidian 加粗 粗体',
        keys: ['b', '{cmd_or_ctrl}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '斜体 {cmd_or_ctrl} + i',
        description: '设置斜体',
        keyword: 'macos obsidian 斜体',
        keys: ['i', '{cmd_or_ctrl}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '当前文件查找并替换 {cmd_or_ctrl} + {opt_or_alt} + f',
        description: '当前文件查找并替换',
        keyword: 'macos obsidian find replace 查找替换',
        keys: ['f', '{cmd_or_ctrl}', '{opt_or_alt}'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '重新打开上一个被关闭的 tab {cmd_or_ctrl} + shift + t',
        description: '重新打开上一个被关闭的 tab',
        keyword: 'macos obsidian open closed tab last',
        keys: ['t', '{cmd_or_ctrl}', 'shift'],
        icon: 'icons/obsidian.png'
    },
    {
        title: '搜索库内文件 {cmd_or_ctrl} + o',
        description: '搜索库内文件',
        keyword: 'macos obsidian sousuo search open',
        keys: ['o', '{cmd_or_ctrl}'],
        icon: 'icons/obsidian.png'
    }
]

module.exports = shortcuts