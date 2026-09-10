# HbThemeButton 按钮 · 公共组件文档

> 本文是合邦主题组件库**公共文档**的一部分：组件相互独立，各自的安装、Props、
> 颜色配置统一在 `docs/components/` 下定义；playground 的「按钮组件 Demo」页
> （`#/button-demo`）是本文的可视化实现。
>
> 状态：v1 · 最后更新 2026-09-10

## 1. 概览

独立自定义按钮（原生 `<button>` 实现，**不包装 ElButton**），提供：

| 维度 | 取值 | 说明 |
| --- | --- | --- |
| 类型 `variant` | `primary` / `secondary` / `secondary-dashed` / `neutral` / `neutral-dashed` | 主要 / 次要实线 / 次要虚线 / 中性实线 / 中性虚线 |
| 尺寸 `size` | `large` / `medium` / `small` | 数值见下表；**唯一定义处 = `@hebang/tokens` `buttonSizes`** |
| 圆角 `shape` | `default` / `round` | 常规 = 尺寸表「小圆角」列；胶囊 = `radii.round`（999px） |
| 状态 | 默认 / 悬停 / 点击 / 置灰 | 置灰 = `disabled`；悬停、点击另有演示强制态类（见 §5） |

### 尺寸规格表（默认值）

数值提取在 `packages/tokens/src/layout.ts` 的 `buttonSizes`，组件不写死——
改这张表 = 全库按钮尺寸同步变更；单个实例微调见 §6。

| 按钮类型 | 高度 | 文字大小 | 左右内边距 | 圆角（小圆角） |
| --- | --- | --- | --- | --- |
| 小型按钮 `small` | 24px | 12px | 8px | 4px（`radii.base`） |
| 标准按钮 `medium` | 32px | 14px | 16px | 4px |
| 大型按钮 `large` | 40px | 16px | 24px | 4px |

另有图标与文字间距 `gap`（4 / 6 / 8px，设计稿未列、组件经验值），同表维护。

## 2. 引入

```bash
pnpm add @hebang/components @hebang/theme element-plus vue
```

```ts
import { HbThemeButton } from '@hebang/components' // 或 app.use(HbComponents) 全量注册

import 'element-plus/dist/index.css'
import '@hebang/theme/style'        // 主题变量（--hb-* / --hb-el-* / --el-*）
import '@hebang/components/style'
```

> **颜色不单定义**：组件不携带任何主题色（无 `--el-*` 回退、无裸 hex），
> 每个颜色都是对 OKLCH 规则引擎产出令牌 `--hb-el-xxx` 的直接引用；悬停/点击/置灰
> 的档位逻辑与明暗翻转由引擎绑定表（`elTokens.ts`）统一定义，换主色、切深色模式
> 组件零改动。因此 `@hebang/theme`（或运行时 `applyTheme`）是按钮的**前置依赖**，
> 未引入主题包时颜色为空。

## 3. Props / 事件 / 槽位

```ts
interface HbThemeButtonProps {
  variant?: 'primary' | 'secondary' | 'secondary-dashed' | 'neutral' | 'neutral-dashed' // 默认 primary
  size?: 'large' | 'medium' | 'small'   // 默认 medium
  shape?: 'default' | 'round'           // 默认 default
  disabled?: boolean                    // 置灰状态，默认 false
}
```

- 事件：`@click="fn"`（原生 click 透传，disabled 时浏览器不触发）
- 槽位：默认插槽 = 文字；`#icon` = 图标槽。
  **图标颜色恒等于文字颜色**（槽位容器继承 `currentColor`，SVG 请用
  `fill="currentColor"` 或描边 `stroke="currentColor"`）。

## 4. 颜色配置（唯一权威表）

本表不含任何独立色值定义——每一格都是对规则引擎令牌的引用：token 来自
`hb-el` 绑定表（`packages/tokens/src/elTokens.ts`），档位来源 = `@hebang/tokens`
派生引擎的 `hb-xxxx` 颜色（档位名括注），明暗模式由绑定表自动翻转。
悬停/点击档位按引擎约定为 tonal 序列 index 3 / index 5。

| 类型 | 状态 | 作用部位 | token | 档位（light） |
| --- | --- | --- | --- | --- |
| 主要按钮 | 默认 | 背景 / 边框 | `--hb-el-brand` | brand_4 |
| | | 文字 / 图标 | `--hb-el-white` | fixed #fff |
| | 悬停 | 背景 / 边框 | `--hb-el-brand_hover` | brand_3 |
| | 点击 | 背景 / 边框 | `--hb-el-brand_press` | brand_5 |
| | 置灰 | 背景 / 边框 | `--hb-el-disabled` | neutral_7 |
| | | 文字 / 图标 | `--hb-el-white`（置灰豁免对比度校验） | fixed #fff |
| 次要实线 | 默认 | 文字 / 图标 / 边框 | `--hb-el-brand`（边框实线） | brand_4 |
| | 悬停 | 文字 / 图标 / 边框 | `--hb-el-brand_hover` | brand_3 |
| | 点击 | 文字 / 图标 / 边框 | `--hb-el-brand_press` | brand_5 |
| | 置灰 | 文字 / 图标 / 边框 | `--hb-el-disabled` | neutral_7 |
| 次要虚线 | 同上 | 同上 | 同上，仅 `border-style: dashed` | — |
| 中性实线 | 默认 | 文字 / 图标 | `--hb-el-text` | neutral_13 |
| | | 边框 | `--hb-el-text`（实线） | neutral_13 |
| | 悬停 | 文字 / 图标 / 边框 | `--hb-el-brand` ※ | brand_4 |
| | 点击 | 文字 / 图标 / 边框 | `--hb-el-brand_press` ※ | brand_5 |
| | 置灰 | 文字 / 图标 / 边框 | `--hb-el-disabled` | neutral_7 |
| 中性虚线 | 默认 | 文字 / 图标 | `--hb-el-text` | neutral_13 |
| | | 边框 | `--hb-el-border2`（虚线，**中性色/neutral_5**） | neutral_5 |
| | 悬停 / 点击 / 置灰 | | 同中性实线 ※ | |

※ **待设计确认**：设计稿列表未覆盖中性款的悬停/点击色，组件暂按「悬停统一到
主题色、点击取主题点击色」实现（与企业系统常见约定一致）。如需调整，只改
`HbThemeButton.vue` 中标注的两处 neutral hover/active 块。

其他约定：

- 深色模式无需组件做任何事：`--hb-el-*` 由绑定表按 dark 档自动翻转。
- 规范 §8/§9：主要按钮文字为自适应黑/白的候选位。当前默认白字；若品牌色偏亮
  （黄/绿系）出现对比不足，按 `docs/实现说明.md` §7-6 的方案用
  `textColorOn()` 注入覆盖变量（见 §6），暂不默认开启。
- 键盘焦点环：`--hb-el-brand` 25% 混色 box-shadow，仅 `:focus-visible`。

## 5. 演示强制态

文档/演示页需要平铺展示悬停、点击效果时，直接加类（真实交互不依赖它们）：

```html
<HbThemeButton class="is-hover" />   <!-- 等效 :hover -->
<HbThemeButton class="is-active" />  <!-- 等效 :active -->
```

## 6. 可覆盖 CSS 变量

组件颜色只有一个出口——内部钩子变量，业务覆盖时**只写 token，不写裸色值**：

```scss
.my-submit-btn {
  --hb-btn-fg: var(--hb-el-white);       // 文字/图标
  --hb-btn-bg: var(--hb-el-success);     // 背景
  --hb-btn-border: var(--hb-el-success); // 边框色
  --hb-btn-border-style: dashed;         // 线型
}
```

尺寸钩子 `--hb-btn-height / --hb-btn-font-size / --hb-btn-padding-x /
--hb-btn-gap / --hb-btn-radius` 由组件脚本从 `buttonSizes` 注入（内联 style）。
全库改尺寸 → 改 `buttonSizes`；单实例微调 → 把变量直接写在标签 `style` 上
（style 属性优先于组件注入的同名变量）：

```html
<HbThemeButton style="--hb-btn-height: 36px; --hb-btn-radius: 6px">
  加高微调
</HbThemeButton>
```

## 7. 文件地图

| 内容 | 路径 |
| --- | --- |
| 组件实现 | `packages/components/src/components/HbThemeButton/HbThemeButton.vue` |
| Props 类型 | `packages/components/src/types.ts`（`HbThemeButtonProps`） |
| 尺寸数值 | `packages/tokens/src/layout.ts`（`buttonSizes`，改尺寸只动这里） |
| token 定义 | `packages/tokens/src/elTokens.ts`（绑定表）、`palette.ts`（档位） |
| 演示页 | `playground/src/views/ButtonDemoView.vue`（hash 路由 `#/button-demo`） |
