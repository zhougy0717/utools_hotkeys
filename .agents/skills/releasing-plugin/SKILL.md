name: releasing-plugin
description: Use when building and preparing a uTools plugin for publication. Ensures a clean, production-only package by pruning devDependencies and removing binary/temporary data.
---

# Releasing Plugin

## Overview
A uTools plugin release MUST be clean and lightweight. This skill ensures that the final package contains ONLY essential production files and dependencies, specifically excluding tests, dev-dependencies, source maps, and temporary binary files.

## When to Use
- When asked to "package", "release", "build", or "publish" the uTools plugin.
- When preparing the software for end-users where speed and package size are critical.

## Mandatory Release Workflow (Follow Precisely)

> [!CAUTION]
> The user's specific requirement is to clean dependencies **BEFORE** copying. To avoid breaking your development environment, you MUST use a temporary clone or ensure you restore dependencies immediately after.

### 1. Pre-Copy Cleanup
Before copying to the final release folder, perform these actions in the project root:
- **Prune devDependencies**: Run `npm prune --production` to remove all development-only packages.
- **Delete Binary/Temp Data**: Remove all `.map` files and `.tar.gz` files (recursive).
  - *Example (PowerShell)*: `Get-ChildItem -Path . -Include "*.map","*.tar.gz" -Recurse | Remove-Item -Force`

### 2. Selective Copying (Software Code)
Copy only the necessary software components to the `release/` folder.
- **Include**:
    - `src/` directory (core logic)
    - `package.json`
    - `logo.png`
    - `plugin.json`
    - Any other assets referenced in `plugin.json` (e.g., `icons/`).
- **Exclude**:
    - `test/` (All test code)
    - `.git/` / `.agents/` / `.antigravity/` / `docs/`
    - Any development configuration files.

### 3. Cleanup Verification
Double-check the `release/` folder to ensure NO source maps or archives were missed.

### 4. Restoration (Crucial)
After copying, run `npm install` in your development root to restore the `devDependencies` needed for work.

## Implementation Example (PowerShell)

```powershell
# 1. Clean root (Caution: temporary pruning)
npm prune --production
Get-ChildItem -Include "*.map", "*.tar.gz" -Recurse | Remove-Item -Force

# 2. Package
mkdir release
Copy-Item -Path "src", "package.json", "plugin.json", "logo.png" -Destination "release" -Recurse

# 3. Restore Dev Environment
npm install
```

## Common Mistakes
- **Shipping Node.js heavyweights**: Including `electron` or `mocha` in the production package.
- **Leaking source maps**: Forgetting to delete `.map` files, which bloats the plugin and exposes internals.
- **Forgetting to restore**: Leaving the current environment in a "pruned" state.

## Rationalization Table

| Excuse | Reality |
|--------|---------|
| "Copying then pruning is the same" | It requires more time/disk space for the copy. Pruning at source (with restoration) is cleaner for the *result*. |
| "I'll just manually delete mocha" | Highly error-prone. You WILL miss sub-dependencies (like `chai` or `electron` internals). Use `npm prune`. |
| "Users might want sourcemaps" | Production releases should NEVER include sourcemaps unless explicitly asked for debugging. They bloat the plugin and expose internals. |
| "The archive is small" | No trash allowed. Cleanliness is a hard requirement. |

## Red Flags - STOP and Correct
- Shipping the entire `node_modules` folder without pruning.
- Including the `test/` directory.
- Not following the "prune before copy" sequence if specifically requested by the user.
- Forgetting to restore `devDependencies` in the root after finishing.
