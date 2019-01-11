<template>
  <div>
    <div id="gmap" class="mb-3"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
  name: "googleMap",
  props: ['gmap'],
  created() {},
  mounted(){
    if( this.gmap.length>0 ){
      this.initMap({
        lat: this.location.lat,
        lng: this.location.lng
      });
      
    }
  },
  watch: {
    gmap(){
      if( this.gmap.length>0 ){
        this.initMap({
          lat: parseFloat(this.gmap[0].lat),
          lng: parseFloat(this.gmap[0].lng)
        });
      }
    }
  },
  computed:{
    ...mapState(['location'])
  },
  methods:{
    initMap: function( option ){
      var _self = this,
          marker,
          setting = {
            center: { lat: option.lat, lng: option.lng },
            scrollwheel: false,
            zoom: 16,
          };

      poimark();

      map = new google.maps.Map(document.getElementById('gmap'),setting);
      var htmlMarker = new HTMLMarker( {lat: this.location.lat, lng: this.location.lng} );
      htmlMarker.setMap( map );      

      this.gmap.map( function( e,i ){
        var marker = new google.maps.Marker({
              map: map,
              draggable: false,
              animation: google.maps.Animation.DROP,
              position: {lat: parseFloat(e.lat), lng: parseFloat(e.lng)},
              title: e.sna
            });
      });
      
    },
  }
}
</script>

<style lang="scss" scoped>
i.fas.fa-child:before{
  font-size: 40px;
  color: #ffbb00;
  border: 1px solid #000;
}
#gmap{
  width: 100%;
  height: 300px;
}

</style>
