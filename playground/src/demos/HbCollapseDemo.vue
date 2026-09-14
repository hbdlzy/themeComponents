<script setup lang="ts">
import { ref } from 'vue'
import { HbCollapse } from '@hebang/components'

const opened = ref(['a'])
const items = [
  { name: 'a', title: '基础信息' },
  { name: 'b', title: '高级配置' },
  { name: 'c', title: '禁用项', disabled: true },
]
</script>

<template>
  <div class="demo">
    <p class="muted">标题栏大/中/小 56 / 48 / 40。悬停浅品牌底。</p>
    <HbCollapse v-model="opened" :items="items" size="medium">
      <template #a>面板内容走次要文字。</template>
      <template #b>可嵌套列表或卡片。</template>
    </HbCollapse>
  </div>
</template>

<style lang="scss" scoped>
.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
}
</style>
