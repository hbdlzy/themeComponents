export {
  spacing,
  radii,
  fontSizes,
  fontWeights,
  fontFamily,
  shadows,
  componentSizes,
  buttonSizes,
} from './layout'
export type { Spacing, Radii, FontSizes, ButtonSizes } from './layout'

/* ── OKLCH 色彩派生引擎（《OKLCH 取色与应用规范》）── */
export {
  clamp,
  hexToOklch,
  oklchToHex,
  isInGamut,
  gamutClamp,
  safeMaxChroma,
  pipe,
  pipeToHex,
  relativeLuminance,
  contrastRatio,
  isLightBackground,
  textColorOn,
} from './oklch'
export type { Oklch, Srgb } from './oklch'

export {
  buildHbPalette,
  buildHbCssVars,
  HB_PALETTE_CONFIG,
  HB_DEFAULT_BRAND_HEX,
} from './palette'
export type {
  HbPalette,
  HbPaletteOptions,
  HbColorMode,
  HbNeutralType,
  HbTonalRamps,
} from './palette'

/* ── hb-el-xxx 语义 token 绑定表（档位 -> 业务 token，分浅/深两列）── */
export {
  HB_EL_TOKENS,
  resolveHbElRef,
  resolveHbElTokens,
  buildHbElCssVars,
  formatHbElRefLabel,
  engineNeutralIndex,
  hbElRefMatches,
  hbElRefFamilyMatches,
} from './elTokens'
export type { HbElTokenSpec, HbElRef, HbElRampGroup, HbElStepSel } from './elTokens'

import {
  spacing,
  radii,
  fontSizes,
  fontWeights,
  fontFamily,
  shadows,
  componentSizes,
  buttonSizes,
} from './layout'

/** 聚合后的布局类令牌（色彩请走 buildHbPalette 派生引擎） */
export const tokens = {
  spacing,
  radii,
  fontSizes,
  fontWeights,
  fontFamily,
  shadows,
  componentSizes,
  buttonSizes,
} as const

export type Tokens = typeof tokens
