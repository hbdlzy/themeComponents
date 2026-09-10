<script setup lang="ts">
import { computed, ref } from 'vue'
import { HbButton, HbCard } from '@hebang/components'
import type { HbCardSize, HbCardTitleSize } from '@hebang/components'

const sizes: { value: HbCardSize; label: string }[] = [
  { value: 'small', label: '小卡片' },
  { value: 'medium', label: '中卡片' },
  { value: 'large', label: '大卡片' },
]
const titleSizes: HbCardTitleSize[] = [14, 16, 20, 24]

const liveSize = ref<HbCardSize>('medium')
const liveTitleSize = ref<HbCardTitleSize>(16)
const liveShowIcon = ref(true)
const liveBordered = ref(true)
const liveShadow = ref(true)
const liveRound = ref(true)
const liveDivided = ref(true)
const extraKind = ref<'none' | 'actions' | 'input' | 'icons' | 'text'>('none')
const actionCount = ref(2)

const extraLabel = computed(() => {
  switch (extraKind.value) {
    case 'actions':
      return '按钮组'
    case 'input':
      return '输入框'
    case 'icons':
      return '图标组'
    case 'text':
      return '文案'
    default:
      return '无'
  }
})
</script>

<template>
  <section class="card card-demo">
    <h2>HbCard 卡片</h2>
    <p class="muted">
      卡片容器分为大、中、小三种，标题栏高度分别为 64px、56px、48px；
      每种卡片标题都有 14 / 16 / 20 / 24 四个字号。标题前图标可显隐，尺寸跟随文字；
      标题栏后端可切换按钮组、输入框、图标组、文案；面板描边 / 投影 / 圆角可开关。
      颜色走
      <code>--hb-el-text</code>（标题/图标）、
      <code>--hb-el-divider</code>（分割线）、
      <code>--hb-el-bg</code>（填充）、
      <code>--hb-el-border</code>（描边）。
    </p>

    <div class="matrix">
      <div class="matrix__corner" />
      <div v-for="col in sizes" :key="col.value" class="matrix__col">{{ col.label }}</div>
      <template v-for="titleSize in titleSizes" :key="titleSize">
        <div class="matrix__row">{{ titleSize }}标题</div>
        <HbCard
          v-for="col in sizes"
          :key="`${col.value}-${titleSize}`"
          class="matrix__card"
          :size="col.value"
          :title-size="titleSize"
          title="卡片名称"
        />
      </template>
    </div>

    <div class="live__controls">
      <el-radio-group v-model="liveSize" size="small">
        <el-radio-button value="small">小</el-radio-button>
        <el-radio-button value="medium">中</el-radio-button>
        <el-radio-button value="large">大</el-radio-button>
      </el-radio-group>
      <el-radio-group v-model="liveTitleSize" size="small">
        <el-radio-button :value="14">14</el-radio-button>
        <el-radio-button :value="16">16</el-radio-button>
        <el-radio-button :value="20">20</el-radio-button>
        <el-radio-button :value="24">24</el-radio-button>
      </el-radio-group>
      <el-radio-group v-model="extraKind" size="small">
        <el-radio-button value="none">无操作区</el-radio-button>
        <el-radio-button value="actions">按钮组</el-radio-button>
        <el-radio-button value="input">输入框</el-radio-button>
        <el-radio-button value="icons">图标组</el-radio-button>
        <el-radio-button value="text">文案</el-radio-button>
      </el-radio-group>
      <el-radio-group v-if="extraKind === 'actions'" v-model="actionCount" size="small">
        <el-radio-button :value="1">1</el-radio-button>
        <el-radio-button :value="2">2</el-radio-button>
        <el-radio-button :value="3">3</el-radio-button>
        <el-radio-button :value="4">4</el-radio-button>
      </el-radio-group>
      <label class="switch"><el-switch v-model="liveShowIcon" size="small" /> 图标</label>
      <label class="switch"><el-switch v-model="liveBordered" size="small" /> 描边</label>
      <label class="switch"><el-switch v-model="liveShadow" size="small" /> 投影</label>
      <label class="switch"><el-switch v-model="liveRound" size="small" /> 圆角</label>
      <label class="switch"><el-switch v-model="liveDivided" size="small" /> 分割线</label>
    </div>

    <div class="live">
      <HbCard class="live__kit" title="操作区配套组件">
        <div class="kit">
          <div class="kit__col">
            <HbButton type="primary" size="small">按钮</HbButton>
            <div class="kit__row">
              <HbButton type="primary" size="small">按钮</HbButton>
              <HbButton type="primary" size="small">按钮</HbButton>
            </div>
            <div class="kit__row">
              <HbButton type="primary" size="small">按钮</HbButton>
              <HbButton type="primary" size="small">按钮</HbButton>
              <HbButton type="primary" size="small">按钮</HbButton>
            </div>
            <div class="kit__row">
              <HbButton type="primary" size="small">按钮</HbButton>
              <HbButton type="primary" size="small">按钮</HbButton>
              <HbButton type="primary" size="small">按钮</HbButton>
              <HbButton type="primary" size="small">按钮</HbButton>
            </div>
          </div>
          <div class="kit__col kit__col--icons">
            <span class="kit-ico" />
            <div class="kit__row"><span class="kit-ico" /><span class="kit-ico" /></div>
            <div class="kit__row"><span class="kit-ico" /><span class="kit-ico" /><span class="kit-ico" /></div>
            <div class="kit__row">
              <span class="kit-ico" /><span class="kit-ico" /><span class="kit-ico" /><span class="kit-ico" />
            </div>
          </div>
          <div class="kit__col kit__col--fields">
            <el-input placeholder="请输入" size="small" style="width: 160px">
              <template #suffix>
                <span class="search-mark">⌕</span>
              </template>
            </el-input>
            <el-select placeholder="请选择" size="small" style="width: 120px" />
          </div>
        </div>
      </HbCard>

      <HbCard
        class="live__preview"
        title="卡片名称"
        :size="liveSize"
        :title-size="liveTitleSize"
        :show-icon="liveShowIcon"
        :bordered="liveBordered"
        :shadow="liveShadow"
        :round="liveRound"
        :divided="liveDivided"
      >
        <template v-if="extraKind === 'actions'" #actions>
          <HbButton v-for="n in actionCount" :key="n" type="primary" size="small">按钮</HbButton>
        </template>
        <template v-else-if="extraKind === 'input'" #input>
          <el-input placeholder="请输入" size="small" style="width: 140px" />
          <el-select placeholder="请选择" size="small" style="width: 110px" />
        </template>
        <template v-else-if="extraKind === 'icons'" #icons>
          <span class="kit-ico" /><span class="kit-ico" /><span class="kit-ico" />
        </template>
        <template v-else-if="extraKind === 'text'" #text>
          <span class="extra-text">辅助文案</span>
        </template>
        <p class="live__body">
          {{ liveSize === 'small' ? '小' : liveSize === 'large' ? '大' : '中' }}卡片 ·
          {{ liveTitleSize }} 标题 · 操作区 {{ extraLabel }}
        </p>
      </HbCard>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.card-demo {
  .muted {
    margin-bottom: 20px;
    line-height: 1.7;
  }
}

.matrix {
  display: grid;
  grid-template-columns: 56px repeat(3, minmax(0, 1fr));
  gap: 16px 12px;
  align-items: stretch;
  padding: 12px;
  border: 1px dashed color-mix(in srgb, var(--hb-el-brand) 45%, transparent);
  border-radius: 8px;
  margin-bottom: 24px;

  &__corner {
    min-height: 24px;
  }

  &__col {
    text-align: center;
    color: var(--hb-el-brand);
    font-size: 14px;
    padding-bottom: 4px;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--hb-el-brand);
    font-size: 13px;
    writing-mode: horizontal-tb;
  }

  &__card :deep(.hb-card__body) {
    min-height: 88px;
  }
}

.live {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(260px, 0.7fr);
  gap: 20px;
  align-items: start;

  &__controls {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    margin-bottom: 12px;
  }

  &__kit :deep(.hb-card__body) {
    padding: 16px;
  }

  &__preview :deep(.hb-card__body) {
    min-height: 88px;
  }

  &__body {
    margin: 0;
    color: var(--hb-el-text2);
    font-size: 13px;
  }
}

.kit {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  padding: 8px;
  border: 1px dashed color-mix(in srgb, var(--hb-el-brand) 45%, transparent);
  border-radius: 6px;

  &__col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  &__row {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: nowrap;
  }

  &__col--icons {
    padding-top: 4px;
  }

  &__col--fields {
    flex-direction: row;
    align-items: flex-start;
    padding-top: 2px;
  }
}

.kit-ico {
  display: inline-flex;
  width: 16px;
  height: 16px;
  color: var(--hb-el-text);
  background:
    linear-gradient(var(--hb-el-text), var(--hb-el-text)) center / 8px 1.5px no-repeat,
    linear-gradient(var(--hb-el-text), var(--hb-el-text)) center / 1.5px 8px no-repeat;
  border: 1.2px solid var(--hb-el-text);
  transform: rotate(45deg);
  box-sizing: border-box;
}

.extra-text {
  font-size: 13px;
  color: var(--hb-el-text2);
  white-space: nowrap;
}

.search-mark {
  color: var(--hb-el-text3);
  font-size: 14px;
}

.switch {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--hb-el-text2);
}

@media (max-width: 960px) {
  .matrix {
    grid-template-columns: 48px 1fr;
    grid-auto-flow: row;
  }

  .live {
    grid-template-columns: 1fr;
  }
}
</style>
