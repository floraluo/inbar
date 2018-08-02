<template>
  <div :class="['tab-pane animation-fade height-full',{'active':tab.active}]" :id="`admui-navTabsItem-${this.tab.id}`" role="tabpanel">

      <ul class="site-menu">
        <!--<template v-for="menu in tab">-->
          <!-- 二级菜单 -->
          <!--<li :key="tab.id" class="site-menu-category">{{ tab.name }}</li>-->
          <!-- 三级菜单 -->
          <template v-for="submenu in tab.children">
            <li :key="submenu.id" @click="menuClicked(submenu)" class="site-menu-item" :class="{'active': submenu.path === $route.path}">
              <router-link :to="!submenu.children ? submenu.path : submenu.children[0].path">
                <i :class="['site-menu-icon', submenu.icon]" aria-hidden="true"></i><span class="site-menu-title">{{submenu.name}}</span>
              </router-link>
              <ul class="site-menu-sub">
                <!-- 四级菜单 -->
                <li v-for="menu4 in submenu.children"
                    :key="menu4.id"
                    @click="menuClicked(menu4)"
                    class="site-menu-item" :class="{'active': submenu.active}">
                  <router-link :to="menu4.path">
                    <span class="site-menu-title">{{ menu4.name }}</span>
                  </router-link>
                </li>
                <!-- 四级菜单 -->
              </ul>
            </li>
            <!--<li v-if="!!submenu.children"-->
                <!--:key="submenu.id"-->
                <!--:class="['site-menu-item', 'has-sub', {'open active': submenu.active}]">-->
              <!--<a href="javascript:;">-->
                <!--<i :class="['site-menu-icon', submenu.icon]" aria-hidden="true"></i>-->
                <!--<span class="site-menu-title">{{ submenu.name }}</span>-->
                <!--<span class="site-menu-arrow"></span>-->
              <!--</a>-->
              <!--<ul class="site-menu-sub">-->
                <!--&lt;!&ndash; 四级菜单 &ndash;&gt;-->
                <!--<li v-for="menu4 in submenu.children"-->
                    <!--:key="menu4.id"-->
                    <!--@click="menuClicked(menu4)"-->
                    <!--class="site-menu-item" :class="{'active': submenu.active}">-->
                  <!--<router-link :to="menu4.path">-->
                    <!--<span class="site-menu-title">{{ menu4.name }}</span>-->
                  <!--</router-link>-->
                <!--</li>-->
                <!--&lt;!&ndash; 四级菜单 &ndash;&gt;-->
              <!--</ul>-->
            <!--</li>-->

            <!--<li v-else :key="submenu.id" @click="menuClicked(submenu)" class="site-menu-item" :class="{'active': submenu.path === $route.path}" >-->
              <!--<router-link :to="submenu.path">-->
                <!--<i :class="['site-menu-icon', submenu.icon]" aria-hidden="true"></i><span class="site-menu-title">{{submenu.name}}</span>-->
              <!--</router-link>-->
            <!--</li>-->
          </template>
        <!--</template>-->
      </ul>

  </div>
</template>

<script>
  import $ from 'jquery'
  // import { publish, subscribe } from '../core/topics'
  import { publish, subscribe } from 'pubsub-js'

  function makeActive(menu, url) {
    const vm = this;
    vm.$set(menu, 'active', false);
    if (url.search(menu.path) >= 0) {
      vm.$set(menu, 'active', true);
    }
    if (menu.children) {
      menu.children.map(item => {
        makeActive.call(vm, item, url)
      })
    }
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
      menuChanged (msg, to) {
        console.log("menuChanged", to)
        // makeActive(this.tab, to.path)
        makeActive.call(this, this.tab, to.path)
      },
      menuClicked (menu) {
        const tab = !menu.children ? {route: this.$route, name: menu.name, menu: menu} : {route: this.$route, name: menu.children[0].name, menu: menu.children[0]}
        publish('menu.item.clicked', tab)
      },
      toggleMenu (e) {
        console.log('this', this, 'event', e, arguments)
        $(e.target).parents('.has-sub').toggleClass('open')
        // menu.opened = !menu.opened
      }
    }
  }
</script>

<style lang="scss">
  @import "@/sass/_variables.scss";
  .tab-pane{
    padding-top: 15px;
  }
  .site-menubar ul.site-menu{

  }
  .site-menubar-unfold .site-menu-item{
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s;
    &:hover > a,&.active > a,
    &.active:hover > a{
      color: #fff;
      background-color: $theme-color;
    }
    > a{
      width: 80%;
      height: 42px;
      display: flex;
      align-items: center;
      border-radius: 42px;
      font-size: 16px;
      transition: all .2s;
      color: #666;
      background-color: #f0f3fc;
      > .site-menu-icon {
        font-size: 18px;
      }
    }
  }
</style>
