<template>
  <div id="app">
    <h1>YouBike {{ currentCity.cn }}公共自行車即時資訊</h1>
    <nav>
      <ul>
      <router-link
        tag="li"
        class="btn btn-outline-secondary"
        active-class="active"
        v-for="( link, idx ) in ubikecity"
        :key="idx"
        :to="{ path: '/'+link.en }"
        :click="goCity"
      >{{ link.cn }}</router-link>
      </ul>
    </nav>
    <!-- <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="cityButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >{{ currentCity.cn }}</button>
      <div class="dropdown-menu" aria-labelledby="cityButton">
        <a
          class="dropdown-item"
          href="#"
          v-for="( link, idx ) in ubikecity"
          :key="idx"
          @click="goCity( link.en )"
        >{{ link.cn }}</a>
      </div>
    </div> -->

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
      let temp = {};
      self.ubikecity.find(function(e) {
        if ("/" + e.en == self.$route.path) {
          temp = e;
        }
      });
      return temp;
    },
    goCity(){
      this.$store.commit("setCity", this.currentCity.en);
      this.getArea(this.currentCity.en);
    }
  },
  created() {},
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
