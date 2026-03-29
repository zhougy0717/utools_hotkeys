# 🔍 查找快捷键 (utools_hotkeys)

[![uTools Version](https://img.shields.io/badge/uTools-Plugin-blue.svg)](https://u.tools)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS-brightgreen.svg)]()

一个强大且优雅的 uTools 插件，旨在帮助你快速掌握并搜索任何应用的快捷键。无论是常用的生产力工具还是复杂的开发环境，只需轻轻一搜，效率翻倍。

![logo](logo.png)

## ✨ 核心特性

- **🚀 智能识别**: 自动识别当前活动窗口，并在启动插件时优先展示该应用的快捷键。
- **🌍 在线库同步**: 集成 [hotkeycheatsheet.com](https://hotkeycheatsheet.com)，支持动态下载数千个热门应用的快捷键数据。
- **📝 自定义快捷键**: 支持通过 JSON 文件自定义个人专属快捷键，满足个性化需求。
- **💾 SQLite 引擎**: 采用 SQLite (sql.js) 强力驱动，轻松处理海量数据，摆脱 uTools 1MB 存储限制。
- **🔄 跨设备同步**: 支持自定义数据库存储路径，配合云同步盘（如坚果云、iCloud）实现多端配置同步。
- **💻 全平台支持**: 完美适配 Windows 和 macOS，自动进行按键映射（如 `Command` vs `Ctrl`）。

## 📸 功能截图

![Supported Apps](https://github.com/zhougy0717/utools_hotkeys/blob/main/icons/supported%20apps.png)

## 🛠️ 使用指南

### 1. 基础搜索
输入 `快捷键`、`hk` 或 `hotkey` 即可进入搜索界面。

### 2. 下载更多
输入 `/download` 浏览并获取 `hotkeycheatsheet.com` 上的海量应用配置。

### 3. 配置存储路径
输入 `/path` 设置你的数据存储目录。
> **提示**: 插件会自动在该目录下创建 `json_hotkeys/` 文件夹。你可以在其中编写 `.json` 文件来自定义快捷键，插件会在启动时自动加载。

### 4. 自定义示例 (`template.json`)
```json
[
  {
    "title": "我的自定义操作 (Ctrl+Shift+T)",
    "description": "说明文字",
    "keyword": "custom action",
    "keys": ["{cmd_or_ctrl}", "shift", "t"]
  }
]
```

## 📦 支持应用 (部分列举)

- **开发工具**: VSCode, JetBrains 全系列 (IntelliJ, PyCharm, WebStorm...), vim...
- **效率办公**: Microsoft Office (Word, Excel, PPT), Obsidian, Follow, Notion...
- **设计阅读**: PDF Expert, XYPlorer, UPDF, MarginNote...
- **系统辅助**: Snipaste, Magnet, Directory Opus...

## 🙏 致谢

本项目深受以下优秀项目的启发与支持，特此致谢：

- **[JinSooo/CheatSheet](https://github.com/JinSooo/CheatSheet)**: 一个跨平台显示应用快捷键的软件。本项目参考了其内置的丰富快捷键数据。
- **[Hotkey Cheatsheet](https://hotkeycheatsheet.com)**: 提供了海量的应用快捷键在线库（如 [Finder 快捷键备忘录](https://hotkeycheatsheet.com/zh/hotkey-cheatsheet/finder)），使得插件能够支持下载并更新数千个应用的快捷键。

## 🤝 参与贡献

我们非常欢迎 Pull Request！如果你发现某个应用的快捷键缺失，欢迎提交 PR 或在 `json_hotkeys` 中补充并分享。

---

[查看 GitHub 仓库](https://github.com/zhougy0717/utools_hotkeys)