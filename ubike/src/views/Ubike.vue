<template>
  <div>
    <search-bar
      :data="loadStation"
      :area="ubikearea"
      :page="page"
    />
    <div class="loading" v-if="isLoading">加載中 請稍後...</div>
    <ubike-list 
      v-else
      :data="loadStation"
      :area="ubikearea"
      :page="page"
    />
    <pagination 
      :page="page"
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
  data(){
    return {
      page:{
        pagenow: 1,
        viewlimit: 10,
        pagelimit: 5,
        filterdata: []
      },
      ubikearea:{
        label: '全區搜尋',
        keyword: ''
      }
    }
  },
  created(){
  },
  computed:{
    ...mapState(['isLoading','ubikecity']),
    loadStation(){
      const _self = this,
            routeCity = _self.$route.params.city;
            
      _self.page.pagenow = 1;
      _self.page.filterdata = [];
      _self.ubikearea.label = '全區搜尋';
      _self.ubikearea.keyword = '';

      // 資料載入後 移除loading
      if( _self.ubikecity[routeCity].stations.length > 0 ){
        _self.$store.commit('loadStatus',false);
      }

      return _self.ubikecity[routeCity];
    },
  },
  methods:{}
}
</script>

<style lang="scss" scoped>
  .loading{
    margin-top: 50px;
    text-align: center;
  }
</style>
