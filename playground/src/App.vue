<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import ThemeBar from './ThemeBar.vue'
import SideNav from './components/SideNav.vue'
import TokensPlayground from './views/TokensPlayground.vue'
import ButtonDemoView from './views/ButtonDemoView.vue'
import CardDemoView from './views/CardDemoView.vue'
import UsageView from './views/UsageView.vue'
import RuleAddView from './views/RuleAddView.vue'
import ComponentPage from './views/ComponentPage.vue'
import { resolveNavId, specialPageIds } from './nav'
import { useTheme } from './useTheme'

useTheme()

const STORAGE_KEY = 'hb-docs-route'

function readRoute(): string {
  const fromHash = resolveNavId(location.hash)
  if (location.hash.replace(/^#\/?/, '')) return fromHash
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) return resolveNavId(saved)
  } catch {
    /* private mode */
  }
  return 'button'
}

const route = ref(readRoute())
const sideOpen = ref(false)

const isSpecial = computed(() => specialPageIds.has(route.value))

function persist(id: string): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, id)
  } catch {
    /* private mode */
  }
}

function go(id: string): void {
  const next = resolveNavId(id)
  route.value = next
  persist(next)
  sideOpen.value = false
  if (location.hash.replace(/^#/, '') !== next) location.hash = next
}

function onHashChange(): void {
  const next = resolveNavId(location.hash)
  if (next !== route.value) {
    route.value = next
    persist(next)
  }
}

onMounted(() => {
  if (location.hash.replace(/^#/, '') !== route.value) location.hash = route.value
  window.addEventListener('hashchange', onHashChange)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', onHashChange)
})
</script>

<template>
  <div class="docs" :class="{ 'is-side-open': sideOpen }">
    <aside class="docs__side">
      <SideNav :active="route" @navigate="go" />
    </aside>
    <div class="docs__main">
      <header class="docs__bar">
        <button type="button" class="docs__menu" aria-label="菜单" @click="sideOpen = !sideOpen">
          菜单
        </button>
        <ThemeBar />
      </header>
      <div class="docs__body">
        <TokensPlayground v-if="route === 'tokens'" />
        <UsageView v-else-if="route === 'usage'" />
        <RuleAddView v-else-if="route === 'rule-add'" />
        <ButtonDemoView v-else-if="route === 'button'" />
        <CardDemoView v-else-if="route === 'card'" />
        <ComponentPage v-else-if="!isSpecial" :name="route" />
      </div>
    </div>
    <button
      v-if="sideOpen"
      type="button"
      class="docs__mask"
      aria-label="关闭菜单"
      @click="sideOpen = false"
    />
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
.docs {
  display: flex;
  min-height: 100vh;
  background: var(--hb-el-bg);
}

.docs__side {
  flex: none;
  width: 260px;
  border-right: 1px solid var(--hb-el-divider);
  background: var(--hb-el-bg);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: auto;
}

.docs__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.docs__bar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  min-height: 56px;
  padding: 8px 24px;
  border-bottom: 1px solid var(--hb-el-divider);
  background: var(--hb-el-bg);
}

.docs__menu {
  display: none;
  margin-right: auto;
  padding: 6px 12px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--hb-el-text);
  cursor: pointer;
  font-size: 14px;

  &:hover {
    color: var(--hb-el-brand);
  }
}

.docs__mask {
  display: none;
}

.docs__body {
  flex: 1;
  min-width: 0;
}

@media (max-width: 960px) {
  .docs__side {
    position: fixed;
    z-index: 40;
    left: 0;
    top: 0;
    transform: translateX(-100%);
    transition: transform 0.2s ease;
  }

  .docs.is-side-open .docs__side {
    transform: none;
  }

  .docs__menu,
  .docs.is-side-open .docs__mask {
    display: block;
  }

  .docs__mask {
    position: fixed;
    inset: 0;
    z-index: 30;
    border: 0;
    background: var(--hb-el-mask);
  }

  .docs__bar {
    justify-content: space-between;
  }
}
</style>
