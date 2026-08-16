/**
 * TextParserRegistry - Manages shortcut text parsers
 */
class TextParserRegistry {
  constructor() {
    this.parsers = [];
  }

  /**
   * Register a new text parser
   * @param {Object} parser
   */
  register(parser) {
    if (!parser || !parser.parserId) return;
    if (this.parsers.some(p => p.parserId === parser.parserId)) return;
    this.parsers.push(parser);
  }

  /**
   * Find a matching parser for the raw text
   * @param {string} rawText
   * @returns {Object|null}
   */
  findParser(rawText) {
    if (!rawText || typeof rawText !== 'string') return null;
    return this.parsers.find(p => typeof p.canParse === 'function' && p.canParse(rawText)) || null;
  }

  /**
   * Get all registered parsers
   * @returns {Array}
   */
  getParsers() {
    return [...this.parsers];
  }
}

const defaultParserRegistry = new TextParserRegistry();
const { DefkeyParser } = require('./defkey_parser.js');
defaultParserRegistry.register(new DefkeyParser());

module.exports = {
  TextParserRegistry,
  defaultParserRegistry
};
