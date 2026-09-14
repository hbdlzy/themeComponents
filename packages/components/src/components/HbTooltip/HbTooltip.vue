<script setup lang="ts">
import { ElTooltip } from 'element-plus'
import type { HbTooltipProps } from '../../types'

defineOptions({ name: 'HbTooltip' })

withDefaults(defineProps<HbTooltipProps>(), {
  content: '',
  effect: 'dark',
  placement: 'top',
})
</script>

<template>
  <ElTooltip
    class="hb-tooltip"
    :content="content"
    :effect="effect"
    :placement="placement"
    :show-after="200"
  >
    <slot />
  </ElTooltip>
</template>

<style lang="scss">
.el-popper.is-dark {
  --el-text-color-primary: var(--hb-el-white);
  background: var(--hb-el-mask);
  color: var(--hb-el-white);
}

.el-popper.is-light {
  background: var(--hb-el-bg);
  color: var(--hb-el-text);
  border-color: var(--hb-el-border);
}
</style>
