import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/authStore.js'
import './assets/css/base.css'
import './assets/css/globalVariables.css'

const app = createApp(App)
app.use(createPinia())

const authStore = useAuthStore()
authStore.restoreAuth()

app.use(router)
app.mount('#app')
