<script setup lang="ts">
import { computed } from 'vue'
import catalog from '../../../packages/components/catalog.json'
import { componentDemos, extraDemoNames } from '../demos/registry'

/** 按钮矩阵贴在页顶，和 HbButton 的状态展示放一起 */
const pinFirst = ['HbButton', 'HbThemeButton']
const extraNameSet = new Set<string>(extraDemoNames)

const sections = computed(() => {
  const items = catalog.components
    .filter((item) => !extraNameSet.has(item.name))
    .map((item) => ({
      name: item.name,
      demo: componentDemos[item.name],
    }))
  const pinned = pinFirst
    .map((name) => items.find((item) => item.name === name))
    .filter((item): item is (typeof items)[number] => Boolean(item))
  const rest = items.filter((item) => !pinFirst.includes(item.name))
  return [...pinned, ...rest]
})
</script>

<template>
  <main class="demo-page">
    <h1>组件 Demo</h1>
    <section v-for="item in sections" :key="item.name" :id="item.name" class="demo-block">
      <h2>{{ item.name }}</h2>
      <component :is="item.demo" v-if="item.demo" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.demo-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 24px 64px;

  h1 {
    font-size: 24px;
    margin: 0 0 8px;
    color: var(--hb-el-text);
  }
}

.demo-block {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--hb-el-divider);

  h2 {
    margin: 0 0 16px;
    font-size: 18px;
    color: var(--hb-el-text);
  }

  :deep(.demo > .muted),
  :deep(.card-demo > .muted),
  :deep(.card-demo h2) {
    display: none;
  }
}
</style>
