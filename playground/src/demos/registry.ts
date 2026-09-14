import type { Component } from 'vue'
import HbBadgeDemo from './HbBadgeDemo.vue'
import HbBreadcrumbDemo from './HbBreadcrumbDemo.vue'
import HbButtonDemo from './HbButtonDemo.vue'
import HbCardDemo from './HbCardDemo.vue'
import HbCheckboxDemo from './HbCheckboxDemo.vue'
import HbCollapseDemo from './HbCollapseDemo.vue'
import HbDatePickerDemo from './HbDatePickerDemo.vue'
import HbDialogDemo from './HbDialogDemo.vue'
import HbEmptyDemo from './HbEmptyDemo.vue'
import HbInputDemo from './HbInputDemo.vue'
import HbInputNumberDemo from './HbInputNumberDemo.vue'
import HbLoadingDemo from './HbLoadingDemo.vue'
import HbMenuDemo from './HbMenuDemo.vue'
import HbMessageDemo from './HbMessageDemo.vue'
import HbNotificationDemo from './HbNotificationDemo.vue'
import HbPaginationDemo from './HbPaginationDemo.vue'
import HbRadioDemo from './HbRadioDemo.vue'
import HbSelectDemo from './HbSelectDemo.vue'
import HbSliderDemo from './HbSliderDemo.vue'
import HbStepsDemo from './HbStepsDemo.vue'
import HbTableDemo from './HbTableDemo.vue'
import HbTabsDemo from './HbTabsDemo.vue'
import HbTagDemo from './HbTagDemo.vue'
import HbTextareaDemo from './HbTextareaDemo.vue'
import HbThemeButtonDemo from './HbThemeButtonDemo.vue'
import HbTimelineDemo from './HbTimelineDemo.vue'
import HbTooltipDemo from './HbTooltipDemo.vue'
import HbTransferDemo from './HbTransferDemo.vue'
import HbTreeDemo from './HbTreeDemo.vue'
import HbUploadDemo from './HbUploadDemo.vue'

/** 新增组件演示：在此登记 HbXxx → Demo；各 Demo 页按 catalog 顺序取子集出 tab */
export const componentDemos: Record<string, Component> = {
  HbBadge: HbBadgeDemo,
  HbBreadcrumb: HbBreadcrumbDemo,
  HbButton: HbButtonDemo,
  HbThemeButton: HbThemeButtonDemo,
  HbCard: HbCardDemo,
  HbCheckbox: HbCheckboxDemo,
  HbCollapse: HbCollapseDemo,
  HbDatePicker: HbDatePickerDemo,
  HbDialog: HbDialogDemo,
  HbEmpty: HbEmptyDemo,
  HbInput: HbInputDemo,
  HbInputNumber: HbInputNumberDemo,
  HbLoading: HbLoadingDemo,
  HbMenu: HbMenuDemo,
  HbMessage: HbMessageDemo,
  HbNotification: HbNotificationDemo,
  HbPagination: HbPaginationDemo,
  HbRadio: HbRadioDemo,
  HbSelect: HbSelectDemo,
  HbSlider: HbSliderDemo,
  HbSteps: HbStepsDemo,
  HbTable: HbTableDemo,
  HbTabs: HbTabsDemo,
  HbTag: HbTagDemo,
  HbTextarea: HbTextareaDemo,
  HbTimeline: HbTimelineDemo,
  HbTooltip: HbTooltipDemo,
  HbTransfer: HbTransferDemo,
  HbTree: HbTreeDemo,
  HbUpload: HbUploadDemo,
}

/** 表单页 tabs（catalog 顺序） */
export const formDemoNames = [
  'HbInput',
  'HbTextarea',
  'HbSelect',
  'HbRadio',
  'HbCheckbox',
  'HbSlider',
  'HbInputNumber',
  'HbDatePicker',
  'HbUpload',
  'HbTransfer',
] as const

/** 已从「组件 Demo」拆到独立顶栏页的组件 */
export const splitOutDemoNames = new Set<string>(['HbCard', 'HbThemeButton', ...formDemoNames])

/** 新增组件：独立页，顶部+侧栏 HbMenu 切换 */
export const extraDemoGroups = [
  {
    index: 'feedback',
    label: '反馈',
    items: [
      { name: 'HbMessage', label: '提示框' },
      { name: 'HbTooltip', label: '气泡提示' },
      { name: 'HbNotification', label: '通知卡片' },
      { name: 'HbLoading', label: '加载指示器' },
    ],
  },
  {
    index: 'nav',
    label: '导航',
    items: [
      { name: 'HbMenu', label: '导航栏' },
      { name: 'HbBreadcrumb', label: '面包屑' },
      { name: 'HbPagination', label: '页码' },
      { name: 'HbSteps', label: '步骤条' },
    ],
  },
  {
    index: 'container',
    label: '容器',
    items: [
      { name: 'HbCollapse', label: '折叠面板' },
    ],
  },
  {
    index: 'display',
    label: '展示',
    items: [
      { name: 'HbTable', label: '数据表格' },
      { name: 'HbTimeline', label: '时间轴' },
      { name: 'HbTree', label: '树形' },
      { name: 'HbTag', label: '标签' },
      { name: 'HbTabs', label: '页签' },
      { name: 'HbBadge', label: '徽标' },
      { name: 'HbEmpty', label: '缺省图' },
    ],
  },
]

export const extraDemoNames = extraDemoGroups.flatMap((group) =>
  group.items.map((item) => item.name),
)
