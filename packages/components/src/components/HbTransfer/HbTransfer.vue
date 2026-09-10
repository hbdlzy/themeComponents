<script setup lang="ts">
import { computed } from 'vue'
import { ElTransfer } from 'element-plus'
import type { HbTransferProps } from '../../types'

defineOptions({ name: 'HbTransfer' })

const props = withDefaults(defineProps<HbTransferProps>(), {
  modelValue: () => [],
  data: () => [],
  titles: () => ['源列表', '目标列表'],
  filterable: true,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Array<string | number>): void
  (e: 'change', value: Array<string | number>, direction: string, movedKeys: Array<string | number>): void
}>()

const value = computed({
  get: () => props.modelValue ?? [],
  set: (next) => emit('update:modelValue', next),
})
</script>

<template>
  <ElTransfer
    v-model="value"
    class="hb-transfer"
    :class="{ 'hb-transfer--disabled': disabled }"
    :data="data"
    :titles="titles"
    :filterable="filterable"
    :disabled="disabled"
    @change="(val, direction, moved) => emit('change', val, direction, moved)"
  />
</template>

<style lang="scss">
.hb-transfer.el-transfer {
  --el-transfer-border-color: var(--hb-el-border2, var(--el-border-color));
  --el-fill-color-light: var(--hb-el-bg, var(--el-bg-color-page));
  --el-fill-color-blank: var(--hb-el-bg, var(--el-bg-color-page));
  --el-text-color-primary: var(--hb-el-text, var(--el-text-color-primary));
  --el-text-color-regular: var(--hb-el-text, var(--el-text-color-primary));
  --el-text-color-secondary: var(--hb-el-disabled, var(--el-text-color-disabled));
  --el-color-primary: var(--hb-el-brand, var(--el-color-primary));
  --el-checkbox-checked-bg-color: var(--hb-el-brand, var(--el-color-primary));
  --el-border-color: var(--hb-el-border2, var(--el-border-color));
  --el-border-color-lighter: var(--hb-el-divider, var(--el-border-color-lighter));

  .el-transfer-panel {
    width: 240px;
    height: 320px;
    background: var(--hb-el-bg, var(--el-bg-color-page));
    border: 1px solid var(--hb-el-border2, var(--el-border-color));
  }

  .el-transfer-panel__header {
    background: var(--hb-el-bg, var(--el-bg-color-page));
    color: var(--hb-el-text, var(--el-text-color-primary));
    border-bottom: 1px solid var(--hb-el-divider, var(--el-border-color-lighter));
  }

  .el-transfer-panel__header .el-checkbox__label {
    color: var(--hb-el-text, var(--el-text-color-primary));
  }

  .el-transfer-panel__header .el-checkbox__label span {
    color: var(--hb-el-disabled, var(--el-text-color-disabled));
  }

  .el-transfer-panel__filter .el-input__wrapper {
    background: var(--hb-el-bg, var(--el-bg-color-page));
    box-shadow: 0 0 0 1px var(--hb-el-border2, var(--el-border-color)) inset;
  }

  .el-transfer-panel__filter:hover .el-input__wrapper {
    box-shadow: 0 0 0 1px var(--hb-el-brand_hover, var(--el-color-primary)) inset;
  }

  .el-transfer-panel__item:hover {
    background: var(--hb-el-brand_hover, var(--el-color-primary));
    color: var(--hb-el-white, var(--el-color-white));

    .el-checkbox__label {
      color: var(--hb-el-white, var(--el-color-white));
    }

    .el-checkbox__inner {
      border-color: var(--hb-el-white, var(--el-color-white));
    }
  }

  .el-transfer-panel__item.is-checked {
    background: var(--hb-el-brand_press, var(--el-color-primary-dark-2));
    color: var(--hb-el-white, var(--el-color-white));

    .el-checkbox__label {
      color: var(--hb-el-white, var(--el-color-white));
    }
  }

  .el-transfer-panel__item.is-disabled {
    background: var(--hb-el-bg3, var(--el-fill-color));
    color: var(--hb-el-disabled, var(--el-text-color-disabled));
  }

  .el-transfer__button {
    background: var(--hb-el-bg, var(--el-bg-color-page));
    border: 1px solid var(--hb-el-border2, var(--el-border-color));
    color: var(--hb-el-disabled, var(--el-text-color-disabled));
  }

  .el-transfer__button:hover:not(:disabled):not(.is-disabled) {
    border-color: var(--hb-el-brand_hover, var(--el-color-primary));
    color: var(--hb-el-disabled, var(--el-text-color-disabled));
    background: var(--hb-el-bg, var(--el-bg-color-page));
  }

  .el-transfer__button:not(.is-disabled):active {
    background: var(--hb-el-brand_press, var(--el-color-primary-dark-2));
    border-color: var(--hb-el-brand_press, var(--el-color-primary-dark-2));
    color: var(--hb-el-white, var(--el-color-white));
  }

  .el-transfer__button.is-disabled,
  .el-transfer__button:disabled {
    background: var(--hb-el-bg3, var(--el-fill-color));
    border-color: var(--hb-el-border2, var(--el-border-color));
    color: var(--hb-el-disabled, var(--el-text-color-disabled));
  }

  &--disabled {
    .el-transfer-panel__filter .el-input__wrapper {
      background: var(--hb-el-bg3, var(--el-fill-color));
    }

    .el-transfer-panel__item {
      color: var(--hb-el-disabled, var(--el-text-color-disabled));
      background: var(--hb-el-bg3, var(--el-fill-color));
    }

    .el-transfer__button {
      background: var(--hb-el-bg3, var(--el-fill-color));
      border-color: var(--hb-el-border2, var(--el-border-color));
      color: var(--hb-el-disabled, var(--el-text-color-disabled));
    }
  }
}
</style>
