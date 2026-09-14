<script setup lang="ts">
import { HbButton, HbNotification, hbNotify } from '@hebang/components'
</script>

<template>
  <div class="demo">
    <p class="muted">静态卡片宽 360px；浮层走 <code>hbNotify()</code>，5 秒关闭。</p>
    <div class="row">
      <HbNotification title="通知标题" message="这是一条通知内容，用于展示卡片形态。" />
      <HbNotification type="success" title="成功" message="规则已保存。" />
    </div>
    <div class="row">
      <HbButton type="primary" @click="hbNotify.success('保存成功', '规则已写入')">弹出通知</HbButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}
.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
}
</style>
