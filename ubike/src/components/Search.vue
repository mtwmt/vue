<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <button
        id="areaButton"
        class="btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >{{ area.label }}</button>
      <div class="dropdown-menu" aria-labelledby="areaButton">
        <a
          class="dropdown-item"
          href="#"
          v-for="( item, idx ) in ubikeArea"
          :key="idx"
          @click="filterArea( item, area.keyword )"
        >{{ item }}</a>
      </div>
    </div>
    <input
      type="search"
      class="form-control"
      aria-label="Text input with dropdown button"
      v-model="area.keyword"
    >
    <div class="input-group-append">
      <button
        class="btn btn-outline-secondary"
        type="button"
        @click="filterArea( area.label, area.keyword )"
      >Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchBar",
  props: ["data", "area", "page"],
  computed: {
    ubikeArea() {
      const _self = this;
      let temp = [];
      temp = _self.data.stations.map(e => e.sarea);
      temp = temp.filter((el, idx, arr) => arr.indexOf(el) === idx);
      return ["全區搜尋", ...temp];
    }
  },
  methods: {
    filterArea(area, keyword) {
      const _self = this;
      _self.page.pagenow = 1;
      _self.area.label = area;
      let tempArr = [];
      tempArr = _self.data.stations.filter(function(e) {
        if (e.sarea.indexOf(area) >= 0) {
          return e;
        }
      });
      tempArr = !tempArr.length ? _self.data.stations : tempArr;
      tempArr = tempArr.filter(e => e.sna.indexOf(keyword) >= 0);

      return (_self.page.filterdata = tempArr);
    }
  }
};
</script>

<style>
</style>
