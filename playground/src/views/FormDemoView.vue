<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import catalog from '../../../packages/components/catalog.json'
import { componentDemos, formDemoNames } from '../demos/registry'

const FORM_TAB_KEY = 'hb-form-demo-tab'
const formNameSet = new Set<string>(formDemoNames)

const tabs = computed(() =>
  catalog.components
    .filter((item) => formNameSet.has(item.name))
    .map((item) => ({
      name: item.name,
      summary: item.summary,
      demo: componentDemos[item.name],
    })),
)

function readStoredTab(): string {
  const names = tabs.value.map((tab) => tab.name)
  try {
    const saved = sessionStorage.getItem(FORM_TAB_KEY)
    if (saved && names.includes(saved)) return saved
  } catch {
    /* private mode / blocked storage */
  }
  return names[0] ?? ''
}

const active = ref(readStoredTab())

watch(active, (name) => {
  if (!name) return
  try {
    sessionStorage.setItem(FORM_TAB_KEY, name)
  } catch {
    /* private mode / blocked storage */
  }
})
</script>

<template>
  <main class="demo-page">
    <h1>表单</h1>
    <p class="muted">输入类组件合集。Tab 顺序来自 catalog；当前选中写入 sessionStorage（键 <code>hb-form-demo-tab</code>）。</p>
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
