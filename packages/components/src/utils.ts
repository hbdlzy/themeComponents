import { computed, ref, watch, type WritableComputedRef } from 'vue'

export function toCssSize(width: string | number | undefined): string | undefined {
  if (width == null || width === '') return undefined
  return typeof width === 'number' ? `${width}px` : String(width)
}

/** 有 v-model 跟父级走；没有也能在组件内改（demo 状态墙不会一输入就被打回） */
export function useControllable<T>(
  getProp: () => T,
  emitUpdate: (value: T) => void,
): WritableComputedRef<T> {
  const inner = ref(getProp()) as { value: T }
  watch(getProp, (next) => {
    inner.value = next
  })
  return computed({
    get: () => inner.value,
    set: (next: T) => {
      inner.value = next
      emitUpdate(next)
    },
  })
}
