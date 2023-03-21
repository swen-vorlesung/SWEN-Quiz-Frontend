import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

const app = createApp(App)

app.config.globalProperties.$backendURL = process.env.VUE_APP_BACKEND_BASE_URL
app.use(router)
app.mount('#app')