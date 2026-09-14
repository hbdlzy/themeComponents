<script setup lang="ts">
import { ref } from 'vue'
import { HbPagination } from '@hebang/components'

const page = ref(2)
const size = ref(10)
</script>

<template>
  <div class="demo">
    <p class="muted">页码 24×24，当前页品牌底白字。</p>
    <HbPagination v-model:current-page="page" v-model:page-size="size" :total="128" />
  </div>
</template>

<style lang="scss" scoped>
.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
}
</style>
