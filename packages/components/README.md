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

按需引入具名导出即可：`import { HbButton, HbDialog } from '@hebang/components'`。

## 组件清单

| 组件 | 包装的 EP 组件 | 增量能力 |
| --- | --- | --- |
| `HbButton` | `ElButton` | `block` 通栏、令牌驱动的尺寸/字重 |
| `HbDialog` | `ElDialog` | 内置确认/取消 footer、`confirm/cancel` 事件 |

## 新增组件约定

- 目录：`src/components/HbXxx/HbXxx.vue`，props 类型放 `src/types.ts`
- `defineOptions({ name: 'HbXxx' })` 保证全量注册可用
- 样式一律走 `var(--el-*)` / `--hb-*`，不硬编码颜色
