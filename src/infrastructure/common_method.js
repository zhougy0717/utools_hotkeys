const slashCommandManager = require('../core/slash_command_manager.js')

search = (searchWord, shortcuts) => {
    // 优先处理斜线命令
    if (searchWord.startsWith('/')) {
        const matchedItems = slashCommandManager.getCommandItems()
            .filter(item => item.keyword.startsWith(searchWord.toLowerCase()));
        if (matchedItems.length > 0) {
            return matchedItems;
        }
    }

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

doAction = (action, data) => {
    if (action === 'copyCmd') {
        utools.copyText(data.join(' '));
    } else if (action === 'copyText') {
        utools.copyText(data);
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
        doAction(itemData.action, itemData.action === 'copyText' ? itemData.data : itemData.keys)
    }
    else {
        handleShortcut(itemData.keys)
    }
    itemData.hitTimeStamp = new Date().getTime()
    hitTimeStamps[itemData.title] = itemData.hitTimeStamp
    window.utools.dbStorage.setItem('hitTimeStamp', hitTimeStamps)
}

enter = () => {
    const loadAllShortcuts = require('./shortcuts_loader.js');
    const shortcuts = loadAllShortcuts() ?? [];

    hitTimeStamps = window.utools.dbStorage.getItem('hitTimeStamp') ?? {}
    shortcuts.forEach(x => {
        x.keyword += x.title.toLowerCase()
        x.hitTimeStamp = hitTimeStamps[x.title] ?? 0
    })
    shortcuts.sort((a, b) => b.hitTimeStamp - a.hitTimeStamp)

    return [shortcuts, hitTimeStamps]
}

module.exports = {enter, search, select}