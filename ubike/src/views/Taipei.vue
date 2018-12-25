<template>
  <div>
    <search-bar
      :ubike-stations="ubiketaipei"
      :ubike-area="ubikearea"
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
  name: 'taipei',
  components: { searchBar, pagination, ubikeList  },
  created(){
    if( !this.ubiketaipei.length ){
      this.$store.dispatch('loadTaipeiUbike');
    }
    
  },
  computed: {
    ...mapState(['ubiketaipei','ubikearea','list','sort']),
    ...mapGetters(['getList'])
  },
  methods: {
    ...mapMutations(['setTaipeiUbike','setCity']),
    ...mapActions(['loadTaipeiUbike']),
    
  }
}
</script>

<style>

</style>
