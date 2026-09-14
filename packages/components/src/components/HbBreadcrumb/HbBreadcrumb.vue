<script setup lang="ts">
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import type { HbBreadcrumbProps } from '../../types'

defineOptions({ name: 'HbBreadcrumb' })

withDefaults(defineProps<HbBreadcrumbProps>(), {
  items: () => [],
})
</script>

<template>
  <ElBreadcrumb class="hb-breadcrumb" separator=">">
    <ElBreadcrumbItem v-for="(item, i) in items" :key="i">
      <span :class="{ 'is-last': i === items.length - 1 }">{{ item.label }}</span>
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>

<style lang="scss">
.hb-breadcrumb {
  --el-text-color-regular: var(--hb-el-text);
  --el-text-color-placeholder: var(--hb-el-text2);
  font-size: 14px;
  line-height: 32px;

  .el-breadcrumb__separator {
    color: var(--hb-el-border2);
    margin: 0 8px;
  }

  .is-last {
    color: var(--hb-el-text2);
  }
}
</style>
