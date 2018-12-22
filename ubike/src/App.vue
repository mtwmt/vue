<template>
  <div id="app">
    <h1>YouBike {{ getLabel }}公共自行車即時資訊</h1>
    <nav>
      <router-link
        v-for="( link, idx ) in links"
        :key="idx"
        :to="{ path: '/' + link.en  }"
        click= "getLabel"
      >{{ link.cn + ' | ' }}</router-link>
      <!-- <router-link to="/taipei">台北市</router-link> | 
      <router-link to="/xinbei">新北市</router-link>-->
    </nav>
    <br>
    <router-view/>
  </div>
</template>
<script>
// import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: "app",
  data() {
    return {
      links: [
        { cn: "台北市", en: "taipei" },
        { cn: "新北市", en: "xinbei" }
      ]
    };
  },
  computed: {
    getLabel: function() {
      const self = this;
      let temp = {};
      self.links.find(function( e ){
        if( ('/' + e.en) == self.$route.path ){
          temp = e.cn;
         
        }
      });
      return temp;
    }
  },
  created() {
    
  },
  methods: {
  }
};
</script>
<style>
body {
  padding: 1rem;
}
</style>
