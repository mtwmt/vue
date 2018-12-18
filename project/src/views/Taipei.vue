<template>
  <div>
    <search-bar
      :ubike-area="ubikeArea"
      @setarea="getArea"
      @setkeyword="getKeyword"
      v-model="ubikeArea.keyword"
    />
    <ubike-list 
      :list="list"
      :sort="sort"
      @setSort="getSort"
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
  },
  computed: {
    ...mapState(['ubikeTaipei','ubikeArea','list','sort']),
    ...mapGetters(['getList']),
  },
  methods: {
    ...mapMutations(['setTaipeiUbike']),
    ...mapActions(['loadTaipeiUbike']),
    getSort: function( obj, sort ){
      const self = this;

      let list,
          tempArr = self.list.total;

      if( sort[obj] === 'less' ){
        self.sort[obj] = '';
        list = tempArr.sort( (a,b) => a[obj] - b[obj] );
      }else{
        self.sort[obj] = 'less';
        list = tempArr.sort( (a,b) => b[obj] - a[obj] ); 
      }
      self.getList;
    },
    getArea: function( area, keyword ){
      const self = this;
      // 過濾站點區 將這些區存在 self.ubikeArea.list 裡
      self.ubikeArea.list = self.ubikeTaipei.filter(function( e ){
        if( e.sarea.indexOf( area ) >= 0 ){
          return e;
        }
      });
      self.ubikeArea.label = area;
      self.list.total = (!self.ubikeArea.list.length)? self.ubikeTaipei: self.ubikeArea.list;
      
      if( self.ubikeArea.keyword.length > 0 ){
        self.getKeyword( keyword );
      }
      self.list.pagenow = 0;
      self.getList;
    },
    getKeyword: function( key ){
      const self = this,
            tempArr = (!self.ubikeArea.list.length) ? self.ubikeTaipei : self.ubikeArea.list;
      self.list.total = tempArr.filter(function( e ){
        if( e.sna.indexOf( key ) >= 0 ){
          return e;
        }
      });
      self.list.pagenow = 0;
      self.getList;
    }
  }
}
</script>

<style>

</style>
