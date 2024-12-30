import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/styles/theme.css'

// 创建应用实例
const app = createApp(App)

// 使用 Pinia
const pinia = createPinia()
app.use(pinia)

// 使用路由
app.use(router)

// 初始化主题
import { useThemeStore } from './stores/theme'
const themeStore = useThemeStore(pinia)
themeStore.initTheme()

// 挂载应用
app.mount('#app') 