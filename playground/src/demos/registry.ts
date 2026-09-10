import type { Component } from 'vue'
import HbButtonDemo from './HbButtonDemo.vue'
import HbCardDemo from './HbCardDemo.vue'
import HbDialogDemo from './HbDialogDemo.vue'
import HbInputDemo from './HbInputDemo.vue'

/** 新增组件演示：在此登记 HbXxx → Demo，ComponentsDemo 会按 catalog 顺序出 tab */
export const componentDemos: Record<string, Component> = {
  HbButton: HbButtonDemo,
  HbCard: HbCardDemo,
  HbDialog: HbDialogDemo,
  HbInput: HbInputDemo,
}
