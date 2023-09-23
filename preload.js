saveRecent = () => {

}

loadRecent = () => {

}

utools.onPluginEnter(({code, type, payload, option}) => {
  console.log('用户进入插件应用', code, type, payload)
})

window.exports = {
  'shortcuts': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        let recentShortcuts = window.utools.dbStorage.getItem('recentShortcuts') ?? []
        return callbackSetList(recentShortcuts)
      },
      search: (action, searchWord, callbackSetList) => {
        const shortcuts = require('./shortcuts.js') ?? [] 
        const words = searchWord.split(' ')
        const selected = shortcuts.filter(x => {
          let result = true
          words.forEach(w => {
            result = result && x.keyword.includes(w)
          })
          return result
        })
        return callbackSetList(selected)
      },
      select: (action, itemData) => {
        window.utools.hideMainWindow()
        const keys = itemData.keys
        if (Array.isArray(keys[0])) {
          keys.forEach(keyPair => {
            utools.simulateKeyboardTap(...keyPair)
          });
        }
        else {
          utools.simulateKeyboardTap(...keys)
        }
      }
    }
  }
}
