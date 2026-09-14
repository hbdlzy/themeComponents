<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { HbMenu } from '@hebang/components'
import catalog from '../../../packages/components/catalog.json'
import { componentDemos, extraDemoGroups } from '../demos/registry'

const STORAGE_KEY = 'hb-extra-demo'

const topItems = extraDemoGroups.map((group) => ({
  index: group.index,
  label: group.label,
}))

const allItems = extraDemoGroups.flatMap((group) =>
  group.items.map((item) => ({ ...item, group: group.index })),
)

function groupOf(name: string): string {
  return allItems.find((item) => item.name === name)?.group ?? extraDemoGroups[0].index
}

function parseNameFromHash(): string | null {
  const raw = location.hash.replace(/^#\/?/, '')
  const match = raw.match(/^more(?:\/([A-Za-z0-9]+))?$/)
  if (!match) return null
  const name = match[1]
  if (name && allItems.some((item) => item.name === name)) return name
  return null
}

function readStoredName(): string | null {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved && allItems.some((item) => item.name === saved)) return saved
  } catch {
    /* private mode / blocked storage */
  }
  return null
}

function initialName(): string {
  return parseNameFromHash() ?? readStoredName() ?? allItems[0].name
}

const current = ref(initialName())
const group = ref(groupOf(current.value))

const sideItems = computed(
  () =>
    extraDemoGroups
      .find((item) => item.index === group.value)
      ?.items.map((item) => ({ index: item.name, label: item.label })) ?? [],
)

const currentMeta = computed(
  () => allItems.find((item) => item.name === current.value) ?? allItems[0],
)

const currentDemo = computed(() => componentDemos[current.value])

const currentSummary = computed(
  () => catalog.components.find((item) => item.name === current.value)?.summary ?? '',
)

function writeHash(name: string): void {
  const next = `more/${name}`
  if (location.hash.replace(/^#/, '') !== next) location.hash = next
}

function persist(name: string): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, name)
  } catch {
    /* private mode / blocked storage */
  }
}

watch(current, (name) => {
  group.value = groupOf(name)
  persist(name)
  writeHash(name)
})

watch(group, (next) => {
  const names = extraDemoGroups.find((item) => item.index === next)?.items.map((item) => item.name) ?? []
  if (!names.includes(current.value) && names[0]) current.value = names[0]
})

function onHashChange(): void {
  const name = parseNameFromHash()
  if (name && name !== current.value) current.value = name
}

onMounted(() => {
  writeHash(current.value)
  window.addEventListener('hashchange', onHashChange)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', onHashChange)
})
</script>

<template>
  <div class="extra">
    <HbMenu
      :key="`top-${group}`"
      v-model="group"
      class="extra__top"
      mode="horizontal"
      :items="topItems"
    />
    <div class="extra__body">
      <aside class="extra__side">
        <HbMenu
          :key="`side-${group}-${current}`"
          v-model="current"
          mode="vertical"
          :items="sideItems"
        />
      </aside>
      <main class="extra__main">
        <header class="extra__head">
          <h1>{{ currentMeta.label }}</h1>
          <p class="extra__name">{{ currentMeta.name }}</p>
          <p v-if="currentSummary" class="extra__summary">{{ currentSummary }}</p>
        </header>
        <component :is="currentDemo" v-if="currentDemo" />
        <p v-else class="extra__empty">暂无演示。</p>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.extra {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 53px);
  background: var(--hb-el-bg);
}

.extra__top {
  width: 100%;
  border-bottom: 1px solid var(--hb-el-divider);
}

.extra__body {
  display: flex;
  flex: 1;
  min-height: 0;
}

.extra__side {
  flex: 0 0 216px;
  border-right: 1px solid var(--hb-el-divider);
  background: var(--hb-el-bg);

  :deep(.hb-menu--vertical) {
    height: 100%;
  }
}

.extra__main {
  flex: 1;
  min-width: 0;
  padding: 24px 32px 64px;

  :deep(.demo > .muted) {
    display: none;
  }
}

.extra__head {
  margin-bottom: 20px;

  h1 {
    margin: 0;
    font-size: 22px;
    color: var(--hb-el-text);
  }
}

.extra__name {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--hb-el-text3);
}

.extra__summary {
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--hb-el-text2);
}

.extra__empty {
  color: var(--hb-el-text3);
}

@media (max-width: 960px) {
  .extra__body {
    flex-direction: column;
  }

  .extra__side {
    flex: none;
    width: 100%;
    border-right: 0;
    border-bottom: 1px solid var(--hb-el-divider);

    :deep(.hb-menu--vertical) {
      width: 100%;
      height: auto;
    }
  }

  .extra__main {
    padding: 20px 16px 48px;
  }
}
</style>
