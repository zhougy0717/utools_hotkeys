let shortcuts = [
    {
        title: '全屏截图 cmd + shift + 3',
        description: '直接截取整个屏幕，并保存成文件，默认存放在桌面',
        keyword: 'macos system 全屏截图 jietu capture',
        keys: ['3', 'command', 'shift'],
        icon: 'icons/macos.png'
    },
    {
        title: '区域截图 cmd + shift + 4',
        description: '截取屏幕选取，并保存成文件，默认存放在桌面',
        keyword: 'macos system 区域截图 jietu capture',
        keys: ['4', 'command', 'shift'],
        icon: 'icons/macos.png'
    },
    {
        title: '屏幕捕获工具 cmd + shift + 5',
        description: '开启自带屏幕捕获工具，可以截取或录制屏幕',
        keyword: 'macos system 屏幕捕获工具 录制屏幕 jietu capture',
        keys: ['5', 'command', 'shift'],
        icon: 'icons/macos.png'
    },
    {
        title: '撤销 cmd + z',
        description: '撤销',
        keyword: 'macos system revert chexiao',
        keys: ['z', 'command'],
        icon: 'icons/macos.png'
    },
    {
        title: '重做 cmd + shift + z',
        description: '重做',
        keyword: 'macos system redo chongzuo revert',
        keys: ['z', 'command', 'shift'],
        icon: 'icons/macos.png'
    },
    {
        title: '强制退出App cmd + shift + esc',
        description: '强制退出App, 另一种方法是cmd + q',
        keyword: 'macos system force qiangzhi quit tuichu',
        keys: ['esc', 'command', 'shift'],
        icon: 'icons/macos.png'
    },
    {
        title: '显示字符检视器 cmd + ctrl + space',
        description: '显示字符检视器，你可以从中选取表情符号和其他符号',
        keyword: 'macos system emoji 特殊字符 teshu zifu',
        keys: ['space', 'command', 'ctrl'],
        icon: 'icons/macos.png'
    },
    {
        title: '创建文件夹 cmd + shift + n',
        description: '在访达中创建一个新文件夹',
        keyword: 'macos system finder mulu 目录 wenjianjia create',
        keys: ['n', 'command', 'shift'],
        icon: 'icons/macos.png'
    },
    {
        title: '打印 cmd + p',
        description: '打印',
        keyword: 'macos system print dayin',
        keys: ['p', 'command'],
        icon: 'icons/macos.png'
    },
    {
        title: '打开任务管理器 cmd + option + esc',
        description: '打开任务管理器，无法自动触发，需要手动按下对应的按键',
        keyword: 'macos system renwu guanli task manager',
        keys: ['esc', 'command', 'option'],
        icon: 'icons/macos.png'
    },
    {
        title: '强制退出App cmd + q',
        description: '强制退出App',
        keyword: 'macos system force qiangzhi quit tuichu',
        keys: ['q', 'command'],
        icon: 'icons/macos.png'
    },
    {
        title: '锁定屏幕 cmd + ctrl + q',
        description: '锁定屏幕',
        keyword: 'macos system lock suoding pingmu',
        keys: ['q', 'command', 'ctrl'],
        icon: 'icons/macos.png'
    },
    {
        title: '显示隐藏文件 cmd + shift + .',
        description: '显示隐藏文件',
        keyword: 'macos system hide yincang wenjian',
        keys: ['.', 'command', 'shift'],
        icon: 'icons/macos.png'
    },
    {
        title: 'App全屏 cmd + ctrl + f',
        description: '如果App支持，全屏显示该App',
        keyword: 'macos system quanping',
        keys: ['f', 'command', 'ctrl'],
        icon: 'icons/macos.png'
    },
    {
        title: '显示调度中心 ctrl + ⬆',
        description: '显示调度中心',
        keyword: 'macos system diaoduzhongxin schedule',
        keys: ['up', 'ctrl'],
        icon: 'icons/macos.png'
    },
    {
        title: '显示当前应用窗口 ctrl + ⬇',
        description: '显示当前应用窗口',
        keyword: 'macos system dangqianchuangkou current focus window',
        keys: ['down', 'ctrl'],
        icon: 'icons/macos.png'
    },
    {
        title: '带样式拷贝 cmd + option + c',
        description: '带样式拷贝',
        keyword: 'macos system yangshi style copy kaobei',
        keys: ['c', 'command', 'option'],
        icon: 'icons/macos.png'
    },
    {
        title: '带样式粘贴 cmd + option + v',
        description: '带样式粘贴',
        keyword: 'macos system yangshi style paste zhantie niantie',
        keys: ['v', 'command', 'option'],
        icon: 'icons/macos.png'
    },
    {
        title: '直接强制退出当前软件 cmd + option + shift + esc',
        description: '直接强制退出当前软件, 效果等同于cmd + q, 更野蛮',
        keyword: 'macos system force quit qiangzhi tuichu',
        keys: ['esc', 'command', 'option', 'shift'],
        icon: 'icons/macos.png'
    },
    {
        title: '隐藏当前软件 cmd + h',
        description: '隐藏当前软件',
        keyword: 'macos system yincang hide',
        keys: ['h', 'command'],
        icon: 'icons/macos.png'
    },
    {
        title: '光标移动到全部文本开头 cmd + ⬆',
        description: '光标移动到全部文本开头',
        keyword: 'macos system guangbiao cursor begin start',
        keys: ['up', 'command'],
        icon: 'icons/macos.png'
    },
    {
        title: '光标移动到全部文本结尾 cmd + ⬇',
        description: '光标移动到全部文本结尾',
        keyword: 'macos system guangbiao cursor end',
        keys: ['down', 'command'],
        icon: 'icons/macos.png'
    },
    {
        title: '光标移动到当前行结尾 cmd + ⮕',
        description: '光标移动到当前行结尾',
        keyword: 'macos system guangbiao cursor line end',
        keys: ['right', 'command'],
        icon: 'icons/macos.png'
    },
    {
        title: '光标移动到当前行开头 cmd + ⬅',
        description: '光标移动到当前行开头',
        keyword: 'macos system guangbiao cursor line start',
        keys: ['left', 'command'],
        icon: 'icons/macos.png'
    },
    {
        title: '光标移动到当前段落开头 ctrl + a',
        description: '光标移动到当前段落开头',
        keyword: 'macos system duanluo kaitou begin start block',
        keys: ['a', 'ctrl'],
        icon: 'icons/macos.png'
    },
    {
        title: '光标移动到当前段落结尾 ctrl + e',
        description: '光标移动到当前段落结尾',
        keyword: 'macos system duanluo jiewei end block',
        keys: ['e', 'ctrl'],
        icon: 'icons/macos.png'
    },
    {
        title: '光标移动到当前单词的开头 option + ⬅',
        description: '光标移动到当前单词的开头',
        keyword: 'macos system danci kaitou begin start word',
        keys: ['left', 'option'],
        icon: 'icons/macos.png'
    },
    {
        title: '光标移动到当前单词的结尾 option + ⮕',
        description: '光标移动到当前单词的结尾',
        keyword: 'macos system danci jiewei end word',
        keys: ['right', 'option'],
        icon: 'icons/macos.png'
    },
    {
        title: 'Finder中复制文件夹路径 cmd + option + c',
        description: 'Finder中复制文件夹路径',
        keyword: 'macos system lujing path fuzhi copy',
        keys: ['c', 'command', 'option'],
        icon: 'icons/macos.png'
    },
    {
        title: '显示简介 cmd + i',
        description: '显示简介',
        keyword: 'macos system jianjie info finder',
        keys: ['i', 'command'],
        icon: 'icons/macos.png'
    },
    {
        title: '前往文件夹 cmd + shift + g',
        description: '前往文件夹',
        keyword: 'macos system qianwang wenjianjia folder cd directory finder',
        keys: ['g', 'command', 'shift'],
        icon: 'icons/macos.png'
    },
    {
        title: '复制所选文件 cmd + d',
        description: '复制所选文件',
        keyword: 'macos system fuzhi copy selected finder',
        keys: ['d', 'command'],
        icon: 'icons/macos.png'
    },
    {
        title: '将所选项移入废纸篓 cmd + backspace',
        description: '复制所选文件',
        keyword: 'macos system feizhilou dustbin shanchu delete finder',
        keys: ['backspace', 'command'],
        icon: 'icons/macos.png'
    },
    {
        title: '清倒废纸篓 cmd + shift + backspace',
        description: '清倒废纸篓',
        keyword: 'macos system feizhilou dustbin qingdao delete all finder',
        keys: ['backspace', 'command', 'shift'],
        icon: 'icons/macos.png'
    }
]
module.exports = shortcuts