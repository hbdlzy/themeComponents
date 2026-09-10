/**
 * 合邦色彩派生引擎 —— 严格实现《OKLCH 取色与应用规范》§2~§6。
 * 唯一系统输入：主色 HEX + mode(light/dark) + neutralType(tinted/pure)。
 * 所有派生颜色命名为 hb-xxxx（CSS 变量输出为 --hb-xxxx，SCSS 为 $hb-xxxx）。
 *
 * 复现保证：给定相同 brandHex + mode + neutralType，输出确定一致（§10）。
 */
import type { Oklch } from './oklch'
import {
  clamp,
  gamutClamp,
  hexToOklch,
  oklchToHex,
  pipeToHex,
  safeMaxChroma,
} from './oklch'

export type HbColorMode = 'light' | 'dark'
export type HbNeutralType = 'tinted' | 'pure'

/** 系统默认主色（合邦蓝） */
export const HB_DEFAULT_BRAND_HEX = '#1F5AA8'

/** 附录：默认参数汇总（可照抄常量表） */
export const HB_PALETTE_CONFIG = {
  global: { minL: 0.04, maxL: 0.96 },
  functional: {
    info: { lightL: 0.6, darkL: 0.72, hueMode: 'base', target: 0.16, floor: 0.12 },
    success: { lightL: 0.6, darkL: 0.72, hue: 150, target: 0.16, floor: 0.13 },
    warning: { lightL: 0.7, darkL: 0.8, hue: 60, target: 0.16, floor: 0.13 },
    danger: { lightL: 0.58, darkL: 0.7, hue: 25, target: 0.2, floor: 0.16 },
    container: { lightOffset: 0.12, darkOffset: 0.08, chromaFactor: 0.4 },
  },
  neutral: {
    levels: [
      1.0, 0.985, 0.97, 0.955, 0.93, 0.895, 0.85, 0.795, 0.73, 0.655, 0.57,
      0.475, 0.375, 0.27, 0.15,
    ],
    pureChroma: 0.01,
    variantMaxChroma: 0.03,
    variantHueOffset: 15,
    temperFactor: 0.35,
    darkBottom: 0.16,
  },
  chart: {
    lightL: 0.64,
    darkL: 0.72,
    chroma: 0.16,
    goldenAngle: 137.508,
    lightVary: 0.02,
    count: 12,
  },
  tonal: {
    lightSteps: [0.28, 0.18, 0.11, 0.06],
    darkSteps: [0.06, 0.12, 0.19, 0.29],
    chromaShape: [0.18, 0.34, 0.58, 0.8, 1.0, 0.85, 0.7, 0.62, 0.5],
  },
  extended: {
    secondary: { hueOffset: 30, chromaFactor: 0.65, floor: 0.015 },
    tertiary: { hueOffset: 60, chromaFactor: 0.4, floor: 0.015 },
    state: { lightHover: 0.03, lightActive: 0.03, darkHover: 0.015, darkActive: 0.015 },
    focusL: 0.5,
    focusC: 0.1,
    focusH: 260,
    outlineChromaFactor: 0.3,
  },
  /** §6 语义 token -> 中性档位（light / dark 下标） */
  semantics: {
    surface: { light: 0, dark: 14 },
    'surface-container': { light: 0, dark: 10 },
    content: { light: 1, dark: 11 },
    stripe: { light: 1, dark: 9 },
    header: { light: 1, dark: 9 },
    border: { light: 4, dark: 8 },
    'border-2': { light: 5, dark: 7 },
    hover: { light: 3, dark: 8 },
    'text-primary': { light: 13, dark: 3 },
    'text-body': { light: 10, dark: 4 },
    'text-secondary': { light: 9, dark: 5 },
    'text-muted': { light: 8, dark: 6 },
  },
} as const

const CFG = HB_PALETTE_CONFIG

export type HbTonalRamps = Record<
  'brand' | 'info' | 'success' | 'warning' | 'danger',
  string[]
>

export interface HbPalette {
  brandHex: string
  mode: HbColorMode
  neutralType: HbNeutralType
  /** 全部单值颜色，键为 hb-xxxx 名（含 ramp/neutral/chart 展平） */
  named: Record<string, string>
  /** 品牌与 4 功能色的 9 档 tonal 序列（第 4 档为主色） */
  ramps: HbTonalRamps
  neutral: string[]
  neutralVariant: string[]
  chart: string[]
}

export interface HbPaletteOptions {
  mode?: HbColorMode
  neutralType?: HbNeutralType
}

/* ---------- §3.3 每色 9 档 tonal 序列 ---------- */
/**
 * 以 base 为第 5 级（索引 4），共 9 档：4 浅 + 1 主 + 4 深。
 * 锚点（索引 4）= 种子色原样，保证与 hb-brand / hb-success 等命名令牌一致。
 * 邻档色度按 chromaShape 比例取 base.C，再用 pipe（L clamp + gamutClamp）收束。
 * seedHex 可选：品牌轨传入原始 HEX，保证 round-trip 后仍与输入主色逐字节一致。
 */
function deriveTonalPalette(base: Oklch, seedHex?: string): string[] {
  const { lightSteps, darkSteps, chromaShape } = CFG.tonal
  const offsets = [
    ...lightSteps.map((s) => +s),
    0,
    ...darkSteps.map((s) => -s),
  ]
  return offsets.map((off, i) => {
    // 锚点 = 种子色原样（§2.1 / §3.3 第 4 档 = base）
    if (off === 0) return seedHex ?? pipeToHex(base)
    const L = clamp(base.L + off, CFG.global.minL, CFG.global.maxL)
    // 色度按 shape 比例取，再用 pipe 做真实色域裁剪；不用 safeMaxChroma 预压，
    // 否则邻档被压灰、中心档保留高饱和，色带中间会「跳色」。
    const C = Math.max(base.C * chromaShape[i]!, 0.01)
    return pipeToHex({ L, C, H: base.H })
  })
}

/* ---------- §3.1 功能色基准（Info 完整继承 base） ---------- */
function semanticChroma(base: Oklch, L: number, target: number, floor: number): number {
  const ratio = clamp(base.C / 0.2, 0, 1)
  const C = floor + ratio * (target - floor)
  return clamp(C, floor, safeMaxChroma(L))
}

function deriveFunctionalBases(
  base: Oklch,
  mode: HbColorMode,
): Record<'info' | 'success' | 'warning' | 'danger', Oklch> {
  const cf = CFG.functional
  const info: Oklch = { ...base }
  const other = (key: 'success' | 'warning' | 'danger'): Oklch => {
    const spec = cf[key]
    const L = mode === 'dark' ? spec.darkL : spec.lightL
    return { L, C: semanticChroma(base, L, spec.target, spec.floor), H: spec.hue }
  }
  return { info, success: other('success'), warning: other('warning'), danger: other('danger') }
}

/* ---------- §3.2 Container 浅底容器款 ---------- */
function deriveContainer(fn: Oklch, mode: HbColorMode): Oklch {
  const cc = CFG.functional.container
  const offset = mode === 'dark' ? cc.darkOffset : cc.lightOffset
  return { L: fn.L + offset, C: fn.C * cc.chromaFactor, H: fn.H }
}

/* ---------- §2.2 / §2.3 辅助品牌与状态色 ---------- */
function deriveExtended(base: Oklch, key: 'secondary' | 'tertiary'): Oklch {
  const ex = CFG.extended[key]
  const C = clamp(
    Math.max(base.C * ex.chromaFactor, ex.floor),
    ex.floor,
    safeMaxChroma(base.L),
  )
  return { L: base.L, C, H: (base.H + ex.hueOffset) % 360 }
}

function deriveState(base: Oklch, kind: 'hover' | 'active', mode: HbColorMode): Oklch {
  const st = CFG.extended.state
  const hOff = mode === 'dark' ? st.darkHover : st.lightHover
  const aOff = mode === 'dark' ? st.darkActive : st.lightActive
  const delta = kind === 'hover' ? hOff : -aOff
  return {
    L: base.L + delta,
    C: base.C * (kind === 'hover' ? 1.06 : 0.94),
    H: base.H,
  }
}

/* ---------- §4 中性色阶梯 ---------- */
/** §4.3 色温化后的中性色相；纯灰模式 H=0 */
function temperHue(base: Oklch, neutralType: HbNeutralType): number {
  if (neutralType === 'pure') return 0
  const target = base.H < 180 ? 60 : 240
  let delta = (((target - base.H) % 360) + 360) % 360
  if (delta > 180) delta -= 360
  return (((base.H + delta * CFG.neutral.temperFactor) % 360) + 360) % 360
}

/** §4.2 暗色 15 档：light 表镜像翻转 + 拉伸归一 */
function deriveDarkLevels(): number[] {
  const bottom = CFG.neutral.darkBottom
  const raw = CFG.neutral.levels.map((l) => 1 - l).reverse()
  const lo = Math.min(...raw)
  const hi = Math.max(...raw)
  const levels = raw.map((v) => bottom + (1 - bottom) * ((v - lo) / (hi - lo)))
  levels[levels.length - 1] = 0
  return levels
}

/** §4.4 主轨：每档 C = pc·sin(π·L)，pc = min(pureChroma, base.C×0.08)
 *  注意：中性系列 L 按 §4.1/§4.2 表原样取值（含纯白 1.0 与强制纯黑 0），
 *  不套 §2.1 的 0.04~0.96 clamp，只做色域裁剪。 */
function deriveNeutralTrack(base: Oklch, levels: number[], hue: number, pure: boolean): string[] {
  const pc = pure ? 0 : Math.min(CFG.neutral.pureChroma, base.C * 0.08)
  return levels.map((L) =>
    oklchToHex(gamutClamp({ L, C: pc * Math.sin(Math.PI * L), H: hue })),
  )
}

/** §4.5 neutralVariant：H = nH+15°，C = vc·sin(π·L)·sin(θᵢ) */
function deriveNeutralVariant(base: Oklch, levels: number[], hue: number): string[] {
  const vH = (hue + CFG.neutral.variantHueOffset) % 360
  const vc = Math.min(CFG.neutral.variantMaxChroma, base.C * 0.2)
  const n = levels.length
  return levels.map((L, i) => {
    const theta = (Math.PI * i) / (n - 1)
    return oklchToHex(
      gamutClamp({ L, C: vc * Math.sin(Math.PI * L) * Math.sin(theta), H: vH }),
    )
  })
}

/* ---------- §5 图表色序列 ---------- */
function deriveChart(base: Oklch, mode: HbColorMode): string[] {
  const c = CFG.chart
  const L0 = mode === 'dark' ? c.darkL : c.lightL
  return Array.from({ length: c.count }, (_, i) => {
    const vary = i % 2 === 0 ? -c.lightVary : c.lightVary
    return pipeToHex({
      L: L0 + vary,
      C: c.chroma,
      H: (base.H + c.goldenAngle * i) % 360,
    })
  })
}

/* ---------- 组合 ---------- */
export function buildHbPalette(
  brandHex: string = HB_DEFAULT_BRAND_HEX,
  options: HbPaletteOptions = {},
): HbPalette {
  const mode = options.mode ?? 'light'
  const neutralType = options.neutralType ?? 'tinted'
  const base = hexToOklch(brandHex)

  const named: Record<string, string> = {}
  const put = (name: string, lchOrHex: Oklch | string) => {
    named[`hb-${name}`] =
      typeof lchOrHex === 'string' ? lchOrHex : pipeToHex(lchOrHex)
  }

  /* §2 品牌 */
  put('brand', brandHex)
  put('brand-secondary', deriveExtended(base, 'secondary'))
  put('brand-tertiary', deriveExtended(base, 'tertiary'))

  /* §3 功能色 base + container */
  const functional = deriveFunctionalBases(base, mode)
  // 功能色锚点用 pipe 后 hex，保证 ramp[4] === hb-success 等命名令牌
  const infoHex = pipeToHex(functional.info)
  const successHex = pipeToHex(functional.success)
  const warningHex = pipeToHex(functional.warning)
  const dangerHex = pipeToHex(functional.danger)
  const ramps: HbTonalRamps = {
    // 品牌锚点锁定输入主色 HEX（§2.1 brand = 主色原样）
    brand: deriveTonalPalette(base, brandHex),
    info: deriveTonalPalette(functional.info, infoHex),
    success: deriveTonalPalette(functional.success, successHex),
    warning: deriveTonalPalette(functional.warning, warningHex),
    danger: deriveTonalPalette(functional.danger, dangerHex),
  }
  put('info', infoHex)
  put('success', successHex)
  put('warning', warningHex)
  put('danger', dangerHex)
  put('info-container', deriveContainer(functional.info, mode))
  put('success-container', deriveContainer(functional.success, mode))
  put('warning-container', deriveContainer(functional.warning, mode))
  put('danger-container', deriveContainer(functional.danger, mode))

  /* §2.3 状态色：品牌 + 4 功能色各 Hover/Active */
  for (const [key, lch] of Object.entries({
    brand: base,
    ...functional,
  }) as [string, Oklch][]) {
    put(`${key}-hover`, deriveState(lch, 'hover', mode))
    put(`${key}-active`, deriveState(lch, 'active', mode))
  }

  /* §6.3 link / focus / outline */
  put('link', brandHex)
  put(
    'focus',
    { L: CFG.extended.focusL, C: CFG.extended.focusC, H: CFG.extended.focusH },
  )
  put('outline', {
    L: 0.5,
    C: clamp(
      base.C * CFG.extended.outlineChromaFactor,
      0.01,
      safeMaxChroma(0.5),
    ),
    H: base.H,
  })

  /* §4 中性色两套 15 档 */
  const hue = temperHue(base, neutralType)
  const levels = mode === 'dark' ? deriveDarkLevels() : [...CFG.neutral.levels]
  const neutral = deriveNeutralTrack(base, levels, hue, neutralType === 'pure')
  const neutralVariant = deriveNeutralVariant(base, levels, hue)

  /* §5 图表 12 档 */
  const chart = deriveChart(base, mode)

  /* §6.1 / §6.2 语义 token -> 中性档位 */
  for (const [token, idx] of Object.entries(CFG.semantics)) {
    put(token, neutral[mode === 'dark' ? idx.dark : idx.light])
  }

  /* 序列展平进 named：hb-brand-0..8 / hb-success-0..8 / hb-neutral-0..14 … */
  for (const [group, ramp] of Object.entries(ramps)) {
    ramp.forEach((hex, i) => put(`${group}-${i}`, hex))
  }
  neutral.forEach((hex, i) => put(`neutral-${i}`, hex))
  neutralVariant.forEach((hex, i) => put(`neutral-variant-${i}`, hex))
  chart.forEach((hex, i) => put(`chart-${i}`, hex))

  return { brandHex, mode, neutralType, named, ramps, neutral, neutralVariant, chart }
}

/** 输出全量 --hb-* CSS 自定义属性映射 */
export function buildHbCssVars(palette: HbPalette): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const [name, value] of Object.entries(palette.named)) {
    vars[`--${name}`] = value
  }
  return vars
}
