---
description: 提交当前工作区修改但未提交的代码 (Commit uncommitted changes)
---

# Git Commit 工作流 (/git-commit)

// turbo-all

这个工作流用于自动化检查、验证并提交当前工作区中已修改但未提交的代码。

## 📋 执行步骤

1. **检查变更状态 (Inspect Status)**:
   - 执行 `git status` 与 `git diff`，查看当前暂存与未暂存的所有变更文件。
   - 若当前工作区干净（无任何变更），提示用户并直接结束。

2. **验证代码正确性 (Run Verification)**:
   - 若涉及代码/测试变更，执行 `npm test` 确保所有单元测试全绿通过。
   - 确认无语法错误或破损逻辑。

3. **精准暂存变更 (Stage Changes)**:
   - 明确指定修改的文件（例如 `git add src/core/shortcuts.js test/shortcuts.test.js`），避免将临时文件、未跟踪日志盲目带入。

4. **生成规范 Commit Message 并提交**:
   - 严格遵循 [.antigravity/git_commit_specification.md](file:///Users/guangyu/Projects/utools/utools_shortcut_keys/.antigravity/git_commit_specification.md) 格式：
     - **语言**: 全英文。
     - **Title**: `<Category>: <Summary>`（首字母大写，无句号，50 字符内）。
       - Category: `Feature`, `BugFix`, `Refactor`, `Docs`, `Test`, `Style`, `Perf`, `Chore`。
     - **Body**:
       ```text
       How do we do it:
       - <Step 1>
       - <Step 2>

       Now it works like <Effect>.
       ```
   - 执行 `git commit`。

5. **输出提交结果 (Show Result)**:
   - 执行 `git log -1 --stat` 展示刚提交的 Commit Hash、标题及变更文件统计，向用户汇报提交完成。

---

### 使用方法：
- 在聊天框输入 `/git-commit` 或提示“执行 git-commit 提交当前修改”。
