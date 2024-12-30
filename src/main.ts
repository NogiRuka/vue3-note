import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import 'virtual:uno.css'
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    // 可以在这里添加更新提示UI
  },
  onOfflineReady() {
    // 可以在这里添加离线就绪提示UI
  },
})

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
