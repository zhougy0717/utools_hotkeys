class ShortcutList {

    constructor() {
        this._name = 'potplayer'
        this._appName = 'potplayermini64'
        this._dir = __dirname
        this._shortcutData = [
            {
                "title": "播放/暂停Space",
                "description": "播放或暂停视频",
                "keyword": "play/pausebo fang/zan ting",
                "keys": ["space"]
            },
            {
                "title": "停止Ctrl + S",
                "description": "停止播放视频",
                "keyword": "stopting zhi",
                "keys": ["s", "ctrl"]
            },
            {
                "title": "上一个文件/章节Ctrl + left",
                "description": "切换到上一个文件或章节",
                "keyword": "previous file/chaptershang yi ge wen jian/zhang jie",
                "keys": ["left", "ctrl"]
            },
            {
                "title": "下一个文件/章节Ctrl + right",
                "description": "切换到下一个文件或章节",
                "keyword": "next file/chapterxia yi ge wen jian/zhang jie",
                "keys": ["right", "ctrl"]
            },
            {
                "title": "快退Ctrl + Left",
                "description": "快速后退视频",
                "keyword": "rewindkuai tui",
                "keys": ["left", "ctrl"]
            },
            {
                "title": "快进Ctrl + Right",
                "description": "快速前进视频",
                "keyword": "fast - forwardkuai jin",
                "keys": ["right", "ctrl"]
            },
            {
                "title": "音量增加Ctrl + up",
                "description": "增加音量",
                "keyword": "volume upyin liang zeng jia",
                "keys": ["up", "ctrl"]
            },
            {
                "title": "音量减小Ctrl + down",
                "description": "减小音量",
                "keyword": "volume downyin liang jian xiao",
                "keys": ["down", "ctrl"]
            },
            {
                "title": "静音Ctrl + M",
                "description": "使音量静音",
                "keyword": "muteyin liang jing yin",
                "keys": ["m", "ctrl"]
            },
            {
                "title": "全屏ctrl + Enter",
                "description": "切换到全屏模式",
                "keyword": "full - screenqie huan dao quan ping mo shi",
                "keys": ["enter", "ctrl"]
            },
            {
                "title": "最小化窗口Ctrl + -",
                "description": "最小化播放器窗口",
                "keyword": "minimize windowzui xiao hua bo fang qi chuang kou",
                "keys": ["-", "ctrl"]
            },
            {
                "title": "最大化窗口Ctrl + +",
                "description": "最大化播放器窗口",
                "keyword": "maximize windowzui da hua bo fang qi chuang kou",
                "keys": ["+", "ctrl"]
            },
            {
                "title": "关闭窗口Alt + F4",
                "description": "关闭播放器窗口",
                "keyword": "close windowguan bi bo fang qi chuang kou",
                "keys": ["f4", "alt"]
            },
            {
                "title": "逐帧后退D",
                "description": "视频逐帧后退",
                "keyword": "step backwardshi pin zhu zhen hou tui",
                "keys": ["d"]
            },
            {
                "title": "逐帧前进F",
                "description": "视频逐帧前进",
                "keyword": "step forwardshi pin zhu zhen qian jin",
                "keys": ["f"]
            },
            {
                "title": "切换视频比例Ctrl + P",
                "description": "切换视频显示比例",
                "keyword": "switch video aspect ratioqie huan shi pin xian shi bi li",
                "keys": ["p", "ctrl"]
            },
            {
                "title": "视频旋转Ctrl + R",
                "description": "旋转视频",
                "keyword": "rotate videoxuan zhuan shi pin",
                "keys": ["r", "ctrl"]
            },
            {
                "title": "添加文件到播放列表Ctrl + O",
                "description": "将文件添加到播放列表",
                "keyword": "add file to playlisttian jia wen jian dao bo fang lie biao",
                "keys": ["o", "ctrl"]
            },
            {
                "title": "清除播放列表Ctrl + Del",
                "description": "清除当前播放列表",
                "keyword": "clear playlistqing chu dang qian bo fang lie biao",
                "keys": ["del", "ctrl"]
            },
            {
                "title": "保存播放列表Ctrl + S",
                "description": "保存当前播放列表",
                "keyword": "save playlistbao cun dang qian bo fang lie biao",
                "keys": ["s", "ctrl"]
            },
            {
                "title": "切换播放列表显示/隐藏Ctrl + L",
                "description": "切换播放列表的显示或隐藏状态",
                "keyword": "toggle playlist visibilityqie huan bo fang lie biao de xian shi huo yin cang zhuang tai",
                "keys": ["l", "ctrl"]
            },
            {
                "title": "截图Ctrl + E",
                "description": "对视频进行截图",
                "keyword": "screenshotdui shi pin jin xing jie tu",
                "keys": ["e", "ctrl"]
            },
            {
                "title": "打开设置F5",
                "description": "打开播放器设置界面",
                "keyword": "open settingsda kai bo fang qi she zhi jie mian",
                "keys": ["f5"]
            },
            {
                "title": "显示/隐藏控制面板Tab",
                "description": "显示或隐藏播放器控制面板",
                "keyword": "show/hide control panelxian shi/yin cang kong zhi mian ban",
                "keys": ["tab"]
            }
        ];
    }

    get() {
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name} ${this._appName}`
            sc['icon'] = `shortcuts/${this._name}/potplayer.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()