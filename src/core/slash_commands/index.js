const slashCommandManager = require('../slash_command_manager.js');
const DownloadCommand = require('./download.js');
const PathCommand = require('./path.js');

/**
 * Initialize and register all slash commands
 */
function initCommands() {
  slashCommandManager.register(new DownloadCommand());
  slashCommandManager.register(new PathCommand());
}

// Auto-initialize when loaded
initCommands();

module.exports = { initCommands };
