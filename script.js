var vm = new Vue({
  el: '#app',
  data: {
    ubikeStops: [],
    ubikeArea: [],
    getList: [],
    showArea: [],
    pageView: [],
    getPage: '',
    getArea: '全區搜尋',
    keyWord: '',
    sort: {
      sbi: '',
      tot: ''
    },
    list:{
      show: 10
    },
    page: {
      total: '',
      limit: 10,
      start: '',
      now: ''
    }
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
        this.ubikeArea = temp.filter( (el,idx,arr) => (arr.indexOf(el) === idx) );
        this.ubikeArea.splice( 0,1,'全區搜尋');
        this.getList = this.ubikeStops; 

        this.showList( this.getList );
      });
  },
  computed: {},
  methods: {
    getSarea: function( area, key ) {
      const self = this;
      // self.showArea = self.ubikeStops.filter( e => ( e.sarea.indexOf( area ) >= 0 ) ? e : '' );
      
      self.showArea = self.ubikeStops.filter(function( e,i ){
        if( e.sarea.indexOf( area ) >= 0 ){
          return e;
        }
      });
      self.getArea = area;
      self.getList = (!self.showArea.length) ? self.ubikeStops: self.showArea;
      if( self.keyWord.length > 0){
        self.getKeyword( key );
      }
      this.showList( this.getList );
    },
    getKeyword: function( key ){
      const self = this,
            tempArr = (!self.showArea.length) ? self.ubikeStops : self.showArea;

      self.getList = tempArr.filter(function( e,i ){
        // console.log( e.sna )
        if( e.sna.indexOf( key ) >= 0 ){
          return e;
        }
      });

      this.showList( this.getList );
    },
    getSort: function( obj, sort ){
      const self = this,
            tempArr = self.getList;
      
      if( sort[obj] === 'less' ){
        self.sort[obj] = '';
        self.getList = tempArr.sort( (a,b) => a[obj] - b[obj] );
      }else{
        self.sort[obj] = 'less';
        self.getList = tempArr.sort( (a,b) => b[obj] - a[obj] ); 
      }
      
      this.showList( this.getList ,0);
    },
    showList: function( data, num ){
      num = num || 0;
      const self = this;
      self.pageView = [];
      self.page.now = num;

      var start = num * self.list.show,
          limit = Math.min( (start + self.list.show), data.length );

      for( start; start < limit; start++ ){
        self.pageView.push( data[start] );
      };
    },
    pagination: function( num ){
      
      const self = this;
      var currentPage = num || 1,
          pLimit = self.page.limit,
          totalPage = parseInt( self.getList.length / self.list.show );  //總頁數
          (totalPage % self.list.show == 0)? totalPage = totalPage: totalPage = totalPage + 1;
      

      
      var tempArr = [],
          start = (currentPage - ((currentPage - 1) % pLimit)),
          limit = Math.min(  (currentPage - ((currentPage - 1) % pLimit) + (pLimit - 1) ) ,totalPage);

      for( start; start <= limit ; start++ ){
        tempArr.push( start );
      };

      console.log( 'num',num,'start',tempArr )
      return tempArr;

    }
  }
});



// 欄位說明請參照:
// http://data.taipei/opendata/datalist/datasetMeta?oid=8ef1626a-892a-4218-8344-f7ac46e1aa48

// sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
// sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
// lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
// snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態