import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    city: 'ubikeTaipei',
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
      pagelimit: 5,
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
    },
    getArea: function( state ){
      //  console.log( 'state',state.city )
      const 
            city = (!state.city)? 'ubikeTaipei':state.city,
            temp = state[city].map( el => el.sarea );

      state.ubikeArea.areas = temp.filter( (el,idx,arr) => (arr.indexOf(el) === idx) );
      state.ubikeArea.areas.splice( 0,1,'全區搜尋');
      state.list.total = state[city]; 
    }
  },
  mutations: {
    setTaipeiUbike( state,data ){
      state.ubikeTaipei = data;
    },
    setXinbeiUbike( state,data ){
      state.ubikeXinbei = data;
    },
    setCity( state,data ){
      state.city = data;
      state.ubikeArea.keyword = '';
      state.ubikeArea.label = '全區搜尋';
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
      // axios.get('api/v1/rest/datastore/382000000A-000352-001')
      axios.get('https://script.google.com/macros/s/AKfycbzOdvWalYBBLDWpX1h_mE0mL-HMV9wygY6jI-ITovsVPIb6LSqb/exec')
        .then( res => {
          res = Object.keys(res.data.result.records).map(key => res.data.result.records[key]);
          obj.commit('setXinbeiUbike', res );
        });
    }
  }
});

<<<<<<< HEAD
export default store;

=======
export default store;
>>>>>>> 00bef3e479ca97a773a4d145edbc9516ab5b6a11
