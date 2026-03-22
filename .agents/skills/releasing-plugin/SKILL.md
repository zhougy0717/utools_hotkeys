---
name: releasing-plugin
description: 用于构建和准备发布 uTools 插件。确保通过精简 devDependencies 并删除二进制/临时数据来生成一个纯净的、仅限生产环境的包。
---

# 发布插件 (Releasing Plugin)

## 目标
将代码和插件发布需要的资源、文档等数据拷贝到 `release/` 目录（若不存在该目录则创建）。

## 概述
uTools 插件的发布必须保持纯净且轻量。此 Skill 确保最终的安装包仅包含必要的生产文件和依赖项，特别是排除测试、开发环境依赖（dev-dependencies）、源码映射（source maps）以及临时二进制文件。

## 何时使用
- 当被要求“打包”、“发布”、“构建生产版本”或“发布 uTools 插件”时。
- 在为终端用户准备软件时，因为此时运行速度和安装包大小至关重要。

## 强制发布工作流 (必须严格遵守)

> [!CAUTION]
> 用户明确要求在**拷贝前**清理依赖。为了避免永久性破坏您的本地开发环境，您必须在精简前告知风险，或者在完成拷贝后立即恢复依赖。

### 1. 拷贝前清理 (Pre-Copy Cleanup)
在向最终发布文件夹拷贝文件之前，请在项目根目录执行以下操作：
- **清理发布目录 (Clear Release Directory)**: 彻底清空或删除旧的 `release/` 文件夹，以防旧文件残留污染新版本。
  - *示例 (PowerShell)*: `Remove-Item -Path release -Recurse -Force -ErrorAction SilentlyContinue; New-Item -ItemType Directory -Path release`
- **精简开发依赖 (Prune devDependencies)**: 运行 `npm prune --production` 来移除所有仅限开发使用的包。
- **删除二进制/临时数据**: 递归删除所有 `.map` 文件和 `.tar.gz` 文件。
  - *示例 (PowerShell)*: `Get-ChildItem -Path . -Include "*.map","*.tar.gz" -Recurse | Remove-Item -Force`

### 2. 选择性拷贝 (Selective Copying)
仅将必要的软件组件拷贝到 `release/` 文件夹中。
- **必需包含**:
    - `src/` 目录 (核心逻辑)
    - `package.json`
    - `logo.png`
    - `plugin.json`
    - `plugin.json` 中引用的任何其他资源 (例如 `icons/`)。
- **严禁包含**:
    - `test/` (所有测试代码)
    - `.git/` / `.agents/` / `.antigravity/` / `docs/`
    - 任何开发环境专用的配置文件。

### 3. 清理验证
二次检查 `release/` 文件夹，确保没有遗漏任何源码映射或压缩包。

### 4. 环境恢复 (至关重要)
拷贝完成后，**必须**在您的开发根目录运行 `npm install`，以恢复后续开发工作所需的 `devDependencies`。

## 实现示例 (PowerShell)

```powershell
# 1. 清理环境 (注意：这是临时精简)
npm prune --production
Get-ChildItem -Include "*.map", "*.tar.gz" -Recurse | Remove-Item -Force
# 清理旧的发布目录
Remove-Item -Path release -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path release

# 2. 打包
Copy-Item -Path "src", "package.json", "plugin.json", "logo.png" -Destination "release" -Recurse

# 3. 恢复开发环境
npm install
```

## 常见错误
- **携带开发重负**: 在生产包中错误地包含了 `electron` 或 `mocha`。
- **泄露源码映射**: 忘记删除 `.map` 文件，这会显著增加插件体积并暴露内部逻辑。
- **忘记恢复依赖**: 打包结束后让当前开发环境处于“pruned”精简状态。

## 辩解对比表 (Rationalization Table)

| 常见的辩解 | 事实依据 |
|-----------|---------|
| “先拷贝再精简效果是一样的” | 先拷贝会增加拷贝过程的时间和磁盘占用。在源头精简（并配合恢复）得到的发布结果更纯净。 |
| “我手动删除 mocha 就行了” | 极其容易出错。你一定会遗漏某些子依赖（如 `chai` 或 `electron` 内部包）。必须使用 `npm prune`。 |
| “用户可能需要源码映射来调试” | 除非特别要求，否则生产发布版本绝不应包含 sourcemaps。这会增大体积并泄露代码。 |
| “压缩包体积很小，留着没事” | 规则是：不留垃圾。纯净度是一种硬性要求。 |

## 红牌警报 (Red Flags) - 立即停止并纠正
- 发布包中包含旧版本的残留文件（未执行 `release/` 目录清理）。
- 发布包中包含整个未精简的 `node_modules` 文件夹。
- 发布包中包含 `test/` 文件夹。
- 未遵循用户要求的“拷贝前精简”顺序。
- 任务结束时忘记在根目录恢复 `devDependencies`。
