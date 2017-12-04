<template>
  <vddl-draggable :draggable="word"
                  :index="index"
                  :wrapper="wrapper"
                  effect-allowed="move"
                  class="badge badge-info word">
    {{word.word}}
  </vddl-draggable>
</template>

<script>
  export default {
    props: ['word', 'index', 'wrapper']
  }
</script>

<style>
  .word {
    cursor: pointer;
    margin: 5px;
    font-size: 20px;
    float: left;
  }
</style>