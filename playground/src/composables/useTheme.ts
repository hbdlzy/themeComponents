/**
 * 主题状态单一来源：色板输入 + Light/Dark 模式，供各演示页共享。
 *
 * 状态模型（与 docs/实现说明.md §4 一致）：
 * currentHex = preview ?? committed ?? 默认蓝；
 * el-color-picker 走双通道：@active-change 实时预览（不清 preview），
 * v-model 提交（committed 变更才接管并清 preview）。切模式不清 preview。
 */
import { computed, ref, watch } from 'vue'
import { buildHbPalette, HB_DEFAULT_BRAND_HEX, type HbColorMode } from '@hebang/tokens'
import { applyTheme, buildThemeVars } from '@hebang/theme'

export const themePresets = [
  HB_DEFAULT_BRAND_HEX,
  '#3B82F6',
  '#2FA46A',
  '#7A5AA8',
  '#D97B26',
  '#EF4444',
  '#22C55E',
]

const mode = ref<HbColorMode>('light')
const committed = ref<string | null>(null)
const preview = ref<string | null>(null)

const currentHex = computed(
  () => preview.value ?? committed.value ?? HB_DEFAULT_BRAND_HEX,
)

const palette = computed(() =>
  buildHbPalette(currentHex.value, { mode: mode.value }),
)

export function applyCurrent(): void {
  document.documentElement.classList.toggle('dark', mode.value === 'dark')
  applyTheme(buildThemeVars(currentHex.value, { mode: mode.value }))
}

watch(committed, () => {
  preview.value = null
  applyCurrent()
})

watch(mode, () => {
  applyCurrent()
})

/** el-color-picker 拖动/点预设的实时预览通道（EP 2.14 modelValue 是延迟提交） */
export function onActiveChange(color: string | null): void {
  if (!color) return
  preview.value = color
  applyCurrent()
}

/** 直接提交一个主色（预设色块点击等场景） */
export function commitColor(hex: string | null): void {
  committed.value = hex
}

export function useTheme() {
  return {
    mode,
    committed,
    preview,
    currentHex,
    palette,
    applyCurrent,
    onActiveChange,
    commitColor,
    themePresets,
  }
}
