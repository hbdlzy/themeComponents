<script setup lang="ts">
import { computed } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
import type { HbTableProps, HbTableSize } from '../../types'

defineOptions({ name: 'HbTable' })

const props = withDefaults(defineProps<HbTableProps>(), {
  data: () => [],
  columns: () => [],
  stripe: true,
  border: false,
  size: 'compact',
})

const rowHeight = computed(() => {
  const map: Record<HbTableSize, string> = { compact: '40px', loose: '56px' }
  return map[props.size]
})
</script>

<template>
  <ElTable
    class="hb-table"
    :class="`hb-table--${size}`"
    :style="{ '--hb-table-row-height': rowHeight }"
    :data="data"
    :stripe="stripe"
    :border="border"
  >
    <ElTableColumn
      v-for="col in columns"
      :key="col.prop"
      :prop="col.prop"
      :label="col.label"
      :width="col.width"
    />
    <slot />
  </ElTable>
</template>

<style lang="scss">
.hb-table {
  --el-table-header-bg-color: var(--hb-el-bg2);
  --el-table-header-text-color: var(--hb-el-text);
  --el-table-text-color: var(--hb-el-text);
  --el-table-row-hover-bg-color: var(--hb-el-bg3);
  --el-table-tr-bg-color: var(--hb-el-bg);
  --el-table-border-color: var(--hb-el-border);
  --el-fill-color-lighter: var(--hb-el-bg2);
  font-size: 14px;

  .el-table__header th.el-table__cell {
    font-weight: 400;
    height: var(--hb-table-row-height, 40px);
  }

  .el-table__body td.el-table__cell {
    height: var(--hb-table-row-height, 40px);
  }

  .el-table__empty-text {
    color: var(--hb-el-text3);
  }
}
</style>
