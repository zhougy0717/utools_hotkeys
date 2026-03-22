let g_shortcuts = []
let g_appShortcts = []
let g_hitTimeStamps = window.utools.dbStorage.getItem('hitTimeStamp') ?? {}
let g_activeCommand = null;

const appShortcutMethod = require('./app_filter.js')
const {enter, search, select} = require('../infrastructure/common_method.js')
require('../core/hotkey_service.js') // Load and register commands

let lastCallbackSetList = null
window.exports = {
  'shortcuts': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        let result = enter()
        g_shortcuts = result[0]
        g_hitTimeStamps = result[1]
        return callbackSetList(g_shortcuts)
      },
      search: (action, searchWord, callbackSetList) => {
        lastCallbackSetList = callbackSetList
        
        // If there's an active command, let it handle the search
        if (g_activeCommand) {
          // If the user types a NEW slash command, exit the current mode
          if (searchWord.startsWith('/') && !searchWord.startsWith(g_activeCommand.keyword)) {
            g_activeCommand = null;
          } else {
            g_activeCommand.execute(searchWord, callbackSetList);
            return;
          }
        }

        const selected = search(searchWord, g_shortcuts, callbackSetList)
        if (selected !== null) return callbackSetList(selected)
      },
      select: (action, itemData) => {
        if (itemData.action === 'slash_command') {
          g_activeCommand = itemData.command;
          window.utools.setSubInputValue('');
          return itemData.command.execute('', lastCallbackSetList)
        }
        if (itemData.action === 'download_app_hotkeys') {
          if (lastCallbackSetList) lastCallbackSetList([{ title: '正在获取数据...', description: `正在获取 [${itemData.title}] 的快捷键...`, icon: itemData.icon || 'logo.png' }]);
          require('../core/hotkey_service.js').dataLoader.fetchAndProcessAppHotkeys(itemData.id, lastCallbackSetList, itemData.icon)
            .then(() => { if (lastCallbackSetList) lastCallbackSetList([{ title: '下载成功！', description: `[${itemData.title}] 下载完成，按回车返回或直接开始搜索。`, icon: itemData.icon || 'logo.png', action: 'noop' }]); })
            .catch(e => { if (lastCallbackSetList) lastCallbackSetList([{ title: '下载失败', description: e.message, icon: itemData.icon || 'logo.png', action: 'noop' }]); });
          return;
        }
        if (itemData.action === 'noop') {
          g_activeCommand = null;
          window.utools.setSubInputValue('')
          let result = enter()
          g_shortcuts = result[0]
          g_hitTimeStamps = result[1]
          if (lastCallbackSetList) lastCallbackSetList(g_shortcuts)
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
        let result = enter()
        g_shortcuts = result[0]
        g_hitTimeStamps = result[1]
        g_appShortcts = appShortcutMethod(action, g_shortcuts)
        callbackSetList(g_appShortcts)
      },
      search: (action, searchWord, callbackSetList) => {
        lastCallbackSetList = callbackSetList
        
        if (g_activeCommand) {
          if (searchWord.startsWith('/') && !searchWord.startsWith(g_activeCommand.keyword)) {
            g_activeCommand = null;
          } else {
            g_activeCommand.execute(searchWord, callbackSetList);
            return;
          }
        }

        const selected = search(searchWord, g_appShortcts, callbackSetList)
        if (selected !== null) return callbackSetList(selected)
      },
      select: (action, itemData) => {
        if (itemData.action === 'slash_command') {
          g_activeCommand = itemData.command;
          window.utools.setSubInputValue('');
          return itemData.command.execute('', lastCallbackSetList)
        }
        if (itemData.action === 'download_app_hotkeys') {
          if (lastCallbackSetList) lastCallbackSetList([{ title: '正在获取数据...', description: `正在获取 [${itemData.title}] 的快捷键...`, icon: itemData.icon || 'logo.png' }]);
          require('../core/hotkey_service.js').dataLoader.fetchAndProcessAppHotkeys(itemData.id, lastCallbackSetList, itemData.icon)
            .then(() => { if (lastCallbackSetList) lastCallbackSetList([{ title: '下载成功！', description: `[${itemData.title}] 下载完成，按回车返回或直接开始搜索。`, icon: itemData.icon || 'logo.png', action: 'noop' }]); })
            .catch(e => { if (lastCallbackSetList) lastCallbackSetList([{ title: '下载失败', description: e.message, icon: itemData.icon || 'logo.png', action: 'noop' }]); });
          return;
        }
        if (itemData.action === 'noop') {
          g_activeCommand = null;
          window.utools.setSubInputValue('')
          let result = enter()
          g_shortcuts = result[0]
          g_hitTimeStamps = result[1]
          g_appShortcts = appShortcutMethod(action, g_shortcuts)
          if (lastCallbackSetList) lastCallbackSetList(g_appShortcts)
          return;
        }
        select(itemData, g_hitTimeStamps)
      },
      placeholder: "搜索快捷键，回车直接执行（部分需要手动执行）"
    }
  }
}
