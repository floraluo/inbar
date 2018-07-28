<template>
  <nav class="site-navbar navbar navbar-default navbar-fixed-top navbar-inverse" role="navigation">
    <div class="navbar-header">
        <button @click="menubarToggled" type="button" class="navbar-toggle hamburger hamburger-close navbar-toggle-left hided" data-toggle="menubar">
            <span class="sr-only">切换菜单</span> <span class="hamburger-bar"></span>
        </button>
        <button type="button" class="navbar-toggle collapsed" data-target="#admui-navbarCollapse" data-toggle="collapse">
            <i class="icon wb-more-horizontal" aria-hidden="true"></i>
        </button>
        <div class="navbar-brand navbar-brand-center site-gridmenu-toggle" data-toggle="gridmenu">
            <img class="navbar-brand-logo visible-lg visible-xs navbar-logo" src="../../static/images/logo-white.svg" title="Admui">
            <img class="navbar-brand-logo hidden-xs hidden-lg navbar-logo-mini" src="../../static/images/logo-white-min.svg" title="Admui">
        </div>
    </div>
    <div class="navbar-container container-fluid">
        <div class="collapse navbar-collapse navbar-collapse-toolbar" id="admui-navbarCollapse">
            <ul class="nav navbar-toolbar navbar-left">
                <li class="hidden-float" v-show="this.$route.meta.menubar">
                    <a @click="menubarToggled" data-toggle="menubar" class="hidden-float" href="javascript:;" role="button" id="admui-toggleMenubar">
                        <i class="icon hamburger hamburger-arrow-left">
                            <span class="sr-only">切换目录</span>
                            <span class="hamburger-bar"></span>
                        </i>
                    </a>
                </li>
                <li class="navbar-menu nav-tabs-horizontal nav-tabs-animate" id="admui-navbar">
                    <ul class="nav navbar-toolbar nav-tabs" role="tablist">
                        <!-- 顶部菜单 -->
                      <template v-for="(menu) in menus">
                          <li :key="menu.id" role="presentation" :class="{active: menu.path === $route.path}">
                              <router-link :to="menu.children?menu.children[0].path:menu.path" @click="navClicked(menu)">
                                <i :class="['icon', menu.icon]"></i> <span>{{menu.name}}</span>
                              </router-link>
                              <!--<a v-else :data-nav="menu.id" data-toggle="tab" @click.prevent="switchTab(menu)" :href="menu.children?`#admui-navTabsItem-${menu.id}`:menu.path" :aria-controls="`#admui-navTabsItem-${menu.id}`" role="tab" aria-expanded="false">-->
                                  <!--<i :class="['icon', menu.icon]"></i> <span>{{menu.name}}</span>-->
                              <!--</a>-->
                          </li>
                      </template>
                      <li class="dropdown" id="admui-navbarSubMenu">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:;" data-animation="slide-bottom" aria-expanded="true" role="button">
                          <i class="icon wb-more-vertical"></i>
                        </a>
                        <ul class="dropdown-menu" role="menu">
                          <li class="no-menu" role="presentation">
                            <a href="#" target="_blank" data-iframe role="menuitem">
                              <i class="icon wb-list-numbered"></i><span>网站地图</span>
                            </a>
                          </li>
                          <li class="no-menu" role="presentation">
                            <a href="#" target="_blank" data-iframe role="menuitem">
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
                  <router-link to="/system/settings/display"  class="icon wb-layout" data-iframe>
                    <span class="sr-only">主题与布局</span>
                  </router-link>
                </li>
                <li class="hidden-xs" id="admui-navbarFullscreen" data-toggle="tooltip" data-placement="bottom" title="全屏">
                    <a class="icon icon-fullscreen" data-toggle="fullscreen" href="#" role="button">
                        <span class="sr-only">全屏</span>
                    </a>
                </li>
                <li>
                    <a class="icon fa-sign-out" id="admui-signOut" data-ctx="" data-user="1" href="/system/logout" role="button">
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
  import Breakpoints from 'breakpoints-js'
  import { publish } from 'pubsub-js'
  import screenfull from '../../static/vendor/screenfull/screenfull'
  // import '../../static/admui/components/slimscroll'
  // import '../../static/themes/classic/base/js/sections/media-menu'

export default {
  name: 'navbar',
  props: {
    menus: Array
  },
  data () {
    return {
    }
  },
  watch: {
    menus (n, o) {
      console.log('navbar menus changed: ', n, 'old', o)
      // this.menuReady(!!n)
    }
  },
  ready: {
    menuReady: 'menus'
  },
  dom: {
    tabHandler: '[data-toggle="tab"]'
  },
  created () {
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
  methods: {
    navClicked(menu) {
      publish('menu.item.clicked', {route: this.$route, name: menu.name, menu: menu})
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
