<script setup lang="ts">
import { ref } from 'vue'

const copied = ref('')

const installCode = 'npm i @hebang/ui'

const importCode = [
  "import { HbCard, HbInput } from '@hebang/ui'",
  "import '@hebang/ui/style'",
].join('\n')

const uiPrompt = [
  '这是合邦 UI，基于 Element Plus 二次封装，npm 包名 @hebang/ui。',
  '请按我发的 UI 图生成页面。',
  '',
  '每次动手前，必须先读这个文件（组件唯一清单，不要凭记忆点名）：',
  '  node_modules/@hebang/ui/catalog.json',
  '也可以：import catalog from \'@hebang/ui/catalog.json\'',
  '',
  '读 components 数组。每一条里：',
  '  name       组件名，如 HbInput，从 @hebang/ui 引入',
  '  match      设计稿里可能出现的中文名 / 英文名',
  '  antiMatch  容易误判、其实不是它',
  '  props/slots 怎么用',
  '',
  '对图里的每一块 UI：',
  '1. 用结构去对 match（标题栏+内容、按钮、输入框等），不要只看颜色或圆角。',
  '2. match 命中、且不落 antiMatch → import { 该 name } from \'@hebang/ui\'，按这条的 props/slots 用。',
  '3. 没有命中 → 用 Element Plus 的 ElXxx。不要换 Ant Design Vue、Naive UI 或其他库。',
  '4. 不要用 div 把清单里已有的组件再画一遍。',
  '',
  '引入只要包和 CSS：',
  '  import { ... } from \'@hebang/ui\'',
  '  import \'@hebang/ui/style\'',
  '',
  '颜色只用 var(--hb-el-*) / var(--hb-*) / var(--el-*)，禁止写死 hex / rgb。',
].join('\n')

const projectPrompt = [
  '用 Vue 开发这个项目。UI 库用合邦 @hebang/ui（基于 Element Plus 二次封装，已发布到 npmjs）。',
  '',
  '1. 安装：npm i @hebang/ui',
  '2. 入口只引入这个包和它的 CSS：',
  '     import { ... } from \'@hebang/ui\'',
  '     import \'@hebang/ui/style\'',
  '3. 写任何页面前，先读组件清单：',
  '     node_modules/@hebang/ui/catalog.json',
  '   也可以：import catalog from \'@hebang/ui/catalog.json\'',
  '   只认这个文件里的 components，不要凭记忆点名。',
  '',
  '每一条 catalog 的用法：',
  '  name / match / antiMatch / props / slots',
  '  match 命中且不落 antiMatch → 用对应 HbXxx（from \'@hebang/ui\'）',
  '  没有命中 → 用 Element Plus 的 ElXxx，不要换别的 UI 库',
  '  不要用 div 重画清单里已有的组件',
  '',
  '匹配看结构，不看颜色或圆角。',
  '颜色只用 var(--hb-el-*) / var(--hb-*) / var(--el-*)。',
].join('\n')

async function copy(key: string, text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = key
    window.setTimeout(() => {
      if (copied.value === key) copied.value = ''
    }, 1600)
  } catch {
    copied.value = ''
  }
}
</script>

<template>
  <main class="usage">
    <h1>使用方法 <span class="badge">该项目基于 Element Plus 开发</span></h1>
    <p class="lead">
      合邦组件已发布到 npmjs，包名 <code>@hebang/ui</code>。
      项目里只装这一个 UI 包，引入它和它的 CSS 即可。
    </p>

    <section class="card">
      <h2>AI 要读的文件</h2>
      <p>
        每次生成页面前，必须先读包里的
        <code>catalog.json</code>，不要凭记忆点组件名。
      </p>
      <pre class="code-block">node_modules/@hebang/ui/catalog.json</pre>
      <p class="hint">
        这是组件唯一清单。看 <code>components</code> 数组：
        <code>match</code> 命中就用对应 <code>name</code>（如 HbInput），
        没命中再用 Element Plus。
      </p>
    </section>

    <section class="card">
      <h2>安装和引入</h2>
      <div class="code-head">
        <span>安装</span>
        <button type="button" @click="copy('install', installCode)">{{ copied === 'install' ? '已复制' : '复制' }}</button>
      </div>
      <pre class="code-block">{{ installCode }}</pre>
      <div class="code-head">
        <span>引入（只要包 + CSS）</span>
        <button type="button" @click="copy('import', importCode)">{{ copied === 'import' ? '已复制' : '复制' }}</button>
      </div>
      <pre class="code-block">{{ importCode }}</pre>
    </section>

    <section class="card">
      <h2>用法一：根据 UI 图生成</h2>
      <p>把 UI 图发给 AI，并把下面这段一起发出去。AI 会先读 catalog，再按图还原。</p>
      <div class="code-head">
        <span>发给 AI 的话</span>
        <button type="button" @click="copy('ui', uiPrompt)">{{ copied === 'ui' ? '已复制' : '复制' }}</button>
      </div>
      <pre class="code-block">{{ uiPrompt }}</pre>
    </section>

    <section class="card">
      <h2>用法二：让 AI 自己搭项目</h2>
      <p>要开发一个新项目时，把下面这段发给 AI。它会先装 <code>@hebang/ui</code>，再读 catalog 搭页面。</p>
      <div class="code-head">
        <span>发给 AI 的话</span>
        <button type="button" @click="copy('project', projectPrompt)">{{ copied === 'project' ? '已复制' : '复制' }}</button>
      </div>
      <pre class="code-block">{{ projectPrompt }}</pre>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.usage {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 24px 64px;

  h1 {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    font-size: 24px;
    margin: 0 0 8px;
    color: var(--hb-el-text);
  }
}

.badge {
  display: inline-block;
  margin: 0;
  padding: 2px 8px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--hb-el-brand) 12%, transparent);
  color: var(--hb-el-brand);
  font-size: 12px;
  font-weight: 600;
}

.lead {
  margin: 0 0 24px;
  color: var(--hb-el-text2);
  line-height: 1.7;
}

.card {
  padding: 24px;
  margin-bottom: 16px;
  border: 1px solid var(--hb-el-border);
  border-radius: 8px;
  background: var(--hb-el-bg2);

  h2 {
    font-size: 16px;
    margin: 0 0 12px;
    color: var(--hb-el-text);
  }

  p {
    margin: 0;
    color: var(--hb-el-text2);
    line-height: 1.7;
  }
}

.hint {
  margin-top: 12px !important;
}

.code-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0 6px;
  font-size: 13px;
  color: var(--hb-el-text2);

  button {
    padding: 2px 8px;
    border: 1px solid var(--hb-el-border);
    border-radius: 4px;
    background: var(--hb-el-bg);
    color: var(--hb-el-text2);
    cursor: pointer;
    font-size: 12px;

    &:hover {
      color: var(--hb-el-brand);
      border-color: var(--hb-el-brand);
    }
  }
}

.code-block {
  margin: 12px 0 0;
  padding: 14px 16px;
  border: 1px solid var(--hb-el-border);
  border-radius: 6px;
  background: var(--hb-el-bg3);
  color: var(--hb-el-text);
  font-size: 12px;
  line-height: 1.7;
  overflow-x: auto;
  white-space: pre-wrap;
}

.code-head + .code-block {
  margin-top: 0;
}

@media (max-width: 720px) {
  .usage {
    padding: 24px 16px 48px;
  }
}
</style>
