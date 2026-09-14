<script setup lang="ts">
import { ElTag } from 'element-plus'
import type { HbTagProps } from '../../types'

defineOptions({ name: 'HbTag' })

withDefaults(defineProps<HbTagProps>(), {
  variant: 'outlined',
  status: 'neutral',
  closable: false,
})

const emit = defineEmits<{
  (e: 'close', event: MouseEvent): void
}>()
</script>

<template>
  <ElTag
    class="hb-tag"
    :class="[`hb-tag--${variant}`, `hb-tag--${status}`]"
    effect="plain"
    :closable="closable"
    disable-transitions
    @close="emit('close', $event)"
  >
    <slot />
  </ElTag>
</template>

<style lang="scss">
.hb-tag {
  --el-tag-border-radius: 4px;
  --el-tag-font-size: 12px;
  height: 24px;
  line-height: 22px;
  padding: 0 8px;
  border-width: 1px;
  border-style: solid;

  &--outlined {
    background: transparent;

    &.hb-tag--neutral {
      color: var(--hb-el-text3);
      border-color: var(--hb-el-text3);
    }

    &.hb-tag--success {
      color: var(--hb-el-success);
      border-color: var(--hb-el-success);
    }

    &.hb-tag--warning {
      color: var(--hb-el-warning);
      border-color: var(--hb-el-warning);
    }

    &.hb-tag--danger {
      color: var(--hb-el-danger);
      border-color: var(--hb-el-danger);
    }

    &.hb-tag--info {
      color: var(--hb-el-brand);
      border-color: var(--hb-el-brand);
    }
  }

  &--light {
    border-color: transparent;

    &.hb-tag--neutral {
      color: var(--hb-el-text3);
      background: var(--hb-el-bg3);
    }

    &.hb-tag--success {
      color: var(--hb-el-success);
      background: var(--hb-el-success_light);
    }

    &.hb-tag--warning {
      color: var(--hb-el-warning);
      background: var(--hb-el-warning_light);
    }

    &.hb-tag--danger {
      color: var(--hb-el-danger);
      background: var(--hb-el-danger_light);
    }

    &.hb-tag--info {
      color: var(--hb-el-brand);
      background: var(--hb-el-brand_light);
    }
  }

  &--solid {
    border-color: transparent;
    color: var(--hb-el-white);

    &.hb-tag--neutral {
      background: var(--hb-el-text3);
    }

    &.hb-tag--success {
      background: var(--hb-el-success);
    }

    &.hb-tag--warning {
      background: var(--hb-el-warning);
    }

    &.hb-tag--danger {
      background: var(--hb-el-danger);
    }

    &.hb-tag--info {
      background: var(--hb-el-brand);
    }
  }

  .el-tag__close {
    color: inherit;
  }
}
</style>
