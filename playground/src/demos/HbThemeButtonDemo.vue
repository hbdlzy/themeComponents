<script setup lang="ts">
import { HbThemeButton } from '@hebang/components'
import type { HbThemeButtonSize, HbThemeButtonVariant } from '@hebang/components'

const variants: { value: HbThemeButtonVariant; label: string }[] = [
  { value: 'primary', label: '主要' },
  { value: 'secondary', label: '次要实线' },
  { value: 'secondary-dashed', label: '次要虚线' },
  { value: 'neutral', label: '中性实线' },
  { value: 'neutral-dashed', label: '中性虚线' },
]

const sizes: HbThemeButtonSize[] = ['large', 'medium', 'small']
</script>

<template>
  <div class="demo">
    <p class="muted">
      原生 button，不包装 ElButton。颜色只引用
      <code>--hb-el-brand / _hover / _press / disabled / white / text</code>。
      完整矩阵、四态与配色对照见顶栏「按钮组件」。
    </p>
    <h3>类型</h3>
    <div class="row">
      <HbThemeButton v-for="v in variants" :key="v.value" :variant="v.value">
        {{ v.label }}
      </HbThemeButton>
    </div>
    <h3>尺寸</h3>
    <div class="row">
      <HbThemeButton v-for="s in sizes" :key="s" :size="s">{{ s }}</HbThemeButton>
    </div>
    <h3>圆角 / 状态</h3>
    <div class="row">
      <HbThemeButton shape="round">胶囊</HbThemeButton>
      <HbThemeButton class="is-hover">悬停</HbThemeButton>
      <HbThemeButton class="is-active">点击</HbThemeButton>
      <HbThemeButton disabled>置灰</HbThemeButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  h3 {
    margin: 20px 0 10px;
    font-size: 13px;
    font-weight: 600;
    color: var(--hb-el-text);
  }
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.muted {
  margin: 0 0 8px;
  color: var(--hb-el-text3);
  line-height: 1.6;
}
</style>
