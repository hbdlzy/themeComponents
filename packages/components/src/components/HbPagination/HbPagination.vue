<script setup lang="ts">
import { ElPagination } from 'element-plus'
import { useControllable } from '../../utils'
import type { HbPaginationProps } from '../../types'

defineOptions({ name: 'HbPagination' })

const props = withDefaults(defineProps<HbPaginationProps>(), {
  currentPage: 1,
  pageSize: 10,
  total: 0,
  pageSizes: () => [10, 20, 50, 100],
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:currentPage', value: number): void
  (e: 'update:pageSize', value: number): void
}>()

const page = useControllable(
  () => props.currentPage ?? 1,
  (next) => emit('update:currentPage', next),
)
const size = useControllable(
  () => props.pageSize ?? 10,
  (next) => emit('update:pageSize', next),
)
</script>

<template>
  <ElPagination
    class="hb-pagination"
    v-model:current-page="page"
    v-model:page-size="size"
    :total="total"
    :page-sizes="pageSizes"
    :disabled="disabled"
    layout="total, sizes, prev, pager, next, jumper"
    background
  />
</template>

<style lang="scss">
.hb-pagination {
  --el-pagination-button-bg-color: var(--hb-el-bg);
  --el-pagination-button-color: var(--hb-el-text);
  --el-pagination-button-disabled-bg-color: var(--hb-el-bg3);
  --el-pagination-button-disabled-color: var(--hb-el-disabled);
  --el-pagination-hover-color: var(--hb-el-brand);
  --el-color-primary: var(--hb-el-brand);

  .el-pager li {
    border: 1px solid var(--hb-el-border2);
    background: var(--hb-el-bg);
    color: var(--hb-el-text);

    &:hover {
      border-color: var(--hb-el-brand_hover);
    }

    &.is-active {
      background: var(--hb-el-brand);
      border-color: var(--hb-el-brand);
      color: var(--hb-el-white);
    }

    &.is-disabled {
      background: var(--hb-el-bg3);
      color: var(--hb-el-disabled);
    }
  }

  .btn-prev,
  .btn-next {
    border: 1px solid var(--hb-el-border2);
    background: var(--hb-el-bg);
  }
}
</style>
