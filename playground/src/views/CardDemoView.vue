<script setup lang="ts">
import { computed } from 'vue'
import catalog from '../../../packages/components/catalog.json'
import HbCardDemo from '../demos/HbCardDemo.vue'

const summary = computed(
  () => catalog.components.find((item) => item.name === 'HbCard')?.summary ?? '',
)
</script>

<template>
  <main class="demo-page">
    <h1>卡片</h1>
    <p class="muted">{{ summary }}</p>
    <HbCardDemo />
  </main>
</template>

<style lang="scss" scoped>
.demo-page {
  max-width: 1180px;
  margin: 0 auto;
  padding: 24px 24px 64px;

  h1 {
    font-size: 24px;
    margin: 0 0 8px;
    color: var(--hb-el-text);
  }
}

.muted {
  color: var(--hb-el-text3);
  line-height: 1.6;
}
</style>
