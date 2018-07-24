<template>
  <div v-if="ad != null" class="ad" :style="`background: url('${ad.image.src}') no-repeat`">
    <a :href="ad.src" target="_blank">
      <p>{{ad.description}}</p>
    </a>
  </div>
</template>

<script>
  import firebase from 'firebase';
  export default {
    name: "Ad",
    props: {
      type: ""
    },
    data() {
      return {
        ad: null
      }
    },
    mounted() {
      this.$http.post(`${this.$apiURL}/ad/byType`, {
        type: this.type
      }).then(
        res => {
          firebase.storage().ref().child('imagens/' + res.data[0].image.src).getDownloadURL()
            .then(img => {
              res.data[0].image.src = img
              this.ad = res.data[0];
            });
        },
        err => {
          console.log(err);
        }
      );
    }
  };
</script>

<style scoped>
  .ad {
    max-width: 100%;
    max-height: 100px;
    width: 100%;
    height: 200%;
    background-size: 100% 100% !important;
  }
  .ad:hover {
    opacity: 0.8;
  }
  .ad a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px;
    color: white;
  }
  .ad p {
    margin: auto;
    line-height: 1;
  }
</style>
