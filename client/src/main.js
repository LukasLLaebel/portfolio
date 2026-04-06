import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import "@fontsource/caprasimo"; // npm install @fontsource/caprasimo
import '@fortawesome/fontawesome-free/css/all.min.css' // npm install @fortawesome/fontawesome-free 

createApp(App).use(router).mount('#app')
