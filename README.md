# themeComponents

合邦主题组件库：基于 Element Plus 的企业主题包 + Vue 3 二次封装组件库（pnpm workspace monorepo）。

> **完整实现说明（色彩规则、绑定表、验证命令、已知坑）见 [docs/实现说明.md](docs/实现说明.md)**，供开发者与 AI 助手阅读。

## 包结构

| 包 | 说明 |
| --- | --- |
| [`@hebang/tokens`](packages/tokens) | 设计令牌单一数据源，产出 JS 对象（ESM/CJS）+ SCSS 变量 |
| [`@hebang/theme`](packages/theme) | Element Plus 主题适配：CSS 变量覆盖产物 `dist/index.css` + SCSS 源码 `dist/scss/*` |
| [`@hebang/components`](packages/components) | Vue 3 二次封装组件（HbButton、HbDialog …）+ 独立自定义组件（HbThemeButton），ESM/CJS + 类型 + CSS |
| `playground` | 本地调试用演示应用（不发布）：`#/demo` 组件 Demo、`#/tokens` 规则引擎总览、`#/button-demo` 按钮组件 Demo |

## 公共组件文档

组件相互独立，各自的使用方法（Props、颜色配置、示例）统一定义在
[`docs/components/`](docs/components) 下：

- [HbThemeButton 按钮](docs/components/hb-theme-button.md)

## 常用命令

```bash
pnpm install          # 安装依赖
pnpm build            # 按拓扑顺序构建 packages/*（tokens -> theme/components）
pnpm typecheck        # 全包类型检查
pnpm dev              # 启动 playground（需先 build）
pnpm clean            # 清空三包 dist
```

## 技术约定

- Vue / element-plus 一律 `peerDependencies`，构建 `external`，不打进 bundle。
- 三个包均为 ESM(`dist/index.js`) + CJS(`dist/index.cjs`) 双格式，`exports` 带 `types` 条件。
- playground 通过 workspace 链接消费三包 **dist 产物**，与真实业务方安装结果一致。

## 发布（npm）

`.npmrc` 中切换私有 registry 注释后：

```bash
pnpm build
pnpm -r --filter "./packages/*" publish --access public
```
