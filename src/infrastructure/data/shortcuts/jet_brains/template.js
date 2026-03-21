let shortcutTemplate = [
{
    "title": "光标移动到行首 {cmd_or_ctrl} + left",
    "description": "光标移动到行首/行尾",
    "keyword": "cursor move to line start guangbiao yidong dao xing shou",
    "keys": ["left", "{cmd_or_ctrl}"]
},
{
    "title": "光标移动到行尾 {cmd_or_ctrl} + right",
    "description": "光标移动到行首/行尾",
    "keyword": "cursor move to line end guangbiao yidong dao xing wei",
    "keys": ["right", "{cmd_or_ctrl}"]
},
{
    "title": "光标按单词右移 {opt_or_alt} + right",
    "description": "光标按单词右移",
    "keyword": "cursor jump right by word guangbiao an danci you tiantiao",
    "keys": ["right", "{opt_or_alt}"]
},
{
    "title": "光标按单词左移 {opt_or_alt} + left",
    "description": "光标按单词左移",
    "keyword": "cursor jump left by word guangbiao an danci zuo",
    "keys": ["left", "{opt_or_alt}"]
},
{
    "title": "全选代码 {cmd_or_ctrl} + A",
    "description": "全选代码",
    "keyword": "select all code xuanze suoyou daima",
    "keys": ["a", "{cmd_or_ctrl}"]
},
{
    "title": "复制代码 {cmd_or_ctrl} + C",
    "description": "复制代码",
    "keyword": "copy code fuzhi daima",
    "keys": ["c", "{cmd_or_ctrl}"]
},
{
    "title": "粘贴代码 {cmd_or_ctrl} + V",
    "description": "粘贴代码",
    "keyword": "paste code zhan tie daima",
    "keys": ["v", "{cmd_or_ctrl}"]
},
{
    "title": "剪切当前行或选定的代码 {cmd_or_ctrl} + X",
    "description": "剪切当前行或选定的代码",
    "keyword": "cut current line or selected code jianqie dangqian hang huo xuan ding de daima",
    "keys": ["x", "{cmd_or_ctrl}"]
},
{
    "title": "撤销操作 {cmd_or_ctrl} + Z",
    "description": "撤销操作",
    "keyword": "undo operation chexiao caozuo",
    "keys": ["z", "{cmd_or_ctrl}"]
},
{
    "title": "重做操作 {cmd_or_ctrl} + shift + Z",
    "description": "重做操作",
    "keyword": "redo operation chongzuo caozuo",
    "keys": ["z", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "注释/取消注释当前行 {cmd_or_ctrl} + /",
    "description": "注释/取消注释当前行",
    "keyword": "comment/uncomment current line zhushi/quxiaozhushi dangqian hang",
    "keys": ["/", "{cmd_or_ctrl}"]
},
{
    "title": "注释/取消注释选中的代码块 {cmd_or_ctrl} + {opt_or_alt} + /",
    "description": "注释/取消注释选中的代码块",
    "keyword": "comment/uncomment selected code block zhushi/quxiaozhushi xuanzhong de daima kuai",
    "keys": ["/", "{opt_or_alt}", "{cmd_or_ctrl}"]
},
{
    "title": "在当前文件中查找文本 {cmd_or_ctrl} + F",
    "description": "在当前文件中查找文本",
    "keyword": "find text in current file zai dangqian wenjian zhong chazhao wenben",
    "keys": ["f", "{cmd_or_ctrl}"]
},
{
    "title": "在当前文件中替换文本 {cmd_or_ctrl} + R",
    "description": "在当前文件中替换文本",
    "keyword": "replace text in current file zai dangqian wenjian zhong tihuan wenben",
    "keys": ["r", "{cmd_or_ctrl}"]
},
{
    "title": "跳转到指定行 {cmd_or_ctrl} + L",
    "description": "跳转到指定行",
    "keyword": "jump to specified line tiaozhuan dao zhiding xing",
    "keys": ["l", "{cmd_or_ctrl}"]
},
{
    "title": "跳转到变量、函数或类的定义 {cmd_or_ctrl} + B",
    "description": "跳转到变量、函数或类的定义",
    "keyword": "jump to definition of variable, function or class tiaozhuan dao bianliang, hanshu huo lei de dingyi",
    "keys": ["b", "{cmd_or_ctrl}"]
},
{
    "title": "快速打开类 {cmd_or_ctrl} + O",
    "description": "快速打开类",
    "keyword": "quickly open class kuaisu dakai lei",
    "keys": ["o", "{cmd_or_ctrl}"]
},
{
    "title": "显示最近访问的文件列表 {cmd_or_ctrl} + E",
    "description": "显示最近访问的文件列表",
    "keyword": "show recently accessed file list xianshi zuijin fangwen de wenjian liebiao",
    "keys": ["e", "{cmd_or_ctrl}"]
},
{
    "title": "在编辑器的历史记录中后退 {cmd_or_ctrl} + [",
    "description": "在编辑器的历史记录中前进或后退",
    "keyword": "go backward in editor's history record zai bianjiqi de lishijilu zhong houtui",
    "keys": ["[", "{cmd_or_ctrl}"]
},
{
    "title": "在编辑器的历史记录中前进或后退 {cmd_or_ctrl} + ]",
    "description": "在编辑器的历史记录中前进或后退",
    "keyword": "go forward in editor's history record zai bianjiqi de lishijilu zhong qianjin",
    "keys": ["]", "{cmd_or_ctrl}"]
},
{
    "title": "在断点处开始或继续运行程序 F9",
    "description": "在断点处开始或继续运行程序",
    "keyword": "start or continue running program at breakpoint zai duandian chu kaishi huo jixu yunxing chengxu",
    "keys": ["f9"]
},
{
    "title": "单步跳过 F8",
    "description": "单步跳过",
    "keyword": "step over tiaobu tiaoguo",
    "keys": ["f8"]
},
{
    "title": "单步进入 F7",
    "description": "单步进入",
    "keyword": "step into tiaobu jinru",
    "keys": ["f7"]
},
{
    "title": "单步返回 shift + F8",
    "description": "单步返回",
    "keyword": "step out tiaobu fanhui",
    "keys": ["f8", "shift"]
},
{
    "title": "在光标处添加或移除断点 {cmd_or_ctrl} + F8",
    "description": "在光标处添加或移除断点",
    "keyword": "add or remove breakpoint at cursor zai guangbiao chu tianjia huo yichu duandian",
    "keys": ["f8", "{cmd_or_ctrl}"]
},
{
    "title": "强制执行到光标处 {opt_or_alt} + F9",
    "description": "强制执行到光标处",
    "keyword": "force execution to cursor qiangzhi zhixing dao guangbiao chu",
    "keys": ["f9", "{opt_or_alt}"]
},
{
    "title": "计算表达式值 {opt_or_alt} + F8",
    "description": "计算表达式值",
    "keyword": "calculate expression value jisuan biaodashi zhi",
    "keys": ["f8", "{opt_or_alt}"]
},
{
    "title": "提取变量 {cmd_or_ctrl} + {opt_or_alt} + V",
    "description": "提取变量",
    "keyword": "extract variable tiqu bianliang",
    "keys": ["v", "{opt_or_alt}", "{cmd_or_ctrl}"]
},
{
    "title": "提取方法 {cmd_or_ctrl} + {opt_or_alt} + M",
    "description": "提取方法",
    "keyword": "extract method tiqu fangfa",
    "keys": ["m", "{opt_or_alt}", "{cmd_or_ctrl}"]
},
{
    "title": "重命名变量、方法或类 shift + F6",
    "description": "重命名变量、方法或类",
    "keyword": "rename variable, method or class chongmingming bianliang, fangfa huo lei",
    "keys": ["f6", "shift"]
},
{
    "title": "在项目中查找 {cmd_or_ctrl} + shift + F",
    "description": "在项目中查找",
    "keyword": "find in project zai xiangmu zhong chazhao",
    "keys": ["f", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "在项目中替换 {cmd_or_ctrl} + shift + R",
    "description": "在项目中替换",
    "keyword": "replace in project zai xiangmu zhong tihuan",
    "keys": ["r", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "打开/关闭项目结构视图 {opt_or_alt} + 1",
    "description": "打开/关闭项目结构视图",
    "keyword": "open/close project structure view dakai/guanbi xiangmu jiegou shitu",
    "keys": ["1", "{opt_or_alt}"]
},
{
    "title": "打开项目设置 {cmd_or_ctrl} + ,",
    "description": "打开项目设置（手动）",
    "keyword": "open project settings dakai xiangmu shezhi",
    "keys": [",", "{cmd_or_ctrl}"]
},
{
    "title": "自动补全 {cmd_or_ctrl} + space",
    "description": "自动补全（手动）",
    "keyword": "auto complete zidong buquan",
    "keys": ["space", "{cmd_or_ctrl}"]
},
{
    "title": "格式化代码 {cmd_or_ctrl} + {opt_or_alt} + L",
    "description": "格式化代码",
    "keyword": "format code geshi hua daima",
    "keys": ["l", "{opt_or_alt}", "{cmd_or_ctrl}"]
},
{
    "title": "切换大小写 {cmd_or_ctrl} + shift + U",
    "description": "切换大小写",
    "keyword": "toggle case qiehuan daxiaoxie",
    "keys": ["u", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "生成代码 {opt_or_alt} + insert",
    "description": "生成代码",
    "keyword": "generate code shengcheng daima",
    "keys": ["insert", "{opt_or_alt}"]
},
{
    "title": "VCS更新等操作 {cmd_or_ctrl} + T",
    "description": "VCS更新等操作",
    "keyword": "VCS update and other operations VCS gengxin deng caozuo",
    "keys": ["t", "{cmd_or_ctrl}"]
},
{
    "title": "折叠全部 {cmd_or_ctrl} + shift + -",
    "description": "折叠全部",
    "keyword": "fold all zhedie",
    "keys": ["-", "shift", "{cmd_or_ctrl}"]
},
{
    "title": "展开全部 {cmd_or_ctrl} + shift + +",
    "description": "折叠全部",
    "keyword": "unfold all zhankai",
    "keys": ["+", "shift", "{cmd_or_ctrl}"]
}]

module.exports = shortcutTemplate
