<script setup lang="ts">
import { ElTimeline, ElTimelineItem } from 'element-plus'
import type { HbTimelineProps, HbTimelineStatus } from '../../types'

defineOptions({ name: 'HbTimeline' })

withDefaults(defineProps<HbTimelineProps>(), {
  items: () => [],
})

function itemType(type: HbTimelineStatus | undefined): 'primary' | 'success' | 'warning' | 'danger' | undefined {
  if (!type || type === 'default') return undefined
  return type
}
</script>

<template>
  <ElTimeline class="hb-timeline">
    <ElTimelineItem
      v-for="(item, i) in items"
      :key="i"
      :timestamp="item.timestamp"
      :type="itemType(item.type)"
      placement="top"
    >
      <slot :name="String(i)" :item="item">{{ item.content }}</slot>
    </ElTimelineItem>
    <slot />
  </ElTimeline>
</template>

<style lang="scss">
.hb-timeline {
  --el-timeline-node-color: var(--hb-el-border2);
  color: var(--hb-el-text);

  .el-timeline-item__tail {
    border-left: 2px solid var(--hb-el-border2);
  }

  .el-timeline-item__node {
    background: var(--hb-el-border2);
    border-color: var(--hb-el-border2);
  }

  .el-timeline-item__node--primary {
    background: var(--hb-el-brand);
    border-color: var(--hb-el-brand);
  }

  .el-timeline-item__node--success {
    background: var(--hb-el-success);
    border-color: var(--hb-el-success);
  }

  .el-timeline-item__node--warning {
    background: var(--hb-el-warning);
    border-color: var(--hb-el-warning);
  }

  .el-timeline-item__node--danger {
    background: var(--hb-el-danger);
    border-color: var(--hb-el-danger);
  }

  .el-timeline-item__content {
    color: var(--hb-el-text);
    font-size: 14px;
  }

  .el-timeline-item__timestamp {
    color: var(--hb-el-text2);
    font-size: 12px;
  }
}
</style>
