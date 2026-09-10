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
  value: string | number | boolean
  disabled?: boolean
}

export interface HbSelectProps extends HbFieldChrome {
  modelValue?: string | number | boolean | Array<string | number | boolean>
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
  modelValue?: Array<string | number | boolean>
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
  modelValue?: string | number | Date | Array<string | number | Date>
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
