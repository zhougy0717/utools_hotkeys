# Refactor Hotkey Service Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将斜线命令从服务逻辑中分离，并将 `hotkey_service.js` 重命名为 `hotkeycheatsheet.js`。

**Architecture:** 
1. 建立 `src/core/slash_commands/` 目录。
2. 将 `DownloadCommand` 和 `PathCommand` 迁移到独立文件。
3. `hotkeycheatsheet.js` 仅保留数据加载与解析逻辑。
4. `preload.js` 同步更新模块及其命令的加载方式。

**Tech Stack:** Javascript (uTools Plugin 环境).

---

### Task 1: 创建命令目录与 DownloadCommand 迁移

**Files:**
- Create: `src/core/slash_commands/download.js`

- [ ] **Step 1: 创建 `src/core/slash_commands` 目录**
Run: `mkdir -p src/core/slash_commands`

- [ ] **Step 2: 创建 `src/core/slash_commands/download.js` 并迁移类实现**
```javascript
const { dataLoader } = require('../hotkeycheatsheet.js');
const slashCommandManager = require('../slash_command_manager.js');

class DownloadCommand {
  constructor() {
    this.keyword = '/download';
    this.fetchPromise = null;
    this.cachedApps = null;
  }

  description() {
    const lang = dataLoader.getLang();
    const storageId = `hotkey_app_list_${lang || 'default'}`;
    const existing = utools.db.get(storageId);
    let timeStr = '从未同步';
    if (existing && existing.updatedAt) {
      existing.updatedAt = Number(existing.updatedAt);
      timeStr = new Date(existing.updatedAt).toLocaleDateString();
    }
    return `下载快捷键配置。上次同步：${timeStr}`;
  }

  match(searchWord) {
    return searchWord.toLowerCase().startsWith(this.keyword);
  }

  async execute(searchWord, callbackSetList) {
    if (!this.cachedApps) {
      if (!this.fetchPromise) {
        this.fetchPromise = dataLoader.fetchAndProcess(callbackSetList);
      }
      try {
        const apps = await this.fetchPromise;
        if (apps) this.cachedApps = apps;
      } finally {
        this.fetchPromise = null;
      }
    }
    
    if (this.cachedApps) {
      const query = searchWord.toLowerCase().startsWith(this.keyword)
        ? searchWord.substring(this.keyword.length).trim().toLowerCase()
        : searchWord.trim().toLowerCase();

      const filteredApps = query 
        ? this.cachedApps.filter(app => app.name.toLowerCase().includes(query))
        : this.cachedApps;

      const displayList = filteredApps.map(app => {
        let description = app.description || `${app.id}`;
        if (app.hotkeysCount && !description.includes('hotkey') && !description.includes('快捷键')) {
           const isZh = dataLoader.getLang() === 'zh';
           const countText = isZh ? `${app.hotkeysCount} 条快捷键` : `${app.hotkeysCount} hotkeys`;
           description = `${countText} (hotkeycheatsheet)`;
        }

        return {
          title: app.name,
          description: description,
          icon: app.icon || 'logo.png',
          id: app.id,
          action: 'download_app_hotkeys'
        };
      });

      if (!searchWord.toLowerCase().startsWith(this.keyword)) {
        displayList.unshift({
          title: '🔄 强制刷新列表',
          description: '从服务器重新获取最新的应用列表（跳过缓存）',
          icon: 'logo.png',
          action: 'refresh_app_list'
        });
        displayList.unshift({
          title: '↩ 返回主搜索',
          description: '退出下载模式，搜索本地已有的快捷键',
          icon: 'logo.png',
          action: 'noop'
        });
      }

      if (typeof callbackSetList === 'function') {
        callbackSetList(displayList);
      }
    }
  }

  async refresh(callbackSetList) {
    this.cachedApps = await dataLoader.fetchAndProcess(callbackSetList, true);
    this.execute('', callbackSetList);
  }
}

module.exports = DownloadCommand;
```

### Task 2: PathCommand 迁移

**Files:**
- Create: `src/core/slash_commands/path.js`

- [ ] **Step 1: 创建 `src/core/slash_commands/path.js` 并迁移类实现**
```javascript
const fs = require('fs');
const path = require('path');
const sqliteService = require('../../infrastructure/sqlite_service.js');

class PathCommand {
  constructor() {
    this.keyword = '/path';
  }

  description() {
    const savedPath = utools.dbStorage.getItem('sqlite_db_path');
    return `设置 SQLite 数据库存放路径。当前路径：${savedPath || '未设置'}`;
  }

  match(searchWord) {
    return searchWord.toLowerCase().startsWith(this.keyword);
  }

  async execute(searchWord, callbackSetList) {
    const paths = utools.showOpenDialog({
      title: '选择 SQLite 数据库存放目录',
      properties: ['openDirectory', 'createDirectory']
    });

    if (paths && paths.length > 0) {
      const selectedPath = paths[0];
      utools.dbStorage.setItem('sqlite_db_path', selectedPath);
      
      const success = await sqliteService.init(selectedPath);
      
      if (success) {
        try {
          const jsonDir = path.join(selectedPath, 'json_hotkeys');
          if (!fs.existsSync(jsonDir)) {
            fs.mkdirSync(jsonDir, { recursive: true });
            const template = [
              {
                "title": "示例：浏览器刷新 (自定义 JSON)",
                "keys": ["{cmd_or_ctrl}", "r"],
                "keyword": "refresh 刷新",
                "description": "这是一个通过自定义 JSON 加载的示例快捷键"
              }
            ];
            fs.writeFileSync(path.join(jsonDir, 'template.json'), JSON.stringify(template, null, 2), 'utf8');
            console.log('[PathCommand] Created json_hotkeys/template.json');
          }
        } catch (e) {
          console.warn('[PathCommand] Failed to initialize json_hotkeys folder', e);
        }

        try {
          const dbDocs = utools.db.allDocs('hotkeys_app_');
          if (dbDocs.length > 0) {
            console.log(`[PathCommand] Found ${dbDocs.length} legacy apps in utools.db. Starting migration...`);
            let migratedCount = 0;
            for (const rawDoc of dbDocs) {
              const doc = rawDoc.doc || rawDoc.value || rawDoc;
              if (!doc) continue;
              
              const appId = doc.appId || (doc._id ? doc._id.replace('hotkeys_app_', '') : 'unknown');
              const appName = doc.name || appId;
              const shortcuts = doc.shortcuts || doc.data || [];
              const appIcon = doc.icon || (shortcuts.length > 0 ? shortcuts[0].icon : null);
              
              const ok = await sqliteService.saveAppHotkeys(appId, appName, appIcon, shortcuts);
              if (ok) {
                utools.db.remove(doc);
                migratedCount++;
              }
            }
            console.log(`[PathCommand] Migration complete. Moved ${migratedCount} apps to SQLite.`);
          }
        } catch (e) {
          console.error('[PathCommand] Migration failed', e);
        }

        callbackSetList([{
          title: '路径设置成功',
          description: `数据库已初始化在: ${selectedPath}。已将旧数据迁入。`,
          icon: 'logo.png',
          action: 'noop'
        }]);
        try {
          require('../../infrastructure/common_method.js').enter();
        } catch(e){}
      } else {
        callbackSetList([{
          title: '路径设置失败',
          description: '无法在选定目录初始化数据库，请检查权限。',
          icon: 'logo.png',
          action: 'noop'
        }]);
      }
    } else {
      callbackSetList([{
        title: '已取消',
        description: '未更改数据库路径。',
        icon: 'logo.png',
        action: 'noop'
      }]);
    }
  }
}

module.exports = PathCommand;
```

### Task 3: 命令注册入口实现

**Files:**
- Create: `src/core/slash_commands/index.js`

- [ ] **Step 1: 创建 `src/core/slash_commands/index.js` 实现统一管理注册**
```javascript
const slashCommandManager = require('../slash_command_manager.js');
const DownloadCommand = require('./download.js');
const PathCommand = require('./path.js');

function initCommands() {
  slashCommandManager.register(new DownloadCommand());
  slashCommandManager.register(new PathCommand());
}

initCommands();
```

### Task 4: hotkeycheatsheet.js 重命名与清理

**Files:**
- Modify: `src/core/hotkey_service.js` (Rename to `hotkeycheatsheet.js`)

- [ ] **Step 1: 重命名文件**
Run: `mv src/core/hotkey_service.js src/core/hotkeycheatsheet.js`

- [ ] **Step 2: 清理逻辑，仅保留业务服务类**
修改 `src/core/hotkeycheatsheet.js`，移除 `DownloadCommand` 和 `PathCommand` 类及其注册，仅保留 `HotkeyCheatsheetParser` 和 `HotkeyDataLoader`。
最后几行应修改为：
```javascript
const dataLoader = new HotkeyDataLoader();
module.exports = { dataLoader };
```

### Task 5: 适配 preload.js 与验证

**Files:**
- Modify: `src/adapter/preload.js`

- [ ] **Step 1: 更新 `preload.js` 中的引用**
```javascript
// 修改前
// require('../core/hotkey_service.js') // Load and register commands

// 修改后
require('../core/hotkeycheatsheet.js') // Load data loader logic
require('../core/slash_commands/index.js') // Load and register slash commands
```

- [ ] **Step 2: 修正 `preload.js` 中所有对 `hotkey_service.js` 的调用**
例如：
```javascript
// 查找并替换
require('../core/hotkey_service.js').dataLoader.fetchAndProcessAppHotkeys(...)
// 修正为
require('../core/hotkeycheatsheet.js').dataLoader.fetchAndProcessAppHotkeys(...)
```

- [ ] **Step 3: 运行验证**
在 uTools 中打开插件，输入 `/download` 查看是否能列出应用，输入 `/path` 查看是否能弹出选择框。
