<script setup lang="ts">
import { HbLoading } from '@hebang/components'
</script>

<template>
  <div class="demo">
    <p class="muted">spinner / 环形 / 进度条 / 骨架屏。</p>
    <div class="row">
      <HbLoading mode="spinner" text="加载中" />
      <HbLoading mode="circle" :percentage="64" text="64%" />
      <div class="bar">
        <HbLoading mode="progress" :percentage="40" text="上传中" />
      </div>
      <div class="skel">
        <HbLoading mode="skeleton" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  align-items: center;
}
.bar {
  width: 240px;
}
.skel {
  width: 220px;
}
.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
}
</style>
