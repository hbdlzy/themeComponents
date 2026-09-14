<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import {
  HbCard,
  HbCheckbox,
  HbCheckboxGroup,
  HbInput,
  HbSelect,
  HbThemeButton,
} from '@hebang/components'
import type { HbSelectOption } from '@hebang/components'

interface PointRow {
  id: number
  name: string
  unit: string
  configured: boolean
}

interface NavItem {
  key: string
  label: string
  icon: string
  children?: { key: string; label: string; icon: string }[]
}

const tabs = ['运行统计', '数据清洗', '账单管理', '点表信息', '交易策略', '电站资源']
const activeTab = ref('数据清洗')

const navItems: NavItem[] = [
  { key: 'home', label: '首页', icon: 'home' },
  { key: 'operation', label: '运营管理', icon: 'operation', children: [] },
  {
    key: 'run',
    label: '运行管理',
    icon: 'run',
    children: [
      { key: 'kpi', label: '运行指标分析', icon: 'kpi' },
      { key: 'fault', label: '故障提醒管理', icon: 'fault' },
      { key: 'ops', label: 'OPS数据管理', icon: 'ops' },
      { key: 'stat', label: '运行统计', icon: 'stat' },
      { key: 'monitor', label: '电站监控', icon: 'monitor' },
    ],
  },
  {
    key: 'resource',
    label: '资源管理',
    icon: 'resource',
    children: [
      { key: 'station', label: '电站资源', icon: 'station' },
      { key: 'points', label: '点表信息', icon: 'points' },
      { key: 'tree', label: '点表节点结构', icon: 'tree' },
      { key: 'bill', label: '账单管理', icon: 'bill' },
      { key: 'log', label: '系统日志', icon: 'log' },
    ],
  },
]

const expanded = ref<string[]>(['run', 'resource'])
const activeNav = ref('fault')
const menuKeyword = ref('')
const collapsed = ref(false)

function toggleExpand(key: string): void {
  const index = expanded.value.indexOf(key)
  if (index >= 0) expanded.value.splice(index, 1)
  else expanded.value.push(key)
}

const compareOptions: HbSelectOption[] = [
  { label: '<', value: '<' },
  { label: '<=', value: '<=' },
  { label: '=', value: '==' },
  { label: '>', value: '>' },
  { label: '>=', value: '>=' },
]

const joinOptions: HbSelectOption[] = [
  { label: '并且', value: 'and' },
  { label: '或者', value: 'or' },
]

const unitOptions: HbSelectOption[] = [
  { label: 'kV', value: 'kV' },
  { label: 'A', value: 'A' },
  { label: 'V', value: 'V' },
  { label: 'kW', value: 'kW' },
]

const manufacturerOptions: HbSelectOption[] = [
  { label: '合邦', value: 'hebang' },
  { label: '阳光电源', value: 'sungrow' },
]

const unitName = ref('')
const manufacturer = ref('')

const leftKeyword = ref('')
const rightKeyword = ref('')

const leftRows = ref<PointRow[]>(
  Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: 'PCS001-网侧AB线电压',
    unit: 'kV',
    configured: [0, 3, 4, 6, 7].includes(i),
  })),
)

const rightRows = ref<PointRow[]>([
  { id: 101, name: 'PCS001-网侧AB线电压', unit: 'kV', configured: false },
])

const leftSelected = ref<Array<string | number>>([3])
const rightSelected = ref<Array<string | number>>([101])

const filteredLeft = computed(() =>
  leftRows.value.filter((row) => row.name.includes(leftKeyword.value)),
)
const filteredRight = computed(() =>
  rightRows.value.filter((row) => row.name.includes(rightKeyword.value)),
)

const leftAllState = computed(() => {
  const ids = filteredLeft.value.map((row) => row.id)
  const picked = ids.filter((id) => leftSelected.value.includes(id))
  return {
    checked: ids.length > 0 && picked.length === ids.length,
    indeterminate: picked.length > 0 && picked.length < ids.length,
  }
})

const rightAllState = computed(() => {
  const ids = filteredRight.value.map((row) => row.id)
  const picked = ids.filter((id) => rightSelected.value.includes(id))
  return {
    checked: ids.length > 0 && picked.length === ids.length,
    indeterminate: picked.length > 0 && picked.length < ids.length,
  }
})

function toggleAll(side: 'left' | 'right', checked: boolean): void {
  const on = checked
  if (side === 'left') {
    const ids = filteredLeft.value.map((row) => row.id)
    leftSelected.value = on
      ? Array.from(new Set([...leftSelected.value, ...ids]))
      : leftSelected.value.filter((id) => !ids.includes(Number(id)))
    return
  }
  const ids = filteredRight.value.map((row) => row.id)
  rightSelected.value = on
    ? Array.from(new Set([...rightSelected.value, ...ids]))
    : rightSelected.value.filter((id) => !ids.includes(Number(id)))
}

function onToggleLeftAll(value: Array<string | number>): void {
  toggleAll('left', value.includes('all'))
}

function onToggleRightAll(value: Array<string | number>): void {
  toggleAll('right', value.includes('all'))
}

function moveRight(): void {
  if (!leftSelected.value.length) return
  const moving = leftRows.value.filter((row) => leftSelected.value.includes(row.id))
  rightRows.value = [...rightRows.value, ...moving]
  leftRows.value = leftRows.value.filter((row) => !leftSelected.value.includes(row.id))
  leftSelected.value = []
}

function moveLeft(): void {
  if (!rightSelected.value.length) return
  const moving = rightRows.value.filter((row) => rightSelected.value.includes(row.id))
  leftRows.value = [...leftRows.value, ...moving]
  rightRows.value = rightRows.value.filter((row) => !rightSelected.value.includes(row.id))
  rightSelected.value = []
}

const ruleForm = reactive({
  name: '',
  op: '',
  value: '',
  join: 'and',
  extraOp: '',
  extraValue: '',
})

const cardVars = {
  '--hb-card-radius': '4px',
  '--hb-card-shadow': 'none',
  '--hb-card-color-border': 'transparent',
}

const innerCardVars = {
  '--hb-card-radius': '4px',
  '--hb-card-shadow': 'none',
  '--hb-card-pad': '12px',
  '--hb-card-header-height': '40px',
}
</script>

<template>
  <div class="rule-page" :class="{ 'is-collapsed': collapsed }">
    <header class="topbar">
      <div class="brand">
        <span class="brand__logo" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="var(--hb-el-brand)" />
            <path
              d="M10.2 8.4h3.5v5.9h4.6V8.4h3.5v15.2h-3.5v-6.3h-4.6v6.3h-3.5V8.4Z"
              fill="var(--hb-el-white)"
            />
          </svg>
        </span>
        <div class="brand__text">
          <strong>储能运营平台</strong>
          <span>HEBANG ENERGY NETWORK</span>
        </div>
      </div>

      <div class="top-tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          type="button"
          class="top-tab"
          :class="{ 'is-active': activeTab === tab }"
          @click="activeTab = tab"
        >
          <span>{{ tab }}</span>
          <i aria-hidden="true">×</i>
        </button>
      </div>

      <div class="topbar__right">
        <button type="button" class="icon-btn" aria-label="应用">
          <svg viewBox="0 0 16 16" fill="none">
            <rect x="1.8" y="1.8" width="5.2" height="5.2" rx="1.2" stroke="currentColor" stroke-width="1.2" />
            <rect x="9" y="1.8" width="5.2" height="5.2" rx="1.2" stroke="currentColor" stroke-width="1.2" />
            <rect x="1.8" y="9" width="5.2" height="5.2" rx="1.2" stroke="currentColor" stroke-width="1.2" />
            <rect x="9" y="9" width="5.2" height="5.2" rx="1.2" stroke="currentColor" stroke-width="1.2" />
          </svg>
        </button>
        <button type="button" class="icon-btn" aria-label="全屏">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M3 6.2V3h3.2M13 6.2V3h-3.2M3 9.8V13h3.2M13 9.8V13h-3.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <span class="topbar__divider" />
        <div class="weather">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="4" fill="var(--hb-el-warning)" />
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" stroke="var(--hb-el-warning)" stroke-linecap="round" />
          </svg>
          <div class="weather__temp">
            <b>20°C</b>
            <span>山西太原</span>
          </div>
          <div class="weather__date">
            <span>2024年9月17日</span>
            <span>八月十五中秋节</span>
          </div>
          <div class="weather__time">
            <strong>14:30</strong>
            <span>星期二</span>
          </div>
        </div>
        <button type="button" class="user">
          <span class="user__avatar">M</span>
          Ming
          <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </header>

    <aside class="sider">
      <div class="sider__search">
        <label class="search-box">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.2" stroke="currentColor" />
            <path d="m10.2 10.2 3 3" stroke="currentColor" stroke-linecap="round" />
          </svg>
          <input v-model="menuKeyword" placeholder="检索功能" />
        </label>
        <button type="button" class="collapse-btn" aria-label="收起" @click="collapsed = !collapsed">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M7.5 4 3.5 8l4 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.5 4 8.5 8l4 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <nav class="menu">
        <template v-for="item in navItems" :key="item.key">
          <button
            type="button"
            class="menu__item"
            :class="{
              'is-active': activeNav === item.key,
              'is-parent': !!item.children,
              'is-open': !!item.children && expanded.includes(item.key),
              'is-current': !!item.children && item.children.some((child) => child.key === activeNav),
            }"
            @click="item.children ? toggleExpand(item.key) : (activeNav = item.key)"
          >
            <svg class="menu__glyph" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path v-if="item.icon === 'home'" d="M2.6 7.2 8 2.8l5.4 4.4V13a1 1 0 0 1-1 1H3.6a1 1 0 0 1-1-1V7.2Z" stroke="currentColor" stroke-linejoin="round" />
              <path v-if="item.icon === 'home'" d="M6.4 14v-4.2h3.2V14" stroke="currentColor" />
              <rect v-if="item.icon === 'operation'" x="2.4" y="2.4" width="5" height="5" rx="1" stroke="currentColor" />
              <rect v-if="item.icon === 'operation'" x="8.6" y="2.4" width="5" height="5" rx="1" stroke="currentColor" />
              <rect v-if="item.icon === 'operation'" x="2.4" y="8.6" width="5" height="5" rx="1" stroke="currentColor" />
              <rect v-if="item.icon === 'operation'" x="8.6" y="8.6" width="5" height="5" rx="1" stroke="currentColor" />
              <path v-if="item.icon === 'run'" d="M4 12V8M8 12V4.5M12 12V7" stroke="currentColor" stroke-linecap="round" stroke-width="1.4" />
              <circle v-if="item.icon === 'resource'" cx="5" cy="5" r="1.35" stroke="currentColor" />
              <circle v-if="item.icon === 'resource'" cx="11" cy="5" r="1.35" stroke="currentColor" />
              <circle v-if="item.icon === 'resource'" cx="5" cy="11" r="1.35" stroke="currentColor" />
              <circle v-if="item.icon === 'resource'" cx="11" cy="11" r="1.35" stroke="currentColor" />
              <path v-if="item.icon === 'resource'" d="M6.2 5h3.6M5 6.2v3.6M11 6.2v3.6M6.2 11h3.6" stroke="currentColor" />
            </svg>
            <span class="menu__label">{{ item.label }}</span>
            <svg
              v-if="item.children"
              class="menu__arrow"
              :class="{ 'is-open': expanded.includes(item.key) }"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" stroke-linecap="round" />
            </svg>
          </button>
          <div v-if="item.children && expanded.includes(item.key)" class="menu__sub">
            <button
              v-for="child in item.children"
              :key="child.key"
              type="button"
              class="menu__item menu__item--sub"
              :class="{ 'is-active': activeNav === child.key }"
              @click="activeNav = child.key"
            >
              <svg class="menu__glyph" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path v-if="child.icon === 'kpi'" d="M3 11.4 6.2 8.2l2.1 2 4.7-5.6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path v-if="child.icon === 'kpi'" d="M3 12.5h10" stroke="currentColor" stroke-linecap="round" />
                <rect v-if="child.icon === 'fault'" x="3" y="3.2" width="10" height="9.6" rx="1.4" stroke="currentColor" />
                <path v-if="child.icon === 'fault'" d="M8 5.6v3.1" stroke="currentColor" stroke-linecap="round" />
                <circle v-if="child.icon === 'fault'" cx="8" cy="10.4" r="0.55" fill="currentColor" />
                <ellipse v-if="child.icon === 'ops'" cx="8" cy="4.6" rx="4.4" ry="1.4" stroke="currentColor" />
                <path v-if="child.icon === 'ops'" d="M3.6 4.6v3.2c0 .8 2 1.4 4.4 1.4s4.4-.6 4.4-1.4V4.6" stroke="currentColor" />
                <path v-if="child.icon === 'ops'" d="M3.6 7.8v3.2c0 .8 2 1.4 4.4 1.4s4.4-.6 4.4-1.4V7.8" stroke="currentColor" />
                <path v-if="child.icon === 'stat'" d="M4 11.5V7.2M8 11.5V4.8M12 11.5V8.4" stroke="currentColor" stroke-linecap="round" stroke-width="1.4" />
                <rect v-if="child.icon === 'monitor'" x="2.4" y="3.4" width="11.2" height="7.4" rx="1.2" stroke="currentColor" />
                <path v-if="child.icon === 'monitor'" d="M6.4 13.2h3.2M8 10.8v2.4" stroke="currentColor" stroke-linecap="round" />
                <path v-if="child.icon === 'station'" d="M3.2 13V8.6h2.2V6.4h2.2V8.6h1.6V5.2h1.2V3.4h1.6v1.8h1.6V13" stroke="currentColor" stroke-linejoin="round" />
                <path v-if="child.icon === 'station'" d="M6.6 13v-2.6h2.8V13" stroke="currentColor" />
                <rect v-if="child.icon === 'points'" x="3.2" y="2.8" width="9.6" height="10.4" rx="1.2" stroke="currentColor" />
                <path v-if="child.icon === 'points'" d="M5.6 6h4.8M5.6 8.4h4.8M5.6 10.8h3.2" stroke="currentColor" stroke-linecap="round" />
                <circle v-if="child.icon === 'tree'" cx="8" cy="4" r="1.2" stroke="currentColor" />
                <path v-if="child.icon === 'tree'" d="M8 5.2v2.2M5.2 10.8V8.6h5.6v2.2" stroke="currentColor" />
                <circle v-if="child.icon === 'tree'" cx="5.2" cy="12.2" r="1.2" stroke="currentColor" />
                <circle v-if="child.icon === 'tree'" cx="10.8" cy="12.2" r="1.2" stroke="currentColor" />
                <path v-if="child.icon === 'bill'" d="M4.4 3.2h5.4L11.6 5v7.8H4.4V3.2Z" stroke="currentColor" stroke-linejoin="round" />
                <path v-if="child.icon === 'bill'" d="M9.8 3.2V5h1.8M6 8.2h4M6 10.4h2.8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <rect v-if="child.icon === 'log'" x="4.2" y="2.6" width="7.6" height="10.8" rx="1.2" stroke="currentColor" />
                <path v-if="child.icon === 'log'" d="M6.2 6h3.6M6.2 8.4h3.6M6.2 10.8h2.4" stroke="currentColor" stroke-linecap="round" />
              </svg>
              <span class="menu__label">{{ child.label }}</span>
            </button>
          </div>
        </template>
      </nav>
    </aside>

    <main class="workspace">
      <HbCard
        class="title-card"
        title="新建规则"
        size="large"
        :title-size="16"
        :show-icon="false"
        :bordered="false"
        :shadow="false"
        :style="cardVars"
      >
        <template #actions>
          <HbThemeButton variant="neutral" size="medium" class="btn-cancel">取消</HbThemeButton>
          <HbThemeButton variant="primary" size="medium">保存</HbThemeButton>
        </template>
      </HbCard>

      <div class="workspace__cols">
        <HbCard
          class="block-card"
          title="关联点位资源"
          size="medium"
          :title-size="16"
          :bordered="false"
          :shadow="false"
          :style="{ ...cardVars, '--hb-card-color-icon': 'var(--hb-el-brand)' }"
        >
          <template #icon>
            <span class="title-mark" />
          </template>

          <div class="transfer">
            <HbCard
              class="point-panel"
              size="small"
              :show-icon="false"
              :shadow="false"
              :style="innerCardVars"
            >
              <template #header>
                <div class="point-panel__head">
                  <HbCheckboxGroup
                    class="point-panel__check"
                    :model-value="leftAllState.checked ? ['all'] : []"
                    @change="onToggleLeftAll"
                  >
                    <HbCheckbox value="all" :indeterminate="leftAllState.indeterminate">
                      全部点位列表
                    </HbCheckbox>
                  </HbCheckboxGroup>
                  <span class="point-panel__count">{{ leftSelected.length }}/{{ leftRows.length }}</span>
                </div>
              </template>

              <div class="filters">
                <div class="filters__item">
                  <span class="field-label"><i>*</i>单位：</span>
                  <HbSelect
                    v-model="unitName"
                    :options="unitOptions"
                    placeholder="请选择"
                    :clearable="false"
                    width="96px"
                  />
                </div>
                <div class="filters__item">
                  <span class="field-label">所属厂家：</span>
                  <HbSelect
                    v-model="manufacturer"
                    :options="manufacturerOptions"
                    placeholder="请选择"
                    :clearable="false"
                    width="96px"
                  />
                </div>
              </div>

              <label class="query">
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="4.2" stroke="currentColor" />
                  <path d="m10.2 10.2 3 3" stroke="currentColor" stroke-linecap="round" />
                </svg>
                <input v-model="leftKeyword" placeholder="查询节点或点位" />
              </label>

              <div class="point-table">
                <div class="point-table__head">
                  <span />
                  <span>节点/点位简称</span>
                  <span>单位</span>
                  <span>规则状态</span>
                </div>
                <HbCheckboxGroup v-model="leftSelected" class="point-table__body">
                  <div v-for="row in filteredLeft" :key="row.id" class="point-table__row">
                    <HbCheckbox :value="row.id" />
                    <span class="point-table__name">{{ row.name }}</span>
                    <span>{{ row.unit }}</span>
                    <span :class="row.configured ? 'is-on' : 'is-off'">
                      {{ row.configured ? '已设置' : '未设置' }}
                    </span>
                  </div>
                </HbCheckboxGroup>
              </div>
            </HbCard>

            <div class="transfer__actions">
              <button
                type="button"
                class="move-btn"
                :class="{ 'is-active': rightSelected.length > 0 }"
                :disabled="rightSelected.length === 0"
                @click="moveLeft"
              >
                <svg viewBox="0 0 16 16" fill="none"><path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </button>
              <button
                type="button"
                class="move-btn"
                :class="{ 'is-active': leftSelected.length > 0 }"
                :disabled="leftSelected.length === 0"
                @click="moveRight"
              >
                <svg viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </button>
            </div>

            <HbCard
              class="point-panel"
              size="small"
              :show-icon="false"
              :shadow="false"
              :style="innerCardVars"
            >
              <template #header>
                <div class="point-panel__head">
                  <HbCheckboxGroup
                    class="point-panel__check"
                    :model-value="rightAllState.checked ? ['all'] : []"
                    @change="onToggleRightAll"
                  >
                    <HbCheckbox value="all" :indeterminate="rightAllState.indeterminate">
                      告警关联点位列表
                    </HbCheckbox>
                  </HbCheckboxGroup>
                  <span class="point-panel__count">{{ rightSelected.length }}/{{ rightRows.length }}</span>
                </div>
              </template>

              <label class="query">
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="4.2" stroke="currentColor" />
                  <path d="m10.2 10.2 3 3" stroke="currentColor" stroke-linecap="round" />
                </svg>
                <input v-model="rightKeyword" placeholder="查询节点或点位" />
              </label>

              <div class="point-table">
                <div class="point-table__head">
                  <span />
                  <span>节点/点位简称</span>
                  <span>单位</span>
                  <span>规则状态</span>
                </div>
                <HbCheckboxGroup v-model="rightSelected" class="point-table__body">
                  <div v-for="row in filteredRight" :key="row.id" class="point-table__row">
                    <HbCheckbox :value="row.id" />
                    <span class="point-table__name">{{ row.name }}</span>
                    <span>{{ row.unit }}</span>
                    <span :class="row.configured ? 'is-on' : 'is-off'">
                      {{ row.configured ? '已设置' : '未设置' }}
                    </span>
                  </div>
                </HbCheckboxGroup>
              </div>
            </HbCard>
          </div>
        </HbCard>

        <HbCard
          class="block-card"
          title="设置清洗规则"
          size="medium"
          :title-size="16"
          :bordered="false"
          :shadow="false"
          :style="{ ...cardVars, '--hb-card-color-icon': 'var(--hb-el-brand)' }"
        >
          <template #icon>
            <span class="title-mark" />
          </template>

          <h3 class="section-title">基本设置</h3>
          <div class="form-row form-row--name">
            <span class="field-label"><i>*</i>规则名称：</span>
            <HbInput v-model="ruleForm.name" placeholder="请输入" :clearable="false" width="100%" />
          </div>
          <div class="form-row form-row--top">
            <span class="field-label"><i>*</i>阈值设置：</span>
            <div class="threshold">
              <div class="threshold__line">
                <div class="combo">
                  <span>值</span>
                  <HbSelect
                    v-model="ruleForm.op"
                    :options="compareOptions"
                    placeholder="请选择"
                    :clearable="false"
                    width="104px"
                  />
                </div>
                <div class="unit-input">
                  <HbInput v-model="ruleForm.value" placeholder="请输入" :clearable="false" width="120px" />
                  <em>kV</em>
                </div>
              </div>
              <div class="threshold__line">
                <HbThemeButton variant="secondary-dashed" size="medium" class="add-btn">
                  <template #icon>
                    <svg viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" fill="var(--hb-el-brand)" />
                      <path d="M8 5v6M5 8h6" stroke="var(--hb-el-white)" stroke-linecap="round" />
                    </svg>
                  </template>
                  添加阈值条件
                </HbThemeButton>
                <HbSelect
                  v-model="ruleForm.join"
                  :options="joinOptions"
                  :clearable="false"
                  width="88px"
                />
                <div class="combo">
                  <span>值</span>
                  <HbSelect
                    v-model="ruleForm.extraOp"
                    :options="compareOptions"
                    placeholder="请选择"
                    :clearable="false"
                    width="104px"
                  />
                </div>
                <div class="unit-input">
                  <HbInput v-model="ruleForm.extraValue" placeholder="请输入" :clearable="false" width="120px" />
                  <em>kV</em>
                </div>
                <HbThemeButton variant="neutral" size="medium" class="del-btn">删除</HbThemeButton>
              </div>
            </div>
          </div>
        </HbCard>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.rule-page {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 56px 1fr;
  height: calc(100vh - 53px);
  min-width: 1280px;
  overflow: hidden;
  background: var(--hb-el-bg3);
  color: var(--hb-el-text);
}

.rule-page.is-collapsed {
  grid-template-columns: 64px 1fr;
}

.topbar {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 20px 0 16px;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--hb-el-brand) 16%, var(--hb-el-white)) 0%,
    color-mix(in srgb, var(--hb-el-brand) 8%, var(--hb-el-white)) 55%,
    color-mix(in srgb, var(--hb-el-brand_light) 40%, var(--hb-el-white)) 100%
  );
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: none;
  min-width: 188px;

  &__logo {
    width: 32px;
    height: 32px;

    svg {
      display: block;
      width: 32px;
      height: 32px;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    line-height: 1.15;

    strong {
      font-size: 16px;
      font-weight: 700;
      color: var(--hb-el-text);
    }

    span {
      font-size: 10px;
      letter-spacing: 0.02em;
      color: var(--hb-el-text2);
    }
  }
}

.top-tabs {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
  height: 100%;
}

.top-tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 14px;
  border: 0;
  border-radius: 16px;
  background: color-mix(in srgb, var(--hb-el-white) 82%, transparent);
  color: var(--hb-el-text2);
  cursor: pointer;
  font-size: 13px;
  white-space: nowrap;

  i {
    font-style: normal;
    font-size: 12px;
    opacity: 0.7;
  }

  &.is-active {
    background: var(--hb-el-brand);
    color: var(--hb-el-white);
  }
}

.topbar__right {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.icon-btn {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--hb-el-text);
  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
  }
}

.topbar__divider {
  width: 1px;
  height: 28px;
  background: var(--hb-el-border);
}

.weather {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--hb-el-text);
  font-size: 12px;
  line-height: 1.35;

  svg {
    width: 28px;
    height: 28px;
    flex: none;
  }

  &__temp,
  &__date,
  &__time {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__temp {
    b {
      color: var(--hb-el-text);
      font-weight: 600;
      font-size: 13px;
      line-height: 1.2;
    }

    span {
      color: var(--hb-el-text2);
    }
  }

  &__date {
    color: var(--hb-el-text2);
    white-space: nowrap;
  }

  &__time {
    align-items: flex-end;
    margin-left: 4px;

    strong {
      font-size: 18px;
      line-height: 1;
      font-weight: 700;
    }

    span {
      color: var(--hb-el-text2);
    }
  }
}

.user {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: transparent;
  color: var(--hb-el-text);
  cursor: pointer;
  font-size: 14px;

  svg {
    width: 12px;
    height: 12px;
  }

  &__avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--hb-el-brand);
    color: var(--hb-el-white);
    font-size: 12px;
  }
}

.sider {
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: var(--hb-el-bg);
  border-right: 1px solid var(--hb-el-divider);
}

.sider__search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 12px 8px;
}

.search-box,
.query {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--hb-el-border2);
  border-radius: 4px;
  background: var(--hb-el-bg3);
  color: var(--hb-el-disabled);

  svg {
    width: 14px;
    height: 14px;
    flex: none;
  }

  input {
    width: 100%;
    border: 0;
    background: transparent;
    color: var(--hb-el-text);
    font-size: 13px;
    outline: none;

    &::placeholder {
      color: var(--hb-el-disabled);
    }
  }
}

.query {
  width: 100%;
  margin-bottom: 12px;
  background: var(--hb-el-bg);
}

.collapse-btn {
  width: 32px;
  height: 32px;
  flex: none;
  border: 1px solid var(--hb-el-border2);
  border-radius: 4px;
  background: var(--hb-el-bg3);
  color: var(--hb-el-text2);
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }
}

.menu {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 4px 12px 16px;
}

.menu__item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--hb-el-text);
  cursor: pointer;
  font-size: 14px;
  text-align: left;

  &--sub {
    height: 36px;
    padding-left: 28px;
    font-size: 13px;
  }

  &.is-parent.is-current:not(.is-active) {
    background: var(--hb-el-bg3);
  }

  &.is-active {
    background: var(--hb-el-brand);
    color: var(--hb-el-white);
    border-radius: 20px;
  }
}

.menu__glyph,
.menu__arrow {
  width: 16px;
  height: 16px;
  flex: none;
}

.menu__arrow {
  margin-left: auto;
  transition: transform 0.15s ease;

  &.is-open {
    transform: rotate(180deg);
  }
}

.menu__label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.workspace {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  min-height: 0;
  padding: 16px;
  overflow: auto;
}

.title-card {
  flex: none;

  :deep(.hb-card__body) {
    display: none;
  }

  :deep(.hb-card__header) {
    padding: 0 20px;
    min-height: 64px;
  }

  :deep(.hb-card__actions) {
    gap: 8px;
  }
}

.btn-cancel {
  --hb-btn-border: var(--hb-el-border);
  --hb-btn-fg: var(--hb-el-text);
}

.workspace__cols {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 16px;
  min-height: 0;
  flex: 1;
}

.block-card {
  min-width: 0;
  height: 100%;

  :deep(.hb-card__header) {
    padding-left: 16px;
  }

  :deep(.hb-card__icon) {
    width: 4px;
    height: 16px;
    margin-left: -16px;
    margin-right: 12px;
  }

  :deep(.hb-card__body) {
    padding: 16px;
  }
}

.title-mark {
  display: block;
  width: 4px;
  height: 16px;
  border-radius: 0 2px 2px 0;
  background: var(--hb-el-brand);
}

.transfer {
  display: grid;
  grid-template-columns: 1fr 32px 1fr;
  gap: 12px;
  height: 100%;
  min-height: 520px;
}

.point-panel {
  min-width: 0;
  height: 100%;

  :deep(.hb-card__header) {
    padding: 0 12px;
    background: var(--hb-el-bg3);
  }

  :deep(.hb-card__body) {
    display: flex;
    flex-direction: column;
    min-height: 0;
    padding: 12px;
  }
}

.point-panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  color: var(--hb-el-text);
}

.point-panel__count {
  color: var(--hb-el-text3);
  font-weight: 400;
  font-size: 12px;
}

.point-panel__check {
  display: inline-flex !important;
  flex-wrap: nowrap;
  gap: 0 !important;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  margin-bottom: 12px;
}

.filters__item,
.form-row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.form-row {
  margin-bottom: 16px;
}

.form-row--name :deep(.hb-input) {
  flex: 1;
  max-width: 520px;
}

.form-row--top {
  align-items: flex-start;
}

.field-label {
  flex: none;
  font-size: 14px;
  color: var(--hb-el-text);
  white-space: nowrap;

  i {
    margin-right: 2px;
    font-style: normal;
    color: var(--hb-el-danger);
  }
}

.point-table {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;
  line-height: 22px;
}

.point-table__head,
.point-table__row {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) 48px 64px;
  align-items: center;
  gap: 4px;
  min-height: 36px;
  padding: 0 8px;
  font-size: 13px;
  line-height: 22px;
}

.point-table__head {
  background: var(--hb-el-bg3);
  color: var(--hb-el-text2);
  font-weight: 500;
}

.point-table__head span:nth-child(n + 3),
.point-table__row > span:nth-child(n + 3) {
  text-align: center;
}

.point-table__body {
  display: flex !important;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0 !important;
  overflow: auto;
}

.point-table__row {
  border-bottom: 1px solid var(--hb-el-divider);
  cursor: pointer;

  :deep(.hb-checkbox.el-checkbox) {
    width: 16px;
    height: 16px;
    margin: 0;
  }

  :deep(.el-checkbox__label) {
    display: none;
    padding: 0;
  }
}

.rule-page :deep(.hb-checkbox.el-checkbox .el-checkbox__input.is-checked .el-checkbox__inner),
.rule-page :deep(.hb-checkbox.el-checkbox .el-checkbox__input.is-indeterminate .el-checkbox__inner) {
  background: var(--hb-el-brand);
  background-color: var(--hb-el-brand);
  border-color: var(--hb-el-brand);
}

.rule-page :deep(.hb-checkbox.el-checkbox .el-checkbox__input.is-indeterminate .el-checkbox__inner::before) {
  background-color: var(--hb-el-white);
}

.rule-page :deep(.hb-checkbox.el-checkbox .el-checkbox__input.is-indeterminate .el-checkbox__inner::after) {
  display: none;
}

.point-table__name {
  min-width: 0;
  color: var(--hb-el-brand);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 22px;
}

.is-on {
  color: var(--hb-el-success);
}

.is-off {
  color: var(--hb-el-warning);
}

.transfer__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.move-btn {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 6px;
  background: color-mix(in srgb, var(--hb-el-brand) 28%, var(--hb-el-white));
  color: var(--hb-el-white);
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }

  &.is-active:not([disabled]) {
    background: var(--hb-el-brand);
  }

  &[disabled] {
    cursor: not-allowed;
    background: color-mix(in srgb, var(--hb-el-brand) 28%, var(--hb-el-white));
    color: var(--hb-el-white);
    opacity: 1;
  }
}

.section-title {
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 700;
  color: var(--hb-el-text);
}

.threshold {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.threshold__line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.combo {
  display: flex;
  align-items: stretch;
  height: 32px;
  border: 1px solid var(--hb-el-border2);
  border-radius: 4px;
  overflow: hidden;
  background: var(--hb-el-bg);

  > span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    background: var(--hb-el-bg3);
    color: var(--hb-el-text2);
    font-size: 13px;
    border-right: 1px solid var(--hb-el-border2);
  }

  :deep(.hb-select) {
    width: 104px;
  }

  :deep(.el-select__wrapper) {
    box-shadow: none !important;
    min-height: 30px;
    border-radius: 0;
  }
}

.unit-input {
  position: relative;
  width: 120px;

  em {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-style: normal;
    font-size: 13px;
    color: var(--hb-el-text2);
    pointer-events: none;
  }

  :deep(.el-input__inner) {
    padding-right: 28px;
  }
}

.add-btn {
  --hb-btn-padding-x: 10px;

  :deep(.hb-theme-button__icon svg) {
    width: 16px;
    height: 16px;
  }
}

.del-btn {
  --hb-btn-fg: var(--hb-el-danger);
  --hb-btn-border: var(--hb-el-danger_light);
  --hb-btn-bg: var(--hb-el-danger_light);
}

.is-collapsed .menu__label,
.is-collapsed .menu__arrow,
.is-collapsed .search-box input,
.is-collapsed .brand__text {
  display: none;
}
</style>
