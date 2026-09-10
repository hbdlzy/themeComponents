<script setup lang="ts">
import { ref } from 'vue'
import { HbCheckbox, HbCheckboxGroup } from '@hebang/components'

const options = [
  { label: '选项一', value: 'a' },
  { label: '选项二', value: 'b' },
  { label: '禁用项', value: 'c', disabled: true },
]

const live = ref(['a'])
</script>

<template>
  <div class="demo">
    <p class="muted">
      图标默认 <code>--hb-el-disabled</code>，悬停 <code>--hb-el-brand_hover</code>，选中
      <code>--hb-el-brand_press</code>。成组用 <code>HbCheckboxGroup</code>。
    </p>

    <h3>单独</h3>
    <div class="row">
      <HbCheckboxGroup :model-value="[]">
        <HbCheckbox value="off">未选</HbCheckbox>
      </HbCheckboxGroup>
      <HbCheckboxGroup v-model="live">
        <HbCheckbox value="a">已选</HbCheckbox>
      </HbCheckboxGroup>
      <HbCheckbox value="x" disabled>禁用</HbCheckbox>
      <HbCheckbox value="y" indeterminate>半选</HbCheckbox>
    </div>

    <h3>成组</h3>
    <HbCheckboxGroup v-model="live" :options="options" />

    <h3>整组禁用</h3>
    <HbCheckboxGroup :model-value="['a']" disabled :options="options" />
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
  gap: 16px;
  align-items: center;
}
</style>
