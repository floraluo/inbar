<template>
<div id="home" :class="{'site-manager': manager}">
  <navbar key="navbar" :menus="menus" :manager="manager"></navbar>
  <menubar key="menubar" :menus="menus" :manager="manager"></menubar>
  <tabs key="tabs" v-show="!manager"></tabs>
  <main class="site-page" :class="{'manager': manager}">
    <div class="page-container" @click="toggleBars" id="admui-pageContent">
      <div  class=" animation-fade active">
        <!--<sub-menubar v-if="manager" :menus="menus"></sub-menubar>-->
        <!--<transition name="fade" mode="out-in" appear-->
                    <!--enter-class="animation-fade animation-duration-9 animation-reverse"-->
                    <!--leave-class="animation-fade animation-duration-9"-->
        <!--&gt;-->
          <keep-alive>
            <router-view :menus="menus"/>
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
  // import '../../static/themes/classic/global/js/core'
  import {publish} from 'pubsub-js'
  import { GET } from '@/core/http'
  import store from '@/core/store'
  import { components } from "@/core";
  import navbar from './navbar'
  import menubar from './menubar'
  import tabs from './tabs'
  import subMenubar from './sub-menubar'
  import pkg from '../../package.json'
  import {localDictionary, extendFields} from '@/views/script/custom.valid'

  let vm;
  function recursiveMenu (newMenus, menu) {
    newMenus.some(m => {
      if (menu.parentId === m.id) {
        if (!m['children']) m['children'] = [];
        m.children.push(menu);
        return true;
      } else if (menu.path.search(m.path) === 0) {
        if (!m['children']) {
          m['children'] = [];
          m.children.push(menu);
        } else {
          recursiveMenu(m.children, menu);
        }
        return true;
      }
    })
  }
  function recursiveMap (mes) {
    // const vm = this;
    mes.forEach(m => {
      // let active = m.path === vm.$route.path;
      if (vm.manager) {
        // if (m.type === 0) {
          let active = vm.$route.path.search(m.path) === 0;
          let item = $.extend(m, {active: active});
          if (item.parentId === 0) {
            vm.menus.push(item);
          } else {
            recursiveMenu(vm.menus, item);
          }
        // }
      } else {
        if (m.type === 1) {
          let active = vm.$route.path.search(m.path) === 0;
          let item = $.extend(m, {active: active});
          if (item.parentId === 0) {
            vm.menus.push(item);
          } else {
            recursiveMenu(vm.menus, item);
          }
        }
      }
    });
  }
  function initVeeValidate(dictionary, fields) {
    const keys = Object.keys(fields);
    vm.$validator.localize('zh_CN', dictionary);
    keys.forEach(key => {
      vm.$validator.extend(key, fields[key])
    })
  }
export default {
  name: 'home',
  components: components(navbar, menubar, tabs, subMenubar, localDictionary, extendFields),
  children: { tabs: 'tabs', menubar: 'menubar', navbar: 'navbar' },
  data () {
    return {
      manager: false,
      menus: [],
      menusResult: [],
      product: $.extend({}, pkg.product, {version: pkg.version})
    }
  },
  created () {
    vm = this;
    this.manager = store.get('token').user_basic.username === 'storekeeper' || store.get('token').user_basic.username === 'aaa';
    initVeeValidate(localDictionary, extendFields)
    GET('/api/me/menu/')
      .done(function (data) {
        recursiveMap.call(vm, data)
        // recursiveMap.call(vm, bb)

        publish('menu.success')
        console.log('menus-----++++++-', vm.menus, data)
      }).fail(function () {
      console.log("Can't load menus", arguments)
    })
  },
  mounted () {
    // const vm = this;
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

    $(document).ajaxComplete((event, xhr, options) => {
      if (xhr.status === 401) {
        vm.$router.push("/login")
      }
    })

    //  侧边栏开关
    $(document).on('click', '.j-page-aside-switch', function (e) {
      // self.pageAside();
      const pageAside = $(".page-aside"),
        isOpen = pageAside.hasClass('open');

      pageAside.toggleClass('open', !isOpen);
      e.stopPropagation();
    });
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

<style scoped>
  .page-manager-content{
    /*padding-top: 55px;*/
  }
  .site-manager .site-page{
    margin-top: 0;
  }

</style>
<style lang="scss">
  @import "../sass/_variables.scss";
  @import "../sass/_mixin.scss";
  @import "../sass/_multiselect.scss";
  @import "../sass/_base.scss";
  html, body, #home{
    height: 100%;
  }
  #app{
    height: calc(100% - #{$tab-height});
  }
  body{
    overflow-x: visible;
    padding-top: $nav-height;
  }
  .site-navbar .navbar-toolbar.navbar-left{
    width: calc(100% - #{$nav-tool-width});
  }
  .site-menubar,
  .site-contabs-open .site-contabs,
  .site-menubar-unfold .site-menubar{
    top: $nav-height
  }
  .site-contabs-open .site-page{
    margin-top: $tab-height;
    height: auto;
    min-height: calc(100% - #{$footer-height});
    &.manager{
      min-height: 100%;
    }
  }
  .site-contabs-open .site-contabs .contabs-scroll,
  .site-contabs-open .site-contabs,
  .site-contabs-open .site-contabs .contabs-scroll .con-tabs > li.active > a{
    //height: $tab-height;
  }
  .page-content{
    padding: 20px 20px 0;
    background-color: $content-bgc;
  }
  .no-data{
    @include no-data;
  }

  /*layer弹窗样式*/
  .layui-layer-title{
    background-color: #edf6ff;
    font-size: 16px;
    color: #666;
  }

  .v-table-popover-content{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
