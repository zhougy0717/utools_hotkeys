const slashCommandManager = require('../core/slash_command_manager.js')

search = (searchWord, shortcuts, callbackSetList) => {
    // 优先处理斜线命令
    if (searchWord.startsWith('/')) {
        // Find if any command matches this prefix
        const commandItems = slashCommandManager.getCommandItems();
        
        // Exact match or partial command matching (to show the command itself)
        const matchedCommands = commandItems.filter(item => 
            item.keyword.startsWith(searchWord.toLowerCase())
        );

        if (matchedCommands.length > 0) {
            // If there's extra text after the keyword (e.g. "/download vs"), 
            // trigger the command's real-time execution automatically.
            const subQueryCommand = matchedCommands.find(c => searchWord.toLowerCase().startsWith(c.keyword + ' '));
            if (subQueryCommand && subQueryCommand.command && typeof subQueryCommand.command.execute === 'function') {
                // Return null and let the command's own execute handle the callbackSetList (async)
                subQueryCommand.command.execute(searchWord, callbackSetList);
                return null;
            }
            return matchedCommands;
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
    // List of keys that must not be at the first position
    const modifiers = ['command', 'control', 'ctrl', 'shift', 'option', 'alt', 'meta'];

    // If the first element is a modifier, find the first non-modifier (the "main" key) and move it to the front
    if (keys.length > 1 && modifiers.includes(keys[0].toLowerCase())) {
        const mainKeyIndex = keys.findIndex(k => !modifiers.includes(k.toLowerCase()));
        
        if (mainKeyIndex !== -1) {
            const mainKey = keys[mainKeyIndex];
            // Get all other keys (excluding the identified main key)
            const remainingKeys = keys.filter((_, index) => index !== mainKeyIndex);
            // Construct normalization: mainKey followed by all modifiers
            const normalizedKeys = [mainKey, ...remainingKeys];
            
            utools.simulateKeyboardTap(...normalizedKeys);
            return;
        }
    }

    // Default to original sequence if already normalized or if no main key is found
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