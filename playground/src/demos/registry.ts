import type { Component } from 'vue'
import HbButtonDemo from './HbButtonDemo.vue'
import HbCardDemo from './HbCardDemo.vue'
import HbCheckboxDemo from './HbCheckboxDemo.vue'
import HbDatePickerDemo from './HbDatePickerDemo.vue'
import HbDialogDemo from './HbDialogDemo.vue'
import HbInputDemo from './HbInputDemo.vue'
import HbInputNumberDemo from './HbInputNumberDemo.vue'
import HbRadioDemo from './HbRadioDemo.vue'
import HbSelectDemo from './HbSelectDemo.vue'
import HbSliderDemo from './HbSliderDemo.vue'
import HbTextareaDemo from './HbTextareaDemo.vue'
import HbThemeButtonDemo from './HbThemeButtonDemo.vue'
import HbTransferDemo from './HbTransferDemo.vue'
import HbUploadDemo from './HbUploadDemo.vue'

/** 新增组件演示：在此登记 HbXxx → Demo；各 Demo 页按 catalog 顺序取子集出 tab */
export const componentDemos: Record<string, Component> = {
  HbButton: HbButtonDemo,
  HbThemeButton: HbThemeButtonDemo,
  HbCard: HbCardDemo,
  HbCheckbox: HbCheckboxDemo,
  HbDatePicker: HbDatePickerDemo,
  HbDialog: HbDialogDemo,
  HbInput: HbInputDemo,
  HbInputNumber: HbInputNumberDemo,
  HbRadio: HbRadioDemo,
  HbSelect: HbSelectDemo,
  HbSlider: HbSliderDemo,
  HbTextarea: HbTextareaDemo,
  HbTransfer: HbTransferDemo,
  HbUpload: HbUploadDemo,
}

/** 表单页 tabs（catalog 顺序） */
export const formDemoNames = [
  'HbInput',
  'HbTextarea',
  'HbSelect',
  'HbRadio',
  'HbCheckbox',
  'HbSlider',
  'HbInputNumber',
  'HbDatePicker',
  'HbUpload',
  'HbTransfer',
] as const

/** 已从「组件 Demo」拆到独立顶栏页的组件 */
export const splitOutDemoNames = new Set<string>(['HbCard', 'HbThemeButton', ...formDemoNames])
