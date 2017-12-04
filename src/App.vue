<template>
  <div>
    <h-string v-for="string in strings" :string="string" @update="detectCompleteness" :key="string.id"></h-string>
    <vddl-list class="pool" :list="wordList" :horizontal="true">
      <word v-for="(word, index) in wordList" :word="word" :key="word.key" :index="index" :wrapper="wordList"></word>
    </vddl-list>
  </div>
</template>

<script>
  import Word from "./components/word"
  import HString from "./components/hstring"

  export default {
    data() {
      return {
        isComplete: false,
        completeCounter: 0,
        strings: [
          {
            "wordList": [],
            "numOfSylls": 5,
            "id": 1
          },
          {
            "wordList": [],
            "numOfSylls": 7,
            "id": 2
          },
          {
            "wordList": [],
            "numOfSylls": 5,
            "id": 3
          }
        ], wordList: [
          {word: 'dwerkhsd', key: 1, count: 1},
          {word: 'pop', key: 2, count: 1},
          {word: 'meow', key: 3, count: 2},
          {word: 'fandango', key: 4, count: 3},
        ]
      }
    },
    components: {Word, HString},
    methods: {
      detectCompleteness: function(isCompleted) {
        if(isCompleted) {
          this.completeCounter++
        } else {
          this.completeCounter--
        }
        if(this.completeCounter == this.strings.length) {
          this.isComplete = true
        } else {
          this.isComplete = false
        }
      }
    }
  }
</script>

<style>

  .pool {
    max-width: 800px;
    min-height: 200px;
    padding-top: 30px;
    padding-bottom: 30px;
    background: #ccc;
  }

  .vddl-list, .vddl-draggable {
    position: relative;
  }

  .vddl-list {
    min-height: 44px;
  }

  .vddl-dragging{
    opacity: 0.7;
  }

  .vddl-dragging-source {
    display: none;
  }
</style>