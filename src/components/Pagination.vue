<template>
  <div id="pagination">
    <div class="col-12 text-center buttons-pagination" v-if="length_object > 0 && pagination.pageCount > 1" :style="length_object > 0 ? `--color:${color}` : ''">
      <button v-if="pagination.page-1 > 0" v-on:click="newPage('previous')" class="ant">
        <v-icon>fa fa-angle-double-left</v-icon>
      </button>
      <button v-if="pagination.page-1 > 0" v-on:click="newPage(pagination.page-1)">{{pagination.page-1}}</button>
      <button v-on:click="newPage(page)" class="active">{{pagination.page}}</button>
      <button v-for="i in range(pagination.page+1, (pagination.pageCount > pagination.page+limit_page ? pagination.page+limit_page : pagination.pageCount))" :key="i" v-on:click="newPage(i)">{{i}}</button>
      <!-- <button v-if="pagination.page < pagination.pageCount" v-on:click="newPage(pagination.page+1)">{{pagination.page+1}}</button> -->
      <button v-if="pagination.page < pagination.pageCount" v-on:click="newPage('next')" class="prox">
        <v-icon>fa fa-angle-double-right</v-icon>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: {
      pagination: null,
      length_object: 0,
      color: undefined,
      category: undefined,
      pageName: undefined
    },
    data() {
      return {
        limit_page: 3
      }
    },
    methods: {
      newPage: function (pagination) {
        switch (`${pagination}||${this.pageName}`) {
          case 'next||NewsByCategory':
            // if (parseInt(this.page) + 1 <= Math.ceil(this.allNews.length / this.news_page))
            //   this.$router.push({ name: "NewsByCategory", params: { category: this.category, page: parseInt(this.page) + 1 } });
            this.$router.push({ name: "NewsByCategory", params: { category: this.category, page: this.pagination.pageCount } });
            break;
          case 'next||Video':
            this.$router.push({ name: "Video", params: { page: this.pagination.pageCount } });
            break;
          case 'previous||NewsByCategory':
            // if (parseInt(this.page) - 1 > 0)
            //   this.$router.push({ name: "NewsByCategory", params: { category: this.category, page: parseInt(this.page) - 1 } });
            this.$router.push({ name: "NewsByCategory", params: { category: this.category, page: 1 } });
            break;
          case 'previous||Video':
            this.$router.push({ name: "Video", params: { page: 1 } });
            break;
          default:
            if (this.pageName == 'NewsByCategory')
              this.$router.push({ name: "NewsByCategory", params: { category: this.category, page: pagination } });
            else if (this.pageName == 'Video')
              this.$router.push({ name: "Video", params: { page: pagination } });
            break;
        }
      },
      range: function (start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
      }
    }
  }
</script>

<style scoped>
  #pagination {
    width: 100%;
  }
  .buttons-pagination button {
    background: transparent;
    color: var(--color);
    border: none;
    font-size: 18px;
    cursor: pointer;
    padding: 5px 15px;
  }
  .buttons-pagination button:hover,
  button.active {
    font-size: 20px;
    font-weight: bold;
  }

  .buttons-pagination button:hover i {
    font-size: 20px;
    font-weight: bold;
  }
  button.ant {
    border-radius: 5px 0 0 5px;
  }
  button.prox {
    border-radius: 0 5px 5px 0;
  }
</style>
