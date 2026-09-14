import type { App } from 'vue'

import './styles/index.scss'

import HbBadge from './components/HbBadge/HbBadge.vue'
import HbBreadcrumb from './components/HbBreadcrumb/HbBreadcrumb.vue'
import HbButton from './components/HbButton/HbButton.vue'
import HbCard from './components/HbCard/HbCard.vue'
import HbCheckbox from './components/HbCheckbox/HbCheckbox.vue'
import HbCheckboxGroup from './components/HbCheckbox/HbCheckboxGroup.vue'
import HbCollapse from './components/HbCollapse/HbCollapse.vue'
import HbDatePicker from './components/HbDatePicker/HbDatePicker.vue'
import HbDialog from './components/HbDialog/HbDialog.vue'
import HbEmpty from './components/HbEmpty/HbEmpty.vue'
import HbInput from './components/HbInput/HbInput.vue'
import HbInputNumber from './components/HbInputNumber/HbInputNumber.vue'
import HbLoading from './components/HbLoading/HbLoading.vue'
import HbMenu from './components/HbMenu/HbMenu.vue'
import HbMessage from './components/HbMessage/HbMessage.vue'
import HbNotification from './components/HbNotification/HbNotification.vue'
import HbPagination from './components/HbPagination/HbPagination.vue'
import HbRadio from './components/HbRadio/HbRadio.vue'
import HbRadioGroup from './components/HbRadio/HbRadioGroup.vue'
import HbSelect from './components/HbSelect/HbSelect.vue'
import HbSlider from './components/HbSlider/HbSlider.vue'
import HbSteps from './components/HbSteps/HbSteps.vue'
import HbTable from './components/HbTable/HbTable.vue'
import HbTabs from './components/HbTabs/HbTabs.vue'
import HbTag from './components/HbTag/HbTag.vue'
import HbTextarea from './components/HbTextarea/HbTextarea.vue'
import HbThemeButton from './components/HbThemeButton/HbThemeButton.vue'
import HbTimeline from './components/HbTimeline/HbTimeline.vue'
import HbTooltip from './components/HbTooltip/HbTooltip.vue'
import HbTransfer from './components/HbTransfer/HbTransfer.vue'
import HbTree from './components/HbTree/HbTree.vue'
import HbUpload from './components/HbUpload/HbUpload.vue'

export { hbMessage, hbNotify } from './components/HbMessage/toast'

export {
  HbBadge,
  HbBreadcrumb,
  HbButton,
  HbCard,
  HbCheckbox,
  HbCheckboxGroup,
  HbCollapse,
  HbDatePicker,
  HbDialog,
  HbEmpty,
  HbInput,
  HbInputNumber,
  HbLoading,
  HbMenu,
  HbMessage,
  HbNotification,
  HbPagination,
  HbRadio,
  HbRadioGroup,
  HbSelect,
  HbSlider,
  HbSteps,
  HbTable,
  HbTabs,
  HbTag,
  HbTextarea,
  HbThemeButton,
  HbTimeline,
  HbTooltip,
  HbTransfer,
  HbTree,
  HbUpload,
}
export type {
  HbBadgeProps,
  HbBadgeType,
  HbBreadcrumbItem,
  HbBreadcrumbProps,
  HbButtonProps,
  HbButtonType,
  HbCardProps,
  HbCardSize,
  HbCardTitleSize,
  HbCheckboxGroupProps,
  HbCheckboxProps,
  HbCollapseItem,
  HbCollapseProps,
  HbCollapseSize,
  HbDatePickerProps,
  HbDatePickerType,
  HbDialogProps,
  HbEmptyKind,
  HbEmptyProps,
  HbInputLabelAlign,
  HbInputNumberProps,
  HbInputPreview,
  HbInputProps,
  HbInputSize,
  HbInputStatus,
  HbInputType,
  HbLoadingMode,
  HbLoadingProps,
  HbMenuItem,
  HbMenuProps,
  HbMessageProps,
  HbNotificationProps,
  HbPaginationProps,
  HbRadioGroupProps,
  HbRadioProps,
  HbSelectOption,
  HbSelectProps,
  HbSliderProps,
  HbStatusType,
  HbStepItem,
  HbStepsProps,
  HbTabItem,
  HbTableColumn,
  HbTableProps,
  HbTableSize,
  HbTabsProps,
  HbTagProps,
  HbTagStatus,
  HbTagVariant,
  HbTextareaProps,
  HbThemeButtonProps,
  HbThemeButtonShape,
  HbThemeButtonSize,
  HbThemeButtonVariant,
  HbTimelineItem,
  HbTimelineProps,
  HbTimelineStatus,
  HbTooltipEffect,
  HbTooltipProps,
  HbTransferItem,
  HbTransferProps,
  HbTreeNode,
  HbTreeProps,
  HbUploadMode,
  HbUploadProps,
} from './types'

const components = [
  HbBadge,
  HbBreadcrumb,
  HbButton,
  HbCard,
  HbCheckbox,
  HbCheckboxGroup,
  HbCollapse,
  HbDatePicker,
  HbDialog,
  HbEmpty,
  HbInput,
  HbInputNumber,
  HbLoading,
  HbMenu,
  HbMessage,
  HbNotification,
  HbPagination,
  HbRadio,
  HbRadioGroup,
  HbSelect,
  HbSlider,
  HbSteps,
  HbTable,
  HbTabs,
  HbTag,
  HbTextarea,
  HbThemeButton,
  HbTimeline,
  HbTooltip,
  HbTransfer,
  HbTree,
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
