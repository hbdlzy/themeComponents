<script setup lang="ts">
import { ElStep, ElSteps } from 'element-plus'
import type { HbStepsProps } from '../../types'

defineOptions({ name: 'HbSteps' })

withDefaults(defineProps<HbStepsProps>(), {
  active: 0,
  items: () => [],
  direction: 'horizontal',
})
</script>

<template>
  <ElSteps class="hb-steps" :active="active" :direction="direction" finish-status="success">
    <ElStep v-for="(item, i) in items" :key="i" :title="item.title" :description="item.description" />
  </ElSteps>
</template>

<style lang="scss">
.hb-steps {
  --el-color-primary: var(--hb-el-brand);
  --el-color-success: var(--hb-el-brand_hover);
  --el-text-color-primary: var(--hb-el-text);
  --el-text-color-regular: var(--hb-el-text2);
  --el-border-color: var(--hb-el-bg4);

  .el-step__title {
    font-size: 14px;
  }

  .el-step__title.is-success {
    color: var(--hb-el-brand_hover);
  }

  .el-step__description {
    font-size: 12px;
    color: var(--hb-el-text2);
  }
}
</style>
