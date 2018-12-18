

var vm = new Vue({
  el:"#app",
  data: {
    data: []
  },
  watch: {
    getDate: function(){}
  },
  created: function(){
    this.getDate(6)

  },
  methods: {
    getDate:function( obj ){
      let self = this;
      axios.get('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do',{
        params:{
          method: 'doFindTypeJ',
          category: obj || 6
        }
      }).then(function( res ){
        self.data = res.data;
        
      }).catch(function( error ){
      })
    },
  }
});



// "version(發行版本)",
// "UID(唯一辨識碼)",
// "titile(活動名稱)",
// "category(活動類別)",
// "showUnit(演出單位)",
// "descriptionFilterHtml(簡介說明)",
// "discountInfo(折扣資訊)",
// "imageURL(圖片連結)",
// "masterUnit(主辦單位)",
// "subUnit(協辦單位)",
// "supportUnit(贊助單位)",
// "otherUnit(其他單位)",
// "webSales(售票網址)",
// "sourceWebPromote(推廣網址)",
// "comment(備註)",
// "editModifyDate(編輯時間)",
// "sourceWebName(來源網站名稱)",
// "startDate(活動起始日期)",
// "endDate(活動結束日期)",
// "hitRate(點閱數)",
// "showinfo(活動場次資訊)",
// "time(單場次演出時間)",
// "location(地址)",
// "locationName(場地名稱)",
// "onSales(是否售票)",
// "latitude(緯度)",
// "longitude(經度)",
// "Price(售票說明)",
// "endTime(結束時間)"
