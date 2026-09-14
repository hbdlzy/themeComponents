<script setup lang="ts">
import { ref } from 'vue'
import { HbMenu } from '@hebang/components'

const side = ref('1-1')
const top = ref('home')
const items = [
  {
    index: '1',
    label: '规则管理',
    children: [
      { index: '1-1', label: '规则列表' },
      { index: '1-2', label: '新建规则' },
    ],
  },
  { index: '2', label: '组件库' },
]
const topItems = [
  { index: 'home', label: '首页' },
  { index: 'rule', label: '规则' },
  { index: 'demo', label: '组件' },
]
</script>

<template>
  <div class="demo">
    <p class="muted">顶部导航高 72px；左侧导航宽 216px。二级选中浅底品牌字。</p>
    <h3>顶部</h3>
    <HbMenu v-model="top" mode="horizontal" :items="topItems" />
    <h3>侧栏</h3>
    <HbMenu v-model="side" mode="vertical" :items="items" />
  </div>
</template>

<style lang="scss" scoped>
.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
}
h3 {
  margin: 16px 0 8px;
  font-size: 13px;
}
</style>
