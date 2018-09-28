// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import g from './globals'
import 'jquery-slimscroll'
import Vue from 'vue'
import store from './store'
import app from './App.vue'
import 'vue-easytable/libs/themes-base/index.css'
import {VTable, VPagination} from 'vue-easytable'
import 'vue-tree-halower/dist/halower-tree.min.css'
import VTree from 'vue-tree-halower'
import router from './router'
import VeeValidate from 'vee-validate'
import veezhCN from 'vee-validate/dist/locale/zh_CN'
import FormsPlugin from './plugins/forms'
import DomPlugin from './plugins/dom'
import FiltersPlugin from './plugins/filters'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// import { publish } from './core/topics'
import { publish } from 'pubsub-js'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './views/template/',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

Vue.use(VTree)
//表格注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

Vue.config.productionTip = false
//vee-validate表单验证插件配置
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
  if (to.meta.menubar || to.matched[0].meta.menubar) {
    publish('menubar.init.do')
    // publish('menubar.open.do')
  } else if (to.meta.menubar === false || to.matched[0].meta.menubar === false) {
    publish('menubar.close.do')
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { app },
  template: '<app/>',
  mounted () {
    g.Breakpoints()
  }
})
