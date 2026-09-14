<script setup lang="ts">
import { ElTabPane, ElTabs } from 'element-plus'
import { useControllable } from '../../utils'
import type { HbTabsProps } from '../../types'

defineOptions({ name: 'HbTabs' })

const props = withDefaults(defineProps<HbTabsProps>(), {
  modelValue: '',
  items: () => [],
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const active = useControllable(
  () => props.modelValue ?? '',
  (next) => emit('update:modelValue', next),
)
</script>

<template>
  <ElTabs class="hb-tabs" v-model="active">
    <ElTabPane
      v-for="item in items"
      :key="item.name"
      :name="item.name"
      :label="item.label"
      :disabled="item.disabled"
    >
      <slot :name="item.name" />
    </ElTabPane>
    <slot />
  </ElTabs>
</template>

<style lang="scss">
.hb-tabs {
  --el-color-primary: var(--hb-el-brand);
  --el-text-color-primary: var(--hb-el-text);
  --el-disabled-text-color: var(--hb-el-disabled);
  --el-border-color-light: var(--hb-el-divider);

  .el-tabs__item {
    color: var(--hb-el-text);
    font-size: 14px;

    &:hover {
      color: var(--hb-el-brand_hover);
    }

    &.is-active {
      color: var(--hb-el-brand);
    }

    &.is-disabled {
      color: var(--hb-el-disabled);
    }
  }

  .el-tabs__active-bar {
    background: var(--hb-el-brand);
  }

  .el-tabs__nav-wrap::after {
    background: var(--hb-el-divider);
  }
}
</style>
