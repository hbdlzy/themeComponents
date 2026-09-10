<script setup lang="ts">
import { ref } from 'vue'
import { HbSelect } from '@hebang/components'

const options = [
  { label: '选项一', value: 'a' },
  { label: '选项二', value: 'b' },
  { label: '选项三', value: 'c' },
  { label: '禁用项', value: 'd', disabled: true },
]

const live = ref('a')
const multi = ref(['a', 'b'])
</script>

<template>
  <div class="demo">
    <p class="muted">
      触发器同输入框描边 token。面板选项悬停
      <code>--hb-el-brand_hover</code> + <code>--hb-el-white</code>，选中
      <code>--hb-el-brand_press</code> + 白字。
    </p>

    <h3>单选</h3>
    <div class="row">
      <HbSelect label="默认：" :options="options" placeholder="请选择" />
      <HbSelect label="已选：" :options="options" model-value="a" />
      <HbSelect label="错误：" :options="options" status="error" model-value="a" hint="请选择有效项" />
      <HbSelect label="禁用：" :options="options" disabled model-value="a" />
    </div>

    <h3>多选</h3>
    <HbSelect v-model="multi" label="标签项：" multiple :options="options" />

    <h3>实时</h3>
    <HbSelect v-model="live" label="标题文案：" required :options="options" hint="提示信息文案" />
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
