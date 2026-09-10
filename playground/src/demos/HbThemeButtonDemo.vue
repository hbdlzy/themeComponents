<script setup lang="ts">
import { buttonSizes } from '@hebang/tokens'
import { HbThemeButton } from '@hebang/components'
import type { HbThemeButtonVariant } from '@hebang/components'

const variants: { value: HbThemeButtonVariant; label: string; desc: string }[] = [
  { value: 'primary', label: '主要按钮', desc: '主题色实底 + 白字' },
  { value: 'secondary', label: '次要实线按钮', desc: '主题色文字/图标 + 实线边框' },
  { value: 'secondary-dashed', label: '次要虚线按钮', desc: '主题色文字/图标 + 虚线边框' },
  { value: 'neutral', label: '中性实线按钮', desc: '默认文字色文字/图标 + 实线边框' },
  {
    value: 'neutral-dashed',
    label: '中性虚线按钮',
    desc: '默认文字色文字/图标 + 虚线边框（边框 中性色/neutral_5）',
  },
]

const sizes = [
  {
    value: 'large' as const,
    label: `大 large · 高${buttonSizes.large.height} 字${buttonSizes.large.fontSize} 边距${buttonSizes.large.paddingX} 圆角${buttonSizes.large.radius}`,
  },
  {
    value: 'medium' as const,
    label: `中 medium · 高${buttonSizes.medium.height} 字${buttonSizes.medium.fontSize} 边距${buttonSizes.medium.paddingX} 圆角${buttonSizes.medium.radius}`,
  },
  {
    value: 'small' as const,
    label: `小 small · 高${buttonSizes.small.height} 字${buttonSizes.small.fontSize} 边距${buttonSizes.small.paddingX} 圆角${buttonSizes.small.radius}`,
  },
]

const states = [
  { key: 'default', label: '默认状态', cls: '', disabled: false },
  { key: 'hover', label: '悬停状态', cls: 'is-hover', disabled: false },
  { key: 'active', label: '点击状态', cls: 'is-active', disabled: false },
  { key: 'disabled', label: '置灰状态', cls: '', disabled: true },
] as const
</script>

<template>
  <div class="demo">
    <h3>类型 × 尺寸</h3>
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
            <span class="desc">{{ v.desc }}</span>
          </td>
          <td v-for="s in sizes" :key="s.value">
            <HbThemeButton :variant="v.value" :size="s.value">
              {{ v.value === 'primary' ? '按钮' : '按 钮' }}
            </HbThemeButton>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="icon-row">
      <HbThemeButton variant="primary">
        <template #icon>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M8 1.5a.9.9 0 0 1 .9.9V7.1h4.7a.9.9 0 1 1 0 1.8H8.9v4.7a.9.9 0 1 1-1.8 0V8.9H2.4a.9.9 0 0 1 0-1.8h4.7V2.4a.9.9 0 0 1 .9-.9Z"
            />
          </svg>
        </template>
        新建
      </HbThemeButton>
    </div>

    <h3>四种状态</h3>
    <div class="state-grid">
      <div v-for="v in variants" :key="v.value" class="state-group">
        <h4>{{ v.label }}</h4>
        <div class="state-row">
          <div v-for="st in states" :key="st.key" class="state-cell">
            <HbThemeButton :variant="v.value" :disabled="st.disabled" :class="st.cls">
              按钮
            </HbThemeButton>
            <span class="state-cell__label">{{ st.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <h3>圆角</h3>
    <div class="row">
      <HbThemeButton variant="primary">默认圆角</HbThemeButton>
      <HbThemeButton variant="primary" shape="round">胶囊圆角</HbThemeButton>
      <HbThemeButton variant="secondary" shape="round">
        <template #icon>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M8 1.5a.9.9 0 0 1 .9.9V7.1h4.7a.9.9 0 1 1 0 1.8H8.9v4.7a.9.9 0 1 1-1.8 0V8.9H2.4a.9.9 0 0 1 0-1.8h4.7V2.4a.9.9 0 0 1 .9-.9Z"
            />
          </svg>
        </template>
        次要胶囊
      </HbThemeButton>
      <HbThemeButton variant="neutral-dashed" shape="round" size="small">中性虚线小胶囊</HbThemeButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  h3 {
    margin: 20px 0 10px;
    font-size: 13px;
    font-weight: 600;
    color: var(--hb-el-text);

    &:first-child {
      margin-top: 0;
    }
  }

  h4 {
    margin: 0 0 8px;
    font-size: 13px;
    font-weight: 600;
    color: var(--hb-el-text);
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

  .desc {
    display: block;
    font-size: 12px;
    color: var(--hb-el-text3);
  }
}

.icon-row,
.row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 12px;
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
</style>
