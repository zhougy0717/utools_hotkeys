---
description: 输入需求描述文档，生成软件设计并写入原文档的工作流 (Generate software design from spec)
---

// turbo
这个工作流会自动分析需求并在指定的 `doc/spec/` 文件中填充详细的技术方案与任务拆分。

1. **输入文件**: 接收一个位于 `doc/spec/` 目录下的 `.md` 文件路径（例如 `doc/spec/spec-00002-support-download-app-hotkeys.md`）。
2. **读取需求**: 读取该文件及其关联的所有上下文。
3. **技术调研**:
    - 检查现有的 `preload.js`, `common_method.js`, `shortcuts.js` 等核心逻辑。
    - 确认该功能所需的 API (如 `utools.dbStorage` 或 `utools.db`) 和 UI 反馈方式。
4. **生成设计方案**: 按照 `.antigravity/development_standards.md` 的规范生成完整设计。
    - **目标**: 核心目的。
    - **用户流程**: 交互步骤。
    - **详细设计**: 架构图 (PlantUML)、核心伪代码、存储与 UI 细节。
    - **任务拆分**: 为该功能创建待办列表。
5. **内容写入**: 将生成的详细设计和任务覆盖（或追加到）原文档中。
6. **验证**: 检查文档内容是否符合 `.antigravity/development_standards.md` 中的所有要求。

### 使用方法：
- 用户可以发起如下请求：“请遵循 /generate-design [文件路径] 生成详细设计”。
- 或是 “按照设计工作流为 [文件] 补充实现方案”。
