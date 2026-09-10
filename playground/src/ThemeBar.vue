<script setup lang="ts">
import { useTheme } from './useTheme'

const { committed, mode, currentHex, presets, onActiveChange } = useTheme()
</script>

<template>
  <div class="theme-bar">
    <code class="theme-bar__hex">{{ currentHex }}</code>
    <el-color-picker
      v-model="committed"
      :predefine="presets"
      @active-change="onActiveChange"
    />
    <el-radio-group v-model="mode" size="small">
      <el-radio-button value="light">Light</el-radio-button>
      <el-radio-button value="dark">Dark</el-radio-button>
    </el-radio-group>
  </div>
</template>

<style lang="scss" scoped>
.theme-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: none;

  &__hex {
    padding: 4px 8px;
    border-radius: 4px;
    background: var(--hb-el-bg4);
    color: var(--hb-el-text);
    font-size: 12px;
  }
}
</style>
