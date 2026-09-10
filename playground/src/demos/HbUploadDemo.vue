<script setup lang="ts">
import { HbUpload } from '@hebang/components'
</script>

<template>
  <div class="demo">
    <p class="muted">
      按钮 108×32；拖拽区 400×200。进度
      <code>--hb-el-bg4</code> / <code>--hb-el-brand</code>，失败
      <code>--hb-el-danger</code>。
    </p>

    <h3>按钮</h3>
    <HbUpload>
      <template #tip>支持任意文件，本地演示不实际上传</template>
    </HbUpload>

    <h3>拖拽</h3>
    <HbUpload mode="drag" />

    <h3>禁用</h3>
    <div class="row">
      <HbUpload disabled />
      <HbUpload mode="drag" disabled />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  h3 {
    margin: 24px 0 12px;
    font-size: 13px;
    font-weight: 600;
    color: var(--hb-el-text);
  }
}

.muted {
  margin: 0 0 8px;
  color: var(--hb-el-text3);
  line-height: 1.6;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: start;
}
</style>
