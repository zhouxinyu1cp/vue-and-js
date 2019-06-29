// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store, // Vue实例中挂载store
  el: '#app',
  components: { App },
  template: '<App/>'
})
