<template>
  <div>
    <search-bar
      :ubike-stations="ubikecity[city].stations"
      :ubike-area="ubikearea"
      :ubike-city="ubikecity"
      :list="list"
      v-model="ubikearea.keyword"
    />
    <ubike-list 
      :list="list"
      :sort="sort"
      :setList="getList"
    />
    <pagination 
      :page="list"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import ubikeList from '@/components/Ubikelist.vue'
import searchBar from '@/components/Search.vue'
import pagination from '@/components/Page.vue'

export default {
  name: 'ubike',
  components: { searchBar, pagination, ubikeList  },
  created(){
    this.$store.dispatch('loadTaipeiUbike');
    this.$store.dispatch('loadXinbeiUbike');
    this.$store.dispatch('loadTaoyuanUbike');
    // this.$store.dispatch('loadHsinchuUbike');
  },
  computed: {
    ...mapState(['city','ubikecity','ubikearea','list','sort']),
    ...mapGetters(['getList','getArea']),
    
  },
  methods: {
    ...mapMutations(['setStation','setCity']),
    ...mapActions(['loadTaipeiUbike','loadXinbeiUbike','loadTaoyuanUbike','loadHsinchuUbike']),
  }
}
</script>

<style>

</style>
