<template>
  <div>
    <search-bar
      
      :ubike-area="currentList"
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
    {{ currentCity.cn + city }}
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
  data() {
    return {
      links: [
        { cn: "台北市", en: "taipei", station: 'ubiketaipei' },
        { cn: "新北市", en: "xinbei", station: 'ubikexinbei' },
        { cn: "桃園市", en: "taoyuan", station: 'ubiketaoyuan' }
      ]
    };
  },
  created(){
    const current = this.currentCity.en;
    console.log( this.ubiketaipei )
    this.$store.dispatch('loadTaipeiUbike');
    this.$store.dispatch('loadXinbeiUbike');
    this.$store.dispatch('loadTaoyuanUbike');
 
  },
  computed: {
    currentCity(){
      return this.links.find( e => e.en == this.$route.params.city )
    },
    currentList(){
      console.log(123)
    },
    ...mapState(['city','ubiketaipei','ubikexinbei','ubiketaoyuan','ubikearea','list','sort']),
    ...mapGetters(['getList']),
    
  },
  methods: {
    ...mapMutations(['setTaipeiUbike','setXinbeiUbike','setTaoyuanUbike','setCity']),
    ...mapActions(['loadTaipeiUbike','loadXinbeiUbike','loadTaoyuanUbike']),
  }
}
</script>

<style>

</style>
