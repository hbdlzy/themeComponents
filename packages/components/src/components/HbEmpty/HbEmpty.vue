<script setup lang="ts">
import { computed } from 'vue'
import type { HbEmptyKind, HbEmptyProps } from '../../types'

defineOptions({ name: 'HbEmpty' })

const props = withDefaults(defineProps<HbEmptyProps>(), {
  kind: 'data',
  description: '',
})

const copy: Record<HbEmptyKind, { title: string; hint: string }> = {
  data: { title: '暂无数据', hint: '系统未获取到相关数据，或数据尚未录入、加载失败' },
  content: { title: '暂无内容', hint: '用户未创建或上传任何内容，或内容被清空' },
  message: { title: '暂无消息', hint: '用户未接收到新消息，或消息已被全部处理' },
  address: { title: '暂无地址', hint: '用户未添加任何地址信息，或地址被删除' },
  search: { title: '暂无搜索结果', hint: '用户输入的关键词未匹配到任何结果' },
  record: { title: '暂无记录', hint: '用户尚未产生任何行为记录，或记录被清除' },
  favorite: { title: '暂无收藏', hint: '用户未收藏任何项目' },
  auth: { title: '暂未认证', hint: '用户尚未完成身份或资质认证' },
  network: { title: '暂无网络', hint: '设备未连接网络，或网络连接异常' },
  building: { title: '正在建设中', hint: '功能或页面处于开发阶段，尚未正式上线' },
}

const title = computed(() => copy[props.kind].title)
const hint = computed(() => props.description || copy[props.kind].hint)
</script>

<template>
  <div class="hb-empty" :class="`hb-empty--${kind}`">
    <div class="hb-empty__art" aria-hidden="true">
      <span class="hb-empty__shape" />
      <span class="hb-empty__mark" />
    </div>
    <div class="hb-empty__title">{{ title }}</div>
    <p class="hb-empty__hint">{{ hint }}</p>
    <div v-if="$slots.default" class="hb-empty__action">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.hb-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px 16px;
  color: var(--hb-el-text2);
  text-align: center;

  &__art {
    position: relative;
    width: 96px;
    height: 72px;
    margin-bottom: 8px;
  }

  &__shape {
    position: absolute;
    inset: 12px 8px 8px;
    border: 2px solid var(--hb-el-border2);
    border-radius: 8px;
    background: var(--hb-el-bg2);
  }

  &__mark {
    position: absolute;
    right: 10px;
    bottom: 6px;
    width: 28px;
    height: 28px;
    border: 2px solid var(--hb-el-brand);
    border-radius: 50%;
    background: var(--hb-el-bg);
  }

  &__mark::after {
    content: '';
    position: absolute;
    inset: 6px;
    border-radius: 50%;
    background: var(--hb-el-brand_light);
  }

  &--search &__mark {
    border-radius: 50% 50% 50% 4px;
    transform: rotate(36deg);
  }

  &--network &__mark {
    border-radius: 4px;
  }

  &--building &__shape {
    clip-path: polygon(50% 8%, 92% 92%, 8% 92%);
    inset: 4px 12px 8px;
  }

  &__title {
    color: var(--hb-el-text);
    font-size: 14px;
    line-height: 22px;
  }

  &__hint {
    margin: 0;
    max-width: 320px;
    font-size: 12px;
    line-height: 18px;
    color: var(--hb-el-text2);
  }

  &__action {
    margin-top: 8px;
  }
}
</style>
