getAppName = (fullName) => {
    const parts = fullName.split('.');
    const nameBeforeExtension = parts[0];
    return nameBeforeExtension.toLowerCase()
}

enter = (action, shortcuts) => {
    g_hitTimeStamps = window.utools.dbStorage.getItem('hitTimeStamp') ?? {}
    shortcuts.forEach(x => {
        x.keyword += x.title
        x.hitTimeStamp = g_hitTimeStamps[x.title] ?? 0
    })
    shortcuts.sort((a, b) => b.hitTimeStamp - a.hitTimeStamp)

    const app = getAppName(action.payload.app)
    return shortcuts.filter(item => item.keyword.indexOf(app) !== -1);
}

module.exports = enter