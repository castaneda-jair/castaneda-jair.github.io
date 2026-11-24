import { createApp } from 'vue';
import App from './App.vue';
import { initAnalytics } from './lib/analytics';
import { router } from './router';
import './styles/global.css';
document.documentElement.classList.add('js');
initAnalytics();
createApp(App).use(router).mount('#app');
