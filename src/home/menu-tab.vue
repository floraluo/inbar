<template>
  <div :class="['tab-pane animation-fade height-full',{'active':tab.active}]" :id="`admui-navTabsItem-${this.tab.id}`" role="tabpanel">

      <ul class="site-menu">
        <!--<template v-for="menu in tab">-->
          <!-- 二级菜单 -->
          <li :key="tab.id" class="site-menu-category">{{ tab.name }}</li>
          <!-- 三级菜单 -->
          <template v-for="submenu in tab.children">
            <li v-if="!!submenu.children"
                :key="submenu.id"
                :class="['site-menu-item', 'has-sub', {'open': submenu.opened}]">
              <a href="javascript:;">
                <i :class="['site-menu-icon', submenu.icon]" aria-hidden="true"></i>
                <span class="site-menu-title">{{ submenu.name }}</span>
                <span class="site-menu-arrow"></span>
              </a>
              <ul class="site-menu-sub">
                <!-- 四级菜单 -->
                <li v-for="menu4 in submenu.children"
                    :key="menu4.id"
                    @click="menuClicked(menu4)"
                    class="site-menu-item ">
                  <router-link :to="menu4.path">
                    <span class="site-menu-title">{{ menu4.name }}</span>
                  </router-link>
                </li>
                <!-- 四级菜单 -->
              </ul>
            </li>

            <li v-else :key="submenu.id" @click="menuClicked(submenu)" class="site-menu-item" :class="{'active': submenu.path === $route.path}" >
              <router-link :to="submenu.path">
                <i :class="['site-menu-icon', submenu.icon]" aria-hidden="true"></i><span class="site-menu-title">{{submenu.name}}</span>
              </router-link>
            </li>
          </template>
        <!--</template>-->
      </ul>

  </div>
</template>

<script>
  import $ from 'jquery'
  import { publish, subscribe } from '../core/topics'

  //function findMenuTree(menu1, filter, visitor) {
   // visitor = visitor || function () {}
    //let selected = null
    //visitor(menu1)
   // for (let i = 0; i < menu1.children.length && !selected; i++) {
    //  const menu2 = menu1.children[i]
    //  visitor(menu2)
      //for (let j = 0; j < menu2.children.length && !selected; j++) {
       // const menu3 = menu2.children[j]
       // visitor(menu3)
      //  if (!menu3.children || !menu3.children.length) {
       //   if (filter(menu3)) {
       //     selected = [menu1, menu2, menu3]
       //     break
        //  }
      //  } else {
      //    for (let k = 0; k < menu3.children.length && !selected; k++) {
        //    const menu4 = menu3.children[k]
         //   visitor(menu4)
         //   if (filter(menu4)) {
          //    selected = [menu1, menu2, menu3, menu4]
        //      break
     //       }
     //     }
   //     }
 //     }
 //   }
 //   return selected
 // }

  //function makeActive (menu1, url) {
    //let current = findMenuTree(menu1, menu => url === menu.path)
    //findMenuTree(menu1, menu => false, menu => { menu.active = false })
   // if (!current) {
    //  return
  //  }
//    let previous = findMenuTree(menu1, menu => url !== menu.url && menu.active)
//    if (previous && current[current.length - 1] === previous[previous.length - 1]) {
//      return
//    }
//    toggle(previous, false)
    //toggle(current, true)
 // }

  //function toggle (menus, active) {
   // if (!menus) return
   // menus.forEach(menu => { menu.active = active })
   // $(`[data-nav=${menus[0].id}]`).tab('show')
 // }

  //function mapTabMenusUnactive(tabMenu) {
   // tabMenu.map(item => {
    //  item.active = false
    //  if (item.children) {
     //   mapTabMenusUnactive(item);
     // }
   // })
  //}
 // function mapTabMenusActive(menu, url) {
    //if (url.search(menu.path) >= 0) {
   //   menu.active = true;
   //   if (menu.children) {
   //     mapTabMenusActive(menu, url);
   //   }
  //  }
 // }
  function makeActive2(menu, url) {
    const vm = this;
    // //1.取消当前tab所有active；
    // mapTabMenusUnactive(menu);
    // //2.根据当前的url设置active；
    // mapTabMenusActive(menu, url);
    // menu.active = false;
    vm.$set(menu, 'active', false);
    if (url.search(menu.path) >= 0) {
      // menu.active = true;
      vm.$set(menu, 'active', true);
    }
    if (menu.children) {
      menu.children.map(item => {
        makeActive2.call(vm, item, url)
      })
    }
    // if (url.search(menu.path) >= 0) {
    //   menu.active = true;
    //   if (menu.children) {
    //     menu.children.map(item => {
    //       makeActive2(item, url)
    //     })
    //   }
    // } else if (menu.children) {
    //   menu.map(item => {
    //     //item.active = false;
    //     makeActive2(item, url)
    //   })
    // }
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
        // makeActive(this.tab, to.path)
        makeActive2.call(this, this.tab, to.path)
      },
      menuClicked (menu) {
        publish('menu.item.clicked', {route: this.$route, name: menu.name, menu: menu})
      },
      toggleMenu (e) {
        console.log('this', this, 'event', e, arguments)
        $(e.target).parents('.has-sub').toggleClass('open')
        // menu.opened = !menu.opened
      }
    }
  }
</script>
