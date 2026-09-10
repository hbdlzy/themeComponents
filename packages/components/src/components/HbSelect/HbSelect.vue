<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ElOption, ElSelect } from 'element-plus'
import { componentSizes, radii } from '@hebang/tokens'
import type { HbInputSize, HbSelectProps } from '../../types'
import { toCssSize } from '../../utils'
import HbField from '../HbField/HbField.vue'

defineOptions({ name: 'HbSelect', inheritAttrs: false })

const props = withDefaults(defineProps<HbSelectProps>(), {
  label: '',
  labelAlign: 'left',
  required: false,
  placeholder: '请选择',
  hint: '',
  disabled: false,
  status: 'default',
  size: 'default',
  multiple: false,
  filterable: false,
  clearable: true,
  width: '240px',
  options: () => [],
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: HbSelectProps['modelValue']): void
  (e: 'change', value: HbSelectProps['modelValue']): void
  (e: 'visible-change', visible: boolean): void
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
    '--hb-select-height':
      size === 'small'
        ? componentSizes.heightSmall
        : size === 'large'
          ? componentSizes.heightLarge
          : componentSizes.heightBase,
    '--hb-select-radius': radii.base,
    '--hb-select-panel-max': '256px',
    '--hb-select-option-height': componentSizes.heightBase,
  }
  const width = toCssSize(props.width)
  if (width) style.width = width
  return style
})
</script>

<template>
  <HbField
    class="hb-select"
    :class="{
      'hb-select--error': isError,
      'hb-select--disabled': disabled,
      'hb-select--small': resolvedSize === 'small',
      'hb-select--large': resolvedSize === 'large',
    }"
    :style="rootStyle"
    :label="label"
    :label-align="labelAlign"
    :required="required"
    :hint="hint"
    :status="status"
    :disabled="disabled"
  >
    <ElSelect
      v-model="value"
      class="hb-select__control"
      v-bind="attrs"
      :size="resolvedSize"
      :disabled="disabled"
      :placeholder="placeholder"
      :multiple="multiple"
      :filterable="filterable"
      :clearable="clearable"
      @change="emit('change', $event)"
      @visible-change="emit('visible-change', $event)"
    >
      <slot>
        <ElOption
          v-for="item in options"
          :key="String(item.value)"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </slot>
    </ElSelect>
  </HbField>
</template>

<style lang="scss">
.hb-select {
  --hb-select-color-bg: var(--hb-el-bg, var(--el-bg-color-page));
  --hb-select-color-border: var(--hb-el-border2, var(--el-border-color));
  --hb-select-color-text: var(--hb-el-text, var(--el-text-color-primary));
  --hb-select-color-placeholder: var(--hb-el-disabled, var(--el-text-color-disabled));
  --hb-select-color-icon: var(--hb-el-disabled, var(--el-text-color-disabled));

  --el-border-color: var(--hb-select-color-border);
  --el-border-color-hover: var(--hb-select-color-border);
  --el-select-input-color: var(--hb-select-color-placeholder);
  --el-select-disabled-color: var(--hb-select-color-placeholder);
  --el-text-color-placeholder: var(--hb-select-color-placeholder);

  &:not(.hb-select--disabled):not(.hb-select--error) {
    &:hover {
      --hb-select-color-border: var(--hb-el-brand_hover, var(--el-color-primary));
    }
    &:focus-within {
      --hb-select-color-border: var(--hb-el-brand_press, var(--el-color-primary-dark-2));
      --hb-select-color-icon: var(--hb-el-brand, var(--el-color-primary));
    }
  }

  &--error {
    --hb-select-color-border: var(--hb-el-danger, var(--el-color-danger));
  }

  &--disabled {
    --hb-select-color-bg: var(--hb-el-bg3, var(--el-fill-color));
  }

  &__control {
    width: 100%;

    .el-select__wrapper {
      min-height: var(--hb-select-height);
      background-color: var(--hb-select-color-bg);
      box-shadow: 0 0 0 1px var(--hb-select-color-border) inset;
      border-radius: var(--hb-select-radius);
    }

    .el-select__caret {
      color: var(--hb-select-color-icon);
    }
  }
}

.el-select-dropdown {
  .el-select-dropdown__item {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: var(--hb-el-text, var(--el-text-color-primary));
  }

  .el-select-dropdown__item.is-hovering {
    background: var(--hb-el-bg3, var(--el-fill-color));
  }

  .el-select-dropdown__item.is-selected {
    color: var(--hb-el-brand, var(--el-color-primary));
    background: color-mix(in srgb, var(--hb-el-brand, var(--el-color-primary)) 8%, transparent);
    font-weight: 500;
  }
}
</style>
