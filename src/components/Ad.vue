<template>
  <div v-if="ad != null" :class="`ad ${type}`" :style="`background: url('${ad.image.src}') no-repeat`">
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
        ad: null,
        index: 0
      }
    },
    mounted() {
      this.$http.post(`${this.$apiURL}/ad/byType`, {
        type: this.type
      }).then(
        res => {
          this.index = Math.floor(Math.random() * (res.data.length - 1));
          if (res.data[this.index])
            firebase.storage().ref().child('imagens/' + res.data[this.index].image.src).getDownloadURL()
              .then(img => {
                res.data[this.index].image.src = img;
                this.ad = res.data[this.index];
              });
        },
        err => {
          // eslint-disable-next-line
          console.log(err);
        }
      );
    }
  };
</script>

<style scoped>
  .ad {
    max-width: 100%;
    width: 100%;
    height: 100px;
    background-size: 100% 100% !important;
  }
  /* .ad.body, */
  .ad.horizontal {
    height: 150px;
  }
  .ad:hover {
    opacity: 0.9;
  }
  .ad a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px;
    color: white;
    background: rgba(0, 0, 0, 0.2);
  }
  .ad p {
    margin: auto;
    line-height: 1;
  }
  .ad.vertical {
    height: 250px;
  }
</style>
