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

### 使用方法：
当需要执行上述任务时，请通过 "遵循 turbo 工作流" 或 "使用自动执行工作流" 来触发。
