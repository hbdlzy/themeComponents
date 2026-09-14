import { ElMessage, ElNotification } from 'element-plus'
import type { HbStatusType } from '../../types'

const typeMap: Record<HbStatusType, 'success' | 'warning' | 'error' | 'info'> = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
}

/** 全局提示：白底、图标走功能色，3 秒关闭 */
export const hbMessage = {
  success(message: string): void {
    ElMessage({ type: 'success', message, customClass: 'hb-message', duration: 3000 })
  },
  warning(message: string): void {
    ElMessage({ type: 'warning', message, customClass: 'hb-message', duration: 3000 })
  },
  error(message: string): void {
    ElMessage({ type: 'error', message, customClass: 'hb-message', duration: 3000 })
  },
  info(message: string): void {
    ElMessage({ type: 'info', message, customClass: 'hb-message', duration: 3000 })
  },
}

/** 通知卡片：右上角浮层 */
export const hbNotify = {
  open(options: { title?: string; message?: string; type?: HbStatusType }): void {
    ElNotification({
      title: options.title ?? '',
      message: options.message ?? '',
      type: options.type ? typeMap[options.type] : 'info',
      customClass: 'hb-notification-toast',
      duration: 5000,
    })
  },
  success(title: string, message = ''): void {
    hbNotify.open({ title, message, type: 'success' })
  },
  warning(title: string, message = ''): void {
    hbNotify.open({ title, message, type: 'warning' })
  },
  error(title: string, message = ''): void {
    hbNotify.open({ title, message, type: 'error' })
  },
  info(title: string, message = ''): void {
    hbNotify.open({ title, message, type: 'info' })
  },
}
