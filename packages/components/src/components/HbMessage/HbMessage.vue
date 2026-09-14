<script setup lang="ts">
import { ElAlert } from 'element-plus'
import type { HbMessageProps } from '../../types'

defineOptions({ name: 'HbMessage' })

withDefaults(defineProps<HbMessageProps>(), {
  type: 'success',
  title: '',
  closable: true,
  description: '',
})
</script>

<template>
  <ElAlert
    class="hb-message-alert"
    :class="`hb-message-alert--${type}`"
    :title="title"
    :type="type === 'error' ? 'error' : type"
    :closable="closable"
    :description="description"
    show-icon
  >
    <slot />
  </ElAlert>
</template>

<style lang="scss">
.hb-message-alert {
  --el-alert-title-font-size: 14px;
  border: 1px solid transparent;
  color: var(--hb-el-text);

  &--success {
    --el-alert-bg-color: var(--hb-el-success_light);
    --el-color-success: var(--hb-el-success);
    border-color: var(--hb-el-success);
  }

  &--warning {
    --el-alert-bg-color: var(--hb-el-warning_light);
    --el-color-warning: var(--hb-el-warning);
    border-color: var(--hb-el-warning);
  }

  &--error {
    --el-alert-bg-color: var(--hb-el-danger_light);
    --el-color-error: var(--hb-el-danger);
    border-color: var(--hb-el-danger);
  }

  &--info {
    --el-alert-bg-color: var(--hb-el-brand_light);
    --el-color-info: var(--hb-el-brand);
    border-color: var(--hb-el-brand);
  }

  .el-alert__description {
    color: var(--hb-el-text2);
  }

  .el-alert__close-btn {
    color: var(--hb-el-text2);
  }
}

.hb-message.el-message {
  background: var(--hb-el-bg);
  border: 1px solid var(--hb-el-border);
  box-shadow: none;

  .el-message__content {
    color: var(--hb-el-text);
  }
}

.hb-message.el-message--success .el-message__icon {
  color: var(--hb-el-success);
}

.hb-message.el-message--warning .el-message__icon {
  color: var(--hb-el-warning);
}

.hb-message.el-message--error .el-message__icon {
  color: var(--hb-el-danger);
}

.hb-message.el-message--info .el-message__icon {
  color: var(--hb-el-brand);
}
</style>
