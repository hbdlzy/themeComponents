/**
 * OKLCH 颜色模型工具 —— 严格实现《OKLCH 取色与应用规范》§1
 * HEX ⇄ sRGB ⇄ OKLab ⇄ OKLCH，含色域判定、二分裁剪、安全最大色度。
 */

export interface Oklch {
  L: number
  C: number
  H: number
}

export interface Srgb {
  r: number
  g: number
  b: number
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function srgbToLinear(c: number): number {
  const v = c / 255
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
}

function linearToSrgbChannel(c: number): number {
  const v = c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
  return Math.round(clamp(v * 255, 0, 255))
}

export function hexToSrgb(hex: string): Srgb {
  let clean = hex.replace('#', '')
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('')
  }
  const num = Number.parseInt(clean, 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

export function srgbToHex(srgb: Srgb): string {
  const toHex = (n: number) =>
    clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0')
  return `#${toHex(srgb.r)}${toHex(srgb.g)}${toHex(srgb.b)}`
}

function srgbToOklab(srgb: Srgb): { L: number; a: number; b: number } {
  const l = srgbToLinear(srgb.r)
  const m = srgbToLinear(srgb.g)
  const s = srgbToLinear(srgb.b)

  const l_ = 0.4122214708 * l + 0.5363325363 * m + 0.0514459929 * s
  const m_ = 0.2119034982 * l + 0.6806995451 * m + 0.1073969566 * s
  const s_ = 0.0883024619 * l + 0.2817188376 * m + 0.6299787005 * s

  const lCub = Math.cbrt(l_)
  const mCub = Math.cbrt(m_)
  const sCub = Math.cbrt(s_)

  return {
    L: 0.2104542553 * lCub + 0.7936177850 * mCub - 0.0040720468 * sCub,
    a: 1.9779984951 * lCub - 2.4285922050 * mCub + 0.4505937099 * sCub,
    b: 0.0259040371 * lCub + 0.7827717662 * mCub - 0.8086757660 * sCub,
  }
}

function oklabToSrgb(lab: { L: number; a: number; b: number }): Srgb {
  const lCub = lab.L + 0.3963377774 * lab.a + 0.2158037573 * lab.b
  const mCub = lab.L - 0.1055613458 * lab.a - 0.0638541728 * lab.b
  const sCub = lab.L - 0.0894841775 * lab.a - 1.2914855480 * lab.b

  const l_ = lCub * lCub * lCub
  const m_ = mCub * mCub * mCub
  const s_ = sCub * sCub * sCub

  return {
    r: linearToSrgbChannel(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_),
    g: linearToSrgbChannel(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_),
    b: linearToSrgbChannel(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_),
  }
}

function linearChannelsOf(lch: Oklch): { r: number; g: number; b: number } {
  const Hrad = lch.H * (Math.PI / 180)
  const lab = {
    L: lch.L,
    a: lch.C * Math.cos(Hrad),
    b: lch.C * Math.sin(Hrad),
  }
  const lCub = lab.L + 0.3963377774 * lab.a + 0.2158037573 * lab.b
  const mCub = lab.L - 0.1055613458 * lab.a - 0.0638541728 * lab.b
  const sCub = lab.L - 0.0894841775 * lab.a - 1.2914855480 * lab.b
  const l_ = lCub * lCub * lCub
  const m_ = mCub * mCub * mCub
  const s_ = sCub * sCub * sCub
  return {
    r: 4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    g: -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    b: -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_,
  }
}

/** §1.3 色域判定 */
export function isInGamut(lch: Oklch): boolean {
  const { r, g, b } = linearChannelsOf(lch)
  return r >= 0 && r <= 1 && g >= 0 && g <= 1 && b >= 0 && b <= 1
}

/** §1.4 色域裁剪：保 L、H，二分降 C，24 次 */
export function gamutClamp(lch: Oklch): Oklch {
  if (isInGamut(lch)) return { ...lch }
  let lo = 0
  let hi = lch.C
  let result: Oklch = { L: lch.L, C: 0, H: lch.H }
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2
    const test = { L: lch.L, C: mid, H: lch.H }
    if (isInGamut(test)) {
      result = test
      lo = mid
    } else {
      hi = mid
    }
  }
  return result
}

/** §1.5 安全最大色度 */
export function safeMaxChroma(L: number): number {
  const peak = 0.52
  const dist = Math.abs(L - peak)
  const maxC = 0.24 * Math.exp(-dist * 2.5)
  return Math.max(0.02, maxC)
}

export function hexToOklch(hex: string): Oklch {
  const lab = srgbToOklab(hexToSrgb(hex))
  const C = Math.sqrt(lab.a * lab.a + lab.b * lab.b)
  let H = (Math.atan2(lab.b, lab.a) * 180) / Math.PI
  if (H < 0) H += 360
  return { L: lab.L, C, H }
}

export function oklchToHex(lch: Oklch): string {
  return srgbToHex(oklabToSrgb({
    L: lch.L,
    a: lch.C * Math.cos(lch.H * (Math.PI / 180)),
    b: lch.C * Math.sin(lch.H * (Math.PI / 180)),
  }))
}

/** §2.1 统一管线：L clamp 0.04~0.96 → 色域裁剪 */
export function pipe(lch: Oklch): Oklch {
  return gamutClamp({ ...lch, L: clamp(lch.L, 0.04, 0.96) })
}

export function pipeToHex(lch: Oklch): string {
  return oklchToHex(pipe(lch))
}

/** §8 对比度：WCAG 相对亮度 */
export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToSrgb(hex)
  return (
    0.2126 * srgbToLinear(r) +
    0.7152 * srgbToLinear(g) +
    0.0722 * srgbToLinear(b)
  )
}

export function contrastRatio(hexA: string, hexB: string): number {
  const la = relativeLuminance(hexA)
  const lb = relativeLuminance(hexB)
  const [lighter, darker] = la >= lb ? [la, lb] : [lb, la]
  return (lighter + 0.05) / (darker + 0.05)
}

/** §8 按钮文字自适应：背景相对亮度 > 0.45 用黑字，否则白字 */
export function isLightBackground(hex: string): boolean {
  return relativeLuminance(hex) > 0.45
}

export function textColorOn(hex: string): string {
  return isLightBackground(hex) ? '#000000' : '#FFFFFF'
}
