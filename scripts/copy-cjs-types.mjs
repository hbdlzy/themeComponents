/**
 * 双格式包的 CJS 类型兼容处理：
 * type: module 的包里，exports["."].require 分支需要独立的 .d.cts 类型入口，
 * 否则 publint/TS 会把 types 按 ESM 解析，导致 require() 消费方拿不到类型。
 * 做法：构建产物 dist/index.d.ts 原样复制为 dist/index.d.cts。
 *
 * 用法（必须在各包目录下执行）：node ../../scripts/copy-cjs-types.mjs
 */
import { copyFileSync } from 'node:fs'
import path from 'node:path'

const from = path.resolve('dist/index.d.ts')
const to = path.resolve('dist/index.d.cts')
copyFileSync(from, to)
console.log('[copy-cjs-types] 已生成', to)
