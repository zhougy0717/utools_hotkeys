const slashCommandManager = require('../slash_command_manager.js');
const DownloadCommand = require('./download.js');
const PathCommand = require('./path.js');
const ExportCommand = require('./export.js');
const ImportCommand = require('./import.js');

/**
 * Initialize and register all slash commands
 */
function initCommands() {
  slashCommandManager.register(new DownloadCommand());
  slashCommandManager.register(new PathCommand());
  slashCommandManager.register(new ExportCommand());
  slashCommandManager.register(new ImportCommand());
}

// Auto-initialize when loaded
initCommands();

module.exports = { initCommands };
