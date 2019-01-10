<template>
  <div id="gmap" class="mb-3"></div>
</template>

<script>
export default {
  name: "googleMap",
  props: ['gmap'],
  created() {},
  mounted(){
    if( this.gmap.length>0 ){
      this.initMap();
    }
  },
  watch: {
    gmap(){
      if( this.gmap.length>0 ){
        this.initMap();
      }
    }
  },
  computed:{
    
  },
  methods:{
    initMap: function(){
      var _self = this,
          marker,
          map = new google.maps.Map(document.getElementById('gmap'), {
            center: {lat: parseFloat(_self.gmap[0].lat,10), lng: parseFloat(_self.gmap[0].lng)},
            scrollwheel: false,
            zoom: 16,
          });

      this.gmap.map( function( e,i ){
        var marker = new google.maps.Marker({
              map: map,
              draggable: false,
              animation: google.maps.Animation.DROP,
              position: {lat: parseFloat(e.lat), lng: parseFloat(e.lng)},
              title: e.sna
            });
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#gmap{
  width: 100%;
  height: 300px;
}
</style>
