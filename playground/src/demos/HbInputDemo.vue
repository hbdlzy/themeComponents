<script setup lang="ts">
import { ref } from 'vue'
import { HbInput } from '@hebang/components'
import type { HbInputLabelAlign, HbInputSize } from '@hebang/components'

const sizes: HbInputSize[] = ['small', 'default', 'large']
const aligns: { value: HbInputLabelAlign; label: string }[] = [
  { value: 'left', label: '左对齐' },
  { value: 'right', label: '右对齐' },
  { value: 'center', label: '居中对齐' },
]

const live = ref('合邦主题')
const liveSize = ref<HbInputSize>('default')
const liveAlign = ref<HbInputLabelAlign>('left')
const liveRequired = ref(true)
const liveHint = ref(true)
const liveError = ref(false)
const liveDisabled = ref(false)
const liveClearable = ref(true)
</script>

<template>
  <div class="demo">
    <p class="muted">
      颜色走
      <code>--hb-el-border2</code> / <code>--hb-el-brand_hover</code> /
      <code>--hb-el-brand_press</code> / <code>--hb-el-danger</code> /
      <code>--hb-el-bg</code> / <code>--hb-el-bg3</code> /
      <code>--hb-el-text</code> / <code>--hb-el-disabled</code>。
      默认高 32px、宽 240px；标题星号始终 <code>danger</code>。
    </p>

    <h3>标题对齐</h3>
    <div class="align-grid">
      <template v-for="row in aligns" :key="row.value">
        <div class="row-label">{{ row.label }}：</div>
        <HbInput
          v-for="size in sizes"
          :key="`${row.value}-${size}`"
          label="标题文案："
          required
          :label-align="row.value"
          :size="size"
          placeholder="请输入"
        />
      </template>
    </div>

    <h3>状态</h3>
    <div class="state-grid">
      <div class="row-label">默认：</div>
      <HbInput
        v-for="size in sizes"
        :key="`default-${size}`"
        :size="size"
        hint="提示信息文案"
        placeholder="请输入"
      />

      <div class="row-label">悬停：</div>
      <HbInput
        v-for="size in sizes"
        :key="`hover-${size}`"
        :size="size"
        preview="hover"
        hint="提示信息文案"
        placeholder="请输入"
      />

      <div class="row-label">聚焦：</div>
      <HbInput
        v-for="size in sizes"
        :key="`focus-${size}`"
        :size="size"
        preview="focus"
        model-value="请输入"
        hint="提示信息文案"
      />

      <div class="row-label">错误：</div>
      <HbInput
        v-for="size in sizes"
        :key="`error-${size}`"
        :size="size"
        status="error"
        model-value="请输入"
        hint="提示信息文案"
      />

      <div class="row-label">禁用：</div>
      <HbInput
        v-for="size in sizes"
        :key="`disabled-${size}`"
        :size="size"
        disabled
        model-value="请输入"
        hint="提示信息文案"
      />

      <div class="row-label">输入完成：</div>
      <HbInput
        v-for="size in sizes"
        :key="`filled-${size}`"
        :size="size"
        model-value="请输入"
        hint="提示信息文案"
      />
    </div>

    <h3>实时</h3>
    <div class="live__controls">
      <el-radio-group v-model="liveSize" size="small">
        <el-radio-button value="small">小</el-radio-button>
        <el-radio-button value="default">中</el-radio-button>
        <el-radio-button value="large">大</el-radio-button>
      </el-radio-group>
      <el-radio-group v-model="liveAlign" size="small">
        <el-radio-button value="left">左</el-radio-button>
        <el-radio-button value="right">右</el-radio-button>
        <el-radio-button value="center">中</el-radio-button>
      </el-radio-group>
      <label class="switch"><el-switch v-model="liveRequired" size="small" /> 必填</label>
      <label class="switch"><el-switch v-model="liveHint" size="small" /> 提示</label>
      <label class="switch"><el-switch v-model="liveError" size="small" /> 错误</label>
      <label class="switch"><el-switch v-model="liveDisabled" size="small" /> 禁用</label>
      <label class="switch"><el-switch v-model="liveClearable" size="small" /> 清除</label>
    </div>
    <HbInput
      v-model="live"
      label="标题文案："
      :required="liveRequired"
      :label-align="liveAlign"
      :size="liveSize"
      :hint="liveHint ? '提示信息文案' : ''"
      :status="liveError ? 'error' : 'default'"
      :disabled="liveDisabled"
      :clearable="liveClearable"
      placeholder="请输入"
    />
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

.align-grid,
.state-grid {
  display: grid;
  grid-template-columns: 88px repeat(3, 240px);
  gap: 20px 24px;
  align-items: start;
  padding: 20px;
  border: 1px dashed var(--hb-el-brand);
  border-radius: 8px;
}

.row-label {
  padding-top: 6px;
  color: var(--hb-el-text);
  font-size: 13px;
  line-height: 22px;
}

.live__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.switch {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--hb-el-text2);
  font-size: 13px;
}
</style>
