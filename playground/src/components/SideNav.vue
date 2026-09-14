<script setup lang="ts">
import { nextTick, watch } from 'vue'
import { navGroups } from '../nav'

const props = defineProps<{
  active: string
}>()

const emit = defineEmits<{
  (e: 'navigate', id: string): void
}>()

watch(
  () => props.active,
  async () => {
    await nextTick()
    document.querySelector('.side-nav__item.is-active')?.scrollIntoView({ block: 'nearest' })
  },
)
</script>

<template>
  <nav class="side-nav">
    <section v-for="group in navGroups" :key="group.id" class="side-nav__group">
      <h2 class="side-nav__title">{{ group.en }} {{ group.zh }}</h2>
      <button
        v-for="item in group.items"
        :key="item.id"
        type="button"
        class="side-nav__item"
        :class="{ 'is-active': active === item.id }"
        @click="emit('navigate', item.id)"
      >
        {{ item.en }} {{ item.zh }}
      </button>
    </section>
  </nav>
</template>

<style lang="scss" scoped>
.side-nav {
  padding: 12px 0 48px;
}

.side-nav__group + .side-nav__group {
  margin-top: 8px;
}

.side-nav__title {
  margin: 0;
  padding: 20px 32px 8px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: var(--hb-el-text);
}

.side-nav__item {
  display: block;
  width: 100%;
  margin: 0;
  padding: 8px 32px;
  border: 0;
  background: transparent;
  color: var(--hb-el-text2);
  font-size: 14px;
  line-height: 1.7;
  text-align: left;
  cursor: pointer;

  &:hover {
    color: var(--hb-el-brand);
  }

  &.is-active {
    color: var(--hb-el-brand);
  }
}
</style>
