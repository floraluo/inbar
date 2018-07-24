// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import g from './globals'
import 'jquery-slimscroll'
import Vue from 'vue'
import app from './App.vue'
import layer from 'vue-layer'
// import home from './home/home.vue'
// import login from './views/login.vue'
import router from './router'
import VeeValidate from 'vee-validate'
import veezhCN from 'vee-validate/dist/locale/zh_CN'
import FormsPlugin from './plugins/forms'
import DomPlugin from './plugins/dom'
import FiltersPlugin from './plugins/filters'
import { publish } from './core/topics'

Vue.prototype.$layer = layer(Vue);

Vue.config.productionTip = false
Vue.use(VeeValidate, {
  locale: 'zh_CN',
  dictionary: {
    zh_CN: {
      messages: veezhCN.messages
    }
  }
})
Vue.use(FormsPlugin)
Vue.use(DomPlugin)
Vue.use(FiltersPlugin)

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
  components: { app },
  template: '<app/>',
  mounted () {
    g.Breakpoints()
  }
})
