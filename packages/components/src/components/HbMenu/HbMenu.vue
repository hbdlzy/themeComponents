<script setup lang="ts">
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { useControllable } from '../../utils'
import type { HbMenuProps } from '../../types'

defineOptions({ name: 'HbMenu' })

const props = withDefaults(defineProps<HbMenuProps>(), {
  mode: 'vertical',
  modelValue: '',
  items: () => [],
  collapse: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'select', index: string): void
}>()

const active = useControllable(
  () => props.modelValue ?? '',
  (next) => emit('update:modelValue', next),
)

function onSelect(index: string): void {
  active.value = index
  emit('select', index)
}
</script>

<template>
  <ElMenu
    class="hb-menu"
    :class="`hb-menu--${mode}`"
    :mode="mode"
    :collapse="collapse"
    :default-active="active"
    @select="onSelect"
  >
    <template v-for="item in items" :key="item.index">
      <ElSubMenu v-if="item.children?.length" :index="item.index" :disabled="item.disabled">
        <template #title>{{ item.label }}</template>
        <ElMenuItem
          v-for="child in item.children"
          :key="child.index"
          :index="child.index"
          :disabled="child.disabled"
        >
          {{ child.label }}
        </ElMenuItem>
      </ElSubMenu>
      <ElMenuItem v-else :index="item.index" :disabled="item.disabled">
        {{ item.label }}
      </ElMenuItem>
    </template>
    <slot />
  </ElMenu>
</template>

<style lang="scss">
.hb-menu {
  --el-menu-bg-color: var(--hb-el-bg);
  --el-menu-text-color: var(--hb-el-text);
  --el-menu-hover-bg-color: var(--hb-el-bg);
  --el-menu-hover-text-color: var(--hb-el-brand);
  --el-menu-active-color: var(--hb-el-white);
  --el-menu-border-color: var(--hb-el-divider);
  border-right: none;

  &--vertical {
    width: 216px;

    .el-menu-item.is-active {
      background: var(--hb-el-brand);
      color: var(--hb-el-white);
    }

    .el-sub-menu .el-menu-item.is-active {
      background: var(--hb-el-brand_light);
      color: var(--hb-el-brand);
    }
  }

  &--horizontal {
    height: 72px;

    .el-menu-item.is-active {
      background: var(--hb-el-brand);
      color: var(--hb-el-white);
    }
  }
}
</style>
