# @hebang/theme

合邦 Element Plus 主题适配包。色彩生成规则委托 `@hebang/tokens` 的
**OKLCH 派生引擎**（《OKLCH 取色与应用规范》），本包提供 `hb-xxxx` 令牌 →
Element Plus `--el-*` 变量的映射。

## 静态引入

在 `element-plus/dist/index.css` 之后引入（构建期由引擎生成，含 `:root` 与
`html.dark` 两套变量）：

```ts
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css' // 暗色需要
import '@hebang/theme/style'
```

## 运行时换肤

```ts
import { buildThemeVars, applyTheme } from '@hebang/theme'

// 任意主色进，全套 --hb-* + --el-* 变量出
applyTheme(buildThemeVars('#2FA46A', { mode: 'light' }))
document.documentElement.classList.toggle('dark', false)
```

`buildElementPlusVars(named)` 暴露映射表本体，业务方可按需取子集：

| --el-* | ← hb-xxxx |
| --- | --- |
| color-primary / light-3..9 / dark-2 | hb-brand 与 tonal 序列档位（light-3←ramp3, light-5←ramp2, light-7/8←ramp1/0, light-9←ramp0, dark-2←ramp5） |
| color-success/warning/danger/info(+light-9) | 功能色基准 / container |
| text-color-primary/regular/secondary/placeholder | hb-text-primary/body/secondary/muted |
| border-color(+light/lighter/extra-light) | hb-border-2 / border / stripe / content |
| fill-color(-light/-lighter) / bg-color(-page/-overlay) | hb-hover / stripe / content / surface-container / surface |

## SCSS 源码

- `@hebang/theme/scss/variables` —— 引擎生成的 $hb-xxxx 变量 + EP 官方链路别名
- `@hebang/theme/scss/palette-dark` —— dark 对照
- `@hebang/theme/scss/element-plus` —— 进阶：配合 EP 官方 SCSS 链路重编译 theme-chalk
