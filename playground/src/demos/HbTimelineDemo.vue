<script setup lang="ts">
import { HbTimeline } from '@hebang/components'

const items = [
  { timestamp: '09:12', content: '创建工单', type: 'primary' as const },
  { timestamp: '10:04', content: '审核通过', type: 'success' as const },
  { timestamp: '11:20', content: '告警升级', type: 'danger' as const },
  { timestamp: '12:00', content: '待处理', type: 'default' as const },
]
</script>

<template>
  <div class="demo">
    <p class="muted">轴线次要边框；节点按主题 / 成功 / 警告 / 失败上色。</p>
    <HbTimeline :items="items" />
  </div>
</template>

<style lang="scss" scoped>
.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
}
</style>
