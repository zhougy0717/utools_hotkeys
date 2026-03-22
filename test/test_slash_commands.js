/**
 * Test to verify stateful slash command with input clearing.
 */

let g_activeCommand = null;

// Mock slashCommandManager
const slashCommandManager = {
    getCommandItems: () => [
        {
            keyword: '/download',
            title: '/download',
            command: {
                keyword: '/download',
                execute: (query, cb) => {
                    console.log('--- Execute called with:', JSON.stringify(query));
                    const isStateful = !query.toLowerCase().startsWith('/download');
                    const results = [{ title: 'App 1' }, { title: 'App 2' }];
                    if (isStateful) {
                        results.unshift({ title: '↩ Back' });
                    }
                    cb(results);
                }
            }
        }
    ]
};

const search = (searchWord, shortcuts, callbackSetList) => {
    if (g_activeCommand) {
        if (searchWord.startsWith('/') && !searchWord.startsWith(g_activeCommand.keyword)) {
            console.log('Exiting mode...');
            g_activeCommand = null;
        } else {
            g_activeCommand.execute(searchWord, callbackSetList);
            return null;
        }
    }
    
    if (searchWord.startsWith('/')) {
        const commandItems = slashCommandManager.getCommandItems();
        const matchedCommands = commandItems.filter(item => 
            item.keyword.startsWith(searchWord.toLowerCase())
        );

        if (matchedCommands.length > 0) {
            const subQueryCommand = matchedCommands.find(c => 
                searchWord.toLowerCase().startsWith(c.keyword + ' ')
            );
            if (subQueryCommand && subQueryCommand.command && typeof subQueryCommand.command.execute === 'function') {
                subQueryCommand.command.execute(searchWord, callbackSetList);
                return null;
            }
            return matchedCommands;
        }
    }
    return shortcuts;
};

// Simulation of preload.js search handler
let lastOutput = null;
const callbackSetList = (list) => {
    lastOutput = list;
    console.log('UI updated with:', JSON.stringify(list));
};

console.log('1. User types "/"');
let res = search('/', [], callbackSetList);
if (res !== null) callbackSetList(res);

console.log('\n2. User types "/download"');
res = search('/download', [], callbackSetList);
if (res !== null) callbackSetList(res);

console.log('\n3. User selects /download (Enter)');
g_activeCommand = slashCommandManager.getCommandItems()[0].command;
// Simulate input clearing and execute
res = g_activeCommand.execute('', callbackSetList);
// res is usually undefined because execute is async or just calls cb

console.log('\n4. User types "vs" in the cleared box');
res = search('vs', [], callbackSetList);
if (res !== null) callbackSetList(res);

console.log('\n5. User types "/" to exit or switch');
res = search('/', [], callbackSetList);
if (res !== null) callbackSetList(res);
