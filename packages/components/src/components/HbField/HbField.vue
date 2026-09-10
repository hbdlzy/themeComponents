<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { HbInputLabelAlign, HbInputStatus } from '../../types'

defineOptions({ name: 'HbField' })

const props = withDefaults(
  defineProps<{
    label?: string
    labelAlign?: HbInputLabelAlign
    required?: boolean
    hint?: string
    status?: HbInputStatus
    disabled?: boolean
  }>(),
  {
    label: '',
    labelAlign: 'left',
    required: false,
    hint: '',
    status: 'default',
    disabled: false,
  },
)

const slots = useSlots()
const hasLabel = computed(() => !!(props.label || slots.label))
const hasHint = computed(() => !!(props.hint || slots.hint))
const isError = computed(() => props.status === 'error')
const align = computed<HbInputLabelAlign>(() => {
  const value = props.labelAlign
  return value === 'right' || value === 'center' ? value : 'left'
})
</script>

<template>
  <div
    class="hb-field"
    :class="{
      'hb-field--error': isError,
      'hb-field--disabled': disabled,
      [`hb-field--label-${align}`]: true,
    }"
  >
    <div v-if="hasLabel" class="hb-field__label">
      <span class="hb-field__label-inner">
        <span v-if="required" class="hb-field__required" aria-hidden="true">*</span>
        <span class="hb-field__label-text">
          <slot name="label">{{ label }}</slot>
        </span>
      </span>
    </div>
    <slot />
    <div v-if="hasHint" class="hb-field__hint">
      <span class="hb-field__hint-icon" aria-hidden="true">
        <slot name="hint-icon">
          <svg v-if="isError" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1.2" />
            <path d="M8 4.6v4.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            <circle cx="8" cy="11.2" r="0.9" fill="currentColor" />
          </svg>
          <svg v-else viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1.2" />
            <circle cx="8" cy="5.1" r="0.85" fill="currentColor" />
            <path d="M8 7.2v4.3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
          </svg>
        </slot>
      </span>
      <span class="hb-field__hint-text">
        <slot name="hint">{{ hint }}</slot>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.hb-field {
  --hb-field-color-title-icon: var(--hb-el-danger, var(--el-color-danger));
  --hb-field-color-title: var(--hb-el-text, var(--el-text-color-primary));
  --hb-field-color-hint-icon: var(--hb-el-disabled, var(--el-text-color-disabled));
  --hb-field-color-hint: var(--hb-el-disabled, var(--el-text-color-disabled));
  --hb-field-label-size: 12px;
  --hb-field-hint-size: 12px;
  --hb-field-label-gap: 8px;
  --hb-field-hint-gap: 4px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 0;
  box-sizing: border-box;

  &--error {
    --hb-field-color-hint-icon: var(--hb-el-danger, var(--el-color-danger));
    --hb-field-color-hint: var(--hb-el-danger, var(--el-color-danger));
  }

  &__label {
    margin-bottom: var(--hb-field-label-gap);
    font-size: var(--hb-field-label-size);
    line-height: 1.4;
    color: var(--hb-field-color-title);
    text-align: left;
  }

  &--label-right &__label {
    text-align: right;
  }

  &--label-center &__label {
    text-align: center;
  }

  &__label-inner {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    max-width: 100%;
  }

  &__required {
    flex: none;
    color: var(--hb-field-color-title-icon);
    line-height: 1;
  }

  &__hint {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    margin-top: var(--hb-field-hint-gap);
    font-size: var(--hb-field-hint-size);
    line-height: 1.4;
    color: var(--hb-field-color-hint);
  }

  &__hint-icon {
    display: inline-flex;
    flex: none;
    width: 1em;
    height: 1em;
    margin-top: 0.15em;
    color: var(--hb-field-color-hint-icon);

    svg {
      width: 1em;
      height: 1em;
      display: block;
    }
  }
}
</style>
