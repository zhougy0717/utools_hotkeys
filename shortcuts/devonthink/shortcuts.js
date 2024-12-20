class ShortcutList {

    constructor() {
        this._name = 'devonthink'
        this._shortName = 'devonthink 3'
        this._dir = __dirname
        this._shortcutData = [
            // Part：View menu
            {
                "title": "Sidebar - Navigate command + option + 1",
                "description": "在侧边栏中导航",
                "keyword": "sidebar navigate ce bian lan dao hang",
                "keys": ["1", "command", "option"]
            },
            {
                "title": "Sidebar - Reading List command + option + 2",
                "description": "打开阅读列表（在侧边栏）",
                "keyword": "sidebar reading list ce bian lan da kai yue du lie biao",
                "keys": ["2", "command", "option"]
            },
            {
                "title": "Sidebar - Import command + option + 3",
                "description": "在侧边栏进行导入操作",
                "keyword": "sidebar import ce bian lan jin xing dao ru cao zuo",
                "keys": ["3", "command", "option"]
            },
            {
                "title": "Sidebar - Extras command + option + 4",
                "description": "在侧边栏查看额外内容",
                "keyword": "sidebar extras ce bian lan cha kan e wai nei rong",
                "keys": ["4", "command", "option"]
            },
            {
                "title": "View - as Icons command + 1",
                "description": "以图标形式查看",
                "keyword": "view as icons yi tu biao xing shi cha kan",
                "keys": ["1", "command"]
            },
            {
                "title": "View - as List command + 2",
                "description": "以列表形式查看",
                "keyword": "view as list yi lie biao xing shi cha kan",
                "keys": ["2", "command"]
            },
            {
                "title": "View - as Columns command + 3",
                "description": "以列形式查看",
                "keyword": "view as columns yi lie xing shi cha kan",
                "keys": ["3", "command"]
            },
            {
                "title": "View - Cover Flow command + 4",
                "description": "以Cover Flow形式查看",
                "keyword": "view cover flow yi Cover Flow xing shi cha kan",
                "keys": ["4", "command"]
            },
            {
                "title": "Preview - None command + 5",
                "description": "无预览模式",
                "keyword": "preview none wu yu lan mo shi",
                "keys": ["5", "command"]
            },
            {
                "title": "Preview - Standard command + 6",
                "description": "标准预览模式",
                "keyword": "preview standard biao zhun yu lan mo shi",
                "keys": ["6", "command"]
            },
            {
                "title": "Preview - Widescreen command + 7",
                "description": "宽屏预览模式",
                "keyword": "preview widescreen kuan ping yu lan mo shi",
                "keys": ["7", "command"]
            },
            {
                "title": "Quick Look command + Y",
                "description": "快速查看当前文件",
                "keyword": "quick look kuai su cha kan z",
                "keys": ["y", "command"]
            },
            {
                "title": "Quick Look - Show Tags command + T",
                "description": "在快速查看中显示标签",
                "keyword": "quick look show tags zai kuai su cha kan zhong xian shi biao qian",
                "keys": ["t", "command"]
            },
            {
                "title": "Quick Look - Show Details command + option + L",
                "description": "在快速查看中显示详情",
                "keyword": "quick look show details zai kuai su cha kan zhong xian shi xiang qing",
                "keys": ["l", "command", "option"]
            },
            {
                "title": "Quick Look - Show Only Documents command + ctrl + option + D",
                "description": "在快速查看中仅显示文档",
                "keyword": "quick look show only documents zai kuai su cha kan zhong jin xian shi wen dang",
                "keys": ["d", "command", "ctrl", "option"]
            },
            {
                "title": "Actual Size command + 0",
                "description": "恢复实际大小",
                "keyword": "actual size hui fu shi ji da xiao",
                "keys": ["0", "command"]
            },
            {
                "title": "All Pixels shift + command + X",
                "description": "显示所有像素",
                "keyword": "all pixels xian shi suo you xiang su",
                "keys": ["x", "shift", "command"]
            },
            {
                "title": "Zoom In ctrl + command + +",
                "description": "放大",
                "keyword": "zoom in fang da",
                "keys": ["+", "ctrl", "command"]
            },
            {
                "title": "Zoom Out ctrl + command + -",
                "description": "缩小",
                "keyword": "zoom out suo xiao",
                "keys": ["-", "ctrl", "command"]
            },
            {
                "title": "Zoom To Fit command + =",
                "description": "缩放以适应",
                "keyword": "zoom to fit suo fang yi shi ying",
                "keys": ["=", "command"]
            },
            {
                "title": "Zoom To Width ctrl + command + W",
                "description": "缩放至宽度",
                "keyword": "zoom to width suo fang zhi kuan du",
                "keys": ["w", "ctrl", "command"]
            },
            // Part：Go menu
            {
                "title": "Previous Database option + command + R",
                "description": "切换到上一个数据库",
                "keyword": "previous database qie huan dao shang yi ge shu ju ku",
                "keys": ["r", "option", "command"]
            },
            {
                "title": "Next Database option + command + E",
                "description": "切换到下一个数据库",
                "keyword": "next database qie huan dao xia yi ge shu ju ku",
                "keys": ["e", "option", "command"]
            },
            {
                "title": "Top Group option + command + Up",
                "description": "跳转到第一个组",
                "keyword": "top group tiao zhuan dao diyige zu",
                "keys": ["up", "option", "command"]
            },
            {
                "title": "Enclosing Group option + command + Down",
                "description": "跳转到包含组",
                "keyword": "enclosing group tiao zhuan dao bao han zu",
                "keys": ["down", "option", "command"]
            },
            {
                "title": "Selected Group option + command + Option + Down",
                "description": "跳转到所选组",
                "keyword": "selected group tiao zhuan dao suo xuan zu",
                "keys": ["down", "option", "option", "command"]
            },
            {
                "title": "First Document ctrl + command + Home",
                "description": "跳转到第一个文档",
                "keyword": "first document tiao zhuan dao di yi ge wen dang",
                "keys": ["home", "ctrl", "command"]
            },
            {
                "title": "Previous Document ctrl + command + Page Up",
                "description": "跳转到上一个文档",
                "keyword": "previous document tiao zhuan dao shang yi ge wen dang",
                "keys": ["page up", "ctrl", "command"]
            },
            {
                "title": "Next Document ctrl + command + Page Down",
                "description": "跳转到下一个文档",
                "keyword": "next document tiao zhuan dao xia yi ge wen dang",
                "keys": ["page down", "ctrl", "command"]
            },
            {
                "title": "Last Document ctrl + command + End",
                "description": "跳转到最后一个文档",
                "keyword": "last document tiao zhuan dao zui hou yi ge wen dang",
                "keys": ["end", "ctrl", "command"]
            },
            {
                "title": "To Group... ctrl + command + G",
                "description": "跳转到组...",
                "keyword": "to group... tiao zhuan dao zu...",
                "keys": ["g", "command", "ctrl"]
            },
            {
                "title": "To Document... ctrl + command + O",
                "description": "跳转到文档...",
                "keyword": "to document... tiao zhuan dao wen dang...",
                "keys": ["o", "ctrl", "command"]
            },
            {
                "title": "To Page... option + shift + command + P",
                "description": "跳转到页面...",
                "keyword": "to page... tiao zhuan dao ye mian...",
                "keys": ["p", "option", "shift", "command"]
            },
            {
                "title": "To Link shift + command + enter",
                "description": "跳转到链接",
                "keyword": "to link tiao zhuan dao lian jie",
                "keys": ["enter", "shift", "command"]
            },
            {
                "title": "Back command + [",
                "description": "后退",
                "keyword": "back hou tui",
                "keys": ["[", "command"]
            },
            {
                "title": "Forward command + ]",
                "description": "前进",
                "keyword": "forward qian jin",
                "keys": ["]", "command"]
            },
            {
                "title": "Previous Instance option + command + left",
                "description": "切换到上一个实例",
                "keyword": "previous instance qie huan dao shang yi ge shi li",
                "keys": ["left", "option", "command"]
            },
            {
                "title": "Next Instance option + command + right",
                "description": "切换到下一个实例",
                "keyword": "next instance qie huan dao xia yi ge shi li",
                "keys": ["right", "option", "command"]
            },
            {
                "title": "Previous Highlight option + command + left",
                "description": "跳转到上一个高亮处",
                "keyword": "previous highlight tiao zhuan dao shang yi ge gao liang chu",
                "keys": ["left", "option", "command"]
            },
            {
                "title": "Next Highlight option + command + right",
                "description": "跳转到下一个高亮处",
                "keyword": "next highlight tiao zhuan dao xia yi ge gao liang chu",
                "keys": ["right", "option", "command"]
            },
            {
                "title": "Next Unread Item command + enter",
                "description": "跳转到下一个未读项",
                "keyword": "next unread item tiao zhuan dao xia yi ge wei du xiang",
                "keys": ["enter", "command"]
            },
            {
                "title": "Complete News option + command + enter",
                "description": "标记新闻为已读",
                "keyword": "complete news biao ji xin wen wei yi du",
                "keys": ["enter", "option", "command"]
            },
            {
                "title": "Move Focus to Sidebar ctrl + option + command + S",
                "description": "将焦点移到侧边栏",
                "keyword": "move focus to sidebar jiang jiao dian yi dao ce bian lan",
                "keys": ["s", "ctrl", "command", "option"]
            },
            {
                "title": "Move Focus to View ctrl + command + V",
                "description": "将焦点移到视图",
                "keyword": "move focus to view jiang jiao dian yi dao shi tu",
                "keys": ["v", "ctrl", "command"]
            },
            {
                "title": "Move Focus to Preview ctrl + command + P",
                "description": "将焦点移到预览",
                "keyword": "move focus to preview jiang jiao dian yi dao yu lan",
                "keys": ["p", "ctrl", "command"]
            },
            {
                "title": "Move Focus to Inspector ctrl + command + I",
                "description": "将焦点移到检查器",
                "keyword": "move focus to inspector jiang jiao dian yi dao jian cha qi",
                "keys": ["i", "ctrl", "command"]
            },
            // Part：Data menu
            {
                "title": "Open command + O",
                "description": "打开",
                "keyword": "open da kai",
                "keys": ["o", "command"]
            },
            {
                "title": "Launch URL ctrl + command + U",
                "description": "打开URL",
                "keyword": "launch URL da kai URL",
                "keys": ["u", "command", "ctrl"]
            },
            {
                "title": "Reveal in Finder command + R",
                "description": "Reveal",
                "keyword": "reveal",
                "keys": ["r", "command"]
            },
            {
                "title": "Save command + S",
                "description": "保存",
                "keyword": "save bao cun",
                "keys": ["s", "command"]
            },
            {
                "title": "Duplicate command + D",
                "description": "复制",
                "keyword": "duplicate fu zhi",
                "keys": ["d", "command"]
            },
            {
                "title": "Move To... command + M",
                "description": "移动到...",
                "keyword": "move to... yi dong dao...",
                "keys": ["m", "command"]
            },
            {
                "title": "再次移动到上一个位置 again command + shift + T",
                "description": "再次移动到上一个位置",
                "keyword": "move to again zai ci yi dong dao",
                "keys": ["t", "command", "shift"]
            },
            {
                "title": "Move to Trash command + backspace",
                "description": "移到废纸篓",
                "keyword": "move to trash yi dao fei zhi lou",
                "keys": ["backspace", "command"]
            },
            {
                "title": "Group Items option + command + G",
                "description": "创建分组",
                "keyword": "group fenzu",
                "keys": ["g", "command", "option"]
            },
            {
                "title": "Ungroup Items option + command + U",
                "description": "解散分组",
                "keyword": "ungroup fenzu jiesan",
                "keys": ["u", "command", "option"]
            },
            {
                "title": "使用剪贴板内容创建 command + N",
                "description": "使用剪贴板内容创建",
                "keyword": "new create with clipboard yong jian tie ban xin",
                "keys": ["n", "command"]
            },
            {
                "title": "Rich Text ctrl + command + N",
                "description": "创建富文本",
                "keyword": "rich text fu wen ben",
                "keys": ["n", "command", "ctrl"]
            },
            {
                "title": "Plain Text ctrl + option + command + N",
                "description": "创建纯文本",
                "keyword": "plain text shi chun wen ben",
                "keys": ["n", "command", "ctrl", "option"]
            },
            {
                "title": "Group command + shift + G",
                "description": "分组",
                "keyword": "group fen zu",
                "keys": ["g", "command", "shift"]
            },
            {
                "title": "As Flagged command + option + K",
                "description": "标记为已标记",
                "keyword": "as flagged biao ji wei yi biao ji",
                "keys": ["k", "command", "option"]
            },
            {
                "title": "As Unread command + K",
                "description": "标记为未读",
                "keyword": "as unread biao ji wei wei du",
                "keys": ["k", "command"]
            },
            {
                "title": "As Locked command + ctrl + K",
                "description": "标记为已锁定",
                "keyword": "as locked biao ji wei yi suo ding",
                "keys": ["k", "command", "ctrl"]
            },
            // Part: Format
            {
                "title": "Make Rich text shift + command + T",
                "description": "转换为富文本",
                "keyword": "make rich text zhuan huan wei fu wen ben",
                "keys": ["t", "command", "shift"]
            },
            {
                "title": "Highlight shift + command + L",
                "description": "高亮",
                "keyword": "highlight gao liang",
                "keys": ["l", "command", "shift"]
            },
            {
                "title": "Make Link shift + command + M",
                "description": "创建链接",
                "keyword": "make link chuang jian lian jie",
                "keys": ["m", "command"]
            },
            {
                "title": "Show Fonts command + T",
                "description": "显示字体",
                "keyword": "show fonts xian shi zi ti",
                "keys": ["t", "command"]
            },
            {
                "title": "Copy Font option + command + C",
                "description": "复制字体",
                "keyword": "copy font fu zhi zi ti",
                "keys": ["c", "command", "option"]
            },
            {
                "title": "Paste Font option + command + V",
                "description": "粘贴字体",
                "keyword": "paste font zhan tie zi ti",
                "keys": ["v", "command", "option"]
            },
            {
                "title": "Bold command + B",
                "description": "加粗",
                "keyword": "bold jia cu",
                "keys": ["b", "command"]
            },
            {
                "title": "Italic command + I",
                "description": "倾斜",
                "keyword": "italic qing xie",
                "keys": ["i", "command"]
            },
            {
                "title": "Underline command + U",
                "description": "下划线",
                "keyword": "underline xia hua xian",
                "keys": ["u", "command"]
            },
            {
                "title": "Strike Through ctrl + command + S",
                "description": "删除线",
                "keyword": "strike through shan chu xian",
                "keys": ["s", "command"]
            },
            {
                "title": "Align Left ctrl + option + command + L",
                "description": "左对齐",
                "keyword": "align left zuo dui qi",
                "keys": ["l", "command", "option", "ctrl"]
            },
            {
                "title": "Align Right ctrl + option + command + R",
                "description": "右对齐",
                "keyword": "align right you dui qi",
                "keys": ["r", "command", "option", "ctrl"]
            },
            {
                "title": "Show Ruler command + shift + R",
                "description": "显示标尺",
                "keyword": "show ruler xian shi biao chi",
                "keys": ["r", "command", "shift"]
            },
            {
                "title": "Copy Ruler command + ctrl + C",
                "description": "复制标尺",
                "keyword": "copy ruler fu zhi biao chi",
                "keys": ["c", "command", "ctrl"]
            },
            {
                "title": "Paste Ruler command + ctrl + V",
                "description": "粘贴标尺",
                "keyword": "paste ruler zhan tie biao chi",
                "keys": ["v", "command", "ctrl"]
            },
            {
                "title": "Show Format Bar command + shift + F",
                "description": "显示格式栏",
                "keyword": "show format bar xian shi ge shi lan",
                "keys": ["f", "command", "shift"]
            },
            {
                "title": "Hide Editing Bar command + shift + E",
                "description": "隐藏编辑栏",
                "keyword": "hide editing bar yin cang bian ji lan",
                "keys": ["e", "command", "shift"]
            },
            {
                "title": "Bigger command + +",
                "description": "放大",
                "keyword": "bigger fang da",
                "keys": ["+", "command"]
            },
            {
                "title": "Smaller command + -",
                "description": "缩小",
                "keyword": "smaller suo xiao",
                "keys": ["-", "command"]
            },
            // Part: Tools
            {
                "title": "Get Info command + I",
                "description": "获取信息",
                "keyword": "get info huo qu xin xi",
                "keys": ["i", "command"]
            },
            {
                "title": "Hide option + command + H",
                "description": "隐藏",
                "keyword": "hide yin cang",
                "keys": ["h", "command", "option"]
            },
            {
                "title": "Generic ctrl + 1",
                "description": "通用",
                "keyword": "generic tong yong",
                "keys": ["1", "ctrl"]
            },
            {
                "title": "Properties ctrl + P",
                "description": "属性",
                "keyword": "properties shu xing",
                "keys": ["p", "ctrl"]
            },
            {
                "title": "Annotations & Reminders ctrl + 2",
                "description": "注释与提醒",
                "keyword": "annotations & reminders zhu shi yu ti xing",
                "keys": ["2", "ctrl"]
            },
            {
                "title": "Table of Contents ctrl + 3",
                "description": "目录",
                "keyword": "table of contents mu lu",
                "keys": ["3", "ctrl"]
            },
            {
                "title": "Thumbnails ctrl + 4",
                "description": "缩略图",
                "keyword": "thumbnails suo lue tu",
                "keys": ["4", "ctrl"]
            },
            {
                "title": "Annotations ctrl + 5",
                "description": "注释",
                "keyword": "annotations zhu shi",
                "keys": ["5", "ctrl"]
            },
            {
                "title": "Attachments ctrl + 6",
                "description": "附件",
                "keyword": "attachments fu jian",
                "keys": ["6", "ctrl"]
            },
            {
                "title": "Links ctrl + 7",
                "description": "链接",
                "keyword": "links lian jie",
                "keys": ["7", "ctrl"]
            },
            {
                "title": "Mentions ctrl + 8",
                "description": "提及",
                "keyword": "mentions ti ji",
                "keys": ["8", "ctrl"]
            },
            {
                "title": "List ctrl + 9",
                "description": "列表",
                "keyword": "list lie biao",
                "keys": ["9", "ctrl"]
            },
            {
                "title": "See Also & Classify ctrl + S",
                "description": "查看相关与分类",
                "keyword": "see also & classify cha kan xiang guan yu fen lei",
                "keys": ["s", "ctrl"]
            },
            {
                "title": "Search ctrl + U",
                "description": "搜索",
                "keyword": "search sou suo",
                "keys": ["u", "ctrl"]
            },
            {
                "title": "Info ctrl + I",
                "description": "信息",
                "keyword": "info xin xi",
                "keys": ["i", "ctrl"]
            },
            {
                "title": "Tags ctrl + T",
                "description": "标签",
                "keyword": "tags biao qian",
                "keys": ["t", "ctrl"]
            },
            {
                "title": "Multimedia ctrl + M",
                "description": "多媒体",
                "keyword": "multimedia duo mei ti",
                "keys": ["m", "ctrl"]
            },
            {
                "title": "Maps ctrl + G",
                "description": "地图",
                "keyword": "maps di tu",
                "keys": ["g", "ctrl"]
            },
            {
                "title": "Rotate Right command + ctrl + R",
                "description": "向右旋转",
                "keyword": "rotate right xiang you xuan zhuan",
                "keys": ["r", "command", "ctrl"]
            },
            {
                "title": "Rotate Left command + ctrl + L",
                "description": "向左旋转",
                "keyword": "rotate left xiang zuo xuan zhuan",
                "keys": ["l", "command", "ctrl"]
            },
            {
                "title": "Batch Process... command + ctrl + B",
                "description": "批量处理...",
                "keyword": "batch process... pi liang chu li...",
                "keys": ["b", "command", "ctrl"]
            },
            // Part: Edit
            {
                "title": "Undo command + Z",
                "description": "撤销",
                "keyword": "undo che xiao",
                "keys": ["z", "command"]
            },
            {
                "title": "Redo command + shift + Z",
                "description": "重做",
                "keyword": "redo zhong zuo",
                "keys": ["z", "command", "shift"]
            },
            {
                "title": "Cut command + X",
                "description": "剪切",
                "keyword": "cut jian qie",
                "keys": ["x", "command"]
            },
            {
                "title": "Copy command + C",
                "description": "复制",
                "keyword": "copy fu zhi",
                "keys": ["c", "command"]
            },
            {
                "title": "Copy with Source Link command + shift + C",
                "description": "复制并包含源链接",
                "keyword": "copy with source link fu zhi bing bao han yuan lian jie",
                "keys": ["c", "command", "shift"]
            },
            {
                "title": "Paste command + V",
                "description": "粘贴",
                "keyword": "paste zhan tie",
                "keys": ["v", "command"]
            },
            {
                "title": "Paste with Source Link command + shift + V",
                "description": "粘贴并包含源链接",
                "keyword": "paste with source link zhan tie bing bao han yuan lian jie",
                "keys": ["v", "command", "shift"]
            },
            {
                "title": "Paste and Match Style command + option + shift + V",
                "description": "粘贴并匹配样式",
                "keyword": "paste and match style zhan tie bing pi pei yang shi",
                "keys": ["v", "option", "shift", "command"]
            },
            {
                "title": "Complete command + enter",
                "description": "完成",
                "keyword": "complete wan cheng",
                "keys": ["enter", "command"]
            },
            {
                "title": "Select All command + A",
                "description": "全选",
                "keyword": "select all quan xuan",
                "keys": ["a", "command"]
            },
            {
                "title": "Tags... ctrl + enter",
                "description": "标签...",
                "keyword": "tags... biao qian...",
                "keys": ["t", "ctrl"]
            },
            {
                "title": "Set Name As command + ctrl + I",
                "description": "设置名称为",
                "keyword": "set name as she zhi ming cheng wei",
                "keys": ["i", "command", "ctrl"]
            },
            {
                "title": "在数据库中查找 command + option + F",
                "description": "在数据库中查找",
                "keyword": "find in database zai shu ju ku zhong chazhao",
                "keys": ["f", "command", "option"]
            },
            {
                "title": "当前组查找 command + F",
                "description": "当前组查找",
                "keyword": "find gourp cha zhao",
                "keys": ["f", "command"]
            },
            {
                "title": "Find Next command + G",
                "description": "查找下一个",
                "keyword": "find next cha zhao xia yi ge",
                "keys": ["g", "command"]
            },
            {
                "title": "Find Previous command + shift + G",
                "description": "查找上一个",
                "keyword": "find previous cha zhao shang yi ge",
                "keys": ["g", "command", "shift"]
            },
            {
                "title": "Use Selection for Find command + E",
                "description": "使用所选内容进行查找",
                "keyword": "use selection for find shi yong suo xuan nei rong jin xing cha zhao",
                "keys": ["e", "command"]
            },
            {
                "title": "Scroll to Selection command + J",
                "description": "滚动到所选内容",
                "keyword": "scroll to selection gun dong dao suo xuan nei rong",
                "keys": ["j", "command"]
            },
            {
                "title": "Bullet command + shift + B",
                "description": "添加项目符号",
                "keyword": "bullet tian jia xiang mu fu hao",
                "keys": ["b", "command", "shift"]
            },
            {
                "title": "Date command + shift + D",
                "description": "插入日期",
                "keyword": "date cha ru ri qi",
                "keys": ["d", "command", "shift"]
            },
            {
                "title": "Item Link... command + ctrl + E",
                "description": "插入项目链接...",
                "keyword": "item link... cha ru xiang mu lian jie...",
                "keys": ["e", "command", "ctrl"]
            },
            {
                "title": "Copy Item Link ctrl + option + command + C",
                "description": "复制项目链接",
                "keyword": "copy item link fu zhi xiang mu lian jie",
                "keys": ["c", "command", "ctrl", "option"]
            },
            // Part: File
            {
                "title": "Index Files and Folders... command + option + X",
                "description": "索引文件和文件夹...",
                "keyword": "index files and folders... suo yin wen jian he wen jian jia...",
                "keys": ["x", "command", "option"]
            },
            {
                "title": "Update Items command + shift + S",
                "description": "更新项目",
                "keyword": "update items geng xin xiang mu",
                "keys": ["s", "command", "option"]
            },
            {
                "title": "Synchronize Database command + option + S",
                "description": "同步数据库",
                "keyword": "synchronize database tong bu shu ju ku",
                "keys": ["s", "command", "option"]
            },
            {
                "title": "Database Properties... command + option + P",
                "description": "数据库属性...",
                "keyword": "database properties... shu ju ku shu xing...",
                "keys": ["p", "command", "option"]
            },
            {
                "title": "Verify & Repair Database command + shift + Y",
                "description": "验证和修复数据库",
                "keyword": "verify & repair database yan zheng he xiu fu shu ju ku",
                "keys": ["y", "command", "shift"]
            },
            {
                "title": "Check File Integrity ctrl + command + shift + Y",
                "description": "检查文件完整性",
                "keyword": "check file integrity jian cha wen jian wan zheng xing",
                "keys": ["y", "command", "shift", "ctrl"]
            },
            {
                "title": "Optimize Database command + shift + K",
                "description": "优化数据库",
                "keyword": "optimize database you hua shu ju ku",
                "keys": ["k", "command", "shift"]
            },
            {
                "title": "Page Setup... command + shift + P",
                "description": "页面设置...",
                "keyword": "page setup... ye mian she zhi...",
                "keys": ["p", "command", "shift"]
            },
            {
                "title": "Print... command + P",
                "description": "打印...",
                "keyword": "print... da yin...",
                "keys": ["p", "command"]
            },
            {
                "title": "Close All command + shift + W",
                "description": "全部关闭",
                "keyword": "close all quan bu guan bi",
                "keys": ["w", "command", "shift"]
            },
            {
                "title": "关闭组 ctrl + command + shift + W",
                "description": "全部关闭",
                "keyword": "close group guanbi zu",
                "keys": ["w", "command", "shift", "ctrl"]
            },
            // Part: Window
            {
                "title": "关闭窗口 shift + command + W",
                "description": "关闭窗口",
                "keyword": "close guan bi window chuangkou",
                "keys": ["w", "command", "shift"]
            },
            {
                "title": "Minimize command + M",
                "description": "最小化",
                "keyword": "minimize zui xiao hua",
                "keys": ["m", "command"]
            },
            {
                "title": "New Tab ctrl + command + ,",
                "description": "新建标签页",
                "keyword": "new tab xin jian biao qian ye",
                "keys": [",", "command", "ctrl"]
            },
            {
                "title": "Close Tab command + W",
                "description": "关闭标签页",
                "keyword": "close tab guan bi biao qian ye",
                "keys": ["w", "command"]
            },
            {
                "title": "Select Next Tab command + }",
                "description": "选择下一个标签页",
                "keyword": "select next tab xuan ze xia yi ge biao qian ye",
                "keys": ["}", "command"]
            },
            {
                "title": "Select Previous Tab command + {",
                "description": "选择上一个标签页",
                "keyword": "select previous tab xuan ze shang yi ge biao qian ye",
                "keys": ["{", "command"]
            },
            {
                "title": "Activity command + option + A",
                "description": "活动",
                "keyword": "activity huo dong",
                "keys": ["a", "command", "option"]
            }
        ];
        console.log(`${this._dir}`)
    }

    get() {
        if (!utools.isMacOS()) {
            return []
        }
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._shortName} ${this._appName}`
            sc['icon'] = `shortcuts/${this._name}/devonthink.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()