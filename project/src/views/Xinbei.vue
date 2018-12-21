<template>
  <div>
    
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
// import ubikeList from '@/components/Ubikelist.vue'
// import searchBar from '@/components/Search.vue'
// import pagination from '@/components/Page.vue'

export default {
  name: 'xinbei',
  components: { },
  created(){
    this.$store.dispatch('loadXinbeiUbike');
  },
  computed: {
    ...mapState(['ubikeTaipei','ubikeArea','list','sort']),
  },
  methods: {

  }
}
</script>

<style>

</style>
