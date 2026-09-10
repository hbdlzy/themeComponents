<script setup lang="ts">
import { computed } from 'vue'
import { ElCheckboxGroup } from 'element-plus'
import type { HbCheckboxGroupProps } from '../../types'
import HbCheckbox from './HbCheckbox.vue'

defineOptions({ name: 'HbCheckboxGroup' })

const props = withDefaults(defineProps<HbCheckboxGroupProps>(), {
  disabled: false,
  options: () => [],
  modelValue: () => [],
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Array<string | number | boolean>): void
  (e: 'change', value: Array<string | number | boolean>): void
}>()

const value = computed({
  get: () => props.modelValue ?? [],
  set: (next) => emit('update:modelValue', next),
})
</script>

<template>
  <ElCheckboxGroup
    v-model="value"
    class="hb-checkbox-group"
    :disabled="disabled"
    @change="emit('change', $event as Array<string | number | boolean>)"
  >
    <slot>
      <HbCheckbox
        v-for="item in options"
        :key="String(item.value)"
        :value="item.value"
        :disabled="item.disabled"
      >
        {{ item.label }}
      </HbCheckbox>
    </slot>
  </ElCheckboxGroup>
</template>

<style lang="scss">
.hb-checkbox-group {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 12px 16px;
}
</style>
