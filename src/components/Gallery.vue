<template>
  <div class="app-gallery" v-if="data_gallery.length">
    <div class="row">
      <div class="col-md-9">
        <div class="header mobile">
          <div class="header-title">
            Vídeos
          </div>
          > <router-link to="/Video">Últimos vídeos</router-link>
        </div>
        <iframe width="100%" height="100%" :src="first_data_gallery.src"></iframe>
      </div>
      <div class="col-md-3 desk">
        <div class="header">
          <div class="header-title">
            Vídeos
          </div>
          > <router-link to="/Video">Últimos vídeos</router-link>
        </div>
        <div class="thumb">
          <div class="each-video" v-for="(video, index) of this.data_gallery" :key="video.id">
            <div class="thumb-video" v-on:click="change_gallery(video, index)"></div>
            <img width="100%" height="100%" :src="getThumbVideo(video.src)">
            <v-icon>fa fa-play</v-icon>
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
        first_data_gallery: null,
        link_img: "https://img.youtube.com/vi",
        img_quality: "mqdefault.jpg",
        limit: 5
      }
    },
    mounted() {
      switch (this.type) {
        case "videos":
          this.$http.post(`${this.$apiURL}/video/byTag?pageSize=${this.limit}`, {
            tag: 'slider'
          }).then(res => {
            this.first_data_gallery = res.data.videos[0];
            this.data_gallery = res.data.videos.slice(1, this.limit);
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
      },
      getThumbVideo: function (src) {
        const id = src.split('embed/')[1].split('?')[0];
        return `${this.link_img}/${id}/${this.img_quality}`;
      },
      goVideos: function (idNews) {
        this.$router.push({ name: "NewsById", params: { id: idNews } })
      },
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
    z-index: 10;
  }
  .each-video:hover .thumb-video {
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
  .each-video i {
    position: absolute;
    display: none;
    font-size: 40px;
    left: calc(50% - 12px);
    top: calc(50% - 20px);
    color: #9d3138;
  }

  .header a{
    color: white;
  }

  .each-video:hover i {
    display: block;
  }

  .mobile {
    display: none;
  }
  @media (max-width: 767px) {
    .mobile {
      display: block;
    }
    .desk {
      display: none;
    }
    iframe {
      height: auto;
    }
  }
</style>