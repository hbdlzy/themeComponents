<script setup lang="ts">
import { computed } from 'vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'
import { useControllable } from '../../utils'
import type { HbCollapseProps, HbCollapseSize } from '../../types'

defineOptions({ name: 'HbCollapse' })

const props = withDefaults(defineProps<HbCollapseProps>(), {
  modelValue: () => [],
  items: () => [],
  accordion: false,
  size: 'medium',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()

const opened = useControllable(
  () => props.modelValue ?? [],
  (next) => emit('update:modelValue', next),
)

const headerHeight = computed(() => {
  const map: Record<HbCollapseSize, string> = { large: '56px', medium: '48px', small: '40px' }
  return map[props.size]
})
</script>

<template>
  <ElCollapse
    class="hb-collapse"
    :class="`hb-collapse--${size}`"
    :style="{ '--hb-collapse-header-height': headerHeight }"
    v-model="opened"
    :accordion="accordion"
  >
    <ElCollapseItem
      v-for="item in items"
      :key="item.name"
      :name="item.name"
      :title="item.title"
      :disabled="item.disabled"
    >
      <slot :name="item.name" />
    </ElCollapseItem>
    <slot />
  </ElCollapse>
</template>

<style lang="scss">
.hb-collapse {
  --el-collapse-header-bg-color: var(--hb-el-bg2);
  --el-collapse-header-text-color: var(--hb-el-text);
  --el-collapse-content-bg-color: var(--hb-el-bg);
  --el-collapse-content-text-color: var(--hb-el-text2);
  --el-collapse-border-color: var(--hb-el-divider);
  border: 1px solid var(--hb-el-divider);
  border-radius: 0;

  .el-collapse-item__header {
    height: var(--hb-collapse-header-height, 48px);
    line-height: var(--hb-collapse-header-height, 48px);
    font-size: 14px;
    font-weight: 400;
    background: var(--hb-el-bg2);

    &:hover:not(.is-disabled) {
      background: var(--hb-el-brand_light);
    }

    &.is-disabled {
      color: var(--hb-el-disabled);
    }
  }

  .el-collapse-item__content {
    padding: 12px 20px;
    color: var(--hb-el-text2);
    background: var(--hb-el-bg);
  }

  .el-collapse-item__arrow {
    color: var(--hb-el-text);
  }
}
</style>
