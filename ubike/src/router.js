import Vue from 'vue';
import Router from 'vue-router';
import ubike from './views/Ubike.vue';
import { mapState, mapMutations, mapGetters } from 'vuex';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'taipei',
      // component: taipei,
    },
    {
      path: '/:city',
      component: ubike,
    },
  ],
});

export default router;
