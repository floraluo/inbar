<template>
<div id="home" :class="{'site-manager': manager}">
  <navbar key="navbar" :menus="menus" :manager="manager"></navbar>
  <menubar key="menubar" :menus="menus" :manager="manager"></menubar>
  <tabs key="tabs" v-show="!manager"></tabs>
  <main class="site-page" :class="{'manager': manager}">
    <div class="page-container" @click="toggleBars" id="admui-pageContent">
      <div  class=" animation-fade active">
        <!--<sub-menubar v-if="manager" :menus="menus"></sub-menubar>-->
        <!--<transition name="fade" mode="out-in" appear-->
                    <!--enter-class="animation-fade animation-duration-9 animation-reverse"-->
                    <!--leave-class="animation-fade animation-duration-9"-->
        <!--&gt;-->
          <keep-alive>
            <router-view :menus="menus"/>
          </keep-alive>
        <!--</transition>-->
      </div>
    </div>
    <div class="page-loading vertical-align text-center">
      <div class="page-loader loader-default loader vertical-align-middle" data-type="default"></div>
    </div>
  </main>
  <footer class="site-footer">
    <div class="site-footer-legal">{{ product.company }} &copy;
      <a :href="product.homepage" target="_blank">{{ product.domain }}</a>
    </div>
    <div class="site-footer-right">
      当前版本：v{{ product.version }}
      <a class="margin-left-5" data-toggle="tooltip" title="升级" :href="product.homepage" target="_blank">
        <i class="icon fa-cloud-upload"></i>
      </a>
    </div>
  </footer>
</div>
</template>

<script>
  import '@/sass/base.scss'
  import $ from 'jquery'
  import '../globals'
  import 'bootstrap'
  import Breakpoints from 'breakpoints-js'
  import 'webui-popover'
  import 'jquery-asHoverScroll'

  import '../../static/vendor/artTemplate/template.min.js'
  import '../../static/vendor/layer/layer.min.js'
  import '../../static/vendor/screenfull/screenfull.min.js'
  import '../../static/admui/core'
  import '../../static/admui/configs/site-configs'

  import '../../static/admui/components/slimscroll'
  import '../../static/admui/plugins/responsive-tabs'
  // import '../../static/themes/classic/global/js/core'
  import {publish} from 'pubsub-js'
  import { GET } from '@/core/http'
  import store from '@/core/store'
  import { components } from "@/core";
  import navbar from './navbar'
  import menubar from './menubar'
  import tabs from './tabs'
  import subMenubar from './sub-menubar'
  import pkg from '../../package.json'
  import {localDictionary, extendFields} from '@/views/script/custom.valid'

  let vm;
  function recursiveMenu (newMenus, menu) {
  newMenus.some(m => {
    if (menu.parentId === m.id) {
      if (!m['children']) m['children'] = [];
      m.children.push(menu);
      return true;
    } else if (menu.path.search(m.path) === 0) {
      if (!m['children']) {
        m['children'] = [];
        m.children.push(menu);
      } else {
        recursiveMenu(m.children, menu);
      }
      return true;
    }
  })
}
  function recursiveMap (mes) {
    // const vm = this;
    mes.forEach(m => {
      // let active = m.path === vm.$route.path;
      if (vm.manager) {
        // if (m.type === 0) {
          let active = vm.$route.path.search(m.path) === 0;
          let item = $.extend(m, {active: active});
          if (item.parentId === 0) {
            vm.menus.push(item);
          } else {
            recursiveMenu(vm.menus, item);
          }
        // }
      } else {
        if (m.type === 1) {
          let active = vm.$route.path.search(m.path) === 0;
          let item = $.extend(m, {active: active});
          if (item.parentId === 0) {
            vm.menus.push(item);
          } else {
            recursiveMenu(vm.menus, item);
          }
        }
      }
    });
  }
  const aa = [
    {id:8, name:"充值", path:"/recharge", parent: 0},
    {id:2, name:"系统管理", path:"/system", parent: 0,active:true,children:[
        {id:2000, name:"系统信息", path:"/system/info"},
        {id:2001, name:"菜单管理", path:"/system/menu"},
        {id:2002, name:"用户管理", path:"/system/user"},
        {id:2003, name:"日志信息", path:"/system/log"},
        {id:2004, name:"系统设置", path:"/system/settings",children:[
            {id:2005, name:"显示设置", path:"/system/settings/ui", parent:"/system/settings"},
            {id:2009, name:"显示设置22", path:"/system/settings/ui2", parent:"/system/settings"}
          ]}]},
    {id:3, name:"我的账户", path:"/account", parent: 0,children:[
        {id:3001, name:"我的账户", path:"/account/me", parent:"/account"}]},
    {id:4, name:"网吧管理", path:"/inbar", parent: 0,ordinal:1, children: [
        {id: 4002, name: '网吧设置', path: '/inbar/setting', active:true, children: [
            {id: 4020, name: '基本信息', path: '/inbar/setting/info'},
            {id: 4021, name: '收银台设置', path: '/inbar/setting/cashier'},
            {id: 4022, name: '区域设置', path: '/inbar/setting/area', children: [
                {id: 4120, name: '区域设置', path: '/inbar/setting/area'},
                {id: 4121, name: '电脑设置', path: '/inbar/setting/area/computer'}
              ]},
            {id: 4023, name: '会员等级', path: '/inbar/setting/level'},
            {id: 4024, name: '积分设置', path: '/inbar/setting/coins'},
          ]},
        {id: 4003, name: '会员管理', path: '/inbar/member-manage', children: [
            {id: 4031, name: '会员数据', path: '/inbar/member-manage/data'},
            {id: 4032, name: '会员设置', path: '/inbar/member-manage/set'}
          ]},
        {id: 4004, name: '充值套餐管理', path: '/inbar/packages', children: [
            {id: 4041, name: '套餐管理', path: '/inbar/packages/manage-package'},
            {id: 4042, name: '优惠券管理', path: ''}
          ]},
        {id: 4005, name: '网吧服务', path: '/inbar/service', children: [
            {id: 4051, name: '网吧公告', path: '/inbar/service/announcement'},
            {id: 4052, name: '网吧活动', path: '/inbar/service/add'},

          ]},
        {id: 4001, name: '员工管理', path: '/inbar/manage', parent: "/inbar", icon: "", children: [
            {id: 4011, name: '员工权限管理', path: '/inbar/manage/staff', parent: "/inbar/manage", icon: ""},
            {id: 4012, name: '维护金管理', path: '/inbar/manage/maintain', parent: "/inbar/manage", icon: ""}
          ]}
      ]},
    // {id:5, name:"会员管理", path:"/member", parent: 0,ordinal:2,children:[
    //     {id:2010, name:"账户设置", path:"/member/base-info", parent:"/member"},
    //     {id:2011, name:"密码修改", path:"/member/modify-pwd", parent:"/member"}
    //   ]},
    {id:6, name:"经营管理", path:"/operation", parent: 0},
    {id:7, name:"进销存管理", path:"/goods", parent: 0},
    {id:8, name:"交班管理", path:"/next", parent: 0},
    {id:9, name:"店长工具", path:"/keeper", parent: 0}]

  const bb = [
    {id:8, name:"充值", path:"/recharge", parentId: 0},
    {id:3, name:"我的账户", path:"/account", parentId: 0},
    {id:2, name:"系统管理", path:"/system", parentId: 0},
    {id:4, name:"网吧管理", path:"/inbar", parentId: 0},
    {id:6, name:"经营管理", path:"/operation", parentId: 0},
    {id:7, name:"进销存管理", path:"/goods", parentId: 0},
    {id:8, name:"交班管理", path:"/next", parentId: 0},
    {id:9, name:"店长工具", path:"/keeper", parentId: 0},
    {id:2000, name:"系统信息", path:"/system/info", parentId: 2},
    {id:2001, name:"菜单管理", path:"/system/menu", parentId: 2},
    {id:2002, name:"用户管理", path:"/system/user", parentId: 2},
    {id:2003, name:"日志信息", path:"/system/log", parentId: 2},
    {id:2004, name:"系统设置", path:"/system/settings", parentId: 2},
    {id:2005, name:"显示设置", path:"/system/settings/ui", parentId: 2004},
    {id:2009, name:"显示设置22", path:"/system/settings/ui2", parentId: 2004},
    {id:3001, name:"我的账户", path:"/account/me", parentId: 3},
    {id: 4002, name: '网吧设置', path: '/inbar/setting', parentId: 4},
    {id: 4003, name: '会员管理', path: '/inbar/member-manage', parentId: 4},
    {id: 4004, name: '充值套餐管理', path: '/inbar/packages', parentId: 4},
    {id: 4005, name: '网吧服务', path: '/inbar/service',parentId: 4},
    {id: 4001, name: '员工管理', path: '/inbar/staff-manage', parentId: 4},
    {id: 4020, name: '基本信息', path: '/inbar/setting/info', parentId: 4002},
    {id: 4021, name: '收银台设置', path: '/inbar/setting/cashier', parentId: 4002},
    {id: 4022, name: '区域设置', path: '/inbar/setting/area', parentId: 4002},
    {id: 4023, name: '会员等级', path: '/inbar/setting/level', parentId: 4002},
    {id: 4024, name: '积分设置', path: '/inbar/setting/coins', parentId: 4002},
    {id: 4120, name: '区域设置', path: '/inbar/setting/area', parentId: 4021},
    {id: 4121, name: '电脑设置', path: '/inbar/setting/area/computer', parentId: 4021},
    {id: 4031, name: '会员数据', path: '/inbar/member-manage/data', parentId: 4003},
    {id: 4032, name: '会员设置', path: '/inbar/member-manage/set', parentId: 4003},
    {id: 4041, name: '套餐管理', path: '/inbar/packages/manage-package',parentId: 4004},
    {id: 4042, name: '优惠券管理', path: '',parentId: 4004},
    {id: 4051, name: '网吧公告', path: '/inbar/service/announcement',parentId: 4005},
    {id: 4052, name: '网吧活动', path: '/inbar/service/add',parentId: 4005},

    {id: 4011, name: '员工权限管理', path: '/inbar/staff-manage/staff', parentId: 4001},
    {id: 4012, name: '维护金管理', path: '/inbar/staff-manage/maintain', parentId: 4001}
    // {id:5, name:"会员管理", path:"/member", parentId: 0,ordinal:2,children:[
    //     {id:2010, name:"账户设置", path:"/member/base-info", parentId:"/member"},
    //     {id:2011, name:"密码修改", path:"/member/modify-pwd", parentId:"/member"}
    //   ]},
  ]
  function initVeeValidate(dictionary, fields) {
    const keys = Object.keys(fields);
    vm.$validator.localize('zh_CN', dictionary);
    keys.forEach(key => {
      vm.$validator.extend(key, fields[key])
    })
  }
export default {
  name: 'home',
  components: components(navbar, menubar, tabs, subMenubar, localDictionary, extendFields),
  children: { tabs: 'tabs', menubar: 'menubar', navbar: 'navbar' },
  data () {
    return {
      manager: false,
      menus: [],
      menusResult: [],
      product: $.extend({}, pkg.product, {version: pkg.version})
    }
  },
  created () {
    vm = this;
    this.manager = store.get('token').user_basic.username === 'storekeeper' || store.get('token').user_basic.username === 'aaa';
    initVeeValidate(localDictionary, extendFields)

//    const path = this.$route.path
//     this.$router.replace('/')
//    this.$router.push(path)
//    if (this.$router.history.current.path !== '/') {
      // this.tabInstance.addTab({route: this.$router.history.current, name: 'xx'})
      // this.$data.tabsTitle.push({route: this.$router.history.current, name: 'xx'})
//    }

    // const vm = this;
    GET('/api/me/menu/')
      .done(function (data) {
        recursiveMap.call(vm, data)
        // recursiveMap.call(vm, bb)

        publish('menu.success')
        console.log('menus-----++++++-', vm.menus, data)
      }).fail(function () {
      console.log("Can't load menus", arguments)
    })
  },
  mounted () {
    // const vm = this;
    // 对下拉列表的其他功能
    $(document).on('show.bs.dropdown', function (e) {
      var $target = $(e.target), $menu,
        $trigger = e.relatedTarget ? $(e.relatedTarget) : $target.children('[data-toggle="dropdown"]'),
        animation = $trigger.data('animation');

      if (animation) {
        $menu = $target.children('.dropdown-menu');

        $menu.addClass('animation-' + animation);

        $menu.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          $menu.removeClass('animation-' + animation);
        });
      }
    });
    $('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
    $('[data-toggle="popover"]').popover();

    $(document).ajaxComplete((event, xhr, options) => {
      if (xhr.status === 401) {
        vm.$router.push("/login")
      }
    })

    //  侧边栏开关
    $(document).on('click', '.j-page-aside-switch', function (e) {
      // self.pageAside();
      const pageAside = $(".page-aside"),
        isOpen = pageAside.hasClass('open');

      pageAside.toggleClass('open', !isOpen);
      e.stopPropagation();
    });
  },
  methods: {
    toggleBars () {
      // 小屏下收起顶部导航条和左侧菜单
      if (Breakpoints.is('xs') && $('body').hasClass('site-menubar-open')) {
        this.menubar.hide();
        this.navbar.hide()
      }
      // 核心框架中下拉菜单切换操作
      $('[data-toggle="dropdown"]').parent().removeClass('open');
    }

    }
  }
</script>

<style scoped>
  .page-manager-content{
    /*padding-top: 55px;*/
  }
  .site-manager .site-page{
    margin-top: 0;
  }

</style>
<style lang="scss">
  @import "@/sass/_variables.scss";
  @import "@/sass/_mixin.scss";
  @import "@/sass/_multiselect.scss";

  html, body, #home{
    height: 100%;
  }
  #app{
    height: calc(100% - #{$tab-height});
  }
  body{
    overflow-x: visible;
    padding-top: $nav-height;
  }
  .site-navbar .navbar-toolbar.navbar-left{
    width: calc(100% - #{$nav-tool-width});
  }
  .site-menubar,
  .site-contabs-open .site-contabs,
  .site-menubar-unfold .site-menubar{
    top: $nav-height
  }
  .site-contabs-open .site-page{
    margin-top: $tab-height;
    height: auto;
    min-height: calc(100% - #{$footer-height});
    &.manager{
      min-height: 100%;
    }
  }
  .site-contabs-open .site-contabs .contabs-scroll,
  .site-contabs-open .site-contabs,
  .site-contabs-open .site-contabs .contabs-scroll .con-tabs > li.active > a{
    //height: $tab-height;
  }
  .page-content{
    padding: 20px 20px 0;
    background-color: $content-bgc;
  }
  .no-data{
    @include no-data;
  }

  /*layer弹窗样式*/
  .layui-layer-title{
    background-color: #edf6ff;
    font-size: 16px;
    color: #666;
  }

  .v-table-popover-content{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
