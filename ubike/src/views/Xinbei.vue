<template>
  <div>
    <search-bar
      :ubike-stations="ubikeXinbei"
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
  name: 'xinbei',
  components: { searchBar, pagination, ubikeList  },
  created(){
    this.$store.dispatch('loadXinbeiUbike');
    this.$store.commit('setCity', 'ubikeXinbei');
  },
  computed: {
    ...mapState(['ubikeXinbei','ubikeArea','list','sort']),
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
