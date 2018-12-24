import Vue from 'vue'
import Router from 'vue-router'
import taipei from './views/Taipei.vue'
import xinbei from './views/Xinbei.vue'

Vue.use(Router)

// export default new Router({
//   // mode: 'history',
//   routes: [
//     {
//       path: '/:id', 
//       redirect: '/ubike/taipei',
//       // component: taipei,
//       children: [
//         {
//           path: '/:name',
//           name: 'taipei',
//           component: taipei
//         },
//         {
//           path: '/:name',
//           name: 'xinbei',
//           component: xinbei
//         }
//       ]
//     }
//   ]
// })
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/', 
      redirect: 'taipei',
      // component: taipei,
      
    },
    {
      path: '/taipei',
      // name: 'taipei',
      component: taipei
    },
    {
      path: '/xinbei',
      // name: 'xinbei',
      component: xinbei
    }
  ]
})
