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
  --el-checkbox-input-border: 1px solid var(--hb-el-border2, var(--el-border-color));
  --el-checkbox-bg-color: var(--hb-el-bg, var(--el-bg-color-page));
  --el-checkbox-checked-bg-color: var(--hb-el-brand, var(--el-color-primary));
  --el-checkbox-checked-input-border-color: var(--hb-el-brand, var(--el-color-primary));
  --el-checkbox-checked-icon-color: var(--hb-el-white, var(--el-color-white));
  height: auto;
  color: var(--hb-el-text, var(--el-text-color-primary));
  font-size: 14px;

  .el-checkbox__inner {
    width: 16px;
    height: 16px;
  }

  .el-checkbox__label {
    padding-left: 8px;
    color: var(--hb-el-text, var(--el-text-color-primary));
    font-size: 14px;
  }

  &.is-disabled {
    .el-checkbox__label {
      color: var(--hb-el-disabled, var(--el-text-color-disabled));
    }
  }
}
</style>
