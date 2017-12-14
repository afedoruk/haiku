<template>
  <button type="button" class="btn btn-warning" v-on:click="speakFromMyHeart">Let me speak from my heart!</button>
</template>

<script>

  export default {
    props: ['strings'],
    methods: {
      speakFromMyHeart() {
        var gluedStrings = []
        var self = this
        this.strings.forEach(function (item) {
          gluedStrings.push(self.glueText(item.wordList))
        });
     //   this.speakPolly(gluedStrings)
        this.speakBrowser(gluedStrings)
      },
      glueText: function(words) {
        var msgTxt = "";
        words.forEach(function(item) {
          if (!["s", "ed", "y", "r", "ly", "est"].includes(item.word)) {
            msgTxt += " "
          }
          msgTxt += item.word
        })
        console.log(msgTxt)
        return msgTxt
      },
      speakPolly: function (gluedStrings) {
        var msgTxt = gluedStrings.join("<break time='1s'/>")
        var a = new Audio("https://haiku2-back.herokuapp.com/?text="+msgTxt);
        a.play();
      },
      speakBrowser: function (gluedStrings) {
        var msgTxt = gluedStrings.join(' ')
        var synth = window.speechSynthesis;
        var msg = new SpeechSynthesisUtterance(msgTxt);
        msg.rate = 1
        msg.pitch = 0.8
        var voices = synth.getVoices();
        console.log(voices)
        var voice = voices.filter(function(voice) { return voice.name == 'Google UK English Male'; })[0];
        if(voice) {
          msg.voice = voice
        }
        synth.speak(msg);
      }
    }
  }
</script>