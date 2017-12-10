<template>
  <p>
    <audio :src="file" loop autoplay ref="player"/>
    <button v-on:click="toggleMusic" class="btn btn-outline-secondary btn-sm" v-bind:class="{active: music}">Music</button>
  </p>
</template>

<script>
  export default {
    props: ['file'],
    data() {
      return {
        music: true
      }
    },
    methods: {
      toggleMusic() {
        if (this.music) {
          this.$refs.player.pause()
          this.music = false
        } else {
          this.$refs.player.play()
          this.music = true
        }
      }
    }
  }
</script>