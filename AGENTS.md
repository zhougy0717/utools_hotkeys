# AI Agent 指南 (AGENTS.md)

此文件包含供在这个代码库中工作的 AI 编程 Agent（如 Antigravity、Claude Code、Cursor 等）参考的指令和指南。它基于 Karpathy 的指南、Everything Claude Code (ECC) 以及现代 Agent Skills 的最佳实践。

## 🧠 核心原则 (Karpathy 指南)

1. **三思而后行 (Think Before Coding)**：在行动前验证假设并澄清歧义，而不是靠猜测。如果需求不明确，请勿盲目编写代码。
2. **简单优先 (Simplicity First)**：避免过度设计。优先选择简单、直接且易读的解决方案，而不是复杂的抽象。
3. **精准修改 (Surgical Changes)**：保持专注。避免“顺手”重构、无关的格式修改或其他不相关的变更。只修改完成当前目标所必需的部分。
4. **显式验证 (Explicit Verification)**：在进行修改后，务必运行测试、代码检查（Linters）或进行手动验证。不要理所当然地认为代码能运行——用证据证明它。

## 🛠️ 项目背景与常用命令

- **项目类型**: uTools 插件
- **主要语言**: JavaScript (ES6+)
- **运行环境**: Node.js 和 Browser/Electron (uTools 环境)

### 常用命令
*(Agent: 在运行前始终要检查 `package.json` 中的可用脚本)*
- **安装依赖**: `npm install`
- **构建/开发**: `npm run dev` / `npm run build`
- **代码检查/测试**: 在完成任务前，确保代码通过了现有的 Linting 规则。

## 💻 编码规范

- **代码风格**: 遵循标准的 JavaScript 约定以及项目中已有的模式。
- **文档注释**: 维护并更新复杂函数的 JSDoc 注释。除非你明确地用新的逻辑替换了旧代码，否则请保留所有现有的注释。
- **错误处理**: 优雅地处理错误。确保错误被妥善捕获并记录，尤其是在面向用户的 UI 或核心逻辑中。
- **状态与性能**: 牢记性能问题，避免不必要的重新渲染或可能阻塞主线程的繁重同步操作。

## 🤖 Agent 工作流 (Agent Skills & ECC)

- **理解上下文 (Understand Context)**: 在开始复杂任务前，务必检查 `.agents/skills` 或特定于本仓库的工作流。
- **使用合适的工具 (Use the Right Tools)**: 积极使用代码图 (code graph)、搜索工具和语义分析来理解代码关联，然后再去修改代码。
- **编写规划产物 (Artifacts for Planning)**: 对于复杂的更改，请先编写一个实施计划（如 `implementation_plan.md`）并在获得用户的批准后再编写代码。
- **分步执行 (Step-by-Step Execution)**: 将大型任务分解为更小的、可验证的步骤。不要试图在单个对话轮次中进行大规模、多文件、且未经中间状态测试的重写。
