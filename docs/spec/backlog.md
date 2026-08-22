# 技术债与需求待办清单 (Backlog)

本文档记录项目中识别出的架构技术债、待优化的性能瓶颈以及后续版本规划的特性待办。

---

## 🛠️ 技术债清单 (Technical Debts)

### TD-0001: 重构 `app_filter.js` 匹配算法并移除 `item.keyword` 模糊包含匹配

- **关联模块**: `src/adapter/app_filter.js`
- **关联设计**: [SPEC-00017: 应用名称别名标准化](file:///Users/guangyu/Projects/utools/utools_shortcut_keys/docs/spec/archive/spec-00017-app-matching-alias-normalization.md)、[SPEC-00019: 自定义应用进程名称斜线命令](file:///Users/guangyu/Projects/utools/utools_shortcut_keys/docs/spec/spec-00019-custom-app-process-mapping.md)
- **提出时间**: 2026-08-22
- **优先级**: Medium (建议在 SPEC-00019 交付后作为独立重构任务实施)

#### 1. 现状与痛点
当前 `app_filter.js` 在响应前台应用窗口快捷键匹配（`app_shortcuts`）时，保留了早期版本的历史兜底规则：
```javascript
// 规则 2 (历史兜底): Keyword 包含模糊匹配
if (rawAppName && item.keyword && item.keyword.toLowerCase().indexOf(rawAppName) !== -1) {
    return true;
}
```

#### 2. 问题与风险分析
1. **跨应用快捷键严重误召回 (False Positives)**：
   - 当用户在前台运行 `Code.exe` (VS Code) 唤出 uTools 时，`rawAppName` 为 `"code"`。
   - Google Chrome、Safari 等其他应用若某条快捷键的关键词包含 `"code"`（例如“查看源代码 / View Source Code”），将被错误判定为 VS Code 快捷键并混杂在列表中。
   - 对于 `win`、`tab`、`app`、`terminal` 等简短进程名，极易引发大面积快捷键误召回。
2. **性能与重复计算开销**：
   - 随快捷键数据量增至数千条，每次窗口进入时在 $O(N)$ 循环内对每个 item 进行多次字符串 lowerCase 及子串查找，增加了不必要的 CPU 耗时与垃圾回收 (GC) 负担。

#### 3. 重构目标与解决方案
1. **废弃 `item.keyword` 模糊子串匹配**：
   - 鉴于 SPEC-00017 已建立标准化 AppId 与别名映射（`AppIdNormalizer`），SPEC-00019 已提供用户手动进程绑定（`AppMappingStorage`），所有合法应用均已有精确识别机制，不再需要也不应使用模糊子串兜底。
2. **预构建反向索引表 (Inverted Index Set, $O(1)$ 匹配)**：
   - 进入 `enter()` 时单次读取 `customMappings` 并构建当前窗口对应的 `TargetAppIdSet`。
   - 过滤逻辑精简为：
     ```javascript
     const filtered = shortcuts.filter(item => {
         const normId = normalizeAppId(item.appId);
         return normId && targetAppIdSet.has(normId);
     });
     ```
   - 将过滤判断提升至 $O(1)$ 哈希命中，彻底消除误匹配，单次过滤耗时降低至 < 0.5ms。

---
