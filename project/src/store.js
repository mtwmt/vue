import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    ubikeTaipei: [],
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
      return temp;
    }
  },
  mutations: {
    setTaipeiUbike( state,data ){
      state.ubikeTaipei = data;
      const temp = state.ubikeTaipei.map( el => el.sarea );
      state.ubikeArea.areas = temp.filter( (el,idx,arr) => (arr.indexOf(el) === idx) );
      state.ubikeArea.areas.splice( 0,1,'全區搜尋');
      state.list.total = state.ubikeTaipei;
    }
  },
  actions: {
    loadTaipeiUbike( obj ){
      axios.get('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
        .then( res => {          
          res = Object.keys(res.data.retVal).map(key => res.data.retVal[key]);
          obj.commit('setTaipeiUbike', res );

        });
    }
  }
});



export default store;

