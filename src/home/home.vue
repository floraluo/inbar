<template>
<div id="">
  <navbar key="navbar" :menus="menus"></navbar>
  <menubar key="menubar" :menus="menus"></menubar>
  <tabs key="tabs"></tabs>
  <main class="site-page">
    <div class="page-container" @click="toggleBars" id="admui-pageContent">
      <div  class="page-frame animation-fade active">
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
  import '@/sass/base.scss'
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

// import store, {setToken} from '../core/store'
import { GET } from '../core/http'

import { components } from "../core";
import navbar from './navbar'
import menubar from './menubar'
import tabs from './tabs'
import pkg from '../../package.json'

function recursiveMenu (newMenus, menu) {
  newMenus.some(m => {
    if (menu.parent === m.path) {
      if (!m['children']) m['children'] = [];
      m.children.push(menu);
      return true;
    } else if (menu.path.search(m.path) >= 0) {
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
  const vm = this;
  mes.forEach(m => {
    // let active = m.path === vm.$route.path;
    let active = vm.$route.path.search(m.path) >= 0;
    let item = $.extend(m, {active: active});
    if (item.parent === '/') {
      vm.menus.push(item);
    } else {
      recursiveMenu(vm.menus, item);
    }
  });

}
  // {id:2,name:"系统管理",path:"/system",parent:"/",icon:"wb-settings",ordinal:7,buttons:[],active:true,children:[
  //   {id:2000,name:"系统信息",path:"/system/info",parent:"/system",icon:"wb-settings",ordinal:0,buttons:[],active:true},
  //   {id:2001,name:"菜单管理",path:"/system/menu",parent:"/system",icon:"wb-settings",ordinal:0,buttons:[]},
  //   {id:2002,name:"用户管理",path:"/system/user",parent:"/system",icon:"wb-settings",ordinal:0,buttons:[]},
  //   {id:2003,name:"日志信息",path:"/system/log",parent:"/system",icon:"wb-settings",ordinal:0,buttons:[]},
  //   {id:2004,name:"系统设置",path:"/system/settings",parent:"/system",icon:"wb-settings",ordinal:0,buttons:[],children:[
  //       {id:2005,name:"显示设置",path:"/system/settings/ui",parent:"/system/settings",icon:"wb-settings",ordinal:0,buttons:[]}
  //     ]}
  // ]},
  // {id:3,name:"我的账户",path:"/account",parent:"/",icon:"wb-settings",ordinal:0,buttons:[],children:[
  //   {id:3001,name:"我的账户",path:"/account/me",parent:"/account",icon:"wb-settings",ordinal:0,buttons:[]}
  // ]},
  // {id:4,name:"网吧管理",path:"/bar",parent:"/",icon:"wb-settings",ordinal:1,buttons:[]},
  // {id:5,name:"会员管理",path:"/member",parent:"/",icon:"wb-settings",ordinal:2,buttons:[]},
  // {id:6,name:"经营管理",path:"/operation",parent:"/",icon:"wb-settings",ordinal:3,buttons:[]},
  // {id:7,name:"进销存管理",path:"/goods",parent:"/",icon:"wb-settings",ordinal:4,buttons:[]},
  // {id:8,name:"交班管理",path:"/next",parent:"/",icon:"wb-settings",ordinal:5,buttons:[]},
  // {id:9,name:"店长工具",path:"/keeper",parent:"/",icon:"wb-settings",ordinal:6,buttons:[]}
export default {
  name: 'home',
  components: components(navbar, menubar, tabs),
  children: { tabs: 'tabs', menubar: 'menubar', navbar: 'navbar' },
  data () {
    return {
      menus: [],
      menusResult: [],
      product: $.extend({}, pkg.product, {version: pkg.version})
    }
  },
  created () {
//    const path = this.$route.path
//     this.$router.replace('/')
//    this.$router.push(path)
//    if (this.$router.history.current.path !== '/') {
      // this.tabInstance.addTab({route: this.$router.history.current, name: 'xx'})
      // this.$data.tabsTitle.push({route: this.$router.history.current, name: 'xx'})
//    }

    const vm = this;
    GET('/api/me/menu/')
      .done(function (data) {
        recursiveMap.call(vm, data)
        // me.menus = recursiveMap(data)


        console.log('menus------', vm.menus, data)
      }).fail(function () {
      console.log("Can't load menus", arguments)
    })
  },
  mounted () {
    const vm = this;
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
#app {
  padding: 0;
  margin: 0;
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
<style lang="scss">
  @import "@/sass/_variables.scss";
  @import "@/sass/_mixin.scss";
  body{
    padding-top: $nav-height;
    min-width: 1366px;
    overflow-x: auto;
  }
  .site-menubar,
  .site-contabs-open .site-contabs,
  .site-menubar-unfold .site-menubar{
    top: $nav-height
  }
  .site-contabs-open .site-page .page-frame{
    height: auto;
    min-height: calc(100vh - #{$nav-height} - #{$tab-height} - #{$footer-height});
  }
  .site-contabs-open .site-page{
    margin-top: $tab-height;
    /*<!--padding-top: $tab-height;-->*/
    height: calc(100% - #{$nav-height});
  }
  .site-contabs-open .site-contabs .contabs-scroll,
  .site-contabs-open .site-contabs,
  .site-contabs-open .site-contabs .contabs-scroll .con-tabs > li.active > a{
    //height: $tab-height;
  }
  .no-data{
    @include no-data;
  }
</style>
