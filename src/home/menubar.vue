<template>
<nav class="site-menubar site-menubar-dark" id="admui-siteMenubar">
  <div class="site-menubar-body">
    <div class="tab-content height-full" id="admui-navTabs">
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

        // if (!this.initMenubar) {
        //   $.site.menubar.init();
        //   this.initMenubar = true;
        // }
      },
      hide() {
        if (this.initMenubar) {
          $.site.menubar.hide()
        }
      },
      close() {
        const $body = $('body');
        $.site.menubar.opened = null;
        $.site.menubar.folded = null;
        $.site.menubar.top = false;
        $.site.menubar.foldAlt = false;
        $.site.menubar.auto = true;
        $body.removeClass('site-menubar-unfold site-menubar-open')
        $('#admui-navTabs>div.active').removeClass('active');
      },
      toggle() {
          this.init();
          $.site.menubar.toggle()
      }
    }
  }
</script>

<style>
</style>
