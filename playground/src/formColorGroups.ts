export interface ColorRow {
  state: string
  part: string
  token: string
}

export interface ColorGroup {
  variant: string
  note?: string
  rows: ColorRow[]
}

const inputLikeBorder: ColorGroup = {
  variant: '输入框 / 触发器',
  rows: [
    { state: '默认', part: '背景', token: '--hb-el-bg' },
    { state: '禁用', part: '背景', token: '--hb-el-bg3' },
    { state: '默认', part: '描边', token: '--hb-el-border2' },
    { state: '悬停', part: '描边', token: '--hb-el-brand_hover' },
    { state: '聚焦', part: '描边', token: '--hb-el-brand_press' },
    { state: '错误', part: '描边', token: '--hb-el-danger' },
  ],
}

const fieldTitle: ColorGroup = {
  variant: '标题',
  note: '必填星号各状态不变。',
  rows: [
    { state: '默认', part: '标题图标 / 必填星号', token: '--hb-el-danger' },
    { state: '默认', part: '标题文本', token: '--hb-el-text' },
  ],
}

const fieldHint: ColorGroup = {
  variant: '提示',
  rows: [
    { state: '默认', part: '提示图标 / 文本', token: '--hb-el-disabled' },
    { state: '错误', part: '提示图标 / 文本', token: '--hb-el-danger' },
  ],
}

export const formColorGroups: Record<string, ColorGroup[]> = {
  HbInput: [
    fieldTitle,
    {
      ...inputLikeBorder,
      rows: [
        ...inputLikeBorder.rows,
        { state: '默认', part: '占位文本', token: '--hb-el-disabled' },
        { state: '默认', part: '输入文本', token: '--hb-el-text' },
        { state: '默认', part: '取消图标', token: '--hb-el-disabled' },
      ],
    },
    fieldHint,
  ],
  HbTextarea: [
    fieldTitle,
    {
      ...inputLikeBorder,
      rows: [
        ...inputLikeBorder.rows,
        { state: '默认', part: '占位文本', token: '--hb-el-disabled' },
        { state: '默认', part: '输入文本', token: '--hb-el-text' },
      ],
    },
    fieldHint,
  ],
  HbSelect: [
    fieldTitle,
    {
      variant: '触发器',
      rows: [
        ...inputLikeBorder.rows,
        { state: '默认', part: '占位 / 下拉图标', token: '--hb-el-disabled' },
      ],
    },
    {
      variant: '多选标签',
      rows: [
        { state: '已填充', part: '背景', token: '--hb-el-bg4' },
        { state: '已填充', part: '文本', token: '--hb-el-text' },
        { state: '悬停', part: '背景', token: '--hb-el-brand_hover' },
        { state: '悬停', part: '文本', token: '--hb-el-white' },
        { state: '聚焦', part: '背景', token: '--hb-el-brand_press' },
        { state: '聚焦', part: '文本', token: '--hb-el-white' },
      ],
    },
    {
      variant: '下拉面板 / 选项',
      rows: [
        { state: '默认', part: '面板背景', token: '--hb-el-bg' },
        { state: '默认', part: '面板描边', token: '--hb-el-border2' },
        { state: '默认', part: '选项文本', token: '--hb-el-text' },
        { state: '悬停', part: '选项背景', token: '--hb-el-brand_hover' },
        { state: '悬停', part: '选项文本', token: '--hb-el-white' },
        { state: '选中', part: '选项背景', token: '--hb-el-brand_press' },
        { state: '选中', part: '选项文本', token: '--hb-el-white' },
        { state: '禁用', part: '选项背景', token: '--hb-el-bg3' },
        { state: '禁用', part: '选项文本', token: '--hb-el-disabled' },
      ],
    },
    fieldHint,
  ],
  HbRadio: [
    {
      variant: '选项',
      rows: [
        { state: '默认', part: '选项文本', token: '--hb-el-text' },
        { state: '禁用', part: '选项文本', token: '--hb-el-disabled' },
        { state: '默认', part: '图标描边', token: '--hb-el-disabled' },
        { state: '悬停', part: '图标描边', token: '--hb-el-brand_hover' },
        { state: '选中 / 聚焦', part: '图标描边 / 填充', token: '--hb-el-brand_press' },
        { state: '选中', part: '内点', token: '--hb-el-white' },
        { state: '禁用', part: '图标', token: '--hb-el-disabled' },
      ],
    },
  ],
  HbCheckbox: [
    {
      variant: '选项',
      rows: [
        { state: '默认', part: '选项文本', token: '--hb-el-text' },
        { state: '禁用', part: '选项文本', token: '--hb-el-disabled' },
        { state: '默认', part: '图标描边', token: '--hb-el-disabled' },
        { state: '悬停', part: '图标描边', token: '--hb-el-brand_hover' },
        { state: '选中 / 聚焦', part: '图标填充', token: '--hb-el-brand_press' },
        { state: '选中', part: '勾选图标', token: '--hb-el-white' },
        { state: '禁用', part: '图标', token: '--hb-el-disabled' },
      ],
    },
  ],
  HbSlider: [
    {
      variant: '轨道 / 手柄',
      rows: [
        { state: '默认', part: '轨道未激活', token: '--hb-el-bg4' },
        { state: '默认', part: '轨道已激活', token: '--hb-el-brand' },
        { state: '聚焦', part: '轨道已激活', token: '--hb-el-brand_press' },
        { state: '禁用', part: '轨道已激活', token: '--hb-el-disabled' },
        { state: '默认', part: '手柄填充', token: '--hb-el-bg' },
        { state: '禁用', part: '手柄填充', token: '--hb-el-bg3' },
        { state: '默认', part: '手柄描边', token: '--hb-el-brand' },
        { state: '聚焦', part: '手柄描边', token: '--hb-el-brand_press' },
        { state: '禁用', part: '手柄描边', token: '--hb-el-border2' },
        { state: '默认', part: '刻度', token: '--hb-el-border2' },
        { state: '默认', part: '当前数值', token: '--hb-el-text' },
      ],
    },
  ],
  HbInputNumber: [
    fieldTitle,
    {
      variant: '输入框 / 步进',
      rows: [
        ...inputLikeBorder.rows,
        { state: '默认', part: '占位 / 增减图标', token: '--hb-el-disabled' },
        { state: '聚焦', part: '增减图标', token: '--hb-el-brand_press' },
        { state: '默认', part: '输入文本', token: '--hb-el-text' },
        { state: '禁用', part: '输入文本', token: '--hb-el-disabled' },
        { state: '默认', part: '分割线', token: '--hb-el-divider' },
      ],
    },
    fieldHint,
  ],
  HbDatePicker: [
    fieldTitle,
    {
      variant: '触发器',
      note: '色角色同 HbInput。',
      rows: [...inputLikeBorder.rows],
    },
    {
      variant: '面板',
      rows: [
        { state: '默认', part: '面板背景', token: '--hb-el-bg' },
        { state: '默认', part: '面板描边', token: '--hb-el-border2' },
        { state: '默认', part: '标题 / 当月日期 / 星期', token: '--hb-el-text' },
        { state: '默认', part: '其他月 / 占位', token: '--hb-el-disabled' },
        { state: '默认', part: '箭头', token: '--hb-el-disabled' },
        { state: '悬停', part: '箭头', token: '--hb-el-brand_hover' },
        { state: '聚焦', part: '箭头', token: '--hb-el-brand_press' },
        { state: '悬停', part: '日期描边', token: '--hb-el-brand_hover' },
        { state: '选中', part: '日期背景', token: '--hb-el-brand_press' },
        { state: '选中', part: '日期文本', token: '--hb-el-white' },
        { state: '范围', part: '区间背景', token: '--hb-el-brand_hover' },
        { state: '默认', part: '底部文字按钮', token: '--hb-el-brand' },
      ],
    },
    fieldHint,
  ],
  HbUpload: [
    {
      variant: '列表 / 进度',
      rows: [
        { state: '默认', part: '提示', token: '--hb-el-disabled' },
        { state: '默认', part: '附件图标', token: '--hb-el-brand' },
        { state: '默认', part: '附件名称', token: '--hb-el-text' },
        { state: '默认', part: '刷新 / 关闭图标', token: '--hb-el-disabled' },
        { state: '默认', part: '进度背景', token: '--hb-el-bg4' },
        { state: '默认', part: '进度当前', token: '--hb-el-brand' },
        { state: '失败', part: '进度当前', token: '--hb-el-danger' },
      ],
    },
    {
      variant: '拖拽区',
      rows: [
        { state: '默认', part: '背景', token: '--hb-el-bg' },
        { state: '默认', part: '虚线描边', token: '--hb-el-border2' },
        { state: '悬停', part: '描边', token: '--hb-el-brand' },
        { state: '禁用', part: '背景', token: '--hb-el-bg3' },
      ],
    },
  ],
  HbTransfer: [
    {
      variant: '列表',
      rows: [
        { state: '默认', part: '列表背景', token: '--hb-el-bg' },
        { state: '默认', part: '列表描边', token: '--hb-el-border2' },
        { state: '默认', part: '标题文本', token: '--hb-el-text' },
        { state: '默认', part: '条数副文本', token: '--hb-el-disabled' },
        { state: '默认', part: '分割线', token: '--hb-el-divider' },
      ],
    },
    {
      variant: '搜索框',
      rows: [
        { state: '默认', part: '背景', token: '--hb-el-bg' },
        { state: '禁用', part: '背景', token: '--hb-el-bg3' },
        { state: '默认', part: '描边', token: '--hb-el-border2' },
        { state: '悬停', part: '描边', token: '--hb-el-brand_hover' },
        { state: '聚焦', part: '描边', token: '--hb-el-brand_press' },
      ],
    },
    {
      variant: '选项',
      rows: [
        { state: '默认', part: '背景', token: '--hb-el-bg' },
        { state: '默认', part: '文本', token: '--hb-el-text' },
        { state: '悬停', part: '背景', token: '--hb-el-brand_hover' },
        { state: '悬停', part: '文本', token: '--hb-el-white' },
        { state: '选中', part: '背景', token: '--hb-el-brand_press' },
        { state: '选中', part: '文本', token: '--hb-el-white' },
        { state: '禁用', part: '背景', token: '--hb-el-bg3' },
        { state: '禁用', part: '文本', token: '--hb-el-disabled' },
      ],
    },
    {
      variant: '箭头按钮',
      rows: [
        { state: '默认', part: '背景', token: '--hb-el-bg' },
        { state: '默认', part: '描边', token: '--hb-el-border2' },
        { state: '默认', part: '图标', token: '--hb-el-disabled' },
        { state: '悬停', part: '描边', token: '--hb-el-brand_hover' },
        { state: '按下', part: '背景 / 描边', token: '--hb-el-brand_press' },
        { state: '按下', part: '图标', token: '--hb-el-white' },
        { state: '禁用', part: '背景', token: '--hb-el-bg3' },
        { state: '禁用', part: '描边', token: '--hb-el-border2' },
        { state: '禁用', part: '图标', token: '--hb-el-disabled' },
      ],
    },
  ],
}
