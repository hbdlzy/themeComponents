# @hebang/tokens

合邦设计令牌包。**色彩部分严格实现《OKLCH 取色与应用规范》**：唯一系统输入是主色
HEX + 模式（light/dark）+ 中性类型（tinted/pure），所有颜色由派生引擎生成，
令牌命名统一为 `hb-xxxx`。

```ts
import { buildHbPalette, buildHbCssVars, contrastRatio, textColorOn } from '@hebang/tokens'

const palette = buildHbPalette('#1F5AA8', { mode: 'light' })
palette.named['hb-brand']          // '#1F5AA8'
palette.ramps.brand               // 9 档 tonal 序列（第 4 档 = 主色）
palette.neutral                   // 15 档中性色
palette.chart                     // 12 档图表色（黄金角 137.508°）
buildHbCssVars(palette)           // { '--hb-brand': '#1F5AA8', ... }
```

- `oklch.ts`：HEX ⇄ sRGB ⇄ OKLab ⇄ OKLCH、色域二分裁剪、safeMaxChroma、
  WCAG 对比度（§8 `textColorOn` 黑/白自适应）。
- `palette.ts`：品牌/功能色/container/tonal/中性 15 档（含暗色镜像翻转）/
  neutralVariant/图表/states/语义 token 映射（§6），常量表见 `HB_PALETTE_CONFIG`。
- 布局类令牌（spacing/radii/fontSize…）仍是静态定义。

## SCSS 输出

构建时由脚本从 JS 产物自动生成（勿手改 dist）：

- `@hebang/tokens/scss/variables` —— 布局变量 + 默认主色 light 调色板（$hb-xxxx）
- `@hebang/tokens/scss/palette-dark` —— dark 模式对照

```scss
@use "@hebang/tokens/scss/variables" as *;

.panel {
  color: $hb-text-primary;
  background: $hb-surface-container;
}
```

新增/调整颜色：改 `src/palette.ts` 或规范常量，重跑 `pnpm build` 即可。
