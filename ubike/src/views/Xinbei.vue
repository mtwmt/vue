<template>
  <div>
    <search-bar
      :ubike-stations="ubikexinbei"
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
  name: 'xinbei',
  components: { searchBar, pagination, ubikeList  },
  created(){
    if( !this.ubikexinbei.length ){
      this.$store.dispatch('loadXinbeiUbike');
    }
  },
  computed: {
    ...mapState(['ubikexinbei','ubikearea','list','sort']),
    ...mapGetters(['getList','getArea'])
  },
  methods: {
    ...mapMutations(['setXinbeiUbike','setCity']),
    ...mapActions(['loadXinbeiUbike']),
  }
}
</script>

<style>

</style>
