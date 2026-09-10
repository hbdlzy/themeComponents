<script setup lang="ts">
import { ref } from 'vue'
import { HbButton, HbDialog } from '@hebang/components'

const visible = ref(false)
const confirmLoading = ref(false)
const log = ref('')

function onConfirm(): void {
  confirmLoading.value = true
  setTimeout(() => {
    confirmLoading.value = false
    log.value = `提交成功 · ${new Date().toLocaleTimeString()}`
    visible.value = false
  }, 800)
}
</script>

<template>
  <div class="demo">
    <p class="muted">
      弹窗背景、描边、文字、主按钮均由 <code>--hb-el-*</code> 派生结果驱动。
    </p>
    <div class="row">
      <HbButton type="primary" @click="visible = true">打开 HbDialog</HbButton>
      <span v-if="log" class="muted">{{ log }}</span>
    </div>
    <HbDialog
      v-model="visible"
      title="OKLCH 规则派生"
      :confirm-loading="confirmLoading"
      @confirm="onConfirm"
    >
      <p>标题走 <code>--hb-el-text</code>，内容走 <code>--hb-el-text2</code>，主按钮走品牌色。</p>
    </HbDialog>
  </div>
</template>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
  line-height: 1.6;
}
</style>
