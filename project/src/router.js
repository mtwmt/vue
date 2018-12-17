<<<<<<< HEAD
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);
=======
import Vue from 'vue'
import Router from 'vue-router'
import taipei from './views/Taipei.vue'

Vue.use(Router)
>>>>>>> 6901931982a15a58a327595a018d2e2ff82c931c

export default new Router({
  routes: [
    {
      path: '/',
<<<<<<< HEAD
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
=======
      name: 'taipei',
      component: taipei
    },
    {
      path: '/xinbei',
      name: 'Xinbei',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Xinbei.vue')
    }
  ]
})
>>>>>>> 6901931982a15a58a327595a018d2e2ff82c931c
