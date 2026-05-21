import { createApp } from 'vue';
import router from './router';
import { createPinia } from 'pinia';
import { createBootstrap } from 'bootstrap-vue-next';
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { FcGoogle } from 'oh-vue-icons/icons';
import VueApexCharts from "vue3-apexcharts";
import axios from 'axios'
import VueAxios from 'vue-axios'
import authService from '@/services/authService';
import { useAuthStore } from '@/stores/auth';
import ToastPlugin from 'vue-toast-notification';
import App from './App.vue';

import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import 'bootstrap/scss/bootstrap.scss';
import '@/assets/scss/style.scss';

addIcons(FcGoogle);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('v-icon', OhVueIcon);
app.use(createPinia());
app.use(router);
app.use(createBootstrap());
app.use(VueAxios, axios);
app.use(VueApexCharts);
app.use(BootstrapIconsPlugin);
app.use(ToastPlugin);
app.mount('#app');

authService.initializeAuth();
const authStore = useAuthStore();
authStore.initialize();