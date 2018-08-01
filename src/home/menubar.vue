<template>
<nav class="site-menubar site-menubar-dark" id="admui-siteMenubar" v-show="$route.meta.menubar">
  <div class="site-menubar-body">
    <div class="tab-content height-full" id="admui-navTabs">
      <div class="menubar-toggle" role="button" @click.stop="menuToggle">
        <i class="iconfont icon-shouqicaidan">
          <span class="sr-only">切换目录</span>
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
  import Breakpoints from 'breakpoints-js'
  import { subscribe } from 'pubsub-js'
  import '../../static/themes/classic/base/js/sections/menu'
  import { components } from '../core'
  import MenuTab from './menu-tab'

  export default {
    name: 'menubar',
    components: components(MenuTab),
    props: {
      menus: Array,
      tabsTitle: Array
    },
    data () {
      return {
        initMenubar: false
      }
    },
    created () {
      subscribe('menubar.toggle.do', this.toggle)
      subscribe('menubar.hide.do', this.hide)
      subscribe('menubar.close.do', this.close)
      subscribe('menubar.init.do', this.init)
    },
    updated () {
      if (this.$route.meta.menubar) {
        this.init();
      }
      $.site.menu.init()
      $('#admui-siteMenubar').on('changing.site.menubar', function () {
        var $menubar = $('[data-toggle="menubar"]');

        $menubar.toggleClass('hided', !$.site.menubar.opened);
        $menubar.toggleClass('unfolded', !$.site.menubar.folded);
      });
      Breakpoints.on('change', function () {
        $.site.menubar.change();
      });
    },
    methods: {
      init() {
        $.site.menubar.init();

        if (!this.initMenubar) {
          // $.site.menubar.init();
          this.initMenubar = true;
        }
      },
      hide() {
        if (this.initMenubar) {
          $.site.menubar.hide()
        }
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
        let $icon = $('.menubar-toggle .iconfont');
        if ($icon.hasClass('icon-shouqicaidan')) {
          $icon.removeClass('icon-shouqicaidan').addClass('icon-zhankaicaidan')
        } else {
          $icon.removeClass('icon-zhankaicaidan').addClass('icon-shouqicaidan')
        }
        // $('.menubar-toggle menubar-toggle')
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
</style>
