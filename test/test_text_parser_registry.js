const assert = require('assert');
const { TextParserRegistry } = require('../src/core/parsers/text_parser_registry.js');

describe('TextParserRegistry', () => {
  it('should register and find parser by raw text feature', () => {
    const registry = new TextParserRegistry();

    const mockParserA = {
      parserId: 'parser-a',
      canParse: (text) => text.includes('FORMAT_A')
    };

    const mockParserB = {
      parserId: 'parser-b',
      canParse: (text) => text.includes('FORMAT_B')
    };

    registry.register(mockParserA);
    registry.register(mockParserB);

    assert.strictEqual(registry.findParser('This is FORMAT_A test'), mockParserA);
    assert.strictEqual(registry.findParser('This is FORMAT_B test'), mockParserB);
    assert.strictEqual(registry.findParser('Unknown format text'), null);
  });

  it('should prevent duplicate parser registration', () => {
    const registry = new TextParserRegistry();
    const parser = { parserId: 'test-parser', canParse: () => true };

    registry.register(parser);
    assert.strictEqual(registry.getParsers().length, 1);
    registry.register(parser);
    assert.strictEqual(registry.getParsers().length, 1);
  });
});
