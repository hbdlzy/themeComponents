<script setup lang="ts">
import { ElBadge } from 'element-plus'
import type { HbBadgeProps } from '../../types'

defineOptions({ name: 'HbBadge' })

withDefaults(defineProps<HbBadgeProps>(), {
  max: 99,
  type: 'primary',
  hidden: false,
})
</script>

<template>
  <ElBadge
    class="hb-badge"
    :class="`hb-badge--${type}`"
    :value="value"
    :max="max"
    :hidden="hidden || value === 0"
    :is-dot="value == null || value === ''"
  >
    <slot />
  </ElBadge>
</template>

<style lang="scss">
.hb-badge {
  --el-badge-padding: 0 4px;
  --el-badge-size: 14px;
  --el-badge-font-size: 12px;
  --el-color-danger: var(--hb-el-danger);
  --el-color-primary: var(--hb-el-brand);
  --el-color-success: var(--hb-el-success);
  --el-color-warning: var(--hb-el-warning);

  .el-badge__content {
    color: var(--hb-el-white);
    font-weight: 500;
    border: 0;
    transform: translateY(-8px) translateX(8px);
  }

  &--primary .el-badge__content {
    background: var(--hb-el-brand);
  }

  &--success .el-badge__content {
    background: var(--hb-el-success);
  }

  &--warning .el-badge__content {
    background: var(--hb-el-warning);
  }

  &--danger .el-badge__content {
    background: var(--hb-el-danger);
  }

  .el-badge__content.is-dot {
    width: 10px;
    height: 10px;
  }
}
</style>
