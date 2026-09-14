<script setup lang="ts">
import { HbButton, HbTooltip } from '@hebang/components'
</script>

<template>
  <div class="demo">
    <p class="muted">浅色气泡走底/字/边；深色气泡走遮罩底 + 白字。</p>
    <div class="row">
      <HbTooltip content="深色提示" effect="dark">
        <HbButton>深色</HbButton>
      </HbTooltip>
      <HbTooltip content="浅色提示" effect="light">
        <HbButton>浅色</HbButton>
      </HbTooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row {
  display: flex;
  gap: 12px;
}
.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
}
</style>
