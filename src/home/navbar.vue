<template>
  <nav class="site-navbar navbar navbar-default navbar-fixed-top navbar-inverse" role="navigation">
    <div class="navbar-header">
      <button @click="menubarToggled" type="button" class="navbar-toggle navbar-toggle-manager"
              v-if="manager"
              data-toggle="menubar">
        <i class="icon hamburger hamburger-arrow-left">
          <span class="sr-only">切换目录（店长身份登录使用）</span>
          <span class="hamburger-bar"></span>
        </i>
      </button>
      <button @click="menubarToggled" type="button" class="navbar-toggle hamburger hamburger-close navbar-toggle-left hided" data-toggle="menubar">
        <span class="sr-only">切换菜单（小屏使用）</span> <span class="hamburger-bar"></span>
      </button>
      <button type="button" class="navbar-toggle collapsed" data-target="#admui-navbarCollapse" data-toggle="collapse">
        <i class="icon wb-more-horizontal" aria-hidden="true"></i>
        <span class="sr-only">折叠导航条（小屏使用）</span>
      </button>
      <div class="navbar-brand navbar-brand-center site-gridmenu-toggle" data-toggle="gridmenu">
        <!--<img class="navbar-brand-logo visible-lg visible-xs navbar-logo" src="../../static/images/logo-white.svg" title="Admui">-->
        <!--<img class="navbar-brand-logo hidden-xs hidden-lg navbar-logo-mini" src="../../static/images/logo-white-min.svg" title="Admui">-->
        <img class="navbar-brand-logo " src="../../static/images/logo-white-min.svg" title="Admui">

        <!--<div>臻合网吧</div>-->
        <ul class="navbar-brand-name">
          <li class="name">臻合网吧</li>
          <li class="dropdown">
            <a href="javascript:;" id="dropdownBarName"  data-toggle="dropdown" data-animation="slide-bottom"><i class="iconfont icon-xuanzezhanghu"></i></a>
            <ul class="dropdown-menu" aria-labelledby="dropdownBarName" role="menu">
              <li><a href="javascript:;">网吧1</a></li>
              <li><a href="javascript:;">英雄联盟网吧2</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar-container container-fluid">
      <div class="collapse navbar-collapse navbar-collapse-toolbar" id="admui-navbarCollapse">
        <ul class="nav navbar-toolbar navbar-left">
          <!--<li class="hidden-float" v-show="this.$route.meta.menubar">-->
            <!--<a @click="menubarToggled" data-toggle="menubar" class="hidden-float" href="javascript:;" role="button" id="admui-toggleMenubar">-->
              <!--<i class="icon hamburger hamburger-arrow-left">-->
                <!--<span class="sr-only">切换目录</span>-->
                <!--<span class="hamburger-bar"></span>-->
              <!--</i>-->
            <!--</a>-->
          <!--</li>-->
          <li class="navbar-menu nav-tabs-horizontal nav-tabs-animate" id="admui-navbar">
            <ul class="nav navbar-toolbar nav-tabs" role="tablist">
              <!-- 顶部菜单 -->
              <!--<template v-for="(menu,index) in menus">-->
              <li v-for="(menu,index) in menus" :key="index"  :class="{highlight: $route.path.search(menu.path) === 0}" role="presentation"  @click="navClicked(menu, $event)">
                  <router-link :to="menu.path" :data-href="`#admui-navTabsItem-${menu.id}`">
                    <!--{{ $route.path}}-->
                    <i :class="['icon', menu.icon]"></i> <span>{{menu.name}}</span>
                    <!--{{menu.path}}-->
                  </router-link>
                </li>
              <!--</template>-->

              <!--<a v-else :data-nav="menu.id" data-toggle="tab" @click.prevent="switchTab(menu)" :href="menu.children?`#admui-navTabsItem-${menu.id}`:menu.path" :aria-controls="`#admui-navTabsItem-${menu.id}`" role="tab" aria-expanded="false">-->
              <!--<i :class="['icon', menu.icon]"></i> <span>{{menu.name}}</span>-->
              <!--</a>-->
              <li class="dropdown" id="admui-navbarSubMenu">
                <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:;" data-animation="slide-bottom" aria-expanded="true" role="button">
                  <i class="icon wb-more-vertical"></i>
                </a>
                <ul class="dropdown-menu" role="menu">

                  <li class="no-menu" role="presentation">
                    <a href="#" role="menuitem">
                      <i class="icon wb-list-numbered"></i><span>网站地图</span>
                    </a>
                  </li>
                  <li class="no-menu" role="presentation">
                    <a href="#" role="menuitem">
                      <i class="icon wb-wrench"></i><span>菜单管理</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-toolbar navbar-right navbar-toolbar-right">
          <li class="dropdown" id="admui-navbarMessage">
            <a data-toggle="dropdown" href="javascript:;" class="msg-btn" aria-expanded="false" data-animation="scale-up" role="button">
              <i class="icon wb-bell" aria-hidden="true"></i>
              <span class="badge badge-danger up msg-num"></span>
            </a>
            <ul class="dropdown-menu dropdown-menu-right dropdown-menu-media" role="menu">
              <li class="dropdown-menu-header" role="presentation">
                <h5>最新消息</h5>
                <span class="label label-round label-danger"></span>
              </li>
              <li class="list-group" role="presentation">
                <div class="navbar-message-content" id="admui-messageContent" data-height="220px" data-plugin="slimScroll"></div>
                <!--
                  <script type="text/html" id="admui-messageTpl">
                      {{if msgList.length < 1}}
                      <p class="text-center height-200 vertical-align">
                          <small class="vertical-align-middle opacity-four">没有新消息</small>
                      </p>
                      {{else}}
                      {{each msgList}}
                      <a class="list-group-item" href="#"  data-message-id="{{$value.messageId}}" data-title="{{$value.title}}" data-content="{{$value.content}}" role="menuitem">
                          <div class="media">
                              <div class="media-left padding-right-10">
                                  <i class="icon {{$value.type | iconType}} white icon-circle" aria-hidden="true"></i>
                              </div>
                              <div class="media-body">
                                  <h6 class="media-heading">{{$value.title}}</h6>
                                  <time class="media-meta" datetime="{{$value.sendTime}}">
                                      {{$value.sendTime | timeMsg}}
                                  </time>
                              </div>
                          </div>
                      </a>{{/each}}
                      {{/if}}
                  </script>
                  -->
              </li>
              <li class="dropdown-menu-footer" role="presentation">
                <a href="/system/account#message" data-iframe target="_blank">
                  <i class="icon fa-navicon"></i> 所有消息
                </a>
              </li>
            </ul>
          </li>
          <li class="hidden-xs" id="admui-navbarDisplay" data-toggle="tooltip" data-placement="bottom" title="设置主题与布局等">
            <router-link to="/system/settings/ui"  class="icon wb-layout" @click="navClicked({name: '主题与布局', path: '/system/settings/ui'})">
              <span class="sr-only">主题与布局</span>
            </router-link>
          </li>
          <li class="hidden-xs" id="admui-navbarFullscreen" data-toggle="tooltip" data-placement="bottom" title="全屏">
            <a class="icon icon-fullscreen" data-toggle="fullscreen" href="#" role="button">
              <span class="sr-only">全屏</span>
            </a>
          </li>
          <li>
            <a class="icon fa-sign-out" id="admui-signOut" @click.prevent="logout" data-ctx="" data-user="1" href="#" role="button">
              <span class="sr-only">退出</span>
            </a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import $ from 'jquery'
  import store from '../core/store'
  import Breakpoints from 'breakpoints-js'
  import { publish } from 'pubsub-js'
  import screenfull from '../../static/vendor/screenfull/screenfull'
  export default {
    name: 'navbar',
    props: {
      manager: Boolean,
      menus: Array
    },
    data () {
      return {
        // menus: []
      }
    },
    watch: {
      menus (n, o) {
        console.log('navbar menus changed: ', n, 'old', o)
        // this.menuReady(!!n)
      }
    },
    // ready: {
    //   menuReady: 'menus'
    // },
    dom: {
      tabHandler: '[data-toggle="tab"]'
    },
    created () {
      const vm = this;
      // const me = this
      // this.menuReady = new Promise((resolve, reject) => {
      //   me.menuResove = resolve
      // })
      // this.mountReady = new Promise((resolve, reject) => {
      //   me.mountResove = resolve
      // })
      // this.ready = Promise.all([this.menuReady, this.mountReady])
      //   .then(this.uiReady)
    },
    mounted () {
      console.log('mounted')
      this.tabHandler.on('show.bs.tab', e => {
        console.log('show', e)
      })

      this.tabHandler.on('hide.bs.tab', e => {
        console.log('hide', e)
      })
      // this.mountReady(true)
      // 图标对应菜单展开
      $('#admui-navbar >.nav-tabs >li:not(.no-menu)').on('click', function (e) {
        if ($(e.target).closest('li').is('.dropdown')) {
          return
        }

        if (Breakpoints.is('xs')) {
          $.site.menubar.open()
        }
      })

      $(document).on('click', '[data-toggle="fullscreen"]', function () {
        if (screenfull.enabled) {
          screenfull.toggle()
        }

        return false;
      })

      if (screenfull.enabled) {
        document.addEventListener(screenfull.raw.fullscreenchange, function () {
          $('[data-toggle="fullscreen"]').toggleClass('active', screenfull.isFullscreen);
        })
      }

      $(document).on('click', '[data-toggle="collapse"]', function (e) {
        var $trigger = $(e.target),
          href, target, $target;

        if (!$trigger.is('[data-toggle="collapse"]')) {
          $trigger = $trigger.parents('[data-toggle="collapse"]');
        }

        target = $trigger.attr('data-target') || ((href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''));
        $target = $(target);

        if ($target.hasClass('navbar-search-overlap')) {
          $target.find('input').focus();

          e.preventDefault();
        } else if ($target.attr('id') === 'admui-navbarCollapse') {
          var isOpen = !$trigger.hasClass('collapsed'),
            $body = $(document.body);

          $body.addClass('site-navbar-collapsing');
          $body.toggleClass('site-navbar-collapse-show', isOpen);

          $('#admui-navbar').responsiveHorizontalTabs({
            tabParentSelector: '#admui-navTabs',
            fnCallback: function (el) {
              el.removeClass('is-load');
            }
          });

          setTimeout(function () {
            $body.removeClass('site-navbar-collapsing');
          }, 350);
        }
      })
    },
    updated() {
      $('#admui-navbar').responsiveHorizontalTabs({
        tabParentSelector: '#admui-navTabs',
        fnCallback: function (el) {
          if ($('#admui-navbar').is(':visible')) {
            el.removeClass('is-load');
          }
        }
      })
    },
    methods: {
      logout() {
        store.token.clear()
        this.$router.push('/login')
      },
      navClicked(menu, e) {
        let item = menu;
        if (menu.children) {
          item = menu.children[0];
        }
        publish('menu.item.clicked', {route: this.$route, name: item.name, menu: item})
        $('#admui-navbar li.highlight').removeClass('highlight');
        $(e.target).closest('li').addClass('highlight');
      },
      switchTab (menu) {
        this.menus.forEach(m => {
          m.active = m === menu
        })
      },
      menubarToggled () {
        publish('menubar.toggle.do', this)
      },
      hide () { // 隐藏导航条
        var $body = $('body');

        $body.addClass('site-navbar-collapsing');
        $('#admui-navbarCollapse').collapse('hide');

        setTimeout(function () {
          $body.removeClass('site-navbar-collapsing');
        }, 10);

        $body.removeClass('site-navbar-collapse-show');
      },
      menuReady () {
        // 导航条响应式
        $('#admui-navbar').responsiveHorizontalTabs({
          tabParentSelector: '#admui-navTabs',
          fnCallback: function (el) {
            if ($('#admui-navbar').is(':visible')) {
              el.removeClass('is-load');
            }
          }
        })
        // $.site.menubar.init()
        // 小屏下收起顶部导航条和左侧菜单
        if (Breakpoints.is('xs') && $('body').hasClass('site-menubar-open')) {
          publish('menubar.hide.do', this)
          this.hide();
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "@/sass/_variables.scss";

  @media (min-width: 768px){
    .site-menubar-unfold .site-navbar .navbar-header,
    .site-menubar-fold .site-navbar .navbar-header{
      width: $side-width-lg;
    }
    .site-menubar-unfold .site-navbar .navbar-container,
    .site-navbar .navbar-container,
    .site-menubar-fold .site-navbar .navbar-container{
      margin-left: $side-width-lg;
    }
    .site-menubar-fold .site-navbar .navbar-brand{
      float: left;
    }
    .site-manager{
      .site-navbar .navbar-header{
        width: $nav-brand-width-manager;
      }
      .site-menubar-unfold .site-navbar .navbar-container,
      .site-navbar .navbar-container,
      .site-menubar-fold .site-navbar .navbar-container{
        margin-left: $nav-brand-width-manager;
      }
      .navbar-brand .navbar-brand-name{
        width: $nav-brand-width-manager;
        padding-left: 120px;
      }
      .navbar-toggle-manager{
        display: block;
        position: absolute;
        z-index: 10;
        left: 70px;
        height: $nav-height;
      }
      .site-navbar .nav-tabs{
        display: flex;
        justify-content: center;
        width: 100%;
        > li > a .icon{
          display: none;
        }
      }
    }

  }
  .navbar{
    min-height: $nav-height;
  }
  .site-navbar{
    background-color: $theme-color;
    .nav-tabs > li {
      &.highlight{
        > a{
          background-color: rgba(0, 0, 0, .1);
        }
      }
      &.active > a{
        background-color: rgba(0,0,0,0);
      }
      > a{
        height: $nav-height;
        display: flex;
        align-items: center;
        font-size: 16px;
      }
    }
  }
  .site-menubar{
    background-color: $side-bgc;
  }
  .navbar-fixed-top{
    z-index: 1031;
  }
  .navbar-brand{
    height: $nav-height;
    display: flex;
    align-items: center;
    .navbar-brand-name{
      position: absolute;
      left: 0;
      top: 0;
      padding-left: 60px;
      height: 100%;
      width: $side-width;
      display: flex;
      align-items: center;
      >.name{
        padding-right: 15px;
        font-size: 18px;
        font-weight: 400;
        color: #fff;
      }
      >.dropdown{
        .iconfont{
          font-size: 22px;
          color: #fff;
        }
        &.open{
          >.dropdown-menu{
            display: block;
          }
        }
        >.dropdown-menu{
          display: none;
        }
      }
    }
  }

</style>
