import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    isLoading: true,
    ubikecity: {
      taipei: {
        en: 'taipei',
        cn: '台北市',
        stations: [],
      },
      xinbei: {
        en: 'xinbei',
        cn: '新北市',
        stations: [],
      },
      taoyuan: {
        en: 'taoyuan',
        cn: '桃園市',
        stations: [],
      },
      // hsinchu: {
      //   en: 'hsinchu',
      //   cn: '新竹',
      //   stations: [],
      // },
      taichung: {
        en: 'taichung',
        cn: '台中',
        stations: [],
      },
      kaohsiung: {
        en: 'kaohsiung',
        cn: '高雄市',
        stations: [],
      },
    },
  },
  getters: {
    xmltojson: function(){

    }
  },
  mutations: {
    setStation(state, data) {
      return (state.ubikecity[data.city].stations = data.stations);
    },
    loadStatus(state, data) {
      return (state.isLoading = data);
    },
  },
  actions: {
    loadtaipeiUbike(obj) {
      axios.get('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz').then(res => {
        res = Object.keys(res.data.retVal).map(key => res.data.retVal[key]);
        let temp = res.filter(i => i.act === '1');
        obj.commit('setStation', { city: 'taipei', stations: temp });
      });
    },
    loadxinbeiUbike(obj) {
      axios
        .get(
          'https://script.google.com/macros/s/AKfycbzOdvWalYBBLDWpX1h_mE0mL-HMV9wygY6jI-ITovsVPIb6LSqb/exec?url=data.ntpc.gov.tw/api/v1/rest/datastore/382000000A-000352-001'
        )
        .then(res => {
          res = Object.keys(res.data.result.records).map(key => res.data.result.records[key]);
          let temp = res.filter(i => i.act === '1');
          obj.commit('setStation', {
            city: 'xinbei',
            stations: temp,
          });
        });
    },
    loadtaoyuanUbike(obj) {
      axios
        .get(
          'https://script.google.com/macros/s/AKfycbzn2V1by0BTpdXW975rnHNvX6fF6nA4SxYyMlOGjNA4EE_wtg0/exec'
        )
        .then(res => {
          res = Object.keys(res.data.retVal).map(key => res.data.retVal[key]);
          let temp = res.filter(i => i.act === '1');
          obj.commit('setStation', {
            city: 'taoyuan',
            stations: temp,
          });
        });
    },
    loadhsinchuUbike(obj) {},
    loadtaichungUbike(obj) {
      axios
        .get(
          'https://script.google.com/macros/s/AKfycbzOdvWalYBBLDWpX1h_mE0mL-HMV9wygY6jI-ITovsVPIb6LSqb/exec?url=e-traffic.taichung.gov.tw/DataAPI/api/YoubikeAllAPI'
        )
        .then(res => {
          var newData = [];
          res.data.map(function(e, i) {
            newData[i] = {};
            for (let item in e) {
              switch (item) {
                case 'ID':
                  newData[i].sno = e[item];
                  break;
                case 'Position':
                  newData[i].sna = e[item];
                  break;
                case 'EName':
                  newData[i].snaen = e[item];
                  break;
                case 'CArea':
                  newData[i].sarea = e[item];
                  break;
                case 'EArea':
                  newData[i].sareaen = e[item];
                  break;
                case 'X':
                  newData[i].lng = e[item];
                  break;
                case 'Y':
                  newData[i].lat = e[item];
                  break;
                case 'UpdateTime':
                  newData[i].mday = e[item];
                  break;
                case 'CAddress':
                  newData[i].ar = e[item];
                  break;
                case 'EAddress':
                  newData[i].aren = e[item];
                  break;
                case 'EmpCNT':
                  newData[i].tot = e[item];
                  break;
                case 'AvailableCNT':
                  newData[i].sbi = e[item];
                  break;
              }
            }
          });
          // let temp = res.filter(i => i.act === '1');
          obj.commit('setStation', {
            city: 'taichung',
            stations: newData,
          });
        });
    },
    loadkaohsiungUbike(obj) {
      var xmlToJson = function(xml) {
        // Create the return object
        var json = {};

        console.log('xml', xml.nodeType);

        if (xml.nodeType == 1) {
          // element
          // do attributes
          if (xml.attributes.length > 0) {
            json['@attributes'] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
              var attribute = xml.attributes.item(j);
              json['@attributes'][attribute.nodeName] = attribute.nodeValue;
            }
            console.log('json1', json);
          }
        } else if (xml.nodeType == 3) {
          // text
          json = xml.nodeValue;
          console.log('json2', json);
        }
        // do children
        // If just one text node inside
        

        if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
          json = xml.childNodes[0].nodeValue;
          console.log('json3', json);
        } else if (xml.hasChildNodes()) {
          for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof json[nodeName] == 'undefined') {
              json[nodeName] = xmlToJson(item);
              console.log('json4', json);
            } else {
              if (typeof json[nodeName].push == 'undefined') {
                var old = json[nodeName];
                json[nodeName] = [];
                json[nodeName].push(old);
              }
              json[nodeName].push(xmlToJson(item));
              console.log('json5', json);
            }
          }
        }
        
        return json;
      };
      axios
        .get(
          'https://script.google.com/macros/s/AKfycbzOdvWalYBBLDWpX1h_mE0mL-HMV9wygY6jI-ITovsVPIb6LSqb/exec?url=https://pbike.pthg.gov.tw/xml/stationlist.aspx&type=xml',{
            headers: { "Content-type": "application/xml" }
          }
        )
        .then(res => {
          // const xml = res;
          // const json = xml.getElementsByTagName('BIKEStationData');
          console.log('res1', res.data);
          data = xmlToJson(res.data);
          console.log('res2', data);

          // obj.commit('setStation', {
          //   city: 'kaohsiung',
          //   stations: temp
          // });
        });
    },
  },
});

export default store;

// sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
// sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
// lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
// snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態


// https://pbike.pthg.gov.tw/xml/stationlist.aspx
// https://www.c-bike.com.tw/xml/stationlistopendata.aspx