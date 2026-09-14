<script setup lang="ts">
import { ref } from 'vue'
import { HbTabs } from '@hebang/components'

const active = ref('a')
const items = [
  { name: 'a', label: '基础' },
  { name: 'b', label: '高级' },
  { name: 'c', label: '禁用', disabled: true },
]
</script>

<template>
  <div class="demo">
    <p class="muted">选中品牌字 + 下划线；分割线 divider。</p>
    <HbTabs v-model="active" :items="items">
      <template #a>基础面板</template>
      <template #b>高级面板</template>
    </HbTabs>
  </div>
</template>

<style lang="scss" scoped>
.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
}
</style>
