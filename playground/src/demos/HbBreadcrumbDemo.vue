<script setup lang="ts">
import { HbBreadcrumb } from '@hebang/components'

const items = [
  { label: '首页' },
  { label: '规则引擎' },
  { label: '新建规则' },
]
</script>

<template>
  <div class="demo">
    <p class="muted">分隔符 &gt;，末项次要文字。</p>
    <HbBreadcrumb :items="items" />
  </div>
</template>

<style lang="scss" scoped>
.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
}
</style>
