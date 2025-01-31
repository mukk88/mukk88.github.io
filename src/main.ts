import './assets/main.css'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import router from './router'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({components, directives})
const app = createApp(App)

app.use(vuetify).use(router)

app.mount('#app')
