const g_shortcuts = require('./shortcuts.js') ?? []
let g_appShortcts = []
let g_hitTimeStamps = window.utools.dbStorage.getItem('hitTimeStamp') ?? {}

const appShortcutMethod = require('./app_shortcuts.js')
const {enter, search, select} = require('./common_method.js')
require('./hotkey_service.js') // Load and register commands

let lastCallbackSetList = null
window.exports = {
  'shortcuts': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        let [g_shortcuts, g_hitTimeStamps] = enter()
        return callbackSetList(g_shortcuts)
      },
      search: (action, searchWord, callbackSetList) => {
        lastCallbackSetList = callbackSetList
        const selected = search(searchWord, g_shortcuts, callbackSetList)
        return callbackSetList(selected)
      },
      select: (action, itemData) => {
        if (itemData.action === 'slash_command') {
          return itemData.command.execute(itemData.keyword, lastCallbackSetList)
        }
        if (itemData.action === 'download_app_hotkeys') {
          if (lastCallbackSetList) lastCallbackSetList([{ title: '正在获取数据...', description: `正在获取 [${itemData.title}] 的快捷键...`, icon: itemData.icon || 'logo.png' }]);
          require('./hotkey_service.js').dataLoader.fetchAndProcessAppHotkeys(itemData.id, lastCallbackSetList)
            .then(() => { if (lastCallbackSetList) lastCallbackSetList([{ title: '下载成功！', description: `[${itemData.title}] 下载完成，按回车返回或直接开始搜索。`, icon: itemData.icon || 'logo.png', action: 'noop' }]); })
            .catch(e => { if (lastCallbackSetList) lastCallbackSetList([{ title: '下载失败', description: e.message, icon: itemData.icon || 'logo.png', action: 'noop' }]); });
          return;
        }
        select(itemData, g_hitTimeStamps)
      },
      placeholder: "搜索快捷键，回车直接执行（部分需要手动执行）"
    }
  },

  'app_shortcuts': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        g_appShortcts = appShortcutMethod(action, g_shortcuts)
        callbackSetList(g_appShortcts)
      },
      search: (action, searchWord, callbackSetList) => {
        lastCallbackSetList = callbackSetList
        const selected = search(searchWord, g_appShortcts, callbackSetList)
        return callbackSetList(selected)
      },
      select: (action, itemData) => {
        if (itemData.action === 'slash_command') {
          return itemData.command.execute(itemData.keyword, lastCallbackSetList)
        }
        if (itemData.action === 'download_app_hotkeys') {
          if (lastCallbackSetList) lastCallbackSetList([{ title: '正在获取数据...', description: `正在获取 [${itemData.title}] 的快捷键...`, icon: itemData.icon || 'logo.png' }]);
          require('./hotkey_service.js').dataLoader.fetchAndProcessAppHotkeys(itemData.id, lastCallbackSetList)
            .then(() => { if (lastCallbackSetList) lastCallbackSetList([{ title: '下载成功！', description: `[${itemData.title}] 下载完成，按回车返回或直接开始搜索。`, icon: itemData.icon || 'logo.png', action: 'noop' }]); })
            .catch(e => { if (lastCallbackSetList) lastCallbackSetList([{ title: '下载失败', description: e.message, icon: itemData.icon || 'logo.png', action: 'noop' }]); });
          return;
        }
        select(itemData, g_hitTimeStamps)
      },
      placeholder: "搜索快捷键，回车直接执行（部分需要手动执行）"
    }
  }
}
