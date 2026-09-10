<script setup lang="ts">
import { ref } from 'vue'
import { HbTransfer } from '@hebang/components'
import type { HbTransferItem } from '@hebang/components'

const data: HbTransferItem[] = Array.from({ length: 12 }, (_, i) => ({
  key: i + 1,
  label: `选项 ${i + 1}`,
  disabled: i === 3,
}))

const live = ref<Array<string | number>>([1, 4])
</script>

<template>
  <div class="demo">
    <p class="muted">
      列表 240×320。选项悬停 <code>--hb-el-brand_hover</code> + 白字，选中/箭头按下
      <code>--hb-el-brand_press</code> + 白字。
    </p>

    <h3>默认可筛选</h3>
    <HbTransfer v-model="live" :data="data" />

    <h3>禁用</h3>
    <HbTransfer :model-value="[2]" :data="data.slice(0, 6)" disabled :filterable="false" />
  </div>
</template>

<style lang="scss" scoped>
.demo {
  h3 {
    margin: 24px 0 12px;
    font-size: 13px;
    font-weight: 600;
    color: var(--hb-el-text);
  }
}

.muted {
  margin: 0 0 8px;
  color: var(--hb-el-text3);
  line-height: 1.6;
}
</style>
