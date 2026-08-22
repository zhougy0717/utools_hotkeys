const { normalizeAppId } = require('../infrastructure/app_id_normalizer.js');

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

    const rawAppName = getAppName(action && action.payload ? action.payload.app : '');
    const targetNormId = normalizeAppId(rawAppName);

    const filtered = shortcuts.filter(item => {
        // 规则 1: 标准化 AppId 精确匹配
        if (item.appId && targetNormId) {
            if (normalizeAppId(item.appId) === targetNormId) {
                return true;
            }
        }
        // 规则 2: Keyword 包含模糊匹配 (兜底与兼容)
        if (rawAppName && item.keyword && item.keyword.toLowerCase().indexOf(rawAppName) !== -1) {
            return true;
        }
        return false;
    });

    filtered.sort((a, b) => (b.hitTimeStamp || 0) - (a.hitTimeStamp || 0));
    return filtered;
};

module.exports = enter;