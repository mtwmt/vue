import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'popper.js/dist/popper.min.js'

Vue.config.productionTip = false;

// store.dispatch('loadData');
// store.dispatch('loadTaipeiUbike');
router.beforeEach(function (to, from, next) {
  store.commit('loadStatus', true);
  next()
})

router.afterEach(function (to) {
  store.dispatch('load'+ to.params.city +'Ubike');
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


