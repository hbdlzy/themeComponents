<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { ElInput } from 'element-plus'
import { componentSizes, fontSizes, radii, spacing } from '@hebang/tokens'
import type { HbInputLabelAlign, HbInputProps, HbInputSize } from '../../types'

defineOptions({ name: 'HbInput', inheritAttrs: false })

const props = withDefaults(defineProps<HbInputProps>(), {
  modelValue: '',
  label: '',
  labelAlign: 'left',
  required: false,
  placeholder: '请输入',
  hint: '',
  disabled: false,
  status: 'default',
  size: 'default',
  clearable: true,
  width: '240px',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'clear'): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'change', value: string): void
}>()

const attrs = useAttrs()
const slots = useSlots()

const resolvedSize = computed<HbInputSize>(() => {
  const size = props.size
  return size === 'small' || size === 'large' ? size : 'default'
})

const resolvedAlign = computed<HbInputLabelAlign>(() => {
  const align = props.labelAlign
  return align === 'right' || align === 'center' ? align : 'left'
})

const isError = computed(() => props.status === 'error')
const hasLabel = computed(() => !!(props.label || slots.label))
const hasHint = computed(() => !!(props.hint || slots.hint))

const value = computed({
  get: () => (props.modelValue == null ? '' : String(props.modelValue)),
  set: (next) => emit('update:modelValue', next),
})

const rootClass = computed(() => ({
  'hb-input--small': resolvedSize.value === 'small',
  'hb-input--large': resolvedSize.value === 'large',
  'hb-input--error': isError.value,
  'hb-input--disabled': props.disabled,
  'hb-input--hover': props.preview === 'hover',
  'hb-input--focus': props.preview === 'focus',
  [`hb-input--label-${resolvedAlign.value}`]: true,
}))

const rootStyle = computed(() => {
  const size = resolvedSize.value
  const style: Record<string, string> = {
    '--hb-input-height':
      size === 'small'
        ? componentSizes.heightSmall
        : size === 'large'
          ? componentSizes.heightLarge
          : componentSizes.heightBase,
    '--hb-input-font-size': size === 'small' ? fontSizes.extraSmall : fontSizes.base,
    '--hb-input-line-height': size === 'small' ? '20px' : size === 'large' ? '24px' : '22px',
    '--hb-input-label-size': size === 'large' ? fontSizes.base : fontSizes.extraSmall,
    '--hb-input-hint-size': fontSizes.extraSmall,
    '--hb-input-radius': radii.base,
    '--hb-input-pad-x': size === 'small' ? spacing.sm : size === 'large' ? spacing.md : '12px',
    '--hb-input-icon-size': '16px',
    '--hb-input-label-gap': spacing.sm,
    '--hb-input-hint-gap': spacing.xs,
  }
  if (props.width != null && props.width !== '') {
    style.width = typeof props.width === 'number' ? `${props.width}px` : String(props.width)
  }
  return style
})

function onClear(event: MouseEvent): void {
  event.preventDefault()
  event.stopPropagation()
  if (props.disabled) return
  value.value = ''
  emit('clear')
}
</script>

<template>
  <div class="hb-input" :class="rootClass" :style="rootStyle">
    <div v-if="hasLabel" class="hb-input__label">
      <span class="hb-input__label-inner">
        <span v-if="required" class="hb-input__required" aria-hidden="true">*</span>
        <span class="hb-input__label-text">
          <slot name="label">{{ label }}</slot>
        </span>
      </span>
    </div>

    <ElInput
      v-model="value"
      class="hb-input__control"
      v-bind="attrs"
      :size="resolvedSize"
      :disabled="disabled"
      :placeholder="placeholder"
      :clearable="false"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @change="emit('change', String($event ?? ''))"
    >
      <template v-if="clearable" #suffix>
        <button
          class="hb-input__clear"
          type="button"
          tabindex="-1"
          aria-label="清除"
          :disabled="disabled"
          @mousedown.prevent="onClear"
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1.2" />
            <path
              d="M5.6 5.6 10.4 10.4M10.4 5.6 5.6 10.4"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </template>
    </ElInput>

    <div v-if="hasHint" class="hb-input__hint">
      <span class="hb-input__hint-icon" aria-hidden="true">
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
      <span class="hb-input__hint-text">
        <slot name="hint">{{ hint }}</slot>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.hb-input {
  --hb-input-color-title-icon: var(--hb-el-danger, var(--el-color-danger));
  --hb-input-color-title: var(--hb-el-text, var(--el-text-color-primary));
  --hb-input-color-bg: var(--hb-el-bg, var(--el-bg-color-page));
  --hb-input-color-border: var(--hb-el-border2, var(--el-border-color));
  --hb-input-color-placeholder: var(--hb-el-disabled, var(--el-text-color-disabled));
  --hb-input-color-clear: var(--hb-el-disabled, var(--el-text-color-disabled));
  --hb-input-color-hint-icon: var(--hb-el-disabled, var(--el-text-color-disabled));
  --hb-input-color-hint: var(--hb-el-disabled, var(--el-text-color-disabled));
  --hb-input-color-text: var(--hb-el-text, var(--el-text-color-primary));

  --el-input-bg-color: var(--hb-input-color-bg);
  --el-input-border-color: var(--hb-input-color-border);
  --el-input-hover-border-color: var(--hb-input-color-border);
  --el-input-focus-border-color: var(--hb-input-color-border);
  --el-input-text-color: var(--hb-input-color-text);
  --el-input-placeholder-color: var(--hb-input-color-placeholder);
  --el-disabled-bg-color: var(--hb-input-color-bg);
  --el-disabled-border-color: var(--hb-input-color-border);
  --el-disabled-text-color: var(--hb-input-color-placeholder);
  --el-input-height: var(--hb-input-height);
  --el-input-border-radius: var(--hb-input-radius);

  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 0;
  box-sizing: border-box;

  &:not(.hb-input--disabled):not(.hb-input--error) {
    &:hover,
    &.hb-input--hover {
      --hb-input-color-border: var(--hb-el-brand_hover, var(--el-color-primary));
    }

    &:focus-within,
    &.hb-input--focus {
      --hb-input-color-border: var(--hb-el-brand_press, var(--el-color-primary-dark-2));
    }
  }

  &--error {
    --hb-input-color-border: var(--hb-el-danger, var(--el-color-danger));
    --hb-input-color-hint-icon: var(--hb-el-danger, var(--el-color-danger));
    --hb-input-color-hint: var(--hb-el-danger, var(--el-color-danger));
  }

  &--disabled {
    --hb-input-color-bg: var(--hb-el-bg3, var(--el-fill-color));
    --hb-input-color-border: var(--hb-el-border2, var(--el-border-color));
  }

  &__label {
    margin-bottom: var(--hb-input-label-gap);
    font-size: var(--hb-input-label-size);
    line-height: 1.4;
    color: var(--hb-input-color-title);
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
    color: var(--hb-input-color-title-icon);
    font-family: inherit;
    line-height: 1;
  }

  &__label-text {
    min-width: 0;
    color: var(--hb-input-color-title);
  }

  &__control {
    width: 100%;

    .el-input__wrapper {
      padding-left: var(--hb-input-pad-x);
      padding-right: var(--hb-input-pad-x);
      background-color: var(--hb-input-color-bg);
      box-shadow: 0 0 0 1px var(--hb-input-color-border) inset;
      border-radius: var(--hb-input-radius);
    }

    .el-input__inner {
      height: var(--hb-input-height);
      line-height: var(--hb-input-line-height);
      color: var(--hb-input-color-text);
      font-size: var(--hb-input-font-size);
    }

    .el-input__inner::placeholder {
      color: var(--hb-input-color-placeholder);
    }

    &.is-disabled .el-input__wrapper {
      cursor: not-allowed;
    }
  }

  &__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--hb-input-color-clear);
    cursor: pointer;
    line-height: 0;

    svg {
      width: var(--hb-input-icon-size);
      height: var(--hb-input-icon-size);
      display: block;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__hint {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    margin-top: var(--hb-input-hint-gap);
    font-size: var(--hb-input-hint-size);
    line-height: 1.4;
    color: var(--hb-input-color-hint);
  }

  &__hint-icon {
    display: inline-flex;
    flex: none;
    width: 1em;
    height: 1em;
    margin-top: 0.15em;
    color: var(--hb-input-color-hint-icon);

    svg {
      width: 1em;
      height: 1em;
      display: block;
    }
  }

  &__hint-text {
    min-width: 0;
    color: var(--hb-input-color-hint);
  }
}
</style>
