import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    city: '',
    ubiketaipei: [],
    ubikexinbei: [],
    ubiketaoyuan: [],
    ubikehsinchu: [],
    ubikecity: [
      { cn: '台北市', en: 'taipei' },
      { cn: '新北市', en: 'xinbei' },
      { cn: '桃園市', en: 'taoyuan' },
      // { cn: '新竹市', en: 'hsinchu' },
    ],
    ubikearea: {
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
      state.ubikearea.areas = state.ubikearea.areas || [];
      const station = !state.city ? state.ubiketaipei : state['ubike' + state.city],
        temp = station.map(el => el.sarea);

      state.ubikearea.areas = temp.filter((el, idx, arr) => arr.indexOf(el) === idx);
      state.ubikearea.areas.splice(0, 1, '全區搜尋');
      state.list.total = station;
    },
  },
  mutations: {
    setTaipeiUbike(state, data) {
      state.ubiketaipei = data;
    },
    setXinbeiUbike(state, data) {
      state.ubikexinbei = data;
    },
    setTaoyuanUbike(state, data) {
      state.ubiketaoyuan = data;
    },
    setHsinchuUbike(state, data) {
      state.ubikehsinchu = data;
    },
    setCity(state, data) {
      state.city = data;
      state.ubikearea.keyword = '';
      state.ubikearea.label = '全區搜尋';
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
    loadXinbeiUbike(obj) {
      axios
        .get(
          'https://script.google.com/macros/s/AKfycbzOdvWalYBBLDWpX1h_mE0mL-HMV9wygY6jI-ITovsVPIb6LSqb/exec?url=data.ntpc.gov.tw/api/v1/rest/datastore/382000000A-000352-001'
        )
        .then(res => {
          res = Object.keys(res.data.result.records).map(key => res.data.result.records[key]);
          let temp = res.filter(i => i.act === '1');
          obj.commit('setXinbeiUbike', temp);
        });
    },
    loadTaoyuanUbike(obj) {
      axios
        .get(
          'https://script.google.com/macros/s/AKfycbzn2V1by0BTpdXW975rnHNvX6fF6nA4SxYyMlOGjNA4EE_wtg0/exec'
        )
        .then(res => {
          res = Object.keys(res.data.retVal).map(key => res.data.retVal[key]);
          let temp = res.filter(i => i.act === '1');
          obj.commit('setTaoyuanUbike', temp);
        });
    },
    loadHsinchuUbike(obj) {
      axios
        .get(
          'https://script.google.com/macros/s/AKfycbzOdvWalYBBLDWpX1h_mE0mL-HMV9wygY6jI-ITovsVPIb6LSqb/exec?url=opendata.hccg.gov.tw/dataset/1f334249-9b55-4c42-aec1-5a8a8b5e07ca/resource/4d5edb22-a15e-4097-8635-8e32f7db601a/download/20180702150422381.json'
        )
        .then(res => {
          var newData = [];
          res.data.map(function( e,i ){
            newData[i] = {};
            for( let item in e ){
              switch (item) {
                case '圖片URL':
                  newData[i].url = e[item];
                  break;
                case '站點位置':
                  newData[i].ar = e[item];
                  break;
                case '站點名稱':
                  newData[i].sna = e[item];
                  break;
                case '經度':
                  newData[i].lng = e[item];
                  break;
                case '緯度':
                  newData[i].lat = e[item];
                  break;
                case '車柱數':
                  newData[i].tot = e[item];
                  break;
                case '資料更新時間':
                  newData[i].mday = e[item];
                  break;
              }
            }
          });
          console.log( newData )
          // res = Object.keys(res.data.retVal).map(key => res.data.retVal[key]);
          // let temp = res.filter(i => i.act === '1');
          obj.commit('setHsinchuUbike', newData);
        });
    },
  },
});

export default store;

// sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
// sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
// lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
// snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態
