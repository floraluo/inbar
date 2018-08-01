<template>
<nav class="site-contabs" id="admui-siteConTabs">
  <button @click="pullLeft" type="button" class="btn btn-icon btn-default pull-left hide">
    <i class="icon fa-angle-double-left"></i>
  </button>
  <div class="contabs-scroll pull-left">
    <ul class="nav con-tabs">
      <!--<li :class="{active:$route.path=='/'}">-->
        <!--<router-link to="/" title="首页"><span>首页</span></router-link>-->
      <!--</li>-->
      <!--<li v-for="(tab, index) in tabs" :key="tab.route">-->
        <!--<pre>{{ index }} =>-->
          <!--tab: {{ JSON.stringify(tab.entries()) }}-->
          <!--$route: {{ this }}-->
        <!--</pre>-->
      <!--</li>-->
      <li v-for="(tab, index) in tabs" :key="tab.route.path" :class="{active: $route.path === tab.route.path}">
        <router-link :to="tab.route.path" :title="tab.name" @click="tabClicked(tab)">
          <span>{{tab.name}}</span>
          <i class="icon wb-close-mini" @click.prevent="onCloseTab(index)"></i>
        </router-link>
      </li>
    </ul>
  </div>
  <div class="btn-group pull-right">
    <button @click="pullRight" type="button" class="btn btn-icon btn-default hide">
      <i class="icon fa-angle-double-right"></i>
    </button>
    <button type="button" class="btn btn-default dropdown-toggle btn-outline" data-toggle="dropdown" aria-expanded="false">
      <span class="caret"></span> <span class="sr-only">切换菜单</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="conTabsDropdown" role="menu">
      <li class="reload-page" role="presentation" @click="onReloadTab">
        <a href="javascript:;" role="menuitem"><i class="icon wb-reload"></i> 刷新当前</a>
      </li>
      <li class="close-other" role="presentation" @click="onCloseOtherTab">
        <a href="javascript:;" role="menuitem"><i class="icon wb-close"></i> 关闭其他</a>
      </li>
      <li class="close-all" role="presentation" @click="onCloseAllTab">
        <a href="javascript:;" role="menuitem"><i class="icon wb-power"></i> 关闭所有</a>
      </li>
    </ul>
  </div>
</nav>
</template>
<script>
  import $ from 'jquery'
  // import { publish, subscribe } from '../core/topics'
  import { publish, subscribe } from 'pubsub-js'

  import '../../static/themes/classic/base/js/sections/content-tabs'

  // function _urlRequest (url) { // 处理存储信息中没有的页面访问（创建新的标签页）
  //   var title = '未知页面';
  //
  //   $('.site-menu a').each(function () {
  //     var $item = $(this);
  //
  //     if ($item.attr('href') === url) {
  //       title = $.trim($item.attr('title') || $item.text());
  //       return false;
  //     }
  //   });
  //
  //   $.site.contentTabs.buildTab({name: title, url: url});
  // }

  export default {
    name: 'tabs',
    // props: {
    //   tabs: Array
    // },
    data () {
      return {
        ready: false,
        storageKey: 'admui.base.contentTabs',
        tabId: 0,
        relative: 0,
        tabTimeout: 30,
        tabs: null
      }
    },
    created () {
      const me = this
      subscribe('menu.item.clicked', this.addTab)
      console.log('this.tabs', this.tabs)
      this.tabs = this.settings.tabs
      if (!this.tabs) {
        this.tabs = this.settings.tabs
      } else {
        this.tabs.concat(this.settings.tabs || [])
      }
    },
    computed: {
      settings () {
        // let raw = $.sessionStorage.get('admui.base.contentTabs') || {}
        let set = {tabs: [], checked: '/'}
        return set
      },
      $instance () { return $('#admui-navTabs .site-menu') },
      $content () { return $('#admui-pageContent') },
      $tabs () { return $("#admui-siteConTabs ul.con-tabs") }
    },
    mounted () {
      this.bind()

      let $conTabs = $('.con-tabs')
      let contentTabs = $.site.contentTabs

      // contentTabs.enable($conTabs.find('.active'));

      if (this.settings.tabs.length >= 19 - 3) {
        contentTabs.tabSize();
        contentTabs.tabEvent($conTabs, 'media');
      }
    },
    methods: {
      tabClicked(menu) {
        // publish('menu.item.clicked', {route: this.$route, name: menu.name, menu: menu})
      },
      onCloseTab (index) {
        if (+index === 0 && this.tabs.length === 1) {
          this.$router.replace({path: '/'});
        } else if (this.tabs[index].route.path === this.$route.path) {
          if (index === this.tabs.length - 1) {
            this.$router.replace({path: this.tabs[index - 1].route.path});
          } else {
            this.$router.replace({path: this.tabs[index + 1].route.path});
          }
        }

        this.tabs.splice(index, 1)
        // this.$router.back()
        //TODO: DEL publish('tab.closed', index)
      },
      onCloseOtherTab () {
        this.$tabs.find('li.active').animate({left: 0}, 100);
        this.btnView('hide');
        let len = this.tabs.length;
        while (len--) {
          if (this.$route.path === this.tabs[len].route.path) {
            this.tabs = this.tabs.slice(len, len + 1);
            break;
          }
        }
      },
      onReloadTab () {
        this.$router.replace({path: this.$route.path})
      },
      onCloseAllTab () {
        this.tabs = [];
        if (this.$route.path !== '/') {
          this.$router.replace({path: '/'})
        }
        this.$tabs.animate({left: 0}, 100)
        this.btnView('hide')
        this.tabSize()
      },
      pullLeft () {
        this.tabPosition(this.$tabs, this.tabWidth, 'right')
      },
      pullRight () {
        this.tabPosition(this.$tabs, this.tabWidth, 'left', this.view, this.$tabs.width())
      },
      bind () {
        let $navContabs = $("#admui-siteConTabs"),
          $navContent = $navContabs.find("ul.con-tabs");

        this.tabWidth = $navContent.find("li").width();
        this.view = $navContabs.find(".contabs-scroll").width();

        // // 登出清楚标签页缓存
        // $(document).on('click', '#admui-signOut', function () {
        //   $.sessionStorage.remove(self.storageKey);
        // });

        // 浏览器窗口大小改变,标签页的对应状态
        $(window).on('resize', this.resize);
      },
      _throttle: function (fn, interval) { // 函数节流操作
        var _fn = fn,
          timer,
          firstTime = true;
        return function () {
          var args = arguments,
            self = this;

          if (firstTime) {
            _fn.apply(self, args);
            firstTime = false;
          }

          if (timer) {
            return false;
          }

          timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            _fn.apply(self, args);
          }, interval || 500);
        };
      },
      closeTab: function ($item) {
        var checkedTabId = $item.children('a').attr('target'), $checked = '',
          $nextLi = $item.next('li'),
          $content = this.$content;

        if ($item.is('.active')) { // 关闭选中标签
          if ($nextLi.size() > 0) {
            $checked = $nextLi;
          } else {
            $checked = $item.prev('li');
          }

          $checked.addClass("active");

          this.enable($checked);
          this._checkoutTab($checked.find('a'));
        }

        $item.remove();
        $content.children('[name="' + checkedTabId + '"]').remove();
        this._updateSetting(checkedTabId);

        this.tabSize();
        this.tabEvent($(".con-tabs"), 'media');
      },
      btnView (status) { // 标签页左右移动按钮状态
        var $siteContabs = $('.site-contabs'),
          $contabsLeftBtn = $siteContabs.children('button.pull-left'),
          $contabsRightBtn = $siteContabs.find('.pull-right > button.btn-icon');

        if (status === 'visible') {
          $contabsLeftBtn.removeClass('hide');
          $contabsRightBtn.removeClass('hide');
        } else if (status === 'hide') {
          $contabsLeftBtn.addClass('hide');
          $contabsRightBtn.addClass('hide');
        }
      },
      saveTabs () {
        this.settings.tabs = this.tabs
        $.sessionStorage.set(this.settings)
      },
      addTab (msg, route) {
        const tab = msg === 'menu.item.clicked' ? route : {route: this.$route, name: route.name};
        let len = this.tabs.length;
        while (len) {
          if (this.tabs[len - 1].route.name === tab.route.name) {
            return;
          }
          len--;
        }
        this.tabs.push(tab)
        // this.tabs = this.tabs.concat(route)

        var $tabNav = $(".con-tabs");

        // 修改当前选中的标签页
        // this.saveTabs()
        this.settings.tabs = this.tabs;
        $.sessionStorage.set(this.settings);

        // 修改页面标题
        const title = tab.name === '' ? '无标题' : tab.name;
        $('title').text($.trim(title));
        this.tabSize();
        this.tabEvent($tabNav, 'media');
        this.tabType = false;
      },
      resize: function () {
        var self = this,
          $navContabs = $(".site-contabs"),
          $navContent = $navContabs.find("ul.con-tabs");

        self._throttle(function () {
          self.view = $navContabs.find(".contabs-scroll").width();
          self.tabEvent($navContent, 'media');
        }, 200)();
      },
      tabSize () { // 修改标签页盒子尺寸
        var content, $tabNav = $(".con-tabs"),
          _num = this.tabs.length + 1;

        content = this.tabWidth * _num;
        $tabNav.css("width", content);
      },
      tabEvent (doc, media) { // 增删标签页的对应状态
        var content = $(".con-tabs").width(),
          _view = this.view, _tab = this.tabWidth;

        if (content > this.view) {
          this.tabPosition(doc, _tab, "left", _view, content, media);
          this.btnView('visible');
        } else {
          this.btnView('hide');
        }

        if (this.currentView < _view || this.currentContent > content) {
          this.tabPosition(doc, _tab, "right", _view, content, media);
        }
        this.currentView = _view;
        this.currentContent = content;
      },
      tabPosition (doc, width, dir, view, content, media) { // 标签页的位移
        var self = this,
          x = doc.position().left;
        function calc (x) {
          var flag = x + width;

          if (flag > 0) {
            self.relative = x;
            return 0;
          } else {
            return x;
          }
        }

        if (dir === "left") {
          if (x <= view - content) {
            return false;
          }
          if (typeof media !== 'undefined') {
            x = view - content;
          } else {
            x = this.relative !== 0 ? x - width + this.relative : x - width;
            this.relative = 0;
          }
        } else if (dir === "right") {
          if (x === 0) {
            return false;
          }

          if (typeof media !== 'undefined') {
            x = content <= view ? 0 : view - content;
          } else {
            x = calc(x + width);
          }
        }

        doc.animate({
          left: x
        }, 100);
      }
    },
    updated () {
      // if (this.ready) return
      // $.site.contentTabs.init()
      // this.ready = true
    }
  }
</script>

<style>
</style>
