<template>
  <div>
    <search-bar
      :ubike-stations="ubikeTaipei"
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
  name: 'taipei',
  components: { searchBar, pagination, ubikeList  },
  created(){
    this.$store.dispatch('loadTaipeiUbike');
    console.log( 111,this.$store.getters.getArea )
    this.$store.getters.getArea = '000';
  },
  computed: {
    ...mapState(['ubikeTaipei','ubikeArea','list','sort']),
    ...mapGetters(['getList','getArea']),
    
  },
  methods: {
    ...mapMutations(['setTaipeiUbike']),
    ...mapActions(['loadTaipeiUbike']),
  }
}
</script>

<style>

</style>
