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

  <pre>{{list}}</pre>
  <pre>{{ getArea }}</pre>
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
    // this.$store.commit('setCity', 'ubikeTaipei');
  },
  computed: {
    ...mapState(['city','ubikeTaipei','ubikeArea','list','sort']),
    ...mapGetters(['getList','getArea']),
    setCity
  },
  methods: {
    ...mapMutations(['setTaipeiUbike','setCity']),
    ...mapActions(['loadTaipeiUbike']),
  }
}
</script>

<style>

</style>
