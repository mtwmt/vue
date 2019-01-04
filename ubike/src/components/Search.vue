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
          v-for="( area, idx ) in ubikeArea"
          :key = idx
          @click="setArea( area )"
        >{{ area }}</a>
      </div>
    </div>
    <input
      type="search"
      class="form-control"
      aria-label="Text input with dropdown button"
    >
    <div class="input-group-append">
      <button
        class="btn btn-outline-secondary"
        type="button"
      >Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchBar",
  props: ['data','area'],
  // data(){
  //   return {
  //     label: '全區搜尋'
  //   }
  // },
  computed:{
    ubikeArea(){
      const _self = this;
      let temp = [];
      temp = _self.data.stations.map( e => e.sarea );
      temp = temp.filter((el, idx, arr) => arr.indexOf(el) === idx);
      return ['全區搜尋',...temp];
    },
  },
  methods:{
    setArea( area ){
      return this.area.label = area;
    }
  }
}
</script>

<style>

</style>
