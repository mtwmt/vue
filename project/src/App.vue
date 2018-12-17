<template>
  <div id="app">
<<<<<<< HEAD
    <div id="nav">
      <BB />
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import BB from './components/Test.vue';

export default {
  name: 'app',
  components: {
    BB,
  },
};
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
=======
    <h1>YouBike {{ city }}公共自行車即時資訊</h1>
    <nav>
      <router-link to="/">台北市</router-link> |
      <router-link to="/xinbei">新北市</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>


export default {
  name: 'app', 
  data(){
    return{
      city: '台北市',
      data: [],
      area: []
    }
  }
}
</script>
<style>
body{ 
  padding: 1rem;
}
</style>
>>>>>>> 6901931982a15a58a327595a018d2e2ff82c931c
