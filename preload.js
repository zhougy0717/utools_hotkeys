const numSymbols = require('./json/macos.js')

window.exports = {
  'shortcuts': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        return callbackSetList(numSymbols)
      },
      search: (action, searchWord, callbackSetList) => {
        const shortcuts = []
        const fileNames = fs.readdirSync(folderPath);
        fileNames.forEach((fileName) => {
          thisSet = require(fileName)
          shortcuts = shortcuts.concat(thisSet)
        })
        return callbackSetList(shortcuts.filter(x => x.keyword.includes(searchWord)))
      },
      select: (action, itemData) => {
        window.utools.hideMainWindow()
        const keys = itemData.keys
        utools.simulateKeyboardTap(...keys)
      }
    }
  }
}
