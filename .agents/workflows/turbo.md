---
description: 自动运行开发命令的工作流 (Auto-run development commands)
---

// turbo-all

这个工作流授权在当前项目上下文下自动运行以下安全命令列表，而无需人工确认：

1. **依赖与脚本 (npm/npx)**: 运行 `npm install`, `npm test`, `npm run dev` 等。
2. **版本管理 (git)**: 运行 `git status`, `git commit`, `git add`, `git push` 等。
3. **脚本执行 (node)**: 运行 `node [script_name].js` 进行验证或辅助处理。
4. **外部连通性 (curl)**: 运行 `curl` 验证 `hotkeycheatsheet.com` 的响应状态。

---

### 💡 自动运行最佳实践 (Best Practices for AI Agent)：
- **原子化命令**：优先将复杂的链式命令（如 `git add; git commit; git push`）拆分为独立的原子步骤执行。这能大幅提高 `SafeToAutoRun` 的自动执行成功率，防止因单个子命令波动而打断整个流。
- **环境逻辑适配**：在 Windows 环境下，Agent 应优先使用 `;` 而非 `&&` 来连接命令，或者完全拆分执行，以规避 PowerShell 的语法解析敏感点。
- **保持命令简洁**：系统对逻辑过于复杂的长链式指令会有更严格的安全审核。单次 `run_command` 的逻辑越清晰，自动执行就越顺滑。

---

### 使用方法：
当需要执行上述任务时，请通过 "遵循 turbo 工作流" 或 "使用自动执行工作流" 来触发。
