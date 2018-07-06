<template>
  <div :class="['tab-pane animation-fade height-full', {active: active}]" :id="`admui-navTabsItem-${this.tab.id}`" role="tabpanel">
    <div>
      <ul class="site-menu">
        <template v-for="menu in tab.menus">
          <!-- 二级菜单 -->
          <li :key="menu.id" class="site-menu-category">{{ menu.title }}</li>
          <!-- 三级菜单 -->
          <template v-for="submenu in menu.menus">
            <li v-if="!!submenu.menus"
                :key="submenu.id"
                :class="['site-menu-item', 'has-sub', {'open': submenu.opened}]">
              <a href="javascript:;">
                <i :class="['site-menu-icon', submenu.icon]" aria-hidden="true"></i>
                <span class="site-menu-title">{{ submenu.title }}</span>
                <span class="site-menu-arrow"></span>
              </a>
              <ul class="site-menu-sub">
                <!-- 四级菜单 -->
                <li v-for="menu4 in submenu.menus"
                    :key="menu4.id"
                    @click="menuClicked(menu4)"
                    class="site-menu-item ">
                  <router-link :to="menu4.url">
                    <span class="site-menu-title">{{ menu4.title }}</span>
                  </router-link>
                </li>
                <!-- 四级菜单 -->
              </ul>
            </li>

            <li v-else :key="submenu.id" @click="menuClicked(submenu)" class="site-menu-item" >
              <router-link :to="submenu.url">
                <i :class="['site-menu-icon', submenu.icon]" aria-hidden="true"></i><span class="site-menu-title">{{submenu.title}}</span>
              </router-link>
            </li>
          </template>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import { publishSync } from 'pubsub-js'

  let vm
  export default {
    name: 'menu-tab',
    props: {
      tab: Object,
      active: Boolean
    },
    created () {
      vm = this
      window.vm = vm
    },
    methods: {
      menuClicked (menu) {
        publishSync('menu.item.clicked', {route: this.$route, name: menu.title, menu: menu})
      },
      toggleMenu (e) {
        console.log('this', this, 'event', e, arguments)
        $(e.target).parents('.has-sub').toggleClass('open')
        // menu.opened = !menu.opened
      }
    }
  }
</script>
