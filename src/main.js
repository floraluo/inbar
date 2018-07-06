// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import g from './globals'
import Vue from 'vue'
import home from './home/home.vue'
import router from './router'
import VfPlugin from './vf-pugin'
import DomPlugin from './dom-plugin'

Vue.config.productionTip = false
// window.Vue = Vue

Vue.use(VfPlugin)
Vue.use(DomPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { home },
  template: '<home/>',
  mounted () {
    g.Breakpoints()
  }
})
