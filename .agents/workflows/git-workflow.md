---
description: 增量 Git 提交工作流 (Incremental Git Commit Workflow)，指导开发者在开发过程中小步快跑、按原子可提交状态及时提交
---

# 增量 Git 提交工作流 (Incremental Git Workflow)

在开发过程中，严禁堆积修改到最后进行一次性“大爆炸”提交。一旦满足独立可提交状态，必须立即执行 `git commit`。

## 1. 独立可提交状态 (Atomic Committable State) 判定
在满足以下全部条件时，即刻触发 commit：
- [x] **原子任务完成**: 单个 TDD 任务或独立的子模块重构/修复已完成。
- [x] **单测全绿 (All Green)**: 运行 `npm test` 确认所有测试用例均通过，无未解决的失败断言。
- [x] **无副作用/语法错误**: 代码无破坏性修改，无编译或运行时语法异常。

## 2. 提交步骤
1. **精确暂存变更**:
   ```bash
   git add <相关源码文件> <相关测试文件>
   ```
   *注意：避免盲目 `git add .` 将临时文件或日志一并提交。*

2. **编写结构化英文 Commit Message**:
   严格按照 [.antigravity/git_commit_specification.md](file:///Users/guangyu/Projects/utools/utools_shortcut_keys/.antigravity/git_commit_specification.md) 格式执行提交：
   ```bash
   git commit -m "<Category>: <Summary>" -m "How do we do it:
   - <Step 1>
   - <Step 2>

   Now it works like <Effect>."
   ```

3. **常用 Category**:
   - `Feature`: 新功能或行为增强。
   - `BugFix`: 缺陷修复。
   - `Refactor`: 绿灯保护下的代码重构。
   - `Test`: 测试用例新增或优化。
   - `Docs`: 文档与规格更新。
   - `Chore`: 构建脚本或依赖更新。
