<template>
<div class="app-gallery">

</div>
</template>

<script>
  export default {
    name: "Gallery",
    props: {
      type: ""
    },
    data() {
      return {
        data_gallery: []
      }
    },
    method() {
      switch (this.type) {
        case "videos":
          this.$http.post(`${this.$apiURL}/video/byTag`, {
            tag: 'slider'
          }).then(res => {
            this.data_gallery = res.data;
          }, err => {
            // eslint-disable-next-line
            console.log(err);
          });
          break;
      }
    }
  }
</script>

<style scoped>
</style>