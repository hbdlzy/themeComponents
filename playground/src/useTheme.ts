import { computed, ref, watch } from 'vue'
import { HB_DEFAULT_BRAND_HEX, type HbColorMode } from '@hebang/tokens'
import { applyTheme, buildThemeVars } from '@hebang/theme'

export const THEME_STORAGE_KEY = 'hb-theme'

export const presets = [
  HB_DEFAULT_BRAND_HEX,
  '#3B82F6',
  '#2FA46A',
  '#7A5AA8',
  '#D97B26',
  '#EF4444',
  '#22C55E',
]

function isHex(value: unknown): value is string {
  return typeof value === 'string' && /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value)
}

function readStore(): { brand: string; mode: HbColorMode } {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    if (!raw) return { brand: HB_DEFAULT_BRAND_HEX, mode: 'light' }
    const parsed = JSON.parse(raw) as { brand?: unknown; mode?: unknown }
    return {
      brand: isHex(parsed.brand) ? parsed.brand : HB_DEFAULT_BRAND_HEX,
      mode: parsed.mode === 'dark' ? 'dark' : 'light',
    }
  } catch {
    return { brand: HB_DEFAULT_BRAND_HEX, mode: 'light' }
  }
}

const initial = readStore()
const committed = ref(initial.brand)
const preview = ref<string | null>(null)
const mode = ref<HbColorMode>(initial.mode)

const currentHex = computed(
  () => preview.value ?? committed.value ?? HB_DEFAULT_BRAND_HEX,
)

function persist(): void {
  localStorage.setItem(
    THEME_STORAGE_KEY,
    JSON.stringify({ brand: committed.value, mode: mode.value }),
  )
}

function applyCurrent(): void {
  document.documentElement.classList.toggle('dark', mode.value === 'dark')
  applyTheme(buildThemeVars(currentHex.value, { mode: mode.value }))
}

watch(committed, (value) => {
  if (!isHex(value)) {
    committed.value = HB_DEFAULT_BRAND_HEX
    return
  }
  preview.value = null
  persist()
  applyCurrent()
})

watch(mode, () => {
  persist()
  applyCurrent()
})

function onActiveChange(color: string | null): void {
  if (!color) return
  preview.value = color
  applyCurrent()
}

let booted = false

export function useTheme() {
  if (!booted) {
    booted = true
    persist()
    applyCurrent()
  }
  return {
    committed,
    preview,
    mode,
    currentHex,
    presets,
    onActiveChange,
  }
}
