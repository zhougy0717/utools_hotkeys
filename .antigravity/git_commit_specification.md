# Git Commit 提交规范

为了保持项目提交历史的整洁和可读性，所有 Git commit 必须遵循以下规范。

## 1. 通用规则
- **语言**: 提交信息（Commit Message）全文采用 **英文** 描述。
- **结构**: 采用 **标题 (Title) + 正文 (Body)** 的描述方法。

## 2. 提交模板

```text
<Category>: <Summary>

How do we do it:
- <Step 1>
- <Step 2>
- ...

Now it works like <最终效果或行为的简述>.
```

### 2.1 标题格式 (Title)
标题应限制在单行（建议 50 字符以内）。
- **Category**: 使用一个单词描述 commit 分类。常用分类包括：
  - `Feature`: 新功能或增强。
  - `BugFix`: 修复 bug。
  - `Refactor`: 代码重构（不影响功能）。
  - `Docs`: 文档修改。
  - `Style`: 格式调整（空格、分号等，不影响逻辑）。
  - `Test`: 测试用例相关。
  - `Perf`: 性能优化。
  - `Chore`: 构建过程、辅助工具或依赖库的变动。
- **Summary**: 用一句话简单描写这个 commit 做了什么。采用祈使句，首字母大写，结尾不加句号。

### 2.2 正文格式 (Body)
正文用简洁的语句描述具体细节。
- **How do we do it**: 列出实现的核心步骤或逻辑变动。
- **Now it works like**: 描述最终实现的效果，以及对系统或用户的影响。

---

## 3. 示例

### 新功能示例 (Feature)
```text
Feature: Support downloading app-specific hotkeys

How do we do it:
- Added `hotkey_scraper.js` to parse data from hotkeycheatsheet.com
- Implemented `downloadHotkeys(appId)` in the core service
- Updated the UI to show a download progress bar

Now it works like users can search for an application and download its shortcuts directly to their local storage.
```

### 修复示例 (BugFix)
```text
BugFix: Resolve crashing when network is disconnected

How do we do it:
- Wrapped the fetch call in a try-catch block in `api_client.js`
- Added a fallback to local cache if the remote request fails

Now it works like the app remains stable and notifies the user about the connection status instead of crashing.
```

### 重构示例 (Refactor)
```text
Refactor: Extract word-wrap logic to utility module

How do we do it:
- Moved the greedy wrapping algorithm from `main.js` to `utils/text_utils.js`
- Exported `wrapString` function for better reusability

Now it works like the code is cleaner and the wrapping logic can be easily tested in isolation.
```
