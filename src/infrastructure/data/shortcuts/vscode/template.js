let shortcutTemplate = [
{
    "title": "重新打开关闭的编辑器 {cmd_or_ctrl} + E",
    "description": "重新打开关闭的编辑器",
    "keyword": "reopen closed editor chongxin dakai guanbi de bianjiqi",
    "keys": ["e", "{cmd_or_ctrl}"]
},
{
    "title": "保持预览模式编辑器打开 {cmd_or_ctrl} + K, {cmd_or_ctrl} + V",
    "description": "保持预览模式编辑器打开",
    "keyword": "keep preview mode editor open baochi yulan moshi bianjiqi dakai",
    "keys": [["k", "{cmd_or_ctrl}"], ["v", "{cmd_or_ctrl}"]]
},
{
    "title": "打开下一个文件 {cmd_or_ctrl} + Tab",
    "description": "打开下一个文件",
    "keyword": "open next file dakai xia yige wenjian",
    "keys": ["tab", "{cmd_or_ctrl}"]
},
{
    "title": "打开上一个文件 Shift + {cmd_or_ctrl} + Tab",
    "description": "打开上一个文件",
    "keyword": "open previous file dakai shang yige wenjian",
    "keys": ["tab", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "复制活动文件路径 {cmd_or_ctrl} + K, {cmd_or_ctrl} + P",
    "description": "复制活动文件路径",
    "keyword": "copy path of active file fuzhi huodong wenjian lujing",
    "keys": [["k", "{cmd_or_ctrl}"], ["p", "{cmd_or_ctrl}"]]
},
{
    "title": "在Finder中显示活动文件 {cmd_or_ctrl} + K, {cmd_or_ctrl} + R",
    "description": "在Finder中显示活动文件",
    "keyword": "reveal active file in Finder zai Finder zhong xianshi huodong wenjian",
    "keys": [["k", "{cmd_or_ctrl}"], ["r", "{cmd_or_ctrl}"]]
},
{
    "title": "在新窗口/实例中显示活动文件 {cmd_or_ctrl} + K, {cmd_or_ctrl} + O",
    "description": "在新窗口/实例中显示活动文件",
    "keyword": "show active file in new window/instance zai xin chuangkou/shili zhong xianshi huodong wenjian",
    "keys": [["k", "{cmd_or_ctrl}"], ["o", "{cmd_or_ctrl}"]]
},
{
    "title": "显示命令面板 {cmd_or_ctrl} + P, {cmd_or_ctrl} + F1",
    "description": "显示命令面板",
    "keyword": "show {cmd_or_ctrl} palette xianshi mingling mianban",
    "keys": [["p", "{cmd_or_ctrl}"], ["f1", "{cmd_or_ctrl}"]]
},
{
    "title": "快速打开，转到文件... {cmd_or_ctrl} + P",
    "description": "快速打开，转到文件",
    "keyword": "quick open, go to file kuaisu dakai, zhuan dao wenjian",
    "keys": ["p", "{cmd_or_ctrl}"]
},
{
    "title": "新建窗口/实例 {cmd_or_ctrl} + N",
    "description": "新建窗口/实例",
    "keyword": "new window/instance xinjian chuangkou/shili",
    "keys": ["n", "{cmd_or_ctrl}"]
},
{
    "title": "关闭窗口/实例 {cmd_or_ctrl} + W",
    "description": "关闭窗口/实例",
    "keyword": "close window/instance guanbi chuangkou/shili",
    "keys": ["w", "{cmd_or_ctrl}"]
},
{
    "title": "用户设置 {cmd_or_ctrl} + ,",
    "description": "用户设置（手动）",
    "keyword": "user settings yonghu shezhi",
    "keys": [",", "{cmd_or_ctrl}"]
},
{
    "title": "键盘快捷键 {cmd_or_ctrl} + K, {cmd_or_ctrl} + S",
    "description": "键盘快捷键",
    "keyword": "keyboard shortcuts jianpan kuaijiejian",
    "keys": [["k", "{cmd_or_ctrl}"], ["s", "{cmd_or_ctrl}"]]
},
{
    "title": "复制行（空选） {cmd_or_ctrl} + C",
    "description": "复制行（空选）",
    "keyword": "copy line (empty selection) fuzhi xing (kong xuan)",
    "keys": ["c", "{cmd_or_ctrl}"]
},
{
    "title": "下移行 {cmd_or_ctrl} + ⬇",
    "description": "下移行",
    "keyword": "move line down yixia xing",
    "keys": ["down", "{cmd_or_ctrl}"]
},
{
    "title": "上移行 {cmd_or_ctrl} + ⬆",
    "description": "上移行",
    "keyword": "move line up shangyi xing",
    "keys": ["up", "{cmd_or_ctrl}"]
},
{
    "title": "剪切行（空选） {cmd_or_ctrl} + X",
    "description": "剪切行（空选）",
    "keyword": "cut line (empty selection) jianqie xing (kong xuan)",
    "keys": ["x", "{cmd_or_ctrl}"]
},
{
    "title": "复制下移行 {cmd_or_ctrl} + {opt_or_alt} + ⬇",
    "description": "复制下移行",
    "keyword": "copy line down fuzhi xia yi xing",
    "keys": ["down", "{opt_or_alt}", "{cmd_or_ctrl}"]
},
{
    "title": "复制上移行 {cmd_or_ctrl} + {opt_or_alt} + ⬆",
    "description": "复制上移行",
    "keyword": "copy line up fuzhi shang yi xing",
    "keys": ["up", "{opt_or_alt}", "{cmd_or_ctrl}"]
},
{
    "title": "删除行 {cmd_or_ctrl} + Shift + K",
    "description": "删除行",
    "keyword": "delete line shanchu xing",
    "keys": ["k", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "转到文件开头 {cmd_or_ctrl} + Home",
    "description": "转到文件开头",
    "keyword": "go to beginning of file zhuan dao wenjian kaitou",
    "keys": ["home", "{cmd_or_ctrl}"]
},
{
    "title": "转到文件结尾 {cmd_or_ctrl} + End",
    "description": "转到文件结尾",
    "keyword": "go to end of file zhuan dao wenjian jiewei",
    "keys": ["end", "{cmd_or_ctrl}"]
},
{
    "title": "向上滚动行 {cmd_or_ctrl} + Shift + Page Up",
    "description": "向上滚动行",
    "keyword": "scroll line up gundong xing shang",
    "keys": ["pageup", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "向下滚动行 {cmd_or_ctrl} + Shift + Page Down",
    "description": "向下滚动行",
    "keyword": "scroll line down gundong xing xia",
    "keys": ["pagedown", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "转到行首 {cmd_or_ctrl} + ⬅",
    "description": "转到行首",
    "keyword": "go to beginning of line zhuan dao xing shou",
    "keys": ["left", "{cmd_or_ctrl}"]
},
{
    "title": "转到行尾 {cmd_or_ctrl} + ➡",
    "description": "转到行尾",
    "keyword": "go to end of line zhuan dao xing wei",
    "keys": ["right", "{cmd_or_ctrl}"]
},
{
    "title": "缩进行 {cmd_or_ctrl} + ]",
    "description": "缩进行",
    "keyword": "indent line suojin xing",
    "keys": ["]", "{cmd_or_ctrl}"]
},
{
    "title": "取消缩进行 {cmd_or_ctrl} + [",
    "description": "取消缩进行",
    "keyword": "outdent line quxiaosuojin xing",
    "keys": ["[", "{cmd_or_ctrl}"]
},
{
    "title": "跳转到匹配括号 {cmd_or_ctrl} + Shift + \\",
    "description": "跳转到匹配括号",
    "keyword": "jump to matching bracket tiaozhuan dao pipei kuohao",
    "keys": ["\\", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "在下方插入行 {cmd_or_ctrl} + Enter",
    "description": "在下方插入行",
    "keyword": "insert line below charu xing xiafang",
    "keys": ["enter", "{cmd_or_ctrl}"]
},
{
    "title": "在上方插入行 {cmd_or_ctrl} + Shift + Enter",
    "description": "在上方插入行",
    "keyword": "insert line above charu xing shangfang",
    "keys": ["enter", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "折叠区域 {cmd_or_ctrl} + {opt_or_alt} + [",
    "description": "折叠区域",
    "keyword": "fold region zhe die quyu",
    "keys": ["[", "{opt_or_alt}", "{cmd_or_ctrl}"]
},
{
    "title": "展开区域 {cmd_or_ctrl} + {opt_or_alt} + ]",
    "description": "展开区域",
    "keyword": "unfold region zhan kai quyu",
    "keys": ["]", "{opt_or_alt}", "{cmd_or_ctrl}"]
},
{
    "title": "折叠所有子区域 {cmd_or_ctrl} + K, {cmd_or_ctrl} + 0",
    "description": "折叠所有子区域",
    "keyword": "fold all subregions zhe die suoyou zi quyu",
    "keys": [["k", "{cmd_or_ctrl}"], ["0", "{cmd_or_ctrl}"]]
},
{
    "title": "展开所有子区域 {cmd_or_ctrl} + K, {cmd_or_ctrl} + J",
    "description": "展开所有子区域",
    "keyword": "unfold all subregions zhan kai suoyou zi quyu",
    "keys": [["k", "{cmd_or_ctrl}"], ["j", "{cmd_or_ctrl}"]]
},
{
    "title": "添加行注释 {cmd_or_ctrl} + /",
    "description": "添加行注释",
    "keyword": "add line comment tianjia xing zhushi",
    "keys": ["/", "{cmd_or_ctrl}"]
},
{
    "title": "删除行注释 {cmd_or_ctrl} + K, {cmd_or_ctrl} + U",
    "description": "删除行注释",
    "keyword": "remove line comment shanchu xing zhushi",
    "keys": [["k", "{cmd_or_ctrl}"], ["u", "{cmd_or_ctrl}"]]
},
{
    "title": "切换块注释 {cmd_or_ctrl} + Shift + A",
    "description": "切换块注释",
    "keyword": "toggle block comment qiehuan kuai zhushi",
    "keys": ["a", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "切换行注释 {cmd_or_ctrl} + /",
    "description": "切换行注释",
    "keyword": "toggle line comment qiehuan xing zhushi",
    "keys": ["/", "{cmd_or_ctrl}"]
},
{
    "title": "切换自动换行 {cmd_or_ctrl} + Z",
    "description": "切换自动换行",
    "keyword": "toggle word wrap qiehuan zidong huanhang",
    "keys": ["z", "{cmd_or_ctrl}"]
},
{
    "title": "插入光标 {opt_or_alt} + 点击",
    "description": "插入光标",
    "keyword": "insert cursor by {opt_or_alt} + click chazru guangbiao",
    "keys": ["click", "{opt_or_alt}"]
},
{
    "title": "在上方插入光标 {opt_or_alt} + {cmd_or_ctrl} + ⬆",
    "description": "在上方操作插入光标",
    "keyword": "insert cursor above charu guangbiao shangfang",
    "keys": ["up", "{cmd_or_ctrl}", "{opt_or_alt}"]
},
{
    "title": "在下方插入光标 {opt_or_alt} + {cmd_or_ctrl} + ⬇",
    "description": "在下方操作插入光标",
    "keyword": "insert cursor below charu guangbiao xiafang",
    "keys": ["down", "{cmd_or_ctrl}", "{opt_or_alt}"]
},
{
    "title": "撤销光标操作 {cmd_or_ctrl} + U",
    "description": "撤销光标操作",
    "keyword": "cancel cursor operation quxiao guangbiao caozuo",
    "keys": ["u", "{cmd_or_ctrl}"]
},
{
    "title": "在所有行尾插入光标 Shift + {opt_or_alt} + I",
    "description": "在所有行尾插入光标",
    "keyword": "insert cursor end line charu guangbiao hangwei",
    "keys": ["i", "shift", "{opt_or_alt}"]
},
{
    "title": "选择当前行 {cmd_or_ctrl} + L",
    "description": "选择当前行",
    "keyword": "select current line xuanze dangqian xing",
    "keys": ["l", "{cmd_or_ctrl}"]
},
{
    "title": "选择所有的查找结果 {cmd_or_ctrl} + Shift + L",
    "description": "选择所有的查找结果",
    "keyword": "select all occurrences of current selection xuanze dangqian xuanze de suoyou chuxian",
    "keys": ["l", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "向左选择 ctrl + Shift + {cmd_or_ctrl} + ⬅",
    "description": "向左选择",
    "keyword": "shrink selection by {opt_or_alt} + drag mouse kuozhan/shousuo xuanze",
    "keys": ["left", "ctrl", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "向左选择 ctrl + Shift + {cmd_or_ctrl} + ➡",
    "description": "向右选择",
    "keyword": "expand/shrink selection kuozhan/shousuo xuanze",
    "keys": ["right", "ctrl", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "{cmd_or_ctrl} + Shift + F2撤销上一个光标操作",
    "description": "使用{cmd_or_ctrl} + Shift + F2撤销上一个光标操作",
    "keyword": "undo last cursor operation chexiao shang yige guangbiao caozuo",
    "keys": ["f2", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "列（块）选择 Shift + {opt_or_alt} + 鼠标左键拖动",
    "description": "通过鼠标拖动进行列（块）选择",
    "keyword": "column (box) selection lie (kuai) xuanze",
    "keys": ["drag"]
},
{
    "title": "列（块）选择向右 {cmd_or_ctrl} + Shift + {opt_or_alt} + ➡",
    "description": "列（块）选择向右操作",
    "keyword": "column (box) selection right lie (kuai) xuanze xiangyou",
    "keys": ["right", "shift", "{cmd_or_ctrl}", "{opt_or_alt}"]
},
{
    "title": "列（块）选择向左 {cmd_or_ctrl} + Shift + {opt_or_alt} + ⬅",
    "description": "列（块）选择向左操作",
    "keyword": "column (box) selection left lie (kuai) xuanze zuoxiang",
    "keys": ["left", "shift", "{cmd_or_ctrl}", "{opt_or_alt}"]
},
{
    "title": "列（块）选择向下翻页 {cmd_or_ctrl} + {opt_or_alt} + Shift + Page Down",
    "description": "列（块）选择向下翻页操作",
    "keyword": "column (box) selection page down lie (kuai) xuanze xiangxia fanye",
    "keys": ["pagedown", "{opt_or_alt}", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "列（块）选择向下翻页 {cmd_or_ctrl} + {opt_or_alt} + Shift + Page Up",
    "description": "列（块）选择向上翻页操作",
    "keyword": "column (box) selection page up lie (kuai) xuanze xiangxia fanye",
    "keys": ["pageup", "{opt_or_alt}", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "查找 {cmd_or_ctrl} + F",
    "description": "查找",
    "keyword": "find cha zhao",
    "keys": ["f", "{cmd_or_ctrl}"]
},
{
    "title": "查找下一个 {cmd_or_ctrl} + G",
    "description": "查找下一个",
    "keyword": "find next cha zhao xia yige",
    "keys": ["g", "{cmd_or_ctrl}"]
},
{
    "title": "查找上一个 Shift + {cmd_or_ctrl} + G",
    "description": "查找上一个",
    "keyword": "find previous cha zhao shang yige",
    "keys": ["g", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "替换 {cmd_or_ctrl} + {opt_or_alt} + F",
    "description": "替换",
    "keyword": "replace ti huan",
    "keys": ["f", "{opt_or_alt}", "{cmd_or_ctrl}"]
},
{
    "title": "选择所有查找匹配项 {cmd_or_ctrl} + {opt_or_alt} + Enter",
    "description": "选择所有查找匹配项",
    "keyword": "select all find match xuanze suoyou cha zhao pi pei xiang",
    "keys": ["enter", "{opt_or_alt}", "{cmd_or_ctrl}"]
},
{
    "title": "添加选择到下一个查找匹配项 {cmd_or_ctrl} + D",
    "description": "添加选择到下一个查找匹配项",
    "keyword": "add selection to next find match tianjia xuanze dao xia yige cha zhao pi pei xiang",
    "keys": ["d", "{cmd_or_ctrl}"]
},
{
    "title": "移动上一个选择到下一个查找匹配项 {cmd_or_ctrl} + K, {cmd_or_ctrl} + D",
    "description": "移动上一个选择到下一个查找匹配项",
    "keyword": "move last selection to next find match yidong shang yige xuanze dao xia yige cha zhao pi pei xiang",
    "keys": [["k", "{cmd_or_ctrl}"], ["d", "{cmd_or_ctrl}"]]
},
{
    "title": "触发建议 ctrl + 空格",
    "description": "触发建议",
    "keyword": "trigger suggestion qifa jianyi",
    "keys": ["space", "ctrl"]
},
{
    "title": "触发参数提示 {cmd_or_ctrl} + Shift + 空格",
    "description": "触发参数提示",
    "keyword": "trigger parameter hints qifa canshu tishi",
    "keys": ["space", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "格式化文档 {opt_or_alt} + Shift + F",
    "description": "格式化文档",
    "keyword": "format document geshi hua wenjian",
    "keys": ["f", "shift", "{opt_or_alt}"]
},
{
    "title": "格式化所选内容 {cmd_or_ctrl} + K, {cmd_or_ctrl} + F",
    "description": "格式化所选内容",
    "keyword": "format selection geshi hua suo xuan nei rong",
    "keys": [["k", "{cmd_or_ctrl}"], ["f", "{cmd_or_ctrl}"]]
},
{
    "title": "查看定义（预览） {cmd_or_ctrl} + K, F12",
    "description": "查看定义（预览）",
    "keyword": "peek definition (preview) cha kan ding yi (yu lan)",
    "keys": [["k", "{cmd_or_ctrl}"], ["f12"]]
},
{
    "title": "快速修复 {cmd_or_ctrl} + .",
    "description": "快速修复（手动）",
    "keyword": "quick fix kuai su xiu fu",
    "keys": [".", "{cmd_or_ctrl}"]
},
{
    "title": "显示引用 {cmd_or_ctrl} + Shift + F12",
    "description": "显示引用",
    "keyword": "show references xian shi yin yong",
    "keys": ["f12", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "重命名符号 F2",
    "description": "重命名符号",
    "keyword": "rename symbol zhong ming ming fu",
    "keys": ["f2"]
},
{
    "title": "去除尾部空格 {cmd_or_ctrl} + Shift + X",
    "description": "去除尾部空格",
    "keyword": "trim railing whitespace qie chu wei bu kong ge",
    "keys": ["x", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "转到定义 F12",
    "description": "转到定义",
    "keyword": "go to definition zhuan dao ding yi",
    "keys": ["f12"]
},
{
    "title": "更改文件语言 {cmd_or_ctrl} + K, {cmd_or_ctrl} + M",
    "description": "更改文件语言",
    "keyword": "change file language gai bian wen jian yu yan",
    "keys": [["k", "{cmd_or_ctrl}"], ["m", "{cmd_or_ctrl}"]]
},
{
    "title": "显示所有符号 {cmd_or_ctrl} + T",
    "description": "显示所有符号",
    "keyword": "show all symbols xian shi suo you fu hao",
    "keys": ["t", "{cmd_or_ctrl}"]
},
{
    "title": "显示问题面板 {cmd_or_ctrl} + Shift + M",
    "description": "显示问题面板",
    "keyword": "show problems panel xian shi wen ti mian ban",
    "keys": ["m", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "转到下一个错误或警告 F8",
    "description": "转到下一个错误或警告",
    "keyword": "go to next error or warning zhuan dao xia yi ge cuo wu huo jing gao",
    "keys": ["f8"]
},
{
    "title": "转到上一个错误或警告 Shift + F8",
    "description": "转到上一个错误或警告",
    "keyword": "go to previous error or warning zhuan dao shang yi ge cuo wu huo jing gao",
    "keys": ["f8", "shift"]
},
{
    "title": "导航编辑器组历史记录 ctrl + shift + tab",
    "description": "导航编辑器组历史记录",
    "keyword": "navigate editor group history dao hang bian ji qi zu li shi ji lu",
    "keys": ["tab", "shift", "ctrl"]
},
{
    "title": "转到符号... {cmd_or_ctrl} + Shift + O",
    "description": "转到符号...",
    "keyword": "go to symbol... zhuan dao fu hao...",
    "keys": ["o", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "切换Tab移动焦点 ctrl + shift + M",
    "description": "切换Tab移动焦点",
    "keyword": "toggle tab moves focus qie huan Tab yi dong jiao dian",
    "keys": ["m", "ctrl", "shift"]
},
{
    "title": "转到行... {cmd_or_ctrl} + L",
    "description": "转到行...",
    "keyword": "go to line... zhuan dao xing...",
    "keys": ["l", "{cmd_or_ctrl}"]
},
{
    "title": "转到文件... {cmd_or_ctrl} + P",
    "description": "转到文件...",
    "keyword": "go to file... zhuan dao wen jian...",
    "keys": ["p", "{cmd_or_ctrl}"]
},
{
    "title": "关闭编辑器 {cmd_or_ctrl} + W",
    "description": "关闭编辑器",
    "keyword": "close editor guan bi bian ji qi",
    "keys": ["w", "{cmd_or_ctrl}"]
},
{
    "title": "关闭文件夹 {cmd_or_ctrl} + Shift + W",
    "description": "关闭文件夹",
    "keyword": "close folder guan bi wen jian jia",
    "keys": ["w", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "拆分编辑器 {cmd_or_ctrl} + \\",
    "description": "拆分编辑器（手动）",
    "keyword": "split editor fen chai bian ji qi",
    "keys": ["\\", "{cmd_or_ctrl}"]
},
{
    "title": "聚焦到前一个编辑器组 {cmd_or_ctrl} + {opt_or_alt} + ⬅",
    "description": "聚焦到前一个编辑器组",
    "keyword": "focus into previous editor group ju jiao dao qian yi ge bian ji qi zu",
    "keys": ["left", "{opt_or_alt}", "{cmd_or_ctrl}"]
},
{
    "title": "聚焦到后一个编辑器组 {cmd_or_ctrl} + {opt_or_alt} + ➡",
    "description": "聚焦到后一个编辑器组",
    "keyword": "go to next editor group ju jiao dao hou yi ge bian ji qi zu",
    "keys": [["right", "{opt_or_alt}", "{cmd_or_ctrl}"]]
},
{
    "title": "聚焦到1号编辑器组 {cmd_or_ctrl} + 1",
    "description": "聚焦到1号编辑器组",
    "keyword": "focus into 1st editor group ju jiao dao 1 hao bian ji qi zu",
    "keys": ["1", "{cmd_or_ctrl}"]
},
{
    "title": "聚焦到2号编辑器组 {cmd_or_ctrl} + 2",
    "description": "聚焦到2号编辑器组",
    "keyword": "focus into 2nd editor group ju jiao dao 2 hao bian ji qi zu",
    "keys": ["2", "{cmd_or_ctrl}"]
},
{
    "title": "聚焦到3号编辑器组 {cmd_or_ctrl} + 3",
    "description": "聚焦到3号编辑器组",
    "keyword": "focus into 3rd editor group ju jiao dao 3 hao bian ji qi zu",
    "keys": ["3", "{cmd_or_ctrl}"]
},
{
    "title": "左移编辑器 {cmd_or_ctrl} + {opt_or_alt} + ⬅",
    "description": "左移编辑器",
    "keyword": "move editor left yi dong bian ji qi zuo",
    "keys": [["k", "{cmd_or_ctrl}"], ["left", "shift", "{cmd_or_ctrl}"]]
},
{
    "title": "右移编辑器 {cmd_or_ctrl} + {opt_or_alt} + ➡",
    "description": "右移编辑器",
    "keyword": "move editor right yi dong bian ji qi you",
    "keys": [["k", "{cmd_or_ctrl}"], ["right", "shift", "{cmd_or_ctrl}"]]
},
{
    "title": "移动活动编辑器组 {cmd_or_ctrl} + K, ⬅",
    "description": "移动活动编辑器组",
    "keyword": "move active editor group yi dong huo dong bian ji qi zu",
    "keys": [["k", "{cmd_or_ctrl}"], ["left"]]
},
{
    "title": "移动活动编辑器组 {cmd_or_ctrl} + K, ➡",
    "description": "移动活动编辑器组",
    "keyword": "move active editor group yi dong huo dong bian ji qi zu",
    "keys": [["k", "{cmd_or_ctrl}"], ["right"]]
},
{
    "title": "新建文件 {cmd_or_ctrl} + N",
    "description": "新建文件",
    "keyword": "new file xin jian wen jian",
    "keys": ["n", "{cmd_or_ctrl}"]
},
{
    "title": "保存 {cmd_or_ctrl} + S",
    "description": "保存",
    "keyword": "save bao cun",
    "keys": ["s", "{cmd_or_ctrl}"]
},
{
    "title": "打开文件... {cmd_or_ctrl} + O",
    "description": "打开文件...",
    "keyword": "go to file... zhuan dao wen jian...",
    "keys": ["o", "{cmd_or_ctrl}"]
},
{
    "title": "另存为... {cmd_or_ctrl} + Shift + S",
    "description": "另存为...",
    "keyword": "save as... ling cun wei...",
    "keys": ["s", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "全部保存 {cmd_or_ctrl} + {opt_or_alt} + S",
    "description": "全部保存",
    "keyword": "save all bao cun quan bu",
    "keys": ["s", "{opt_or_alt}", "{cmd_or_ctrl}"]
},
{
    "title": "关闭 {cmd_or_ctrl} + W",
    "description": "关闭",
    "keyword": "close guan bi",
    "keys": ["w", "{cmd_or_ctrl}"]
},
{
    "title": "全部关闭 {cmd_or_ctrl} + Shift + W",
    "description": "全部关闭",
    "keyword": "close all guan bi quan bu",
    "keys": ["w", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "切换全屏 ctrl + {cmd_or_ctrl} + F",
    "description": "切换全屏",
    "keyword": "toggle fullscreen qie huan quan ping",
    "keys": ["f", "{cmd_or_ctrl}", "ctrl"]
},
{
    "title": "切换编辑器布局（水平/垂直） {opt_or_alt} + {cmd_or_ctrl} + 0",
    "description": "切换编辑器布局（水平/垂直）",
    "keyword": "toggle editor layout (horizontal/vertical) qie huan bian ji qi bu ju (shui ping/chuizhi)",
    "keys": ["0", "{opt_or_alt}", "{cmd_or_ctrl}"]
},
{
    "title": "缩小 {cmd_or_ctrl} + -",
    "description": "缩小",
    "keyword": "zoom out suo xiao",
    "keys": ["-", "{cmd_or_ctrl}"]
},
{
    "title": "放大 {cmd_or_ctrl} + =",
    "description": "放大",
    "keyword": "zoom in fang da",
    "keys": ["=", "{cmd_or_ctrl}"]
},
{
    "title": "切换侧边栏可见性 {cmd_or_ctrl} + Shift + E",
    "description": "切换侧边栏可见性",
    "keyword": "toggle sidebar visibility qie huan ce bian lan ke jian xing",
    "keys": ["e", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "显示资源管理器/切换焦点 {cmd_or_ctrl} + Shift + O",
    "description": "显示资源管理器/切换焦点",
    "keyword": "show explorer/toggle focus xian shi zi yuan guan li qi/qie huan jiao dian",
    "keys": ["o", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "显示搜索 {cmd_or_ctrl} + Shift + F",
    "description": "显示搜索",
    "keyword": "show search xian shi sou suo",
    "keys": ["f", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "切换搜索详情 {cmd_or_ctrl} + Shift + J",
    "description": "切换搜索详情",
    "keyword": "toggle search details qie huan sou suo xiang qing",
    "keys": ["j", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "在文件中替换 {cmd_or_ctrl} + Shift + H",
    "description": "在文件中替换",
    "keyword": "replace in files zai wen jian zhong ti huan",
    "keys": ["h", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "显示源代码管理 ctrl + Shift + G",
    "description": "显示源代码管理",
    "keyword": "show source ctrl xian shi yuan dai ma guan li",
    "keys": ["g", "shift", "ctrl"]
},
{
    "title": "显示输出面板 {cmd_or_ctrl} + Shift + U",
    "description": "显示输出面板",
    "keyword": "show output panel xian shi shu chu mian ban",
    "keys": ["u", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "显示扩展 {cmd_or_ctrl} + Shift + X",
    "description": "显示扩展",
    "keyword": "show extensions xian shi kuo zhan",
    "keys": ["x", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "打开Markdown预览 {cmd_or_ctrl} + Shift + V",
    "description": "打开Markdown预览",
    "keyword": "open markdown preview da kai Markdown yu lan",
    "keys": ["v", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "显示调试 {cmd_or_ctrl} + Shift + D",
    "description": "显示调试",
    "keyword": "show debug xian shi tiao shi",
    "keys": ["d", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "在侧边打开Markdown预览 {cmd_or_ctrl} + K, V",
    "description": "在侧边打开Markdown预览",
    "keyword": "open markdown preview to the side zai ce bian da kai Markdown yu lan",
    "keys": [["k", "{cmd_or_ctrl}"], ["v"]]
},
{
    "title": "切换断点 F9",
    "description": "切换断点",
    "keyword": "toggle breakpoint qiehuan duan dian",
    "keys": ["f9"]
},
{
    "title": "断点/启动/继续 F5",
    "description": "切换断点/启动/继续",
    "keyword": "breakpoint/start/continue duan dian/qidong/jixu",
    "keys": ["f5"]
},
{
    "title": "单步进入 F11",
    "description": "单步进入",
    "keyword": "step into jin ru bu tiao",
    "keys": ["f11"]
},
{
    "title": "单步跳过 F10",
    "description": "单步跳过",
    "keyword": "step over tiao guo bu tiao",
    "keys": ["f10"]
},
{
    "title": "停止 Shift + {cmd_or_ctrl} + F5",
    "description": "停止",
    "keyword": "stop ting zhi",
    "keys": ["f5", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "显示悬停 {cmd_or_ctrl} + K, {cmd_or_ctrl} + I",
    "description": "显示悬停",
    "keyword": "show hover xian shi xuan ting",
    "keys": [["k", "{cmd_or_ctrl}"], ["i", "{cmd_or_ctrl}"]]
},
{
    "title": "显示集成终端 ctrl + `",
    "description": "显示集成终端（手动）",
    "keyword": "show integrated terminal xian shi ji cheng zhong duan",
    "keys": ["~", "ctrl"]
},
{
    "title": "创建新终端 ctrl + Shift + `",
    "description": "创建新终端（手动）",
    "keyword": "create new terminal chuang jian xin zhong duan",
    "keys": ["~", "shift", "ctrl"]
},
{
    "title": "复制选择 {cmd_or_ctrl} + C",
    "description": "复制选择",
    "keyword": "copy selection fu zhi xuan ze",
    "keys": ["c", "{cmd_or_ctrl}"]
},
{
    "title": "向上滚动 {cmd_or_ctrl} + ⬆",
    "description": "向上滚动",
    "keyword": "scroll up shang xiang gun dong",
    "keys": ["up", "{cmd_or_ctrl}"]
},
{
    "title": "向下滚动 {cmd_or_ctrl} + ⬇",
    "description": "向下滚动",
    "keyword": "scroll down xia xiang gun dong",
    "keys": ["down", "{cmd_or_ctrl}"]
},
{
    "title": "滚动到顶部 {cmd_or_ctrl} + Home",
    "description": "滚动到顶部（手动）",
    "keyword": "scroll to top gun dong dao ding bu",
    "keys": ["home", "{cmd_or_ctrl}"]
},
{
    "title": "滚动到底部 {cmd_or_ctrl} + End",
    "description": "滚动到底部（手动）",
    "keyword": "scroll to bottom gun dong dao di bu",
    "keys": ["end", "{cmd_or_ctrl}"]
},
{
    "title": "显示远程菜单 {cmd_or_ctrl} + {opt_or_alt} + O",
    "description": "显示远程菜单",
    "keyword": "show remote menu xianshi yuancheng caidan",
    "keys": ["o", "{cmd_or_ctrl}", "{opt_or_alt}"]
}]

module.exports = shortcutTemplate