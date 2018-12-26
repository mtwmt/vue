<template>
  <div>
    <search-bar
      :ubike-stations="currentList"
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
    
  },
  computed: {
    currentCity(){
      // var self = this;
      // return this.ubikecity.find(function (e) {
      //   return e.en === self.$route.params.city;
      // });
      return this.ubikecity.find( e => e.en == this.$route.params.city );
    },
    currentList(){
      return this['ubike' + this.currentCity.en];
    },
    ...mapState(['city','ubikecity','ubiketaipei','ubikexinbei','ubiketaoyuan','ubikehsinchu','ubikearea','list','sort']),
    ...mapGetters(['getList']),
    
  },
  methods: {
    ...mapMutations(['setTaipeiUbike','setXinbeiUbike','setTaoyuanUbike','setHsinchuUbike','setCity']),
    ...mapActions(['loadTaipeiUbike','loadXinbeiUbike','loadTaoyuanUbike','loadHsinchuUbike']),
  }
}
</script>

<style>

</style>
