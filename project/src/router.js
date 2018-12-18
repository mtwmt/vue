import Vue from 'vue'
import Router from 'vue-router'
import taipei from './views/Taipei.vue'
import xinbei from './views/Xinbei.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'taipei',
      component: taipei
    },
    {
      path: '/xinbei',
      name: 'Xinbei',
      component: xinbei
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/Xinbei.vue')
    }
  ]
})
