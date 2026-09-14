<script setup lang="ts">
import { HbButton, HbEmpty } from '@hebang/components'
import type { HbEmptyKind } from '@hebang/components'

const kinds: HbEmptyKind[] = [
  'data',
  'content',
  'message',
  'address',
  'search',
  'record',
  'favorite',
  'auth',
  'network',
  'building',
]
</script>

<template>
  <div class="demo">
    <p class="muted">Word 缺省图 10 种：无数据 / 内容 / 消息 / 地址 / 搜索 / 记录 / 收藏 / 认证 / 网络 / 建设中。</p>
    <div class="grid">
      <HbEmpty v-for="kind in kinds" :key="kind" :kind="kind">
        <HbButton v-if="kind === 'network'" size="small">重新加载</HbButton>
      </HbEmpty>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 8px;
}
.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
}
</style>
