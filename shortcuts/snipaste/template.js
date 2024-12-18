let shortcutTemplate = [
    {
        "title": "截屏 F1",
        "description": "执行截屏操作",
        "keyword": "screenshot jie ping",
        "keys": ["f1"]
    },
    {
        "title": "截屏并自动复制 {cmd_or_ctrl} + F1",
        "description": "执行截屏操作并自动复制",
        "keyword": "screenshot and auto copy jie ping bing zi dong fu zhi",
        "keys": ["f1", "{cmd_or_ctrl}"]
    },
    {
        "title": "自定义截屏 {opt_or_alt} + F1",
        "description": "进行自定义截屏操作",
        "keyword": "custom screenshot ding zhi jie ping",
        "keys": ["f1", "{opt_or_alt}"]
    },
    {
        "title": "贴图 F3",
        "description": "执行贴图操作",
        "keyword": "paste image tie tu",
        "keys": ["f3"]
    },
    {
        "title": "隐藏/显示所有贴图 {cmd_or_ctrl} + F3",
        "description": "隐藏或显示所有贴图",
        "keyword": "hide/show all pasted images yin zang/xian shi suo you tie tu",
        "keys": ["f3", "{cmd_or_ctrl}"]
    },
    {
        "title": "切换到另一贴图组 {opt_or_alt} + F3",
        "description": "切换到另一组贴图",
        "keyword": "switch to another pasted image group qie huan dao ling yi zu tie tu",
        "keys": ["f3", "{opt_or_alt}"]
    },
    {
        "title": "首选项 {cmd_or_ctrl} + ,",
        "description": "打开首选项设置",
        "keyword": "preferences shou xuan xiang",
        "keys": [",", "{cmd_or_ctrl}"]
    },
    {
        "title": "退出 {cmd_or_ctrl} + Q",
        "description": "退出程序",
        "keyword": "quit tui chu",
        "keys": ["q", "{cmd_or_ctrl}"]
    }
]

module.exports = shortcutTemplate
