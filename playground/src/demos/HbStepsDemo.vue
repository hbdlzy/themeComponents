<script setup lang="ts">
import { HbSteps } from '@hebang/components'

const items = [
  { title: '填写信息', description: '基础资料' },
  { title: '配置规则', description: '条件与动作' },
  { title: '完成', description: '提交审核' },
]
</script>

<template>
  <div class="demo">
    <p class="muted">当前品牌色，未完成四级背景。</p>
    <HbSteps :active="1" :items="items" />
  </div>
</template>

<style lang="scss" scoped>
.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
}
</style>
