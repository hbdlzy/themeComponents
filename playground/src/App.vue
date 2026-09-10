<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import ThemeRulesView from './views/ThemeRulesView.vue'
import ButtonDemoView from './views/ButtonDemoView.vue'

/**
 * playground 外壳：hash 路由的轻量双页（组件相互独立，一页一主题）。
 * #/theme-rules  规则引擎总览
 * #/button-demo  HbThemeButton 组件演示
 */
type RouteKey = 'rules' | 'button'

function routeFromHash(): RouteKey {
  return window.location.hash === '#/button-demo' ? 'button' : 'rules'
}

const route = ref<RouteKey>(routeFromHash())

function onHashChange(): void {
  route.value = routeFromHash()
}

onMounted(() => window.addEventListener('hashchange', onHashChange))
onUnmounted(() => window.removeEventListener('hashchange', onHashChange))
</script>

<template>
  <div class="app-shell">
    <header class="app-bar">
      <strong class="app-bar__brand">合邦主题组件库</strong>
      <nav class="app-bar__tabs">
        <a
          class="app-bar__tab"
          :class="{ 'app-bar__tab--active': route === 'rules' }"
          href="#/theme-rules"
        >主题规则引擎</a>
        <a
          class="app-bar__tab"
          :class="{ 'app-bar__tab--active': route === 'button' }"
          href="#/button-demo"
        >按钮组件 Demo</a>
      </nav>
    </header>

    <ThemeRulesView v-if="route === 'rules'" />
    <ButtonDemoView v-else />
  </div>
</template>

<style>
body {
  background: var(--hb-el-bg);
  color: var(--hb-el-text2);
}
</style>

<style lang="scss" scoped>
.app-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 24px;
  height: 52px;
  background: var(--hb-el-bg2);
  border-bottom: 1px solid var(--hb-el-border);

  &__brand {
    font-size: 15px;
    color: var(--hb-el-text);
  }

  &__tabs {
    display: flex;
    gap: 4px;
  }

  &__tab {
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 13px;
    color: var(--hb-el-text2);
    text-decoration: none;

    &:hover {
      background: var(--hb-el-bg3);
      color: var(--hb-el-text);
    }

    &--active {
      background: color-mix(in srgb, var(--hb-el-brand) 12%, transparent);
      color: var(--hb-el-brand);
      font-weight: 600;

      &:hover {
        background: color-mix(in srgb, var(--hb-el-brand) 12%, transparent);
        color: var(--hb-el-brand);
      }
    }
  }
}
</style>
