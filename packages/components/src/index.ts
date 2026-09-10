import type { App } from 'vue'

import './styles/index.scss'

import HbButton from './components/HbButton/HbButton.vue'
import HbCard from './components/HbCard/HbCard.vue'
import HbDialog from './components/HbDialog/HbDialog.vue'
import HbInput from './components/HbInput/HbInput.vue'

export { HbButton, HbCard, HbDialog, HbInput }
export type {
  HbButtonProps,
  HbButtonType,
  HbCardProps,
  HbCardSize,
  HbCardTitleSize,
  HbDialogProps,
  HbInputLabelAlign,
  HbInputPreview,
  HbInputProps,
  HbInputSize,
  HbInputStatus,
} from './types'

const components = [HbButton, HbCard, HbDialog, HbInput] as const

/** 全量注册：app.use(HbComponents) */
export function install(app: App): void {
  for (const component of components) {
    const name = (component as { name?: string }).name
    if (name) app.component(name, component)
  }
}

export default { install }
