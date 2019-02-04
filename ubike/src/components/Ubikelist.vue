<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>場站名稱</th>
        <th v-if="filterRow[0].sarea">場站區域</th>
        <th v-if="filterRow[0].desc">場站描述</th>
        <th @click="setSort('sbi')">
          可用車輛
          <i :class="!sort.sbi ? 'fas fa-arrow-circle-up' : 'fas fa-arrow-circle-down'"></i>
        </th>
        <th @click="setSort('tot')">
          總停車格
          <i :class="!sort.tot ? 'fas fa-arrow-circle-up' : 'fas fa-arrow-circle-down'"></i>
        </th>
        <th class="tbl-hidden" v-if="filterRow[0].mday">資料更新時間</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(s,i) in filterRow.slice( (page.pagenow - 1)* page.viewlimit, ((page.pagenow - 1) * page.viewlimit) + page.viewlimit )"
        :key="i"
      >
        <td>{{ s.sno }}</td>
        <td class="nowrap"><a href="javascript:;" @click="getPlace({ lat: s.lat, lng: s.lng, title: s.sna })">{{ s.sna }}</a></td>
        <td v-if="s.sarea">{{ s.sarea }}</td>
        <td v-if="s.desc">{{ s.desc }}</td>
        <td>{{ s.sbi }}</td>
        <td>{{ s.tot }}</td>
        <td class="tbl-hidden" v-if="s.mday">{{ s.mday | timeFormat }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
var HTMLMarker,map,
    poimark = function(){
      var div;
      HTMLMarker = function(lat,lng){
        this.lat = lat;
        this.lng = lng;
        this.pos = new google.maps.LatLng(lat,lng);
      }
      HTMLMarker.prototype = new google.maps.OverlayView();
      HTMLMarker.prototype.onRemove= function(){};
      HTMLMarker.prototype.onAdd= function(){
        var icon,
            panes;
        div = document.createElement('div');
        div.className = "poi";
        div.innerHTML = '<i class="fas fa-child"></i>';
        icon = div.querySelector('i');

        // 把innerHTML塞到document
        panes = this.getPanes();
        panes.overlayImage.appendChild(div);


        // 塞進去後才能設定css
        div.style.position = 'relative';
        icon.style.fontSize = '40px';
        icon.style.color = '#222';
        icon.style.position = 'absolute';
        icon.style.left = (icon.clientWidth / 2* -1) + 'px';
        icon.style.top = (icon.clientHeight * -1) + 'px';
        
      };
      HTMLMarker.prototype.draw = function(){
        var overlayProjection = this.getProjection();
        var position = overlayProjection.fromLatLngToDivPixel(this.pos);
        var panes = this.getPanes();
        
        panes.overlayImage.style.left = position.x + 'px';
        panes.overlayImage.style.top = position.y + 'px';
      }
      return HTMLMarker;
    };
export default {
  name: "ubikeList",
  props: ["data", "area", "page"],
  data() {
    return {
      sort: {
        sbi: "",
        tot: ""
      }
    };
  },
  filters: {
    timeFormat(t) {
      if (t.length > 14) return t;
      var date = [],
        time = [];
      date.push(t.substr(0, 4));
      date.push(t.substr(4, 2));
      date.push(t.substr(6, 2));
      time.push(t.substr(8, 2));
      time.push(t.substr(10, 2));
      time.push(t.substr(12, 2));
      return date.join("/") + " " + time.join(":");
    }
  },
  mounted(){},
  created(){},
  computed: {
    filterRow() {
      return this.page.filterdata = (!this.page.filterdata.length) ? this.data.stations : this.page.filterdata;
    }
  },
  methods: {

    setSort(obj) {
      const _self = this;
      if (_self.sort[obj] === "less") {
        _self.sort[obj] = "";
        return _self.filterRow.sort((a, b) => a[obj] - b[obj]);
      } else {
        _self.sort[obj] = "less";
        return _self.filterRow.sort((a, b) => b[obj] - a[obj]);
      }
    },
    getPlace( pos ){
      var marker,
      setting = {
        center: {lat: parseFloat(pos.lat), lng: parseFloat(pos.lng)},
        scrollwheel: false,
        zoom: 19,
      };
      map = new google.maps.Map(document.getElementById('gmap'),setting);
      this.page.filterdata.map( function( e,i ){
        var marker = new google.maps.Marker({
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: {lat: parseFloat(e.lat), lng: parseFloat(e.lng)},
            title: e.sna
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
i.fas.fa-child:before{
  font-size: 40px;
  color: #ffbb00;
  border: 1px solid #000;
}
.nowrap{
  white-space: nowrap;
}

@media screen and (max-width: 639px) {
  .tbl-hidden {
    display: none;
  }
}
</style>
