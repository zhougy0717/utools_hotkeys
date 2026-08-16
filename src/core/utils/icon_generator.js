const fs = require('fs');
const path = require('path');

/**
 * Curated list of modern vibrant gradients for letter avatar generation
 */
const GRADIENT_PALETTES = [
  ['#4F46E5', '#7C3AED'], // Indigo -> Purple
  ['#2563EB', '#38BDF8'], // Blue -> Sky
  ['#059669', '#34D399'], // Emerald -> Teal
  ['#D97706', '#FBBF24'], // Amber -> Yellow
  ['#DC2626', '#F87171'], // Rose -> Red
  ['#7C3AED', '#C084FC'], // Purple -> Violet
  ['#0891B2', '#67E8F9'], // Cyan -> Aqua
  ['#DB2777', '#F472B6'], // Pink -> Rose
  ['#4338CA', '#3B82F6'], // Deep Blue -> Blue
  ['#047857', '#10B981'], // Forest -> Emerald
  ['#B45309', '#F59E0B'], // Ochre -> Amber
  ['#6D28D9', '#A855F7']  // Violet -> Purple
];

/**
 * Extract 1-2 letter initials or characters representing the application
 * @param {string} appName
 * @returns {string}
 */
function extractInitials(appName) {
  if (!appName || typeof appName !== 'string') return 'APP';
  
  const cleanName = appName.trim().replace(/[_\-]+/g, ' ');
  
  // Check if Chinese characters are predominant
  const chineseChars = cleanName.match(/[\u4e00-\u9fa5]/g);
  if (chineseChars && chineseChars.length > 0) {
    return chineseChars.slice(0, 2).join('');
  }

  // English / Alphanumeric words
  const words = cleanName.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    const first = words[0][0];
    const second = words[1][0];
    return (first + second).toUpperCase();
  }
  
  if (words.length === 1) {
    const word = words[0];
    // If camelCase or PascalCase, extract uppercase letters
    const uppers = word.match(/[A-Z]/g);
    if (uppers && uppers.length >= 2) {
      return uppers.slice(0, 2).join('');
    }
    return word.slice(0, Math.min(2, word.length)).toUpperCase();
  }

  return 'AP';
}

/**
 * Deterministically pick a gradient based on appName hash
 * @param {string} name
 * @returns {[string, string]}
 */
function pickGradient(name) {
  const str = String(name || 'App');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % GRADIENT_PALETTES.length;
  return GRADIENT_PALETTES[index];
}

/**
 * Generate a high-resolution SVG letter avatar data URL
 * @param {string} appName Application name
 * @param {Object} options Optional size and radius options
 * @returns {string} Base64 data URL (data:image/svg+xml;base64,...)
 */
function generateAvatarSvg(appName, options = {}) {
  const initials = extractInitials(appName);
  const [c1, c2] = pickGradient(appName);
  const size = options.size || 128;
  const rx = options.rx || Math.round(size * 0.22); // 22% border radius for squircle look
  const fontSize = options.fontSize || Math.round(size * (initials.length > 1 ? 0.42 : 0.52));

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="${size}" height="${size}" rx="${rx}" fill="url(#grad)"/>
  <rect width="${size}" height="${size}" rx="${rx}" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.5"/>
  <text x="50%" y="54%" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" filter="url(#shadow)">${initials}</text>
</svg>`;

  return 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
}

/**
 * Converts a local image file (png, jpg, svg, webp, ico) to a Base64 Data URL
 * @param {string} filePath Absolute path to the image file
 * @returns {string|null} Base64 data URL
 */
function fileToBase64(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return null;
  
  const ext = path.extname(filePath).toLowerCase();
  let mimeType = 'image/png';
  if (ext === '.svg') mimeType = 'image/svg+xml';
  else if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
  else if (ext === '.webp') mimeType = 'image/webp';
  else if (ext === '.ico') mimeType = 'image/x-icon';
  else if (ext === '.gif') mimeType = 'image/gif';

  const buffer = fs.readFileSync(filePath);
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

module.exports = {
  extractInitials,
  pickGradient,
  generateAvatarSvg,
  fileToBase64,
  GRADIENT_PALETTES
};
