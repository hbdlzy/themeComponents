<script setup lang="ts">
import { computed } from 'vue'
import { buttonSizes, radii } from '@hebang/tokens'
import type { HbThemeButtonProps } from '../../types'

/**
 * 合邦主题按钮：完全自定义实现（原生 button），不依赖 ElButton。
 *
 * 颜色唯一来源 = OKLCH 规则引擎（@hebang/tokens）：
 * - 组件只引用引擎产出的 --hb-el-* 语义令牌（绑定表 elTokens.ts），
 *   不自带任何第二套颜色（无 --el-* 回退、无裸 hex）；
 * - 悬停/点击/置灰的档位逻辑（brand_3 / brand_5 / disabled）与明暗模式
 *   翻转，全部由引擎绑定表决定，组件层零硬编码；
 * - 未引入 @hebang/theme 时颜色变量为空（不渲染错误色），主题由引擎统管。
 * 尺寸同理：大中小的高度/字号/内边距/圆角唯一来源是 @hebang/tokens 的
 * buttonSizes（layout.ts），组件以 CSS 变量注入，样式层不写死数值。
 *
 * 完整配置见公共文档 docs/components/hb-theme-button.md。
 * is-hover / is-active 为文档演示用强制状态类（置灰直接用 disabled 属性）。
 */
defineOptions({ name: 'HbThemeButton' })

const props = withDefaults(defineProps<HbThemeButtonProps>(), {
  variant: 'primary',
  size: 'medium',
  shape: 'default',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const rootClass = computed(() => [
  `hb-theme-button--${props.variant}`,
  `hb-theme-button--${props.size}`,
  { 'hb-theme-button--round': props.shape === 'round' },
])

/**
 * 尺寸数值唯一来源 = @hebang/tokens 的 buttonSizes（layout.ts，大中小一张表）。
 * 组件不写死尺寸：以 CSS 变量注入，改规格只动 tokens。
 * 单个实例想微调：直接在标签上写 style="--hb-btn-height: 36px"（style 属性会
 * 覆盖组件注入的同名变量）。
 */
const sizeStyle = computed(() => {
  const s = buttonSizes[props.size]
  return {
    '--hb-btn-height': s.height,
    '--hb-btn-font-size': s.fontSize,
    '--hb-btn-padding-x': s.paddingX,
    '--hb-btn-gap': s.gap,
    '--hb-btn-radius': props.shape === 'round' ? radii.round : s.radius,
  }
})
</script>

<template>
  <button
    type="button"
    class="hb-theme-button"
    :class="rootClass"
    :style="sizeStyle"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <span v-if="$slots.icon" class="hb-theme-button__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
    <span class="hb-theme-button__label">
      <slot />
    </span>
  </button>
</template>

<style lang="scss">
.hb-theme-button {
  /* ---------- 颜色钩子：唯一出口（全部来自规则引擎 --hb-el-*） ---------- */
  --hb-btn-fg: var(--hb-el-text);
  --hb-btn-bg: transparent;
  --hb-btn-border: var(--hb-el-text);
  --hb-btn-border-style: solid;
  --hb-btn-font-weight: 400;
  /* 尺寸钩子（--hb-btn-height/font-size/padding-x/gap/radius）由组件脚本
     从 @hebang/tokens buttonSizes 注入，样式层不写死数值 */

  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: var(--hb-btn-height);
  margin: 0;
  padding: 0 var(--hb-btn-padding-x);
  gap: var(--hb-btn-gap);
  border: 1px var(--hb-btn-border-style) var(--hb-btn-border);
  border-radius: var(--hb-btn-radius);
  background: var(--hb-btn-bg);
  color: var(--hb-btn-fg);
  font-family: inherit;
  font-size: var(--hb-btn-font-size);
  font-weight: var(--hb-btn-font-weight);
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition:
    color 0.15s ease,
    background-color 0.15s ease,
    border-color 0.15s ease;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--hb-el-brand) 25%, transparent);
  }

  &[disabled] {
    cursor: not-allowed;
  }

  /* ---------- 1. 主要按钮：面性主题色底 + 白字 ---------- */
  &--primary {
    --hb-btn-fg: var(--hb-el-white);
    --hb-btn-bg: var(--hb-el-brand);
    --hb-btn-border: var(--hb-el-brand);
    --hb-btn-font-weight: 500; // 布局令牌：tokens/fontWeights.medium

    // 悬停 = 引擎绑定 brand_hover 档（tonal index 3），点击 = brand_press 档（index 5）
    &:hover:not([disabled]),
    &.is-hover:not([disabled]) {
      --hb-btn-bg: var(--hb-el-brand_hover);
      --hb-btn-border: var(--hb-el-brand_hover);
    }

    &:active:not([disabled]),
    &.is-active:not([disabled]) {
      --hb-btn-bg: var(--hb-el-brand_press);
      --hb-btn-border: var(--hb-el-brand_press);
    }

    // 置灰：整体灰底白字（disabled 档 neutral_7；禁用元素豁免对比度校验）
    &[disabled] {
      --hb-btn-bg: var(--hb-el-disabled);
      --hb-btn-border: var(--hb-el-disabled);
    }
  }

  /* ---------- 2/3. 次要实线 / 次要虚线：主题色文字+描边 ---------- */
  &--secondary,
  &--secondary-dashed {
    --hb-btn-fg: var(--hb-el-brand);
    --hb-btn-border: var(--hb-el-brand);

    &:hover:not([disabled]),
    &.is-hover:not([disabled]) {
      --hb-btn-fg: var(--hb-el-brand_hover);
      --hb-btn-border: var(--hb-el-brand_hover);
    }

    &:active:not([disabled]),
    &.is-active:not([disabled]) {
      --hb-btn-fg: var(--hb-el-brand_press);
      --hb-btn-border: var(--hb-el-brand_press);
    }

    &[disabled] {
      --hb-btn-fg: var(--hb-el-disabled);
      --hb-btn-border: var(--hb-el-disabled);
    }
  }

  /* ---------- 4. 中性实线：默认文字色文字+描边 ---------- */
  &--neutral {
    --hb-btn-fg: var(--hb-el-text);
    --hb-btn-border: var(--hb-el-text);

    &[disabled] {
      --hb-btn-fg: var(--hb-el-disabled);
      --hb-btn-border: var(--hb-el-disabled);
    }
  }

  /* ---------- 5. 中性虚线：文字=默认文字色，边框=中性色/neutral_5 ---------- */
  &--neutral-dashed {
    --hb-btn-fg: var(--hb-el-text);
    --hb-btn-border: var(--hb-el-border2); // 绑定表 light=neutral_5

    &[disabled] {
      --hb-btn-fg: var(--hb-el-disabled);
      --hb-btn-border: var(--hb-el-disabled);
    }
  }

  // 中性款悬停/点击统一到主题状态色（待设计确认，档位仍由引擎定义）
  &--neutral:hover:not([disabled]),
  &--neutral-dashed:hover:not([disabled]),
  &--neutral.is-hover:not([disabled]),
  &--neutral-dashed.is-hover:not([disabled]) {
    --hb-btn-fg: var(--hb-el-brand);
    --hb-btn-border: var(--hb-el-brand);
  }

  &--neutral:active:not([disabled]),
  &--neutral-dashed:active:not([disabled]),
  &--neutral.is-active:not([disabled]),
  &--neutral-dashed.is-active:not([disabled]) {
    --hb-btn-fg: var(--hb-el-brand_press);
    --hb-btn-border: var(--hb-el-brand_press);
  }

  /* ---------- 虚线边框开关 ---------- */
  &--secondary-dashed,
  &--neutral-dashed {
    --hb-btn-border-style: dashed;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    flex: none;

    svg {
      display: block;
    }
  }
}
</style>
