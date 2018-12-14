<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>場站名稱</th>
          <th>場站區域</th>
          <th @click="setSort('sbi', sort)">目前可用車輛 <i :class="!sort.sbi ? 'fas fa-arrow-circle-up' : 'fas fa-arrow-circle-down'"  ></i></th>
          <th @click="setSort('tot', sort)">總停車格 <i :class="!sort.tot ? 'fas fa-arrow-circle-up' : 'fas fa-arrow-circle-down'"  ></i></th>
          <th>資料更新時間</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(s,i) in list.data" :key="i">
          <td>{{ s.sno }}</td>
          <td>{{ s.sna }}</td>
          <td>{{ s.sarea }}</td>
          <td>{{ s.sbi }}</td>
          <td>{{ s.tot }}</td>
          <td>{{ s.mday | timeFormat }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ubikeList',
  props: ['list','sort'],
  data: function(){
    return{}
  },
  filters: {
    timeFormat(t) {
      var date = [],
        time = [];
      date.push(t.substr(0, 4));
      date.push(t.substr(4, 2));
      date.push(t.substr(6, 2));
      time.push(t.substr(8, 2));
      time.push(t.substr(10, 2));
      time.push(t.substr(12, 2));
      return date.join("/") + ' ' + time.join(":");
    }
  },
  methods: {
    setSort( obj, sort ){
      this.$emit('setSort', obj,sort);
    }
  }
}
</script>

<style>

</style>
