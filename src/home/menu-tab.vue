<template>
  <div :class="['tab-pane animation-fade height-full',{'active':tab.active}]" :id="`admui-navTabsItem-${this.tab.id}`" role="tabpanel">

      <ul class="site-menu">
          <template v-for="submenu in tab.children">
            <li :key="submenu.id" @click="menuClicked(submenu)" class="site-menu-item"
                :class="{'active': submenu.active}">
              <router-link :to="submenu.path"
                           :data-href="`#manager-navTabsItem-${submenu.id}`">
                <i :class="['site-menu-icon iconfont', submenu.icon]" aria-hidden="true"></i><span class="site-menu-title">{{submenu.name}}</span>
              </router-link>
            </li>
          </template>
      </ul>

  </div>
</template>

<script>
  import $ from 'jquery'
  import { publish, subscribe } from 'pubsub-js'

  function makeActive(menu, url) {
    const vm = this;
    vm.$set(menu, 'active', false);
    if (url.search(menu.path) === 0) {
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
        makeActive.call(this, this.tab, to.path)
      },
      menuClicked (menu) {
        const tab = !menu.children ? {route: this.$route, name: menu.name, menu: menu} : {route: this.$route, name: menu.children[0].name, menu: menu.children[0]}
        publish('menu.item.clicked', tab)
      },
      toggleMenu (e) {
        console.log('this', this, 'event', e, arguments)
        $(e.target).parents('.has-sub').toggleClass('open')
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
  .site-manager{
    .site-menu{
      .site-menu-item > a,
      .site-menu-item:hover > a,
      .site-menu-item.active > a,
      .site-menu-item.active:hover > a{
        color: #666;
        background-color: transparent;
      }
      .site-menu-item{
        position: relative;
        height: 54px;
        &.active, &:hover{
          background-color: #e6e6e6;
        }
        &.active:before{
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
          background-color: $theme-color;
        }
      }
    }
  }
  @media (min-width: 768px){
    .site-menubar-fold .site-menu{
      a:hover {
        .site-menu-icon{
          visibility: hidden;
          opacity: 0;
        }
        .site-menu-title{
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
</style>
