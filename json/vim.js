let shortcuts = [
    {
        title: '(LazyVim)向左切换窗口：ctrl + h',
        description: '(LazyVim)向左切换窗口，等同于标准Vim的C-w + ⬅',
        keyword: 'lazyvim qiehuan chuangkou switch left zuo',
        keys: ['h', 'ctrl'],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)向下切换窗口：ctrl + j',
        description: '(LazyVim)向下切换窗口，等同于标准Vim的C-w + ⬇',
        keyword: 'lazyvim qiehuan chuangkou switch down xia',
        keys: ['hj', 'ctrl'],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)向上切换窗口：ctrl + k',
        description: '(LazyVim)向上切换窗口，等同于标准Vim的C-w + ⬆',
        keyword: 'lazyvim qiehuan chuangkou switch up shang',
        keys: ['k', 'ctrl'],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)向右切换窗口：ctrl + l',
        description: '(LazyVim)向下切换窗口，等同于标准Vim的C-w + ➡',
        keyword: 'lazyvim qiehuan chuangkou switch right you',
        keys: ['l', 'ctrl'],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)增加窗口高度：ctrl + ⬆',
        description: '(LazyVim)增加窗口高度',
        keyword: 'lazyvim zengjia gaodu chuangkou height increase',
        keys: ['up', 'ctrl'],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)减少窗口高度：ctrl + ⬇',
        description: '(LazyVim)减少窗口高度',
        keyword: 'lazyvim jianshao gaodu chuangkou height decrease',
        keys: ['down', 'ctrl'],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)减少窗口宽度：ctrl + ⬅',
        description: '(LazyVim)减少窗口宽度',
        keyword: 'lazyvim jianshao kuandu chuangkou width decrease',
        keys: ['left', 'ctrl'],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)增加窗口宽度：ctrl + ➡',
        description: '(LazyVim)增加窗口宽度',
        keyword: 'lazyvim zengjia kuandu chuangkou width increase',
        keys: ['down', 'ctrl'],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)上一个buffer：[ + b',
        description: '(LazyVim)上一个buffer',
        keyword: 'lazyvim shangyige buffer prev',
        keys: [['['], ['b']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)下一个buffer：] + b',
        description: '(LazyVim)下一个buffer',
        keyword: 'lazyvim xiayige buffer next',
        keys: [[']'], ['b']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)选择buffer：<leader> + ,',
        description: '(LazyVim)选择buffer',
        keyword: 'lazyvim xuanze buffer list choose select',
        keys: [['space'], [',']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)在buffer间跳转：<leader> + `',
        description: '(LazyVim)在buffer间跳转',
        keyword: 'lazyvim jump buffer tiaozhuan',
        keys: [['space'], ['`']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)搜索LazyVim快捷键：<leader> + sk',
        description: '(LazyVim)搜索LazyVim快捷键',
        keyword: 'lazyvim keymap list sousuo kuaijiejian',
        keys: [['space'], ['s'], ['k']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)在根目录下显示终端：<leader> + sk',
        description: '(LazyVim)搜索LazyVim快捷键',
        keyword: 'lazyvim keymap list sousuo kuaijiejian',
        keys: [['space'], ['s'], ['k']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)切换行号：<leader> + ul',
        description: '(LazyVim)切换行号',
        keyword: 'lazyvim qiehuan hanghao toggle line number',
        keys: [['space'], ['u'], ['l']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)切换相对行号：<leader> + uL',
        description: '(LazyVim)切换相对行号',
        keyword: 'lazyvim qiehuan xiangdui hanghao toggle relative line number',
        keys: [['space'], ['u'], ['L']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)切换自动换行：<leader> + uw',
        description: '(LazyVim)切换自动换行',
        keyword: 'lazyvim qiehuan zidong huanhang word wrap',
        keys: [['space'], ['u'], ['w']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)全局切换自动格式化：<leader> + uf',
        description: '(LazyVim)全局切换自动格式化',
        keyword: 'lazyvim quanju qiehuan zidong geshihua auto format global',
        keys: [['space'], ['u'], ['f']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)本文件切换自动格式化：<leader> + uF',
        description: '(LazyVim)本文件切换自动格式化',
        keyword: 'lazyvim bendi qiehuan zidong geshihua auto format buffer',
        keys: [['space'], ['u'], ['F']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)(LSP)LSP Info：<leader> + cl',
        description: '(LazyVim)(LSP)LSP Info',
        keyword: 'lazyvim lsp info',
        keys: [['space'], ['c'], ['l']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)(LSP)跳转到定义：gd',
        description: '(LazyVim)(LSP)跳转到定义',
        keyword: 'lazyvim lsp jump definition tiaozhuan dingyi',
        keys: [['g'], ['d']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)(LSP)跳转到引用：gr',
        description: '(LazyVim)(LSP)跳转到引用',
        keyword: 'lazyvim lsp jump reference tiaozhuan yinyong',
        keys: [['g'], ['r']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)(LSP)跳转到声明：gD',
        description: '(LazyVim)(LSP)跳转到声明',
        keyword: 'lazyvim lsp jump declaration tiaozhuan shengming',
        keys: [['g'], ['D']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)(LSP)跳转到实现：gI',
        description: '(LazyVim)(LSP)跳转到实现',
        keyword: 'lazyvim lsp jump implementation tiaozhuan shixian',
        keys: [['g'], ['D']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)(LSP)跳转到类型定义：gy',
        description: '(LazyVim)(LSP)跳转到类型定义',
        keyword: 'lazyvim lsp jump type definition tiaozhuan leixing dingyi',
        keys: [['g'], ['y']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)(LSP)重命名变量: <leader> + cr',
        description: '(LazyVim)(LSP)重命名变量',
        keyword: 'lazyvim lsp chongmingming bianliang rename symbol',
        keys: [['space'], ['c'], ['r']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)(neo-tree)buffer explorer: <leader> + be',
        description: '(neo-tree)buffer explorer',
        keyword: ' neo tree buffer explorer',
        keys: [['space'], ['b'], ['e']],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)创建目录: A',
        description: '(LazyVim)(neo-tree)创建目录',
        keyword: ' neo tree create directory folder mulu wenjianjia',
        keys: ['A'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)创建目录: A',
        description: '(neo-tree)创建目录',
        keyword: ' neo tree create directory folder mulu wenjianjia',
        keys: ['A'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)模糊搜索目录: D',
        description: '(neo-tree)模糊搜索目录',
        keyword: 'neo tree fuzzy find dir folder sousuo mohu',
        keys: ['D'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)切换隐藏文件: H',
        description: '(neo-tree)切换隐藏文件',
        keyword: 'neo tree toggle hidden yincang',
        keys: ['H'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)切换预览: P',
        description: '(neo-tree)切换预览',
        keyword: 'neo tree toggle preview yulan',
        keys: ['P'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)刷新: R',
        description: '(neo-tree)刷新',
        keyword: 'neo tree refresh shuaxin',
        keys: ['R'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)在新窗格中打开: S',
        description: '(neo-tree)在新窗格中打开',
        keyword: 'neo tree open split dakai chuangge',
        keys: ['S'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)创建文件: a',
        description: '(neo-tree)创建文件',
        keyword: 'neo tree create file chuangjian wenjian',
        keys: ['a'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)删除文件: d',
        description: '(neo-tree)删除文件',
        keyword: 'neo tree delete file chuangjian shanchu wenjian',
        keys: ['d'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)创建文件: c',
        description: '(neo-tree)复制文件',
        keyword: 'neo tree copy file kaobei fuzhi wenjian',
        keys: ['c'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)切换自动调整宽度: e',
        description: '(neo-tree)切换自动调整宽度',
        keyword: 'neo tree auto expand width zidong tiaozheng kuandu',
        keys: ['e'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)搜索文件: f',
        description: '(neo-tree)输入字符，回车搜索',
        keyword: 'neo tree find search',
        keys: ['f'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)显示简介: i',
        description: '(neo-tree)显示简介',
        keyword: 'neo tree info jianjie',
        keys: ['i'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)移动: m',
        description: '(neo-tree)移动',
        keyword: 'neo tree move yidong',
        keys: ['m'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)排序帮助: o',
        description: '(neo-tree)显示多个排序用的快捷键',
        keyword: 'neo tree order help',
        keys: ['o'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)重命名: r',
        description: '(neo-tree)重命名',
        keyword: 'neo tree rename chongmingming',
        keys: ['r'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)垂直窗格打开: s',
        description: '(neo-tree)垂直窗格打开',
        keyword: 'neo tree vertical split chuizhi chuangge',
        keys: ['s'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)在新标签页打开: t',
        description: '(neo-tree)在新标签页打开',
        keyword: 'neo tree tab new biaoqian dakai',
        keys: ['t'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)剪切: x',
        description: '(neo-tree)剪切文件',
        keyword: 'neo tree jianqie cut',
        keys: ['x'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)复制: y',
        description: '(neo-tree)复制文件',
        keyword: ' neo tree fuzhi copy kaobei',
        keys: ['y'],
        icon: 'icons/vim.png'
    },
    {
        title: '(neo-tree)收起所有目录: z',
        description: '(neo-tree)收起所有目录',
        keyword: ' neo tree close all nodes shouqi',
        keys: ['z'],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)打开NeoTree窗口: <leader> + E',
        description: '(LazyVim)在当前目录打开NeoTree窗口',
        keyword: 'lazyvim neo tree cwd',
        keys: [['space'], ['E']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)在根目录打开NeoTree窗口: <leader> + e',
        description: '(LazyVim)在根目录打开NeoTree窗口',
        keyword: 'lazyvim neo tree cwd',
        keys: [['space'], ['e']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)搜索命令历史: <leader> + sc',
        description: '(LazyVim)搜索命令历史',
        keyword: 'lazyvim search command history mingling lishi',
        keys: [['space'], ['s'], ['c']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)搜索剪贴板记录: <leader> + s"',
        description: '(LazyVim)搜索剪贴板记录',
        keyword: 'lazyvim search registers jiantieban',
        keys: [['space'], ['s'], ["'", 'shift']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)当前目录grep: <leader> + sG',
        description: '(LazyVim)当前目录grep',
        keyword: 'lazyvim search cwd sousuo dangqian',
        keys: [['space'], ['s'], ['G']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)根目录grep: <leader> + sg',
        description: '(LazyVim)根目录grep',
        keyword: 'lazyvim search root sousuo gen',
        keys: [['space'], ['s'], ['g']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)恢复搜索列表: <leader> + sR',
        description: '(LazyVim)恢复前一个搜索列表',
        keyword: 'lazyvim search restore resume huifu',
        keys: [['space'], ['s'], ['R']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)当前文件函数列表: <leader> + ss',
        description: '(LazyVim)当前文件函数列表',
        keyword: 'lazyvim search symbol file',
        keys: [['space'], ['s'], ['s']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)全局函数列表: <leader> + sS',
        description: '(LazyVim)全局函数列表',
        keyword: 'lazyvim search global symbol',
        keys: [['space'], ['s'], ['S']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)TODO: <leader> + st',
        description: '(LazyVim)显示TODO列表',
        keyword: 'lazyvim search todo daiban',
        keys: [['space'], ['s'], ['t']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)所有文件列表: <leader> + ff',
        description: '(LazyVim)显示TODO列表',
        keyword: 'lazyvim file list wenjian liebiao',
        keys: [['space'], ['f'], ['f']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)在根目录下搜索: <leader> + sw',
        description: '(LazyVim)在根目录下搜索光标所在单词，或选中的文字',
        keyword: 'lazyvim search word cursor guangbiao danci cwd',
        keys: [['space'], ['s'], ['w']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)在当前目录下搜索: <leader> + sw',
        description: '(LazyVim)在当前目录下搜索光标所在单词，或选中的文字',
        keyword: 'lazyvim search word cursor guangbiao danci global workspace',
        keys: [['space'], ['s'], ['W']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)搜索主题: <leader> + sw',
        description: '(LazyVim)搜索主题(color scheme)',
        keyword: 'lazyvim search zhuti color scheme',
        keys: [['space'], ['u'], ['C']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)搜索quickfix: <leader> + fq',
        description: '(LazyVim)也可以使用Telescope quickfix',
        keyword: 'lazyvim sousuo quickfix',
        keys: [['space'], ['f'], ['q']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)地址列表: <leader> + xl',
        description: '(LazyVim)地址列表(location list)',
        keyword: 'lazyvim location list',
        keys: [['space'], ['x'], ['l']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)地址列表: <leader> + xq',
        description: '(LazyVim)quickfix列表',
        keyword: 'lazyvim quickfix',
        keys: [['space'], ['x'], ['q']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)搜索buffer行: <leader> + sb',
        description: '(LazyVim)搜索buffer行',
        keyword: 'lazyvim search buffer line',
        keys: [['space'], ['s'], ['b']],
        icon: 'icons/vim.png'
    },
    {
        title: '(LazyVim)已打开的buffer列表: <leader> + fb',
        description: '(LazyVim)显示已打开的buffer列表',
        keyword: 'lazyvim search buffer list liebiao',
        keys: [['space'], ['f'], ['b']],
        icon: 'icons/vim.png'
    },
    {
        title: '(Telescope)发送所有项到quickfix: ctrl + q',
        description: '(Telescope)发送所有项到quickfix',
        keyword: 'lazyvim send ',
        keys: [['space'], ['f'], ['b']],
        icon: 'icons/vim.png'
    },
    {
        title: '(Telescope)preview窗口向左滚动: ctrl + f',
        description: '(Telescope)preview窗口向左滚动',
        keyword: 'lazyvim send ',
        keys: ['f', 'ctrl'],
        icon: 'icons/vim.png'
    },
    {
        title: '(Telescope)preview窗口向右滚动: ctrl + k',
        description: '(Telescope)preview窗口向右滚动',
        keyword: 'lazyvim send ',
        keys: ['k', 'ctrl'],
        icon: 'icons/vim.png'
    },
    {
        title: '(Telescope)preview窗口向上滚动: ctrl + u',
        description: '(Telescope)preview窗口上右滚动',
        keyword: 'lazyvim send ',
        keys: ['u', 'ctrl'],
        icon: 'icons/vim.png'
    },
    {
        title: '(Telescope)preview窗口向下滚动: ctrl + d',
        description: '(Telescope)preview窗口向下滚动',
        keyword: 'lazyvim send ',
        keys: ['d', 'ctrl'],
        icon: 'icons/vim.png'
    },
    {
        title: '显示二进制文件(命令): %!xxd',
        description: '显示二进制文件(命令)',
        keys: ['%!xxd'],
        action: 'copyCmd',
        icon: 'icons/vim.png'
    },
    {
        title: '回到普通模式(命令): %!xxd -r',
        description: '回到普通模式(命令)',
        keyword: 'vim binary erjinzhi back',
        keys: ['%!xxd -r'],
        action: 'copyCmd',
        icon: 'icons/vim.png'
    },
    {
        title: '下一个差异点: ] + c',
        description: 'vimdiff比较文件时，跳转下一个差异点',
        keyword: 'vim send ',
        keys: [[']'], ['c']],
        icon: 'icons/vim.png'
    },
    {
        title: '下一个差异点: [ + c',
        description: 'vimdiff比较文件时，跳转上一个差异点',
        keyword: 'vim send ',
        keys: [['['], ['c']],
        icon: 'icons/vim.png'
    },
    {
        title: '下一个差异点: ] + c',
        description: 'vimdiff比较文件时，跳转下一个差异点',
        keyword: 'vim send ',
        keys: [[']'], ['c']],
        icon: 'icons/vim.png'
    },
    {
        title: '输出内容: dp',
        description: 'vimdiff比较文件时，输出内容(p = put)',
        keyword: 'vim send diff',
        keys: [['d'], ['c']],
        icon: 'icons/vim.png'
    },
    {
        title: '获取内容: do', 
        description: 'vimdiff比较文件时，获取内容(o = obtain)',
        keyword: 'vim send ',
        keys: [['d'], ['o']],
        icon: 'icons/vim.png'
    }
]

module.exports = shortcuts
