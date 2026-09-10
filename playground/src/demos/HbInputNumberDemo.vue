<script setup lang="ts">
import { ref } from 'vue'
import { HbInputNumber } from '@hebang/components'

const live = ref(3)
</script>

<template>
  <div class="demo">
    <p class="muted">
      默认 32×120。聚焦描边与增减图标走 <code>--hb-el-brand_press</code>，占位
      <code>--hb-el-disabled</code>。
    </p>

    <h3>状态</h3>
    <div class="row">
      <HbInputNumber label="默认：" placeholder="请输入" />
      <HbInputNumber label="已填：" :model-value="12" />
      <HbInputNumber label="错误：" status="error" :model-value="12" hint="超出范围" />
      <HbInputNumber label="禁用：" disabled :model-value="12" />
    </div>

    <h3>实时</h3>
    <HbInputNumber v-model="live" label="数量：" :min="0" :max="99" hint="0–99" />
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
  gap: 20px 24px;
  align-items: start;
}
</style>
