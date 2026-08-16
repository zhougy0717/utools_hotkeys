#!/usr/bin/env node

/**
 * PlantUML Linter & PNG Export Validator
 * Validates PlantUML diagrams embedded in Markdown files (.md) and standalone (.puml/.plantuml) files.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

// Check if plantuml is available
function checkPlantUmlInstalled() {
  try {
    const res = spawnSync('plantuml', ['-version'], { encoding: 'utf-8' });
    if (res.status === 0 || (res.stdout && res.stdout.includes('PlantUML'))) {
      return { ok: true };
    }
  } catch (e) {}

  return { ok: false };
}

// Parse arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    files: [],
    testExport: true,
    outputDir: null,
    quiet: false,
    strict: false, // Flag full-width punctuation as error instead of warning
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--no-export' || arg === '--check-only') {
      options.testExport = false;
    } else if (arg === '--output-dir' || arg === '-o') {
      options.outputDir = path.resolve(args[++i]);
    } else if (arg === '--quiet' || arg === '-q') {
      options.quiet = true;
    } else if (arg === '--strict') {
      options.strict = true;
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else if (!arg.startsWith('-')) {
      options.files.push(arg);
    }
  }

  if (options.files.length === 0) {
    // Default search paths
    options.files = ['docs/design', 'docs/spec', 'docs'];
  }

  return options;
}

function printHelp() {
  console.log(`
${ANSI.bold}PlantUML Linter & PNG Export Validator${ANSI.reset}

${ANSI.bold}Usage:${ANSI.reset}
  node lint-plantuml.js [options] [files|dirs...]

${ANSI.bold}Options:${ANSI.reset}
  --check-only, --no-export   Only check syntax without running PNG export test
  -o, --output-dir <dir>      Export generated PNGs to target directory
  --strict                    Treat formatting warnings (e.g. full-width punctuation) as errors
  -q, --quiet                 Suppress informational logs, show only errors/warnings
  -h, --help                  Show this help message

${ANSI.bold}Examples:${ANSI.reset}
  node lint-plantuml.js docs/design/architecture.md
  node lint-plantuml.js docs/spec/
  node lint-plantuml.js --output-dir ./dist/diagrams docs/design/
`);
}

// Collect files to check
function collectFiles(inputs) {
  const result = [];

  function walk(itemPath) {
    if (!fs.existsSync(itemPath)) return;
    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      const children = fs.readdirSync(itemPath);
      for (const child of children) {
        walk(path.join(itemPath, child));
      }
    } else if (stat.isFile()) {
      const ext = path.extname(itemPath).toLowerCase();
      if (['.md', '.puml', '.plantuml', '.uml', '.iuml'].includes(ext)) {
        result.push(path.resolve(itemPath));
      }
    }
  }

  for (const input of inputs) {
    walk(path.resolve(input));
  }

  return Array.from(new Set(result));
}

// Extract and analyze PlantUML blocks in markdown
function analyzeMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const blocks = [];
  const issues = [];

  let inBlock = false;
  let blockStartLine = 0;
  let currentBlockLines = [];

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];

    if (/^```(?:plantuml|puml)/i.test(line)) {
      inBlock = true;
      blockStartLine = lineNum;
      currentBlockLines = [];
    } else if (inBlock && /^```/.test(line)) {
      inBlock = false;
      const blockContent = currentBlockLines.join('\n');
      const startTagIdx = currentBlockLines.findIndex(l => /@start(uml|mindmap|gantt|wbs|json|yaml|salt|ditaa|dot|wire|chen)/i.test(l));
      const hasStart = startTagIdx !== -1;
      const hasEnd = currentBlockLines.some(l => /@end(uml|mindmap|gantt|wbs|json|yaml|salt|ditaa|dot|wire|chen)/i.test(l));

      blocks.push({
        startLine: blockStartLine,
        endLine: lineNum,
        startTagOffset: hasStart ? startTagIdx : 0,
        content: blockContent,
        hasStart,
        hasEnd,
      });

      if (!hasStart) {
        issues.push({
          type: 'error',
          line: blockStartLine + 1,
          message: `Missing '@startuml' (or @startmindmap/etc.) at the start of the plantuml code block.`,
          suggestion: `Add '@startuml' immediately after the '\`\`\`plantuml' line.`,
        });
      }
      if (!hasEnd) {
        issues.push({
          type: 'error',
          line: lineNum - 1,
          message: `Missing '@enduml' (or @endmindmap/etc.) before closing the code block.`,
          suggestion: `Add '@enduml' before the closing '\`\`\`'.`,
        });
      }

      // Check common typos inside block lines
      for (let j = 0; j < currentBlockLines.length; j++) {
        const bline = currentBlockLines[j];
        const blineNum = blockStartLine + 1 + j;

        // Chinese/full-width colon in message calls (e.g. `A -> B ： message`)
        if (/->\s*[^:\n]+：/.test(bline) || /-->\s*[^:\n]+：/.test(bline)) {
          issues.push({
            type: 'warning',
            line: blineNum,
            message: `Found full-width Chinese colon '：' in message. Use half-width colon ':' for standard PlantUML syntax.`,
            suggestion: `Replace '：' with ': '`,
          });
        }

        // Full-width quotes
        if (/[""][^""]*[""]/.test(bline)) {
          issues.push({
            type: 'warning',
            line: blineNum,
            message: `Found full-width quotes ('“' or '”'). Use standard double quotes ('"').`,
            suggestion: `Replace full-width quotes with standard ascii '"'.`,
          });
        }

        // Full-width arrows
        if (/——>|——/g.test(bline)) {
          issues.push({
            type: 'error',
            line: blineNum,
            message: `Found full-width arrow '——>'. PlantUML requires standard ASCII arrows like '-->', '->', '..>'.`,
            suggestion: `Replace with '-->' or '->'`,
          });
        }
      }
    } else if (inBlock) {
      currentBlockLines.push(line);
    }
  }

  return { blocks, issues };
}

// Analyze standalone .puml file
function analyzePumlFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];
  const lines = content.split('\n');
  const startTagIdx = lines.findIndex(l => /@start/i.test(l));
  const hasStart = startTagIdx !== -1;
  const hasEnd = lines.some(l => /@end/i.test(l));

  if (!hasStart) {
    issues.push({
      type: 'error',
      line: 1,
      message: `Missing '@startuml' at the start of the file.`,
      suggestion: `Add '@startuml' at the beginning of the file.`,
    });
  }
  if (!hasEnd) {
    issues.push({
      type: 'error',
      line: lines.length,
      message: `Missing '@enduml' at the end of the file.`,
      suggestion: `Add '@enduml' at the end of the file.`,
    });
  }

  return {
    blocks: [{
      startLine: 1,
      endLine: lines.length,
      startTagOffset: hasStart ? startTagIdx : 0,
      content,
      hasStart,
      hasEnd,
    }],
    issues,
  };
}

// Check syntax of a single PlantUML snippet via pipe
function checkBlockSyntax(block) {
  if (!block.hasStart || !block.hasEnd) {
    return { ok: false, errors: [] }; // Already handled by structural check
  }

  try {
    const res = spawnSync('plantuml', ['-pipe', '-syntax'], {
      input: block.content,
      encoding: 'utf-8',
    });

    if (res.status !== 0) {
      const output = (res.stdout || res.stderr || '').trim();
      const lines = output.split('\n');
      let offsetLine = 1;
      let errMsg = 'Syntax error in PlantUML diagram';

      if (lines.length >= 2 && lines[0] === 'ERROR') {
        offsetLine = parseInt(lines[1], 10) || 1;
        errMsg = lines.slice(2).join('\n') || errMsg;
      }

      // Calculate absolute line in markdown
      const absoluteLine = block.startLine + 1 + block.startTagOffset + offsetLine;

      return {
        ok: false,
        errors: [{
          line: absoluteLine,
          message: `PlantUML syntax error: ${errMsg}`,
        }],
      };
    }
  } catch (err) {
    return {
      ok: false,
      errors: [{
        line: block.startLine,
        message: `Failed to execute plantuml syntax check: ${err.message}`,
      }],
    };
  }

  return { ok: true, errors: [] };
}

// Validate PNG export capability
function validatePngExport(filePath, outputDir) {
  const tempExportDir = outputDir || fs.mkdtempSync(path.join(os.tmpdir(), 'puml-lint-'));
  const errors = [];

  try {
    const exportRes = spawnSync('plantuml', ['-png', filePath, '-o', tempExportDir], {
      encoding: 'utf-8',
    });

    if (exportRes.status !== 0) {
      const errOutput = (exportRes.stderr || exportRes.stdout || '').trim();
      errors.push({
        type: 'error',
        line: 1,
        message: `PlantUML PNG export failed (exit code ${exportRes.status}):\n${errOutput || 'Export execution error'}`,
      });
    } else {
      const files = fs.readdirSync(tempExportDir).filter(f => f.endsWith('.png'));
      if (files.length === 0) {
        errors.push({
          type: 'error',
          line: 1,
          message: `No PNG file was generated during export. Ensure diagram syntax and tags are valid.`,
        });
      } else {
        for (const f of files) {
          const stat = fs.statSync(path.join(tempExportDir, f));
          if (stat.size === 0) {
            errors.push({
              type: 'error',
              line: 1,
              message: `Exported PNG file '${f}' is 0 bytes (corrupted or empty output).`,
            });
          }
        }
      }
    }
  } catch (err) {
    errors.push({
      type: 'error',
      line: 1,
      message: `Failed to run PNG export: ${err.message}`,
    });
  } finally {
    if (!outputDir) {
      try {
        fs.rmSync(tempExportDir, { recursive: true, force: true });
      } catch (e) {}
    }
  }

  return errors;
}

// Main execution
function main() {
  const options = parseArgs();
  const plantUmlCheck = checkPlantUmlInstalled();

  if (!plantUmlCheck.ok) {
    console.error(`${ANSI.red}${ANSI.bold}Error:${ANSI.reset} PlantUML CLI is not installed or not in PATH.`);
    console.error(`Please install PlantUML via: 'brew install plantuml' (macOS) or download plantuml.jar.`);
    process.exit(1);
  }

  const files = collectFiles(options.files);

  if (files.length === 0) {
    console.log(`${ANSI.yellow}No markdown or plantuml files found in specified paths.${ANSI.reset}`);
    process.exit(0);
  }

  let totalFiles = 0;
  let totalDiagrams = 0;
  let passedFiles = 0;
  let totalErrors = 0;
  let totalWarnings = 0;

  console.log(`\n${ANSI.bold}${ANSI.cyan}=== PlantUML Linter & PNG Validator ===${ANSI.reset}`);
  console.log(`${ANSI.gray}Checking ${files.length} file(s)...${ANSI.reset}\n`);

  for (const filePath of files) {
    const isMd = filePath.endsWith('.md');
    const relPath = path.relative(process.cwd(), filePath);

    const analysis = isMd ? analyzeMarkdownFile(filePath) : analyzePumlFile(filePath);

    if (analysis.blocks.length === 0) {
      continue;
    }

    totalFiles++;
    totalDiagrams += analysis.blocks.length;

    const fileIssues = [...analysis.issues];

    // Check syntax of each block
    for (const block of analysis.blocks) {
      const blockRes = checkBlockSyntax(block);
      if (!blockRes.ok) {
        for (const err of blockRes.errors) {
          fileIssues.push({
            type: 'error',
            line: err.line,
            message: err.message,
          });
        }
      }
    }

    // Only test PNG export if no syntax/tag errors found
    const hasErrors = fileIssues.some(i => i.type === 'error');
    if (!hasErrors && options.testExport) {
      const exportErrors = validatePngExport(filePath, options.outputDir);
      fileIssues.push(...exportErrors);
    }

    const errors = fileIssues.filter(i => i.type === 'error' || (options.strict && i.type === 'warning'));
    const warnings = fileIssues.filter(i => i.type === 'warning' && !options.strict);

    totalErrors += errors.length;
    totalWarnings += warnings.length;

    if (errors.length === 0) {
      passedFiles++;
      if (!options.quiet) {
        console.log(`  ${ANSI.green}✔${ANSI.reset} ${relPath} ${ANSI.gray}(${analysis.blocks.length} diagram${analysis.blocks.length > 1 ? 's' : ''})${ANSI.reset}`);
        if (warnings.length > 0) {
          for (const w of warnings) {
            console.log(`    ${ANSI.yellow}⚠ line ${w.line}:${ANSI.reset} ${w.message}`);
            if (w.suggestion) console.log(`      ${ANSI.gray}Hint: ${w.suggestion}${ANSI.reset}`);
          }
        }
      }
    } else {
      console.log(`  ${ANSI.red}✖${ANSI.reset} ${relPath} ${ANSI.gray}(${analysis.blocks.length} diagram${analysis.blocks.length > 1 ? 's' : ''})${ANSI.reset}`);
      for (const err of errors) {
        console.log(`    ${ANSI.red}✖ [ERROR] line ${err.line || '-'}:${ANSI.reset} ${err.message}`);
        if (err.suggestion) console.log(`      ${ANSI.cyan}Fix:${ANSI.reset} ${err.suggestion}`);
      }
      for (const w of warnings) {
        console.log(`    ${ANSI.yellow}⚠ [WARN] line ${w.line}:${ANSI.reset} ${w.message}`);
        if (w.suggestion) console.log(`      ${ANSI.gray}Hint:${ANSI.reset} ${w.suggestion}`);
      }
    }
  }

  console.log(`\n${ANSI.bold}----------------------------------------${ANSI.reset}`);
  console.log(`Scanned: ${ANSI.bold}${totalFiles}${ANSI.reset} files with ${ANSI.bold}${totalDiagrams}${ANSI.reset} diagrams.`);
  if (totalErrors === 0) {
    console.log(`${ANSI.green}${ANSI.bold}PASSED:${ANSI.reset} All PlantUML diagrams are valid and verified exportable to PNG! 🎉`);
    if (totalWarnings > 0) {
      console.log(`${ANSI.yellow}Warnings: ${totalWarnings}${ANSI.reset}`);
    }
    if (options.outputDir) {
      console.log(`${ANSI.cyan}Exported PNGs saved to: ${options.outputDir}${ANSI.reset}`);
    }
    process.exit(0);
  } else {
    console.error(`${ANSI.red}${ANSI.bold}FAILED:${ANSI.reset} Found ${totalErrors} error(s) and ${totalWarnings} warning(s).`);
    process.exit(1);
  }
}

main();
