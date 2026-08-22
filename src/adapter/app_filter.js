const { normalizeAppId } = require('../infrastructure/app_id_normalizer.js');
const AppMappingStorage = require('../infrastructure/app_mapping_storage.js');

const getAppName = (fullName) => {
    if (!fullName) return '';
    const parts = fullName.split('.');
    const nameBeforeExtension = parts[0];
    return nameBeforeExtension.toLowerCase();
};

const enter = (action, shortcuts = []) => {
    const uTools = typeof window !== 'undefined' && window.utools ? window.utools : (typeof utools !== 'undefined' ? utools : null);
    const hitTimeStamps = (uTools && uTools.dbStorage ? uTools.dbStorage.getItem('hitTimeStamp') : {}) ?? {};

    shortcuts.forEach(x => {
        if (!x.keyword) x.keyword = '';
        if (x.title && !x.keyword.includes(x.title)) {
            x.keyword += ' ' + x.title;
        }
        x.hitTimeStamp = hitTimeStamps[x.title] ?? 0;
    });

    const fullApp = action && action.payload && action.payload.app ? action.payload.app.trim() : '';
    const rawAppName = getAppName(fullApp);
    const targetNormId = normalizeAppId(rawAppName);

    const customMappings = AppMappingStorage.defaultMappingStorage.getCustomMappings() || {};

    const filtered = shortcuts.filter(item => {
        // 规则 1: 标准化 AppId 精确匹配
        if (item.appId && targetNormId) {
            if (normalizeAppId(item.appId) === targetNormId) {
                return true;
            }
        }
        // 规则 2: 用户自定义进程映射判定 (SPEC-00019)
        if (item.appId && Array.isArray(customMappings[item.appId])) {
            const matched = customMappings[item.appId].some(customProcess => {
                if (!customProcess) return false;
                const cleanCustom = customProcess.trim();
                if (fullApp && cleanCustom.toLowerCase() === fullApp.toLowerCase()) return true;
                const cleanCustomBase = getAppName(cleanCustom);
                if (rawAppName && cleanCustomBase.toLowerCase() === rawAppName.toLowerCase()) return true;
                return false;
            });
            if (matched) return true;
        }
        // 规则 3: Keyword 包含模糊匹配 (兜底与兼容)
        if (rawAppName && item.keyword && item.keyword.toLowerCase().indexOf(rawAppName) !== -1) {
            return true;
        }
        return false;
    });

    filtered.sort((a, b) => (b.hitTimeStamp || 0) - (a.hitTimeStamp || 0));
    return filtered;
};

module.exports = enter;