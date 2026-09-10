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

/** 演示用：把 :hover / :focus-within 冻成静态态 */
export type HbInputPreview = 'hover' | 'focus'

export interface HbInputProps {
  modelValue?: string | number
  /** 标题文案；空则不渲染标题行 */
  label?: string
  labelAlign?: HbInputLabelAlign
  /** 标题前必填星号，颜色 --hb-el-danger */
  required?: boolean
  placeholder?: string
  hint?: string
  disabled?: boolean
  /** error 时描边/提示走 --hb-el-danger */
  status?: HbInputStatus
  size?: HbInputSize
  /** 是否展示取消图标（设计默认常显，色不随状态变） */
  clearable?: boolean
  /** 默认 240px，可改成百分比如 100% */
  width?: string | number
  /** 仅 playground 状态墙：强制悬停/聚焦描边 */
  preview?: HbInputPreview
}
