import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_ROOT;
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;


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
      return temp;
    },
  },
  mutations: {
    setTaipeiUbike( state,data ){
      state.ubikeTaipei = data;
      const temp = state.ubikeTaipei.map( el => el.sarea );
      state.ubikeArea.areas = temp.filter( (el,idx,arr) => (arr.indexOf(el) === idx) );
      state.ubikeArea.areas.splice( 0,1,'全區搜尋');
      state.list.total = state.ubikeTaipei;
    },
    // setXinbeiUbike( state )
  },
  actions: {
    // loadTaipeiUbike( obj ){
    //   axios.get('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
    //     .then( res => {          
    //       res = Object.keys(res.data.retVal).map(key => res.data.retVal[key]);
    //       obj.commit('setTaipeiUbike', res );

    //     });
    // },
    loadTaipeiUbike( obj ){
      axios.get('http://data.ntpc.gov.tw/api/v1/rest/datastore/382000000A-000352-001')
        .then( res => {
          console.log( res );
        })
    }
  }
});



export default store;

