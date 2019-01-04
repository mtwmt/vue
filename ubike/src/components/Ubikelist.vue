<template>
  <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>場站名稱</th>
          <th>場站區域</th>
          <th @click="setSort('sbi')">
            可用車輛
            <i :class="!sort.sbi ? 'fas fa-arrow-circle-up' : 'fas fa-arrow-circle-down'"></i>
          </th>
          <th @click="setSort('tot')">
            總停車格
            <i :class="!sort.tot ? 'fas fa-arrow-circle-up' : 'fas fa-arrow-circle-down'"></i>
          </th>
          <th class="tbl-hidden">資料更新時間</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(s,i) in filterRow.slice( (page.pagenow - 1)* page.viewlimit, ((page.pagenow - 1) * page.viewlimit) + page.viewlimit )" 
          :key="i" 
        >
          <td>{{ s.sno }}</td>
          <td>{{ s.sna }}</td>
          <td>{{ s.sarea }}</td>
          <td>{{ s.sbi }}</td>
          <td>{{ s.tot }}</td>
          <td class="tbl-hidden">{{ s.mday | timeFormat }}</td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  name: 'ubikeList',
  props: ['data','area','page'],
  data(){
    return {
      sort: {
        sbi: '',
        tot: ''
      }
    }
  },
  filters: {
    timeFormat(t) {
      if( t.length > 14 ) return t;
      var date = [],
        time = [];
      date.push(t.substr(0, 4));
      date.push(t.substr(4, 2));
      date.push(t.substr(6, 2));
      time.push(t.substr(8, 2));
      time.push(t.substr(10, 2));
      time.push(t.substr(12, 2));
      return date.join("/") + " " + time.join(":");
    },
  },
  computed:{
    filterRow(){
      const _self = this;
      let tempArr = [];

      tempArr = _self.data.stations.filter(function( e ){
        if( e.sarea.indexOf( _self.area.label ) >= 0 ){
          return e;
        }
      });
      
      console.log( tempArr )
      return (!tempArr.length) ? _self.data.stations : tempArr;
    }
  },
  methods: {
    setSort( obj ){
      const _self = this;
      if (_self.sort[obj] === "less") {
        _self.sort[obj] = "";
        return _self.data.stations.sort((a, b) => a[obj] - b[obj]);

      } else {
        _self.sort[obj] = "less";
        return _self.data.stations.sort((a, b) => b[obj] - a[obj]);

      }
    }
  }
}
</script>

<style lang="scss" scoped>
// th,
// td {
//   white-space: nowrap;
// }
@media screen and (max-width: 639px) {
  .tbl-hidden {
    display: none;
  }
}
</style>
