import Vue from 'vue'
import Router from 'vue-router'
import ubike from './views/Ubike.vue';

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/', 
      redirect: 'taipei',
      // component: taipei,
    },
    {
      path: '/:city',
      component: ubike
    }
    // {
    //   path: '/taipei',
    //   name: 'taipei',
    //   component: taipei
    // },
    // {
    //   path: '/xinbei',
    //   name: 'xinbei',
    //   component: xinbei
    // },
    // {
    //   path: '/taoyuan',
    //   name: 'taoyuan',
    //   component: taoyuan
    // }
  ]
})
