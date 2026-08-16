/**
 * DefkeyParser - Parses Defkey plain text exported shortcut files
 */
class DefkeyParser {
  constructor() {
    this.parserId = 'defkey';
  }

  /**
   * Check if the raw text matches Defkey export format
   * @param {string} rawText
   * @returns {boolean}
   */
  canParse(rawText) {
    if (!rawText || typeof rawText !== 'string') return false;
    const hasBanner = rawText.includes('===') && /keyboard shortcuts/i.test(rawText);
    const hasDefkeyUrl = /https?:\/\/defkey\.com\/[a-zA-Z0-9_-]+-shortcuts/i.test(rawText);
    return hasBanner || hasDefkeyUrl;
  }

  /**
   * Parse Defkey raw text into standardized JSON structure
   * @param {string} rawText
   * @returns {Object}
   */
  parse(rawText) {
    if (!rawText || typeof rawText !== 'string' || rawText.trim().split('\n').length < 5) {
      throw new Error('Invalid Defkey format: content too short or missing headers');
    }

    const lines = rawText.split(/\r?\n/).map(l => l.trimEnd());
    
    // 1. Extract app name from banner
    let appName = '';
    for (let i = 0; i < lines.length - 2; i++) {
      if (lines[i].startsWith('====') && lines[i + 2].startsWith('====')) {
        appName = lines[i + 1].trim().replace(/\s+keyboard\s+shortcuts$/i, '');
        break;
      }
    }
    if (!appName) {
      const bannerFallback = lines.find(l => /keyboard\s+shortcuts$/i.test(l.trim()));
      if (bannerFallback) {
        appName = bannerFallback.trim().replace(/\s+keyboard\s+shortcuts$/i, '');
      } else {
        appName = 'Custom App';
      }
    }

    // 2. Extract metadata: URL & update time & appId
    let sourceUrl = '';
    let updatedAt = '';
    const urlMatch = rawText.match(/https?:\/\/defkey\.com\/([a-zA-Z0-9_-]+)-shortcuts/i);
    let appId = '';
    if (urlMatch) {
      sourceUrl = urlMatch[0];
      appId = urlMatch[1].toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    } else {
      appId = appName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }

    const dateMatch = rawText.match(/Last update:\s*([^\r\n]+)/i);
    if (dateMatch) {
      updatedAt = dateMatch[1].trim();
    } else {
      updatedAt = new Date().toISOString().split('T')[0];
    }

    // 3. Extract sections and shortcuts
    const shortcuts = [];
    let currentSection = 'General';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Check for section header: line followed by '---'
      if (i + 1 < lines.length && lines[i + 1].trim().startsWith('---') && !line.includes('  ')) {
        currentSection = trimmed;
        i++; // Skip the '---' line
        continue;
      }

      // Check for shortcut line: contains at least 2 consecutive spaces or tab separating key and title
      // Format: <KeyCombination>    <Title/Description>
      const separatorMatch = line.match(/^(\S.*?\S|\S)\s{2,}(\S.*)$/);
      if (separatorMatch) {
        const rawKey = separatorMatch[1].trim();
        const rawTitle = separatorMatch[2].trim();

        // Skip table headers if any
        if (rawKey.toLowerCase() === 'shortcut' || rawKey.toLowerCase() === 'key') continue;

        const normalizedKeys = this.normalizeKeyCombination(rawKey);
        const { title, description } = this.parseTitleAndDescription(rawTitle);

        shortcuts.push({
          title,
          keys: normalizedKeys,
          section: currentSection,
          description: description || ''
        });
      }
    }

    return {
      appId,
      appName,
      platform: this.detectPlatform(rawText),
      source: 'defkey',
      sourceUrl,
      updatedAt,
      shortcuts
    };
  }

  /**
   * Parse Title and extract parenthesized notes as description
   * e.g. "(if no file is selected) Copy current path" -> title: "Copy current path", desc: "if no file is selected"
   */
  parseTitleAndDescription(rawTitle) {
    let title = rawTitle;
    let description = '';

    const prefixParenMatch = rawTitle.match(/^\(([^)]+)\)\s*(.*)$/);
    if (prefixParenMatch) {
      description = prefixParenMatch[1].trim();
      title = prefixParenMatch[2].trim() || description;
    } else {
      const suffixParenMatch = rawTitle.match(/^(.*?)\s*\(([^)]+)\)$/);
      if (suffixParenMatch) {
        title = suffixParenMatch[1].trim();
        description = suffixParenMatch[2].trim();
      }
    }

    return { title, description };
  }

  /**
   * Normalize key combinations into standard key tokens
   * e.g. "Ctrl + Shift + F12" -> ["{cmd_or_ctrl}", "shift", "f12"]
   * e.g. "\ then Ctrl + C" -> ["\\", "then", "{cmd_or_ctrl}", "c"]
   */
  normalizeKeyCombination(rawKeyStr) {
    const sequenceParts = rawKeyStr.split(/\s+then\s+/i);
    const result = [];

    for (let pIndex = 0; pIndex < sequenceParts.length; pIndex++) {
      const part = sequenceParts[pIndex];
      const keys = part.split('+').map(k => k.trim()).filter(Boolean);

      for (const k of keys) {
        const lower = k.toLowerCase();
        switch (lower) {
          case 'ctrl':
          case 'control':
            result.push('{cmd_or_ctrl}');
            break;
          case 'alt':
          case 'option':
          case 'opt':
            result.push('{opt_or_alt}');
            break;
          case 'shift':
            result.push('shift');
            break;
          case 'win':
          case 'windows':
          case 'cmd':
          case 'command':
            result.push('win');
            break;
          case 'up arrow':
            result.push('up');
            break;
          case 'down arrow':
            result.push('down');
            break;
          case 'left arrow':
            result.push('left');
            break;
          case 'right arrow':
            result.push('right');
            break;
          case 'del':
            result.push('delete');
            break;
          case 'esc':
            result.push('escape');
            break;
          case 'ins':
            result.push('insert');
            break;
          case 'pgup':
          case 'page up':
            result.push('pageup');
            break;
          case 'pgdn':
          case 'page down':
            result.push('pagedown');
            break;
          default:
            result.push(lower);
            break;
        }
      }

      if (pIndex < sequenceParts.length - 1) {
        result.push('then');
      }
    }

    return result;
  }

  detectPlatform(rawText) {
    const textLower = rawText.toLowerCase();
    if (textLower.includes('macos') || textLower.includes('mac os') || textLower.includes('for mac')) {
      return 'mac';
    }
    if (textLower.includes('windows') || textLower.includes('win10') || textLower.includes('win11')) {
      return 'windows';
    }
    return 'universal';
  }
}

module.exports = { DefkeyParser };
