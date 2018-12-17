import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    setDataInfo( state,res ) {
      state.data = res;
    }
  },
  actions: {
    loadData( context ){
      axios.get('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6')
      .then( res => {
        context.commit('setDataInfo', res.data);
      });
    }
    
  }
});

// let store = new Vuex.Store({
//   state: {
//     data: []
//   },
//   mutations: {
//     setXinbei: function( state,value ){
//       state.xinbeiData = value;
//       // state.xinbeiData.push(value)
//     }
//   },
//   actions: {
//     xinbeiApi( context ){
//       axios.get('http://data.ntpc.gov.tw/api/v1/rest/datastore/382000000A-000352-001',{
//         headers: {'X-Requested-With': 'XMLHttpRequest'},
//         responseType: 'jsonp',
//         params:{}
//       })
//         .then( res => {
//           context.commit( 'setXinbei', res.data.result.records );
//         })
//     }
//   }
// })

export default store;

