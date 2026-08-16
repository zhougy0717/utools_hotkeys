const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {
  extractInitials,
  pickGradient,
  generateAvatarSvg,
  fileToBase64
} = require('../src/core/utils/icon_generator.js');

console.log('Testing IconGenerator...');

// 1. Test initials extraction
assert.strictEqual(extractInitials('One Commander 3'), 'OC');
assert.strictEqual(extractInitials('Visual Studio Code'), 'VS');
assert.strictEqual(extractInitials('Google Chrome'), 'GC');
assert.strictEqual(extractInitials('Obsidian'), 'OB');
assert.strictEqual(extractInitials('微信'), '微信');
assert.strictEqual(extractInitials('网易云音乐'), '网易');
assert.strictEqual(extractInitials('IntelliJ IDEA'), 'II');
console.log('  ✓ Initials extraction passed');

// 2. Test gradient picker consistency
const grad1 = pickGradient('One Commander');
const grad2 = pickGradient('One Commander');
assert.deepStrictEqual(grad1, grad2);
assert.strictEqual(grad1.length, 2);
console.log('  ✓ Gradient picker passed');

// 3. Test generateAvatarSvg
const dataUrl = generateAvatarSvg('One Commander 3');
assert(dataUrl.startsWith('data:image/svg+xml;base64,'));
const base64Part = dataUrl.replace('data:image/svg+xml;base64,', '');
const decodedSvg = Buffer.from(base64Part, 'base64').toString('utf-8');
assert(decodedSvg.includes('<svg'));
assert(decodedSvg.includes('OC</text>'));
console.log('  ✓ SVG generation and base64 encoding passed');

// 4. Test fileToBase64 with existing image
const testLogoPath = path.join(__dirname, '../logo.png');
if (fs.existsSync(testLogoPath)) {
  const logoBase64 = fileToBase64(testLogoPath);
  assert(logoBase64.startsWith('data:image/png;base64,'));
  console.log('  ✓ fileToBase64 passed');
}

console.log('All IconGenerator tests passed! 🎉');
