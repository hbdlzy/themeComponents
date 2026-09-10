<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ElInputNumber } from 'element-plus'
import { componentSizes, radii } from '@hebang/tokens'
import type { HbInputNumberProps, HbInputSize } from '../../types'
import { toCssSize } from '../../utils'
import HbField from '../HbField/HbField.vue'

defineOptions({ name: 'HbInputNumber', inheritAttrs: false })

const props = withDefaults(defineProps<HbInputNumberProps>(), {
  label: '',
  labelAlign: 'left',
  required: false,
  hint: '',
  disabled: false,
  status: 'default',
  size: 'default',
  placeholder: '请输入',
  step: 1,
  width: '120px',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | undefined): void
  (e: 'change', value: number | undefined): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}>()

const attrs = useAttrs()
const isError = computed(() => props.status === 'error')
const resolvedSize = computed<HbInputSize>(() => {
  const size = props.size
  return size === 'small' || size === 'large' ? size : 'default'
})

const value = computed({
  get: () => props.modelValue,
  set: (next) => emit('update:modelValue', next),
})

const rootStyle = computed(() => {
  const size = resolvedSize.value
  const style: Record<string, string> = {
    '--hb-input-number-height':
      size === 'small'
        ? componentSizes.heightSmall
        : size === 'large'
          ? componentSizes.heightLarge
          : componentSizes.heightBase,
    '--hb-input-number-radius': radii.base,
  }
  const width = toCssSize(props.width)
  if (width) style.width = width
  return style
})
</script>

<template>
  <HbField
    class="hb-input-number"
    :class="{
      'hb-input-number--error': isError,
      'hb-input-number--disabled': disabled,
    }"
    :style="rootStyle"
    :label="label"
    :label-align="labelAlign"
    :required="required"
    :hint="hint"
    :status="status"
    :disabled="disabled"
  >
    <ElInputNumber
      v-model="value"
      class="hb-input-number__control"
      v-bind="attrs"
      :min="min"
      :max="max"
      :step="step"
      :size="resolvedSize"
      :disabled="disabled"
      :placeholder="placeholder"
      @change="emit('change', $event)"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    />
  </HbField>
</template>

<style lang="scss">
.hb-input-number {
  --hb-input-number-color-bg: var(--hb-el-bg, var(--el-bg-color-page));
  --hb-input-number-color-border: var(--hb-el-border2, var(--el-border-color));
  --hb-input-number-color-text: var(--hb-el-text, var(--el-text-color-primary));
  --hb-input-number-color-icon: var(--hb-el-disabled, var(--el-text-color-disabled));

  --el-input-bg-color: var(--hb-input-number-color-bg);
  --el-input-border-color: var(--hb-input-number-color-border);
  --el-input-hover-border-color: var(--hb-input-number-color-border);
  --el-input-focus-border-color: var(--hb-input-number-color-border);
  --el-input-text-color: var(--hb-input-number-color-text);
  --el-input-placeholder-color: var(--hb-el-disabled, var(--el-text-color-disabled));
  --el-disabled-bg-color: var(--hb-input-number-color-bg);
  --el-fill-color-blank: var(--hb-input-number-color-bg);
  --el-border-color: var(--hb-el-divider, var(--el-border-color-lighter));

  &:not(.hb-input-number--disabled):not(.hb-input-number--error) {
    &:hover {
      --hb-input-number-color-border: var(--hb-el-brand_hover, var(--el-color-primary));
    }
    &:focus-within {
      --hb-input-number-color-border: var(--hb-el-brand_press, var(--el-color-primary-dark-2));
      --hb-input-number-color-icon: var(--hb-el-brand_press, var(--el-color-primary-dark-2));
    }
  }

  &--error {
    --hb-input-number-color-border: var(--hb-el-danger, var(--el-color-danger));
  }

  &--disabled {
    --hb-input-number-color-bg: var(--hb-el-bg3, var(--el-fill-color));
    --hb-input-number-color-text: var(--hb-el-disabled, var(--el-text-color-disabled));
  }

  &__control {
    width: 100%;

    .el-input__wrapper {
      background: var(--hb-input-number-color-bg);
      box-shadow: 0 0 0 1px var(--hb-input-number-color-border) inset;
      border-radius: var(--hb-input-number-radius);
    }

    .el-input-number__decrease,
    .el-input-number__increase {
      color: var(--hb-input-number-color-icon);
      background: var(--hb-input-number-color-bg);
    }
  }
}
</style>
