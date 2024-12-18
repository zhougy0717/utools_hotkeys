class ShortcutList {

    constructor() {
        this._dir = __dirname
        this._name = "iina"
        this._shortcutData = [
        {
            "title": "显示音频面板 command + shift + A",
            "description": "显示音频面板",
            "keyword": "show audio panel xian shi yin pin mian ban",
            "keys": ["a", "shift", "command"]
        },
        {
            "title": "隐藏IINA command + H",
            "description": "隐藏INA",
            "keyword": "hide INA yin zang INA",
            "keys": ["h", "command"]
        },
        {
            "title": "退出并保留窗口 command + option + Q",
            "description": "退出并保留窗口",
            "keyword": "quit and keep windows tui chu bing bao liu chuang kou",
            "keys": ["q", "command", "option"]
        },
        {
            "title": "音量 + 5% up",
            "description": "音量增加5%",
            "keyword": "volume increase by 5% yin liang zeng jia 5%",
            "keys": ["up"]
        },
        {
            "title": "音量 - 5% down",
            "description": "音量减少5%",
            "keyword": "volume decrease by 5% yin liang jiang di 5%",
            "keys": ["down"]
        },
        {
            "title": "音量 + 1% option + up",
            "description": "音量增加1%",
            "keyword": "volume increase by 1% yin liang zeng jia 1%",
            "keys": ["up", "option"]
        },
        {
            "title": "音量 - 1% option + down",
            "description": "音量减少1%",
            "keyword": "volume decrease by 1% yin liang jiang di 1%",
            "keys": ["down", "option"]
        },
        {
            "title": "文件 - 打开 command + O",
            "description": "打开文件",
            "keyword": "open file da kai wen jian",
            "keys": ["o", "command"]
        },
        {
            "title": "文件 - 关闭 command + W",
            "description": "关闭文件",
            "keyword": "close file guan bi wen jian",
            "keys": ["w", "command"]
        },
        {
            "title": "编辑 - 撤销 command + Z",
            "description": "撤销操作",
            "keyword": "undo operation che xiao cao zuo",
            "keys": ["z", "command"]
        },
        {
            "title": "编辑 - 重做 command + shift + Z",
            "description": "重做操作",
            "keyword": "redo operation zhong zuo cao zuo",
            "keys": ["z", "command", "shift"]
        },
        {
            "title": "编辑 - 复制 command + C",
            "description": "复制内容",
            "keyword": "copy content fu zhi nei rong",
            "keys": ["c", "command"]
        },
        {
            "title": "编辑 - 粘贴 command + V",
            "description": "粘贴内容",
            "keyword": "paste content zhan tie nei rong",
            "keys": ["v", "command"]
        },
        {
            "title": "编辑 - 剪切 command + X",
            "description": "剪切内容",
            "keyword": "cut content jian qie nei rong",
            "keys": ["x", "command"]
        },
        {
            "title": "全选 command + A",
            "description": "全选内容",
            "keyword": "select all xuan quan nei rong",
            "keys": ["a", "command"]
        },
        {
            "title": "显示视频面板 command + shift + V",
            "description": "显示视频面板",
            "keyword": "show video panel xian shi shi pin mian ban",
            "keys": ["v", "shift", "command"]
        },
        {
            "title": "隐藏其他 command + option + H",
            "description": "隐藏其他",
            "keyword": "hide others yin zang qi ta",
            "keys": ["h", "command", "option"]
        },
        {
            "title": "最小化 command + M",
            "description": "最小化窗口",
            "keyword": "minimize chuang kou zui xiao hua",
            "keys": ["m", "command"]
        },
        {
            "title": "全屏 command + ctrl + F",
            "description": "全屏",
            "keyword": "maximize full screen chuang kou zui da hua quanping",
            "keys": ["f", "command", "ctrl"]
        },
        {
            "title": "循环切换视频轨道 command + ctrl + V",
            "description": "循环切换视频轨道",
            "keyword": "cycle switch video tracks xun huan qie huan shi pin gui dao",
            "keys": ["v", "ctrl", "command"]
        },
        {
            "title": "循环切换音频轨道 command + ctrl + A",
            "description": "循环切换音频轨道",
            "keyword": "cycle switch audio tracks xun huan qie huan yin pin gui dao",
            "keys": ["a", "ctrl", "command"]
        },
        {
            "title": "进入画中画模式 command + ctrl + P",
            "description": "进入画中画模式",
            "keyword": "enter crop mode huazhonghua",
            "keys": ["p", "command", "ctrl"]
        },
        {
            "title": "进入音乐模式 command + option + M",
            "description": "进入音乐模式",
            "keyword": "enter music mode jin ru yin yue mo shi",
            "keys": ["m", "command", "option"]
        },
        {
            "title": "适应屏幕 command + 3",
            "description": "使内容适应屏幕",
            "keyword": "fit screen shi nei rong shi ying ping mu",
            "keys": ["3", "command"]
        },
        {
            "title": "原始大小 command + 1",
            "description": "恢复原始大小",
            "keyword": "original size hui fu yuan shi da xiao",
            "keys": ["1", "command"]
        },
        {
            "title": "双倍大小 command + 2",
            "description": "使内容变为双倍大小",
            "keyword": "double size shi nei rong bian wei shuang bei da xiao",
            "keys": ["2", "command"]
        },
        {
            "title": "放大 command + =",
            "description": "放大内容",
            "keyword": "zoom in fang da nei rong",
            "keys": ["=", "command"]
        },
        {
            "title": "缩小 command + -",
            "description": "缩小内容",
            "keyword": "zoom out suo xiao nei rong",
            "keys": ["-", "command"]
        },
        {
            "title": "显示播放列表面板 command + ctrl + P",
            "description": "显示播放列表面板",
            "keyword": "show playback list panel xian shi bo fang lie biao mian ban",
            "keys": ["p", "command", "ctrl"]
        },
        {
            "title": "显示字幕面板 command + shift + S",
            "description": "显示字幕面板",
            "keyword": "show subtitle panel xian shi zi mu mian ban",
            "keys": ["s", "command", "shift"]
        },
        {
            "title": "暂停/播放 space",
            "description": "暂停或播放内容",
            "keyword": "pause/play zan ting/bo fang nei rong",
            "keys": ["space"]
        },
        {
            "title": "停止并清空播放列表 command + .",
            "description": "停止播放并清空播放列表",
            "keyword": "stop and clear playback list ting zhi bo fang bing qing kong bo fang lie biao",
            "keys": [".", "command"]
        },
        {
            "title": "前进5秒 right arrow",
            "description": "内容前进5秒",
            "keyword": "forward 5 seconds nei rong qian jin 5 miao",
            "keys": ["right"]
        },
        {
            "title": "后退5秒 left",
            "description": "内容后退5秒",
            "keyword": "backward 5 seconds nei rong hou tui 5 miao",
            "keys": ["left"]
        },
        {
            "title": "下一帧 option + right",
            "description": "跳转到下一帧",
            "keyword": "next frame tiao zhuan dao xia yi zhen",
            "keys": ["right", "option"]
        },
        {
            "title": "上一帧 option + left",
            "description": "跳转到上一帧",
            "keyword": "previous frame tiao zhuan dao shang yi zhen",
            "keys": ["left", "option"]
        },
        {
            "title": "加速2.0倍 command + ]",
            "description": "播放速度加速2.0倍",
            "keyword": "accelerate playback speed by 2.0 times jia su bo fang su du 2.0 bei",
            "keys": ["]", "command"]
        },
        {
            "title": "加速1.1倍 command + option + ]",
            "description": "播放速度加速1.1倍",
            "keyword": "accelerate playback speed by 1.1 times jia su bo fang su du 1.1 bei",
            "keys": ["]", "command", "option"]
        },
        {
            "title": "减速0.5倍 command + [",
            "description": "播放速度减速0.5倍",
            "keyword": "decelerate playback speed by 0.5 times jian su bo fang su du 0.5 bei",
            "keys": ["[", "command"]
        },
        {
            "title": "减速0.9倍 command +option + [",
            "description": "播放速度减速0.9倍",
            "keyword": "decelerate playback speed by 0.9 times jian su bo fang su du 0.9 bei",
            "keys": ["[", "command", "option"]
        },
        {
            "title": "重置速度 command + \\",
            "description": "重置播放速度",
            "keyword": "reset playback speed chong zhi bo fang su du",
            "keys": ["\\", "command"]
        },
        {
            "title": "截屏 command + S",
            "description": "进行截屏操作",
            "keyword": "screenshot jin xing jie ping cao zuo",
            "keys": ["s", "command"]
        },
        {
            "title": "A - B循环 command + L",
            "description": "设置A - B循环",
            "keyword": "A - B loop she zhi A - B xun huan",
            "keys": ["l", "command"]
        },
        {
            "title": "下一个媒体 command + right",
            "description": "切换到下一个媒体",
            "keyword": "next media qie huan dao xia yi ge mei ti",
            "keys": ["right", "command"]
        },
        {
            "title": "上一个媒体 command + left",
            "description": "切换到上一个媒体",
            "keyword": "previous media qie huan dao shang yi ge mei ti",
            "keys": ["left", "command"]
        },
        {
            "title": "字幕延迟 + 0.5秒 shift + X",
            "description": "增加字幕延迟0.5秒",
            "keyword": "subtitle delay increase by 0.5 seconds zi mu chi yan zeng jia 0.5 miao",
            "keys": ["x", "shift"]
        },
        {
            "title": "字幕延迟 - 0.5秒 shift + Z",
            "description": "减少字幕延迟0.5秒",
            "keyword": "subtitle delay decrease by 0.5 seconds zi mu chi yan jian shao 0.5 miao",
            "keys": ["z", "shift"]
        },
        {
            "title": "字幕延迟 + 0.1秒 option + shift + X",
            "description": "增加字幕延迟0.1秒",
            "keyword": "subtitle delay increase by 0.1 seconds zi mu chi yan zeng jia 0.1 miao",
            "keys": ["x", "option", "shift"]
        },
        {
            "title": "字幕延迟 - 0.1秒 option + shift + Z",
            "description": "减少字幕延迟0.1秒",
            "keyword": "subtitle delay decrease by 0.1 seconds zi mu chi yan jian shao 0.1 miao",
            "keys": ["z", "option", "shift"]
        },
        {
            "title": "重置字幕延迟 shift + C",
            "description": "重置字幕延迟",
            "keyword": "reset subtitle delay chong zhi zi mu chi yan",
            "keys": ["c", "shift"]
        },
        {
            "title": "音频延迟 + 0.5秒 (",
            "description": "音频延迟增加0.5秒",
            "keyword": "audio delay increase by 0.5 seconds yin pin chi yan zeng jia 0.5 miao",
            "keys": ["("]
        },
        {
            "title": "音频延迟 + 0.1秒 option + (",
            "description": "音频延迟增加0.1秒",
            "keyword": "audio delay increase by 0.1 seconds yin pin chi yan zeng jia 0.1 miao",
            "keys": ["(", "option"]
        },
        {
            "title": "音频延迟 - 0.5秒 )",
            "description": "音频延迟减少0.5秒",
            "keyword": "audio delay decrease by 0.5 seconds yin pin chi yan jian shao 0.5 miao",
            "keys": [")"]
        },
        {
            "title": "音频延迟 - 0.1秒 option + )",
            "description": "音频延迟减少0.1秒",
            "keyword": "audio delay decrease by 0.1 seconds yin pin chi yan jian shao 0.1 miao",
            "keys": [")", "option"]
        },
        {
            "title": "重置音频延迟 _",
            "description": "重置音频延迟",
            "keyword": "reset audio delay chong zhi yin pin chi yan",
            "keys": ["_"]
        },
        {
            "title": "显示章节面板 command + shift + C",
            "description": "显示章节面板",
            "keyword": "show chapter panel xian shi zhang jie mian ban",
            "keys": ["c", "command", "shift"]
        },
        {
            "title": "下一章节 command + >",
            "description": "切换到下一章节",
            "keyword": "next chapter qie huan dao xia yi zhang jie",
            "keys": [">", "command"]
        },
        {
            "title": "上一章节 command + <",
            "description": "切换到上一章节",
            "keyword": "previous chapter qie huan dao shang yi zhang jie",
            "keys": ["<", "command"]
        }]
    }

    get() {
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name}`
            sc['icon'] = `shortcuts/${this._name}/iina.png`
        }
        return this._shortcutData
    }

    name() {
        return this._name
    }
}

module.exports = new ShortcutList()