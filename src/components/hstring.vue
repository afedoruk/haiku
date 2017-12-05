<template>
  <vddl-list class="string rounded border-secondary" :list="string.wordList" :horizontal="true" :class="{ok: isCompleted }" :inserted="inserted">
    <word v-for="(word, index) in string.wordList" :word="word" :key="word.key" :index="index" :wrapper="string.wordList"></word>
  </vddl-list>
</template>

<script>
  import Word from './word'

  export default {
    props: ['string'],
    components: {Word},
    computed: {
      isCompleted: function () {
        var count = 0;
        this.string.wordList.forEach(function (item) {
          count += item.count;
        });
        return count == this.string.numOfSylls
      },
    },
    watch: {
      isCompleted: function (newValue) {
        this.$emit("update", newValue)
      }
    },
    methods: {
      inserted() {
        this.$emit('inserted')
      }
    }
  }
</script>

<style>

  .string {
    border: 1px solid #eee;
    min-height: 50px;
    padding: 5px;
    max-width: 800px;
    margin: 5px;
  }

  .string.ok {
    background: #efe;
  }
</style>
