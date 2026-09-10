<script setup lang="ts">
import { ref } from 'vue'
import { HbDatePicker } from '@hebang/components'

const date = ref<Date>()
const time = ref<Date>()
const range = ref<[Date, Date]>()
</script>

<template>
  <div class="demo">
    <p class="muted">
      触发器同输入框。面板选中格 <code>--hb-el-brand_press</code> +
      <code>--hb-el-white</code>，悬停描边 <code>--hb-el-brand_hover</code>。
    </p>

    <h3>日期</h3>
    <div class="row">
      <HbDatePicker v-model="date" label="选择日期：" />
      <HbDatePicker label="禁用：" disabled />
      <HbDatePicker label="错误：" status="error" hint="请选择日期" />
    </div>

    <h3>范围 / 时间 / 日期时间</h3>
    <div class="row">
      <HbDatePicker v-model="range" type="daterange" width="320px" />
      <HbDatePicker v-model="time" type="time" placeholder="选择时间" />
      <HbDatePicker type="datetime" placeholder="选择日期时间" width="280px" />
    </div>
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

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 24px;
  align-items: start;
}
</style>
