<template>
  <div v-if="ad">
    <a :href="ad.src" target="_blank">
      <img :src="ad.image.src">
    </a>
  </div>
</template>

<script>
export default {
  name: "Ad",
  props: {
    ad: null
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
  max-height: 100px;
}
</style>
