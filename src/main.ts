import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/user'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

const userStore = useUserStore()

userStore.fetchUser().finally(() => {
  app.mount('#app')
})
