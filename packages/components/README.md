# @hebang/components

基于 Element Plus 的合邦二次封装组件库（Vue 3）。

## 安装与引入

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import HbComponents from '@hebang/components'

import 'element-plus/dist/index.css'
import '@hebang/theme/style' // 主题
import '@hebang/components/style' // 组件库样式

createApp(App).use(ElementPlus).use(HbComponents).mount('#app')
```

按需引入具名导出即可：`import { HbButton, HbInput, HbSelect } from '@hebang/components'`。

设计还原 / AI 匹配用的组件目录：[`catalog.json`](./catalog.json)。新增组件时追加一条即可，不必改 Skill。

## 组件清单

| 组件 | 包装的 EP 组件 | 增量能力 |
| --- | --- | --- |
| `HbButton` | `ElButton` | `block` 通栏、令牌驱动的尺寸/字重 |
| `HbCard` | — | 大/中/小标题栏、14/16/20/24 标题字号、图标/操作区插槽、描边/投影/圆角开关 |
| `HbDialog` | `ElDialog` | 内置确认/取消 footer、`confirm/cancel` 事件 |
| `HbInput` | `ElInput` | 单行/密码；标题对齐/必填星号、清除、提示；状态走 `--hb-el-*` |
| `HbTextarea` | `ElInput[type=textarea]` | 多行，最小高 64px，聚焦/错误 2px 描边 |
| `HbSelect` | `ElSelect` | 下拉；选项悬停 brand_hover+白字，选中 brand_press+白字 |
| `HbRadio` / `HbRadioGroup` | `ElRadio` | 16px 单选；默认 disabled，悬停 brand_hover，选中 brand_press |
| `HbCheckbox` / `HbCheckboxGroup` | `ElCheckbox` | 16px 复选；色角色同单选 |
| `HbSlider` | `ElSlider` | 轨道 4px、手柄 16/20；未激活 bg4，激活 brand |
| `HbInputNumber` | `ElInputNumber` | 数字步进 32×120；聚焦描边/图标 brand_press |
| `HbDatePicker` | `ElDatePicker` / `ElTimePicker` | 日期/时间；选中格 brand_press+白字 |
| `HbUpload` | `ElUpload` | 按钮 108×32 / 拖拽 400×200；进度 brand，失败 danger |
| `HbTransfer` | `ElTransfer` | 穿梭 240×320；悬停 brand_hover+白字，按下 brand_press+白字 |

## 新增组件约定

- 目录：`src/components/HbXxx/HbXxx.vue`，props 类型放 `src/types.ts`
- `defineOptions({ name: 'HbXxx' })` 保证全量注册可用
- 样式一律走 `var(--el-*)` / `--hb-*`，不硬编码颜色
- 追加 `catalog.json` 一条（复制 `meta.entryTemplate`）
