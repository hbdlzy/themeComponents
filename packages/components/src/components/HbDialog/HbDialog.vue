<script setup lang="ts">
import { computed } from 'vue'
import { ElDialog, ElButton } from 'element-plus'
import type { HbDialogProps } from '../../types'

defineOptions({ name: 'HbDialog' })

const props = withDefaults(defineProps<HbDialogProps>(), {
  title: '',
  width: '520px',
  showFooter: true,
  confirmText: '确 定',
  cancelText: '取 消',
  confirmLoading: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

function onCancel() {
  emit('cancel')
  visible.value = false
}

function onConfirm() {
  emit('confirm')
}
</script>

<template>
  <ElDialog
    v-model="visible"
    class="hb-dialog"
    :title="title"
    :width="width"
    append-to-body
    destroy-on-close
  >
    <slot />
    <template v-if="showFooter" #footer>
      <slot name="footer">
        <ElButton @click="onCancel">{{ cancelText }}</ElButton>
        <ElButton type="primary" :loading="confirmLoading" @click="onConfirm">
          {{ confirmText }}
        </ElButton>
      </slot>
    </template>
  </ElDialog>
</template>

<style lang="scss">
.hb-dialog {
  // 统一弹窗圆角与标题字重，颜色走 --el-* 变量由 @hebang/theme 提供
  --el-dialog-border-radius: var(--el-border-radius-base);

  .el-dialog__title {
    font-weight: 600;
  }
}
</style>
