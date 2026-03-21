let shortcuts = [
    {
        title: '列出所有会话(命令)：ls',
        description: '列出所有会话(命令)',
        keyword: 'tmux liechu huihua',
        action: 'copyCmd',
        icon: 'icons/tmux.png'
    },
    {
        title: '进入命令模式: <prefix> + :',
        description: '进入命令模式,输入tmux命令',
        keyword: 'tmux mingling moshi command mode cmd',
        keys: [['b', 'ctrl'], [';', 'shift']],
        icon: 'icons/tmux.png'
    },
    {
        title: '关闭会话(命令): kill-session -t <会话名>',
        description: 'kill-session -t <会话名>',
        keyword: 'tmux guanbi huihua close session cmd command',
        keys: ['kill-session -t <会话名>'],
        icon: 'icons/tmux.png'
    },
    {
        title: '列出会话: <prefix> + s',
        description: '列出会话并选择',
        keyword: 'tmux liechu huihua session list',
        keys: [['b', 'ctrl'], ['s']],
        icon: 'icons/tmux.png'
    },
    {
        title: '重命名会话: <prefix> + $',
        description: '重命名会话',
        keyword: 'tmux chongmingming session huihua rename',
        keys: [['b', 'ctrl'], ['4', 'shift']],
        icon: 'icons/tmux.png'
    },
    {
        title: '创建新窗口: <prefix> + c',
        description: '创建新窗口',
        keyword: 'tmux chuangjian xin chuangkou create new window',
        keys: [['b', 'ctrl'], ['c']],
        icon: 'icons/tmux.png'
    },
    {
        title: '列出所有窗口: <prefix> + w',
        description: '列出所有窗口',
        keyword: 'tmux liechu suoyou chuangkou list window',
        keys: [['b', 'ctrl'], ['w']],
        icon: 'icons/tmux.png'
    },
    {
        title: '前一个窗口: <prefix> + p',
        description: '前一个窗口',
        keyword: 'tmux qianyige chuangkou prev window',
        keys: [['b', 'ctrl'], ['p']],
        icon: 'icons/tmux.png'
    },
    {
        title: '后一个窗口: <prefix> + n',
        description: '后一个窗口',
        keyword: 'tmux houyige chuangkou next window',
        keys: [['b', 'ctrl'], ['n']],
        icon: 'icons/tmux.png'
    },
    {
        title: '查找窗口: <prefix> + f',
        description: '查找窗口',
        keyword: 'tmux chazhao chuangkou find window',
        keys: [['b', 'ctrl'], ['f']],
        icon: 'icons/tmux.png'
    },
    {
        title: '重命名窗口: <prefix> + ,',
        description: '重命名窗口',
        keyword: 'tmux chongmingming chuangkou rename window',
        keys: [['b', 'ctrl'], [',']],
        action: 'copyCmd',
        icon: 'icons/tmux.png'
    },
    {
        title: '关闭当前窗口: <prefix> + &',
        description: '关闭当前窗口',
        keyword: 'tmux guanbi chuangkou close window',
        keys: [['b', 'ctrl'], ['7', 'shift']],
        icon: 'icons/tmux.png'
    },
    {
        title: '交换窗口排序: swap-window',
        description: '交换窗口排序: swap-window -s <src> -t <target>, 不传参数，则表示当前窗口',
        keyword: 'tmux jiaohuan chuangkou swap window',
        keys: ['swap-window -s <src> -t <target>'],
        icon: 'icons/tmux.png'
    },
    {
        title: '移动当前窗口: move-window',
        description: '移动当前窗口: move-window -t <target>',
        keyword: 'tmux yidong dangqian chuangkou move window',
        keys: ['move-window -t <target>'],
        action: 'copyCmd',
        icon: 'icons/tmux.png'
    },
    {
        title: '垂直分割当前窗口: <prefix> + %',
        description: '垂直分割当前窗口',
        keyword: 'tmux chuizhi fenge dangqian chuangkou vertical split window',
        keys: [['b', 'ctrl'], ['5', 'shift']],
        icon: 'icons/tmux.png'
    },
    {
        title: '水平分割当前窗口: <prefix> + "',
        description: '水平分割当前窗口',
        keyword: 'tmux shuiping fenge dangqian chuangkou split window',
        keys: [['b', 'ctrl'], ["'", 'shift']],
        icon: 'icons/tmux.png'
    },
    {
        title: '关闭面板: <prefix> + x',
        description: '关闭当前面板',
        keyword: 'tmux guanbi dangqian mianban panel',
        keys: [['b', 'ctrl'], ['x']],
        icon: 'icons/tmux.png'
    },
    {
        title: '切换面板布局: <prefix> + space',
        description: '切换面板布局',
        keyword: 'tmux panel layout mianban buju',
        keys: [['b', 'ctrl'], ['space']],
        icon: 'icons/tmux.png'
    },
    {
        title: '显示每个面板是第几个: <prefix> + q',
        description: '当数字出现的时候按数字几就选中第几个面板',
        keyword: 'tmux xianshi dijige panel mianban',
        keys: [['b', 'ctrl'], ['q']],
        icon: 'icons/tmux.png'
    },
    {
        title: '与上一个面板交换位置: <prefix> + {',
        description: '与上一个面板交换位置',
        keyword: 'tmux shangyige mianban jiaohuan weizhi swap panel position',
        keys: [['b', 'ctrl'], ['[', 'shift']],
        icon: 'icons/tmux.png'
    },
    {
        title: '与下一个面板交换位置: <prefix> + }',
        description: '与下一个面板交换位置',
        keyword: 'tmux xiayige mianban jiaohuan weizhi swap panel position',
        keys: [['b', 'ctrl'], [']', 'shift']],
        icon: 'icons/tmux.png'
    },
    {
        title: '切换面板最大化: <prefix> + z',
        description: '切换面板最大化',
        keyword: 'tmux qiehuan panel zuidahua max panel',
        keys: [['b', 'ctrl'], ['z']],
        icon: 'icons/tmux.png'
    },
    {
        title: '当前面板向下扩大(命令)：resize-pane -D <num>',
        description: '当前面板向下扩大 (命令)',
        keyword: 'tmux mianban xiangxia large',
        keys: ['resize-pane -D <num>'],
        action: 'copyCmd',
        icon: 'icons/tmux.png'
    },
    {
        title: '当前面板向上扩大(命令)：resize-pane -U <num>',
        description: '当前面板向上扩大(命令)',
        keyword: 'tmux mianban xiangshang large',
        keys: ['resize-pane -U <num>'],
        action: 'copyCmd',
        icon: 'icons/tmux.png'
    },
    {
        title: '当前面板向左扩大(命令)：resize-pane -L <num>',
        description: '当前面板向左扩大(命令)',
        keyword: 'tmux mianban xiangzuo large',
        keys: ['resize-pane -L <num>'],
        action: 'copyCmd',
        icon: 'icons/tmux.png'
    },
    {
        title: '当前面板向右扩大(命令)：resize-pane -R <num>',
        description: '当前面板向右扩大(命令)',
        keyword: 'tmux mianban xiangyou large',
        keys: ['resize-pane -R <num>'],
        action: 'copyCmd',
        icon: 'icons/tmux.png'
    },
    {
        title: '设置文本编辑模式(命令)：setw -g mode-keys vi',
        description: '设置文本编辑模式为vi模式',
        keyword: 'tmux shezhi wenben bianji moshi vi set mode',
        keys: ['setw -g mode-keys vi'],
        action: 'copyCmd',
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)编辑.local中的配置文件：<prefix> + e',
        description: '编辑.local中的配置文件, 用$EDITOR环境变量中的编辑器打开，默认使用vim',
        keyword: 'tmux oh-my-tmux edit local conf bianji bendi peizhi',
        keys: [['b', 'ctrl'], ['e']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)重新加载配置：<prefix> + r',
        description: '重新加载配置',
        keyword: 'tmux oh-my-tmux reload local conf chongxin jiazai peizhi',
        keys: [['b', 'ctrl'], ['r']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)清理历史记录：ctrl + l',
        description: '清理历史记录，包括屏幕上的以及tmux的历史记录',
        keyword: 'tmux oh-my-tmux clean history qingli jilu lishi',
        keys: ['l', 'ctrl'],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)创建会话：<prefix> + C-c',
        description: '创建会话',
        keyword: 'tmux oh-my-tmux create session chuangjian huihua',
        keys: [['b', 'ctrl'], ['c', 'ctrl']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)向左切换面板：<prefix> + h',
        description: '向左切换面板，与vim的方向快捷键一致',
        keyword: 'tmux oh-my-tmux switch session qiehuan mianban',
        keys: [['b', 'ctrl'], ['h']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)向右切换面板：<prefix> + l',
        description: '向右切换面板，与vim的方向快捷键一致',
        keyword: 'tmux oh-my-tmux switch panel qiehuan mianban',
        keys: [['b', 'ctrl'], ['l']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)向下切换面板：<prefix> + j',
        description: '向下切换面板，与vim的方向快捷键一致',
        keyword: 'tmux oh-my-tmux switch panel xia qiehuan mianban',
        keys: [['b', 'ctrl'], ['j']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)向上切换面板：<prefix> + k',
        description: '向上切换面板，与vim的方向快捷键一致',
        keyword: 'tmux oh-my-tmux switch panel shang qiehuan mianban',
        keys: [['b', 'ctrl'], ['k']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)切换到最后一个窗口：<prefix> + Tab',
        description: '切换到最后一个窗口，重复则切换回来',
        keyword: 'tmux oh-my-tmux switch last window zuihouyige chuangkou',
        keys: [['b', 'ctrl'], ['tab']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)水平分割面板：<prefix> + -',
        description: '水平分割面板',
        keyword: 'tmux oh-my-tmux shuiping fenge mianban vertical split panel',
        keys: [['b', 'ctrl'], ['-']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)垂直分割窗口：<prefix> + _',
        description: '垂直分割窗口',
        keyword: 'tmux oh-my-tmux chuizhi fenge mianban horizontal split panel',
        keys: [['b', 'ctrl'], ['-', 'shift']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)垂直分割面板：<prefix> + |',
        description: '垂直分割面板',
        keyword: 'tmux oh-my-tmux chuizhi fenge mianban horizontal split panel',
        keys: [['b', 'ctrl'], ['\\', 'shift']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)向上扩展面板：<prefix> + K',
        description: '向上扩展面板，与vim的方向快捷键一致',
        keyword: 'tmux oh-my-tmux resize up panel shang kuozhan mianban',
        keys: [['b', 'ctrl'], ['K']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)向下扩展面板：<prefix> + J',
        description: '向上切换面板，与vim的方向快捷键一致',
        keyword: 'tmux oh-my-tmux resize down panel xia kuozhan mianban',
        keys: [['b', 'ctrl'], ['J']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)向左扩展面板：<prefix> + H',
        description: '向左扩展面板，与vim的方向快捷键一致',
        keyword: 'tmux oh-my-tmux resize left panel xia kuozhan mianban',
        keys: [['b', 'ctrl'], ['H']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)向右扩展面板：<prefix> + L',
        description: '向右扩展面板，与vim的方向快捷键一致',
        keyword: 'tmux oh-my-tmux resize right panel you kuozhan mianban',
        keys: [['b', 'ctrl'], ['L']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)向左交换窗口：<prefix> + <',
        description: '向左交换面板',
        keyword: 'tmux oh-my-tmux swap left panel zuo jiaohuan mianban',
        keys: [['b', 'ctrl'], [',', 'shift']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)向右交换窗口：<prefix> + >',
        description: '向左交换面板',
        keyword: 'tmux oh-my-tmux swap right panel you jiaohuan mianban',
        keys: [['b', 'ctrl'], ['.', 'shift']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)当前面板升级为窗口：<prefix> + +',
        description: '当前面板升级为窗口',
        keyword: 'tmux oh-my-tmux max panel to window shengji mianban chuangkou',
        keys: [['b', 'ctrl'], ['+']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)切换鼠标功能支持：<prefix> + m',
        description: '切换鼠标功能支持,反复在on/off间切换',
        keyword: 'tmux oh-my-tmux toggle mouse qiehuan shubiao',
        keys: [['b', 'ctrl'], ['m']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)升级插件：<prefix> + U',
        description: '升级插件',
        keyword: 'tmux oh-my-tmux upgrade plugin update chajian shengji',
        keys: [['b', 'ctrl'], ['U']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)拷贝模式：<prefix> + Enter',
        description: '拷贝模式',
        keyword: 'tmux oh-my-tmux copy mode kaobei moshi',
        keys: [['b', 'ctrl'], ['enter']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)显示剪贴板缓存列表：<prefix> + b',
        description: '显示剪贴板缓存列表',
        keyword: 'tmux oh-my-tmux copy paste buffers kaobei jiantieban huancun',
        keys: [['b', 'ctrl'], ['b']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)粘贴：<prefix> + p',
        description: '选取剪贴板记录第一条并粘贴',
        keyword: 'tmux oh-my-tmux paste zhantie niantie jiantieban',
        keys: [['b', 'ctrl'], ['p']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)选择并粘贴：<prefix> + P',
        description: '显示剪贴板列表，选取记录并粘贴',
        keyword: 'tmux oh-my-tmux paste zhantie niantie xuanqu choose jiantieban',
        keys: [['b', 'ctrl'], ['P']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(tmux-logging)开始/停止记录日志：<prefix> + P',
        description: '开始或停止记录日志',
        keyword: 'tmux logging start stop jilu ruzhi tingzhi',
        keys: [['b', 'ctrl'], ['P']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(tmux-resurrect)存储状态：<prefix> + C-s',
        description: '存储状态供下次恢复',
        keyword: 'tmux resurrect save status cunchu zhuangtai',
        keys: [['b', 'ctrl'], ['s', 'ctrl']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(tmux-resurrect)恢复状态：<prefix> + C-r',
        description: '恢复上次存储到状态',
        keyword: 'tmux resurrect restore status huifu zhuangtai',
        keys: [['b', 'ctrl'], ['r', 'ctrl']],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)开始选取：v',
        description: '(copy-mode-vi)开始选取',
        keyword: 'tmux oh-my-tmux copy-mode-vi begins selection visual mode xuanqu',
        keys: ['v'],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)切换块模式：ctrl + v',
        description: '(copy-mode-vi)切换块模式',
        keyword: 'tmux oh-my-tmux copy-mode-vi blockwise visual mode kuai moshi',
        keys: ['v', 'ctrl'],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)切换到第一行：H',
        description: '(copy-mode-vi)切换到第一行',
        keyword: 'tmux oh-my-tmux copy-mode-vi jump start line tiaozhuan qiehuan diyi hang',
        keys: ['H'],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)切换到最后一行：L',
        description: '(copy-mode-vi)切换到最后行',
        keyword: 'tmux oh-my-tmux copy-mode-vi jump end line tiaozhuan qiehuan zuihou hang',
        keys: ['L'],
        icon: 'icons/tmux.png'
    },
    {
        title: '(Oh my tmux!)退出拷贝模式：Esc',
        description: '(copy-mode-vi)退出拷贝模式',
        keyword: 'tmux oh-my-tmux copy-mode-vi exit tuichu',
        keys: ['escape'],
        icon: 'icons/tmux.png'
    },
    {
        title: '安装插件: <prefix> + I',
        description: '安装插件',
        keyword: 'tmux anzhuang chajian install plugins',
        keys: [['b', 'ctrl'], ['I']],
        icon: 'icons/tmux.png'
    }
]

module.exports = shortcuts
