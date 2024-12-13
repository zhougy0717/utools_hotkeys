let shortcuts = [
    {
        title: '代码格式化 {opt_or_alt} + shift + f',
        description: '格式化代码',
        keyword: '格式化 format visual studio code vscode',
        keys: ['f', 'shift', '{opt_or_alt}'],
        icon: 'icons/vscode.png'
    },
    {
        title: '格式化光标所在行 {cmd_or_ctrl} + k {cmd_or_ctrl} + f',
        description: '格式化光标所在行',
        keyword: '格式化 format 行 capture visual studio code vscode',
        keys: [['k', '{cmd_or_ctrl}'], ['f', '{cmd_or_ctrl}']],
        icon: 'icons/vscode.png'
    },
    {
        title: '缩进 {cmd_or_ctrl} + ]',
        description: '缩进',
        keyword: '格式化 缩进 indent visual studio code vscode',
        keys: [']', '{cmd_or_ctrl}'],
        icon: 'icons/vscode.png'
    },
    {
        title: '减少缩进 {cmd_or_ctrl} + [',
        description: '减少缩进',
        keyword: '格式化 缩进 indent visual studio code vscode',
        keys: ['[', '{cmd_or_ctrl}'],
        icon: 'icons/vscode.png'
    },
    {
        title: '注释代码块 {opt_or_alt} + shift + a',
        description: '注释代码块',
        keyword: '格式化 注释 块 visual studio code vscode',
        keys: ['a', '{opt_or_alt}', 'shift'],
        icon: 'icons/vscode.png'
    },
    {
        title: '光标跳转到对应的括号 {cmd_or_ctrl} + shift + \\',
        description: '光标跳转到对应的括号',
        keyword: '光标 跳转 括号 visual studio code vscode',
        keys: ['\\', '{cmd_or_ctrl}', 'shift'],
        icon: 'icons/vscode.png'
    },
    {
        title: '跳转到指定行 ctrl + g',
        description: '跳转到指定行',
        keyword: '光标 跳转 行 visual studio code vscode',
        keys: ['g', 'ctrl'],
        icon: 'icons/vscode.png'
    },
    {
        title: '显示当前文件函数列表 {cmd_or_ctrl} + shift + o',
        description: '显示当前文件函数列表',
        keyword: '光标 跳转 函数 visual studio code vscode',
        keys: ['o', '{cmd_or_ctrl}', 'shift'],
        icon: 'icons/vscode.png'
    },
    {
        title: '显示打开文件列表 ctrl + shift + tab',
        description: '显示打开文件列表',
        keyword: '打开文件 跳转 visual studio code vscode',
        keys: ['tab', 'ctrl', 'shift'],
        icon: 'icons/vscode.png'
    },
    {
        title: '跳转到最近打开的文件 ctrl + -',
        description: '跳转到最近打开的文件',
        keyword: '光标 跳转 文件 上一个 最近 visual studio code vscode',
        keys: ['-', 'ctrl'],
        icon: 'icons/vscode.png'
    },
    {
        title: '在finder中显示当前文件 {cmd_or_ctrl} + k r',
        description: '在finder中显示当前文件',
        keyword: 'finder 文件 visual studio code vscode',
        keys: [['k', '{cmd_or_ctrl}'], ['r']],
        icon: 'icons/vscode.png'
    },
    {
        title: '显示控制台 {cmd_or_ctrl} + shift + p',
        description: '显示控制台',
        keyword: '控制台 console visual studio code vscode',
        keys: ['p', '{cmd_or_ctrl}', 'shift'],
        icon: 'icons/vscode.png'
    },
    {
        title: '界面放大 {cmd_or_ctrl} + =',
        description: '界面放大',
        keyword: 'zoom in fangda visual studio code vscode',
        keys: ['=', '{cmd_or_ctrl}'],
        icon: 'icons/vscode.png'
    },
    {
        title: '界面缩小 {cmd_or_ctrl} + -',
        description: '界面缩小',
        keyword: 'zoom out suoxiao visual studio code vscode',
        keys: ['-', '{cmd_or_ctrl}'],
        icon: 'icons/vscode.png'
    },
    {
        title: '全部保存 {cmd_or_ctrl} + shift + s',
        description: '全部保存',
        keyword: 'quanbu baocun save all visual studio code vscode',
        keys: ['s', '{cmd_or_ctrl}', '{opt_or_alt}'],
        icon: 'icons/vscode.png'
    },
    {
        title: '自动换行 {opt_or_alt} + z',
        description: '自动换行',
        keyword: 'hh huanhang line wrapper visual studio code vscode',
        keys: ['z', '{opt_or_alt}'],
        icon: 'icons/vscode.png'
    },
    {
        title: '在浏览器中显示快捷键参考 {cmd_or_ctrl} + k {cmd_or_ctrl} + r',
        description: '在浏览器中显示快捷键参考',
        keyword: 'kuaijiejian shortcuts hotkeys kjj visual studio code vscode',
        keys: [['k', '{cmd_or_ctrl}'], ['r', '{cmd_or_ctrl}']],
        icon: 'icons/vscode.png'
    },
    {
        title: '在VSCode窗口显示和设置快捷键 {cmd_or_ctrl} + k {cmd_or_ctrl} + s',
        description: '在VSCode窗口显示和设置快捷键',
        keyword: 'kuaijiejian shortcuts hotkeys kjj chuangkou ck window visual studio code vscode',
        keys: [['k', '{cmd_or_ctrl}'], ['s', '{cmd_or_ctrl}']],
        icon: 'icons/vscode.png'
    },
    {
        title: 'reset {cmd_or_ctrl} + k {cmd_or_ctrl} + s',
        description: '在VSCode窗口显示和设置快捷键',
        keyword: 'reset shortcuts hotkeys kjj chuangkou ck window visual studio code vscode',
        keys: ['numpad 0', '{cmd_or_ctrl}'],
        icon: 'icons/vscode.png'
    }
]

module.exports = shortcuts