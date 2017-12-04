import Vue from 'vue'
import App from './App.vue'
import Vddl from 'vddl'

Vue.use(Vddl)

new Vue({
  el: '#app',
  render: h => h(App)
})

