<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import {
  buildHbPalette,
  contrastRatio,
  formatHbElRefLabel,
  HB_EL_TOKENS,
  hbElRefFamilyMatches,
  hbElRefMatches,
  resolveHbElRef,
  resolveHbElTokens,
  textColorOn,
  type HbElRampGroup,
  type HbElRef,
  type HbElStepSel,
} from '@hebang/tokens'
import { HbButton } from '@hebang/components'
import { useTheme } from '../useTheme'

const { mode, currentHex } = useTheme()

/** 当前查看的 tonal 种子（brand / success / warning / danger） */
type SeedKey = HbElRampGroup
const selectedSeed = ref<SeedKey>('brand')

/** 色带点选：点 brand_i / neutral_i 时，绑定表同步高亮对应家族/精确行 */
const stepSel = ref<HbElStepSel | null>(null)

const palette = computed(() =>
  buildHbPalette(currentHex.value, { mode: mode.value }),
)

/* ---------- 派生结果视图 ---------- */

const lightPalette = computed(() =>
  buildHbPalette(currentHex.value, { mode: 'light' }),
)
const darkPalette = computed(() =>
  buildHbPalette(currentHex.value, { mode: 'dark' }),
)

function resolveSide(ref: HbElRef, side: 'light' | 'dark'): string {
  return resolveHbElRef(side === 'dark' ? darkPalette.value : lightPalette.value, ref)
}

/** hb-el 绑定表：档位名(brand_i/neutral_i) + hex，随主色/模式/点选实时联动 */
const elBindingRows = computed(() => {
  const now = resolveHbElTokens(palette.value)
  const sel = stepSel.value
  return HB_EL_TOKENS.map((spec) => {
    const activeRef = mode.value === 'dark' ? spec.dark : spec.light
    // 精确命中只看当前模式档位，避免 light 点选误亮 dark 映射行
    const hitExact = hbElRefMatches(activeRef, sel)
    // 家族命中：该 token 任一模式绑到同色系即高亮（切种子时整族可见）
    const hitFamily =
      hbElRefFamilyMatches(spec.light, sel)
      || hbElRefFamilyMatches(spec.dark, sel)
    return {
      token: spec.token,
      zh: spec.zh,
      lightLabel: formatHbElRefLabel(spec.light),
      darkLabel: formatHbElRefLabel(spec.dark),
      light: resolveSide(spec.light, 'light'),
      dark: resolveSide(spec.dark, 'dark'),
      now: now[spec.token]!,
      nowLabel: formatHbElRefLabel(activeRef),
      hitExact,
      hitFamily,
    }
  })
})

const elNow = computed(() => resolveHbElTokens(palette.value))

const seedOptions = computed(() => {
  const p = palette.value
  return [
    { key: 'brand' as const, label: 'Brand', cn: '品牌', hex: p.ramps.brand[4]! },
    { key: 'success' as const, label: 'Success', cn: '成功', hex: p.ramps.success[4]! },
    { key: 'warning' as const, label: 'Warning', cn: '警告', hex: p.ramps.warning[4]! },
    { key: 'danger' as const, label: 'Danger', cn: '危险', hex: p.ramps.danger[4]! },
  ]
})

const currentRamp = computed(() => palette.value.ramps[selectedSeed.value])
const currentRampLabel = computed(() => selectedSeed.value)

async function scrollBindingToHit(): Promise<void> {
  await nextTick()
  const el =
    document.querySelector('.binding__row--exact')
    ?? document.querySelector('.binding__row--family')
  el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
}

function selectSeed(key: SeedKey): void {
  selectedSeed.value = key
  // 切种子时默认点中锚点（第 4 档 = 基准），绑定表高亮该色系全部相关行
  stepSel.value = { kind: 'ramp', ramp: key, i: 4 }
  void scrollBindingToHit()
}

function selectRampStep(i: number): void {
  stepSel.value = { kind: 'ramp', ramp: selectedSeed.value, i }
  void scrollBindingToHit()
}

function selectNeutralStep(i: number): void {
  // 表内编号：浅色 = 引擎下标；深色展示仍用表约定（0=纯黑语义名）
  // 色带按引擎数组从左到右画，点选时换算成表编号再高亮绑定表
  const tableIndex = mode.value === 'dark' ? 14 - i : i
  stepSel.value = { kind: 'neutral', i: tableIndex }
  void scrollBindingToHit()
}

function isRampStepActive(i: number): boolean {
  const s = stepSel.value
  return !!s && s.kind === 'ramp' && s.ramp === selectedSeed.value && s.i === i
}

function isNeutralStepActive(engineIndex: number): boolean {
  const s = stepSel.value
  if (!s || s.kind !== 'neutral') return false
  const engine = mode.value === 'dark' ? 14 - s.i : s.i
  return engine === engineIndex
}

const extendedChips = computed(() => {
  const n = palette.value.named
  return [
    { token: 'hb-brand-secondary', label: '辅助品牌', hex: n['hb-brand-secondary']! },
    { token: 'hb-brand-tertiary', label: '第三品牌', hex: n['hb-brand-tertiary']! },
    { token: 'hb-brand-hover', label: '品牌 Hover', hex: n['hb-brand-hover']! },
    { token: 'hb-brand-active', label: '品牌 Active', hex: n['hb-brand-active']! },
    { token: 'hb-link', label: '链接', hex: n['hb-link']! },
    { token: 'hb-focus', label: '聚焦环', hex: n['hb-focus']! },
    { token: 'hb-outline', label: '描边', hex: n['hb-outline']! },
  ]
})

const semanticRows = computed(() => {
  const n = palette.value.named
  return [
    ['hb-surface', '页面底'],
    ['hb-surface-container', '卡片底'],
    ['hb-content', '内容区底'],
    ['hb-stripe', '表格条纹'],
    ['hb-border', '边框/分隔线'],
    ['hb-border-2', '输入框描边'],
    ['hb-hover', '悬停行底'],
    ['hb-text-primary', '主文字'],
    ['hb-text-body', '正文文字'],
    ['hb-text-secondary', '次要文字'],
    ['hb-text-muted', '辅助文字'],
  ].map(([token, label]) => ({ token, label, hex: n[token]! }))
})

const contrastChecks = computed(() => {
  const el = elNow.value
  const card = el['bg2']!
  return [
    { token: 'hb-el-text', ratio: contrastRatio(el['text']!, card), min: 4.5 },
    { token: 'hb-el-text2', ratio: contrastRatio(el['text2']!, card), min: 4.5 },
    { token: 'hb-el-text3', ratio: contrastRatio(el['text3']!, card), min: 3 },
    { token: 'hb-el-border2', ratio: contrastRatio(el['border2']!, card), min: 3 },
  ]
})

const buttonTextOnBrand = computed(
  () => textColorOn(elNow.value['brand']!),
)

const stepSelHint = computed(() => {
  const s = stepSel.value
  if (!s) return '点击色带单元格，绑定表会同步高亮对应 hb-el 行'
  if (s.kind === 'ramp') {
    return `当前点选 ${s.ramp}_${s.i} · 绑定表已高亮 ${s.ramp} 色系（精确档加重）`
  }
  return `当前点选 neutral_${s.i} · 绑定表已同步高亮`
})

selectSeed('brand')
</script>

<template>
  <main class="playground">
    <h1>合邦主题组件库 · OKLCH 规则引擎</h1>
    <p class="muted">
      色彩按《OKLCH 取色与应用规范》从主色派生。色带档位名
      <code>brand_i</code> / <code>neutral_i</code> 与下方
      <code>hb-el-xxx</code> 绑定表一一对应；点选色带或切换模式时绑定表同步变化。
    </p>

    <section class="card">
      <h2>变量生效预览</h2>
      <p class="muted">主色与 Light/Dark 在右上角选择，写入 localStorage（键 <code>hb-theme</code>）。</p>
      <div class="row">
        <HbButton type="primary">主要按钮</HbButton>
        <el-button type="primary">el-button</el-button>
        <el-button type="success">成功</el-button>
        <el-input placeholder="输入框描边用 --hb-el-border2" style="width: 240px" />
        <code class="brand-tag">{{ currentHex }}</code>
      </div>
      <p class="muted">
        品牌上按钮文字自适应：<code>{{ buttonTextOnBrand }}</code>（规范 §8：背景亮度 &gt; 0.45 取黑）
      </p>
    </section>

    <section class="card">
      <h2>主色与功能色 · brand_ / success_ / warning_ / danger_</h2>
      <p class="muted">
        点击种子切换色带；第 4 档（中心）= 基准色，必须与种子色一致。
        {{ stepSelHint }}
      </p>
      <div class="seed-row">
        <button
          v-for="s in seedOptions"
          :key="s.key"
          type="button"
          class="seed"
          :class="{ 'seed--active': selectedSeed === s.key }"
          :style="selectedSeed === s.key ? { color: s.hex } : undefined"
          @click="selectSeed(s.key)"
        >
          <span class="seed__name">
            <b>{{ s.label }}</b>
            <i>{{ s.cn }}</i>
          </span>
          <span class="seed__swatch" :style="{ background: s.hex }" />
          <code class="seed__hex">{{ s.hex }}</code>
        </button>
      </div>

      <div class="strip-head">
        <h3>{{ currentRampLabel }} 色带 · 高亮 = 基准（index 4）</h3>
        <span class="muted">左键点选 → 绑定表高亮</span>
      </div>
      <div class="tonal-strip">
        <button
          v-for="(hex, i) in currentRamp"
          :key="i"
          type="button"
          class="tonal-cell"
          :class="{
            'tonal-cell--anchor': i === 4,
            'tonal-cell--active': isRampStepActive(i),
          }"
          @click="selectRampStep(i)"
        >
          <span class="tonal-cell__color" :style="{ background: hex }" />
          <span class="tonal-cell__meta">
            <b>{{ currentRampLabel }}_{{ i }}</b>
            <code>{{ hex }}</code>
          </span>
        </button>
      </div>
    </section>

    <section class="card">
      <h2>中性色 15 档 · neutral_0 … neutral_14</h2>
      <p class="muted">
        浅色：0=纯白 → 14=近黑。深色引擎数组仍从亮到暗，但绑定表按约定
        <code>neutral_0=纯黑</code> 倒序编号；点选色带会按表编号高亮绑定行。
      </p>
      <div class="tonal-strip tonal-strip--neutral">
        <button
          v-for="(hex, i) in palette.neutral"
          :key="i"
          type="button"
          class="tonal-cell"
          :class="{ 'tonal-cell--active': isNeutralStepActive(i) }"
          @click="selectNeutralStep(i)"
        >
          <span class="tonal-cell__color tonal-cell__color--sm" :style="{ background: hex }" />
          <span class="tonal-cell__meta">
            <b>neutral_{{ mode === 'dark' ? 14 - i : i }}</b>
            <code>{{ hex }}</code>
          </span>
        </button>
      </div>
      <div class="tonal-strip tonal-strip--neutral" style="margin-top: 10px">
        <div
          v-for="(hex, i) in palette.neutralVariant"
          :key="i"
          class="tonal-cell tonal-cell--static"
        >
          <span class="tonal-cell__color tonal-cell__color--sm" :style="{ background: hex }" />
          <span class="tonal-cell__meta">
            <b>variant_{{ i }}</b>
            <code>{{ hex }}</code>
          </span>
        </div>
      </div>
      <div class="semantic-table">
        <div v-for="row in semanticRows" :key="row.token" class="semantic-row">
          <span class="semantic-row__color" :style="{ background: row.hex }" />
          <code>--{{ row.token }}</code>
          <span class="muted">{{ row.label }}</span>
          <code class="muted">{{ row.hex }}</code>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>hb-el-xxx 绑定表（token → brand_/neutral_ 档位 · 实时联动）</h2>
      <p class="muted">
        每列同时显示档位名与 hex。换主色 / 切 Light·Dark / 点选色带，本表与
        CSS 变量同步更新。当前模式
        <code>{{ mode }}</code> · 主色 <code>{{ currentHex }}</code>
        <template v-if="stepSel"> · {{ stepSelHint }}</template>
      </p>
      <div class="binding">
        <div class="binding__head">
          <span>token</span><span>中文</span>
          <span :class="{ 'is-active-col': mode === 'light' }">浅色档位</span>
          <span :class="{ 'is-active-col': mode === 'dark' }">深色档位</span>
          <span class="is-now-col">生效中 · {{ mode }}</span>
        </div>
        <div
          v-for="row in elBindingRows"
          :key="row.token"
          class="binding__row"
          :class="{
            'binding__row--family': row.hitFamily,
            'binding__row--exact': row.hitExact,
          }"
        >
          <code>--hb-el-{{ row.token }}</code>
          <span class="binding__zh">{{ row.zh }}</span>
          <span class="binding__cell" :class="{ 'is-active': mode === 'light' }">
            <i :style="{ background: row.light }" />
            <span class="binding__stack">
              <b class="binding__step">{{ row.lightLabel }}</b>
              <b>{{ row.light }}</b>
            </span>
          </span>
          <span class="binding__cell" :class="{ 'is-active': mode === 'dark' }">
            <i :style="{ background: row.dark }" />
            <span class="binding__stack">
              <b class="binding__step">{{ row.darkLabel }}</b>
              <b>{{ row.dark }}</b>
            </span>
          </span>
          <span class="binding__cell is-now">
            <i :style="{ background: row.now }" />
            <span class="binding__stack">
              <b class="binding__step">{{ row.nowLabel }}</b>
              <b>{{ row.now }}</b>
            </span>
          </span>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>色彩生成（§8）· 对 {{ elNow['bg2'] }}（--hb-el-bg2）的对比度</h2>
      <div class="contrast-grid">
        <div v-for="row in contrastChecks" :key="row.token" class="contrast-item">
          <code>{{ row.token }}</code>
          <span class="ratio" :class="{ fail: row.ratio < row.min }">
            {{ row.ratio.toFixed(2) }}:1 / ≥{{ row.min }}
          </span>
          <span
            class="dot"
            :style="{ background: row.ratio >= row.min ? 'var(--hb-el-success)' : 'var(--hb-el-danger)' }"
          />
        </div>
      </div>
    </section>

    <section class="card">
      <h2>辅助品牌与状态（§2.2 / §2.3 / §6.3）</h2>
      <div class="chips">
        <div v-for="chip in extendedChips" :key="chip.token" class="chip">
          <span class="chip__color" :style="{ background: chip.hex }" />
          <div class="chip__meta">
            <b>{{ chip.label }}</b>
            <code>--{{ chip.token }}</code>
            <code class="muted">{{ chip.hex }}</code>
          </div>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>图表色 12 档（§5 · 主色色相 + 黄金角 137.508°）</h2>
      <div class="ramp__steps">
        <div
          v-for="(hex, i) in palette.chart"
          :key="i"
          class="step step--chart"
          :style="{ background: hex }"
          :title="`--hb-chart-${i} ${hex}`"
        />
      </div>
    </section>

  </main>
</template>

<style lang="scss" scoped>
.playground {
  max-width: 1180px;
  margin: 0 auto;
  padding: 32px 24px 64px;

  h1 {
    font-size: 24px;
    margin-bottom: 8px;
    color: var(--hb-el-text);
  }

  h3 {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    color: var(--hb-el-text);
  }
}

.card {
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid var(--hb-el-border);
  border-radius: 8px;
  background: var(--hb-el-bg2);

  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    color: var(--hb-el-text);
  }
}

.brand-tag {
  padding: 4px 10px;
  border-radius: 4px;
  background: var(--hb-el-bg4);
  color: var(--hb-el-text);
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}

.seed-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.seed {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: 2px solid transparent;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  color: var(--hb-el-text2);
  text-align: left;

  &:hover {
    border-color: var(--hb-el-border);
  }

  &--active {
    background: color-mix(in srgb, currentColor 8%, transparent);
  }

  &__name {
    display: flex;
    flex-direction: column;
    line-height: 1.3;

    b {
      font-size: 12px;
    }

    i {
      font-style: normal;
      font-size: 11px;
      opacity: 0.6;
    }
  }

  &__swatch {
    width: 34px;
    height: 34px;
    border-radius: 6px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
    flex: none;
  }

  &__hex {
    font-size: 11px;
    opacity: 0.75;
  }
}

.strip-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.tonal-strip {
  display: flex;
  border: 1px solid var(--hb-el-border);
  border-radius: 8px;
  overflow: hidden;
}

.tonal-cell {
  flex: 1;
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
  color: inherit;

  &--static {
    cursor: default;
  }

  &__color {
    display: block;
    height: 40px;

    &--sm {
      height: 28px;
    }
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 6px 4px 8px;
    background: var(--hb-el-bg2);

    b {
      font-size: 11px;
      font-weight: 600;
      color: var(--hb-el-text2);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    code {
      font-size: 10px;
      color: var(--hb-el-text3);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &--anchor .tonal-cell__color {
    outline: 2px solid var(--hb-el-text);
    outline-offset: -2px;
  }

  &--active {
    .tonal-cell__color {
      outline: 2px solid var(--hb-el-brand);
      outline-offset: -2px;
    }

    .tonal-cell__meta {
      background: var(--hb-el-bg3);

      b {
        color: var(--hb-el-brand);
      }
    }
  }

  & + & .tonal-cell__color {
    box-shadow: inset 1px 0 0 var(--hb-el-bg2);
  }
}

.ramp__steps {
  display: flex;
  flex: 1;
  gap: 2px;
}

.step {
  flex: 1;
  height: 44px;

  &--chart {
    height: 56px;
  }
}

.chips {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 10px;
}

.chip {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;

  &__color {
    width: 34px;
    height: 34px;
    flex: none;
    border: 1px solid var(--hb-el-border);
    border-radius: 4px;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    line-height: 1.5;
  }
}

.semantic-table {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 6px 24px;
}

.semantic-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;

  &__color {
    width: 18px;
    height: 18px;
    flex: none;
    border: 1px solid var(--hb-el-border);
    border-radius: 3px;
  }
}

.contrast-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contrast-item {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;

  .ratio {
    min-width: 120px;

    &.fail {
      color: var(--hb-danger);
      font-weight: 600;
    }
  }
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.binding {
  margin-top: 8px;
  border: 1px solid var(--hb-el-border);
  border-radius: 6px;
  overflow: hidden;
  font-size: 12px;

  &__head,
  &__row {
    display: grid;
    grid-template-columns: minmax(220px, 1.4fr) minmax(100px, 0.8fr) 1.15fr 1.15fr 1.25fr;
    gap: 8px;
    align-items: center;
    padding: 6px 12px;
  }

  &__head {
    background: var(--hb-el-bg3);
    color: var(--hb-el-text2);
    font-weight: 600;
  }

  &__row {
    border-top: 1px solid var(--hb-el-divider);

    &:hover {
      background: var(--hb-el-bg3);
    }

    &--family {
      background: color-mix(in srgb, var(--hb-el-brand) 8%, var(--hb-el-bg2));
      box-shadow: inset 3px 0 0 color-mix(in srgb, var(--hb-el-brand) 45%, transparent);
    }

    &--exact {
      background: color-mix(in srgb, var(--hb-el-brand) 16%, var(--hb-el-bg2));
      box-shadow: inset 3px 0 0 var(--hb-el-brand);
    }
  }

  &__zh {
    color: var(--hb-el-text3);
  }

  &__cell {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 0;

    i {
      width: 16px;
      height: 16px;
      flex: none;
      border: 1px solid var(--hb-el-border2);
      border-radius: 3px;
    }
  }

  &__stack {
    display: flex;
    flex-direction: column;
    min-width: 0;
    line-height: 1.25;

    b {
      font-weight: 400;
      color: var(--hb-el-text2);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__step {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11px;
    color: var(--hb-el-text3) !important;
  }

  .is-active-col,
  .is-now-col {
    color: var(--hb-el-text);
  }

  .is-active {
    i {
      outline: 2px solid var(--hb-el-brand);
      outline-offset: 1px;
    }

    b {
      color: var(--hb-el-text);
      font-weight: 600;
    }

    .binding__step {
      color: var(--hb-el-brand) !important;
      font-weight: 600;
    }
  }

  .is-now {
    background: var(--hb-el-bg3);
    border-radius: 4px;
    padding: 2px 4px;
  }
}

.muted {
  color: var(--hb-el-text3);
}

@media (max-width: 720px) {
  .seed-row {
    grid-template-columns: 1fr 1fr;
  }

  .binding__head,
  .binding__row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
