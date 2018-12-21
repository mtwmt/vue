import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    ubikeTaipei: [],
    ubikeXinbei: [],
    ubikeArea: {
      label: '全區搜尋',
      areas: [],
      list: [],
      keyword:''
    },
    list: {
      total: [],
      viewlimit: 10,
      pagelimit: 20,
      pagenow: 0,
      pagetotal: ''
    },
    sort: {
      sbi: '',
      tot: ''
    }
  },
  getters: {
    getList: function( state ){
      var temp = [],
          start = state.list.pagenow * state.list.viewlimit,
          limit =  Math.min( (start + state.list.viewlimit), state.list.total.length );
      for( start; start < limit; start++ ){
        temp.push( state.list.total[start] );
      }
      // console.log( 'gutter',gutter )
      return temp;
    },
    test:function( state, gutters ){
      return 'aaa'
    },
    getArea: function( state, gutter ){
      const temp = state.ubikeTaipei.map( el => el.sarea );
      state.ubikeArea.areas = temp.filter( (el,idx,arr) => (arr.indexOf(el) === idx) );
      state.ubikeArea.areas.splice( 0,1,'全區搜尋');
      state.list.total = state.ubikeTaipei;

      // console.log( 'gutter', gutter)
      return store.getters.test.length
    }
  },
  mutations: {
    setTaipeiUbike( state,data ){
      state.ubikeTaipei = data;
    },
    setXinbeiUbike( state,data ){
      state.ubikeXinbei = data;
      
    }
  },
  actions: {
    loadTaipeiUbike( obj ){
      axios.get('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
        .then( res => {          
          res = Object.keys(res.data.retVal).map(key => res.data.retVal[key]);
          obj.commit('setTaipeiUbike', res );
        });
    },
    loadXinbeiUbike( obj ){
      axios.get('api/v1/rest/datastore/382000000A-000352-001')
        .then( res => {
          // console.log( res.data.result.records );
          res = Object.keys(res.data.result.records).map(key => res.data.result.records[key]);
          obj.commit('setXinbeiUbike', res );
        })
    }
  }
});



export default store;

