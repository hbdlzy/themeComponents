<script setup lang="ts">
import { HbButton, HbMessage, hbMessage } from '@hebang/components'
</script>

<template>
  <div class="demo">
    <p class="muted">
      系统提示走浅底描边；全局提示
      <code>hbMessage()</code>
      白底，3 秒关闭。
    </p>
    <h3>系统提示</h3>
    <div class="col">
      <HbMessage type="success" title="成功提示" description="操作已完成" />
      <HbMessage type="warning" title="警告提示" description="请核对后再提交" />
      <HbMessage type="error" title="错误提示" description="保存失败，请重试" />
      <HbMessage type="info" title="信息提示" description="这是一条说明" />
    </div>
    <h3>全局提示</h3>
    <div class="row">
      <HbButton type="success" @click="hbMessage.success('保存成功')">成功</HbButton>
      <HbButton type="warning" @click="hbMessage.warning('请注意')">警告</HbButton>
      <HbButton type="danger" @click="hbMessage.error('操作失败')">错误</HbButton>
      <HbButton type="info" @click="hbMessage.info('一条信息')">信息</HbButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 560px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.muted {
  margin: 0 0 12px;
  color: var(--hb-el-text3);
  line-height: 1.6;
}
h3 {
  margin: 20px 0 12px;
  font-size: 13px;
}
</style>
