import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

// style css
import '@/assets/css/sb-admin-2.min.css'
import '@/assets/vendor/fontawesome-free/css/all.min.css'
import '@/assets/vendor/fontgoogle/fontsgoogleapi.css'
import '@/assets/vendor/datatables/dataTables.bootstrap4.min.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
