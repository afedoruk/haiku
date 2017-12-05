<template>
  <div>
    <h-string v-for="string in strings" :string="string" @update="detectCompleteness" :key="string.id" v-on:inserted="droppedIn"></h-string>
    <vddl-list class="pool" :list="wordList" :horizontal="true" :inserted="droppedOut">
      <word v-for="(word, index) in wordList" :word="word" :key="word.key" :index="index" :wrapper="wordList"  v-show="word.group == screenNum"></word>
    </vddl-list>
    <p>
      <button v-on:click="moreWords"  class="btn btn-dark">
        More words
      </button>
      <button v-if="isComplete" type="button" class="btn btn-warning" v-on:click="speakFromMyHeart">Let me speak from my heart!</button>
    </p>
    <player v-bind:file='"/media/koto_cut_reverb_normalize-10db.ogg"'></player>
    <audio ref="wordIn" src="media/word_in.ogg"></audio>
    <audio ref="wordOut" src="media/word_out.ogg"></audio>
    <audio ref="lineBroken" src="media/line_broken.ogg"></audio>
    <audio ref="lines1Completed" src="media/1line.ogg"></audio>
    <audio ref="lines2Completed" src="media/2lines.ogg"></audio>
    <audio ref="lines3Completed" src="media/3lines.ogg"></audio>
  </div>
</template>

<script>
  import Word from "./components/word"
  import HString from "./components/hstring"
  import Player from "./components/player"
  import $ from 'jquery'

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
        ],
        wordList: [],
        screenNum: 1,
        maxScreenNum: 7
      }
    },
    components: {Word, HString, Player},
    created: function(){
      var self = this
      $.getJSON('/data/words.json',function(json){
        self.$set(self, 'wordList', json)
      });
    },
    methods: {
      moreWords: function () {
        if (this.screenNum < this.maxScreenNum) {
          this.screenNum++
        } else {
          this.screenNum = 1
        }
      },
      droppedIn: function() {
        this.$refs.wordIn.play()
      },
      droppedOut: function() {
        this.$refs.wordOut.play()
      },
      detectCompleteness: function(isCompleted) {
        if(isCompleted) {
          this.completeCounter++
          if(this.completeCounter < this.strings.length) {
            this.$refs.lines1Completed.play()
          }
        } else {
          this.completeCounter--
          this.$refs.lineBroken.play()
        }
        if(this.completeCounter == this.strings.length) {
          this.isComplete = true
          this.$refs.lines3Completed.play()
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
    min-height: 250px;
    padding-top: 30px;
    padding-bottom: 30px;
  }
</style>