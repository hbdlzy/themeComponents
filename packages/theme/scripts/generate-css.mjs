/**
 * 构建后置脚本：用 @hebang/tokens 的 OKLCH 派生引擎生成
 *  - dist/index.css        ：:root(light) + html.dark 两套完整变量
 *  - dist/scss/variables.scss      ：light 模式 $hb-xxxx 变量 + EP 链路别名
 *  - dist/scss/palette-dark.scss   ：dark 模式 $hb-xxxx 变量
 *
 * 静态产物与运行时 buildThemeVars 完全同源：CSS 即规则的展开结果，
 * 升级 tokens 引擎参数后重跑 pnpm build 即可同步。
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const distDir = path.join(root, 'dist')
const scssDir = path.join(distDir, 'scss')

const { buildThemeVars, buildHbPalette } = await import(
  path.join(distDir, 'index.js')
)

const lightVars = buildThemeVars(undefined, { mode: 'light' })
const darkVars = buildThemeVars(undefined, { mode: 'dark' })

const render = (selector, vars) =>
  `${selector} {\n${Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')}\n}\n`

const css = [
  '/* 本文件由 @hebang/theme 构建脚本从 OKLCH 派生引擎生成，请勿手动修改。 */',
  `/* 默认主色 ${lightVars['--hb-brand']}；暗色块挂到 html.dark（配合 EP 的 dark 模式 class） */`,
  '',
  render(':root', lightVars),
  render('html.dark', darkVars),
].join('\n')

mkdirSync(scssDir, { recursive: true })
writeFileSync(path.join(distDir, 'index.css'), css)

/* ---------- SCSS 源码输出 ---------- */

const lightPalette = buildHbPalette(undefined, { mode: 'light' })
const darkPalette = buildHbPalette(undefined, { mode: 'dark' })
const n = lightPalette.named

const header = (title) =>
  `// ${title}\n// 由 @hebang/theme 构建脚本从 OKLCH 派生引擎生成，请勿手动修改。\n\n`

const namedScss = (palette) =>
  Object.entries(palette.named)
    .map(([name, hex]) => `$${name}: ${hex};`)
    .join('\n')

/* element-plus.scss 官方链路使用的旧变量名别名，取值同样来自引擎映射 */
const aliases = [
  `$hb-color-primary: ${n['hb-brand']};`,
  `$hb-color-primary-light-3: ${n['hb-brand-3']};`,
  `$hb-color-primary-light-5: ${n['hb-brand-2']};`,
  `$hb-color-primary-light-7: ${n['hb-brand-1']};`,
  `$hb-color-primary-light-8: ${n['hb-brand-0']};`,
  `$hb-color-primary-light-9: ${n['hb-brand-0']};`,
  `$hb-color-primary-dark-2: ${n['hb-brand-5']};`,
  `$hb-color-success: ${n['hb-success']};`,
  `$hb-color-warning: ${n['hb-warning']};`,
  `$hb-color-danger: ${n['hb-danger']};`,
  `$hb-color-info: ${n['hb-info']};`,
  `$hb-text-color-primary: ${n['hb-text-primary']};`,
  `$hb-text-color-regular: ${n['hb-text-body']};`,
  `$hb-text-color-secondary: ${n['hb-text-secondary']};`,
  `$hb-text-color-placeholder: ${n['hb-text-muted']};`,
  `$hb-border-color: ${n['hb-border-2']};`,
  `$hb-border-color-light: ${n['hb-border']};`,
  `$hb-bg-color: ${n['hb-surface-container']};`,
  `$hb-bg-color-page: ${n['hb-surface']};`,
  '$hb-border-radius-base: 4px;',
  '$hb-border-radius-small: 2px;',
  '$hb-font-size-base: 14px;',
  '$hb-font-size-small: 13px;',
  `$hb-font-family: ${JSON.stringify(lightVars['--el-font-family'])};`,
].join('\n')

writeFileSync(
  path.join(scssDir, 'variables.scss'),
  header('合邦主题 SCSS 变量（默认主色 light 模式）') +
    namedScss(lightPalette) +
    '\n\n// ---------- Element Plus 官方 SCSS 链路别名 ----------\n' +
    aliases +
    '\n',
)
writeFileSync(
  path.join(scssDir, 'palette-dark.scss'),
  header('dark 模式对照（语义不变、档位方向反转，规范 §7）') +
    namedScss(darkPalette) +
    '\n',
)

console.log(
  `[theme] 已由规则引擎生成 dist/index.css(${Object.keys(lightVars).length} 变量 × light/dark) + scss/variables.scss + scss/palette-dark.scss`,
)
