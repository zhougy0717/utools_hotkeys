---
name: releasing-utools-plugin
description: Use when packaging, building, preparing a production distribution, or releasing a uTools plugin for submission to the uTools Developer Center
---

# Releasing uTools Plugin

## Overview

**uTools plugins require a clean, production-only package without devDependencies, source maps, debug logs, or unauthorized assets before store submission.**

This skill defines the end-to-end workflow and standards for building, packaging, verifying, and recovering the development environment when releasing a uTools plugin based on `scripts/release.py` and `npm run release`.

---

## When to Use

```
Ready to package or release the plugin?
    │
    ├── Are you preparing a distribution package for uTools Store / Developer Center? ──► YES ──► Use this skill
    │
    ├── Are you verifying release package purity and removing forbidden files? ────────► YES ──► Use this skill
    │
    └── Are you just running tests or local dev in uTools? ─────────────────────────────► NO  ──► Use standard dev flow
```

### Use when:
- Creating a clean production distribution package in the `release/` directory.
- Publishing or submitting an update to the uTools Developer Center (开发者中心).
- Verifying that no forbidden files (`.map`, `.ts`, `.log`, dev-only dependencies, junk files) remain in the submission bundle.
- Recovering the local development environment (`npm install`) after packaging.

### When NOT to use:
- Day-to-day feature development or running local unit tests (`npm test`).
- Debugging in uTools Developer mode directly pointing to the workspace root.

---

## Quick Reference

| Task | Command | Purpose |
|---|---|---|
| **Full Release Build** | `npm run release` (or `python3 scripts/release.py`) | Prune dev deps, build `release/`, clean artifacts |
| **Run Pre-release Tests** | `npm test` | Ensure all tests pass BEFORE packaging |
| **Restore Dev Environment** | `npm install` | **MANDATORY** after release to restore devDependencies |
| **Verify Release Output** | `ls -la release/` | Inspect generated bundle files |
| **Test Production Package** | uTools 开发者工具 -> 选择 `release/plugin.json` | Test release package in actual uTools runtime |

---

## The 4-Stage Release Workflow

```
[Stage 1: Pre-flight Verification]
  │  ├── Run `npm test` (all tests MUST pass)
  │  ├── Bump version in `plugin.json` & `package.json`
  │  └── Verify `logo.png`, `README.md`, and mandatory metadata
  ▼
[Stage 2: Production Packaging (scripts/release.py)]
  │  ├── 1. `npm prune --production` (strips devDependencies)
  │  ├── 2. Clean & recreate `release/` directory
  │  ├── 3. Copy required assets (`plugin.json`, `src/`, `icons/`, `node_modules/`, etc.)
  │  └── 4. Deep cleanup (remove `.map`, `.ts`, `.DS_Store`, `.log`, etc.)
  ▼
[Stage 3: Package Verification]
  │  ├── Inspect `release/` directory tree & file size
  │  └── Load `release/plugin.json` in uTools Developer Tools for smoke testing
  ▼
[Stage 4: Workspace Recovery]
  └── Run `npm install` to restore `devDependencies` (mocha, chai, electron)
```

---

## Step-by-Step Instructions

### 1. Pre-Flight Verification (Before Running Release)

1. **Run Unit Tests**:
   ```bash
   npm test
   ```
   Do not proceed if any test fails.

2. **Verify Version Alignment**:
   Ensure `version` in `plugin.json` matches the intended release version and aligns with `package.json`.

3. **Check Plugin Configuration**:
   - `plugin.json` has all required fields: `version`, `pluginName`, `preload`, `logo`, `features`.
   - `logo.png` is present and valid.

### 2. Execute Release Script

Execute the release pipeline:
```bash
npm run release
# or: python3 scripts/release.py
```

The script automatically performs:
1. **Dependency Pruning**: Executes `npm prune --production` to retain only runtime dependencies in `node_modules`.
2. **Directory Recreation**: Completely removes old `release/` and initializes a fresh directory.
3. **Asset Whitelist Copy**:
   - Files: `plugin.json`, `package.json`, `logo.png`, `README.md`
   - Directories: `src/`, `icons/`, `node_modules/`
4. **Deep Sanitization**:
   - Removes OS/IDE artifacts: `.DS_Store`, `.git`, `.vscode`, `.idea`, `__pycache__`, etc.
   - Strips non-runtime source/debug files: `.map`, `.ts`, `.tsx`, `.less`, `.sass`, `.scss`, `.coffee`, `.flow`, `.log`, `.js.gz`.
   - Cleans `node_modules`: Removes `test/`, `tests/`, `example/`, `examples/`, `docs/`, `benchmark/`, `.bin/`, and non-LICENSE markdown/html/pdf files.

### 3. Verify the Release Package

Inspect the `release/` directory before uploading:
1. **Check Structure**:
   ```bash
   ls -la release/
   ```
   Must contain: `plugin.json`, `package.json`, `logo.png`, `README.md`, `src/`, `icons/`, `node_modules/`.

2. **Check for Forbidden Files**:
   Ensure no forbidden files slipped through:
   ```bash
   find release -name "*.map" -o -name "*.ts" -o -name "*.log" -o -name ".DS_Store"
   ```
   (Should return no results).

3. **Smoke Test in uTools**:
   - Open uTools Developer Tool (开发者工具).
   - Add temporary plugin pointing to `release/plugin.json`.
   - Trigger main feature commands (e.g. `shortcuts`, `app_shortcuts`) to verify runtime stability.

### 4. Restore Development Environment (CRITICAL)

Because `scripts/release.py` executed `npm prune --production`, your local `node_modules` no longer has dev dependencies (e.g. `mocha`, `chai`, `electron`).

**You MUST run:**
```bash
npm install
```

Verify restoration by running tests:
```bash
npm test
```

---

## Release Rules & Constraints

### Whitelist of Release Files

| File / Dir | Required | Description |
|---|---|---|
| `plugin.json` | **YES** | uTools plugin configuration file |
| `package.json` | **YES** | Node.js metadata |
| `logo.png` | **YES** | Plugin icon (PNG format) |
| `README.md` | Optional | Plugin documentation |
| `src/` | **YES** | Production source code (JS, preload scripts) |
| `icons/` | **YES** | Static icons and resources |
| `node_modules/` | **YES** (if deps exist) | Production-only dependencies |

### Prohibited Artifacts in `release/`

| Type | Extensions / Names | Reason |
|---|---|---|
| **Debug / Source Maps** | `.map`, `.js.gz`, `.log` | Prohibited by uTools Review Policy |
| **Uncompiled Source** | `.ts`, `.tsx`, `.less`, `.sass`, `.scss`, `.coffee` | uTools only accepts runnable JS/CSS/HTML |
| **VCS & IDE Metadata** | `.git`, `.DS_Store`, `.vscode`, `.idea`, `__pycache__` | Junk files |
| **Dev Packages / Tests** | `node_modules/**/test`, `node_modules/**/docs` | Bloats package size |

---

## Common Mistakes & Troubleshooting

| Mistake | Consequence | Fix |
|---|---|---|
| **Forgetting `npm install` after release** | `npm test` fails with `Cannot find module 'mocha'` or `chai` | Run `npm install` immediately after running the release script |
| **Editing code directly in `release/`** | Changes get overwritten and wiped on the next build | Always edit in `src/` or project root, never directly in `release/` |
| **Failing tests before release** | Broken plugin gets packaged and shipped to users | Always run `npm test` before packaging |
| **Missing Node/npm in PATH during Python execution** | Script fails at `run_npm_prune` with command not found | `scripts/release.py` injects `/usr/local/bin`, `/opt/homebrew/bin`, `/usr/bin`. Ensure Node is installed in standard paths |
| **Submitting unpruned `node_modules`** | Store submission rejected due to oversized bundle or forbidden test files | Always build via `npm run release` / `scripts/release.py` |

---

## Red Flags - STOP and Correct

- Running release packaging while tests are failing.
- Uploading the root project directory instead of the `release/` folder.
- Committing the `release/` folder to git (ensure `release/` is in `.gitignore`).
- Skipping `npm install` after packaging and wondering why dev tools are missing.
