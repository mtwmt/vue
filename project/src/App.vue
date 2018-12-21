<template>
  <div id="app">
    <h1>YouBike {{ $route.params.cn }}公共自行車即時資訊</h1>
    <nav>
      <router-link
        v-for="( link, idx ) in links"
        :key="idx"
        :to="'/'+link.en"
      >{{ link.cn + ' | ' }}</router-link>
      <!-- <router-link to="/taipei">台北市</router-link> | 
      <router-link to="/xinbei">新北市</router-link>-->
    </nav>
    <br>
    <router-view/>
  </div>
</template>
<script>
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
      let self = this;
      return this.links.find(function(e) {
        if (self.$route.en === e.en) {
          return (self.$route.params.cn = e.cn);
        }
      });
    }
  },
  created() {},
  methods: {
    changeCity: function() {
      this.getLabel;
      console.log(this.$route.name);
    }
  }
};
</script>
<style>
body {
  padding: 1rem;
}
</style>
