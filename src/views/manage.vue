<template>
  <div>
    <!--<sub-menubar v-if="manager" :menus="menus"></sub-menubar>-->
    <sub-menubar :menus="menus" :thirdMenus="secondMenu.children"></sub-menubar>
    <div class="page-manager-content">
      <div class="page-crumbs" v-if="crumbs.length === 3 && crumbs[0]">
        <span class="highlight">{{crumbs[0].name}}&nbsp;&frasl;&nbsp;{{crumbs[1].name}}</span>&nbsp;{{crumbs[2].name}}
      </div>
      <div class="page-crumbs" v-else-if="crumbs[0]">
        <span class="highlight">{{crumbs[0].name}}&nbsp;&frasl;</span>&nbsp;{{crumbs[1].name}}
      </div>
      <router-view/>

    </div>
  </div>
</template>

<script>
  import {subscribe} from '../core/topics'
  import subMenubar from '@/home/sub-menubar'
  // function recurservMenus (menu, currentPath) {
  //   if (currentPath.search(menu.path) === 0) {
  //
  //   }
  // }
  let vm;
  export default {
    name: 'manage',
    props: {
      menus: Array
    },
    components: {subMenubar},
    data() {
      return {
        secondMenu: {},
        crumbs: []
      }
    },
    methods: {
      getSecondMenu() {
        const currentPath = this.$route.path;
        vm.crumbs = [];
        this.menus.some(rootMenu => {
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
        if (vm.crumbs[0] && vm.crumbs[0].children) {
          vm.crumbs[0].children.map(item => {
            if (currentPath === item.path || currentPath.search(item.path) === 0) {
              vm.crumbs.push(item)
            }
          })
        }
      },
      pushCrumb(msg, crumb) {
        vm.crumbs.push(crumb)
      }
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
    },
    created() {
      vm = this;
      subscribe('router.before', this.getSecondMenu)
      subscribe('menu.success', this.getSecondMenu)
      //详情页、新增xx页等 手动添加面包屑
      subscribe('crumb.push', this.pushCrumb)
    },
    mounted() {
      // console.log('+++++', this.$route, this.menus)
    }
  }
</script>

<style scoped lang="scss">
  @import "../sass/variables";
  .page-manager-content{
    position: absolute;
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
    border: 1px solid $border-color;
    border-bottom: 0;
    width: calc(100% - 40px);
    min-height: calc(100% - 84px - 10px);
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
