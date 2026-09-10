<script setup lang="ts">
import { ElCheckbox } from 'element-plus'
import type { HbCheckboxProps } from '../../types'

defineOptions({ name: 'HbCheckbox' })

withDefaults(defineProps<HbCheckboxProps>(), {
  disabled: false,
  indeterminate: false,
})
</script>

<template>
  <ElCheckbox
    class="hb-checkbox"
    :value="value"
    :disabled="disabled"
    :indeterminate="indeterminate"
    :size="size"
  >
    <slot />
  </ElCheckbox>
</template>

<style lang="scss">
.hb-checkbox.el-checkbox {
  --el-checkbox-input-border: 1px solid var(--hb-el-disabled, var(--el-text-color-disabled));
  --el-checkbox-bg-color: var(--hb-el-bg, var(--el-bg-color-page));
  --el-checkbox-checked-bg-color: var(--hb-el-brand_press, var(--el-color-primary-dark-2));
  --el-checkbox-checked-input-border-color: var(--hb-el-brand_press, var(--el-color-primary-dark-2));
  --el-checkbox-checked-icon-color: var(--hb-el-white, var(--el-color-white));
  height: auto;
  color: var(--hb-el-text, var(--el-text-color-primary));
  font-size: 14px;

  .el-checkbox__inner {
    width: 16px;
    height: 16px;
    background: var(--hb-el-bg, var(--el-bg-color-page));
  }

  .el-checkbox__label {
    padding-left: 8px;
    color: var(--hb-el-text, var(--el-text-color-primary));
    font-size: 14px;
  }

  &:hover:not(.is-disabled):not(.is-checked) .el-checkbox__inner {
    border-color: var(--hb-el-brand_hover, var(--el-color-primary));
  }

  &.is-disabled {
    .el-checkbox__label {
      color: var(--hb-el-disabled, var(--el-text-color-disabled));
    }

    .el-checkbox__inner {
      border-color: var(--hb-el-disabled, var(--el-text-color-disabled));
      background: var(--hb-el-bg, var(--el-bg-color-page));
    }

    &.is-checked .el-checkbox__inner {
      background: var(--hb-el-disabled, var(--el-text-color-disabled));
      border-color: var(--hb-el-disabled, var(--el-text-color-disabled));
    }
  }
}
</style>
