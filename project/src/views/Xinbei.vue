<template>
  <ul>
    <li v-for="(item,idx) in data" :key="idx">{{ item.title }}</li>
  </ul>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'xinbei',
  data(){

  },
  computed:{
    ...mapState(['data'])
  },
  mounted(){
    // this.setDataInfo(['a','b','c']);
  },
  methods: {
    ...mapMutations(['setDataInfo']),
    ...mapActions(['loadData'])
  }
}
</script>

<style>

</style>
