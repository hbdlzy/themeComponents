<script setup lang="ts">
import { computed, useSlots } from 'vue'
import {
  cardHeaderHeights,
  cardTitleFontSizes,
  fontWeights,
  radii,
  shadows,
  spacing,
} from '@hebang/tokens'
import type { HbCardProps, HbCardSize, HbCardTitleSize } from '../../types'

defineOptions({ name: 'HbCard' })

const props = withDefaults(defineProps<HbCardProps>(), {
  title: '',
  size: 'medium',
  titleSize: 16,
  showIcon: true,
  bordered: true,
  shadow: true,
  round: true,
  divided: true,
})

const slots = useSlots()

const resolvedSize = computed<HbCardSize>(() => {
  const size = props.size
  return size === 'large' || size === 'small' || size === 'medium' ? size : 'medium'
})

const resolvedTitleSize = computed<HbCardTitleSize>(() => {
  const n = Number(props.titleSize)
  return n === 14 || n === 16 || n === 20 || n === 24 ? n : 16
})

const hasExtra = computed(
  () =>
    !!(
      slots.extra
      || slots.actions
      || slots.input
      || slots.icons
      || slots.text
    ),
)

const hasHeader = computed(
  () => !!(props.title || slots.title || slots.icon || slots.header || hasExtra.value),
)

const rootStyle = computed(() => {
  const style: Record<string, string> = {
    '--hb-card-header-height': cardHeaderHeights[resolvedSize.value],
    '--hb-card-title-size': cardTitleFontSizes[resolvedTitleSize.value],
    '--hb-card-radius': props.round ? radii.large : '0px',
    '--hb-card-shadow': props.shadow ? shadows.card : 'none',
    '--hb-card-title-weight': String(fontWeights.bold),
    '--hb-card-pad': spacing.md,
    '--hb-card-gap': spacing.sm,
  }
  if (props.width != null && props.width !== '') {
    style.width = typeof props.width === 'number' ? `${props.width}px` : String(props.width)
  }
  return style
})
</script>

<template>
  <section
    class="hb-card"
    :class="{
      'hb-card--bordered': bordered,
      'hb-card--shadow': shadow,
      'hb-card--round': round,
      'hb-card--divided': divided && hasHeader,
    }"
    :style="rootStyle"
  >
    <header v-if="hasHeader" class="hb-card__header">
      <slot name="header">
        <div class="hb-card__leading">
          <span v-if="showIcon" class="hb-card__icon" aria-hidden="true">
            <slot name="icon">
              <svg viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1.6 14.4 8 8 14.4 1.6 8 8 1.6Z"
                  stroke="currentColor"
                  stroke-width="1.2"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 5.25v5.5M5.25 8h5.5"
                  stroke="currentColor"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
              </svg>
            </slot>
          </span>
          <div class="hb-card__title">
            <slot name="title">{{ title }}</slot>
          </div>
        </div>
        <div v-if="hasExtra" class="hb-card__extra">
          <slot name="extra">
            <slot name="actions" />
            <slot name="input" />
            <slot name="icons" />
            <slot name="text" />
          </slot>
        </div>
      </slot>
    </header>
    <div class="hb-card__body">
      <slot />
    </div>
  </section>
</template>

<style lang="scss">
.hb-card {
  /* 色角色 → 主题变量；实例可覆盖这些 --hb-card-color-* */
  --hb-card-color-title: var(--hb-el-text, var(--el-text-color-primary));
  --hb-card-color-icon: var(--hb-el-text, var(--el-text-color-primary));
  --hb-card-color-body: var(--hb-el-text2, var(--el-text-color-regular));
  --hb-card-color-extra: var(--hb-el-text2, var(--el-text-color-regular));
  --hb-card-color-bg: var(--hb-el-bg, var(--el-bg-color-page));
  --hb-card-color-border: var(--hb-el-border, var(--el-border-color-light));
  --hb-card-color-divider: var(--hb-el-divider, var(--el-border-color-lighter));

  display: flex;
  flex-direction: column;
  min-width: 0;
  box-sizing: border-box;
  overflow: hidden;
  background: var(--hb-card-color-bg);
  color: var(--hb-card-color-body);
  border: 1px solid transparent;
  border-radius: var(--hb-card-radius, 0px);
  box-shadow: none;

  &--bordered {
    border-color: var(--hb-card-color-border);
  }

  &--shadow {
    box-shadow: var(--hb-card-shadow);
  }

  &__header {
    display: flex;
    align-items: center;
    flex: none;
    box-sizing: border-box;
    height: var(--hb-card-header-height);
    padding: 0 var(--hb-card-pad);
    gap: var(--hb-card-pad);
  }

  &--divided &__header {
    border-bottom: 1px solid var(--hb-card-color-divider);
  }

  &__leading {
    display: flex;
    align-items: center;
    gap: var(--hb-card-gap);
    min-width: 0;
    flex: 1;
    font-size: var(--hb-card-title-size);
    font-weight: var(--hb-card-title-weight);
    line-height: 1.2;
    color: var(--hb-card-color-title);
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 1em;
    height: 1em;
    color: var(--hb-card-color-icon);

    svg,
    img {
      width: 1em;
      height: 1em;
      display: block;
      stroke: currentColor;
    }
  }

  &__title {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--hb-card-color-title);
  }

  &__extra {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--hb-card-gap);
    flex: none;
    flex-shrink: 0;
    min-width: 0;
    max-width: 62%;
    color: var(--hb-card-color-extra);

    > * {
      flex: none;
      min-width: 0;
    }
  }

  &__body {
    flex: 1;
    min-height: 0;
    padding: var(--hb-card-pad);
    box-sizing: border-box;
    color: var(--hb-card-color-body);
  }
}
</style>
