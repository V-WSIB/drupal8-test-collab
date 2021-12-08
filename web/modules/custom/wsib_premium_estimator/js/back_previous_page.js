(function($) {
  'use strict';
  $(document).ready(function() {
    var back_button = $('.view-sector.view-display-id-page_1 .view-header .back-button');

    function backPreviousPage(e) {
      e.preventDefault();
      history.back();
    }

    back_button.on('click', backPreviousPage);
    back_button.on('keypress', function(e) {
      if (e.which == 13 || e.which == 32) {
        backPreviousPage(e);
      }
    });
  });
})(jQuery);
