import type { App } from 'vue'

import './styles/index.scss'

import HbButton from './components/HbButton/HbButton.vue'
import HbDialog from './components/HbDialog/HbDialog.vue'

export { HbButton, HbDialog }
export type { HbButtonProps, HbButtonType, HbDialogProps } from './types'

const components = [HbButton, HbDialog] as const

/** 全量注册：app.use(HbComponents) */
export function install(app: App): void {
  for (const component of components) {
    const name = (component as { name?: string }).name
    if (name) app.component(name, component)
  }
}

export default { install }
