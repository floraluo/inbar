<template>
  <div>
    <!--<sub-menubar v-if="manager" :menus="menus"></sub-menubar>-->
    <sub-menubar :thirdMenus="secondMenu.children" v-show="secondMenuShow"></sub-menubar>
    <div class="page-manager-content" :class="{'has-submenubar': secondMenuShow}">
      <div class="page-crumbs" v-if="crumbs.length === 3">
        <span class="highlight">{{crumbs[0].name}}&nbsp;&frasl;&nbsp;{{crumbs[1].name}}&nbsp;&frasl;</span>&nbsp;{{crumbs[2].name}}
      </div>
      <div class="page-crumbs" v-else-if="crumbs.length === 2">
        <span class="highlight">{{crumbs[0].name}}&nbsp;&frasl;</span>&nbsp;{{crumbs[1].name}}
      </div>
      <router-view/>

    </div>
  </div>
</template>

<script>
  import {subscribe} from 'pubsub-js'
  import subMenubar from '@/home/sub-menubar'
  // function recurservMenus (menu, currentPath) {
  //   if (currentPath.search(menu.path) === 0) {
  //
  //   }
  // }
  let vm, publishCrumb = null;
  function _toggleSubMenubar (toggle) {
    vm.secondMenuShow = toggle !== false ? true : toggle;
  }
  function _getSecondMenu() {
    const currentPath = vm.$route.path;
    let noCurrentPath = false;
    vm.crumbs = [];
    //添加第一个面包屑
    vm.menus.some(rootMenu => {
      if (currentPath.search(rootMenu.path) === 0) {
        if (rootMenu.children) {
          rootMenu.children.some(secondMenu => {
            if (currentPath.search(secondMenu.path) === 0) {
              vm.crumbs.push(secondMenu)
              vm.secondMenu = secondMenu;
              return true;
            }
          })
        }
        return true;
      }
    })
    //添加第二个面包屑
    if (vm.crumbs[0] && vm.crumbs[0].children) {
      vm.crumbs[0].children.map(item => {
        if (currentPath === item.path || currentPath.search(item.path) === 0) {
          vm.crumbs.push(item)
        }
      })
    }
    //添加第三个面包屑
    if (vm.crumbs[vm.crumbs.length - 1].hasOwnProperty('id') && publishCrumb) {
      vm.crumbs.push(publishCrumb);
      publishCrumb = null;
    }
  }
  function routerBefore () {
    _getSecondMenu();
    _toggleSubMenubar();
  }
  function menuSuccess () {
    _getSecondMenu();
  }
  function crumbPush (msg, params) {
    publishCrumb = params.crumb;
    if (vm.crumbs.length > 0 && vm.crumbs[vm.crumbs.length - 1].hasOwnProperty('id')) {
      vm.crumbs.push(publishCrumb);
      publishCrumb = null;
    }
    _toggleSubMenubar(params.toggleMenubar);
  }
  export default {
    name: 'manage',
    props: {
      menus: Array
    },
    components: {subMenubar},
    data() {
      return {
        secondMenuShow: true,
        secondMenu: {},
        crumbs: []
      }
    },
    created() {
      vm = this;
      subscribe('router.before', routerBefore)
      subscribe('menu.success', menuSuccess)
      //详情页、新增xx页等 手动添加面包屑
      subscribe('crumb.push', crumbPush)
    }
  }
</script>

<style scoped lang="scss">
  @import "../sass/variables";
  $subMenubarHeight: 84px;
  .page-manager-content{
    /*position: absolute;*/
    position: relative;
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
    width: calc(100% - 40px);
    /*min-height: calc(100% - 84px - 10px);*/
    min-height: calc(100vh - #{$subMenubarHeight} - #{$footer-height} - #{$nav-height} - 10px);
    &.has-submenubar{
      border: 1px solid $border-color;
      border-bottom: 0;
    }
    .page-main{
      margin-top: 0;
      padding-top: 70px;
    }
  }

  .page-crumbs{
    position: absolute;
    left: 20px;
    top: 20px;
    padding-left: 10px;
    font-size: 15px;
    &:before{
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 2px;
      width: 4px;
      height: 20px;
      background-color: $theme-color;
    }
    .highlight{
      color: $theme-color;
    }
  }

</style>
