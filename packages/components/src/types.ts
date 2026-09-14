/** 组件公共类型：与 SFC 分离声明，便于 index.ts 稳定地对外再导出 */

export type HbButtonType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'default'

export interface HbButtonProps {
  /** 视觉类型，default 会映射为 Element Plus 的默认按钮 */
  type?: HbButtonType
  size?: 'small' | 'default' | 'large'
  /** 通栏按钮：撑满容器宽度，常用于表单底部、移动端 */
  block?: boolean
  loading?: boolean
  disabled?: boolean
}

/** HbThemeButton 的五种类型（设计稿口径：主要 / 次要实线 / 次要虚线 / 中性实线 / 中性虚线） */
export type HbThemeButtonVariant =
  | 'primary'
  | 'secondary'
  | 'secondary-dashed'
  | 'neutral'
  | 'neutral-dashed'

/** 尺寸：大 / 中 / 小（数值定义在 @hebang/tokens buttonSizes：40/32/24 高） */
export type HbThemeButtonSize = 'large' | 'medium' | 'small'

/** 圆角：default = 常规圆角，round = 胶囊圆角 */
export type HbThemeButtonShape = 'default' | 'round'

export interface HbThemeButtonProps {
  /** 按钮类型，默认 primary */
  variant?: HbThemeButtonVariant
  /** 尺寸，默认 medium */
  size?: HbThemeButtonSize
  /** 圆角形态，默认 default（4px 常规圆角） */
  shape?: HbThemeButtonShape
  /** 置灰（禁用）状态 */
  disabled?: boolean
}

export interface HbDialogProps {
  modelValue: boolean
  title?: string
  width?: string | number
  /** 是否展示底部确认/取消按钮 */
  showFooter?: boolean
  confirmText?: string
  cancelText?: string
  confirmLoading?: boolean
}

/** 卡片尺寸：大 / 中 / 小，对应标题栏高 64 / 56 / 48 */
export type HbCardSize = 'large' | 'medium' | 'small'

/** 卡片标题字号 */
export type HbCardTitleSize = 14 | 16 | 20 | 24

export interface HbCardProps {
  /** 标题文本；也可用 title 插槽自定义 */
  title?: string
  /** 大 / 中 / 小，对应标题栏高 64 / 56 / 48 */
  size?: HbCardSize
  /** 标题字号 14 / 16 / 20 / 24，图标尺寸跟随该字号 */
  titleSize?: HbCardTitleSize
  /** 标题前图标显隐 */
  showIcon?: boolean
  /** 面板描边，颜色 --hb-el-border */
  bordered?: boolean
  /** 面板投影 */
  shadow?: boolean
  /** 面板圆角（8px） */
  round?: boolean
  /** 标题栏底部分割线，颜色 --hb-el-divider */
  divided?: boolean
  /** 卡片宽度，默认撑满父级 */
  width?: string | number
}

export type HbInputSize = 'small' | 'default' | 'large'

export type HbInputLabelAlign = 'left' | 'right' | 'center'

export type HbInputStatus = 'default' | 'error'

export type HbInputType = 'text' | 'password'

/** 演示用：把 :hover / :focus-within 冻成静态态 */
export type HbInputPreview = 'hover' | 'focus'

export interface HbFieldChrome {
  label?: string
  labelAlign?: HbInputLabelAlign
  required?: boolean
  hint?: string
  disabled?: boolean
  status?: HbInputStatus
  width?: string | number
}

export interface HbInputProps extends HbFieldChrome {
  modelValue?: string | number
  placeholder?: string
  size?: HbInputSize
  type?: HbInputType
  /** 是否展示取消图标（设计默认常显，色不随状态变） */
  clearable?: boolean
  /** 密码框明文切换，type=password 时默认 true */
  showPassword?: boolean
  /** 仅 playground 状态墙：强制悬停/聚焦描边 */
  preview?: HbInputPreview
}

export interface HbTextareaProps extends HbFieldChrome {
  modelValue?: string
  placeholder?: string
  rows?: number
  autosize?: boolean | { minRows?: number; maxRows?: number }
  maxlength?: number
  showWordLimit?: boolean
}

export interface HbSelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface HbSelectProps extends HbFieldChrome {
  modelValue?: string | number | Array<string | number>
  options?: HbSelectOption[]
  placeholder?: string
  size?: HbInputSize
  multiple?: boolean
  filterable?: boolean
  clearable?: boolean
}

export interface HbRadioProps {
  value?: string | number | boolean
  disabled?: boolean
  size?: HbInputSize
}

export interface HbRadioGroupProps {
  modelValue?: string | number | boolean
  disabled?: boolean
  options?: HbSelectOption[]
}

export interface HbCheckboxProps {
  value?: string | number | boolean
  disabled?: boolean
  size?: HbInputSize
  indeterminate?: boolean
}

export interface HbCheckboxGroupProps {
  modelValue?: Array<string | number>
  disabled?: boolean
  options?: HbSelectOption[]
}

export interface HbSliderProps {
  modelValue?: number | [number, number]
  min?: number
  max?: number
  step?: number
  range?: boolean
  disabled?: boolean
  showStops?: boolean
  width?: string | number
}

export interface HbInputNumberProps extends HbFieldChrome {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  size?: HbInputSize
  placeholder?: string
}

export type HbDatePickerType =
  | 'date'
  | 'daterange'
  | 'datetime'
  | 'datetimerange'
  | 'time'

export interface HbDatePickerProps extends HbFieldChrome {
  modelValue?: string | number | Date | string[] | number[] | Date[] | null
  type?: HbDatePickerType
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  size?: HbInputSize
  clearable?: boolean
}

export type HbUploadMode = 'button' | 'drag'

export interface HbUploadProps {
  mode?: HbUploadMode
  disabled?: boolean
  limit?: number
  accept?: string
  dragText?: string
  buttonText?: string
}

export interface HbTransferItem {
  key: string | number
  label: string
  disabled?: boolean
}

export interface HbTransferProps {
  modelValue?: Array<string | number>
  data?: HbTransferItem[]
  titles?: [string, string]
  filterable?: boolean
  disabled?: boolean
}

export type HbStatusType = 'success' | 'warning' | 'error' | 'info'

export interface HbMessageProps {
  type?: HbStatusType
  title?: string
  closable?: boolean
  /** 系统提示：浅底描边；全局提示走 hbMessage() */
  description?: string
}

export type HbTooltipEffect = 'light' | 'dark'

export interface HbTooltipProps {
  content?: string
  effect?: HbTooltipEffect
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

export interface HbNotificationProps {
  title?: string
  message?: string
  type?: HbStatusType
  closable?: boolean
}

export type HbLoadingMode = 'spinner' | 'circle' | 'progress' | 'skeleton'

export interface HbLoadingProps {
  mode?: HbLoadingMode
  percentage?: number
  text?: string
  title?: string
}

export interface HbMenuItem {
  index: string
  label: string
  disabled?: boolean
  children?: HbMenuItem[]
}

export interface HbMenuProps {
  mode?: 'horizontal' | 'vertical'
  modelValue?: string
  items?: HbMenuItem[]
  collapse?: boolean
}

export interface HbBreadcrumbItem {
  label: string
  to?: string
}

export interface HbBreadcrumbProps {
  items?: HbBreadcrumbItem[]
}

export interface HbPaginationProps {
  currentPage?: number
  pageSize?: number
  total?: number
  pageSizes?: number[]
  disabled?: boolean
}

export interface HbStepItem {
  title: string
  description?: string
}

export interface HbStepsProps {
  active?: number
  items?: HbStepItem[]
  direction?: 'horizontal' | 'vertical'
}

export type HbCollapseSize = 'large' | 'medium' | 'small'

export interface HbCollapseItem {
  name: string
  title: string
  disabled?: boolean
}

export interface HbCollapseProps {
  modelValue?: string | string[]
  items?: HbCollapseItem[]
  accordion?: boolean
  size?: HbCollapseSize
}

export interface HbTableColumn {
  prop: string
  label: string
  width?: string | number
}

export type HbTableSize = 'compact' | 'loose'

export interface HbTableProps {
  data?: Record<string, unknown>[]
  columns?: HbTableColumn[]
  stripe?: boolean
  border?: boolean
  /** compact 行高 40px，loose 行高 56px */
  size?: HbTableSize
}

export type HbTimelineStatus = 'default' | 'primary' | 'success' | 'warning' | 'danger'

export interface HbTimelineItem {
  timestamp?: string
  content?: string
  type?: HbTimelineStatus
}

export interface HbTimelineProps {
  items?: HbTimelineItem[]
}

export interface HbTreeNode {
  id?: string
  label: string
  disabled?: boolean
  children?: HbTreeNode[]
}

export interface HbTreeProps {
  data?: HbTreeNode[]
  defaultExpandAll?: boolean
}

export type HbTagVariant = 'outlined' | 'light' | 'solid'
export type HbTagStatus = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

export interface HbTagProps {
  variant?: HbTagVariant
  status?: HbTagStatus
  closable?: boolean
}

export interface HbTabItem {
  name: string
  label: string
  disabled?: boolean
}

export interface HbTabsProps {
  modelValue?: string
  items?: HbTabItem[]
}

export type HbBadgeType = 'primary' | 'success' | 'warning' | 'danger'

export interface HbBadgeProps {
  value?: string | number
  max?: number
  type?: HbBadgeType
  hidden?: boolean
}

export type HbEmptyKind =
  | 'data'
  | 'content'
  | 'message'
  | 'address'
  | 'search'
  | 'record'
  | 'favorite'
  | 'auth'
  | 'network'
  | 'building'

export interface HbEmptyProps {
  kind?: HbEmptyKind
  description?: string
}
