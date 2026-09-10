<script setup lang="ts">
import { ref } from 'vue'
import { HbButton } from '@hebang/components'

const loading = ref(false)

function onLoadingClick(): void {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1200)
}
</script>

<template>
  <div class="demo">
    <h3>类型</h3>
    <div class="row">
      <HbButton type="primary">主要</HbButton>
      <HbButton type="success">成功</HbButton>
      <HbButton type="warning">警告</HbButton>
      <HbButton type="danger">危险</HbButton>
      <HbButton type="info">信息</HbButton>
      <HbButton>默认</HbButton>
    </div>
    <h3>类型 × 禁用</h3>
    <div class="row">
      <HbButton type="primary" disabled>主要</HbButton>
      <HbButton type="success" disabled>成功</HbButton>
      <HbButton type="warning" disabled>警告</HbButton>
      <HbButton type="danger" disabled>危险</HbButton>
      <HbButton type="info" disabled>信息</HbButton>
      <HbButton disabled>默认</HbButton>
    </div>
    <h3>尺寸</h3>
    <div class="row">
      <HbButton type="primary" size="small">small</HbButton>
      <HbButton type="primary">default</HbButton>
      <HbButton type="primary" size="large">large</HbButton>
    </div>
    <h3>状态</h3>
    <div class="row">
      <HbButton type="primary" :loading="loading" @click="onLoadingClick">加载</HbButton>
      <HbButton type="primary" disabled>禁用</HbButton>
    </div>
    <h3>通栏</h3>
    <HbButton type="primary" block>block 通栏按钮</HbButton>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  h3 {
    margin: 20px 0 10px;
    font-size: 13px;
    font-weight: 600;
    color: var(--hb-el-text);
  }
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.muted {
  margin: 0 0 8px;
  color: var(--hb-el-text3);
  line-height: 1.6;
}
</style>
