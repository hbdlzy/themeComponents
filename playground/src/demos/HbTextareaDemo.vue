<script setup lang="ts">
import { ref } from 'vue'
import { HbTextarea } from '@hebang/components'

const live = ref('合邦主题')
const liveError = ref(false)
const liveDisabled = ref(false)
</script>

<template>
  <div class="demo">
    <p class="muted">
      颜色走输入框同一套 token；最小高 64px、默认 4 行；聚焦/错误描边 2px
      <code>--hb-el-brand_press</code> / <code>--hb-el-danger</code>。
    </p>

    <h3>状态</h3>
    <div class="grid">
      <HbTextarea label="默认：" placeholder="请输入" hint="提示信息文案" />
      <HbTextarea label="已填充：" model-value="多行内容" hint="提示信息文案" />
      <HbTextarea label="错误：" status="error" model-value="多行内容" hint="提示信息文案" />
      <HbTextarea label="禁用：" disabled model-value="多行内容" hint="提示信息文案" />
    </div>

    <h3>实时</h3>
    <div class="live__controls">
      <label class="switch"><el-switch v-model="liveError" size="small" /> 错误</label>
      <label class="switch"><el-switch v-model="liveDisabled" size="small" /> 禁用</label>
    </div>
    <HbTextarea
      v-model="live"
      label="标题文案："
      required
      :hint="liveError ? '提示信息文案' : '最多 200 字'"
      :status="liveError ? 'error' : 'default'"
      :disabled="liveDisabled"
      :maxlength="200"
      show-word-limit
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

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(240px, 1fr));
  gap: 20px 24px;
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
