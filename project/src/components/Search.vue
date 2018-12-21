<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <button
        class="btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >{{ ubikeArea.label }}</button>
      <div class="dropdown-menu">
        <a
          class="dropdown-item"
          href="#"
          v-for="(area, idx) in ubikeArea.areas"
          :key="idx"
          @click="setArea( area, ubikeArea.keyword)"
        >{{ area }}</a>
      </div>
    </div>
    <input
      type="search"
      class="form-control"
      aria-label="Text input with dropdown button"
      :value="ubikeArea.keyword"
      @input="$emit('input',$event.target.value)"
    >
    <div class="input-group-append">
      <button
        @click="setKeyword(ubikeArea.keyword)"
        class="btn btn-outline-secondary"
        type="button"
      >Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchBar",
  props: ["ubikeStations","ubikeArea","list"],
  methods: {
    setArea: function(area, keyword) {
      const self = this; 
      // 過濾站點區 將這些區存在 self.ubikeArea.list 裡
      self.ubikeArea.list = self.ubikeStations.filter(function( e ){
        if( e.sarea.indexOf( area ) >= 0 ){
          return e;
        }
      });
      self.ubikeArea.label = area;
      self.list.total = (!self.ubikeArea.list.length)? self.ubikeStations: self.ubikeArea.list;
      
      if( self.ubikeArea.keyword.length > 0 ){
        self.setKeyword( keyword );
      }
      self.list.pagenow = 0;
    },
    setKeyword: function(key) {
      const self = this,
            tempArr = (!self.ubikeArea.list.length) ? self.ubikeStations : self.ubikeArea.list;
            
      self.list.total = tempArr.filter(function( e ){
        if( e.sna.indexOf( key ) >= 0 ){
          return e;
        }
      });
      self.list.pagenow = 0;
    }
  }
};
</script>

<style>
</style>
