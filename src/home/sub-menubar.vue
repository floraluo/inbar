<template>
  <nav class="site-mantabs">
    <!--<template v-for="menu in menus">-->
      <!--<template v-for="manTabs in menu.children" v-if="!!menu.children">-->

        <!--<ul class="man-tabs" :class="{active: manTabs.active}" :key="manTabs.id" :id="`#manager-navTabsItem-${manTabs.id}`" v-if="manTabs.children">-->
            <!--<template v-for="tab in manTabs.children">-->
              <!--<li :class="{active: tab.active}" :key="tab.id">-->
                <!--<router-link :to="tab.path">{{tab.name}}</router-link>-->
              <!--</li>-->
            <!--</template>-->
        <!--</ul>-->

      <!--</template>-->
    <!--</template>-->

    <!--<ul class="man-tabs" :class="{active: menu.active}" :id="`#manager-navTabsItem-${menu.id}`" >-->
    <ul class="man-tabs active" v-show="thirdMenus">
      <template v-for="(tab, index) in thirdMenus">
        <li :class="{active: tab.active || (tab.active === undefined && index === 0)}" :key="tab.id">
          <router-link :to="tab.path">{{tab.name}}</router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
  import {subscribe} from '../core/topics'

  export default {
    name: 'sub-menubar',
    props: {
      menus: Array,
      thirdMenus: Array
    },
    data() {
      return {
        menu: {},
        tabs: []
      }
    },
    created() {
      // subscribe('router.before', this.setSubMenubar)
      // subscribe('menu.success', this.setSubMenubar)
    },
    methods: {
      // setSubMenubar() {
      //   const currentPath = this.$route.path;
      //   this.menus.some(rootMenu => {
      //     if (currentPath.search(rootMenu.path) === 0) {
      //       if (!!rootMenu.children) {
      //         rootMenu.children.some(secondMenu => {
      //           if (currentPath.search(secondMenu.path) === 0){
      //             this.menu = secondMenu;
      //             return true;
      //           }
      //         })
      //       }
      //       return true;
      //     }
      //   })
      // }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/sass/_variables.scss";
  @mixin tabs-highlight-bar{
    &:before{
      content: '';
      position: absolute;
      left: -1px;
      right: -1px;
      bottom: 0;
      height: 4px;
      background-color: $theme-color;
    }
  }
  @mixin tabs-highlight-arrow{
    &:after{
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      bottom: -7px;
      margin-left: -9px;
      border-top: 10px solid #0191fa;
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
    }
  }
  .site-mantabs{
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .man-tabs{
    /*display: none;*/
    display: flex;
    justify-content: center;
    &.active{
      display: flex;
    }
    > li{
      position: relative;
      height: 44px;
      flex: 1;
      margin-left: 2px;
      margin-right: 2px;
      max-width: 200px;
      text-align: center;
      border: 1px solid #f4f3ef;
      background-color: #f4f3ef;
      &:hover{
        @include tabs-highlight-bar;
      }
      &.active{
        border: 1px solid #d6d6d6;
        background-color: #fff;
        @include tabs-highlight-bar;
        @include tabs-highlight-arrow;
        > a{
          color: $theme-color;
        }
      }
      > a{
        display: block;
        line-height: 44px;
        font-size: 16px;
        color: $text;
        text-decoration: none;
      }
    }
  }
</style>
