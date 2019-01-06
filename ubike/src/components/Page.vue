<template>
  <nav aria-label="Page navigation" v-if="countOfPage.length > 1">
    <ul class="pagination justify-content-end">
      <li class="page-item" v-if="page.pagenow !== 1">
        <a class="page-link" 
          @click="setPage( pagePrev )" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li
        v-for="(pg, idx) in countOfPage"
        :key="idx"
        :class="pg === page.pagenow ? 'page-item active': 'page-item'"
        @click="setPage( pg )"
      ><a class="page-link" href="#">{{ pg }}</a></li>
      <li class="page-item" v-if="page.pagenow !== pageTotal">
        <a class="page-link" @click="setPage( pageNext)" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'pagination',
  props: ['page'],
  computed:{
    pageTotal(){
      return Math.ceil(this.page.filterdata.length / this.page.viewlimit);
    },
    countOfPage(){
      const _self = this;
      let start = _self.page.pagenow - ((_self.page.pagenow - 1) % _self.page.pagelimit),
          limit = Math.min(start + (_self.page.pagelimit - 1) ,this.pageTotal),
          tempArr = [];
      for( start; start <= limit; start++ ){
        tempArr.push( start );
      }
      return tempArr;    
    },
    pagePrev(){
      return Math.max(this.page.pagenow - 1, 1);
    },
    pageNext(){
      return Math.min(this.page.pagenow + 1, this.pageTotal);
    }
  },
  methods:{
    setPage( num ){
      return this.page.pagenow = num;
    }
  }
}
</script>

<style>

</style>
