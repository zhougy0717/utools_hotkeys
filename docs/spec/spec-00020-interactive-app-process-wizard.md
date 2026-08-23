# SPEC-00020: 快捷键应用进程匹配交互状态机与文本编辑闭环设计

## 1. 功能目标与背景

### 1.1 现状与根本原因剖析 (Root Cause Analysis)

在 SPEC-00019 的实施过程中，出现点击应用后界面频繁闪烁并重置回初始 4 个应用列表（无法进入应用配置子菜单及文本编辑框）的问题。经全链路代码追踪，核心根因如下：

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       三大根因剖析                                               │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. 实例状态分裂 (Instance Split):                                                                │
│    - slash_commands/index.js 注册了 new AppCommand() (实例 A)                                    │
│    - app_action_handler.js 内部引用了 defaultAppCommand (实例 B)                                 │
│    - 用户点击 /app 时，preload.js 的 g_activeCommand 指向 实例 A                                   │
│    - 用户点击应用时，AppActionHandler 将状态修改到了 实例 B，实例 A 状态仍然是 LIST                │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. setSubInputValue 触发的搜索事件风暴 (Event Race Condition):                                   │
│    - 当调用 utools.setSubInputValue(val) 时，uTools 宿主会立即异步派发 search(val) 事件          │
│    - preload.js 收到 search 后调用 g_activeCommand (实例 A).execute(val)                         │
│    - 实例 A 处于 LIST 态且 query 不匹配，立即将列表冲刷覆盖为全局列表或空提示                     │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. 缺乏显式的状态控制器 (State Machine):                                                         │
│    - 之前在 ActionHandler 与 Command 之间通过零散变量协作，缺乏单一真实状态源 (Single Source)    │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### 问题复现活动图 (Activity Diagram)

```plantuml
@startuml
skinparam activity {
    BackgroundColor LightYellow
    BorderColor DarkSlateGray
    ArrowColor DarkSlateGray
}

title 实例状态分裂与事件风暴导致界面重置的问题活动图

|用户与宿主|
start
:1. 用户输入 '/app' 并回车;

|Preload (宿主入口)|
:2. g_activeCommand = 实例A (来自 SlashCommandManager);
:3. 实例A.state = 'LIST', 渲染应用列表;

|用户与宿主|
:4. 用户点击目标应用 (如 Google Chrome);

|AppActionHandler|
:5. 触发 select_app_for_mapping 动作;
#Pink:6. 错误修改了 实例B.state = 'APP_MENU'
(实例A 状态仍停留在 'LIST');
:7. 调用 utools.setSubInputValue('');

|用户与宿主|
:8. 宿主收到输入框变更，异步派发 search('') 事件;

|Preload (宿主入口)|
:9. 收到 search('')，调用 g_activeCommand.execute('');
#Red:10. 执行的是 实例A.execute('') (依然为 'LIST' 态);

|用户与宿主|
#LightCoral:11. 界面被冲刷覆盖，闪退回 4 个应用列表 (错误现象);
stop
@enduml
```

#### 问题复现状态机图 (State Machine Diagram for Instance 1)

```plantuml
@startuml

skinparam state {
    BackgroundColor LightYellow
    BorderColor DarkSlateGray
    ArrowColor DarkSlateGray
}

title 实例1 (preload.js 中持有的活跃 g_activeCommand) 异常状态变迁图

[*] --> LIST : 1. 用户输入 '/app' 激活实例1\n(初始状态 state = 'LIST')

state LIST : 【应用选择态】
state LIST : execute('') 行为: 重新拉取并渲染4个应用列表

state APP_MENU #Pink : 【应用管理子菜单态】
state APP_MENU : (预期状态，但由于 Handler 错误修改了实例2，\n实例1从未接收到跃迁信号，无法进入此状态)

LIST --> LIST : 2. 用户点击应用触发 select_app_for_mapping\n3. setSubInputValue('') 导致宿主触发 search('')\n4. preload.js 执行 实例1.execute('')\n5. 实例1 仍处于 LIST 态，自环重新渲染应用列表 (闪退回4应用)

LIST --> [*] : 用户退出插件或切换命令
@enduml
```



### 1.2 核心目标
1. **全局唯一状态机单例 (Unified Command Singleton)**：
   - 统一 `AppCommand.defaultAppCommand` 为工程中唯一的应用匹配命令单例，彻底消除多实例状态割裂。
2. **确定性 4 状态机架构 (Deterministic State Machine)**：
   - `LIST`（应用列表检索态）
   - `APP_MENU`（应用专属 4 项管理子菜单态）
   - `EDIT_PROCESS`（进程名文本编辑与预设项选择态）
   - `LIST_CUSTOM`（自定义进程名列表与单项删除态）
3. **输入框实时编辑与预设项完美呈现 (Editable Wizard UX)**：
   - 进入 `EDIT_PROCESS` 态时，uTools 搜索框自动预置推荐进程名（如 `One Commander.exe` 或 `Microsoft Edge.app`）；
   - 列表首项展示 `💾 确认保存: <当前输入框内容>`（支持用户在搜索框中随意修改文本，按回车或点击直接保存）；
   - 列表第 2、3 项展示规范化预设项（无空格版、Mac/Win 跨平台版）；
   - 列表末项提供返回上级配置菜单按钮。
4. **生命周期与清理保护 (Lifecycle Guard)**：
   - 插件退出（`onPluginOut`）或进入其他命令时，自动重置状态机为 `LIST` 态，避免状态污染。

---

## 2. 状态机模型与用户交互流程 (State Machine & User Flow)

### 2.1 状态转移图 (PlantUML)

```plantuml
@startuml
skinparam state {
    BackgroundColor LightYellow
    BorderColor DarkSlateGray
    ArrowColor DarkSlateGray
}

[*] --> LIST : 用户输入 /app 或 /bind

state LIST : 【应用选择态】
state LIST : 检索已加载的所有应用列表

state APP_MENU : 【应用管理子菜单态】
state APP_MENU : 1. ➕ 添加/追加自定义进程名\n2. 📋 管理/删除自定义进程名\n3. 🔄 重置为默认推导规则\n4. ↩️ 返回应用列表

state EDIT_PROCESS : 【进程名编辑与预设态】
state EDIT_PROCESS : 1. 💾 确认保存: <当前输入框文本>\n2. ➕ 【预设项】无空格版\n3. ➕ 【预设项】跨平台兼容版\n4. ↩️ 返回配置菜单

state LIST_CUSTOM : 【自定义进程管理态】
state LIST_CUSTOM : 1. ❌ 删除指定自定义进程名\n2. ↩️ 返回配置菜单

LIST --> APP_MENU : 点击目标应用 (select_app_for_mapping)
APP_MENU --> LIST : 点击返回应用列表 (return_to_app_list)
APP_MENU --> EDIT_PROCESS : 点击添加自定义进程名 (prompt_add_app_mapping)
EDIT_PROCESS --> APP_MENU : 保存成功 (confirm_add_app_mapping) 或点击返回
APP_MENU --> LIST_CUSTOM : 点击管理/删除自定义进程名 (list_custom_app_mappings)
LIST_CUSTOM --> APP_MENU : 删除完成或点击返回 (select_app_for_mapping)

LIST --> [*] : 用户退出插件或切换其他斜线命令
APP_MENU --> [*] : 用户退出插件
EDIT_PROCESS --> [*] : 用户退出插件
LIST_CUSTOM --> [*] : 用户退出插件
@enduml
```

### 2.2 4 大交互界面原型 (UI Wireframes)

#### 界面 1: 应用选择态 (`LIST`)
```
[输入框]: /app chrome
--------------------------------------------------------------------------------
Google Chrome
  匹配进程: [Google Chrome.app, google-chrome.app 等共 20 个] · 点击配置关联进程
--------------------------------------------------------------------------------
Microsoft Edge
  匹配进程: [Microsoft Edge.app, Microsoft Edge.exe 等共 5 个] · 点击配置关联进程
```

#### 界面 2: 应用专属管理子菜单 (`APP_MENU`)
```
[输入框]: (空)
--------------------------------------------------------------------------------
➕ 添加/追加自定义进程名
  为 [One Commander] 添加操作系统进程名 (如 One Commander.exe, OneCommander.exe 等)
--------------------------------------------------------------------------------
📋 管理/删除自定义进程名 (1)
  已手动添加 1 个: OneCommanderCustom.exe
--------------------------------------------------------------------------------
🔄 重置为默认推导规则
  清除 [One Commander] 的所有手动配置项，恢复默认自动推导
--------------------------------------------------------------------------------
↩️ 返回应用列表
  返回 /app 快捷键应用管理主列表
```

#### 界面 3: 进程名文本编辑与预设项 (`EDIT_PROCESS`)
```
[输入框]: One Commander.exe (已预填，光标激活可编辑)
--------------------------------------------------------------------------------
💾 确认保存: One Commander.exe
  支持直接在上方输入框修改文本，回车或点击立即保存
--------------------------------------------------------------------------------
➕ 【预设项】OneCommander.exe (无空格版)
  点击立即将 [OneCommander.exe] 绑定至 [One Commander]
--------------------------------------------------------------------------------
➕ 【预设项】One Commander.app (Mac 兼容版)
  点击立即将 [One Commander.app] 绑定至 [One Commander]
--------------------------------------------------------------------------------
↩️ 返回 [One Commander] 配置菜单
  取消添加并返回
```

#### 界面 4: 自定义进程管理与删除 (`LIST_CUSTOM`)
```
[输入框]: (空)
--------------------------------------------------------------------------------
❌ 删除: OneCommanderCustom.exe
  点击移除该自定义进程匹配规则
--------------------------------------------------------------------------------
↩️ 返回 [One Commander] 配置菜单
  返回上级操作
```

---

## 3. 详细架构设计 (Detailed Architecture)

### 3.1 架构组件与依赖关系 (PlantUML)

```plantuml
@startuml
skinparam componentStyle rectangle

package "Preload Adapter Layer" #F8F9FA {
    [preload.js] as Preload
    [actionRegistry] as ActionRegistry
}

package "Core Slash Commands & State Machine" #E8F5E9 {
    [AppCommand.defaultAppCommand] as AppCmd <<Singleton State Machine>>
}

package "Core Action Handlers" #E3F2FD {
    [AppActionHandler.defaultAppActionHandler] as AppHandler <<Action Dispatcher>>
}

package "Infrastructure Layer" #FFF3E0 {
    [AppMappingStorage] as Storage
    [AppFeatureSyncService] as SyncService
}

Preload --> AppCmd : 1. search(word) 派发至状态机
Preload --> ActionRegistry : 2. select(item) 动作分发
ActionRegistry --> AppHandler : 3. handle(action, itemData)
AppHandler --> AppCmd : 4. setState() 驱动状态跃迁并重绘
AppHandler --> Storage : 5. 持久化存储 (CRUD)
AppHandler --> SyncService : 6. syncApp() 动态注入 match.app
@enduml
```

### 3.2 文本编辑与即时同步时序图 (PlantUML)

```plantuml
@startuml
autonumber
actor "用户" as User
participant "uTools 宿主" as UTools
participant "preload.js" as Preload
participant "AppActionHandler" as Handler
participant "AppCommand" as StateMachine
participant "AppMappingStorage" as Storage
participant "AppFeatureSyncService" as SyncService

== 1. 进入编辑态 ==
User -> UTools: 点击添加自定义进程名
UTools -> Preload: select(prompt_add_app_mapping)
Preload -> Handler: handlePromptAdd(itemData)
Handler -> StateMachine: setEditProcessState(app)
Handler -> UTools: setSubInputValue('One Commander.exe')
UTools -> Preload: search('One Commander.exe')
Preload -> StateMachine: execute('One Commander.exe')
StateMachine --> UTools: callbackSetList(可编辑保存项 + 预设项 + 返回项)

== 2. 用户在输入框修改文本 ==
User -> UTools: 键盘输入修改为 OneCommander_x64.exe
UTools -> Preload: search('OneCommander_x64.exe')
Preload -> StateMachine: execute('OneCommander_x64.exe')
StateMachine --> UTools: callbackSetList(确认保存: OneCommander_x64.exe ...)

== 3. 回车或点击保存 ==
User -> UTools: 回车或点击首项
UTools -> Preload: select(confirm_add_app_mapping)
Preload -> Handler: handleConfirmAdd(itemData)
Handler -> Storage: addMapping(appId, 'OneCommander_x64.exe')
Handler -> SyncService: syncApp(appId, appName)
SyncService -> UTools: setFeature(updatedFeature)
Handler -> StateMachine: setAppMenuState(app)
Handler -> UTools: setSubInputValue('')
Handler -> StateMachine: execute('')
StateMachine --> UTools: callbackSetList(4项管理子菜单)
@enduml


```

---

## 4. 核心代码规范与实现细节

### 4.1 单例保证 (`src/core/slash_commands/index.js`)
必须直接注册 `defaultAppCommand`，严禁 `new AppCommand()` 产生分裂实例：
```javascript
const { defaultAppCommand } = require('./app.js');

function initCommands() {
  slashCommandManager.register(defaultAppCommand);
}
```

### 4.2 状态机控制 (`src/core/slash_commands/app.js`)
```javascript
class AppCommand {
  constructor(options = {}) {
    this.keyword = '/app';
    this.aliases = ['/bind'];
    this.state = 'LIST'; // 'LIST' | 'APP_MENU' | 'EDIT_PROCESS' | 'LIST_CUSTOM'
    this.currentApp = null;
  }

  reset() {
    this.state = 'LIST';
    this.currentApp = null;
  }

  setAppMenuState(app) {
    this.state = 'APP_MENU';
    this.currentApp = app;
  }

  setEditProcessState(app) {
    this.state = 'EDIT_PROCESS';
    this.currentApp = app;
  }

  setListCustomState(app) {
    this.state = 'LIST_CUSTOM';
    this.currentApp = app;
  }
}
```

---

## 5. 测试用例与验证矩阵 (Test Verification Matrix)

| 用例编号 | 测试场景 | 预期结果 |
|---|---|---|
| **TC-001** | `/app` 初始渲染与关键词过滤 (`LIST` 态) | 返回已加载的应用列表，支持 `/bind` 别名 |
| **TC-002** | 选中应用进入 `APP_MENU` 态 | 渲染 4 项管理子菜单，不发生状态回退 |
| **TC-003** | 点击添加进入 `EDIT_PROCESS` 态 | 渲染首项 `💾 确认保存: <defaultVal>`、2 项预设候选及返回按钮 |
| **TC-004** | 在 `EDIT_PROCESS` 态下修改输入框文本 | 首项动态更新为用户输入的最新字符串，保持可点击保存 |
| **TC-005** | 点击保存后状态流转 | 数据写入存储，触发 `syncApp` 动态注入，状态自动返回 `APP_MENU` 态 |
| **TC-006** | 进入 `LIST_CUSTOM` 态删除进程名 | 渲染已添加项，删除后即时从 DB 和 Feature 中同步移除 |
| **TC-007** | 重置与生命周期清理 | 点击重置恢复默认推导，退出插件时状态重置为 `LIST` |
