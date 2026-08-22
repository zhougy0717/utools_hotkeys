const path = require('path');
const { normalizeAppId } = require('../infrastructure/app_id_normalizer.js');
const AppMappingStorage = require('../infrastructure/app_mapping_storage.js');

const getAppName = (fullName) => {
    if (!fullName || typeof fullName !== 'string') return '';
    const normalized = fullName.trim().replace(/\\/g, '/');
    let base = path.basename(normalized);
    const lastDot = base.lastIndexOf('.');
    if (lastDot > 0) {
        base = base.substring(0, lastDot);
    }
    return base.toLowerCase().trim();
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

    let fullApp = '';
    if (action && action.payload) {
        if (typeof action.payload === 'string') {
            fullApp = action.payload.trim();
        } else if (typeof action.payload === 'object') {
            fullApp = (action.payload.app || action.payload.name || action.payload.appPath || '').trim();
        }
    }
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
        // 规则 3: 仅对无 appId 的遗留快捷键数据开放 Keyword 模糊匹配兜底，杜绝跨应用串台
        if (!item.appId && rawAppName && item.keyword && item.keyword.toLowerCase().indexOf(rawAppName) !== -1) {
            return true;
        }
        return false;
    });

    filtered.sort((a, b) => (b.hitTimeStamp || 0) - (a.hitTimeStamp || 0));
    return filtered;
};

module.exports = enter;