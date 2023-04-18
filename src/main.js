import {createApp} from 'vue'
import App from './App.vue'

import router from './router'

const app = createApp(App)

app.config.globalProperties.$backendURL = process.env.VUE_APP_BACKEND_BASE_URL
app.config.globalProperties.$maxQuizNameLength = 25
app.use(router)
app.use(require("vue-cookies"))
app.mount('#app')