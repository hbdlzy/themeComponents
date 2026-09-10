<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  buttonSizes,
  formatHbElRefLabel,
  HB_EL_TOKENS,
  resolveHbElTokens,
} from '@hebang/tokens'
import { HbThemeButton, type HbThemeButtonVariant } from '@hebang/components'
import { themePresets, useTheme } from '../composables/useTheme'

/**
 * HbThemeButton 组件演示页。
 * 颜色配置口径以公共文档为准：docs/components/hb-theme-button.md；
 * 本页只负责「看得见」：类型矩阵、四态展示、token→当前色值实时对照。
 */

const { mode, currentHex, palette, commitColor } = useTheme()

const presets = themePresets

/* ---------- 组件元数据 ---------- */

const variants: { value: HbThemeButtonVariant; label: string; desc: string }[] = [
  { value: 'primary', label: '主要按钮', desc: '主题色实底 + 白字' },
  { value: 'secondary', label: '次要实线按钮', desc: '主题色文字/图标 + 实线边框' },
  { value: 'secondary-dashed', label: '次要虚线按钮', desc: '主题色文字/图标 + 虚线边框' },
  { value: 'neutral', label: '中性实线按钮', desc: '默认文字色文字/图标 + 实线边框' },
  { value: 'neutral-dashed', label: '中性虚线按钮', desc: '默认文字色文字/图标 + 虚线边框（边框 中性色/neutral_5）' },
]

/** 尺寸规格实时读自 @hebang/tokens buttonSizes（改数值只动那里） */
const sizes = [
  { value: 'large', label: `大 large · 高${buttonSizes.large.height} 字${buttonSizes.large.fontSize} 边距${buttonSizes.large.paddingX} 圆角${buttonSizes.large.radius}` },
  { value: 'medium', label: `中 medium · 高${buttonSizes.medium.height} 字${buttonSizes.medium.fontSize} 边距${buttonSizes.medium.paddingX} 圆角${buttonSizes.medium.radius}` },
  { value: 'small', label: `小 small · 高${buttonSizes.small.height} 字${buttonSizes.small.fontSize} 边距${buttonSizes.small.paddingX} 圆角${buttonSizes.small.radius}` },
] as const

const states = [
  { key: 'default', label: '默认状态', cls: '', disabled: false },
  { key: 'hover', label: '悬停状态', cls: 'is-hover', disabled: false },
  { key: 'active', label: '点击状态', cls: 'is-active', disabled: false },
  { key: 'disabled', label: '置灰状态', cls: '', disabled: true },
] as const

/** 演示用点击回执 */
const clickLog = ref('')

/* ---------- 颜色配置对照（token → 档位 → 当前模式色值） ---------- */

interface ColorRow {
  state: string
  part: string
  token: string
}

const colorGroups: { variant: string; note?: string; rows: ColorRow[] }[] = [
  {
    variant: '主要按钮 primary',
    rows: [
      { state: '默认', part: '背景 / 边框', token: '--hb-el-brand' },
      { state: '默认', part: '文字 / 图标', token: '--hb-el-white' },
      { state: '悬停', part: '背景 / 边框', token: '--hb-el-brand_hover' },
      { state: '点击', part: '背景 / 边框', token: '--hb-el-brand_press' },
      { state: '置灰', part: '背景 / 边框', token: '--hb-el-disabled' },
      { state: '置灰', part: '文字 / 图标', token: '--hb-el-white' },
    ],
  },
  {
    variant: '次要实线 secondary / 次要虚线 secondary-dashed',
    note: '两者颜色一致，仅边框线型不同（实线 / 虚线）。',
    rows: [
      { state: '默认', part: '文字 / 图标 / 边框', token: '--hb-el-brand' },
      { state: '悬停', part: '文字 / 图标 / 边框', token: '--hb-el-brand_hover' },
      { state: '点击', part: '文字 / 图标 / 边框', token: '--hb-el-brand_press' },
      { state: '置灰', part: '文字 / 图标 / 边框', token: '--hb-el-disabled' },
    ],
  },
  {
    variant: '中性实线 neutral',
    rows: [
      { state: '默认', part: '文字 / 图标', token: '--hb-el-text' },
      { state: '默认', part: '边框', token: '--hb-el-text' },
      { state: '悬停', part: '文字 / 图标 / 边框', token: '--hb-el-brand' },
      { state: '点击', part: '文字 / 图标 / 边框', token: '--hb-el-brand_press' },
      { state: '置灰', part: '文字 / 图标 / 边框', token: '--hb-el-disabled' },
    ],
  },
  {
    variant: '中性虚线 neutral-dashed',
    rows: [
      { state: '默认', part: '文字 / 图标', token: '--hb-el-text' },
      { state: '默认', part: '边框（中性色/neutral_5）', token: '--hb-el-border2' },
      { state: '悬停', part: '文字 / 图标 / 边框', token: '--hb-el-brand' },
      { state: '点击', part: '文字 / 图标 / 边框', token: '--hb-el-brand_press' },
      { state: '置灰', part: '文字 / 图标 / 边框', token: '--hb-el-disabled' },
    ],
  },
]

const elNow = computed(() => resolveHbElTokens(palette.value))

/** --hb-el-xxx → { 档位名(brand_4/neutral_5/fixed), 当前模式 hex } */
function tokenInfo(cssVar: string): { step: string; hex: string } {
  const name = cssVar.replace('--hb-el-', '')
  const spec = HB_EL_TOKENS.find((s) => s.token === name)
  const ref = mode.value === 'dark' ? spec!.dark : spec!.light
  return { step: formatHbElRefLabel(ref), hex: elNow.value[name]! }
}

/* ---------- 用法示例（展示为纯文本） ---------- */

const usageCode = [
  'import { HbThemeButton } from \'@hebang/components\'',
  '',
  '// 主要按钮 · 大 · 胶囊圆角',
  '<HbThemeButton variant="primary" size="large" shape="round">提交</HbThemeButton>',
  '',
  '// 次要虚线 + 图标（图标颜色跟随文字 currentColor）',
  '<HbThemeButton variant="secondary-dashed" @click="onAdd">',
  '  <template #icon><PlusSvg /></template>新增',
  '</HbThemeButton>',
  '',
  '// 中性实线 · 置灰',
  '<HbThemeButton variant="neutral" disabled>导出</HbThemeButton>',
].join('\n')
</script>

<template>
  <main class="playground">
    <h1>HbThemeButton · 按钮组件演示</h1>
    <p class="muted">
      独立自定义按钮（原生 button 实现，不依赖 ElButton）。
      完整 API 与颜色配置见公共文档 <code>docs/components/hb-theme-button.md</code>。
      下方所有色值实时跟随「主题规则引擎」页选择的
      <code>hb-xxxx</code> 颜色。
    </p>

    <section class="card">
      <h2>主题输入</h2>
      <div class="row">
        <el-radio-group v-model="mode" size="default">
          <el-radio-button value="light">Light</el-radio-button>
          <el-radio-button value="dark">Dark</el-radio-button>
        </el-radio-group>
        <button
          v-for="hex in presets"
          :key="hex"
          type="button"
          class="preset"
          :class="{ 'preset--active': currentHex === hex }"
          :style="{ background: hex }"
          :title="hex"
          @click="commitColor(hex)"
        />
        <code class="brand-tag">{{ currentHex }}</code>
      </div>
      <p class="muted">
        当前 <code>--hb-el-brand</code> = {{ elNow['brand'] }} ·
        hover = {{ elNow['brand_hover'] }} · press = {{ elNow['brand_press'] }}
      </p>
    </section>

    <section class="card">
      <h2>类型 × 尺寸</h2>
      <table class="matrix">
        <thead>
          <tr>
            <th>类型</th>
            <th v-for="s in sizes" :key="s.value">{{ s.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="v in variants" :key="v.value">
            <td>
              <b>{{ v.label }}</b>
              <span class="muted">{{ v.desc }}</span>
            </td>
            <td v-for="s in sizes" :key="s.value">
              <HbThemeButton
                :variant="v.value"
                :size="s.value"
                @click="clickLog = `${v.label} · ${s.value}`"
              >
                {{ v.value === 'primary' ? '按钮' : '按 钮' }}
              </HbThemeButton>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="muted">
        带图标（icon 槽位，颜色继承文字）：
        <HbThemeButton variant="primary" @click="clickLog = 'primary + icon'">
          <template #icon>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1.5a.9.9 0 0 1 .9.9V7.1h4.7a.9.9 0 1 1 0 1.8H8.9v4.7a.9.9 0 1 1-1.8 0V8.9H2.4a.9.9 0 0 1 0-1.8h4.7V2.4a.9.9 0 0 1 .9-.9Z" />
            </svg>
          </template>
          新建
        </HbThemeButton>
        <span v-if="clickLog" class="click-log">最近点击：{{ clickLog }}</span>
      </p>
    </section>

    <section class="card">
      <h2>四种状态（悬停 / 点击为演示强制态 is-hover / is-active，可直接鼠标试真实交互）</h2>
      <div class="state-grid">
        <div v-for="v in variants" :key="v.value" class="state-group">
          <h3>{{ v.label }}</h3>
          <div class="state-row">
            <div v-for="st in states" :key="st.key" class="state-cell">
              <HbThemeButton
                :variant="v.value"
                :disabled="st.disabled"
                :class="st.cls"
              >
                按钮
              </HbThemeButton>
              <span class="state-cell__label">{{ st.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>圆角（shape：default 常规圆角 / round 胶囊）</h2>
      <div class="row">
        <HbThemeButton variant="primary">默认圆角</HbThemeButton>
        <HbThemeButton variant="primary" shape="round">胶囊圆角</HbThemeButton>
        <HbThemeButton variant="secondary" shape="round">
          <template #icon>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1.5a.9.9 0 0 1 .9.9V7.1h4.7a.9.9 0 1 1 0 1.8H8.9v4.7a.9.9 0 1 1-1.8 0V8.9H2.4a.9.9 0 0 1 0-1.8h4.7V2.4a.9.9 0 0 1 .9-.9Z" />
            </svg>
          </template>
          次要胶囊
        </HbThemeButton>
        <HbThemeButton variant="neutral-dashed" shape="round" size="small">中性虚线小胶囊</HbThemeButton>
      </div>
    </section>

    <section class="card">
      <h2>颜色配置对照 · token → 档位 → 当前色值（实时）</h2>
      <p class="muted">
        组件不单定义主题色：样式只引用 OKLCH 规则引擎产出的
        <code>--hb-el-*</code> 语义令牌，档位与明暗翻转由引擎绑定表
        （<code>packages/tokens/src/elTokens.ts</code>）决定；档位列展示该 token
        在当前 <code>{{ mode }}</code> 模式绑定的 hb 档位。图标颜色永远等于文字颜色（currentColor）。
      </p>
      <div v-for="group in colorGroups" :key="group.variant" class="color-group">
        <h3>{{ group.variant }}</h3>
        <p v-if="group.note" class="muted">{{ group.note }}</p>
        <div class="token-table">
          <div class="token-table__head">
            <span>状态</span><span>作用部位</span><span>token</span><span>档位</span><span>当前色值</span>
          </div>
          <div v-for="(row, i) in group.rows" :key="i" class="token-table__row">
            <span>{{ row.state }}</span>
            <span>{{ row.part }}</span>
            <code>{{ row.token }}</code>
            <code class="token-table__step">{{ tokenInfo(row.token).step }}</code>
            <span class="token-table__color">
              <i :style="{ background: tokenInfo(row.token).hex }" />
              <code>{{ tokenInfo(row.token).hex }}</code>
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>用法</h2>
      <pre class="code-block">{{ usageCode }}</pre>
      <p class="muted">
        Props：<code>variant</code>（5 种类型）· <code>size</code>（large/medium/small，数值定义在
        <code>@hebang/tokens</code> 的 <code>buttonSizes</code>，改一处全库生效）·
        <code>shape</code>（default/round）· <code>disabled</code>；事件 <code>click</code>；槽位
        默认 + <code>#icon</code>。可覆盖 CSS 变量：颜色
        <code>--hb-btn-fg / --hb-btn-bg / --hb-btn-border / --hb-btn-border-style</code>，尺寸
        <code>--hb-btn-height / --hb-btn-font-size / --hb-btn-padding-x / --hb-btn-gap / --hb-btn-radius</code>
        （style 属性写在标签上即可覆盖）。
      </p>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.playground {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px 64px;

  h1 {
    font-size: 24px;
    margin-bottom: 8px;
    color: var(--hb-el-text);
  }

  h3 {
    margin: 0 0 8px;
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

.brand-tag {
  padding: 4px 10px;
  border-radius: 4px;
  background: var(--hb-el-bg4);
  color: var(--hb-el-text);
}

.preset {
  width: 22px;
  height: 22px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);

  &--active {
    border-color: var(--hb-el-text);
  }
}

.matrix {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  th,
  td {
    padding: 10px 12px;
    text-align: left;
    border-bottom: 1px solid var(--hb-el-divider);
    vertical-align: middle;
  }

  th {
    color: var(--hb-el-text2);
    font-weight: 600;
    background: var(--hb-el-bg3);
  }

  td b {
    display: block;
    color: var(--hb-el-text);
    font-weight: 600;
  }

  td .muted {
    display: block;
    font-size: 12px;
  }
}

.click-log {
  margin-left: 12px;
  font-size: 12px;
}

.state-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.state-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.state-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;

  &__label {
    font-size: 11px;
    color: var(--hb-el-text3);
  }
}

.color-group {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.token-table {
  border: 1px solid var(--hb-el-border);
  border-radius: 6px;
  overflow: hidden;
  font-size: 12px;

  &__head,
  &__row {
    display: grid;
    grid-template-columns: 64px minmax(160px, 1.3fr) minmax(160px, 1fr) 110px minmax(120px, 1fr);
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
    color: var(--hb-el-text2);
  }

  &__step {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    color: var(--hb-el-text3);
  }

  &__color {
    display: inline-flex;
    align-items: center;
    gap: 6px;

    i {
      width: 16px;
      height: 16px;
      flex: none;
      border: 1px solid var(--hb-el-border2);
      border-radius: 3px;
    }
  }
}

.code-block {
  margin: 0 0 12px;
  padding: 14px 16px;
  border: 1px solid var(--hb-el-border);
  border-radius: 6px;
  background: var(--hb-el-bg3);
  color: var(--hb-el-text);
  font-size: 12px;
  line-height: 1.7;
  overflow-x: auto;
}

.muted {
  color: var(--hb-el-text3);
}
</style>
