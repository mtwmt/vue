<template>
  <div id="app">
    <h1>YouBike {{ $route.params.city }}公共自行車即時資訊</h1>
    <nav>
      <router-link v-for="( link, idx ) in links" :key="idx" :to="'/'+link.name">{{ link.city + ' | ' }}</router-link>
      <!-- <router-link to="/taipei">台北市</router-link> | 
      <router-link to="/xinbei">新北市</router-link> -->
    </nav>
    <br />
    <router-view />
  </div>
</template>
<script>

export default {
  name: 'app',
  data(){
    return{
      links: [
        {city: '台北市', name: 'taipei'},
        {city: '新北市', name: 'xinbei'}
      ]
    }
  },
  computed: {
    getLabel: function(){
      let self = this;
      return this.links.find(function( e ){
        if( self.$route.name === e.name ) {
          return self.$route.params.city = e.city
        }
      });
    }
  },
  created(){
    this.getLabel;
    console.log( this.$route.name )
  }
}
</script>
<style>
body{ 
  padding: 1rem;
}
</style>
