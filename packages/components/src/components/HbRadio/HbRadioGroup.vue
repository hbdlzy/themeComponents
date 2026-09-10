<script setup lang="ts">
import { computed } from 'vue'
import { ElRadioGroup } from 'element-plus'
import type { HbRadioGroupProps } from '../../types'
import HbRadio from './HbRadio.vue'

defineOptions({ name: 'HbRadioGroup' })

const props = withDefaults(defineProps<HbRadioGroupProps>(), {
  disabled: false,
  options: () => [],
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: HbRadioGroupProps['modelValue']): void
  (e: 'change', value: HbRadioGroupProps['modelValue']): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (next) => emit('update:modelValue', next),
})
</script>

<template>
  <ElRadioGroup
    v-model="value"
    class="hb-radio-group"
    :disabled="disabled"
    @change="emit('change', $event)"
  >
    <slot>
      <HbRadio
        v-for="item in options"
        :key="String(item.value)"
        :value="item.value"
        :disabled="item.disabled"
      >
        {{ item.label }}
      </HbRadio>
    </slot>
  </ElRadioGroup>
</template>

<style lang="scss">
.hb-radio-group {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 12px 0;
}
</style>
