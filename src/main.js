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
import authService from '@/services/authService'; // Add this
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import App from './App.vue';

import 'tiny-slider/dist/tiny-slider.css';
import 'glightbox/dist/css/glightbox.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import 'choices.js/src/styles/choices.scss';
import 'overlayscrollbars/styles/overlayscrollbars.css';
import 'aos/dist/aos.css';
import 'plyr/dist/plyr.css';

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
authService.initializeAuth(); 
app.mount('#app');