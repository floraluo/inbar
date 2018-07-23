<template>
<nav class="site-menubar site-menubar-dark" id="admui-siteMenubar">
  <div class="site-menubar-body">
    <div class="tab-content height-full" id="admui-navTabs">
      <!-- 一级菜单 -->
      <template v-for="(menu, index) in menus">
        <menu-tab :key="menu.id" :tab="menu" :active="index === 0"></menu-tab>
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
      return {}
    },
    created () {
      subscribe('menubar.toggle.do', this.toggle)
      subscribe('menubar.hide.do', this.hide)
    },
    updated () {
      $.site.menu.init()
      $.site.menubar.init()
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
      hide() {
        $.site.menubar.hide()
      },
      toggle() {
        $.site.menubar.toggle()
      }
    }
  }
</script>

<style>
</style>
