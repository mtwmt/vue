import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    city: '',
    ubikeTaipei: [],
    ubikeXinbei: [],
    ubikeTaoyuan: [],
    ubikeArea: {
      label: '全區搜尋',
      areas: [],
      list: [],
      keyword: '',
    },
    list: {
      total: [],
      viewlimit: 10,
      pagelimit: 5,
      pagenow: 0,
      pagetotal: '',
    },
    sort: {
      sbi: '',
      tot: '',
    },
  },
  getters: {
    getList: function(state) {
      var temp = [],
        start = state.list.pagenow * state.list.viewlimit,
        limit = Math.min(start + state.list.viewlimit, state.list.total.length);
      for (start; start < limit; start++) {
        temp.push(state.list.total[start]);
      }
      return temp;
    },
    getArea: function(state) {
      const city = !state.city ? 'ubikeTaipei' : state.city,
        temp = state[city].map(el => el.sarea);

      state.ubikeArea.areas = temp.filter((el, idx, arr) => arr.indexOf(el) === idx);
      state.ubikeArea.areas.splice(0, 1, '全區搜尋');
      state.list.total = state[city];
    },
  },
  mutations: {
    setTaipeiUbike(state, data) {
      state.ubikeTaipei = data;
    },
    setXinbeiUbike(state, data) {
      state.ubikeXinbei = data;
    },
    setTaoyuanUbike(state, data) {
      state.ubikeTaoyuan = data;
    },
    setCity(state, data) {
      state.city = data;
      state.ubikeArea.keyword = '';
      state.ubikeArea.label = '全區搜尋';
    },
  },
  actions: {
    loadTaipeiUbike(obj) {
      axios.get('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz').then(res => {
        res = Object.keys(res.data.retVal).map(key => res.data.retVal[key]);
        let temp = res.filter(i => i.act === '1');
        obj.commit('setTaipeiUbike', temp);
      });
    },
<<<<<<< HEAD
    loadXinbeiUbike( obj ){
      axios.get('http://data.ntpc.gov.tw/api/v1/rest/datastore/382000000A-000352-001')
      // axios.get('https://script.google.com/macros/s/AKfycbzOdvWalYBBLDWpX1h_mE0mL-HMV9wygY6jI-ITovsVPIb6LSqb/exec')
        .then( res => {
=======
    loadXinbeiUbike(obj) {
      axios
        .get(
          'https://script.google.com/macros/s/AKfycbzOdvWalYBBLDWpX1h_mE0mL-HMV9wygY6jI-ITovsVPIb6LSqb/exec?url=data.ntpc.gov.tw/api/v1/rest/datastore/382000000A-000352-001'
        )
        .then(res => {
>>>>>>> MAC
          res = Object.keys(res.data.result.records).map(key => res.data.result.records[key]);
          let temp = res.filter(i => i.act === '1');
          obj.commit('setXinbeiUbike', temp);
        });
    },
    loadTaoyuanUbike(obj) {
      axios
        .get('https://script.google.com/macros/s/AKfycbzn2V1by0BTpdXW975rnHNvX6fF6nA4SxYyMlOGjNA4EE_wtg0/exec')
        .then(res => {
          console.log(res.data.retVal);
          res = Object.keys(res.data.retVal).map(key => res.data.retVal[key]);
          let temp = res.filter(i => i.act === '1');
          obj.commit('setTaoyuanUbike', temp);
        });
    },
  },
});

export default store;

// sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
// sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
// lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
// snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態
