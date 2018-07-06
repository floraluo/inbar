/**
 * Admui-iframe v1.1.0 (http://www.admui.com/)
 * Copyright 2015-2018 Admui Team
 * Licensed under the Admui License 1.0 (http://www.admui.com/about/#license)
 */
(function(window, document, $){
    "use strict";

    $.components.register("taskList", {
        mode: "api",
        api: function (context) {
            $(context).on('change.site.task', '[data-role="task"]', function () {
                var $list = $(this),
                    $checkbox = $list.find('[type="checkbox"]');
                if ($checkbox.is(':checked')) {
                    $list.addClass('task-done');
                } else {
                    $list.removeClass('task-done');
                }
            });

            $('[data-role="task"]').trigger('change.site.task');
        }
    });
})(window, document, jQuery);