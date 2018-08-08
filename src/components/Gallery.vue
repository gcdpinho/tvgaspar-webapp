<template>
  <div class="app-gallery" v-if="data_gallery.length">
    <div class="row">
      <div class="col-md-9">
        <div class="header mobile">
          <div class="header-title">
            Vídeos
          </div>
          > Últimos vídeos
        </div>
        <iframe width="100%" height="100%" :src="first_data_gallery.src"></iframe>
      </div>
      <div class="col-md-3 desk">
        <div class="header">
          <div class="header-title">
            Vídeos
          </div>
          > Últimos vídeos
        </div>
        <div class="thumb">
          <div class="each-video" v-for="(video, index) of this.data_gallery" :key="video.id">
            <div class="thumb-video" v-on:click="change_gallery(video, index)"></div>
            <iframe width="100%" height="100%" :src="video.src"></iframe>
          </div>
        </div>
      </div>
    </div>
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
        data_gallery: [],
        first_data_gallery: null
      }
    },
    mounted() {
      switch (this.type) {
        case "videos":
          this.$http.post(`${this.$apiURL}/video/byTag`, {
            tag: 'slider'
          }).then(res => {
            this.first_data_gallery = res.data[0];
            this.data_gallery = res.data.slice(1);
          }, err => {
            // eslint-disable-next-line
            console.log(err);
          });
          break;
      }
    },
    methods: {
      change_gallery: function (video, index) {
        let first_aux = this.first_data_gallery;
        this.first_data_gallery = video;
        this.data_gallery[index] = first_aux;
      }
    }
  }
</script>

<style scoped>
  .thumb {
    max-height: 500px;
    overflow-y: auto;
  }
  .thumb-video {
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
  }
  .thumb-video:hover {
    opacity: 0.5;
  }
  .each-video {
    position: relative;
    cursor: pointer;
    margin-top: 10px;
  }
  .header {
    color: white;
    margin-bottom: 20px;
  }
  .mobile{
    display: none;
  }
  @media (max-width: 767px){
    .mobile{
      display: block;
    }
    .desk{
      display: none;
    }
    iframe{
      height: auto;
    }
  }
</style>