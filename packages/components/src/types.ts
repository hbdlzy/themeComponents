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
