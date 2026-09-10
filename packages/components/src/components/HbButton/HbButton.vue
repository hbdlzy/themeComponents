<script setup lang="ts">
import { computed } from 'vue'
import { ElButton } from 'element-plus'
import { componentSizes, fontWeights } from '@hebang/tokens'
import type { HbButtonProps } from '../../types'

defineOptions({ name: 'HbButton' })

const props = withDefaults(defineProps<HbButtonProps>(), {
  type: 'default',
  size: 'default',
  block: false,
  loading: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// 演示令牌消费：块级按钮的最小高度直接取自 componentSizes
const rootStyle = computed(() => ({
  minHeight: props.block ? componentSizes.heightBase : undefined,
  fontWeight: props.type === 'primary' ? fontWeights.medium : undefined,
}))
</script>

<template>
  <ElButton
    class="hb-button"
    :class="{ 'hb-button--block': block }"
    :style="rootStyle"
    :type="type === 'default' ? undefined : type"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </ElButton>
</template>

<style lang="scss">
.hb-button--block {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
