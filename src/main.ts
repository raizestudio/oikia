import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueECharts from 'vue-echarts'
import 'echarts'

// Helpers
import { capitalize } from '@/utils/helpers/textHelper'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$capitalize = capitalize

app.use(createPinia())
app.use(router)
app.component('v-chart', VueECharts)

app.mount('#app')
