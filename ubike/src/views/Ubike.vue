<template>
  <div>
    <search-bar
      :data="loadStation"
      :area="ubikearea"
    />
    <ubike-list 
      :data="loadStation"
      :area="ubikearea"
      :page="page"
    />
    <pagination 
      :rows="loadStation.stations"
      :page="page"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import ubikeList from '@/components/Ubikelist.vue'
import searchBar from '@/components/Search.vue'
import pagination from '@/components/Page.vue'

export default {
  name: 'ubike',
  components: { searchBar, pagination, ubikeList  },
  data(){
    return {
      page:{
        pagenow: 1,
        viewlimit: 10,
        pagelimit: 5,
      },
      ubikearea:{
        label: '全區搜尋'
      }
    }
  },
  created(){
    this.$store.dispatch('load'+ this.city +'Ubike');
  },
  computed:{
    ...mapState(['city','ubikecity']),
    loadStation(){
      const _self = this;
      _self.$store.dispatch('load'+ _self.city +'Ubike');
      _self.page.pagenow = 1;
      return _self.ubikecity[_self.city];
    },
  },
  methods:{
    // loadStation(){
    //   this.$store.dispatch('load'+ this.city +'Ubike');
    // }
  }
}
</script>

<style>

</style>
