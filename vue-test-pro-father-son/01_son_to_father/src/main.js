import Vue from 'vue'
import App from './App.vue'
import Son from './Son.vue'


Vue.component(Son.name, Son);


new Vue({
  el: '#app',
  render: h => h(App)
})
