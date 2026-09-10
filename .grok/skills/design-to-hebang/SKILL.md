---
name: design-to-hebang
description: 把设计稿落到合邦主题组件库。读 MasterGo/截图/标注后先查 catalog 匹配现有 HbXxx，命中则直接用；颜色只走 --hb-el-* / --hb-* / --el-*；尺寸对不上就覆盖 CSS 变量。用于还原设计稿、按设计做页面、新增 Hb 组件、主题色还原。
when-to-use: 还原设计稿、按设计做页面、读 MasterGo、用主题组件、新增 Hb 组件、设计转代码
---

# 设计稿 → 合邦组件

流水线固定。组件名单以 catalog 为准，本 Skill **不列举、不写死**现有组件；以后加多少组件都不用改本文件。

## 必读（每次先做）

1. 读 `packages/components/catalog.json` 全文（`meta` + `components`）。
2. 读设计，优先级：MasterGo MCP 节点数据 > 用户给的角色/尺寸标注 > 截图。
3. 需要改颜色规则时再读 `packages/tokens/src/elTokens.ts` 和 `docs/实现说明.md`。

## 决策树

```
设计里的一块 UI
  ├─ catalog.match 命中，antiMatch 未命中
  │    └─ 直接用对应 HbXxx（import from @hebang/components）
  │         ├─ 颜色：只用该条目 colorRoles 里的 token（及 --hb-el-* / --hb-* / --el-*）
  │         ├─ 尺寸在 sizeScale 档位内 → 用 props
  │         └─ 尺寸对不上、结构仍是它 → 实例上覆盖 sizeVars，禁止新开平行组件
  └─ 没有命中
       └─ 按「新增组件」做一条，并追加 catalog，禁止改本 Skill
```

匹配要看结构（标题栏+内容、按钮、弹窗），不要只看颜色或圆角。

## 颜色（硬规则）

- 禁止在组件和业务还原里写裸 hex / rgb / hsl。
- 设计稿色值只用来**认角色**（这是标题色、这是底、这是边），再映射到 `colorRoles` 或 `--hb-el-*`。
- 角色在 42 条绑定表里没有：先改 `HB_EL_TOKENS`，再给组件用。不要在组件里开特例色。

## 尺寸

- 先对 props 档位。
- 对不上且仍是同一组件：`<HbXxx style="--hb-xxx: 设计值" />`，变量名取 catalog 的 `sizeVars`。
- 只有结构变了才新增组件。

## 新增组件（不影响本流程）

按 `catalog.meta.addComponent` 做完即可，**只追加 catalog 条目**：

1. `src/components/HbXxx/HbXxx.vue`，类型放 `src/types.ts`，`defineOptions({ name: 'HbXxx' })`。
2. `src/index.ts` 具名导出 + 加入 `install` 数组。
3. 颜色走 CSS 变量；会变的尺寸暴露 CSS 变量，写入该条目的 `sizeVars`。
4. 复制 `catalog.meta.entryTemplate`，填好后追加到 `components` 数组末尾。
5. playground 补演示；根目录 `pnpm build`（playground 消费 dist）。
6. 不要修改本 Skill，不要把组件名写进本文件。

## 还原页面时

- 能用 catalog 里的组件就用，不要用 div 再画一遍。
- playground / 业务页通过 workspace 消费 **dist**，改了 packages 必须 build。
- 用户丢 MasterGo 链接但 MCP 不可用：用截图 + 让用户补「组件名 / 色角色 / 关键尺寸」，不要猜 hex 写死。
