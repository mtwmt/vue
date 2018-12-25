<template>
  <div id="app">
    <h1>YouBike {{ currentCity.cn }}公共自行車即時資訊</h1>
    <nav>
      <router-link
        v-for="( link, idx ) in links"
        :key="idx"
        :to="{ path: '/'+link.en  }"
        :click= "goCity()"
      >{{ link.cn + ' | ' }}</router-link>
    </nav>
    <br>
    <router-view/>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: "app",
  data() {
    return {
      links: [
        { cn: "台北市", en: "taipei" },
        { cn: "新北市", en: "xinbei" },
        { cn: "桃園市", en: "taoyuan" }
      ]
    };
  },
  computed: {
    ...mapState(['city']),
    currentCity: function() {
      const self = this;
      let temp = {};
      self.links.find(function( e ){
        if( ('/' + e.en) == self.$route.path ){
          temp = e;
        }
      });
      return temp;
    },
  },
  created() {
  },
  methods: {
    ...mapMutations(['setCity']),
    ...mapGetters(['getArea']),
    goCity: function(){
      this.$store.commit('setCity', this.currentCity.en );
      this.getArea( this.currentCity.en );
    },
  }
};
</script>
<style>
body {
  padding: 1rem;
}
</style>
