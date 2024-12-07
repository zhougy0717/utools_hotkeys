class ShortcutList {

    constructor() {
        this._name = 'XYplorer'
        this._dir = __dirname
        this._shortcutData = [
            {
                "title": "帮助 F1",
                "description": "打开帮助文档",
                "keyword": "help open help documents bang zhu da kai bang zhu wen dang",
                "keys": ["f1"]
            },
            {
                "title": "重命名 F2",
                "description": "对所选文件或文件夹重命名",
                "keyword": "rename rename the selected file or folder chong ming ming dui suo xuan wen jian huo wen jian jia chong ming ming",
                "keys": ["f2"]
            },
            {
                "title": "立即查找 F3",
                "description": "打开查找文件对话框",
                "keyword": "find immediately open the find file dialog box ji li zhao zhao da kai zhao zhao wen jian dui hua kuang",
                "keys": ["f3"]
            },
            {
                "title": "刷新目录树 F4",
                "description": "刷新目录树视图",
                "keyword": "refresh directory tree refresh the directory tree view shua xin mu lu shu shua xin mu lu shu shi tu",
                "keys": ["f4"]
            },
            {
                "title": "刷新文件列表 F5",
                "description": "刷新文件列表视图",
                "keyword": "refresh file list refresh the file list view shua xin wen jian lie biao shua xin wen jian lie biao shi tu",
                "keys": ["f5"]
            },
            {
                "title": "循环焦点 F6",
                "description": "在不同的窗口区域间循环切换焦点",
                "keyword": "cycle focus cycle the focus among different window areas xun huan jiao dian zai bu tong de chuang kou qu yu jian xun huan qie huan jiao dian",
                "keys": ["f6"]
            },
            {
                "title": "转到前一位置 F7",
                "description": "转到之前访问过的位置",
                "keyword": "go to previous position go to the previously visited position zhuan dao qian yi wei zhi zhuan dao zhi qian fang wen guo de wei zhi",
                "keys": ["f7"]
            },
            {
                "title": "显示导航面板 F8",
                "description": "显示导航面板（包括目录树和目录）",
                "keyword": "show navigation panel show the navigation panel (including directory tree and directory) xian shi dao hang mian ban xian shi bao kuo mu lu shu he mu lu de dao hang mian ban",
                "keys": ["f8"]
            },
            {
                "title": "配置 F9",
                "description": "打开配置对话框",
                "keyword": "configure open the configuration dialog box pei zhi da kai pei zhi dui hua kuang",
                "keys": ["f9"]
            },
            {
                "title": "双窗格 F10",
                "description": "切换双窗格视图",
                "keyword": "dual - pane switch to dual - pane view shuang chuang ge qie huan dao shuang chuang ge shi tu",
                "keys": ["f10"]
            },
            {
                "title": "全屏预览图像 F11",
                "description": "以全屏模式预览图像",
                "keyword": "full - screen preview image preview images in full - screen mode quan ping yu lan tu xiang yi quan ping mo shi yu lan tu xiang",
                "keys": ["f11"]
            },
            {
                "title": "显示信息面板 F12",
                "description": "显示信息面板",
                "keyword": "show information panel show the information panel xian shi xin xi mian ban xian shi xin xi mian ban",
                "keys": ["f12"]
            },
            {
                "title": "属性 Alt + Enter",
                "description": "查看所选项目的属性",
                "keyword": "properties view the properties of the selected item shu xing cha kan suo xuan xiang mu de shu xing",
                "keys": ["enter", "alt"]
            },
            {
                "title": "转到主页 Alt + Home",
                "description": "转到用户设置的主页",
                "keyword": "go to home page go to the user - set home page zhuan dao zhu ye zhuan dao yong hu she zhi de zhu ye",
                "keys": ["home", "alt"]
            },
            {
                "title": "后退 Alt + 左箭头",
                "description": "返回到上一个浏览位置",
                "keyword": "back go back to the previous browsing position hui tui fan hui dao shang yi ge liu lan wei zhi",
                "keys": ["left arrow", "alt"]
            },
            {
                "title": "前进 Alt + 右箭头",
                "description": "前进到下一个浏览位置",
                "keyword": "forward go forward to the next browsing position qian jin qian jin dao xia yi ge liu lan wei zhi",
                "keys": ["right arrow", "alt"]
            },
            {
                "title": "退出 Alt + F4",
                "description": "退出 XYplorer 应用程序",
                "keyword": "exit exit the XYplorer application tui chu tui chu XYplorer ying yong cheng xu",
                "keys": ["f4", "alt"]
            },
            {
                "title": "上次大小 / 最小化信息面板 Alt + F12",
                "description": "切换信息面板到上次大小或最小化",
                "keyword": "last size /minimize information panel switch the information panel to the last size or minimize shang ci da xiao /zui xiao hua xin xi mian ban qie huan xin xi mian ban dao shang ci da xiao huo zui xiao hua",
                "keys": ["f12", "alt"]
            },
            {
                "title": "全选 Ctrl + A",
                "description": "选择当前文件夹中的所有项目",
                "keyword": "select all select all items in the current folder quan xuan xuan ze dang qian wen jian jia zhong de suo you xiang mu",
                "keys": ["a", "ctrl"]
            },
            {
                "title": "切换收藏文件夹 Ctrl + B",
                "description": "切换收藏文件夹的显示状态",
                "keyword": "toggle favorite folder toggle the display status of the favorite folder qie huan shou cang wen jian jia de xian shi zhuang tai",
                "keys": ["b", "ctrl"]
            },
            {
                "title": "复制 Ctrl + C",
                "description": "复制所选项目",
                "keyword": "copy copy the selected items fu zhi fu zhi suo xuan xiang mu",
                "keys": ["c", "ctrl"]
            },
            {
                "title": "复制到此处并添加后缀数字 Ctrl + D",
                "description": "将所选项目复制到当前位置并添加后缀数字",
                "keyword": "copy here and add suffix number copy the selected items to the current position and add suffix numbers fu zhi dao ci chu bing tian jia hou zhui shu zi jiang suo xuan xiang mu fu zhi dao dang qian wei zhi bing tian jia hou zhui shu zi",
                "keys": ["d", "ctrl"]
            },
            {
                "title": "查找文件 Ctrl + F",
                "description": "打开查找文件对话框",
                "keyword": "find file open the find file dialog box zhao zhao wen jian da kai zhao zhao wen jian dui hua kuang",
                "keys": ["f", "ctrl"]
            },
            {
                "title": "转到... Ctrl + G",
                "description": "打开转到对话框",
                "keyword": "go to...open the go to dialog box zhuan dao...da kai zhuan dao dui hua kuang",
                "keys": ["g", "ctrl"]
            },
            {
                "title": "热列表... Ctrl + H",
                "description": "打开热列表对话框",
                "keyword": "hot list...open the hot list dialog box re lie biao...da kai re lie biao dui hua kuang",
                "keys": ["h", "ctrl"]
            },
            {
                "title": "精简文件信息 Ctrl + I",
                "description": "精简文件信息显示",
                "keyword": "simplify file information simplify the display of file information jing jian wen jian xin xi jing jian wen jian xin xi xian shi",
                "keys": ["i", "ctrl"]
            },
            {
                "title": "设置视觉过滤器... Ctrl + J",
                "description": "打开设置视觉过滤器对话框",
                "keyword": "set visual filter...open the set visual filter dialog box she zhi shi jue guo lv qi...da kai she zhi shi jue guo lv qi dui hua kuang",
                "keys": ["j", "ctrl"]
            },
            {
                "title": "比较当前文件与前一文件 Ctrl + K",
                "description": "比较当前文件与前一个文件",
                "keyword": "compare current file with previous file compare the current file with the previous one bi jiao dang qian wen jian yu qian yi ge wen jian",
                "keys": ["k", "ctrl"]
            },
            {
                "title": "锁定位置 Ctrl + L",
                "description": "锁定当前文件夹位置",
                "keyword": "lock position lock the position of the current folder suo ding wei zhi suo ding dang qian wen jian jia wei zhi",
                "keys": ["l", "ctrl"]
            },
            {
                "title": "选择过滤器... Ctrl + M",
                "description": "打开选择过滤器对话框",
                "keyword": "select filter...open the select filter dialog box xuan ze guo lv qi...da kai xuan ze guo lv qi dui hua kuang",
                "keys": ["m", "ctrl"]
            },
            {
                "title": "新建文件夹 Ctrl + N",
                "description": "在当前位置新建一个文件夹",
                "keyword": "new folder create a new folder in the current position xin jian wen jian jia zai dang qian wei zhi xin jian yi ge wen jian jia",
                "keys": ["n", "ctrl"]
            },
            {
                "title": "复制项目路径 / 名称 Ctrl + P",
                "description": "复制所选项目的路径或名称",
                "keyword": "copy item path /name copy the path or name of the selected item fu zhi xiang mu lu jing /ming cheng fu zhi suo xuan xiang mu de lu jing huo ming cheng",
                "keys": ["p", "ctrl"]
            },
            {
                "title": "预览 Ctrl + Q",
                "description": "预览所选文件",
                "keyword": "preview preview the selected file yu lan yu lan suo xuan wen jian",
                "keys": ["q", "ctrl"]
            },
            {
                "title": "暂停自动刷新 Ctrl + R",
                "description": "暂停自动刷新文件列表",
                "keyword": "pause auto - refresh pause the automatic refresh of the file list zan ting zi dong shua xin zan ting zi dong shua xin wen jian lie biao",
                "keys": ["r", "ctrl"]
            },
            {
                "title": "复制到此处为 Ctrl + S",
                "description": "将所选项目复制到此处并更改名称",
                "keyword": "copy here as copy the selected items here and change the name fu zhi dao ci chu wei jiang suo xuan xiang mu fu zhi dao ci chu bing gai bian ming cheng",
                "keys": ["s", "ctrl"]
            },
            {
                "title": "打开新标签页 Ctrl + T",
                "description": "打开一个新的标签页",
                "keyword": "open new tab open a new tab da kai xin biao qian ye da kai yi ge xin de biao qian ye",
                "keys": ["t", "ctrl"]
            },
            {
                "title": "粘贴 Ctrl + V",
                "description": "粘贴复制的项目",
                "keyword": "paste paste the copied items zhan tie zhan tie fu zhi de xiang mu",
                "keys": ["v", "ctrl"]
            },
            {
                "title": "关闭标签页 Ctrl + W",
                "description": "关闭当前标签页",
                "keyword": "close tab close the current tab guan bi biao qian ye guan bi dang qian biao qian ye",
                "keys": ["w", "ctrl"]
            },
            {
                "title": "剪切 Ctrl + X",
                "description": "剪切所选项目",
                "keyword": "cut cut the selected items qie jian qie jian suo xuan xiang mu",
                "keys": ["x", "ctrl"]
            },
            {
                "title": "删除（不经过回收站）Shift + Delete",
                "description": "直接删除所选项目，不经过回收站",
                "keyword": "delete (without recycle bin) directly delete the selected items without going through the recycle bin shan chu (bu jing guo hui shou zhan) zhi jie shan chu suo xuan xiang mu, bu jing guo hui shou zhan",
                "keys": ["delete", "shift"]
            },
            {
                "title": "删除（跳过锁定）Ctrl + Delete",
                "description": "删除所选项目，跳过锁定的项目",
                "keyword": "delete (skip locked) delete the selected items, skipping locked items shan chu (tiao guo suo ding) shan chu suo xuan xiang mu, tiao guo suo ding de xiang mu",
                "keys": ["delete", "ctrl"]
            } 
        ];
        console.log(`${this._dir}`)
    }

    get() {
        if (!utools.isWindows()) {
            return []
        }
        for (let sc of this._shortcutData) {
            sc['keyword'] += ` ${this._name}`.toLowerCase()
            sc['keyword'] += ' win'
            sc['icon'] = `shortcuts/${this._name}/xyplorer.png`
        }
        return this._shortcutData
    }

    name() {
        return `${this._name}`
    }
}

module.exports = new ShortcutList()