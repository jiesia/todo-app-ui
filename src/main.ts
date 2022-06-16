import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import router from './router';
import App from './App.vue';
import 'element-plus/dist/index.css';
import './common.css';

const app = createApp(App);

// vue plugins
app.use(router);
app.use(createPinia());
app.use(ElementPlus);

app.mount('#app');
