export interface NavItem {
  id: string
  en: string
  zh: string
  aliases?: string[]
}

export interface NavGroup {
  id: string
  en: string
  zh: string
  items: NavItem[]
}

/** 文档侧栏：分组标题「En 中文」，条目「En 中文」，和 Element Plus 文档同一套信息架构 */
export const navGroups: NavGroup[] = [
  {
    id: 'guide',
    en: 'Guide',
    zh: '指南',
    items: [
      { id: 'tokens', en: 'Tokens', zh: '规则引擎', aliases: ['theme-rules'] },
      { id: 'usage', en: 'Usage', zh: '使用方法', aliases: ['guide'] },
      { id: 'rule-add', en: 'New Rule', zh: '新建规则', aliases: ['new-rule'] },
    ],
  },
  {
    id: 'basic',
    en: 'Basic',
    zh: '基础',
    items: [
      { id: 'button', en: 'Button', zh: '按钮', aliases: ['button-demo', 'HbThemeButton'] },
      { id: 'HbButton', en: 'Button', zh: '封装按钮' },
      { id: 'card', en: 'Card', zh: '卡片', aliases: ['HbCard'] },
      { id: 'HbDialog', en: 'Dialog', zh: '对话框' },
    ],
  },
  {
    id: 'form',
    en: 'Form',
    zh: '表单',
    items: [
      { id: 'HbInput', en: 'Input', zh: '输入框' },
      { id: 'HbTextarea', en: 'Textarea', zh: '多行输入' },
      { id: 'HbInputNumber', en: 'Input Number', zh: '数字输入框' },
      { id: 'HbSelect', en: 'Select', zh: '选择器' },
      { id: 'HbRadio', en: 'Radio', zh: '单选框' },
      { id: 'HbCheckbox', en: 'Checkbox', zh: '复选框' },
      { id: 'HbSlider', en: 'Slider', zh: '滑块' },
      { id: 'HbDatePicker', en: 'Date Picker', zh: '日期选择器' },
      { id: 'HbUpload', en: 'Upload', zh: '上传' },
      { id: 'HbTransfer', en: 'Transfer', zh: '穿梭框' },
    ],
  },
  {
    id: 'data',
    en: 'Data',
    zh: '数据展示',
    items: [
      { id: 'HbTable', en: 'Table', zh: '表格' },
      { id: 'HbTimeline', en: 'Timeline', zh: '时间轴' },
      { id: 'HbTree', en: 'Tree', zh: '树形控件' },
      { id: 'HbTag', en: 'Tag', zh: '标签' },
      { id: 'HbTabs', en: 'Tabs', zh: '标签页' },
      { id: 'HbBadge', en: 'Badge', zh: '徽章' },
      { id: 'HbEmpty', en: 'Empty', zh: '空状态' },
    ],
  },
  {
    id: 'navigation',
    en: 'Navigation',
    zh: '导航',
    items: [
      { id: 'HbMenu', en: 'Menu', zh: '导航菜单' },
      { id: 'HbBreadcrumb', en: 'Breadcrumb', zh: '面包屑' },
      { id: 'HbPagination', en: 'Pagination', zh: '分页' },
      { id: 'HbSteps', en: 'Steps', zh: '步骤条' },
    ],
  },
  {
    id: 'feedback',
    en: 'Feedback',
    zh: '反馈',
    items: [
      { id: 'HbMessage', en: 'Message', zh: '消息提示' },
      { id: 'HbTooltip', en: 'Tooltip', zh: '文字提示' },
      { id: 'HbNotification', en: 'Notification', zh: '通知' },
      { id: 'HbLoading', en: 'Loading', zh: '加载' },
    ],
  },
  {
    id: 'others',
    en: 'Others',
    zh: '其它',
    items: [{ id: 'HbCollapse', en: 'Collapse', zh: '折叠面板' }],
  },
]

export const specialPageIds = new Set(['tokens', 'usage', 'rule-add', 'button', 'card'])

export function findNavItem(id: string): NavItem | undefined {
  for (const group of navGroups) {
    const hit = group.items.find((item) => item.id === id || item.aliases?.includes(id))
    if (hit) return hit
  }
  return undefined
}

export function resolveNavId(hash: string): string {
  const raw = hash.replace(/^#\/?/, '')
  const id = raw.startsWith('more/') ? raw.slice(5) : raw
  if (!id || id === 'demo') return 'button'
  if (id === 'form') return 'HbInput'
  if (id === 'more') return 'HbMessage'
  return findNavItem(id)?.id ?? (id || 'button')
}
