# 🔍 查找快捷键 (utools_hotkeys)

[![uTools Version](https://img.shields.io/badge/uTools-Plugin-blue.svg)](https://u.tools)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS-brightgreen.svg)]()
[![License](https://img.shields.io/badge/License-MIT-orange.svg)]()

一个强大、优雅且高度可定制的 uTools 插件，助你随时随地快速检索、掌握并模拟触发任何应用的快捷键。无论是日常办公套件还是专业开发/设计环境，只需轻轻一搜，操作效率成倍提升。

![logo](logo.png)

---

## ✨ 核心特性

- **🚀 智能前台识别**: 唤醒插件时自动识别当前前台活动窗口（如 VS Code、Chrome、微信等），优先展示对应应用的快捷键。
- **📚 丰富的内置与第三方库**:
  - 内置精选快捷键库（基于 [JinSooo/CheatSheet](https://github.com/JinSooo/CheatSheet) 与 OpenCode 数据），离线开箱即用。
  - 集成 [hotkeycheatsheet.com](https://hotkeycheatsheet.com) 在线库，支持动态下载数千个热门应用的快捷键。
- **📝 纯 JSON 本地化与自定义**:
  - 所有数据采用纯 JSON 存储管理，轻量透明、秒级加载、易于版本管理与备份。
  - 支持在 `json_hotkeys/` 目录下放置用户自定义 JSON 文件，支持按应用优先级无缝覆盖。
- **🖥️ 多设备存储隔离 (Multi-Device Isolated)**:
  - 针对 uTools 会员云端同步进行专属优化，每台设备（macOS / Windows / 不同用户名）独立绑定本地数据目录，杜绝跨机器路径污染与失效。
- **🎨 应用图标管理中心**:
  - 支持提取应用专属图标、导入自定义图片，或自动生成精美渐变头像徽标。
- **⌨️ 智能跨平台映射**:
  - 自动识别操作系统并适配按键占位符（如 `{cmd_or_ctrl}` 在 Mac 转换为 `⌘`，在 Windows 转换为 `Ctrl`）。
  - 支持直接回车模拟键盘敲击触发，或复制快捷键文本。

---

## 🛠️ 斜线命令指南 (Slash Commands)

插件提供了强大的斜线命令工具箱，在搜索框中输入 `/` 即可呼出：

| 斜线命令 | 功能说明 | 适用场景 |
| :--- | :--- | :--- |
| **`/path`** | **存储路径管理** | 查看或自定义快捷键数据存放目录，支持一键在文件管理器中打开。 |
| **`/download [名称]`** | **在线下载快捷键** | 检索并一键下载 hotkeycheatsheet 上的海量应用数据至本地。 |
| **`/import`** | **外部文件导入** | 导入 Defkey 文本文件或同名图标，自动解析并转换为规范 JSON 快捷键。 |
| **`/export`** | **导出内置快捷键** | 一键将所有内置快捷键与图标按应用拆分为 JSON 导出到本地，便于自定义修改。 |
| **`/icon`** | **应用图标管理** | 为任意应用自定义本地图标或生成漂亮的渐变 SVG 徽标。 |
| **`/app`** | **进程与窗口绑定** | 自定义应用别名与窗口进程映射（如 `.exe` / `.app`），使前台唤出匹配更精准。 |

---

## 📖 快速上手

### 1. 基础搜索
在 uTools 输入快捷命令 `快捷键`、`hk` 或 `hotkey` 进入全局搜索；或切换到任意前台应用呼出 uTools 查看当前专属快捷键。

### 2. 下载更多应用数据
输入 `/download`，然后输入想要的应用名称（例如 `/download photoshop` 或 `/download figma`），点击即可下载并立即生效。

### 3. 配置本地存储目录
输入 `/path`，点击「选择快捷键数据存放目录」指定任意文件夹（如网盘同步目录或本地工作区）。
> **提示**: 插件会自动在该目录下初始化 `json_hotkeys/` 文件夹。你可以在其中编写或修改 `.json` 文件。

### 4. 自定义 JSON 格式示例
在你的数据目录下的 `json_hotkeys/my_app.json` 中添加如下内容：

```json
{
  "appId": "my_custom_app",
  "appName": "我的自定义工具",
  "shortcuts": [
    {
      "title": "格式化代码",
      "keys": ["{cmd_or_ctrl}", "shift", "f"],
      "keyword": "format code 格式化",
      "description": "一键自动整理并格式化当前文档代码"
    },
    {
      "title": "全局快速查找",
      "keys": ["{cmd_or_ctrl}", "shift", "p"],
      "keyword": "search find 查找",
      "description": "打开全局命令面板"
    }
  ]
}
```

---

## 📦 支持应用 (部分列举)

- **开发与终端**: VS Code, JetBrains 全系列 (IntelliJ IDEA, PyCharm, WebStorm, CLion, GoLand, Rider, DataGrip, RustRover...), Vim, NeoVim...
- **效率与办公**: Microsoft Office (Word, Excel, PowerPoint, OneNote), Obsidian, Notion, Follow, WeLink...
- **设计与阅读**: PDF Expert, Foxit PDF Reader, UPDF, MarginNote, QSpace Pro, Directory Opus, One Commander...
- **影音与系统**: Snipaste, Magnet, IINA, PotPlayer, Google Chrome, Safari...

---

## 🙏 致谢

本项目由以下优秀开源项目与社区提供灵感与支持：

- **[JinSooo/CheatSheet](https://github.com/JinSooo/CheatSheet)**: 提供了优秀的跨平台快捷键设计理念与内置数据支持。
- **[Hotkey Cheatsheet](https://hotkeycheatsheet.com)**: 提供了海量丰富的高质量应用快捷键在线数据库。

---

## 🤝 参与贡献与反馈

非常欢迎提交 Issue 和 Pull Request！如果你发现某些快捷键有误或想补充更多热门应用的默认数据，欢迎随时贡献代码与 JSON 配置。

---

[查看 GitHub 仓库](https://github.com/zhougy0717/utools_hotkeys)