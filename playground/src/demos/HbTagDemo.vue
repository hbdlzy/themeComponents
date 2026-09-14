<script setup lang="ts">
import { HbTag } from '@hebang/components'
import type { HbTagStatus, HbTagVariant } from '@hebang/components'

const variants: HbTagVariant[] = ['outlined', 'light', 'solid']
const statuses: HbTagStatus[] = ['neutral', 'success', 'warning', 'danger', 'info']
</script>

<template>
  <div class="demo">
    <p class="muted">线型 / 浅底 / 填充 × 中性、成功、告警、危险、信息。</p>
    <div v-for="variant in variants" :key="variant" class="row">
      <HbTag v-for="status in statuses" :key="status" :variant="variant" :status="status">
        {{ variant }} {{ status }}
      </HbTag>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}
.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
}
</style>
