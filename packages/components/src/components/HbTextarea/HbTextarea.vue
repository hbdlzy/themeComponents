<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ElInput } from 'element-plus'
import { fontSizes, radii, spacing } from '@hebang/tokens'
import type { HbTextareaProps } from '../../types'
import { toCssSize } from '../../utils'
import HbField from '../HbField/HbField.vue'

defineOptions({ name: 'HbTextarea', inheritAttrs: false })

const props = withDefaults(defineProps<HbTextareaProps>(), {
  modelValue: '',
  label: '',
  labelAlign: 'left',
  required: false,
  placeholder: '请输入',
  hint: '',
  disabled: false,
  status: 'default',
  rows: 4,
  width: '100%',
  showWordLimit: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'change', value: string): void
}>()

const attrs = useAttrs()
const isError = computed(() => props.status === 'error')
const value = computed({
  get: () => props.modelValue ?? '',
  set: (next) => emit('update:modelValue', next),
})

const rootStyle = computed(() => {
  const style: Record<string, string> = {
    '--hb-textarea-min-height': '64px',
    '--hb-textarea-font-size': fontSizes.base,
    '--hb-textarea-radius': radii.base,
    '--hb-textarea-pad-x': '12px',
    '--hb-textarea-pad-y': spacing.sm,
  }
  const width = toCssSize(props.width)
  if (width) style.width = width
  return style
})
</script>

<template>
  <HbField
    class="hb-textarea"
    :class="{ 'hb-textarea--error': isError, 'hb-textarea--disabled': disabled }"
    :style="rootStyle"
    :label="label"
    :label-align="labelAlign"
    :required="required"
    :hint="hint"
    :status="status"
    :disabled="disabled"
  >
    <ElInput
      v-model="value"
      class="hb-textarea__control"
      v-bind="attrs"
      type="textarea"
      :rows="rows"
      :autosize="autosize"
      :disabled="disabled"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :show-word-limit="showWordLimit"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @change="emit('change', String($event ?? ''))"
    />
  </HbField>
</template>

<style lang="scss">
.hb-textarea {
  --hb-textarea-color-bg: var(--hb-el-bg, var(--el-bg-color-page));
  --hb-textarea-color-border: var(--hb-el-border2, var(--el-border-color));
  --hb-textarea-color-text: var(--hb-el-text, var(--el-text-color-primary));
  --hb-textarea-color-placeholder: var(--hb-el-disabled, var(--el-text-color-disabled));
  --hb-textarea-border-width: 1px;

  --el-input-bg-color: var(--hb-textarea-color-bg);
  --el-input-border-color: var(--hb-textarea-color-border);
  --el-input-hover-border-color: var(--hb-textarea-color-border);
  --el-input-focus-border-color: var(--hb-textarea-color-border);
  --el-input-text-color: var(--hb-textarea-color-text);
  --el-input-placeholder-color: var(--hb-textarea-color-placeholder);
  --el-disabled-bg-color: var(--hb-textarea-color-bg);
  --el-disabled-border-color: var(--hb-textarea-color-border);
  --el-disabled-text-color: var(--hb-textarea-color-placeholder);

  &:not(.hb-textarea--disabled):not(.hb-textarea--error) {
    &:hover {
      --hb-textarea-color-border: var(--hb-el-brand_hover, var(--el-color-primary));
    }
    &:focus-within {
      --hb-textarea-border-width: 2px;
      --hb-textarea-color-border: var(--hb-el-brand, var(--el-color-primary));
    }
  }

  &--error {
    --hb-textarea-border-width: 2px;
    --hb-textarea-color-border: var(--hb-el-danger, var(--el-color-danger));
  }

  &--disabled {
    --hb-textarea-color-bg: var(--hb-el-bg3, var(--el-fill-color));
  }

  &__control {
    width: 100%;

    .el-textarea__inner {
      min-height: var(--hb-textarea-min-height);
      padding: var(--hb-textarea-pad-y) var(--hb-textarea-pad-x);
      color: var(--hb-textarea-color-text);
      font-size: var(--hb-textarea-font-size);
      line-height: 1.5;
      background: var(--hb-textarea-color-bg);
      box-shadow: 0 0 0 var(--hb-textarea-border-width) var(--hb-textarea-color-border) inset;
      border-radius: var(--hb-textarea-radius);
    }

    .el-textarea__inner::placeholder {
      color: var(--hb-textarea-color-placeholder);
    }
  }
}
</style>
