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
    let lower = searchWord.toLowerCase().trim();
    if (lower.startsWith(this.keyword)) {
      return lower.substring(this.keyword.length).trim();
    }
    for (const alias of this.aliases) {
      if (lower.startsWith(alias)) {
        return lower.substring(alias.length).trim();
      }
    }
    return lower;
  }

  async execute(searchWord, callbackSetList) {
    if (typeof callbackSetList !== 'function') return;

    const query = this._extractQuery(searchWord);
    const apps = this.getAppList();

    const filtered = query
      ? apps.filter(app =>
          app.appName.toLowerCase().includes(query) ||
          app.appId.toLowerCase().includes(query)
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
}

module.exports = AppCommand;
