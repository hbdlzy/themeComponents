<script setup lang="ts">
import { HbTable } from '@hebang/components'

const columns = [
  { prop: 'name', label: '名称' },
  { prop: 'status', label: '状态', width: 120 },
  { prop: 'time', label: '更新时间', width: 180 },
]
const data = [
  { name: '规则 A', status: '启用', time: '2026-05-24 12:23:12' },
  { name: '规则 B', status: '停用', time: '2026-05-24 12:23:12' },
  { name: '规则 C', status: '-', time: '2026-06-01 08:00:00' },
]
</script>

<template>
  <div class="demo">
    <p class="muted">紧凑 40px / 宽松 56px。表头二级底，斑马二级底，悬停三级底。</p>
    <HbTable :columns="columns" :data="data" size="compact" stripe />
  </div>
</template>

<style lang="scss" scoped>
.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
}
</style>
