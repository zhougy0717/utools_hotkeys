# Hotkey Cheatsheet Service 软件设计文档

## 1. 模块上下文与外部接口 (Module Context & External Interfaces)

`hotkeycheatsheet` 是负责从外部源同步快捷键数据，并将其持久化到本地的数据服务层。与之配合的斜线命令机制已解耦。该服务通过动作注册表（Action Registry）进行事件分发，与页面 UI 层（Adapter）交互。

### 1.1 外部依赖 (External Contacts)
*   **hotkeycheatsheet.com**: 数据来源。服务通过 HTTP 抓取该站点的 HTML 和 RSC (React Server Components) 流。
*   **uTools API**:
    *   `utools.db`: 用于存储轻量级的应用列表信息和同步元数据，以及无 SQLite 时的降级存储方案。
    *   `utools.dbStorage`: 用于存储用户配置（如 SQLite 路径）。

### 1.2 外部模块交互关系 (External Interaction Diagram)

```plantuml
@startuml
title Hotkey Service - 外部模块交互关系 (External Interactions)

skinparam componentStyle rectangle
skinparam packageStyle frame

package "uTools Adapter Layer" #E3F2FD {
    [preload.js] as Preload <<主入口>>
}

package "Core Business Logic" #FFFDE7 {
    [ActionRegistry] as Registry <<动作分发>>
    [UI - Adapter/Interface] as UI <<UI抽象/服务>>
    [CommonMethod] as CM <<通用方法/逻辑>>
    package "Action Handlers" {
        [DownloadAppHandler]
    }
    [hotkeycheatsheet.js] as HCS <<数据服务>>
}

package "Infrastructure" #F1F8E9 {
    [SqliteService] as SQLite <<存储引擎>>
}

database "External / System" #F5F5F5 {
    [uTools DB / Storage] as UAPI
    [hotkeycheatsheet.com] as Web
}

' 依赖关系定义 (A ..> B 表示 A 依赖 B)
Preload ..> Registry : <<use>>
Preload ..> UI : <<use>> 构造 UI 实例
Preload ..> CM : <<call>>
Preload ..> SQLite : <<call>> 初始化数据库

Registry ..> DownloadAppHandler : <<dispatch>>

DownloadAppHandler ..> HCS : <<use>>
DownloadAppHandler ..> UI : <<context>> 调用 UI 反馈接口

HCS ..> SQLite : <<use>>
HCS ..> CM : <<call>> 列表刷新
HCS ..> UAPI : <<use>>
HCS ..> Web : <<access>>
@enduml
```

---

## 2. 内部实现架构 (Internal Architecture)

### 2.1 关键组件设计 (Key Components)

| 组件 | 职责 | 实现要点 |
| :--- | :--- | :--- |
| **HotkeyCheatsheetParser** | 网页内容萃取 | 支持 DOM、`__NEXT_DATA__` 及 `__next_f` RSC 流解析。 |
| **HotkeyDataLoader** | 数据生命周期管理 | 处理异步加载、24h 过期检查、图标转码及多平台路由。 |
| **ActionRegistry** | 动作路由分发 | 解耦 `preload.js` 内 UI 交互调用，映射 `action` 到具体处理中心。 |
| **Action Handlers** | 业务逻辑执行 (例: `download_app`) | 承接具体意图，调度服务层，编排用户反馈，清理界面上下文。 |
| **UIAdapter** | 前端交互隔离与提供 | 封装基于 `utools` 的通知 (`showNotification`) 和列表回调刷新。 |

### 2.2 数据同步与解析流程 (Data Sync Workflow)

```plantuml
@startuml
title Hotkey Service - 数据同步与解析流程 (Data Sync Workflow)

actor User
participant Preload
participant UIAdapter as UI
participant Registry
participant Handler as "DownloadAppHandler"
participant Loader as "HotkeyDataLoader"
participant Parser as "HotkeyCheatsheetParser"
participant SQLite as "SqliteService"
participant Web as "Web Source"

User -> Preload : 点击列表项（如"下载快捷键配置"）
Preload -> Registry : handle('download_app_hotkeys', data, ui, context)
Registry -> Handler : 执行 handle()
Handler -> UI : setLoading / showNotification (获取数据中)
Handler -> Loader : fetchAndProcessAppHotkeys()
Loader -> Web : HTTP Fetch(HTML + Next.js RSC)
Web --> Loader : 返回原生流数据
Loader -> Parser : 解析提取全量快捷键字典
Parser --> Loader : 返回结构化快捷键及标题等信息
Loader -> SQLite : 持久化快捷键数据集
Loader -> Loader : 自动清理旧的 utools.db 同步缓存
Loader --> Handler : 返回成功 (true)
Handler -> UI : 关闭加载反馈、清除输入并退出模式
Handler -> UI : 渲染主页列表展示最新结果
@enduml
```

### 2.3 存储策略 (Storage Strategy)

为了平衡 uTools 1MB 数据库限制与大量快捷键数据的需求，系统采用了**双层存储架构**：

1.  **Metadata (uTools DB)**: 存储应用列表、同步状态、最近使用记录。确保核心搜索逻辑能快速找到“哪些应用已同步”。
2.  **Bulk Data (SQLite)**: 通过 `sql.js` (WASM) 存储成千上万条具体的快捷键记录。
    *   **Apps 表**: 存储 `id`, `name`, `icon`, `updated_at`。
    *   **Shortcuts 表**: 存储 `title`, `description`, `keys_json`, `keyword`, `category`，并建立 `app_id` 索引及外键级联删除。

### 2.4 按键标准化 (Key Normalization)
解析器会对网页抓取的原始符号进行转换，确保跨平台逻辑一致：
*   `cmd`, `⌘`, `command` → `command`
*   `opt`, `⌥`, `alt` → `option` (Mac) 或 `alt` (Windows)
*   `arrowup`, `up arrow` → `up`
*   ...以及更多符号的统一映射。
