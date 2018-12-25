<template>
  <div>
    <search-bar
      :ubike-stations="currentList"
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
  name: 'ubike',
  components: { searchBar, pagination, ubikeList  },
  data() {
    return {
      links: [
        { cn: "台北市", en: "taipei" },
        { cn: "新北市", en: "xinbei" },
        { cn: "桃園市", en: "taoyuan" }
      ]
    };
  },
  created(){
    this.$store.dispatch('loadTaipeiUbike');
    this.$store.dispatch('loadXinbeiUbike');
    this.$store.dispatch('loadTaoyuanUbike');
  },
  computed: {
    currentCity(){
      // var self = this;
      // return this.links.find(function (e) {
      //   return e.en === self.$route.params.city;
      // });
      return this.links.find( e => e.en == this.$route.params.city );
    },
    currentList(){
      if( this.$route.params.city == this.currentCity.en ){
        return this['ubike' + this.currentCity.en];
      }
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
