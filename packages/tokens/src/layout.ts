/** 间距系统：4px 基准步进 */
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
} as const

/** 圆角系统 */
export const radii = {
  base: '4px',
  small: '2px',
  large: '8px',
  round: '999px',
  circle: '50%',
} as const

/** 字号系统 */
export const fontSizes = {
  extraSmall: '12px',
  small: '13px',
  base: '14px',
  large: '16px',
  extraLarge: '18px',
  title: '20px',
} as const

/** 字重系统 */
export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

/** 字体族 */
export const fontFamily =
  "'PingFang SC', 'Helvetica Neue', 'Microsoft YaHei', Arial, sans-serif"

/** 阴影系统 */
export const shadows = {
  light: '0px 0px 12px rgba(0, 0, 0, 0.06)',
  base: '0px 2px 8px rgba(26, 34, 51, 0.10)',
  dark: '0px 4px 16px rgba(26, 34, 51, 0.16)',
} as const

/** 组件尺寸（与 Element Plus size 体系对齐） */
export const componentSizes = {
  heightSmall: '24px',
  heightBase: '32px',
  heightLarge: '40px',
} as const

export type Spacing = typeof spacing
export type Radii = typeof radii
export type FontSizes = typeof fontSizes
