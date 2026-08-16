# 项目开发与文档规范

为了保持项目的一致性和高质量，所有功能建议和文档编写应遵循以下规范：

## 1. 文档编写规范
- **文档结构**: 至少包含以下核心板块：
  - **目标**: 简述功能的核心目的。
  - **用户流程**: 描述用户的使用步骤。
  - **详细设计**: 
    - **逻辑优先使用 UML 图（PlantUML 语法，禁止使用mermaid画UML图）阐述**。
    - 提供核心逻辑的 **伪代码** 或 **类设计说明**。
    - 说明数据存储（如 `utools.dbStorage`）和 UI 交互细节。
  - **测试设计**: 描述测试方案、具体的测试用例及验证点。
  - **任务拆分**: 使用带有复选框的任务列表，方便跟踪进度。
- **语言**: 文档主体使用 **中文**。所有生成的实施计划 (Implementation Plan) 和任务列表 (Task List) 均必须使用 **中文** 编写。

## 2. 架构设计规范
- **设计原则**: 严格遵循 **SOLID 原则**，确保模块与类设计做到 **高内聚、低耦合**，职责划分清晰，依赖倒置，保持系统的易维护性与扩展性。
- **逻辑分层**:
  - `preload.js`: 仅负责 uTools API 的对接与方法暴露。
  - `common_method.js`: 负责核心业务逻辑。
  - `shortcuts.js`: 负责快捷键配置的加载。
- **扩展性模式**:
  - 对于斜线命令（Slash Commands），必须遵循 **命令分发模式 (Command Dispatcher)**。
  - 命令逻辑应封装在独立的接口实现类/对象中。
- **快捷键配置**: 所有的快捷键数据应当存放于 `shortcuts/` 目录下的 `.js` 文件。

## 3. UI/UX 要求
- **体验设计**: 界面交互需保持流畅，必要时使用 Loading 状态提示。
- **鲁棒性**: 必须处理网络请求失败、数据格式错误等各种边界情况。

## 4. Git 增量提交规范 (Incremental Git Workflow)
所有项目提交必须遵循 [.antigravity/git_commit_specification.md](file:///Users/guangyu/Projects/utools/utools_shortcut_keys/.antigravity/git_commit_specification.md) 中的规范：
- **及时增量提交**: 在开发过程中，一旦满足“独立可提交状态”（单项原子任务完成、单测全绿、代码无语法/编译错误），应当立即执行 `git commit` 提交修改，严禁全部开发完成再一次性大爆炸提交。
- **全文英文**: commit 信息必须采用英文。
- **标题**: `<Category>: <Summary>`
- **正文**: 详细说明实施步骤 (`How do we do it`) 和最终效果 (`Now it works like`)。
