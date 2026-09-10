<script setup lang="ts">
import { ElUpload } from 'element-plus'
import type { UploadUserFile } from 'element-plus'
import HbButton from '../HbButton/HbButton.vue'
import type { HbUploadProps } from '../../types'

defineOptions({ name: 'HbUpload' })

withDefaults(defineProps<HbUploadProps>(), {
  mode: 'button',
  disabled: false,
  dragText: '点击或拖拽文件到这里上传',
  buttonText: '点击上传',
})

const emit = defineEmits<{
  (e: 'change', file: UploadUserFile, fileList: UploadUserFile[]): void
  (e: 'remove', file: UploadUserFile, fileList: UploadUserFile[]): void
}>()
</script>

<template>
  <ElUpload
    class="hb-upload"
    :class="{ 'hb-upload--drag': mode === 'drag', 'hb-upload--disabled': disabled }"
    :disabled="disabled"
    :limit="limit"
    :accept="accept"
    :drag="mode === 'drag'"
    :auto-upload="false"
    @change="(file, fileList) => emit('change', file, fileList)"
    @remove="(file, fileList) => emit('remove', file, fileList)"
  >
    <template v-if="mode === 'drag'">
      <div class="hb-upload__drag">
        <svg class="hb-upload__icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M16 6v14M10 12l6-6 6 6M8 26h16"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="hb-upload__text">{{ dragText }}</p>
      </div>
    </template>
    <template v-else>
      <HbButton class="hb-upload__button" type="default" :disabled="disabled">{{ buttonText }}</HbButton>
    </template>
    <template v-if="$slots.tip" #tip>
      <div class="hb-upload__tip">
        <slot name="tip" />
      </div>
    </template>
  </ElUpload>
</template>

<style lang="scss">
.hb-upload {
  --el-color-primary: var(--hb-el-brand, var(--el-color-primary));
  --el-text-color-regular: var(--hb-el-text, var(--el-text-color-primary));
  --el-text-color-secondary: var(--hb-el-disabled, var(--el-text-color-disabled));
  --el-border-color: var(--hb-el-border2, var(--el-border-color));
  --el-fill-color-light: var(--hb-el-bg4, var(--el-fill-color-light));
  --el-color-danger: var(--hb-el-danger, var(--el-color-danger));

  .el-upload-list__item-name {
    color: var(--hb-el-text, var(--el-text-color-primary));
  }

  .el-icon--document,
  .el-icon--upload {
    color: var(--hb-el-brand, var(--el-color-primary));
  }

  .el-upload-list__item .el-icon--close,
  .el-icon--close-tip {
    color: var(--hb-el-disabled, var(--el-text-color-disabled));
  }

  .el-progress-bar__outer {
    background: var(--hb-el-bg4, var(--el-fill-color-light));
  }

  .el-progress-bar__inner {
    background: var(--hb-el-brand, var(--el-color-primary));
  }

  .el-upload-list__item.is-fail .el-progress-bar__inner {
    background: var(--hb-el-danger, var(--el-color-danger));
  }

  &__button.hb-button {
    width: 108px;
  }

  &__drag {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
  }

  &__icon {
    width: 32px;
    height: 32px;
    color: var(--hb-el-disabled, var(--el-text-color-disabled));
  }

  &__text {
    margin: 0;
    font-size: 14px;
    color: var(--hb-el-disabled, var(--el-text-color-disabled));
  }

  &__tip {
    margin-top: 8px;
    font-size: 12px;
    color: var(--hb-el-disabled, var(--el-text-color-disabled));
  }

  &--drag .el-upload,
  &--drag .el-upload-dragger {
    width: 400px;
    height: 200px;
  }

  .el-upload-dragger {
    background: var(--hb-el-bg, var(--el-bg-color-page));
    border: 1px dashed var(--hb-el-border2, var(--el-border-color));
    border-radius: 4px;
  }

  .el-upload-dragger:hover {
    border-color: var(--hb-el-brand, var(--el-color-primary));

    .hb-upload__icon {
      color: var(--hb-el-brand, var(--el-color-primary));
    }
  }

  &--disabled .el-upload-dragger {
    background: var(--hb-el-bg3, var(--el-fill-color));
  }
}
</style>
