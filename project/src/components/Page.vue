<template>
  <nav aria-label="Page navigation" v-if="page.pagetotal > 0">
    <ul class="pagination justify-content-end">
      <li class="page-item">
        <a class="page-link" @click="setlist( page.total, pagePrev)" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li :class="(pg === pageNow )? 'page-item active': 'page-item'" 
        v-for="(pg, i) in setPage( page.pagenow + 1 )"
        :key="i"
        @click="setlist( page.total, pg-1 )"
      ><a class="page-link" href="#">{{ pg }}</a></li>
      <li class="page-item">
        <a class="page-link" @click="setlist( page.total, pageNext)" href="#" aria-label="Next">
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
  computed: {
    pageTotal: function(){
      // 偵聽當下有幾頁
      return this.setPage();
    },
    pageNow: function(){
      return this.page.pagenow + 1;
    },
    pagePrev: function(){
      return (this.page.pagenow <= 0)? this.page.pagenow : (this.page.pagenow - 1);
    },
    pageNext: function(){
      return  (this.pageNow === this.page.pagetotal )? this.page.pagetotal - 1  : this.page.pagenow + 1;
    }
  },
  watch: {
    pageTotal: function(){}
  },
  methods: {
    setPage: function( num ){
      const self = this;
      let currentPage = num || 1,
          pLimit = self.page.pagelimit,
          totalPage = parseInt( self.page.total.length / self.page.viewlimit );  //總頁數
          
      (totalPage % self.page.viewlimit == 0)? totalPage = totalPage: totalPage = totalPage + 1;
      self.page.pagetotal =  totalPage;
      
      var tempArr = [],
          start = (currentPage - ((currentPage - 1) % pLimit)),
          limit = Math.min(  (currentPage - ((currentPage - 1) % pLimit) + (pLimit - 1) ) ,totalPage);

      for( start; start <= limit ; start++ ){
        tempArr.push( start );
      };
      return tempArr;
    },
    setlist: function( data,num ){
      const self = this;
      self.page.pagenow = num;
      this.$emit('listshow',data, self.page.pagenow );
    }
  }
}
</script>

<style>

</style>
