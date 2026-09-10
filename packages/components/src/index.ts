import type { App } from 'vue'

import './styles/index.scss'

import HbButton from './components/HbButton/HbButton.vue'
import HbCard from './components/HbCard/HbCard.vue'
import HbCheckbox from './components/HbCheckbox/HbCheckbox.vue'
import HbCheckboxGroup from './components/HbCheckbox/HbCheckboxGroup.vue'
import HbDatePicker from './components/HbDatePicker/HbDatePicker.vue'
import HbDialog from './components/HbDialog/HbDialog.vue'
import HbInput from './components/HbInput/HbInput.vue'
import HbInputNumber from './components/HbInputNumber/HbInputNumber.vue'
import HbRadio from './components/HbRadio/HbRadio.vue'
import HbRadioGroup from './components/HbRadio/HbRadioGroup.vue'
import HbSelect from './components/HbSelect/HbSelect.vue'
import HbSlider from './components/HbSlider/HbSlider.vue'
import HbTextarea from './components/HbTextarea/HbTextarea.vue'
import HbThemeButton from './components/HbThemeButton/HbThemeButton.vue'
import HbTransfer from './components/HbTransfer/HbTransfer.vue'
import HbUpload from './components/HbUpload/HbUpload.vue'

export {
  HbButton,
  HbCard,
  HbCheckbox,
  HbCheckboxGroup,
  HbDatePicker,
  HbDialog,
  HbInput,
  HbInputNumber,
  HbRadio,
  HbRadioGroup,
  HbSelect,
  HbSlider,
  HbTextarea,
  HbThemeButton,
  HbTransfer,
  HbUpload,
}
export type {
  HbButtonProps,
  HbButtonType,
  HbCardProps,
  HbCardSize,
  HbCardTitleSize,
  HbCheckboxGroupProps,
  HbCheckboxProps,
  HbDatePickerProps,
  HbDatePickerType,
  HbDialogProps,
  HbInputLabelAlign,
  HbInputNumberProps,
  HbInputPreview,
  HbInputProps,
  HbInputSize,
  HbInputStatus,
  HbInputType,
  HbRadioGroupProps,
  HbRadioProps,
  HbSelectOption,
  HbSelectProps,
  HbSliderProps,
  HbTextareaProps,
  HbThemeButtonProps,
  HbThemeButtonVariant,
  HbThemeButtonSize,
  HbThemeButtonShape,
  HbTransferItem,
  HbTransferProps,
  HbUploadMode,
  HbUploadProps,
} from './types'

const components = [
  HbButton,
  HbCard,
  HbCheckbox,
  HbCheckboxGroup,
  HbDatePicker,
  HbDialog,
  HbInput,
  HbInputNumber,
  HbRadio,
  HbRadioGroup,
  HbSelect,
  HbSlider,
  HbTextarea,
  HbThemeButton,
  HbTransfer,
  HbUpload,
] as const

/** 全量注册：app.use(HbComponents) */
export function install(app: App): void {
  for (const component of components) {
    const name = (component as { name?: string }).name
    if (name) app.component(name, component)
  }
}

export default { install }
