<template>
  <nav class="site-menubar site-menubar-dark" id="admui-siteMenubar" v-show="$route.meta.menubar || $route.matched[0].meta.menubar">
    <!--<nav class="site-menubar site-menubar-dark" id="admui-siteMenubar">-->
  <div class="manager-setting" v-if="manager">
    <img src="@/assets/img/boy.png" alt="" width="60">
    <!--<img src="@/assets/img/girl.png" alt="" width="60">-->
    <p>你好！店长</p>
    <div class="operate">
      <a class="btn-pure btn-default padding-right-10" type="button"  href="#/account/manager-info"><i class="iconfont icon-setting"></i></a>
      <a class="btn-pure btn-default" type="button"  ><i class="iconfont icon-btn-esc"></i></a>
    </div>
  </div>
  <div class="site-menubar-body">

    <div class="tab-content height-full" id="admui-navTabs">
      <div class="menubar-toggle" role="button" @click.stop.prevent="menuToggle" v-if="!manager">
        <i class="iconfont icon-shouqicaidan" v-show="!fold">
          <span class="sr-only">切换目录(收营员身份登录)</span>
        </i>
        <i class="iconfont icon-zhankaicaidan" v-show="fold">
          <span class="sr-only">切换目录(收营员身份登录)</span>
        </i>
      </div>
      <!-- 一级菜单 -->
      <template v-for="(menu, index) in menus">
        <menu-tab :key="menu.id" :tab="menu" :active="index === 0" v-if="menu.children"></menu-tab>
      </template>
      <!-- 一级菜单 -->
    </div>
  </div>
</nav>
</template>

<script>
  import $ from 'jquery'
  import '@/assets/js/media-menu'
  import '../../static/themes/classic/base/js/sections/menu'

  import Breakpoints from 'breakpoints-js'
  import { subscribe } from 'pubsub-js'
  import { components } from '../core'
  import MenuTab from './menu-tab'

  let vm;

  export default {
    name: 'menubar',
    components: components(MenuTab),
    props: {
      manager: Boolean,
      menus: Array,
      tabsTitle: Array
    },
    data () {
      return {
        fold: false,
        initMenubar: false
      }
    },
    created () {
      window.vm = vm = this;
      subscribe('menubar.toggle.do', this.toggle)
      subscribe('menubar.hide.do', this.hide)
      subscribe('menubar.close.do', this.rest)
      subscribe('menubar.init.do', this.init)
    },
    mounted() {
      console.log(this.$route)
      if (this.$route.meta.menubar || this.$route.matched[0].meta.menubar) {
        this.init();
      }
      $('#admui-siteMenubar').on('changing.site.menubar', function () {
        var $menubar = $('[data-toggle="menubar"]');

        $menubar.toggleClass('hided', !$.site.menubar.opened);
        $menubar.toggleClass('unfolded', !$.site.menubar.folded);
      });
      Breakpoints.on('change', function () {
        $.site.menubar.change();
        const breakpoint = Breakpoints.current();
        if (breakpoint) {
          switch (breakpoint.name) {
            case 'lg':
              vm.fold = false;
              break;
            case 'md':
            case 'sm':
            case 'xs':
              vm.fold = true;
              break;
          }
        }
      });
    },
    methods: {
      init() {
        $.site.menubar.init();
        $.site.menubar.unfold();

        if (!this.initMenubar) {
          this.initMenubar = true;
        }
      },
      hide() {
        if (this.initMenubar) {
          $.site.menubar.hide()
        }
      },
      rest() {
        $.site.menubar.reset();
      },
      close() {
        // $.site.menubar.reset()

        // this.opened = null;
        // this.folded = null;
        // this.$body.removeClass('site-menubar-hide site-menubar-open site-menubar-fold site-menubar-unfold');
        // this.$html.removeClass('disable-scrolling');


        const $body = $('body');
        $.site.menubar.opened = null;
        $.site.menubar.folded = null;
        $.site.menubar.top = false;
        $.site.menubar.foldAlt = false;
        $.site.menubar.auto = true;
        $body.removeClass('site-menubar-fold site-menubar-unfold site-menubar-open')
        $('#admui-navTabs>div.active').removeClass('active');
      },
      toggle() {
        // if (this.initMenubar) {
        //   this.init();
        // }
          $.site.menubar.toggle()
      },
      menuToggle() {
        this.fold = !this.fold;
        this.toggle();
      }
    }
  }
</script>

<style lang="scss">
  @import "@/sass/_variables.scss";
  .menubar-toggle{
    position: relative;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid $theme-color;
    margin-bottom: 10px;
    &:after{
      content: '';
      display: block;
      width: 100%;
      height: 10px;
      position: absolute;
      bottom: -12px;
      background-color: #fff;
    }
    .iconfont{
      font-size: 26px;
      color: #fff;
    }
  }
  .site-manager{
    .site-menubar{
      background-color: $side-bgc-manager;
    }


    .manager-setting{
      padding-top: 20px;
      height: 195px;
      border-bottom: 2px solid #d6d6d6;
      text-align: center;
      > p{
        padding-top: 15px;
        font-size: 16px;
        color: #666;
      }
      a{
        border: 0;
        background-color: transparent;
        > .iconfont{
          font-size: 24px;
        }
      }
    }
  }

</style>
