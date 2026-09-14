<script setup lang="ts">
import { ElProgress, ElSkeleton } from 'element-plus'
import type { HbLoadingProps } from '../../types'

defineOptions({ name: 'HbLoading' })

withDefaults(defineProps<HbLoadingProps>(), {
  mode: 'spinner',
  percentage: 40,
  text: '加载中',
  title: '',
})
</script>

<template>
  <div class="hb-loading" :class="`hb-loading--${mode}`">
    <div v-if="mode === 'spinner'" class="hb-loading__spin" />
    <ElProgress
      v-else-if="mode === 'circle'"
      type="circle"
      :percentage="percentage"
      :width="72"
      :stroke-width="4"
    />
    <ElProgress v-else-if="mode === 'progress'" :percentage="percentage" :stroke-width="4" />
    <ElSkeleton v-else animated :rows="3" />
    <div v-if="title" class="hb-loading__title">{{ title }}</div>
    <div v-if="text && mode !== 'skeleton'" class="hb-loading__text">{{ text }}</div>
  </div>
</template>

<style lang="scss">
.hb-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--hb-el-text2);

  &__spin {
    width: 32px;
    height: 32px;
    border: 3px solid var(--hb-el-border);
    border-top-color: var(--hb-el-brand);
    border-radius: 50%;
    animation: hb-spin 1s linear infinite;
  }

  &__title {
    color: var(--hb-el-text);
    font-size: 14px;
  }

  &__text {
    font-size: 12px;
  }

  .el-progress__text {
    color: var(--hb-el-text);
  }

  .el-progress-bar__outer {
    background: var(--hb-el-bg4);
  }

  .el-progress-bar__inner,
  .el-progress-circle__track {
    --el-color-primary: var(--hb-el-brand);
  }
}

@keyframes hb-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
