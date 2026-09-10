/**
 * hb-el-xxx 语义 token 绑定表 —— 把业务 token 绑定到 OKLCH 派生引擎的档位上。
 * 每条 token 分浅色/深色两档；token 输出名 = `--hb-el-<token>`。
 *
 * 档位编号约定（重要）：
 * - 9 档 tonal 序列（brand/success/warning/danger）：两种模式都按 §3.3 原序索引（4=基准）。
 * - 15 档中性色：浅色模式按 §4.1 原序（0=纯白）；深色模式按绑定表约定倒序编号
 *   ——表中「neutral_0（纯黑）」即引擎数组末档，换算规则为 引擎档位[14 - i]。
 * - fixed 类（white/mask）不随模式变化。
 */
import type { HbPalette } from './palette'

export type HbElRampGroup = 'brand' | 'success' | 'warning' | 'danger'

export type HbElRef =
  | { src: 'neutral'; i: number }
  | { src: 'ramp'; ramp: HbElRampGroup; i: number }
  | { src: 'fixed'; value: string }

export interface HbElTokenSpec {
  token: string
  zh: string
  light: HbElRef
  dark: HbElRef
}

const neutral = (i: number): HbElRef => ({ src: 'neutral', i })
const ramp = (r: HbElRampGroup, i: number): HbElRef => ({ src: 'ramp', ramp: r, i })
const fixed = (value: string): HbElRef => ({ src: 'fixed', value })

/** 绑定表（42 条，顺序与业务表格一致） */
export const HB_EL_TOKENS: readonly HbElTokenSpec[] = [
  { token: 'bg', zh: '主背景色', light: neutral(0), dark: neutral(0) },
  { token: 'bg2', zh: '二级背景色', light: neutral(1), dark: neutral(2) },
  { token: 'bg3', zh: '三级背景色', light: neutral(2), dark: neutral(3) },
  { token: 'bg4', zh: '四级背景色', light: neutral(3), dark: neutral(4) },
  { token: 'border', zh: '边框色', light: neutral(4), dark: neutral(5) },
  { token: 'border2', zh: '次要边框色', light: neutral(5), dark: neutral(4) },
  { token: 'text', zh: '主文字色', light: neutral(13), dark: neutral(14) },
  { token: 'text2', zh: '次要文字色', light: neutral(9), dark: neutral(11) },
  { token: 'text3', zh: '辅助文字色', light: neutral(7), dark: neutral(9) },
  { token: 'disabled', zh: '禁用色', light: neutral(7), dark: neutral(8) },
  { token: 'divider', zh: '分割线色', light: neutral(4), dark: neutral(5) },
  { token: 'brand', zh: '主题色', light: ramp('brand', 4), dark: ramp('brand', 4) },
  { token: 'brand_light', zh: '主题浅色', light: ramp('brand', 0), dark: ramp('brand', 8) },
  { token: 'brand_hover', zh: '主题悬停色', light: ramp('brand', 3), dark: ramp('brand', 5) },
  { token: 'brand_press', zh: '主题点击色', light: ramp('brand', 5), dark: ramp('brand', 3) },
  { token: 'success', zh: '成功色', light: ramp('success', 4), dark: ramp('success', 4) },
  { token: 'success_light', zh: '成功浅色', light: ramp('success', 0), dark: ramp('success', 8) },
  { token: 'success_hover', zh: '成功悬停色', light: ramp('success', 3), dark: ramp('success', 5) },
  { token: 'success_press', zh: '成功点击色', light: ramp('success', 5), dark: ramp('success', 3) },
  { token: 'danger', zh: '危险色', light: ramp('danger', 4), dark: ramp('danger', 4) },
  { token: 'danger_light', zh: '危险浅色', light: ramp('danger', 0), dark: ramp('danger', 8) },
  { token: 'danger_hover', zh: '危险悬停色', light: ramp('danger', 3), dark: ramp('danger', 5) },
  { token: 'danger_press', zh: '危险点击色', light: ramp('danger', 5), dark: ramp('danger', 3) },
  { token: 'warning', zh: '警告色', light: ramp('warning', 4), dark: ramp('warning', 4) },
  { token: 'warning_light', zh: '警告浅色', light: ramp('warning', 0), dark: ramp('warning', 8) },
  { token: 'warning_hover', zh: '警告悬停色', light: ramp('warning', 3), dark: ramp('warning', 5) },
  { token: 'warning_press', zh: '警告点击色', light: ramp('warning', 5), dark: ramp('warning', 3) },
  { token: 'white', zh: '白色文字', light: fixed('#ffffff'), dark: fixed('#ffffff') },
  { token: 'mask', zh: '遮罩底色', light: fixed('rgba(0, 0, 0, 0.5)'), dark: fixed('rgba(0, 0, 0, 0.5)') },
  { token: 'tag_outlined_success_bg_press', zh: '线型tag成功点击背景色', light: ramp('success', 1), dark: ramp('success', 7) },
  { token: 'tag_outlined_warning_bg_press', zh: '线型tag告警点击背景色', light: ramp('warning', 1), dark: ramp('warning', 7) },
  { token: 'tag_outlined_danger_bg_press', zh: '线型tag危险点击背景色', light: ramp('danger', 1), dark: ramp('danger', 7) },
  { token: 'tag_outlined_info_bg_press', zh: '线型tag信息点击背景色', light: ramp('brand', 1), dark: ramp('brand', 7) },
  { token: 'tag_lightFill_success_bg_hover', zh: '浅底型tag成功悬停背景色', light: ramp('success', 1), dark: ramp('success', 7) },
  { token: 'tag_lightFill_warning_bg_hover', zh: '浅底型tag告警悬停背景色', light: ramp('warning', 1), dark: ramp('warning', 7) },
  { token: 'tag_lightFill_danger_bg_hover', zh: '浅底型tag危险悬停背景色', light: ramp('danger', 1), dark: ramp('danger', 7) },
  { token: 'tag_lightFill_info_bg_hover', zh: '浅底型tag信息悬停背景色', light: ramp('brand', 1), dark: ramp('brand', 7) },
  { token: 'tag_lightFill_success_bg_press', zh: '浅底型tag成功点击背景色', light: ramp('success', 2), dark: ramp('success', 8) },
  { token: 'tag_lightFill_warning_bg_press', zh: '浅底型tag告警点击背景色', light: ramp('warning', 2), dark: ramp('warning', 8) },
  { token: 'tag_lightFill_danger_bg_press', zh: '浅底型tag危险点击背景色', light: ramp('danger', 2), dark: ramp('danger', 8) },
  { token: 'tag_lightFill_info_bg_press', zh: '浅底型tag信息点击背景色', light: ramp('brand', 2), dark: ramp('brand', 8) },
  { token: 'tag_lightFill_neutral_bg_press', zh: '浅底型tag中性点击背景色', light: neutral(4), dark: neutral(9) },
]

const NEUTRAL_COUNT = 15

/**
 * 档位展示名（与 GenerateView 的 brand_i / neutral_i 命名对齐）。
 * 中性色：表内编号；深色模式下表约定 neutral_0=纯黑，与引擎数组方向相反。
 */
export function formatHbElRefLabel(ref: HbElRef): string {
  if (ref.src === 'fixed') return ref.value.startsWith('#') || ref.value.startsWith('rgb')
    ? 'fixed'
    : ref.value
  if (ref.src === 'ramp') return `${ref.ramp}_${ref.i}`
  return `neutral_${ref.i}`
}

/** 表内中性档位 → 引擎数组下标（深色倒序） */
export function engineNeutralIndex(tableIndex: number, mode: HbPalette['mode']): number {
  return mode === 'dark' ? NEUTRAL_COUNT - 1 - tableIndex : tableIndex
}

/** 按当前 palette 的模式解析单条档位引用 */
export function resolveHbElRef(palette: HbPalette, ref: HbElRef): string {
  if (ref.src === 'fixed') return ref.value
  if (ref.src === 'ramp') return palette.ramps[ref.ramp][ref.i]!
  // 深色模式下中性档位倒序编号（表约定 neutral_0 = 纯黑 = 引擎末档）
  return palette.neutral[engineNeutralIndex(ref.i, palette.mode)]!
}

/** 解析整张绑定表：token 名 -> 当前模式色值 */
export function resolveHbElTokens(
  palette: HbPalette,
  specs: readonly HbElTokenSpec[] = HB_EL_TOKENS,
): Record<string, string> {
  const out: Record<string, string> = {}
  for (const spec of specs) {
    const ref = palette.mode === 'dark' ? spec.dark : spec.light
    out[spec.token] = resolveHbElRef(palette, ref)
  }
  return out
}

/** 输出 --hb-el-xxx CSS 变量映射 */
export function buildHbElCssVars(
  palette: HbPalette,
  specs: readonly HbElTokenSpec[] = HB_EL_TOKENS,
): Record<string, string> {
  const resolved = resolveHbElTokens(palette, specs)
  const vars: Record<string, string> = {}
  for (const [token, value] of Object.entries(resolved)) {
    vars[`--hb-el-${token}`] = value
  }
  return vars
}

export type HbElStepSel =
  | { kind: 'ramp'; ramp: HbElRampGroup; i: number }
  | { kind: 'neutral'; i: number }

/** 精确命中：档位名与索引都相同（如 brand_3） */
export function hbElRefMatches(ref: HbElRef, sel: HbElStepSel | null): boolean {
  if (!sel) return false
  if (sel.kind === 'ramp') {
    return ref.src === 'ramp' && ref.ramp === sel.ramp && ref.i === sel.i
  }
  return ref.src === 'neutral' && ref.i === sel.i
}

/**
 * 家族命中：同一色系任意档（点 Success 种子时，success / success_light / tag_*success* 全高亮）。
 * 中性色仍按精确档位。
 */
export function hbElRefFamilyMatches(ref: HbElRef, sel: HbElStepSel | null): boolean {
  if (!sel) return false
  if (sel.kind === 'ramp') return ref.src === 'ramp' && ref.ramp === sel.ramp
  return ref.src === 'neutral' && ref.i === sel.i
}
