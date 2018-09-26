<template>
  <div id="videos">
    <p class="text-loader" v-if="loader">Aguarde ...</p>
    <clip-loader :loading="loader" color="white" size="100px"></clip-loader>
    <Navbar></Navbar>
    <section>
      <div class="container">
        <div class="header">
          <div class="header-title">
            Vídeos
          </div>
          > Todos os vídeos
        </div>
        <div class="row">
          <div class="col-lg-6 card-video" v-for="video of videos" :key="video.id" v-on:click="playVideo(video.src)">
            <div class="row video-line">
              <div :class="`col-${($mq === 'sm' ||  $mq === 'md') ? 12 : 6} col-img`">
                <img :src="getThumbVideo(video.src)">
                <v-icon>fa fa-play</v-icon>
              </div>
              <div :class="`col-${($mq === 'sm' ||  $mq === 'md') ? 12 : 6} col-txt`">
                <p class="title-video">{{video.video}}</p>
                <p class="description-video">{{video.description}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="modal-player" v-if="flg_player" v-on:click="closeModal($event)">
      <v-icon>fa fa-close</v-icon>
      <iframe :width="$mq !== 'desktop' ? '100%' : '80%'" height="60%" :src="video_play"></iframe>
    </div>
    <Footer></Footer>
  </div>
</template>


<script>
  import Navbar from "./../components/Navbar.vue";
  import Footer from "./../components/Footer.vue";
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

  export default {
    name: "Video",
    components: {
      Navbar,
      Footer,
      ClipLoader
    },
    data() {
      return {
        loader: true,
        videos: null,
        limit: 20,
        flg_player: false,
        video_play: null,
        link_img: "https://img.youtube.com/vi",
        img_quality: "mqdefault.jpg"
      }
    },
    mounted() {
      this.$http.post(`${this.$apiURL}/video/byTag`, {
        tag: 'slider'
      }).then(res => {
        this.videos = res.data.slice(0, this.limit);
        this.loader = false;
      }, err => {
        // eslint-disable-next-line
        console.log(err);
        this.loader = false;
      });
    },
    methods: {
      getThumbVideo: function (src) {
        const id = src.split('embed/')[1].split('?')[0];
        return `${this.link_img}/${id}/${this.img_quality}`;
      },
      playVideo: function (video) {
        this.video_play = video;
        this.flg_player = true;
      },
      closeModal: function (event) {
        if (event.target.className.indexOf('fa-close') != 1 || event.target.className.indexOf('modal-player') != -1)
          this.flg_player = false;
      }
    }
  }
</script>

<style scoped>
  #videos {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .card-video img {
    width: 100%;
  }
  .title-video {
    font-weight: 500;
    font-size: 14px;
  }
  .description-video {
    font-size: 12px;
    margin-bottom: 0;
  }
  .video-line {
    height: 150px;
    margin: 15px 0;
  }
  .col-img {
    display: flex;
    position: relative;
  }
  .col-txt {
    display: block;
    overflow: hidden;
  }
  .card-video {
    cursor: pointer;
  }

  .card-video:hover img {
    opacity: 0.7;
  }
  .card-video:hover .col-img i {
    display: block;
  }

  .col-img i {
    position: absolute;
    display: none;
    font-size: 40px;
    left: calc(50% - 12px);
    top: calc(50% - 20px);
    z-index: 10;
    color: #9d3138;
  }
  .header {
    margin-bottom: 20px;
  }
  .modal-player {
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.9);
    width: 100%;
    height: 100%;
    z-index: 99;
  }
  .modal-player i {
    color: white;
    font-size: 30px;
    float: right;
    margin-top: 15px;
    margin-right: 15px;
    cursor: pointer;
  }

  .modal-player iframe {
    position: absolute;
    left: 10%;
    top: 20%;
  }

  @media (max-width: 992px) {
    .video-line {
      height: auto;
    }
    .col-img i {
      display: block;
    }
    .col-img {
      margin-bottom: 15px;
    }
    .card-video img {
      opacity: 0.7;
      height: 100%;
      width: auto;
      margin: auto;
      max-width: 100%;
    }
    .card-video {
      border-bottom: 1px solid #49494d;
    }
    .card-video:last-child {
      border-bottom: none;
    }
  }
</style>

