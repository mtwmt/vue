Vue.component('searchBar',{
  props:['ubikeArea'],
  methods: {
    setArea: function( area,keyword ){
      this.$emit('setarea',area,keyword );
    },
    setKeyword: function( keyword ){
      this.$emit('setkeyword',keyword );
    }
  },
  template: `
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ ubikeArea.label }}</button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#" 
          @click="setArea( area, ubikeArea.keyword)" 
          v-for="(area, idx) in ubikeArea.areas"
        >{{ area }}</a>
      </div>
    </div>
    <input type="search" class="form-control" aria-label="Text input with dropdown button"
      :value="ubikeArea.keyword"
      @input="$emit('input',$event.target.value)"
    >
    <div class="input-group-append">
      <button @click="setKeyword(ubikeArea.keyword)" class="btn btn-outline-secondary" type="button">Search</button>
    </div>
  </div>
  `
});
Vue.component('pagination',{
  props:['page'],
  computed: {
    pageTotal: function(){
      // 偵聽當下有幾頁
      return this.setPage();
    },
    pageNow: function(){
      return this.page.pagenow + 1;
    },
    pagePrev: function(){
      return (this.page.pagenow <= 0)? this.page.pagenow : (this.page.pagenow - 1);
    },
    pageNext: function(){
      return  (this.pageNow === this.page.pagetotal )? this.page.pagetotal - 1  : this.page.pagenow + 1;
    }
  },
  watch: {
    pageTotal: function(){}
  },
  methods: {
    setPage: function( num ){
      const self = this;
      let currentPage = num || 1,
          pLimit = self.page.pagelimit,
          totalPage = parseInt( self.page.total.length / self.page.viewlimit );  //總頁數
          
      (totalPage % self.page.viewlimit == 0)? totalPage = totalPage: totalPage = totalPage + 1;
      self.page.pagetotal =  totalPage;
      
      var tempArr = [],
          start = (currentPage - ((currentPage - 1) % pLimit)),
          limit = Math.min(  (currentPage - ((currentPage - 1) % pLimit) + (pLimit - 1) ) ,totalPage);

      for( start; start <= limit ; start++ ){
        tempArr.push( start );
      };
      return tempArr;
    },
    setlist: function( data,num ){
      const self = this;
      self.page.pagenow = num;
      this.$emit('listshow',data, self.page.pagenow );
    }
  },
  template:`
  <nav aria-label="Page navigation" v-if="page.pagetotal > 0">
    <ul class="pagination justify-content-end">
      <li class="page-item">
        <a class="page-link" @click="setlist( page.total, pagePrev)" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li :class="(pg === pageNow )? 'page-item active': 'page-item'" 
        v-for="(pg, i) in setPage( page.pagenow + 1 )"
        @click="setlist( page.total, pg-1 )"
      ><a class="page-link" href="#">{{ pg }}</a></li>
      <li class="page-item">
        <a class="page-link" @click="setlist( page.total, pageNext)" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
  `
});

var vm = new Vue({
  el: '#app',
  data:{
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
      viewlimit: 15,
      pagelimit: 10,
      pagelist: [],
      pagenow: '',
      pagetotal: ''
    },
    sort: {
      sbi: '',
      tot: ''
    },
  },
  filters: {
    timeFormat(t) {
      var date = [],
        time = [];
      date.push(t.substr(0, 4));
      date.push(t.substr(4, 2));
      date.push(t.substr(6, 2));
      time.push(t.substr(8, 2));
      time.push(t.substr(10, 2));
      time.push(t.substr(12, 2));
      return date.join("/") + ' ' + time.join(":");
    }
  },
  created() {
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
      self.ubikeArea.list = self.ubikeStops.filter(function( e,i ){
        if( e.sarea.indexOf( area ) >= 0 ){
          return e;
        }
      });
      self.ubikeArea.label = area;
      self.list.total = (!self.list.total.length)? self.ubikeStops: self.ubikeArea.list;
      
      if( self.ubikeArea.keyword.length > 0 ){
        self.getKeyword( keyword );
      }

      this.getList( self.list.total );
    },
    getKeyword: function( key ){
      const self = this,
            tempArr = (!self.ubikeArea.list.length) ? self.ubikeStops : self.ubikeArea.list;
      self.list.total = tempArr.filter(function( e,i ){
        if( e.sna.indexOf( key ) >= 0 ){
          return e;
        }
      });
      this.getList( self.list.total );
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
      };
    }
  }  
});

// 欄位說明請參照:
// http://data.taipei/opendata/datalist/datasetMeta?oid=8ef1626a-892a-4218-8344-f7ac46e1aa48

// sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
// sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
// lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
// snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態