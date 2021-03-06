/**
 * Admui-iframe v1.1.0 (http://www.admui.com/)
 * Copyright 2015-2018 Admui Team
 * Licensed under the Admui License 1.0 (http://www.admui.com/about/#license)
 */
(function (window, document, $) {
    "use strict";

    $.components.register("animate-list", {
        mode: 'init',

        defaults: {
            child: '.panel',
            duration: 250,
            delay: 50,
            animate: 'scale-up',
            fill: 'backwards'
        },

        init: function (context, iframe) {
            var self = this,
                iframe$ = iframe ? iframe.$ : $;

            $('[data-plugin="animateList"]', context).each(function () {
                var $this = $(this),
                    options = $.extend({}, self.defaults, $this.data(iframe$), true);

                var animatedBox = function ($el, opts) {
                    this.options = opts;
                    this.$children = $el.find(opts.child);
                    this.$children.addClass('animation-' + opts.animate);
                    this.$children.css('animation-fill-mode', opts.fill);
                    this.$children.css('animation-duration', opts.duration + 'ms');

                    var delay = 0,
                        self = this;

                    this.$children.each(function () {

                        $(this).css('animation-delay', delay + 'ms');
                        delay += self.options.delay;
                    });
                };

                animatedBox.prototype = {
                    run: function (type) {
                        var self = this;
                        this.$children.removeClass('animation-' + this.options.animate);
                        if (typeof type !== 'undefined') {
                            this.options.animate = type;
                        }
                        setTimeout(function () {
                            self.$children.addClass('animation-' + self.options.animate);
                        }, 0);
                    }
                };

                $this.data('animateList', new animatedBox($this, options), iframe$);
            });
        }
    });

})(window, document, jQuery);