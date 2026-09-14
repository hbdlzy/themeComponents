<script setup lang="ts">
import { HbTree } from '@hebang/components'

const data = [
  {
    label: '组织',
    children: [
      { label: '研发部' },
      { label: '运维部', children: [{ label: '机房 A' }, { label: '机房 B', disabled: true }] },
    ],
  },
]
</script>

<template>
  <div class="demo">
    <p class="muted">悬停浅品牌底；选中品牌字。</p>
    <HbTree :data="data" />
  </div>
</template>

<style lang="scss" scoped>
.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
}
</style>
