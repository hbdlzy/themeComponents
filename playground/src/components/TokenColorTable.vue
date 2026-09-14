<script setup lang="ts">
import { computed } from 'vue'
import { formatHbElRefLabel, HB_EL_TOKENS, resolveHbElTokens } from '@hebang/tokens'
import type { ColorGroup } from '../formColorGroups'
import { useTheme } from '../useTheme'

defineProps<{
  groups: ColorGroup[]
  hint?: string
}>()

const { mode, palette } = useTheme()
const elNow = computed(() => resolveHbElTokens(palette.value))

function tokenInfo(cssVar: string): { step: string; hex: string } {
  const name = cssVar.replace('--hb-el-', '')
  const spec = HB_EL_TOKENS.find((s) => s.token === name)
  const ref = mode.value === 'dark' ? spec?.dark : spec?.light
  return {
    step: ref ? formatHbElRefLabel(ref) : '—',
    hex: elNow.value[name] ?? '—',
  }
}
</script>

<template>
  <section class="panel">
    <h2>颜色配置对照 · token → 档位 → 当前色值（实时）</h2>
    <p class="muted">
      <slot name="hint">
        组件不单定义主题色：样式只引用 OKLCH 规则引擎产出的
        <code>--hb-el-*</code> 语义令牌，档位与明暗翻转由引擎绑定表
        （<code>packages/tokens/src/elTokens.ts</code>）决定；档位列展示该 token
        在当前 <code>{{ mode }}</code> 模式绑定的 hb 档位。
      </slot>
    </p>
    <p v-if="hint" class="muted">{{ hint }}</p>
    <div v-for="group in groups" :key="group.variant" class="color-group">
      <h3>{{ group.variant }}</h3>
      <p v-if="group.note" class="muted">{{ group.note }}</p>
      <div class="token-table">
        <div class="token-table__head">
          <span>状态</span><span>作用部位</span><span>token</span><span>档位</span><span>当前色值</span>
        </div>
        <div v-for="(row, i) in group.rows" :key="i" class="token-table__row">
          <span>{{ row.state }}</span>
          <span>{{ row.part }}</span>
          <code>{{ row.token }}</code>
          <code class="token-table__step">{{ tokenInfo(row.token).step }}</code>
          <span class="token-table__color">
            <i :style="{ background: tokenInfo(row.token).hex }" />
            <code>{{ tokenInfo(row.token).hex }}</code>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.panel {
  padding: 24px;
  margin-top: 24px;
  border: 1px solid var(--hb-el-border);
  border-radius: 8px;
  background: var(--hb-el-bg2);

  h2 {
    font-size: 16px;
    margin: 0 0 16px;
    color: var(--hb-el-text);
  }

  h3 {
    margin: 0 0 8px;
    font-size: 13px;
    font-weight: 600;
    color: var(--hb-el-text);
  }
}

.muted {
  color: var(--hb-el-text3);
  line-height: 1.6;
}

.color-group {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.token-table {
  border: 1px solid var(--hb-el-border);
  border-radius: 6px;
  overflow: hidden;
  font-size: 12px;

  &__head,
  &__row {
    display: grid;
    grid-template-columns: 64px minmax(160px, 1.3fr) minmax(160px, 1fr) 110px minmax(120px, 1fr);
    gap: 8px;
    align-items: center;
    padding: 6px 12px;
  }

  &__head {
    background: var(--hb-el-bg3);
    color: var(--hb-el-text2);
    font-weight: 600;
  }

  &__row {
    border-top: 1px solid var(--hb-el-divider);
    color: var(--hb-el-text2);
  }

  &__step {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    color: var(--hb-el-text3);
  }

  &__color {
    display: inline-flex;
    align-items: center;
    gap: 6px;

    i {
      width: 16px;
      height: 16px;
      flex: none;
      border: 1px solid var(--hb-el-border2);
      border-radius: 3px;
    }
  }
}
</style>
