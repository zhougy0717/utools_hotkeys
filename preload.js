saveRecent = () => {

}

loadRecent = () => {

}

hitKeys = (keys) => {
  utools.simulateKeyboardTap(...keys)
}

handleShortcut = (keys) => {
  if (Array.isArray(keys[0])) {
    keys.forEach(keyPair => {
      hitKeys(keyPair)
    });
  }
  else {
    hitKeys(keys)
  }
}

doAction = (action, keys) => {
  if (action === 'copyCmd') {
    utools.copyText(keys.join(' '));
  }
}

const g_shortcuts = require('./shortcuts.js') ?? []
let g_hitTimeStamps = window.utools.dbStorage.getItem('hi t Ti me S ta m p') ?? {}

utools.onPluginEnter(({code, type, payload, option}) => {
  console.log('用户进入插件应用', code, type, payload)
})

window.exports = {
  'shortcuts': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        const g_shortcuts = require('./shortcuts.js') ?? []
        g_hitTimeStamps = window.utools.dbStorage.getItem('hitTimeStamp') ?? {}
        g_shortcuts.forEach(x => {
          x.keyword += x.title
          x.hitTimeStamp = g_hitTimeStamps[x.title] ?? 0
        })
        g_shortcuts.sort((a, b) => b.hitTimeStamp - a.hitTimeStamp)
        return callbackSetList(g_shortcuts)
      },
      search: (action, searchWord, callbackSetList) => {
        const words = searchWord.split(' ')
        const selected = g_shortcuts.filter(x => {
          let result = true
          words.forEach(w => {
            result = result && (x.keyword.includes(w) || x.title.includes(w) || x.description.includes(w))
          })
          return result
        })
        return callbackSetList(selected)
      },
      select: (action, itemData) => {
        window.utools.hideMainWindow()
        if ('action' in itemData) {
          doAction(itemData.action, itemData.keys)
        }
        else {
          handleShortcut(itemData.keys)
        }
        itemData.hitTimeStamp = new Date().getTime()
        g_hitTimeStamps[itemData.title] = itemData.hitTimeStamp
        window.utools.dbStorage.setItem('hitTimeStamp', g_hitTimeStamps)
      },
      placeholder: "搜索快捷键，回车直接执行（部分需要手动执行）"
    }
  }
}
