import './assets/css/base.css'
import PrimeVue from 'primevue/config';
import axios from 'axios'
import VueAxios from 'vue-axios'
import apiService from '@/service/apiService';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueAxios, apiService);
app.use(createPinia())
app.use(router)
app.use(PrimeVue);
app.mount('#app')
