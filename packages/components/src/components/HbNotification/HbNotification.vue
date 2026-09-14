<script setup lang="ts">
import type { HbNotificationProps } from '../../types'

defineOptions({ name: 'HbNotification' })

withDefaults(defineProps<HbNotificationProps>(), {
  title: '',
  message: '',
  type: 'info',
  closable: true,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <article class="hb-notification" :class="`hb-notification--${type}`">
    <header class="hb-notification__head">
      <b>{{ title }}</b>
      <button v-if="closable" type="button" class="hb-notification__close" @click="emit('close')">
        ×
      </button>
    </header>
    <p class="hb-notification__body">
      <slot>{{ message }}</slot>
    </p>
  </article>
</template>

<style lang="scss">
.hb-notification {
  box-sizing: border-box;
  width: 360px;
  min-height: 92px;
  padding: 16px;
  border: 1px solid var(--hb-el-border2);
  border-radius: 8px;
  background: var(--hb-el-bg);
  color: var(--hb-el-text2);

  &--info {
    border-color: var(--hb-el-brand);
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;
    color: var(--hb-el-text);
    font-size: 14px;
    font-weight: 500;
  }

  &__close {
    border: 0;
    background: none;
    color: var(--hb-el-text2);
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
  }

  &__body {
    margin: 0;
    font-size: 12px;
    line-height: 1.5;
  }
}

.hb-notification-toast.el-notification {
  background: var(--hb-el-bg);
  border: 1px solid var(--hb-el-border2);
  color: var(--hb-el-text2);

  .el-notification__title {
    color: var(--hb-el-text);
  }
}
</style>
