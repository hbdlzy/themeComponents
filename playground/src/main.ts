import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import HbComponents from '@hebang/components'

// 样式引入顺序固定：EP 基础样式 -> EP 暗色基础 -> 主题覆盖 -> 组件库样式
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@hebang/theme/style'
import '@hebang/components/style'

import App from './App.vue'

createApp(App).use(ElementPlus, { locale: zhCn }).use(HbComponents).mount('#app')
