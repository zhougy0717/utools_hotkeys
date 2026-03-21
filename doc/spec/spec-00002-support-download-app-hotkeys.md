# 需求设计：下载并持久化特定应用的快捷键 (spec-00002)

## 1. 目标
支持在 `/download` 下载命令的应用列表中，当用户选择某个应用时，自动抓取该应用在 `hotkeycheatsheet.com` 上的所有快捷键配置，并持久化到本地。下载完成后，这些快捷键应立即进入插件的可搜索范围，而无需再次通过网络获取。

## 2. 用户流程
1. **启动命令**: 用户输入 `/download` 并进入应用列表。
2. **选择应用**: 用户点击列表中的某个应用（如 "Visual Studio Code"）。
3. **静默下载**: 插件展示加载状态（如通知），在后台访问该应用的详情页并抓取数据。
4. **持久化**: 下载成功后，将数据以应用为单位存入 `uTools DB`。
5. **即刻可用**: 插件更新当前内存中的快捷键列表，用户可以立即搜索到该应用的快捷键。

## 3. 技术方案设计

### 3.1 触发与分发 (Selection Trigger)

在 `hotkey_service.js` 的 `DownloadCommand` 返回的列表项中增加核心标识：
- `action`: `'download_app_hotkeys'`
- `id`: 应用的 Slug (来自网站 URL，如 `vscode`)
- `name`: 应用的名称，用于展示加载进度。

在 `preload.js` 中捕获此 `action` 并调用 `HotkeyDataLoader.fetchAndProcessAppHotkeys(id)`。

### 3.2 详情页抓取与解析 (Data Extraction)

针对应用详情页（如 `https://hotkeycheatsheet.com/zh/hotkey-cheatsheet/vscode`）的抓取策略：

1. **结构化提取**: 网站使用 Next.js 构建，通过 `DOMParser` 寻找 `script#__NEXT_DATA__`。
2. **数据定位**:
   - `props.pageProps.app.shortcuts`: 核心快捷键数组。
   - `props.pageProps.app.categories`: 快捷键分类列表。
3. **平台过滤**:
   - 根据 `utools.isMacOs()` 判断，若为真则提取 `macShortcut`；否则提取 `windowsShortcut`。
4. **按键格式转换**:
   - 网站提供的按键字符串（如 `Ctrl+Shift+P`）通过正则或解析器（处理 `<kbd>` 标签）转换为本项目内部的数组格式 `['ctrl', 'shift', 'p']`。
   - 映射特殊按键（如 `⌘` -> `command`, `⌥` -> `option`）。
5. **Keyword 生成逻辑**:
   为了最大化搜索命中率，`keyword` 字段由以下部分拼接并去重生成：
   - **基础信息**: 包含应用的 `name` 和 `id` (slug)。
   - **内容信息**: 包含快捷键的 `title` 和 `description`。
   - **分类信息**: 包含快捷键所属的 `category` 名称。
   - **处理规范**: 统一转为小写，移除特殊标点符号，多个词条以空格分隔。
   - *示例*: 应用 VS Code 中 “复制当前行” 的 keyword 可能为 `vscode visual studio code 基本编辑 复制当前行 copy current line`。

### 3.3 本地存储方案 (Persistence)

1. **数据库**: 使用 `utools.db` 以支持大规模数据持久化（相比 `dbStorage` 更适合结构化查询）。
2. **Key 命名**: `hotkeys_app_${appId}`。
3. **数据结构 (Document Schema)**:
   ```javascript
   {
     _id: 'hotkeys_app_vscode',
     appId: 'vscode',
     name: 'Visual Studio Code',
     shortcuts: [
       {
         title: "Command Palette",
         description: "Show all commands",
         keys: ["ctrl", "shift", "p"],
         keyword: "vscode command palette display",
         category: "General"
       },
       // ...更多
     ],
     updatedAt: 1711000000000
   }
   ```

### 3.4 动态合并与搜索 (Runtime Integration)

修改 `shortcuts.js` 的初始加载逻辑：
1. **静态加载**: 继续保持现有的 `json/` 和 `shortcuts/` 文件的加载。
2. **DB 动态加载**: 使用 `utools.db.allDocs('hotkeys_app_')` 获取所有已下载的应用配置。
3. **合并**: 将 DB 中的 `shortcuts` 数组展平后合并至全局 `g_shortcuts` 索引中。
4. **缓存策略**: 为了性能，考虑在内存中缓存已下载的应用 ID 集合。

## 4. UI/UX 细节
- **Loading 反馈**: 调用 `utools.showNotification('正在获取 [App] 的快捷键数据...')`。
- **状态提示**: 列表中的应用若已下载，可以在图标右下角添加小勾选标识，或者在 description 中标注“本地已收录”。
- **单项搜索**: 搜索结果应包含“应用分类”，例如：`[VS Code] 基本编辑 - 复制整行`。

## 5. 测试要点
- **断网测试**: 在离线环境下，验证已下载的应用快捷键是否依然能正常搜索和触发模拟按键。
- **多平台同步**: 同一套代码在 Mac 和 Windows 下下载的快捷键应分别为其对应的平台按键。
- **ID 冲突**: 验证不同语言（zh/en）下同一个应用 ID 的存储处理，确保不会相互覆盖导致数据混乱。
