<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import ThemeBar from './ThemeBar.vue'
import ComponentsDemo from './views/ComponentsDemo.vue'
import TokensPlayground from './views/TokensPlayground.vue'
import ButtonDemoView from './views/ButtonDemoView.vue'
import { useTheme } from './useTheme'

useTheme()

type Page = 'demo' | 'tokens' | 'button'

function readPage(): Page {
  const hash = location.hash.replace(/^#\/?/, '')
  if (hash === 'tokens' || hash === 'theme-rules') return 'tokens'
  if (hash === 'button' || hash === 'button-demo') return 'button'
  return 'demo'
}

const page = ref<Page>(readPage())

function go(next: Page): void {
  page.value = next
  location.hash = next === 'button' ? 'button-demo' : next
}

function onHashChange(): void {
  page.value = readPage()
}

onMounted(() => {
  if (!location.hash) location.hash = 'demo'
  window.addEventListener('hashchange', onHashChange)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', onHashChange)
})
</script>

<template>
  <div class="shell">
    <header class="shell__bar">
      <nav class="shell__nav">
        <button type="button" :class="{ 'is-active': page === 'demo' }" @click="go('demo')">
          组件 Demo
        </button>
        <button type="button" :class="{ 'is-active': page === 'tokens' }" @click="go('tokens')">
          规则引擎
        </button>
        <button type="button" :class="{ 'is-active': page === 'button' }" @click="go('button')">
          按钮组件
        </button>
      </nav>
      <ThemeBar />
    </header>
    <ComponentsDemo v-if="page === 'demo'" />
    <TokensPlayground v-else-if="page === 'tokens'" />
    <ButtonDemoView v-else />
  </div>
</template>

<style>
body {
  margin: 0;
  background: var(--hb-el-bg);
  color: var(--hb-el-text2);
}
</style>

<style lang="scss" scoped>
.shell__bar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 24px;
  border-bottom: 1px solid var(--hb-el-border);
  background: var(--hb-el-bg);
}

.shell__nav {
  display: flex;
  gap: 4px;

  button {
    padding: 6px 12px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: var(--hb-el-text2);
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background: var(--hb-el-bg3);
    }

    &.is-active {
      color: var(--hb-el-brand);
      background: color-mix(in srgb, var(--hb-el-brand) 10%, transparent);
      font-weight: 600;
    }
  }
}
</style>
