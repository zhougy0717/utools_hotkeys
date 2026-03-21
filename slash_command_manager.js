/**
 * Slash Command Manager - Handles extensible slash commands for the uTools plugin.
 * Design inspired by the Command Dispatcher pattern.
 */

class SlashCommandManager {
  constructor() {
    this.commands = [];
  }

  /**
   * Register a new slash command
   * @param {Object} command - Must implement { keyword, description, match, execute }
   */
  register(command) {
    this.commands.push(command);
  }

  /**
   * Find a command that matches the search word
   * @param {string} searchWord 
   * @returns {Object|null}
   */
  match(searchWord) {
    if (!searchWord.startsWith('/')) return null;
    
    // Exact match or prefix match for keywords
    return this.commands.find(cmd => cmd.match(searchWord)) || null;
  }

  /**
   * Execute the matched command
   * @param {Object} command 
   * @param {string} searchWord 
   * @param {Function} callbackSetList 
   */
  execute(command, searchWord, callbackSetList) {
    return command.execute(searchWord, callbackSetList);
  }

  /**
   * Get all command items for display in the list
   * @returns {Array}
   */
  getCommandItems() {
    return this.commands.map(cmd => ({
      title: cmd.keyword,
      description: typeof cmd.description === 'function' ? cmd.description() : cmd.description,
      keyword: cmd.keyword,
      action: 'slash_command',
      command: cmd
    }));
  }
}

const slashCommandManager = new SlashCommandManager();

module.exports = slashCommandManager;
