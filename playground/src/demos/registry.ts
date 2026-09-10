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
import HbTransferDemo from './HbTransferDemo.vue'
import HbUploadDemo from './HbUploadDemo.vue'

/** 新增组件演示：在此登记 HbXxx → Demo，ComponentsDemo 会按 catalog 顺序出 tab */
export const componentDemos: Record<string, Component> = {
  HbButton: HbButtonDemo,
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
