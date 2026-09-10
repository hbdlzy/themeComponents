<script setup lang="ts">
import { computed, ref } from 'vue'
import catalog from '../../../packages/components/catalog.json'
import { componentDemos } from '../demos/registry'

const tabs = computed(() =>
  catalog.components.map((item) => ({
    name: item.name,
    summary: item.summary,
    demo: componentDemos[item.name],
  })),
)

const active = ref(tabs.value[0]?.name ?? '')
</script>

<template>
  <main class="demo-page">
    <h1>组件 Demo</h1>
    <p class="muted">
      Tab 顺序来自 <code>packages/components/catalog.json</code>。新增组件：写 Demo 并在
      <code>playground/src/demos/registry.ts</code> 登记即可出现。
    </p>
    <el-tabs v-model="active" class="demo-tabs">
      <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.name" :name="tab.name">
        <p class="tab-summary">{{ tab.summary }}</p>
        <component :is="tab.demo" v-if="tab.demo" />
        <p v-else class="muted">暂无演示。新增 <code>playground/src/demos/{{ tab.name }}Demo.vue</code> 并登记到 registry。</p>
      </el-tab-pane>
    </el-tabs>
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

.tab-summary {
  margin: 0 0 16px;
  font-size: 13px;
  color: var(--hb-el-text2);
}

.demo-tabs {
  margin-top: 8px;

  :deep(.el-tabs__item) {
    color: var(--hb-el-text2);
  }

  :deep(.el-tabs__item.is-active) {
    color: var(--hb-el-brand);
  }

  :deep(.el-tabs__active-bar) {
    background: var(--hb-el-brand);
  }
}
</style>
