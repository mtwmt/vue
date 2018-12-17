<<<<<<< HEAD
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
=======
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'popper.js/dist/popper.min.js'

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

// Vue.use(Vuex)
>>>>>>> 6901931982a15a58a327595a018d2e2ff82c931c

new Vue({
  router,
  store,
<<<<<<< HEAD
  render: h => h(App),
}).$mount('#app');
=======
  render: h => h(App)
}).$mount('#app')
>>>>>>> 6901931982a15a58a327595a018d2e2ff82c931c
