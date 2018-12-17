<template>
  <div id="app">
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
