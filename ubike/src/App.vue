<template>
  <div id="app">
    <h1>YouBike {{ currentCity.cn }}公共自行車即時資訊</h1>
    <nav>
      <ul>
      <router-link
        tag="li"
        class="btn btn-outline-secondary"
        active-class="active"
        v-for="( link, key, idx ) in ubikecity"
        :key="idx"
        :to="{ path: '/'+link.en }"
        :click="goCity"
      >{{ link.cn }}</router-link>
      </ul>
    </nav>
    <br>
    <router-view/>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "app",
  computed: {
    ...mapState(["city", "ubikecity"]),
    currentCity: function() {
      const self = this;
      let temp = self.$route.path.split('/')[1];
      return self.ubikecity[temp];
    },
    goCity(){
      this.$store.commit("setCity", this.currentCity.en);
    }
  },
  created() {
    
  },
  methods: {
    ...mapMutations(["setCity"]),
    ...mapGetters(["getArea"]),
  }
};
</script>
<style lang="scss">
body {
  padding: 1rem;
}
ul>li{
  margin: 0.5rem 0.5rem 0 0;
}
</style>
