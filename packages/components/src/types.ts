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
