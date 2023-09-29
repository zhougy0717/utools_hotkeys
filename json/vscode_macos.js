let shortcuts = [
    {
        title: '代码格式化 option + shift + f',
        description: '格式化代码',
        keyword: 'macos 格式化 format vscode visual studio',
        keys: ['f', 'shift', 'option'],
        icon: 'icons/vscode.png'
    },
    {
        title: '格式化光标所在行 cmd + k cmd + f',
        description: '格式化光标所在行',
        keyword: 'macos 格式化 format 行 capture vscode',
        keys: [['k', 'command'], ['f', 'command']],
        icon: 'icons/vscode.png'
    },
    {
        title: '缩进 cmd + ]',
        description: '缩进',
        keyword: 'macos 格式化 缩进 indent vscode',
        keys: [']', 'command'],
        icon: 'icons/vscode.png'
    },
    {
        title: '减少缩进 cmd + [',
        description: '减少缩进',
        keyword: 'macos 格式化 缩进 indent vscode',
        keys: ['[', 'command'],
        icon: 'icons/vscode.png'
    },
    {
        title: '注释代码块 option + shift + a',
        description: '注释代码块',
        keyword: 'macos 格式化 注释 块 vscode',
        keys: ['a', 'option', 'shift'],
        icon: 'icons/vscode.png'
    },
    {
        title: '光标跳转到对应的括号 cmd + shift + \\',
        description: '光标跳转到对应的括号',
        keyword: 'macos 光标 跳转 括号 vscode',
        keys: ['\\', 'command', 'shift'],
        icon: 'icons/vscode.png'
    },
    {
        title: '跳转到指定行 ctrl + g',
        description: '跳转到指定行',
        keyword: 'macos 光标 跳转 行 vscode',
        keys: ['g', 'ctrl'],
        icon: 'icons/vscode.png'
    },
    {
        title: '显示当前文件函数列表 cmd + shift + o',
        description: '显示当前文件函数列表',
        keyword: 'macos 光标 跳转 函数 vscode',
        keys: ['o', 'command', 'shift'],
        icon: 'icons/vscode.png'
    },
    {
        title: '显示打开文件列表 ctrl + shift + tab',
        description: '显示打开文件列表',
        keyword: 'macos 打开文件 跳转 vscode',
        keys: ['tab', 'ctrl', 'shift'],
        icon: 'icons/vscode.png'
    },
    {
        title: '跳转到最近打开的文件 ctrl + -',
        description: '跳转到最近打开的文件',
        keyword: 'macos 光标 跳转 文件 上一个 最近 vscode',
        keys: ['-', 'ctrl'],
        icon: 'icons/vscode.png'
    },
    {
        title: '在finder中显示当前文件 cmd + k r',
        description: '在finder中显示当前文件',
        keyword: 'macos finder 文件 vscode',
        keys: [['k', 'command'], ['r']],
        icon: 'icons/vscode.png'
    },
    {
        title: '显示控制台 cmd + shift + p',
        description: '显示控制台',
        keyword: 'macos 控制台 console vscode',
        keys: ['p', 'command', 'shift'],
        icon: 'icons/vscode.png'
    },
    {
        title: '界面放大 cmd + =',
        description: '界面放大',
        keyword: 'macos zoom in fangda vscode',
        keys: ['=', 'command'],
        icon: 'icons/vscode.png'
    },
    {
        title: '界面缩小 cmd + -',
        description: '界面缩小',
        keyword: 'macos zoom out suoxiao vscode',
        keys: ['-', 'command'],
        icon: 'icons/vscode.png'
    },
    {
        title: '全部保存 cmd + shift + s',
        description: '全部保存',
        keyword: 'macos quanbu baocun save all vscode',
        keys: ['s', 'command', 'option'],
        icon: 'icons/vscode.png'
    },
    {
        title: '自动换行 option + z',
        description: '自动换行',
        keyword: 'macos hh huanhang line wrapper vscode',
        keys: ['z', 'option'],
        icon: 'icons/vscode.png'
    },
    {
        title: '在浏览器中显示快捷键参考 cmd + k cmd + r',
        description: '在浏览器中显示快捷键参考',
        keyword: 'macos kuaijiejian shortcuts hotkeys kjj vscode',
        keys: [['k', 'command'], ['r', 'command']],
        icon: 'icons/vscode.png'
    },
    {
        title: '在VSCode窗口显示和设置快捷键 cmd + k cmd + s',
        description: '在VSCode窗口显示和设置快捷键',
        keyword: 'macos kuaijiejian shortcuts hotkeys kjj chuangkou ck window vscode',
        keys: [['k', 'command'], ['s', 'command']],
        icon: 'icons/vscode.png'
    },
    {
        title: 'reset cmd + k cmd + s',
        description: '在VSCode窗口显示和设置快捷键',
        keyword: 'macos reset shortcuts hotkeys kjj chuangkou ck window vscode',
        keys: ['numpad 0', 'command'],
        icon: 'icons/vscode.png'
    }
]

module.exports = shortcuts