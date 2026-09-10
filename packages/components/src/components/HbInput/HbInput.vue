<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ElInput } from 'element-plus'
import { componentSizes, fontSizes, radii, spacing } from '@hebang/tokens'
import type { HbInputProps, HbInputSize } from '../../types'
import { toCssSize } from '../../utils'
import HbField from '../HbField/HbField.vue'

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
  type: 'text',
  clearable: true,
  showPassword: true,
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

const resolvedSize = computed<HbInputSize>(() => {
  const size = props.size
  return size === 'small' || size === 'large' ? size : 'default'
})

const isPassword = computed(() => props.type === 'password')
const isError = computed(() => props.status === 'error')

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
  'hb-input--password': isPassword.value,
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
    '--hb-input-radius': radii.base,
    '--hb-input-pad-x': size === 'small' ? spacing.sm : size === 'large' ? spacing.md : '12px',
    '--hb-input-icon-size': '16px',
  }
  const width = toCssSize(props.width)
  if (width) style.width = width
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
  <HbField
    class="hb-input"
    :class="rootClass"
    :style="rootStyle"
    :label="label"
    :label-align="labelAlign"
    :required="required"
    :hint="hint"
    :status="status"
    :disabled="disabled"
  >
    <template v-if="$slots.label" #label><slot name="label" /></template>
    <template v-if="$slots.hint" #hint><slot name="hint" /></template>
    <template v-if="$slots['hint-icon']" #hint-icon><slot name="hint-icon" /></template>

    <ElInput
      v-model="value"
      class="hb-input__control"
      v-bind="attrs"
      :type="isPassword ? 'password' : 'text'"
      :size="resolvedSize"
      :disabled="disabled"
      :placeholder="placeholder"
      :clearable="false"
      :show-password="isPassword && showPassword"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @change="emit('change', String($event ?? ''))"
    >
      <template v-if="clearable && !isPassword" #suffix>
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
  </HbField>
</template>

<style lang="scss">
.hb-input {
  --hb-input-color-bg: var(--hb-el-bg, var(--el-bg-color-page));
  --hb-input-color-border: var(--hb-el-border2, var(--el-border-color));
  --hb-input-color-placeholder: var(--hb-el-disabled, var(--el-text-color-disabled));
  --hb-input-color-clear: var(--hb-el-disabled, var(--el-text-color-disabled));
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
  --el-input-icon-color: var(--hb-input-color-clear);

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
  }

  &--disabled {
    --hb-input-color-bg: var(--hb-el-bg3, var(--el-fill-color));
    --hb-input-color-border: var(--hb-el-border2, var(--el-border-color));
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

    .el-input__clear,
    .el-input__password {
      color: var(--hb-input-color-clear);
    }

    .el-input__password:hover {
      color: var(--hb-el-brand, var(--el-color-primary));
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
}
</style>
