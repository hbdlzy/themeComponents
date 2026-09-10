/**
 * 合邦主题包入口。
 *
 * 色彩生成规则完全委托 @hebang/tokens 的 OKLCH 派生引擎
 * （《OKLCH 取色与应用规范》），本包负责：
 * 1. 把 hb-xxxx 令牌映射为 Element Plus 的 --el-* 变量（§6 语义映射）；
 * 2. 提供静态 CSS（构建期由规则引擎生成，含 html.dark 暗色块）；
 * 3. 提供运行时换肤 applyTheme。
 */
import {
  buildHbPalette,
  buildHbCssVars,
  buildHbElCssVars,
  resolveHbElTokens,
  HB_DEFAULT_BRAND_HEX,
  componentSizes,
  fontSizes,
  fontFamily,
  radii,
  spacing,
  type HbPalette,
  type HbPaletteOptions,
} from '@hebang/tokens'

export type { HbColorMode } from '@hebang/tokens'

/**
 * hb-el-xxx 绑定 token -> Element Plus CSS 变量的桥接。
 * 优先取绑定表解析结果（el 参数），tonal 中间调（light-3..8/dark-2）
 * 直接取引擎序列档位（绑定表只定义了 hover/press，EP 需要完整混色梯度）。
 */
export function buildElementPlusVars(
  el: Record<string, string>,
  named: Record<string, string>,
): Record<string, string> {
  const v = (token: string): string => {
    const value = named[token]
    if (value === undefined) {
      throw new Error(`[theme] 缺少色彩令牌 --${token}，请检查 @hebang/tokens 版本`)
    }
    return value
  }
  return {
    // 品牌：base/浅底取绑定表，中间梯度取 tonal 序列（§3.3）
    '--el-color-primary': el['brand']!,
    '--el-color-primary-light-3': v('hb-brand-3'),
    '--el-color-primary-light-5': v('hb-brand-2'),
    '--el-color-primary-light-7': v('hb-brand-1'),
    '--el-color-primary-light-8': v('hb-brand-0'),
    '--el-color-primary-light-9': el['brand_light']!,
    '--el-color-primary-dark-2': v('hb-brand-5'),

    // 功能色 base/浅底/悬停/点击：全部走绑定表档位
    '--el-color-success': el['success']!,
    '--el-color-success-light-9': el['success_light']!,
    '--el-color-success-light-3': el['success_hover']!,
    '--el-color-success-dark-2': el['success_press']!,
    '--el-color-warning': el['warning']!,
    '--el-color-warning-light-9': el['warning_light']!,
    '--el-color-warning-light-3': el['warning_hover']!,
    '--el-color-warning-dark-2': el['warning_press']!,
    '--el-color-danger': el['danger']!,
    '--el-color-danger-light-9': el['danger_light']!,
    '--el-color-danger-light-3': el['danger_hover']!,
    '--el-color-danger-dark-2': el['danger_press']!,
    '--el-color-error': el['danger']!,
    '--el-color-error-light-9': el['danger_light']!,
    // info 未单列档位，按绑定表约定由品牌序列代管
    '--el-color-info': el['brand']!,
    '--el-color-info-light-9': el['brand_light']!,

    // 文字（绑定表 text/text2/text3/disabled）
    '--el-text-color-primary': el['text']!,
    '--el-text-color-regular': el['text2']!,
    '--el-text-color-secondary': el['text3']!,
    '--el-text-color-placeholder': el['text3']!,
    '--el-text-color-disabled': el['disabled']!,

    // 背景 / 边框 / 填充（bg 系列 + border/divider）
    '--el-bg-color': el['bg2']!,
    '--el-bg-color-page': el['bg']!,
    '--el-bg-color-overlay': el['bg2']!,
    '--el-border-color': el['border2']!,
    '--el-border-color-light': el['border']!,
    '--el-border-color-lighter': el['divider']!,
    '--el-border-color-extra-light': el['bg4']!,
    '--el-fill-color': el['bg3']!,
    '--el-fill-color-light': el['bg3']!,
    '--el-fill-color-lighter': el['bg2']!,
    '--el-fill-color-extra-light': el['bg2']!,
    '--el-fill-color-blank': el['bg2']!,

    // 固定值令牌
    '--el-color-white': el['white']!,
    '--el-mask-color': el['mask']!,

    // 圆角 / 字体 / 尺寸（布局类令牌，不走色彩引擎）
    '--el-border-radius-base': radii.base,
    '--el-border-radius-small': radii.small,
    '--el-border-radius-round': radii.round,
    '--el-font-size-base': fontSizes.base,
    '--el-font-size-small': fontSizes.small,
    '--el-font-size-extra-large': fontSizes.extraLarge,
    '--el-font-family': fontFamily,
    '--el-component-size-small': componentSizes.heightSmall,
    '--el-component-size': componentSizes.heightBase,
    '--el-component-size-large': componentSizes.heightLarge,
  }
}

/**
 * 生成一套完整主题变量：
 * --hb-*（派生引擎全量序列）→ --hb-el-*（42 条业务 token 绑定表）→ --el-*（EP 桥接）。
 * 这是给业务方使用的核心 API：任意主色进，全套 CSS 变量出。
 */
export function buildThemeVars(
  brandHex: string = HB_DEFAULT_BRAND_HEX,
  options: HbPaletteOptions = {},
): Record<string, string> {
  const palette: HbPalette = buildHbPalette(brandHex, options)
  const elTokens = resolveHbElTokens(palette)
  const layoutVars: Record<string, string> = {}
  for (const [key, value] of Object.entries(spacing)) {
    layoutVars[`--hb-space-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`] = value
  }
  return {
    ...layoutVars,
    ...buildHbCssVars(palette),
    ...buildHbElCssVars(palette),
    ...buildElementPlusVars(elTokens, palette.named),
  }
}

/** 默认主色 light 模式的整套变量（保持旧导出名，值来自规则引擎） */
export const elementCssVars: Record<string, string> = buildThemeVars()

/**
 * 运行时把主题写到指定元素（默认 <html>）。
 * 暗色模式请配合切换 html 上的 `dark` class（EP 组件内部逻辑需要它）。
 * SSR 环境自动跳过。
 */
export function applyTheme(
  vars: Record<string, string> = buildThemeVars(),
  target?: HTMLElement,
): void {
  if (typeof document === 'undefined') return
  const el = target ?? document.documentElement
  for (const [name, value] of Object.entries(vars)) {
    el.style.setProperty(name, value)
  }
}

/** 透出派生引擎，业务方需要直接拿 hb-xxxx 调色板时用 */
export { buildHbPalette, HB_DEFAULT_BRAND_HEX } from '@hebang/tokens'
export type { HbPalette, HbColorMode as ThemeMode } from '@hebang/tokens'
