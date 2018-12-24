<template>
  <div>
    <search-bar
      :ubike-stations="ubikeTaoyuan"
      :ubike-area="ubikeArea"
      :list="list"
      v-model="ubikeArea.keyword"
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
  name: 'taoyuan',
  components: { searchBar, pagination, ubikeList  },
  created(){
    if( !this.ubikeTaoyuan.length ){
      this.$store.dispatch('loadTaoyuanUbike');
    }
  },
  computed: {
    ...mapState(['ubikeTaoyuan','ubikeArea','list','sort']),
    ...mapGetters(['getList','getArea'])
  },
  methods: {
    ...mapMutations(['setTaoyuanUbike','setCity']),
    ...mapActions(['loadTaoyuanUbike']),
  }
}
</script>

<style>

</style>
