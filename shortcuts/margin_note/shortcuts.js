class ShortcutList {

    constructor() {
        this._dir = __dirname
        this._name = "margin_note"
        this._appName = "marginnote 4 marginnote 3"
        this._shortcutData = [
            // 学习集
            {
                "title": "文档 shift + D",
                "description": "文档",
                "keyword": "document wenjian",
                "keys": ["d", "shift"]
            },
            {
                "title": "脑图 shift + M",
                "description": "脑图",
                "keyword": "mind map naotu",
                "keys": ["m", "shift"]
            },
            {
                "title": "卡片 shift + C",
                "description": "卡片",
                "keyword": "card kapian",
                "keys": ["c", "shift"]
            },
            {
                "title": "复习 shift + F",
                "description": "复习",
                "keyword": "review fuxi",
                "keys": ["f", "shift"]
            },
            {
                "title": "研究 shift + S",
                "description": "研究",
                "keyword": "research yanjiu",
                "keys": ["s", "shift"]
            },
            {
                "title": "更多设置 shift + U",
                "description": "更多设置",
                "keyword": "more settings gengduo shezhi",
                "keys": ["u", "shift"]
            },
            {
                "title": "侧边栏 ctrl + command + S",
                "description": "侧边栏",
                "keyword": "sidebar cebianlan",
                "keys": ["s", "ctrl", "command"]
            },
            {
                "title": "全文检索 ctrl + command + F",
                "description": "全文检索",
                "keyword": "full - text search quanwen jiansuo",
                "keys": ["f", "ctrl", "command"]
            },
            {
                "title": "脑图层级 ctrl + command + J",
                "description": "脑图层级",
                "keyword": "mind map level naotu cengji",
                "keys": ["j", "ctrl", "command"]
            },
            {
                "title": "关联文档 ctrl + command + K",
                "description": "关联文档",
                "keyword": "associated document guanlian wenjian",
                "keys": ["k", "ctrl", "command"]
            },
            {
                "title": "文档全屏 shift + G",
                "description": "文档全屏",
                "keyword": "document full - screen wenjian quanping",
                "keys": ["g", "shift"]
            },
            {
                "title": "文档置于左侧 shift + J",
                "description": "文档置于左侧",
                "keyword": "document on the left wenjian zhi yu zuoce",
                "keys": ["j", "shift"]
            },
            {
                "title": "文档置于底部 shift + K",
                "description": "文档置于底部",
                "keyword": "document at the bottom wenjian zhi yu dibu",
                "keys": ["k", "shift"]
            },
            {
                "title": "显示文档标签页 shift + H",
                "description": "显示文档标签页",
                "keyword": "show document tab page xianshi wenjian biaoqianye",
                "keys": ["h", "shift"]
            },
            {
                "title": "添加文档 command + option + F",
                "description": "添加文档",
                "keyword": "add document tianjia wenjian",
                "keys": ["f", "command", "option"]
            },
            {
                "title": "后一个文档 command + option + right",
                "description": "后一个文档",
                "keyword": "next document hou yi ge wenjian",
                "keys": ["right", "command", "option"]
            },
            {
                "title": "前一个文档 command + option + left",
                "description": "前一个文档",
                "keyword": "previous document qian yi ge wenjian",
                "keys": ["left", "command", "option"]
            },
            {
                "title": "双文对照 command + option + S",
                "description": "双文对照",
                "keyword": "bilingual comparison shuangwen duizhao",
                "keys": ["s", "command", "option"]
            },
            {
                "title": "保存对照视图 command + option + D",
                "description": "保存对照视图",
                "keyword": "save comparison view baocun duizhao shituy",
                "keys": ["d", "command", "option"]
            },
            {
                "title": "回忆模式 shift + Z",
                "description": "回忆模式",
                "keyword": "recall mode huiyi moshi",
                "keys": ["z", "shift"]
            },
            {
                "title": "标题链接 command + option + L",
                "description": "标题链接",
                "keyword": "title link biaoti lianjie",
                "keys": ["l", "command", "option"]
            },
            {
                "title": "UI状态URL command + option + O",
                "description": "UI状态URL",
                "keyword": "UI status URL UI zhuangtai URL",
                "keys": ["o", "command", "option"]
            },
            // 文档
            {
                "title": "目录 command + D",
                "description": "目录",
                "keyword": "catalog mulu",
                "keys": ["d", "command"]
            },
            {
                "title": "缩略 shift + command + G",
                "description": "缩略",
                "keyword": "thumbnail suo lve",
                "keys": ["g", "shift", "command"]
            },
            {
                "title": "书签 shift + command + W",
                "description": "书签",
                "keyword": "bookmark shuqian",
                "keys": ["w", "shift", "command"]
            },
            {
                "title": "标注 shift + command + E",
                "description": "标注",
                "keyword": "annotation biaozhu",
                "keys": ["e", "shift", "command"]
            },
            {
                "title": "卡片 shift + command + R",
                "description": "卡片",
                "keyword": "card kapian",
                "keys": ["r", "shift", "command"]
            },
            {
                "title": "搜索 ctrl + F",
                "description": "搜索",
                "keyword": "search sousuo",
                "keys": ["f", "ctrl"]
            },
            {
                "title": "翻页阅读 option + P",
                "description": "翻页阅读",
                "keyword": "page - turning reading fanye yuedu",
                "keys": ["p", "option"]
            },
            {
                "title": "竖向阅读 option + O",
                "description": "竖向阅读",
                "keyword": "vertical reading shuxiang yuedu",
                "keys": ["o", "option"]
            },
            {
                "title": "裁边 shift + command + O",
                "description": "裁边",
                "keyword": "cut edges caibian",
                "keys": ["o", "shift", "command"]
            },
            {
                "title": "转到指定页码 command + P",
                "description": "转到指定页码",
                "keyword": "go to specified page zhuan dao zhi ding ye ma",
                "keys": ["p", "command"]
            },
            {
                "title": "后退 shift + command + Y",
                "description": "后退",
                "keyword": "backward hou tui",
                "keys": ["y", "shift", "command"]
            },
            {
                "title": "前进 shift + command + U",
                "description": "前进",
                "keyword": "forward qianjin",
                "keys": ["u", "shift", "command"]
            },
            {
                "title": "添加书签 command + I",
                "description": "添加书签",
                "keyword": "add bookmark tianjia shuqian",
                "keys": ["i", "command"]
            },
            {
                "title": "删除书签 shift + command + I",
                "description": "删除书签",
                "keyword": "delete bookmark shanchu shuqian",
                "keys": ["i", "shift", "command"]
            },
            {
                "title": "插入/删除PDF页面 command + B",
                "description": "插入/删除PDF页面",
                "keyword": "insert / delete PDF page charu / shanchu PDF yemian",
                "keys": ["b", "command"]
            },
            {
                "title": "目录 shift + W",
                "description": "目录",
                "keyword": "catalog mulu",
                "keys": ["w", "shift"]
            },
            {
                "title": "分割折页 shift + Q",
                "description": "分割折页",
                "keyword": "split and fold pages fen ge zhe ye",
                "keys": ["q", "shift"]
            },
            {
                "title": "留白 E",
                "description": "留白",
                "keyword": "leave blank liubai",
                "keys": ["e"]
            },
            {
                "title": "翻译 T",
                "description": "翻译",
                "keyword": "translate fanyi",
                "keys": ["t"]
            },
            {
                "title": "折页 shift + A",
                "description": "折页",
                "keyword": "fold page zhe ye",
                "keys": ["a", "shift"]
            },
            {
                "title": "回源 shift + command + H",
                "description": "回源",
                "keyword": "return to source hui yuan",
                "keys": ["h", "shift", "command"]
            },
            {
                "title": "文本框 shift + command + J",
                "description": "文本框",
                "keyword": "text box wenbenkuang",
                "keys": ["j", "shift", "command"]
            },
            {
                "title": "图片 shift + command + K",
                "description": "图片",
                "keyword": "picture tupian",
                "keys": ["k", "shift", "command"]
            },
            {
                "title": "选择工具 ctrl + O",
                "description": "选择工具",
                "keyword": "select tool xuanze gongju",
                "keys": ["o", "ctrl"]
            },
            {
                "title": "摘录工具 ctrl + 1",
                "description": "摘录工具1",
                "keyword": "extract tool 1 zhailu gongju 1",
                "keys": ["1", "ctrl"]
            },
            {
                "title": "摘录工具 ctrl + 2",
                "description": "摘录工具2",
                "keyword": "extract tool 2 zhailu gongju 2",
                "keys": ["2", "ctrl"]
            },
            {
                "title": "摘录工具 ctrl + 3",
                "description": "摘录工具3",
                "keyword": "extract tool 3 zhailu gongju 3",
                "keys": ["3", "ctrl"]
            },
            {
                "title": "摘录工具 ctrl + 4",
                "description": "摘录工具4",
                "keyword": "extract tool 4 zhailu gongju 4",
                "keys": ["4", "ctrl"]
            },
            {
                "title": "摘录快捷菜单1 ctrl + 5",
                "description": "摘录快捷菜单1",
                "keyword": "extract shortcut menu 1 zhailu kuaijie caidan 1",
                "keys": ["5", "ctrl"]
            },
            {
                "title": "摘录快捷菜单2 ctrl + 6",
                "description": "摘录快捷菜单2",
                "keyword": "extract shortcut menu 2 zhailu kuaijie caidan 2",
                "keys": ["6", "ctrl"]
            },
            {
                "title": "摘录快捷菜单3 ctrl + 7",
                "description": "摘录快捷菜单3",
                "keyword": "extract shortcut menu 3 zhailu kuaijie caidan 3",
                "keys": ["7", "ctrl"]
            },
            {
                "title": "摘录快捷菜单4 ctrl + 8",
                "description": "摘录快捷菜单4",
                "keyword": "extract shortcut menu 4 zhailu kuaijie caidan 4",
                "keys": ["8", "ctrl"]
            },
            {
                "title": "手写工具 ctrl + 9",
                "description": "手写工具",
                "keyword": "handwriting tool shouxie gongju",
                "keys": ["9", "ctrl"]
            },
            // 脑图
            {
                "title": "卡片分组看板 ctrl + command + M",
                "description": "卡片分组看板",
                "keyword": "card grouping kanban kapian fenzu kanban",
                "keys": ["m", "command", "ctrl"]
            },
            {
                "title": "多选 option + command + M",
                "description": "多选",
                "keyword": "multiple selection duo xuan",
                "keys": ["m", "option", "command"]
            },
            {
                "title": "设为焦点 command + E",
                "description": "设为焦点",
                "keyword": "set as focus she wei jiaodian",
                "keys": ["e", "command"]
            },
            {
                "title": "父级设为焦点 option + command + E",
                "description": "父级设为焦点",
                "keyword": "parent set as focus fu ji she wei jiaodian",
                "keys": ["e", "command", "option"]
            },
            {
                "title": "大纲编辑 option + command + O",
                "description": "大纲编辑",
                "keyword": "outline editing da gang bianji",
                "keys": ["o", "command", "option"]
            },
            {
                "title": "增加缩进 option + tab",
                "description": "增加缩进",
                "keyword": "increase indentation zengjia yinsuo",
                "keys": ["tab", "option"]
            },
            {
                "title": "减少缩进 option + shift + tab",
                "description": "减少缩进",
                "keyword": "decrease indentation jianshao yinsuo",
                "keys": ["tab", "shift", "option"]
            },
            {
                "title": "只显示标题(大纲) command + L",
                "description": "只显示标题(大纲)",
                "keyword": "only show title (outline) zhi xianshi biaoti (da gang)",
                "keys": ["l", "command"]
            },
            {
                "title": "新增兄弟卡片 enter",
                "description": "新增兄弟卡片",
                "keyword": "add new sibling card xin zeng xiongdi kapian",
                "keys": ["enter"]
            },
            {
                "title": "新子卡片 tab",
                "description": "新子卡片",
                "keyword": "new child card xin zi kapian",
                "keys": ["tab"]
            },
            {
                "title": "新父卡片 shift + tab",
                "description": "新父卡片",
                "keyword": "new parent card xin fu kapian",
                "keys": ["tab", "shift"]
            },
            {
                "title": "展开/收起分支 .",
                "description": "展开/收起分支",
                "keyword": "expand / collapse branch zhan kai / shou qi fenzhi",
                "keys": ["."]
            },
            {
                "title": "重组 option + R",
                "description": "重组",
                "keyword": "reorganize chong zu",
                "keys": ["r", "option"]
            },
            {
                "title": "链接 option + L",
                "description": "链接",
                "keyword": "link lianjie",
                "keys": ["l", "option"]
            },
            {
                "title": "合并 option + M",
                "description": "合并",
                "keyword": "merge hebing",
                "keys": ["m", "option"]
            },
            {
                "title": "缩放至合适大小 command + G",
                "description": "缩放至合适大小",
                "keyword": "zoom to fit size suofang zhi heshi daxiao",
                "keys": ["g", "command"]
            },
            {
                "title": "全部展开 ctrl + command + 9",
                "description": "全部展开",
                "keyword": "expand all quanbu zhan kai",
                "keys": ["9", "ctrl", "command"]
            },
            {
                "title": "全部折叠 ctrl + command + 0",
                "description": "全部折叠",
                "keyword": "collapse all quanbu zhe die",
                "keys": ["0", "ctrl", "command"]
            },
            {
                "title": "展开到层级1 command + 1",
                "description": "展开到层级1",
                "keyword": "expand to level 1 zhan kai dao cengji 1",
                "keys": ["1", "command"]
            },
            {
                "title": "展开到层级2 command + 2",
                "description": "展开到层级2",
                "keyword": "expand to level 2 zhan kai dao cengji 2",
                "keys": ["2", "command"]
            },
            {
                "title": "展开到层级3 command + 3",
                "description": "展开到层级3",
                "keyword": "expand to level 3 zhan kai dao cengji 3",
                "keys": ["3", "command"]
            },
            {
                "title": "展开到层级4 command + 4",
                "description": "展开到层级4",
                "keyword": "expand to level 4 zhan kai dao cengji 4",
                "keys": ["4", "command"]
            },
            {
                "title": "展开到层级5 command + 5",
                "description": "展开到层级5",
                "keyword": "expand to level 5 zhan kai dao cengji 5",
                "keys": ["5", "command"]
            },
            {
                "title": "展开到层级6 command + 6",
                "description": "展开到层级6",
                "keyword": "expand to level 6 zhan kai dao cengji 6",
                "keys": ["6", "command"]
            },
            {
                "title": "展开到层级7 command + 7",
                "description": "展开到层级7",
                "keyword": "expand to level 7 zhan kai dao cengji 7",
                "keys": ["7", "command"]
            },
            {
                "title": "展开到层级8 command + 8",
                "description": "展开到层级8",
                "keyword": "expand to level 8 zhan kai dao cengji 8",
                "keys": ["8", "command"]
            },
            {
                "title": "展开 command + 9",
                "description": "展开",
                "keyword": "expand zhan kai",
                "keys": ["9", "command"]
            },
            {
                "title": "折叠 0",
                "description": "折叠",
                "keyword": "collapse zhe die",
                "keys": ["0", "command"]
            },
            {
                "title": "排列 ctrl + command + R",
                "description": "排列",
                "keyword": "arrangepailie",
                "keys": ["r", "ctrl", "command"]
            },
            {
                "title": "只显示标题 shift + command + L",
                "description": "只显示标题",
                "keyword": "only show title zhi xianshi biaoti",
                "keys": ["l", "shift", "command"]
            },
            {
                "title": "选择分支 option + command + B",
                "description": "选择分支",
                "keyword": "select branch xuanze fenzhi",
                "keys": ["b", "option", "command"]
            },
            {
                "title": "显示脑图手写 ctrl + command + G",
                "description": "显示脑图手写",
                "keyword": "show mind map handwriting xianshi naotu shouxie",
                "keys": ["g", "ctrl", "command"]
            },
            {
                "title": "隐藏脑图手写 ctrl + command + H",
                "description": "隐藏脑图手写",
                "keyword": "hide mind map handwriting yincang naotu shouxie",
                "keys": ["h", "ctrl", "command"]
            },
            {
                "title": "分支样式：树形0 shi f t + 1",
                "description": "分支样式：树形0",
                "keyword": "tree shape 0 shuxing 0",
                "keys": ["1", "shift"]
            },
            {
                "title": "分支样式：树形1 shift + 2",
                "description": "分支样式：树形1",
                "keyword": "tree shape 1 shuxing 1",
                "keys": ["2", "shift"]
            },
            {
                "title": "分支样式：树形2 shift + 3",
                "description": "分支样式：树形2",
                "keyword": "tree shape 2 shuxing 2",
                "keys": ["3", "shift"]
            },
            {
                "title": "分支样式：树形3 shift + 4",
                "description": "分支样式：树形3",
                "keyword": "tree shape 3 shuxing 3",
                "keys": ["4", "shift"]
            },
            {
                "title": "分支样式：树形4 shift + 5",
                "description": "分支样式：树形4",
                "keyword": "tree shape 4 shuxing 4",
                "keys": ["5", "shift"]
            },
            {
                "title": "分支样式：直线0 shift + 6",
                "description": "分支样式：直线0",
                "keyword": "straight line 0 zhixian 0",
                "keys": ["6", "shift"]
            },
            {
                "title": "分支样式：直线1 shift + 7",
                "description": "分支样式：直线1",
                "keyword": "straight line 1 zhixian 1",
                "keys": ["7", "shift"]
            },
            {
                "title": "分支样式：直线2 shift + 8",
                "description": "分支样式：直线2",
                "keyword": "straight line 2 zhixian 2",
                "keys": ["8", "shift"]
            },
            {
                "title": "分支样式：双向 shift + 9",
                "description": "分支样式：双向",
                "keyword": "two - way shuangxiang",
                "keys": ["9", "shift"]
            },
            {
                "title": "分支样式：框架 shift + 0",
                "description": "分支样式：框架",
                "keyword": "frame kuangjia",
                "keys": ["0", "shift"]
            },
            {
                "title": "全局分支样式 ctrl + option + G",
                "description": "全局分支样式",
                "keyword": "global branch style quanju fenzhi yangshi",
                "keys": ["g", "option", "ctrl"]
            },
            // 卡片
            {
                "title": "复制卡片克隆 option + ctrl + C",
                "description": "复制卡片克隆",
                "keyword": "copy card clone fuzhi kapian ke long",
                "keys": ["c", "option", "ctrl"]
            },
            {
                "title": "复制卡片引用 ctrl + command + C",
                "description": "复制卡片引用",
                "keyword": "copy card reference fuzhi kapian yinyong",
                "keys": ["c", "ctrl", "command"]
            },
            {
                "title": "复制卡片URL shift + command + C",
                "description": "复制卡片URL",
                "keyword": "copy card URL fuzhi kapian URL",
                "keys": ["c", "command", "shift"]
            },
            {
                "title": "删除 command + delete",
                "description": "删除",
                "keyword": "delete shanchu",
                "keys": ["delete", "command"]
            },
            {
                "title": "颜色",
                "description": "颜色",
                "keyword": "color yan se",
                "keys": []
            },
            {
                "title": "标签 shift + command + T",
                "description": "标签",
                "keyword": "label biao qian",
                "keys": ["t", "shift", "command"]
            },
            {
                "title": "编辑标题 command + enter",
                "description": "编辑标题",
                "keyword": "edit title bian ji biao ti",
                "keys": ["enter", "command"]
            },
            {
                "title": "编辑卡片 N",
                "description": "编辑卡片",
                "keyword": "edit card bian ji ka pian",
                "keys": ["n"]
            },
            {
                "title": "追加批注 option + command + N",
                "description": "追加批注",
                "keyword": "append comment zhui jia pi zhu",
                "keys": ["n", "option", "command"]
            },
            {
                "title": "连续摘录 option + command + K",
                "description": "连续摘录",
                "keyword": "continuous extract lian xu zhai lu",
                "keys": ["k", "option", "command"]
            },
            {
                "title": "文本优先 ctrl + T",
                "description": "文本优先",
                "keyword": "text priority wen ben you xian",
                "keys": ["t", "ctrl"]
            },
            {
                "title": "摘录遮挡 ctrl + O",
                "description": "摘录遮挡",
                "keyword": "extract occlusion zhai lu zhe dang",
                "keys": ["o", "ctrl"]
            },
            {
                "title": "解除合并 ctrl + U",
                "description": "解除合并",
                "keyword": "unmerge jie chu he bing",
                "keys": ["u", "ctrl"]
            },
            {
                "title": "文本转标题 ctrl + I",
                "description": "文本转标题",
                "keyword": "text to title wen ben zhuan biao ti",
                "keys": ["i", "ctrl"]
            },
            {
                "title": "展开留白 ctrl + shift + E",
                "description": "展开留白",
                "keyword": "expand and leave blank zhan kai liu bai",
                "keys": ["e", "ctrl", "shift"]
            },
            {
                "title": "折叠留白 ctrl + shift + R",
                "description": "折叠留白",
                "keyword": "fold and leave blank zhe die liu bai",
                "keys": ["r", "ctrl", "shift"]
            },
            {
                "title": "添加到脑图 ctrl + Q",
                "description": "添加到脑图",
                "keyword": "add to mind map tian jia dao nao tu",
                "keys": ["q", "ctrl"]
            },
            {
                "title": "从脑图中移除 ctrl + W",
                "description": "从脑图中移除",
                "keyword": "remove from mind map cong nao tu zhong yi chu",
                "keys": ["w", "ctrl"]
            },
            {
                "title": "添加到复习 ctrl + A",
                "description": "添加到复习",
                "keyword": "add to review tian jia dao fu xi",
                "keys": ["a", "ctrl"]
            },
            {
                "title": "清除富文本格式 ctrl + B",
                "description": "清除富文本格式",
                "keyword": "clear rich text format qing chu fu wen ben ge shi",
                "keys": ["b", "ctrl"]
            },
            {
                "title": "重置尺寸和字体比例 ctrl + shift + B",
                "description": "重置尺寸和字体比例",
                "keyword": "reset size and font proportion chong zhi chi cun he zi ti bi li",
                "keys": ["b", "ctrl", "shift"]
            },
            {
                "title": "朗读 ctrl + S",
                "description": "朗读",
                "keyword": "read aloud lang du",
                "keys": ["s", "ctrl"]
            },
            {
                "title": "设为标题 ctrl + D",
                "description": "设为标题",
                "keyword": "set as title she wei biao ti",
                "keys": ["d", "ctrl"]
            },
            {
                "title": "加为评论 ctrl + F",
                "description": "加为评论",
                "keyword": "add as comment jia wei ping lun",
                "keys": ["f", "ctrl"]
            },
            {
                "title": "划重点/填空 ctrl + E",
                "description": "划重点/填空",
                "keyword": "mark key points / fill in the blanks hua zhong dian / tian kong",
                "keys": ["e", "ctrl"]
            },
            {
                "title": "合并到 ctrl + R",
                "description": "合并到",
                "keyword": "merge to he bing dao",
                "keys": ["r", "ctrl"]
            },
            {
                "title": "浅黄 ctrl + option + 1",
                "description": "浅黄",
                "keyword": "light yellow qian huang",
                "keys": ["1", "option", "ctrl"]
            },
            {
                "title": "浅绿 ctrl + option + 2",
                "description": "浅绿",
                "keyword": "light green qian lv",
                "keys": ["2", "option", "ctrl"]
            },
            {
                "title": "浅蓝 ctrl + option + 3",
                "description": "浅蓝",
                "keyword": "light blue qian lan",
                "keys": ["3", "option", "ctrl"]
            },
            {
                "title": "浅红 ctrl + option + 4",
                "description": "浅红",
                "keyword": "light red qian hong",
                "keys": ["4", "option", "ctrl"]
            },
            {
                "title": "黄 ctrl + option + 5",
                "description": "黄",
                "keyword": "yellow huang",
                "keys": ["5", "option", "ctrl"]
            },
            {
                "title": "绿 ctrl + option + 6",
                "description": "绿",
                "keyword": "green lv",
                "keys": ["6", "option", "ctrl"]
            },
            {
                "title": "蓝 ctrl + option + 7",
                "description": "蓝",
                "keyword": "blue lan",
                "keys": ["7", "option", "ctrl"]
            },
            {
                "title": "红 ctrl + option + 8",
                "description": "红",
                "keyword": "red hong",
                "keys": ["8", "option", "ctrl"]
            },
            {
                "title": "橘 ctrl + option + 9",
                "description": "橘",
                "keyword": "orange ju",
                "keys": ["9", "option", "ctrl"]
            },
            {
                "title": "深绿 ctrl + option + 0",
                "description": "深绿",
                "keyword": "dark green shen lv",
                "keys": ["0", "option", "ctrl"]
            },
            {
                "title": "深蓝 ctrl + option + Q",
                "description": "深蓝",
                "keyword": "dark blue shen lan",
                "keys": ["q", "option", "ctrl"]
            },
            {
                "title": "深红 ctrl + option + W",
                "description": "深红",
                "keyword": "dark red shen hong",
                "keys": ["w", "option", "ctrl"]
            },
            {
                "title": "白 ctrl + option + E",
                "description": "白",
                "keyword": "white bai",
                "keys": ["e", "option", "ctrl"]
            },
            {
                "title": "浅灰 ctrl + option + R",
                "description": "浅灰",
                "keyword": "light gray qian hui",
                "keys": ["r", "option", "ctrl"]
            },
            {
                "title": "深灰 ctrl + option + T",
                "description": "深灰",
                "keyword": "dark gray shen hui",
                "keys": ["t", "option", "ctrl"]
            },
            {
                "title": "紫 ctrl + option + Y",
                "description": "紫",
                "keyword": "purple zi",
                "keys": ["y", "option", "ctrl"]
            },
            // 复习
            {
                "title": "开始复习 shift + P",
                "description": "开始复习",
                "keyword": "start review kaishi fuxi",
                "keys": ["p", "shift"]
            },
            {
                "title": "停止复习 shift + option + P",
                "description": "停止复习",
                "keyword": "stop review tingzhi fuxi",
                "keys": ["p", "shift", "option"]
            },
            {
                "title": "翻转 space",
                "description": "翻转",
                "keyword": "flip fanzhuan",
                "keys": ["space"]
            },
            {
                "title": "查看出处 S",
                "description": "查看出处",
                "keyword": "check source chakan chuchu",
                "keys": ["s"]
            },
            {
                "title": "重复 1",
                "description": "重复",
                "keyword": "repeat chongfu",
                "keys": ["1"]
            },
            {
                "title": "难 2",
                "description": "难",
                "keyword": "difficult nan",
                "keys": ["2"]
            },
            {
                "title": "中 3",
                "description": "中",
                "keyword": "medium zhong",
                "keys": ["3"]
            },
            {
                "title": "易 4",
                "description": "易",
                "keyword": "easy yi",
                "keys": ["4"]
            },
            {
                "title": "星标 option + command + 1",
                "description": "星标",
                "keyword": "star mark xingbiao",
                "keys": ["1", "option", "command"]
            },
            // 格式
            {
                "title": "显示字体 command + T",
                "description": "显示字体",
                "keyword": "show font xianshi ziti",
                "keys": ["t", "command"]
            },
            {
                "title": "下划线 command + U",
                "description": "下划线",
                "keyword": "underline xia huaxian",
                "keys": ["u", "command"]
            },
            {
                "title": "较大 command + +",
                "description": "较大",
                "keyword": "larger jiaoda",
                "keys": ["+", "command"]
            },
            {
                "title": "较小 command + -",
                "description": "较小",
                "keyword": "smaller xiaojiao",
                "keys": ["-", "command"]
            },
            {
                "title": "粘贴样式 option + command + V",
                "description": "粘贴样式",
                "keyword": "paste style zhan tie yangshi",
                "keys": ["v", "option", "command"]
            },
            {
                "title": "左对齐 command + {",
                "description": "左对齐",
                "keyword": "left align zuo duiqi",
                "keys": ["{", "command"]
            },
            {
                "title": "居中 command + |",
                "description": "居中",
                "keyword": "center ju zhong",
                "keys": ["|", "command"]
            },
            {
                "title": "右对齐 command + }",
                "description": "右对齐",
                "keyword": "right align you duiqi",
                "keys": ["}", "command"]
            },
            // 文件
            {
                "title": "新建 command + N",
                "description": "新建",
                "keyword": "new xinjian",
                "keys": ["n", "command"]
            },
            {
                "title": "打开... command + O",
                "description": "打开...",
                "keyword": "open... kaidan",
                "keys": ["o", "command"]
            },
            {
                "title": "关闭 command + W",
                "description": "关闭",
                "keyword": "close guanbi",
                "keys": ["w", "command"]
            },
            // 其他
            {
                "title": "在左侧显示目录 command + D command + D",
                "description": "在左侧显示目录",
                "keyword": "left content index mulu",
                "keys": [["d", "command"], ["d", "command"]]
            },
            {
                "title": "拖动脑图 space + 鼠标左键拖动",
                "description": "拖动脑图，按住空格键不放，同时用鼠标拖动（手动）",
                "keyword": "drag mindmap tuodong naotu",
                "keys": []
            }

        ]
    }

    get() {
        if (!utools.isMacOs()) {
            return []
        }
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name} ${this._appName}`
            sc['icon'] = `shortcuts/${this._name}/margin_note.webp`
        }
        return this._shortcutData
    }

    name() {
        return this._name
    }
}

module.exports = new ShortcutList()