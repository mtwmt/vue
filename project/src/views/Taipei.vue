<template>
  <div class="home">
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
    />
    <pagination 
      :page="list"
      @listshow="getList"
    />
  </div>
</template>

<script>
import axios from 'axios'
import ubikeList from '@/components/Ubikelist.vue'
import searchBar from '@/components/Search.vue'
import pagination from '@/components/Page.vue'

export default {
  name: 'taipei',
  components: { searchBar,pagination,ubikeList  },
  data: function(){
    return {
      ubikeStops: [],
        ubikeArea: {
        label: '全區搜尋',
        areas: [],
        list: [],
        keyword:''
      },
      list: {
        total: [],
        data: [],
        viewlimit: 10,
        pagelimit: 20,
        pagelist: [],
        pagenow: '',
        pagetotal: ''
      },
      sort: {
        sbi: '',
        tot: ''
      },
    }
  },
  created: function(){
    axios.get('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
      .then(res => {
        // 將 json 轉陣列後存入 this.ubikeStops
        this.ubikeStops = Object.keys(res.data.retVal).map(key => res.data.retVal[key]);
        // 建立空陣列放行政區
        const temp = this.ubikeStops.map( el => el.sarea );
        // 將重複的行政區過濾存入 this.area
        this.ubikeArea.areas = temp.filter( (el,idx,arr) => (arr.indexOf(el) === idx) );
        this.ubikeArea.areas.splice( 0,1,'全區搜尋');
        this.list.total = this.ubikeStops; 

        this.getList( this.list.total );

      });
  },
  methods: {
    getSort: function( obj, sort ){
      const self = this;
      let list = self.list.total,
          tempArr = self.list.total;
      if( sort[obj] === 'less' ){
        self.sort[obj] = '';
        list = tempArr.sort( (a,b) => a[obj] - b[obj] );
      }else{
        self.sort[obj] = 'less';
        list = tempArr.sort( (a,b) => b[obj] - a[obj] ); 
      }
      this.getList( list ,0);
    },
    getArea: function( area, keyword ){
      const self = this;
      self.ubikeArea.list = self.ubikeStops.filter(function( e ){
        if( e.sarea.indexOf( area ) >= 0 ){
          return e;
        }
      });
      self.ubikeArea.label = area;
      self.list.total = (!self.list.total.length)? self.ubikeStops: self.ubikeArea.list;
      
      if( self.ubikeArea.keyword.length > 0 ){
        self.getKeyword( keyword );
      }

      self.getList( self.list.total );
    },
    getKeyword: function( key ){
      const self = this,
            tempArr = (!self.ubikeArea.list.length) ? self.ubikeStops : self.ubikeArea.list;
      self.list.total = tempArr.filter(function( e ){
        if( e.sna.indexOf( key ) >= 0 ){
          return e;
        }
      });
      self.getList( self.list.total );
    },
    // 處理列表一頁show幾筆
    getList: function( data, num ){
      num = num || 0;
      const self = this;
      self.list.data = [];
      self.list.pagenow = num;

      var start = num * self.list.viewlimit,
          limit =  Math.min( (start + self.list.viewlimit), data.length );

      for( start; start < limit; start++ ){
        self.list.data.push( data[start] );
      }
    }
  }
}
</script>
