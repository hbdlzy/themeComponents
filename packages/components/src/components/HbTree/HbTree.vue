<script setup lang="ts">
import { computed } from 'vue'
import { ElTree } from 'element-plus'
import type { HbTreeNode, HbTreeProps } from '../../types'

defineOptions({ name: 'HbTree' })

const props = withDefaults(defineProps<HbTreeProps>(), {
  data: () => [],
  defaultExpandAll: true,
})

const emit = defineEmits<{
  (e: 'node-click', data: HbTreeNode): void
}>()

function withKeys(nodes: HbTreeNode[], prefix = ''): HbTreeNode[] {
  return nodes.map((node, i) => {
    const id = node.id ?? `${prefix}${i}`
    return {
      ...node,
      id,
      children: node.children?.length ? withKeys(node.children, `${id}-`) : node.children,
    }
  })
}

const treeData = computed(() => withKeys(props.data))
</script>

<template>
  <ElTree
    class="hb-tree"
    :data="treeData"
    node-key="id"
    :props="{ label: 'label', children: 'children', disabled: 'disabled' }"
    :default-expand-all="defaultExpandAll"
    highlight-current
    @node-click="(data: HbTreeNode) => emit('node-click', data)"
  />
</template>

<style lang="scss">
.hb-tree {
  --el-tree-node-hover-bg-color: var(--hb-el-brand_light);
  --el-tree-text-color: var(--hb-el-text);
  --el-color-primary: var(--hb-el-brand);
  background: var(--hb-el-bg);
  color: var(--hb-el-text);
  font-size: 14px;

  .el-tree-node__expand-icon {
    color: var(--hb-el-text2);
  }

  .el-tree-node.is-current > .el-tree-node__content {
    color: var(--hb-el-brand);
    background: var(--hb-el-bg);
  }

  .el-tree-node.is-disabled > .el-tree-node__content {
    color: var(--hb-el-disabled);
  }

  .el-tree-node__content:hover .el-tree-node__label {
    color: var(--hb-el-brand_hover);
  }
}
</style>
