import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import 'virtual:uno.css'
import { registerSW } from 'virtual:pwa-register'
import { pwaInfo } from 'virtual:pwa-info'

console.log(pwaInfo)

// PWA更新提示
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('有新版本可用，是否更新？')) {
      updateSW()
    }
  },
  onOfflineReady() {
    console.log('应用已可离线使用')
  }
})

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
