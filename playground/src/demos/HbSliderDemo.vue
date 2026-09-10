<script setup lang="ts">
import { ref } from 'vue'
import { HbSlider } from '@hebang/components'

const live = ref(36)
const range = ref<[number, number]>([20, 70])
</script>

<template>
  <div class="demo">
    <p class="muted">
      轨道未激活 <code>--hb-el-bg4</code>，已激活 <code>--hb-el-brand</code>，聚焦
      <code>--hb-el-brand_press</code>；手柄 16px，悬停 20px。
    </p>

    <h3>默认</h3>
    <HbSlider v-model="live" />

    <h3>刻度</h3>
    <HbSlider :model-value="50" :step="25" show-stops />

    <h3>区间</h3>
    <HbSlider v-model="range" range />

    <h3>禁用</h3>
    <HbSlider :model-value="40" disabled />
  </div>
</template>

<style lang="scss" scoped>
.demo {
  max-width: 480px;

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
</style>
