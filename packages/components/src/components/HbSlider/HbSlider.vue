<script setup lang="ts">
import { computed } from 'vue'
import { ElSlider } from 'element-plus'
import type { HbSliderProps } from '../../types'
import { toCssSize } from '../../utils'

defineOptions({ name: 'HbSlider' })

const props = withDefaults(defineProps<HbSliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  range: false,
  disabled: false,
  showStops: false,
  width: '240px',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | [number, number]): void
  (e: 'change', value: number | [number, number]): void
}>()

const value = computed({
  get: () => props.modelValue ?? (props.range ? [props.min, props.max] : props.min),
  set: (next) => emit('update:modelValue', next),
})

const rootStyle = computed(() => {
  const style: Record<string, string> = {}
  const width = toCssSize(props.width)
  if (width) style.width = width
  return style
})
</script>

<template>
  <ElSlider
    v-model="value"
    class="hb-slider"
    :style="rootStyle"
    :min="min"
    :max="max"
    :step="step"
    :range="range"
    :disabled="disabled"
    :show-stops="showStops"
    @change="emit('change', $event as number | [number, number])"
  />
</template>

<style lang="scss">
.hb-slider.el-slider {
  --el-slider-main-bg-color: var(--hb-el-brand, var(--el-color-primary));
  --el-slider-runway-bg-color: var(--hb-el-bg4, var(--el-fill-color-light));
  --el-slider-stop-bg-color: var(--hb-el-bg, var(--el-bg-color-page));
  --el-slider-height: 4px;
  --el-slider-button-size: 16px;
  --el-slider-border-radius: 2px;

  .el-slider__button {
    border: 2px solid var(--hb-el-brand, var(--el-color-primary));
    background: var(--hb-el-bg, var(--el-bg-color-page));
  }

  .el-slider__stop {
    background: var(--hb-el-border2, var(--el-border-color));
  }

  &:hover .el-slider__button {
    width: 20px;
    height: 20px;
  }

  &.is-disabled {
    --el-slider-main-bg-color: var(--hb-el-disabled, var(--el-text-color-disabled));

    .el-slider__button {
      border-color: var(--hb-el-border2, var(--el-border-color));
      background: var(--hb-el-bg3, var(--el-fill-color));
    }
  }
}

.hb-slider.el-slider.is-focus,
.hb-slider.el-slider:focus-within {
  --el-slider-main-bg-color: var(--hb-el-brand_press, var(--el-color-primary-dark-2));

  .el-slider__button {
    border-color: var(--hb-el-brand_press, var(--el-color-primary-dark-2));
  }
}
</style>
