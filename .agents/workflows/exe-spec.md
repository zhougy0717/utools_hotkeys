---
description: 拉起 TechLeader 编排并执行指定 spec 设计文档的端到端开发任务 (Execute feature development from spec via TechLeader)
---

# 执行 Spec 开发工作流 (/exe-spec)

// turbo-all

这个工作流用于接收一个现有的详细设计文档（Spec）及用户的附加输入，拉起 `techleader` 统筹调度整个研发管线（Planner ➡️ Developer ➡️ Code-Reviewer ➡️ Tester），严格基于阶段交接契约（Handover Contract）驱动端到端开发落地，并在最终交付后将 Spec 归档。

---

## 📥 输入参数

1. **Spec 文档路径**: 位于 `docs/spec/` 下的设计文档路径（例如 `docs/spec/spec-00008-refactor-hotkey_service.md`）。
2. **用户附加指令 (User Input)**: 用户针对本次开发提出的特定要求、补充说明、边界微调或关注重点。

---

## 📋 执行步骤

### 1. 激活并委派 TechLeader (`.agents/agents/techleader.md`)
- 启动 `techleader` 角色作为流程总调度员。
- 将目标 `spec` 文档完整内容与用户的附加指令作为初始上下文注入。

### 2. 检查与准备 Spec 上下文
- 确认目标 `docs/spec/*.md` 结构完备（包含架构设计、PlantUML 图、接口契约、测试用例设计与任务清单）。
- 结合用户的附加指令，明确本次执行的增量重点与约束条件。
- 生成或初始化 **【阶段交接契约 1: Designer/Spec ➡️ Planner】**。

### 3. 驱动标准研发管线 (Pipeline Execution)

```
[docs/spec/*.md + 用户输入]
        │
        ▼
   techleader (调度中心)
        │
        ├─► [阶段 2: 实施规划] ──► planner
        │       └─ 产出: 原子化 TDD 任务清单 + 【契约: Planner ➡️ Developer】
        │
        ├─► [阶段 3: TDD 编码] ──► developer
        │       └─ 过程: 严格红绿循环 + 增量 Git 提交 (单项完成即 commit)
        │       └─ 产出: 绿灯代码与测试 + 【契约: Developer ➡️ Code-Reviewer】
        │
        ├─► [阶段 4: 代码审查] ──► code-reviewer
        │       └─ 门禁: 高置信度审查 (未通过打回修改，通过则放行)
        │       └─ 产出: 【契约: Code-Reviewer ➡️ Tester】
        │
        ├─► [阶段 5: 质量验收] ──► tester
        │       └─ 过程: 自动化测试 (npm test) + 场景边界验收
        │       └─ 产出: 测试验收报告 + 【契约: Tester ➡️ Tech Leader】
        │
        └─► [阶段 6: 归档交付] ──► techleader
                ├─ 1. 将 spec 归档: docs/spec/*.md ➡️ docs/spec/archive/
                └─ 2. 汇总 Git Commit 历史与测试报告，向用户汇报交付
```

### 4. 归档与最终交付
- **文档归档 (HARD_GATE)**: 开发与验收全部通过后，将目标 Spec 文件移动至 `docs/spec/archive/`。
- **交付汇报**: 汇报本次实现的变更文件清单、Git 增量提交历史（`git log`）以及 `npm test` 测试全绿证据。

---

### 💡 使用方法：

- `/exe-spec docs/spec/spec-00008-refactor-hotkey_service.md`
- `/exe-spec docs/spec/spec-00008-refactor-hotkey_service.md 请注意兼容 Windows 下的快捷键格式，并确保单测覆盖所有边界条件`
- 在对话中提示：“执行 exe-spec 开发 docs/spec/spec-xxx.md，要求 ...”
