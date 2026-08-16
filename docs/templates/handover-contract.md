# 阶段交接契约 (Handover Contract)

> 💡 **说明**：此契约是跨 Agent（Designer / UI Designer / Planner / Developer / Code Reviewer / Tester / Tech Leader）流转时的标准输入输出契约。每个阶段完结时，当前 Agent 必须生成或更新此契约并移交给下一个阶段的接收方。

---

## 📌 契约元数据 (Metadata)

| 字段 | 信息 |
| :--- | :--- |
| **任务编号 / 名称** | `[例如: SPEC-00003-download-app-hotkeys]` |
| **所属功能模块** | `[例如: shortcuts / common_method / ui]` |
| **移交方 Agent (Sender)** | `[designer / ui-designer / planner / developer / code-reviewer / tester]` |
| **接收方 Agent (Receiver)** | `[planner / developer / code-reviewer / tester / techleader]` |
| **交接时间** | `YYYY-MM-DD HH:mm:ss` |
| **当前交付状态** | `[✅ 阶段完成 (Ready for Next) / ❌ 审查未通过打回 (Rejected) / ⏳ 阶段进行中]` |

---

## 📦 阶段交付物清单 (Deliverables & Artifacts)

### 1. 核心产出物路径 (Artifact Paths)
- **设计/规格文档**: `[例如: docs/spec/spec-00003-xxx.md]`
- **UI 原型资源**: `[例如: docs/assets/ui/ui-feature-xxx.png]` (如有)
- **代码变更范围**:
  - 新增/修改文件: `[例如: src/core/shortcuts.js, preload.js]`
  - 测试文件: `[例如: test/shortcuts.test.js]`
- **测试/审查报告**: `[例如: 详见下文或独立报告链接]`

### 2. 核心技术决策与变更摘要 (Key Decisions & Summary)
- **设计/实现亮点**: `[简述核心思路、数据结构、命令分发等]`
- **取舍与权衡 (Trade-offs)**: `[说明为何选择方案 A 而非方案 B]`

---

## 🛡️ 质量门禁自检 (Quality Gate Verification)

移交方在发起交接前，必须逐项勾选确认：

- [ ] **规范遵从**: 严格遵守 `.antigravity/development_standards.md` 与项目架构分层。
- [ ] **中文文档**: 设计/说明文档主体全部使用中文，逻辑图使用 PlantUML。
- [ ] **TDD 履约**: 生产代码有对应的自动化测试支撑，本地执行 `npm test` 结果全部绿灯 (All Green)。
- [ ] **外科手术式变更**: 未引入无关文件修改、无意义格式化或过度设计。
- [ ] **异常与性能**: 关键路径均有异常兜底，未引入阻塞主线程的同步耗时操作。

---

## 🎯 接收方行动指南 (Action Items for Receiver)

### 给 `[接收方 Agent 名称]` 的具体要求：
1. **输入上下文研读**: 重点阅读 `[指定文档/文件/函数]`。
2. **核心执行任务**:
   - [ ] 任务 1: `[具体操作要求]`
   - [ ] 任务 2: `[具体操作要求]`
3. **输出物要求**: 完成后需产出 `[设计文档 / 绿灯代码 / 审查报告 / 测试报告]`，并回传或生成下一阶段的 Handover Contract。

---

## ⚠️ 已知风险与特别注意事项 (Known Risks & Caveats)

- **潜在边界/风险**: `[例如: uTools dbStorage 存储超限回退机制需要下游重点测试]`
- **待后续迭代事项**: `[例如: 本期暂不支持批量导出，留待下一期需求]`
