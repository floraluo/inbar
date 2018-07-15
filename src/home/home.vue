<template>
<div id="app">
  <navbar key="navbar" :menus="menus"></navbar>
  <menubar key="menubar" :menus="menus"></menubar>
  <tabs key="tabs"></tabs>
  <main class="site-page">
    <div class="page-container" @click="toggleBars" id="admui-pageContent">
      <div name="iframe-0" class="page-frame animation-fade active">
        <!--<transition name="fade" mode="out-in" appear-->
                    <!--enter-class="animation-fade animation-duration-9 animation-reverse"-->
                    <!--leave-class="animation-fade animation-duration-9"-->
        <!--&gt;-->
          <keep-alive>
            <router-view/>
          </keep-alive>
        <!--</transition>-->
      </div>
    </div>
    <div class="page-loading vertical-align text-center">
      <div class="page-loader loader-default loader vertical-align-middle" data-type="default"></div>
    </div>
  </main>
  <footer class="site-footer">
    <div class="site-footer-legal">{{ product.company }} &copy;
      <a :href="product.homepage" target="_blank">{{ product.domain }}</a>
    </div>
    <div class="site-footer-right">
      当前版本：v{{ product.version }}
      <a class="margin-left-5" data-toggle="tooltip" title="升级" :href="product.homepage" target="_blank">
        <i class="icon fa-cloud-upload"></i>
      </a>
    </div>
  </footer>
</div>
</template>

<script>
import $ from 'jquery'
import '../globals'
import 'bootstrap'
import Breakpoints from 'breakpoints-js'
import 'webui-popover'
import 'jquery-asHoverScroll'
import '../../static/vendor/artTemplate/template.min.js'
import '../../static/vendor/layer/layer.min.js'
import '../../static/vendor/screenfull/screenfull.min.js'
import '../../static/admui/core'
import '../../static/admui/configs/site-configs'

import '../../static/admui/components/slimscroll'
import '../../static/admui/plugins/responsive-tabs'
import '../../static/themes/classic/global/js/core'
import '../../static/themes/classic/base/js/sections/menu'
import '../../static/themes/classic/base/js/sections/media-menu'
// import '../../static/themes/classic/base/js/site'
// import '../../static/vendor/'

import store from '../core/store'
import { Formed, POST, GET } from '../core/http'

import { components } from "../core";
import navbar from './navbar'
import menubar from './menubar'
import tabs from './tabs'
import pkg from '../../package.json'

function recursiveMap (menus) {
  return menus.map(m => {
    let me = Object({ id: m.id, title: m.text, icon: m.icon, url: (m.url ? m.url : ''), active: false })
    if (m.children && m.children.length) {
      me.menus = recursiveMap(m.children)
    }
    return me
  })
}

export default {
  name: 'home',
  components: components(navbar, menubar, tabs),
  children: { tabs: 'tabs', menubar: 'menubar', navbar: 'navbar' },
  data () {
    return {
      menus: null,
      product: $.extend({}, pkg.product, {version: pkg.version})
    }
  },
  created () {
//    const path = this.$route.path
    this.$router.replace('/')
//    this.$router.push(path)
//    if (this.$router.history.current.path !== '/') {
      // this.tabInstance.addTab({route: this.$router.history.current, name: 'xx'})
      // this.$data.tabsTitle.push({route: this.$router.history.current, name: 'xx'})
//    }

    const me = this

    POST('/api/oauth/token', Formed({
      grant_type: 'password',
      client_id: 'b4179ed65e5542c394c23f4c11dc407f',
      client_secret: 'web-frontend',
      username: 'admin',
      password: 'admin123'
    }))
      .done(d => {
        console.log('auth done', d, arguments)
        store.oauth2 = d
        GET('/api/user/menus')
          .done(function (menus) {
            me.menus = recursiveMap(menus)
            console.log('menus', this.menus, menus)
          }).fail(function () {
          console.log("Can't load menus", arguments)
        })
      })
      .fail(e => {
        console.log('auth fail', e, arguments)
      })
  },
  mounted () {
    // 对下拉列表的其他功能
    $(document).on('show.bs.dropdown', function (e) {
      var $target = $(e.target), $menu,
        $trigger = e.relatedTarget ? $(e.relatedTarget) : $target.children('[data-toggle="dropdown"]'),
        animation = $trigger.data('animation');

      if (animation) {
        $menu = $target.children('.dropdown-menu');

        $menu.addClass('animation-' + animation);

        $menu.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          $menu.removeClass('animation-' + animation);
        });
      }
    });
    $('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
    $('[data-toggle="popover"]').popover();
  },
  methods: {
    toggleBars () {
      // 小屏下收起顶部导航条和左侧菜单
      if (Breakpoints.is('xs') && $('body').hasClass('site-menubar-open')) {
        this.menubar.hide();
        this.navbar.hide()
      }
      // 核心框架中下拉菜单切换操作
      $('[data-toggle="dropdown"]').parent().removeClass('open');
    }

  }
}
</script>

<style>
#app {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.page {
  min-height: 100%;
}
</style>
