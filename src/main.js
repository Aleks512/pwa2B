import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import './assets/style.css';
import { store } from './store'; //

const app = createApp(App);
app.use(store); //pour permettre à toutes les composantes de l'appli d'accéder à l'état global géré par Vuex.
app.use(router);
app.mount('#app');
