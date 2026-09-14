<script setup lang="ts">
import { HbBadge, HbButton } from '@hebang/components'
</script>

<template>
  <div class="demo">
    <p class="muted">数字超过 99 显示 99+；无 value 为小圆点。文字白。</p>
    <div class="row">
      <HbBadge :value="8" type="primary"><HbButton>默认</HbButton></HbBadge>
      <HbBadge :value="128" type="danger"><HbButton>危险</HbButton></HbBadge>
      <HbBadge :value="3" type="success"><HbButton>成功</HbButton></HbBadge>
      <HbBadge :value="1" type="warning"><HbButton>警告</HbButton></HbBadge>
      <HbBadge type="danger"><HbButton>圆点</HbButton></HbBadge>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
}
.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
}
</style>
