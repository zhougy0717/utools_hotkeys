const { expect } = require('chai');
const { parseKeys, parseSingleCombo } = require('../scripts/build_cheatsheet_builtin.js');

describe('Build Cheatsheet Script - parseKeys', () => {

    it('should parse simple shortcut "Ctrl+Shift+N"', () => {
        const result = parseKeys('Ctrl+Shift+N');
        // Standard expected order: [mainKey, ...modifiers]
        expect(result).to.deep.equal(['n', 'ctrl', 'shift']);
    });

    it('should parse shortcut with multiple modifiers "Command+Option+Shift+Esc"', () => {
        const result = parseKeys('Command+Option+Shift+Esc');
        expect(result).to.deep.equal(['escape', 'command', 'option', 'shift']);
    });

    it('should handle alternative keys with "|" (take first only)', () => {
        const result = parseKeys('F5 | Ctrl+R');
        expect(result).to.deep.equal(['f5']);
    });

    it('should handle sequential shortcuts with "&"', () => {
        const result = parseKeys('Alt+Space & N');
        // Expected nested structure: [['space', 'alt'], ['n']]
        expect(result).to.deep.equal([['space', 'alt'], ['n']]);
    });

    it('should map special keys like pgdn/pgup/esc/del/plus correctly', () => {
        expect(parseKeys('PgDn')).to.deep.equal(['pagedown']);
        expect(parseKeys('PgUp')).to.deep.equal(['pageup']);
        expect(parseKeys('Esc')).to.deep.equal(['escape']);
        expect(parseKeys('Del')).to.deep.equal(['delete']);
        expect(parseKeys('Ins')).to.deep.equal(['insert']);
        expect(parseKeys('Ctrl+Plus')).to.deep.equal(['equal', 'ctrl']);
    });

    it('should handle space and enter correctly', () => {
        expect(parseKeys('Space')).to.deep.equal(['space']);
        expect(parseKeys('Enter')).to.deep.equal(['enter']);
    });

});

describe('Build Cheatsheet Script - parseSingleCombo', () => {
    it('should normalize case and trim whitespace', () => {
        expect(parseSingleCombo('  CTRL + S  ')).to.deep.equal(['s', 'ctrl']);
    });

    it('should handle single key shortcuts', () => {
        expect(parseSingleCombo('F1')).to.deep.equal(['f1']);
    });
});
