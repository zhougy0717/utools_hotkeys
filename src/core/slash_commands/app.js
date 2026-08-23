const { getLoadedAppList } = require('./icon.js');
const AppMappingStorage = require('../../infrastructure/app_mapping_storage.js');
const AppPatternInferer = require('../../infrastructure/app_pattern_inferer.js');
const { generateAvatarSvg } = require('../utils/icon_generator.js');

/**
 * The /app & /bind command implementation
 * Manages application process matching rules with full state machine support
 */
class AppCommand {
  constructor(options = {}) {
    this.keyword = '/app';
    this.aliases = ['/bind'];
    this.getAppList = options.getAppList || getLoadedAppList;
    this.mappingStorage = options.mappingStorage || AppMappingStorage.defaultMappingStorage;
    this.inferer = options.inferer || new AppPatternInferer();

    this.state = 'LIST'; // 'LIST' | 'APP_MENU' | 'EDIT_PROCESS' | 'LIST_CUSTOM'
    this.currentApp = null;
  }

  reset() {
    this.state = 'LIST';
    this.currentApp = null;
  }

  setAppMenuState(app) {
    this.state = 'APP_MENU';
    this.currentApp = app;
  }

  setEditProcessState(app) {
    this.state = 'EDIT_PROCESS';
    this.currentApp = app;
  }

  setListCustomState(app) {
    this.state = 'LIST_CUSTOM';
    this.currentApp = app;
  }

  description() {
    return '管理快捷键与操作系统应用进程名匹配关联（支持自定义添加、删除与重置进程名）';
  }

  match(searchWord) {
    if (!searchWord) return false;
    const lower = searchWord.toLowerCase().trim();
    return lower.startsWith(this.keyword) || this.aliases.some(alias => lower.startsWith(alias));
  }

  /**
   * Extract search query by removing /app or /bind prefix
   */
  _extractQuery(searchWord) {
    if (!searchWord) return '';
    let lower = searchWord.toLowerCase().trim();
    if (lower.startsWith(this.keyword)) {
      return searchWord.substring(this.keyword.length).trim();
    }
    for (const alias of this.aliases) {
      if (lower.startsWith(alias)) {
        return searchWord.substring(alias.length).trim();
      }
    }
    return searchWord.trim();
  }

  async execute(searchWord, callbackSetList) {
    if (typeof callbackSetList !== 'function') return;

    // 1. EDIT_PROCESS State
    if (this.state === 'EDIT_PROCESS' && this.currentApp) {
      return this._renderEditProcessState(searchWord, callbackSetList);
    }

    // 2. APP_MENU State
    if (this.state === 'APP_MENU' && this.currentApp) {
      return this._renderAppMenuState(callbackSetList);
    }

    // 3. LIST_CUSTOM State
    if (this.state === 'LIST_CUSTOM' && this.currentApp) {
      return this._renderListCustomState(callbackSetList);
    }

    // 4. LIST State (Default Application List)
    return this._renderAppListState(searchWord, callbackSetList);
  }

  /**
   * Render real-time editable state when user is adding/modifying a process name
   */
  _renderEditProcessState(searchWord, callbackSetList) {
    const { appId, appName, icon } = this.currentApp;
    const currentTyped = this._extractQuery(searchWord).trim();
    const cleanNoSpace = appName.replace(/\s+/g, '');
    const defaultVal = currentTyped || `${cleanNoSpace}.exe`;

    const list = [
      {
        title: `💾 确认保存: ${defaultVal}`,
        description: '支持直接在上方输入框修改文本，回车或点击立即保存',
        icon: icon || 'logo.png',
        appId: appId,
        appName: appName,
        processName: defaultVal,
        action: 'confirm_add_app_mapping'
      },
      {
        title: `➕ 【预设项】${cleanNoSpace}.exe (无空格版)`,
        description: `点击立即将 [${cleanNoSpace}.exe] 绑定至 [${appName}]`,
        icon: icon || 'logo.png',
        appId: appId,
        appName: appName,
        processName: `${cleanNoSpace}.exe`,
        action: 'confirm_add_app_mapping'
      },
      {
        title: `➕ 【预设项】${appName}.app (Mac 兼容版)`,
        description: `点击立即将 [${appName}.app] 绑定至 [${appName}]`,
        icon: icon || 'logo.png',
        appId: appId,
        appName: appName,
        processName: `${appName}.app`,
        action: 'confirm_add_app_mapping'
      },
      {
        title: `↩️ 返回 [${appName}] 配置菜单`,
        description: '取消添加并返回',
        icon: icon || 'logo.png',
        appId: appId,
        appName: appName,
        action: 'select_app_for_mapping'
      }
    ];

    callbackSetList(list);
  }

  /**
   * Render application management submenu
   */
  _renderAppMenuState(callbackSetList) {
    const { appId, appName, icon } = this.currentApp;
    const customMappings = this.mappingStorage.getCustomMappingsForApp(appId);

    const customDesc = customMappings.length > 0
      ? `已手动添加 ${customMappings.length} 个: ${customMappings.join(', ')}`
      : '当前无手动添加的进程名（使用默认推导规则）';

    const menuItems = [
      {
        title: `➕ 添加/追加自定义进程名`,
        description: `为 [${appName}] 添加操作系统进程名 (如 ${appName}.exe, ${appName}.app 等)`,
        icon: icon || 'logo.png',
        appId: appId,
        appName: appName,
        action: 'prompt_add_app_mapping'
      },
      {
        title: `📋 管理/删除自定义进程名 (${customMappings.length})`,
        description: customDesc,
        icon: icon || 'logo.png',
        appId: appId,
        appName: appName,
        action: 'list_custom_app_mappings'
      },
      {
        title: `🔄 重置为默认推导规则`,
        description: `清除 [${appName}] 的所有手动配置项，恢复默认自动推导`,
        icon: icon || 'logo.png',
        appId: appId,
        appName: appName,
        action: 'reset_app_mappings'
      },
      {
        title: `↩️ 返回应用列表`,
        description: '返回 /app 快捷键应用管理主列表',
        icon: 'logo.png',
        action: 'return_to_app_list'
      }
    ];

    callbackSetList(menuItems);
  }

  /**
   * Render custom mappings list with deletion items
   */
  _renderListCustomState(callbackSetList) {
    const { appId, appName, icon } = this.currentApp;
    const customMappings = this.mappingStorage.getCustomMappingsForApp(appId);

    if (customMappings.length === 0) {
      callbackSetList([
        {
          title: `[${appName}] 暂无手动添加的自定义进程名`,
          description: '点击返回配置菜单添加新进程名',
          icon: icon || 'logo.png',
          appId: appId,
          appName: appName,
          action: 'select_app_for_mapping'
        }
      ]);
      return;
    }

    const items = customMappings.map(p => ({
      title: `❌ 删除: ${p}`,
      description: `点击移除该自定义进程匹配规则`,
      icon: icon || 'logo.png',
      appId: appId,
      appName: appName,
      processName: p,
      action: 'delete_single_app_mapping'
    }));

    items.push({
      title: `↩️ 返回 [${appName}] 配置菜单`,
      description: '返回上级操作',
      icon: icon || 'logo.png',
      appId: appId,
      appName: appName,
      action: 'select_app_for_mapping'
    });

    callbackSetList(items);
  }

  /**
   * Render all loaded applications
   */
  _renderAppListState(searchWord, callbackSetList) {
    const rawQuery = this._extractQuery(searchWord);
    const queryLower = rawQuery.toLowerCase().trim();
    const apps = this.getAppList();

    const displayList = [];

    // Support quick direct command syntax: /app <appId|appName> <customProcessName>
    const parts = rawQuery.split(/\s+/);
    if (parts.length >= 2) {
      const targetQuery = parts[0].toLowerCase();
      const customProcess = parts.slice(1).join(' ').trim();
      const matchedApp = apps.find(a => 
        a.appId.toLowerCase() === targetQuery || 
        a.appName.toLowerCase() === targetQuery ||
        a.appName.toLowerCase().includes(targetQuery)
      );

      if (matchedApp && customProcess) {
        displayList.push({
          title: `💾 快捷绑定: "${customProcess}" 至 [${matchedApp.appName}]`,
          description: `点击或回车立即将进程名 "${customProcess}" 绑定至 [${matchedApp.appName}]`,
          icon: matchedApp.icon || generateAvatarSvg(matchedApp.appName, { asDataUrl: true }),
          appId: matchedApp.appId,
          appName: matchedApp.appName,
          processName: customProcess,
          action: 'confirm_add_app_mapping'
        });
      }
    }

    const filtered = queryLower && parts.length === 1
      ? apps.filter(app =>
          app.appName.toLowerCase().includes(queryLower) ||
          app.appId.toLowerCase().includes(queryLower)
        )
      : apps;

    if (displayList.length === 0 && filtered.length === 0) {
      callbackSetList([{
        title: rawQuery ? `未找到匹配 [${rawQuery}] 的应用` : '暂无已加载的应用',
        description: '请先使用 /import 导入或 /download 下载快捷键数据',
        icon: 'logo.png',
        action: 'noop'
      }]);
      return;
    }

    const appItems = filtered.map(app => {
      const displayIcon = app.icon || generateAvatarSvg(app.appName, { asDataUrl: true });
      const customMappings = this.mappingStorage.getCustomMappingsForApp(app.appId);
      const inferredPatterns = this.inferer.inferPatterns(app.appId, app.appName);
      const allPatterns = Array.from(new Set([...inferredPatterns, ...customMappings]));

      const patternSummary = allPatterns.length > 0
        ? allPatterns.slice(0, 3).join(', ') + (allPatterns.length > 3 ? ` 等共 ${allPatterns.length} 个` : '')
        : '暂无匹配规则';

      const customBadge = customMappings.length > 0 ? ` [自定义 ${customMappings.length} 项]` : '';

      return {
        title: `${app.appName}${customBadge}`,
        description: `匹配进程: [${patternSummary}] · 来源: ${app.source} · 点击配置关联进程`,
        icon: displayIcon,
        appId: app.appId,
        appName: app.appName,
        filePath: app.filePath,
        action: 'select_app_for_mapping'
      };
    });

    displayList.push(...appItems);
    callbackSetList(displayList);
  }
}

module.exports = AppCommand;

