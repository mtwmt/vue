import Vue from 'vue'
import Router from 'vue-router'
import taipei from './views/Taipei.vue'
import xinbei from './views/Xinbei.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'taipei',
      component: taipei
    },
    {
      path: '/taipei',
      name: 'taipei',
      component: taipei
    },
    {
      path: '/xinbei',
      name: 'xinbei',
      component: xinbei
    }
  ]
})
