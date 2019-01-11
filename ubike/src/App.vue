<template>
  <div id="app">
    <h1>{{ currentCity.bike }} {{ currentCity.cn }}公共自行車即時資訊</h1>
    <nav>
      <ul>
        <router-link
          tag="li"
          class="btn btn-outline-secondary"
          active-class="active"
          v-for="( link, key, idx ) in ubikecity"
          :key="idx"
          :to="{ path: '/'+link.en }"
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
    ...mapState(["ubikecity"]),
    currentCity: function() {
      const self = this;
      let temp = self.$route.path.split("/")[1];
      return self.ubikecity[temp];
    }
  },
  created() {
    
  },
  methods: {
    // ...mapMutations(["setStation"]),
    // ...mapGetters(["initLoad"]),
  }
};
</script>
<style lang="scss">
body {
  padding: 1rem;
  background-color: #f8f8f8;
}
ul > li {
  margin: 0.5rem 0.5rem 0 0;
}
</style>