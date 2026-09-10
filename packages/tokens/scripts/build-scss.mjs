/**
 * 构建后置脚本：从已编译的 JS 产物生成 SCSS 变量（dist/scss/），
 * 保证 JS 与 SCSS 两种格式永远同源一致。
 *
 * 色彩部分严格来自 OKLCH 派生引擎（《OKLCH 取色与应用规范》）：
 * 默认主色 #1F5AA8 的 light / dark 两套调色板各生成一份变量文件，
 * 变量名即 hb-xxxx 令牌名（$hb-brand、$hb-text-body…）。
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const distDir = path.join(root, 'dist')
const scssDir = path.join(distDir, 'scss')

const {
  spacing,
  radii,
  fontSizes,
  fontWeights,
  fontFamily,
  shadows,
  componentSizes,
  buildHbPalette,
  resolveHbElTokens,
} = await import(path.join(distDir, 'index.js'))

const toKebab = (key) => key.replace(/[A-Z]/g, (ch) => `-${ch.toLowerCase()}`)

/** 令牌分组 -> SCSS 变量前缀 */
const groups = [
  ['space', spacing],
  ['radius', radii],
  ['font-size', fontSizes],
  ['font-weight', fontWeights],
  ['shadow', shadows],
  ['component-size', componentSizes],
]

const header = (title) => [
  `// ${title}`,
  '// 本文件由 @hebang/tokens 构建脚本从 OKLCH 派生引擎自动生成，请勿手动修改。',
  `// 生成时间：${new Date().toISOString()}`,
  '',
]

/* ---------- layout 变量 + light 调色板 ---------- */
const lightPalette = buildHbPalette(undefined, { mode: 'light' })

const lightLines = header('@hebang/tokens：布局令牌 + 默认主色 light 调色板')

for (const [prefix, group] of groups) {
  lightLines.push(`// ---------- ${prefix} ----------`)
  for (const [key, value] of Object.entries(group)) {
    lightLines.push(`$hb-${prefix}-${toKebab(key)}: ${value};`)
  }
  lightLines.push('')
}
lightLines.push(`$hb-font-family: ${JSON.stringify(fontFamily)};`, '')

lightLines.push('// ---------- 色彩令牌（light 模式，主色 ' + lightPalette.brandHex + '） ----------')
for (const [name, hex] of Object.entries(lightPalette.named)) {
  lightLines.push(`$${name}: ${hex};`)
}
lightLines.push('')
lightLines.push('// ---------- hb-el-xxx 业务 token 绑定（light 档位） ----------')
for (const [token, hex] of Object.entries(resolveHbElTokens(lightPalette))) {
  lightLines.push(`$hb-el-${token}: ${hex};`)
}
lightLines.push('')

/* ---------- dark 调色板 ---------- */
const darkPalette = buildHbPalette(undefined, { mode: 'dark' })
const darkLines = header('light 调色板的暗色模式对照（主色 ' + darkPalette.brandHex + '）')
darkLines.push('// 语义不变、档位方向反转（规范 §7）')
for (const [name, hex] of Object.entries(darkPalette.named)) {
  darkLines.push(`$${name}: ${hex};`)
}
darkLines.push('')
darkLines.push('// ---------- hb-el-xxx 业务 token 绑定（dark 档位） ----------')
for (const [token, hex] of Object.entries(resolveHbElTokens(darkPalette))) {
  darkLines.push(`$hb-el-${token}: ${hex};`)
}
darkLines.push('')

mkdirSync(scssDir, { recursive: true })
writeFileSync(path.join(scssDir, 'variables.scss'), lightLines.join('\n'))
writeFileSync(path.join(scssDir, 'palette-dark.scss'), darkLines.join('\n'))
writeFileSync(
  path.join(scssDir, 'tokens.scss'),
  '@forward "variables";\n',
)

console.log(
  `[tokens] SCSS 已生成 -> scss/variables.scss(${lightPalette.named && Object.keys(lightPalette.named).length} 色彩变量 + layout) / scss/palette-dark.scss`,
)
