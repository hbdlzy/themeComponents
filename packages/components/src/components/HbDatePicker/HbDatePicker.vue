<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ElDatePicker, ElTimePicker } from 'element-plus'
import { componentSizes, radii } from '@hebang/tokens'
import type { HbDatePickerProps, HbInputSize } from '../../types'
import { toCssSize, useControllable } from '../../utils'
import HbField from '../HbField/HbField.vue'

defineOptions({ name: 'HbDatePicker', inheritAttrs: false })

const props = withDefaults(defineProps<HbDatePickerProps>(), {
  label: '',
  labelAlign: 'left',
  required: false,
  hint: '',
  disabled: false,
  status: 'default',
  type: 'date',
  placeholder: '选择日期',
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期',
  size: 'default',
  clearable: true,
  width: '240px',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: HbDatePickerProps['modelValue']): void
  (e: 'change', value: HbDatePickerProps['modelValue']): void
}>()

const attrs = useAttrs()
const isError = computed(() => props.status === 'error')
const isTime = computed(() => props.type === 'time')
const pickerType = computed(() => (props.type === 'time' ? undefined : props.type))
const resolvedSize = computed<HbInputSize>(() => {
  const size = props.size
  return size === 'small' || size === 'large' ? size : 'default'
})

const value = useControllable(
  () => props.modelValue,
  (next) => emit('update:modelValue', next),
)

const rootStyle = computed(() => {
  const size = resolvedSize.value
  const style: Record<string, string> = {
    '--hb-date-height':
      size === 'small'
        ? componentSizes.heightSmall
        : size === 'large'
          ? componentSizes.heightLarge
          : componentSizes.heightBase,
    '--hb-date-radius': radii.base,
  }
  const width = toCssSize(props.width)
  if (width) style.width = width
  return style
})
</script>

<template>
  <HbField
    class="hb-date-picker"
    :class="{
      'hb-date-picker--error': isError,
      'hb-date-picker--disabled': disabled,
    }"
    :style="rootStyle"
    :label="label"
    :label-align="labelAlign"
    :required="required"
    :hint="hint"
    :status="status"
    :disabled="disabled"
  >
    <ElTimePicker
      v-if="isTime"
      v-model="value"
      class="hb-date-picker__control"
      v-bind="attrs"
      popper-class="hb-date-picker-popper"
      :size="resolvedSize"
      :disabled="disabled"
      :clearable="clearable"
      :placeholder="placeholder || '选择时间'"
      @change="emit('change', $event)"
    />
    <ElDatePicker
      v-else
      v-model="value"
      class="hb-date-picker__control"
      v-bind="attrs"
      popper-class="hb-date-picker-popper"
      :type="pickerType"
      :size="resolvedSize"
      :disabled="disabled"
      :clearable="clearable"
      :placeholder="placeholder"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      @change="emit('change', $event)"
    />
  </HbField>
</template>

<style lang="scss">
.hb-date-picker {
  --hb-date-color-bg: var(--hb-el-bg, var(--el-bg-color-page));
  --hb-date-color-border: var(--hb-el-border2, var(--el-border-color));

  --el-input-bg-color: var(--hb-date-color-bg);
  --el-input-border-color: var(--hb-date-color-border);
  --el-input-hover-border-color: var(--hb-date-color-border);
  --el-input-focus-border-color: var(--hb-date-color-border);
  --el-input-text-color: var(--hb-el-text, var(--el-text-color-primary));
  --el-input-placeholder-color: var(--hb-el-disabled, var(--el-text-color-disabled));
  --el-disabled-bg-color: var(--hb-date-color-bg);
  --el-input-icon-color: var(--hb-el-disabled, var(--el-text-color-disabled));

  &:not(.hb-date-picker--disabled):not(.hb-date-picker--error) {
    &:hover {
      --hb-date-color-border: var(--hb-el-brand_hover, var(--el-color-primary));
    }
    &:focus-within {
      --hb-date-color-border: var(--hb-el-brand_press, var(--el-color-primary-dark-2));
    }
  }

  &--error {
    --hb-date-color-border: var(--hb-el-danger, var(--el-color-danger));
  }

  &--disabled {
    --hb-date-color-bg: var(--hb-el-bg3, var(--el-fill-color));
  }

  &__control {
    width: 100%;

    .el-input__wrapper {
      background: var(--hb-date-color-bg);
      box-shadow: 0 0 0 1px var(--hb-date-color-border) inset;
      border-radius: var(--hb-date-radius);
    }
  }
}

.hb-date-picker-popper {
  --el-datepicker-inrange-bg-color: var(--hb-el-brand_hover, var(--el-color-primary-light-3));
  --el-datepicker-inrange-hover-bg-color: var(--hb-el-brand_hover, var(--el-color-primary-light-3));
  --el-datepicker-active-color: var(--hb-el-white, var(--el-color-white));
  --el-datepicker-hover-text-color: var(--hb-el-text, var(--el-text-color-primary));
  --el-text-color-regular: var(--hb-el-text, var(--el-text-color-primary));
  --el-text-color-placeholder: var(--hb-el-disabled, var(--el-text-color-disabled));
  --el-border-color-lighter: var(--hb-el-divider, var(--el-border-color-lighter));
  --el-datepicker-off-text-color: var(--hb-el-disabled, var(--el-text-color-disabled));
  --el-datepicker-header-text-color: var(--hb-el-text, var(--el-text-color-primary));
  --el-color-primary: var(--hb-el-brand_press, var(--el-color-primary-dark-2));

  .el-picker-panel {
    background: var(--hb-el-bg, var(--el-bg-color-page));
    color: var(--hb-el-text, var(--el-text-color-primary));
    border-color: var(--hb-el-border2, var(--el-border-color));
  }

  .el-date-table td {
    width: 32px;
    height: 32px;
    padding: 0;
  }

  .el-date-table td.available:hover .el-date-table-cell {
    box-shadow: 0 0 0 1px var(--hb-el-brand_hover, var(--el-color-primary)) inset;
    color: var(--hb-el-text, var(--el-text-color-primary));
  }

  .el-date-table td.current:not(.disabled) .el-date-table-cell__text,
  .el-date-table td.selected .el-date-table-cell__text {
    background: var(--hb-el-brand_press, var(--el-color-primary-dark-2));
    color: var(--hb-el-white, var(--el-color-white));
  }

  .el-picker-panel__icon-btn {
    color: var(--hb-el-disabled, var(--el-text-color-disabled));
  }

  .el-picker-panel__icon-btn:hover {
    color: var(--hb-el-brand_hover, var(--el-color-primary));
  }

  .el-picker-panel__link-btn {
    color: var(--hb-el-brand, var(--el-color-primary));
  }
}
</style>
