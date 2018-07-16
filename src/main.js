// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import g from './globals'
import 'jquery-slimscroll'
import Vue from 'vue'
import home from './home/home.vue'
import router from './router'
import FormsPlugin from './plugins/forms'
import DomPlugin from './plugins/dom'
import { publish } from './core/topics'

Vue.config.productionTip = false
// window.Vue = Vue

Vue.use(FormsPlugin)
Vue.use(DomPlugin)

router.beforeEach((to, from, next) => {
  // console.log('route', to, from)
  if (!to.matched || !to.matched.length) {
    next('/404')
    return
  }
  publish('router.before', to, from)
  next()
})

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
