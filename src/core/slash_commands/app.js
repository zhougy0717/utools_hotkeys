const { getLoadedAppList } = require('./icon.js');
const AppMappingStorage = require('../../infrastructure/app_mapping_storage.js');
const AppPatternInferer = require('../../infrastructure/app_pattern_inferer.js');
const { generateAvatarSvg } = require('../utils/icon_generator.js');

/**
 * The /app & /bind command implementation
 * Manages application process matching rules (automatic inference + custom mappings)
 */
class AppCommand {
  constructor(options = {}) {
    this.keyword = '/app';
    this.aliases = ['/bind'];
    this.getAppList = options.getAppList || getLoadedAppList;
    this.mappingStorage = options.mappingStorage || AppMappingStorage.defaultMappingStorage;
    this.inferer = options.inferer || new AppPatternInferer();
    this.editingApp = null;
  }

  setEditingApp(app) {
    this.editingApp = app;
  }

  clearEditingApp() {
    this.editingApp = null;
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

    // 1. If currently in editing mode for a specific app
    if (this.editingApp) {
      this._renderEditingState(searchWord, callbackSetList);
      return;
    }

    // 2. Normal application list & search mode
    const query = this._extractQuery(searchWord);
    const queryLower = query.toLowerCase();
    const apps = this.getAppList();

    const filtered = queryLower
      ? apps.filter(app =>
          app.appName.toLowerCase().includes(queryLower) ||
          app.appId.toLowerCase().includes(queryLower)
        )
      : apps;

    if (filtered.length === 0) {
      callbackSetList([{
        title: query ? `未找到匹配 [${query}] 的应用` : '暂无已加载的应用',
        description: '请先使用 /import 导入或 /download 下载快捷键数据',
        icon: 'logo.png',
        action: 'noop'
      }]);
      return;
    }

    const displayList = filtered.map(app => {
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

    callbackSetList(displayList);
  }

  /**
   * Render real-time editable state when user is modifying a process name
   */
  _renderEditingState(searchWord, callbackSetList) {
    const { appId, appName, icon } = this.editingApp;
    const cleanInput = this._extractQuery(searchWord).trim();
    const cleanNoSpace = appName.replace(/\s+/g, '');

    const suggestions = [
      `${appName}.exe`,
      `${cleanNoSpace}.exe`,
      `${appName}.app`,
      `${cleanNoSpace}.app`,
      `${appId}.exe`
    ];
    const otherSuggestions = Array.from(new Set(suggestions)).filter(s => s !== cleanInput);

    const list = [];

    // Primary action: save currently typed value
    if (cleanInput) {
      list.push({
        title: `💾 确认保存: ${cleanInput}`,
        description: `点击或回车立即将 [${cleanInput}] 绑定至 [${appName}]`,
        icon: icon || 'logo.png',
        appId: appId,
        appName: appName,
        processName: cleanInput,
        action: 'confirm_add_app_mapping'
      });
    } else {
      list.push({
        title: `💾 请在上方输入框输入进程名...`,
        description: `您可直接在上方输入如 "${appName}.exe" 后回车保存`,
        icon: icon || 'logo.png',
        appId: appId,
        appName: appName,
        action: 'noop'
      });
    }

    // Alternative suggestions
    otherSuggestions.forEach(sug => {
      list.push({
        title: `➕ 或选择预设: ${sug}`,
        description: `点击快速将预设 [${sug}] 绑定至 [${appName}]`,
        icon: icon || 'logo.png',
        appId: appId,
        appName: appName,
        processName: sug,
        action: 'confirm_add_app_mapping'
      });
    });

    // Return to menu
    list.push({
      title: `↩️ 返回 [${appName}] 配置菜单`,
      description: '取消添加并返回',
      icon: icon || 'logo.png',
      appId: appId,
      appName: appName,
      action: 'select_app_for_mapping'
    });

    callbackSetList(list);
  }
}

const defaultAppCommand = new AppCommand();

module.exports = AppCommand;
module.exports.defaultAppCommand = defaultAppCommand;

