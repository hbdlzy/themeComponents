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

按需引入具名导出即可：`import { HbButton, HbCard, HbDialog, HbInput } from '@hebang/components'`。

设计还原 / AI 匹配用的组件目录：[`catalog.json`](./catalog.json)。新增组件时追加一条即可，不必改 Skill。

## 组件清单

| 组件 | 包装的 EP 组件 | 增量能力 |
| --- | --- | --- |
| `HbButton` | `ElButton` | `block` 通栏、令牌驱动的尺寸/字重 |
| `HbCard` | — | 大/中/小标题栏、14/16/20/24 标题字号、图标/操作区插槽、描边/投影/圆角开关 |
| `HbDialog` | `ElDialog` | 内置确认/取消 footer、`confirm/cancel` 事件 |
| `HbInput` | `ElInput` | 标题对齐/必填星号、清除、提示；默认/悬停/聚焦/错误/禁用/已填充走 `--hb-el-*` |

## 新增组件约定

- 目录：`src/components/HbXxx/HbXxx.vue`，props 类型放 `src/types.ts`
- `defineOptions({ name: 'HbXxx' })` 保证全量注册可用
- 样式一律走 `var(--el-*)` / `--hb-*`，不硬编码颜色
- 追加 `catalog.json` 一条（复制 `meta.entryTemplate`）
