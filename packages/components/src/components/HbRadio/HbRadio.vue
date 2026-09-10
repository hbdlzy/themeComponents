<script setup lang="ts">
import { ElRadio } from 'element-plus'
import type { HbRadioProps } from '../../types'

defineOptions({ name: 'HbRadio' })

withDefaults(defineProps<HbRadioProps>(), {
  disabled: false,
})
</script>

<template>
  <ElRadio class="hb-radio" :value="value" :disabled="disabled" :size="size">
    <slot />
  </ElRadio>
</template>

<style lang="scss">
.hb-radio.el-radio {
  --el-radio-input-border-color: var(--hb-el-disabled, var(--el-text-color-disabled));
  --el-radio-input-bg-color: var(--hb-el-bg, var(--el-bg-color-page));
  --el-color-primary: var(--hb-el-brand_press, var(--el-color-primary-dark-2));
  height: auto;
  margin-right: 16px;
  color: var(--hb-el-text, var(--el-text-color-primary));
  font-size: 14px;

  .el-radio__inner {
    width: 16px;
    height: 16px;
    background: var(--hb-el-bg, var(--el-bg-color-page));
    border-color: var(--hb-el-disabled, var(--el-text-color-disabled));
  }

  .el-radio__inner::after {
    width: 8px;
    height: 8px;
    background: var(--hb-el-white, var(--el-color-white));
  }

  .el-radio__label {
    padding-left: 8px;
    color: var(--hb-el-text, var(--el-text-color-primary));
    font-size: 14px;
  }

  &:hover:not(.is-disabled):not(.is-checked) .el-radio__inner {
    border-color: var(--hb-el-brand_hover, var(--el-color-primary));
  }

  &.is-checked .el-radio__inner {
    border-color: var(--hb-el-brand_press, var(--el-color-primary-dark-2));
    background: var(--hb-el-brand_press, var(--el-color-primary-dark-2));
  }

  &.is-disabled {
    .el-radio__label {
      color: var(--hb-el-disabled, var(--el-text-color-disabled));
    }

    .el-radio__inner {
      border-color: var(--hb-el-disabled, var(--el-text-color-disabled));
      background: var(--hb-el-bg, var(--el-bg-color-page));
    }

    &.is-checked .el-radio__inner {
      border-color: var(--hb-el-disabled, var(--el-text-color-disabled));
      background: var(--hb-el-disabled, var(--el-text-color-disabled));
    }
  }
}
</style>
