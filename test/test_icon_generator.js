const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {
  extractInitials,
  pickGradient,
  generateAvatarSvg,
  fileToBase64
} = require('../src/core/utils/icon_generator.js');

describe('IconGenerator Utility Suite', () => {
  it('should extract initials correctly for English and Chinese app names', () => {
    assert.strictEqual(extractInitials('One Commander 3'), 'OC');
    assert.strictEqual(extractInitials('Visual Studio Code'), 'VS');
    assert.strictEqual(extractInitials('Google Chrome'), 'GC');
    assert.strictEqual(extractInitials('Obsidian'), 'OB');
    assert.strictEqual(extractInitials('微信'), '微信');
    assert.strictEqual(extractInitials('网易云音乐'), '网易');
    assert.strictEqual(extractInitials('IntelliJ IDEA'), 'II');
  });

  it('should pick gradient colors deterministically based on app name hash', () => {
    const grad1 = pickGradient('One Commander');
    const grad2 = pickGradient('One Commander');
    assert.deepStrictEqual(grad1, grad2);
    assert.strictEqual(grad1.length, 2);
  });

  it('should generate avatar SVG string with initials and squircle styling', () => {
    const svgStr = generateAvatarSvg('One Commander 3');
    assert(svgStr.includes('<svg'));
    assert(svgStr.includes('OC</text>'));
    assert(svgStr.includes('linearGradient'));
  });

  it('should convert local image file to base64 string if present', () => {
    const testLogoPath = path.join(__dirname, '../logo.png');
    if (fs.existsSync(testLogoPath)) {
      const logoBase64 = fileToBase64(testLogoPath);
      assert(logoBase64.startsWith('data:image/png;base64,'));
    }
  });
});
