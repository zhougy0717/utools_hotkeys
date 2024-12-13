search = (searchWord, shortcuts) => {
    const words = searchWord.split(' ')
    const selected = shortcuts.filter(x => {
        let result = true
        words.forEach(w => {
        result = result && (x.keyword.includes(w) || x.title.includes(w) || x.description.includes(w))
        })
        return result
    })
    return selected
}

doAction = (action, keys) => {
    if (action === 'copyCmd') {
        utools.copyText(keys.join(' '));
    }
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

select = (itemData, hitTimeStamps) => {
    window.utools.hideMainWindow()
    if ('action' in itemData) {
        doAction(itemData.action, itemData.keys)
    }
    else {
        handleShortcut(itemData.keys)
    }
    itemData.hitTimeStamp = new Date().getTime()
    hitTimeStamps[itemData.title] = itemData.hitTimeStamp
    window.utools.dbStorage.setItem('hitTimeStamp', hitTimeStamps)
}

enter = () => {
    const shortcuts = require('./shortcuts.js') ?? []
    hitTimeStamps = window.utools.dbStorage.getItem('hitTimeStamp') ?? {}
    shortcuts.forEach(x => {
        x.keyword += x.title
        x.hitTimeStamp = hitTimeStamps[x.title] ?? 0
    })
    shortcuts.sort((a, b) => b.hitTimeStamp - a.hitTimeStamp)

    // let appName = utools.getPath('exe')
    // shortcuts.sort((a, b) => {
    //   if (a.keyword.includes(appName)) {
    //     return 1
    //   }
    //   else if (b.keyword.includes(appName)) {
    //     return -1
    //   }
    //   else {
    //     return 0
    //   }
    // })
    // console.log(`app name is ${appName}`)
    return [shortcuts, hitTimeStamps]
}

module.exports = {enter, search, select}