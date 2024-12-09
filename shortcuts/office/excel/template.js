let shortcutTemplate = [
    {
        "title": "撤销 {cmd_or_ctrl} + Z",
        "description": "撤销上一步操作",
        "keyword": "undo che xiao",
        "keys": ["z", "{cmd_or_ctrl}"]
    },
    {
        "title": "重做 {cmd_or_ctrl} + Y",
        "description": "重新执行上一步被撤销的操作",
        "keyword": "redo chong zuo",
        "keys": ["y", "{cmd_or_ctrl}"]
    },
    {
        "title": "剪切 {cmd_or_ctrl} + X",
        "description": "剪切所选内容",
        "keyword": "cut jian qie",
        "keys": ["x", "{cmd_or_ctrl}"]
    },
    {
        "title": "复制 {cmd_or_ctrl} + C",
        "description": "复制所选内容",
        "keyword": "copy fu zhi",
        "keys": ["c", "{cmd_or_ctrl}"]
    },
    {
        "title": "粘贴 {cmd_or_ctrl} + V",
        "description": "粘贴复制或剪切的内容",
        "keyword": "paste zhan tie",
        "keys": ["v", "{cmd_or_ctrl}"]
    },
    {
        "title": "选择性粘贴 {cmd_or_ctrl} + {opt_or_alt} + V",
        "description": "选择性地粘贴内容",
        "keyword": "paste special xuan ze xing zhan tie",
        "keys": ["v", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "全选 {cmd_or_ctrl} + A",
        "description": "选择全部内容",
        "keyword": "select all quan xuan",
        "keys": ["a", "{cmd_or_ctrl}"]
    },
    {
        "title": "查找 {cmd_or_ctrl} + F",
        "description": "打开查找功能",
        "keyword": "find zhao zhao",
        "keys": ["f", "{cmd_or_ctrl}"]
    },
    {
        "title": "查找下一个 {cmd_or_ctrl} + G",
        "description": "查找下一个匹配项",
        "keyword": "find next zhao zhao xia yi ge",
        "keys": ["g", "{cmd_or_ctrl}"]
    },
    {
        "title": "查找上一个 {cmd_or_ctrl} + Shift + G",
        "description": "查找上一个匹配项",
        "keyword": "find previous zhao zhao shang yi ge",
        "keys": ["g", "{cmd_or_ctrl}", "shift"]
    },
    {
        "title": "替换 {cmd_or_ctrl} + {opt_or_alt} + F",
        "description": "打开替换功能",
        "keyword": "replace ti huan",
        "keys": ["f", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "转到... {cmd_or_ctrl} + {opt_or_alt} + G",
        "description": "转到指定位置或对象",
        "keyword": "go to...zhuan dao",
        "keys": ["g", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "新建 {cmd_or_ctrl} + N",
        "description": "新建文件或工作表等",
        "keyword": "new xin jian",
        "keys": ["n", "{cmd_or_ctrl}"]
    },
    {
        "title": "打开 {cmd_or_ctrl} + O",
        "description": "打开文件",
        "keyword": "open da kai",
        "keys": ["o", "{cmd_or_ctrl}"]
    },
    {
        "title": "关闭 {cmd_or_ctrl} + W",
        "description": "关闭当前文件或窗口",
        "keyword": "close guan bi",
        "keys": ["w", "{cmd_or_ctrl}"]
    },
    {
        "title": "保存 {cmd_or_ctrl} + S",
        "description": "保存文件",
        "keyword": "save bao cun",
        "keys": ["s", "{cmd_or_ctrl}"]
    },
    {
        "title": "另存为 {cmd_or_ctrl} + Shift + S",
        "description": "将文件另存为其他格式或位置",
        "keyword": "save as ling cun wei",
        "keys": ["s", "{cmd_or_ctrl}", "shift"]
    },
    {
        "title": "打印 {cmd_or_ctrl} + P",
        "description": "打印文件",
        "keyword": "print da yin",
        "keys": ["p", "{cmd_or_ctrl}"]
    },
    {
        "title": "进入全屏 Control + {cmd_or_ctrl} + F",
        "description": "使应用进入全屏模式",
        "keyword": "enter full - screen jin ru quan ping mo shi",
        "keys": ["f", "control", "{cmd_or_ctrl}"]
    },
    {
        "title": "退出 {cmd_or_ctrl} + Q",
        "description": "退出应用程序",
        "keyword": "quit tui chu",
        "keys": ["q", "{cmd_or_ctrl}"]
    },
    {
        "title": "退出并保留窗口 {cmd_or_ctrl} + {opt_or_alt} + Q",
        "description": "退出应用但保留相关窗口",
        "keyword": "quit and keep windows tui chu bing bao liu chuang kou",
        "keys": ["q", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "最小化 {cmd_or_ctrl} + M",
        "description": "最小化窗口",
        "keyword": "minimize zui xiao hua",
        "keys": ["m", "{cmd_or_ctrl}"]
    },
    {
        "title": "最大化 {cmd_or_ctrl} + {opt_or_alt} + F",
        "description": "最大化窗口",
        "keyword": "maximize zui da hua",
        "keys": ["f", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "切换窗口 {cmd_or_ctrl} + `",
        "description": "切换不同的窗口",
        "keyword": "switch windows qie huan bu tong de chuang kou",
        "keys": ["`", "{cmd_or_ctrl}"]
    },
    {
        "title": "隐藏Excel {cmd_or_ctrl} + H",
        "description": "隐藏Excel应用程序",
        "keyword": "hide Excel yin cang Excel",
        "keys": ["h", "{cmd_or_ctrl}"]
    },
    {
        "title": "隐藏其他项 {cmd_or_ctrl} + {opt_or_alt} + H",
        "description": "隐藏除当前项外的其他项目",
        "keyword": "hide others yin cang qi ta xiang mu",
        "keys": ["h", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "功能区 {cmd_or_ctrl} + {opt_or_alt} + R",
        "description": "显示或隐藏功能区",
        "keyword": "ribbon gong neng qu",
        "keys": ["r", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "公式 {opt_or_alt} + =",
        "description": "插入公式",
        "keyword": "formula cha ru gong shi",
        "keys": ["=", "{opt_or_alt}"]
    },
    {
        "title": "超链接 {cmd_or_ctrl} + K",
        "description": "插入超链接",
        "keyword": "hyperlink cha ru chao lian jie",
        "keys": ["k", "{cmd_or_ctrl}"]
    },
    {
        "title": "插入 {cmd_or_ctrl} + {opt_or_alt} + I",
        "description": "进行插入操作",
        "keyword": "insert cha ru",
        "keys": ["i", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "分隔符 {cmd_or_ctrl} + Enter",
        "description": "插入分隔符",
        "keyword": "separator cha ru fen ge fu",
        "keys": ["enter", "{cmd_or_ctrl}"]
    },
    {
        "title": "分页符 {cmd_or_ctrl} + Return",
        "description": "插入分页符",
        "keyword": "page break cha ru fen ye fu",
        "keys": ["return", "{cmd_or_ctrl}"]
    },
    {
        "title": "分栏符 {cmd_or_ctrl} + {opt_or_alt} + Enter",
        "description": "插入分栏符",
        "keyword": "column break cha ru fen lan fu",
        "keys": ["enter", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "字体 {cmd_or_ctrl} + D",
        "description": "设置字体",
        "keyword": "font she zhi zi ti",
        "keys": ["d", "{cmd_or_ctrl}"]
    },
    {
        "title": "选择窗格 {cmd_or_ctrl} + {opt_or_alt} + J",
        "description": "打开选择窗格",
        "keyword": "select pane da kai xuan ze chuang ge",
        "keys": ["j", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "设置对象格式 {cmd_or_ctrl} + {opt_or_alt} + I",
        "description": "设置对象的格式",
        "keyword": "set object format she zhi dui xiang de ge shi",
        "keys": ["i", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "选择格式相似的文本 {cmd_or_ctrl} + {opt_or_alt} + C",
        "description": "选择格式相似的文本",
        "keyword": "select similar - formatted text xuan ze ge shi xiang si de wen ben",
        "keys": ["c", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "智能查找 {cmd_or_ctrl} + {opt_or_alt} + F7",
        "description": "进行智能查找操作",
        "keyword": "smart find jin xing zhi neng zhao zhao cao zuo",
        "keys": ["f7", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "表情与符号 {cmd_or_ctrl} + Control + Space",
        "description": "插入表情与符号",
        "keyword": "emoji and symbols cha ru biao qing yu fu hao",
        "keys": ["space", "control", "{cmd_or_ctrl}"]
    },
    {
        "title": "插入页码 {cmd_or_ctrl} + {opt_or_alt} + P",
        "description": "插入页码",
        "keyword": "insert page number cha ru ye ma",
        "keys": ["p", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入日期和时间 {cmd_or_ctrl} + {opt_or_alt} + ;",
        "description": "插入日期和时间",
        "keyword": "insert date and time cha ru ri qi he shi jian",
        "keys": [";", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入脚注 {cmd_or_ctrl} + {opt_or_alt} + F",
        "description": "插入脚注",
        "keyword": "insert footnote cha ru jiao zhu",
        "keys": ["f", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入尾注 {cmd_or_ctrl} + {opt_or_alt} + D",
        "description": "插入尾注",
        "keyword": "insert endnote cha ru wei zhu",
        "keys": ["d", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入题注 {cmd_or_ctrl} + {opt_or_alt} + C",
        "description": "插入题注",
        "keyword": "insert caption cha ru ti zhu",
        "keys": ["c", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入书签 {cmd_or_ctrl} + {opt_or_alt} + B",
        "description": "插入书签",
        "keyword": "insert bookmark cha ru shu qian",
        "keys": ["b", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入批注 {cmd_or_ctrl} + {opt_or_alt} + M",
        "description": "插入批注",
        "keyword": "insert comment cha ru pi zhu",
        "keys": ["m", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入索引 {cmd_or_ctrl} + {opt_or_alt} + X",
        "description": "插入索引",
        "keyword": "insert index cha ru suo yin",
        "keys": ["x", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入目录 {cmd_or_ctrl} + {opt_or_alt} + O",
        "description": "插入目录",
        "keyword": "insert table of contents cha ru mu lu",
        "keys": ["o", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入图表 {cmd_or_ctrl} + {opt_or_alt} + G",
        "description": "插入图表",
        "keyword": "insert chart cha ru tu biao",
        "keys": ["g", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入形状 {cmd_or_ctrl} + {opt_or_alt} + K",
        "description": "插入形状",
        "keyword": "insert shape cha ru xing zhuang",
        "keys": ["k", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入表格 {cmd_or_ctrl} + {opt_or_alt} + T",
        "description": "插入表格",
        "keyword": "insert table cha ru biao ge",
        "keys": ["t", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入文本框 {cmd_or_ctrl} + {opt_or_alt} + X",
        "description": "插入文本框",
        "keyword": "insert text box cha ru wen ben kuang",
        "keys": ["x", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入艺术字 {cmd_or_ctrl} + {opt_or_alt} + W",
        "description": "插入艺术字",
        "keyword": "insert word art cha ru yi shu zi",
        "keys": ["w", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入符号 {cmd_or_ctrl} + {opt_or_alt} + E",
        "description": "插入符号",
        "keyword": "insert symbol cha ru fu hao",
        "keys": ["e", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入公式 {cmd_or_ctrl} + {opt_or_alt} + Q",
        "description": "插入公式",
        "keyword": "insert formula cha ru gong shi",
        "keys": ["q", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入文件 {cmd_or_ctrl} + {opt_or_alt} + O",
        "description": "插入文件",
        "keyword": "insert file cha ru wen jian",
        "keys": ["o", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入图片 {cmd_or_ctrl} + {opt_or_alt} + I",
        "description": "插入图片",
        "keyword": "insert picture cha ru tu pian",
        "keys": ["i", "{cmd_or_ctrl}", "{opt_or_alt}"]
    },
    {
        "title": "插入超链接 {cmd_or_ctrl} + K",
        "description": "插入超链接",
        "keyword": "insert hyperlink cha ru chao lian jie",
        "keys": ["k", "{cmd_or_ctrl}"]
    }
];

module.exports = shortcutTemplate