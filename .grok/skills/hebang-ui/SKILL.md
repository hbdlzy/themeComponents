---
name: hebang-ui
description: 用合邦组件库搭建 Vue 项目或按 UI 图生成页面。先安装依赖，再读 @hebang/components 的 catalog.json，有对应组件用 HbXxx，没有用 Element Plus。用于搭合邦业务项目、读 UI 图、生成页面。
when-to-use: 搭建合邦业务项目、读 UI 图生成页面、使用合邦组件、安装 @hebang/components
---

# 合邦组件（业务项目）

给**业务项目**用。不改合邦组件库，不往 catalog 里加组件。名单以 catalog 为准，本文件不写死组件名。

## 1. 安装依赖

没有这些包就先装：

```bash
npm i vue element-plus @hebang/theme @hebang/components
```

入口按这个顺序写：

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import HbComponents from '@hebang/components'

import 'element-plus/dist/index.css'
import '@hebang/theme/style'
import '@hebang/components/style'

createApp(App).use(ElementPlus).use(HbComponents).mount('#app')
```

## 2. 读这个文件

每次先读 catalog 全文：

- 业务项目：`node_modules/@hebang/components/catalog.json`
- 也可：`import catalog from '@hebang/components/catalog.json'`

只认这个文件里的 `components`。不要凭记忆点名。

## 3. 逻辑

对 UI 里的每一块：

1. `match` 命中，且不落 `antiMatch` → `import { HbXxx } from '@hebang/components'`，按该条目的 props / slots 用。
2. 没有命中 → 用 Element Plus 的 `ElXxx`。不要换别的 UI 库。
3. 不要用 div 把清单里已有的组件再画一遍。

匹配看结构，不看颜色或圆角。颜色只用 `var(--hb-el-*)` / `var(--hb-*)` / `var(--el-*)`。
