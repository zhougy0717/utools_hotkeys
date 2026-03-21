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
        select(itemData, g_hitTimeStamps)
      },
      placeholder: "搜索快捷键，回车直接执行（部分需要手动执行）"
    }
  }
}
