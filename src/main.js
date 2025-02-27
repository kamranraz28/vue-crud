import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes/routes'

createApp(App).use(routes).mount('#app')
