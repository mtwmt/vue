import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// var xmlToJson =  function(xml) {

//   // Create the return object
//   var obj = {};
//   for (var i = 0; i < xml.childNodes.length; i++) {
//     var item = xml.childNodes.item(i);
//     var nodeName = item.nodeName;
//     if (typeof (obj[nodeName]) == "undefined") {
//       obj[nodeName] = xmlToJson(item);
//     } else {
//       if (typeof (obj[nodeName].push) == "undefined") {
//         var old = obj[nodeName];
//         obj[nodeName] = [];
//         obj[nodeName].push(old);
//       }
//       obj[nodeName].push(xmlToJson(item));
//     }
//   }
  
//   return obj;
// }
var xml2json = function (srcDOM){
  let children = [...srcDOM.children];
  // base case for recursion. 
  if (!children.length) {
    return srcDOM.innerHTML
  }
  // initializing object to be returned. 
  let jsonResult = {};

  for (let child of children) {
    // checking is child has siblings of same name. 
    let childIsArray = children.filter(eachChild => eachChild.nodeName === child.nodeName).length > 1;
    // if child is array, save the values as array, else as strings. 
    if (childIsArray) {
      if (jsonResult[child.nodeName] === undefined) {
        jsonResult[child.nodeName] = [xml2json(child)];
      } else {
        jsonResult[child.nodeName].push(xml2json(child));
      }
    } else {
      jsonResult[child.nodeName] = xml2json(child);
    }
  }
  return jsonResult;
};

let store = new Vuex.Store({
  state: {
    isLoading: true,
    ubikecity: {
      taipei: {
        en: 'taipei',
        cn: '台北市',
        bike: 'YouBike',
        stations: [],
      },
      xinbei: {
        en: 'xinbei',
        cn: '新北市',
        bike: 'YouBike',
        stations: [],
      },
      taoyuan: {
        en: 'taoyuan',
        cn: '桃園市',
        bike: 'YouBike',
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
        bike: 'iBike',
        stations: [],
      },
      tainan: {
        en: 'tainan',
        cn: '台南市',
        bike: 'T-Bike',
        stations: [],
      },
      kaohsiung: {
        en: 'kaohsiung',
        cn: '高雄市',
        bike: 'CityBike',
        stations: [],
      },
      pingtung: {
        en: 'pingtung',
        cn: '屏東',
        bike: 'Pbike',
        stations: [],
      },
    },
  },
  getters: {},
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
          obj.commit('setStation', { city: 'xinbei', stations: temp });
        });
    },
    loadtaoyuanUbike(obj) {
      axios
        .get('https://script.google.com/macros/s/AKfycbzOdvWalYBBLDWpX1h_mE0mL-HMV9wygY6jI-ITovsVPIb6LSqb/exec?url=https://data.tycg.gov.tw/api/v1/rest/datastore/a1b4714b-3b75-4ff8-a8f2-cc377e4eaa0f?format=json')
        .then(res => {
          res = Object.keys(res.data.result.records).map(key => res.data.result.records[key]);
          let temp = res.filter(i => i.act === '1');
          obj.commit('setStation', { city: 'taoyuan', stations: temp });
        });
    },
    loadhsinchuUbike(obj) {
      axios.get('https://script.google.com/macros/s/AKfycbzOdvWalYBBLDWpX1h_mE0mL-HMV9wygY6jI-ITovsVPIb6LSqb/exec?https://apis.youbike.com.tw/useAPI?action=ub_site_by_sno_class&datas%5Blang%5D=tw&datas%5Bloc%5D=hccg')
      .then( res => {
        console.log( res )
      });
    },
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
    loadtainanUbike(obj) {
      axios
        .get(
          'https://script.google.com/macros/s/AKfycbzOdvWalYBBLDWpX1h_mE0mL-HMV9wygY6jI-ITovsVPIb6LSqb/exec?url=http://tbike.tainan.gov.tw:8081/Service/StationStatus/Json'
        )
        .then(res => {
          var newData = [];
          res.data.map(function(e, i) {
            newData[i] = {};
            for (let item in e) {
              switch (item) {
                case 'Id':
                  newData[i].sno = e[item];
                  break;
                case 'StationName':
                  newData[i].sna = e[item];
                  break;
                case 'EnglishStationName':
                  newData[i].snaen = e[item];
                  break;
                case 'District':
                  newData[i].sarea = e[item];
                  break;
                case 'Longitude':
                  newData[i].lng = e[item];
                  break;
                case 'Latitude':
                  newData[i].lat = e[item];
                  break;
                case 'UpdateTime':
                  newData[i].mday = e[item];
                  break;
                case 'Address':
                  newData[i].ar = e[item];
                  break;
                case 'EnglishAddress':
                  newData[i].aren = e[item];
                  break;
                case 'Capacity':
                  newData[i].tot = e[item];
                  break;
                case 'AvaliableBikeCount':
                  newData[i].sbi = e[item];
                  break;
              }
            }
          });
          obj.commit('setStation', {
            city: 'tainan',
            stations: newData,
          });
        });
    },
    loadkaohsiungUbike(obj) {
      axios({
        method: 'get',
        url:
          'https://script.google.com/macros/s/AKfycbzOdvWalYBBLDWpX1h_mE0mL-HMV9wygY6jI-ITovsVPIb6LSqb/exec?url=https://www.c-bike.com.tw/xml/stationlistopendata.aspx&type=xml',
      }).then(res => {
        let xmlstr = res.data,
          newData = [];
        const parser = new DOMParser(),
          srcDOM = parser.parseFromString(xmlstr, 'application/xml'),
          json = xml2json(srcDOM).BIKEStationData.BIKEStation.Station;
        json.map(function(e, i) {
          newData[i] = {};
          for (let item in e) {
            switch (item) {
              case 'StationNO':
                newData[i].sno = e[item];
                break;
              case 'StationName':
                newData[i].sna = e[item];
                break;
              case 'StationDesc':
                newData[i].desc = e[item];
                break;
              case 'StationLon':
                newData[i].lng = e[item];
                break;
              case 'StationLat':
                newData[i].lat = e[item];
                break;
              case 'StationAddress':
                newData[i].ar = e[item];
                break;
              case 'StationNums1':
                newData[i].sbi = e[item];
                break;
            }
          }
          newData[i].tot = parseInt(e.StationNums1) + parseInt(e.StationNums2);
          newData[i].desc = newData[i].desc.split('●')[0];
        });
        obj.commit('setStation', { city: 'kaohsiung', stations: newData });
      });
    },
    loadpingtungUbike(obj) {
      axios({
        method: 'get',
        url:
          'https://script.google.com/macros/s/AKfycbzOdvWalYBBLDWpX1h_mE0mL-HMV9wygY6jI-ITovsVPIb6LSqb/exec?url=https://pbike.pthg.gov.tw/xml/stationlist.aspx&type=xml',
      }).then(res => {
        let xmlstr = res.data,
          newData = [];
        const parser = new DOMParser(),
          srcDOM = parser.parseFromString(xmlstr, 'application/xml'),
          json = xml2json(srcDOM).BIKEStationData.BIKEStation.Station;
        json.map(function(e, i) {
          newData[i] = {};
          for (let item in e) {
            switch (item) {
              case 'StationID':
                newData[i].sno = e[item];
                break;
              case 'StationName':
                newData[i].sna = e[item];
                break;
              case 'StationDesc':
                newData[i].desc = e[item];
                break;
              case 'StationLon':
                newData[i].lng = e[item];
                break;
              case 'StationLat':
                newData[i].lat = e[item];
                break;
              case 'StationAddress':
                newData[i].ar = e[item];
                break;
              case 'StationNums1':
                newData[i].sbi = e[item];
                break;
            }
          }
          newData[i].tot = parseInt(e.StationNums1) + parseInt(e.StationNums2);
        });
        obj.commit('setStation', { city: 'pingtung', stations: newData });
      });
    },
  },
});

export default store;

// sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
// sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
// lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
// snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態
// desc : 場站描述
