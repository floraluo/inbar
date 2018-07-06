/**
 * Admui-iframe v1.1.0 (http://www.admui.com/)
 * Copyright 2015-2018 Admui Team
 * Licensed under the Admui License 1.0 (http://www.admui.com/about/#license)
 */
(function (docuemnt, window, $) {
    'use strict';

    /* globals Breakpoints, screenfull*/

    $.extend($.site, {
        theme: function () { // 主题渲染
            var $body = $('body'),
                settingsName = 'admui.base.skinTools',
                $parentLink = $('#admui-siteStyle', $('head')),
                settings = localStorage.getItem(settingsName),
                parentEtx = $parentLink.prop('href').indexOf('?v=') === -1 ? '' : '.min', themeColor, sidebar, navbar,
                menuDisplay, menuTxtIcon;

            if (!settings) {
                return;
            }

            settings = JSON.parse(settings).val;
            themeColor = this.themeColor = settings.themeColor;
            sidebar = settings.sidebar;
            navbar = settings.navbar;
            menuDisplay = settings.menuDisplay;
            menuTxtIcon = settings.menuTxtIcon;

            // 在前端渲染主题不是最优雅体验最好的，建议通过后端渲染
            if (themeColor && themeColor !== 'primary') {
                setTimeout(function () {
                    $parentLink.attr('href', '/public/themes/classic/base/skins/' + themeColor + '/index' + parentEtx + '.css');
                }, 130);
            }

            if (sidebar && sidebar === 'site-menubar-light') {
                $('#admui-siteMenubar').addClass('site-menubar-light');
            }

            if (navbar && navbar !== '') {
                $('.site-navbar').addClass(navbar);
            }

            if (settings.navbarInverse === '') {
                $('.site-navbar').removeClass('navbar-inverse');
            }

            if (menuDisplay && menuDisplay === 'site-menubar-fold') {
                $.site.menubar.fold();

                if (menuTxtIcon && menuTxtIcon === 'site-menubar-keep') {
                    $body.addClass('site-menubar-keep');
                } else {
                    $body.addClass('site-menubar-fold-alt');
                }
            }

            if (settings.tabFlag === '') {
                $body.removeClass('site-contabs-open');
            }

        },
        iframeTheme: function () { // 子框架主体内容部分主题
            var $iframeLink = $('#admui-siteStyle', this.iframeDocument),
                iframeEtx = $iframeLink.prop('href').indexOf('?v=') === -1 ? '' : '.min',
                themeColor = this.themeColor;

            if (themeColor && themeColor !== 'primary') {
                $iframeLink.attr('href', '/public/themes/classic/base/skins/' + this.themeColor + '/site' + iframeEtx + '.css');
            }
        },
        _urlRequest: function (url) { // 处理存储信息中没有的页面访问（创建新的标签页）
            var title = '未知页面';

            $('.site-menu a').each(function () {
                var $item = $(this);

                if ($item.attr('href') === url) {
                    title = $.trim($item.attr('title') || $item.text());

                    return false;
                }
            });

            $.site.contentTabs.buildTab({name: title, url: url});
        },
        _hideNavbar: function () { // 隐藏导航条
            var $body = $('body');

            $body.addClass('site-navbar-collapsing');
            $('#admui-navbarCollapse').collapse('hide');

            setTimeout(function () {
                $body.removeClass('site-navbar-collapsing');
            }, 10);

            $body.removeClass('site-navbar-collapse-show');
        },
        iframeEvents: function ($el) { // 子框架主体内容事件处理
            var self = this, _callback = function (obj) {
                $('#admui-siteStyle', obj).load(function () {
                    self.iframeTheme();
                });
            };

            /*
             *  菜单收起
             *  导航条收起
             * */
            $el.load(function () {
                var iframeDocument = self.iframeDocument = $.content.document();

                $(iframeDocument).on('click', function () {
                    // 小屏下收起顶部导航条和左侧菜单
                    if (Breakpoints.is('xs') && $('body').hasClass('site-menubar-open')) {
                        $.site.menubar.hide();

                        self._hideNavbar();
                    }

                    // 核心框架中下拉菜单切换操作
                    $('[data-toggle="dropdown"]').parent().removeClass('open');
                });

                _callback(iframeDocument);
            });
        },
        run: function () {
            var self = this,
                $content = this.$content = $('#admui-pageContent');

            // 获取iframe框架中变量&方法
            $.content = $.content || {};

            $.extend($.content, {
                window: function () {
                    var name = $content.find('iframe.active').attr('name');
                    return window.frames[name];
                },
                document: function () { // 获取iframe框架中document
                    var name = $content.find('iframe.active').attr('name');
                    return window.frames[name].document;
                }
            });




            // 父框架工具提示和弹框初始化
            $('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
            $('[data-toggle="popover"]').popover();

            if (window.localStorage) {
                this.theme();
                // TODO: Tabs
                this._tabsDraw();
            }

            $.components.init();
        }
    });

    // $.site.run();

})(document, window, jQuery);
