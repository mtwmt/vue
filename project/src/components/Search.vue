<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ ubikeArea.label }}</button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#" 
          @click="setArea( area, ubikeArea.keyword)" 
          v-for="(area, idx) in ubikeArea.areas"
          :key="idx"
        >{{ area }}</a>
      </div>
    </div>
    <input type="search" class="form-control" aria-label="Text input with dropdown button"
      :value="ubikeArea.keyword"
      @input="$emit('input',$event.target.value)"
    >
    <div class="input-group-append">
      <button @click="setKeyword(ubikeArea.keyword)" class="btn btn-outline-secondary" type="button">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchBar",
  props:['ubikeArea'],
  methods: {
    setArea: function( area,keyword ){
      this.$emit('setarea',area,keyword );
    },
    setKeyword: function( keyword ){
      this.$emit('setkeyword',keyword );
    }
  }
}
</script>

<style>

</style>
