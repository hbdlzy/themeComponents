/**
 * 把 SCSS 源码复制到 dist/scss，随包一起发布，
 * 供使用 sass 的业务工程直接 @use "@hebang/theme/scss/..."。
 */
import { cpSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const from = path.join(root, 'src/scss')
const to = path.join(root, 'dist/scss')

cpSync(from, to, { recursive: true })
console.log(`[theme] SCSS 源码已复制 -> ${path.relative(root, to)}/`)
