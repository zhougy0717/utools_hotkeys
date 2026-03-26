const fs = require('fs');
const path = require('path');
const sqliteService = require('../../infrastructure/sqlite_service.js');

/**
 * The /path command implementation
 */
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
        // Create json_hotkeys directory and template if not exists
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

        // Migration logic: Move existing records from utools.db to the newly set SQLite
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
        // Refresh to apply new data if any
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
