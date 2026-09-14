<script setup lang="ts">
import { computed } from 'vue'
import catalog from '../../../packages/components/catalog.json'
import TokenColorTable from '../components/TokenColorTable.vue'
import { componentDemos } from '../demos/registry'
import { formColorGroups } from '../formColorGroups'
import { findNavItem } from '../nav'

const props = defineProps<{
  name: string
}>()

const meta = computed(() => findNavItem(props.name))
const entry = computed(() => catalog.components.find((item) => item.name === props.name))
const demo = computed(() => componentDemos[props.name])
const groups = computed(() => formColorGroups[props.name] ?? [])
const title = computed(() =>
  meta.value ? `${meta.value.en} ${meta.value.zh}` : props.name,
)
</script>

<template>
  <main class="page">
    <h1>{{ title }}</h1>
    <p v-if="entry?.summary" class="summary">{{ entry.summary }}</p>
    <component :is="demo" v-if="demo" />
    <p v-else class="summary">暂无演示。</p>
    <TokenColorTable v-if="groups.length" :groups="groups" />
  </main>
</template>

<style lang="scss" scoped>
.page {
  max-width: 1180px;
  padding: 24px 40px 64px;

  h1 {
    margin: 0 0 8px;
    font-size: 28px;
    font-weight: 600;
    color: var(--hb-el-text);
  }
}

.summary {
  margin: 0 0 24px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--hb-el-text2);
}

:deep(.demo > .muted),
:deep(.card-demo > .muted),
:deep(.card-demo h2) {
  display: none;
}

@media (max-width: 960px) {
  .page {
    padding: 20px 16px 48px;
  }
}
</style>
