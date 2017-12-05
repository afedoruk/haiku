<template>
  <p>
    <audio :src="file" loop autoplay id="music-player"/>
    <button v-on:click="toggleMusic" class="btn btn-outline-secondary btn-sm" v-bind:class="{active: music}">Music</button>
  </p>
</template>

<script>
  export default {
    props: ['file'],
    methods: {
      toggleMusic() {
        console.log('toggle')
      }
    }
  }
</script>