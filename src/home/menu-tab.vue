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
  import { publish, subscribe } from '../core/topics'

  function findMenuTree(menu1, filter, visitor) {
    visitor = visitor || function () {}
    let selected = null
    visitor(menu1)
    for (let i = 0; i < menu1.menus.length && !selected; i++) {
      const menu2 = menu1.menus[i]
      visitor(menu2)
      for (let j = 0; j < menu2.menus.length && !selected; j++) {
        const menu3 = menu2.menus[j]
        visitor(menu3)
        if (!menu3.menus || !menu3.menus.length) {
          if (filter(menu3)) {
            selected = [menu1, menu2, menu3]
            break
          }
        } else {
          for (let k = 0; k < menu3.menus.length && !selected; k++) {
            const menu4 = menu3.menus[k]
            visitor(menu4)
            if (filter(menu4)) {
              selected = [menu1, menu2, menu3, menu4]
              break
            }
          }
        }
      }
    }
    return selected
  }

  function makeActive (menu1, url) {
    let current = findMenuTree(menu1, menu => url === menu.url)
    findMenuTree(menu1, menu => false, menu => { menu.active = false })
    if (!current) {
      return
    }
//    let previous = findMenuTree(menu1, menu => url !== menu.url && menu.active)
//    if (previous && current[current.length - 1] === previous[previous.length - 1]) {
//      return
//    }
//    toggle(previous, false)
    toggle(current, true)
  }

  function toggle (menus, active) {
    if (!menus) return
    menus.forEach(menu => { menu.active = active })
    $(`[data-nav=${menus[0].id}]`).tab('show')
  }

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
      subscribe('router.before', this.menuChanged)
    },
    methods: {
      menuChanged (to) {
        console.log("menuChanged", to)
        makeActive(this.tab, to.path)
      },
      menuClicked (menu) {
        publish('menu.item.clicked', {route: this.$route, name: menu.title, menu: menu})
      },
      toggleMenu (e) {
        console.log('this', this, 'event', e, arguments)
        $(e.target).parents('.has-sub').toggleClass('open')
        // menu.opened = !menu.opened
      }
    }
  }
</script>
