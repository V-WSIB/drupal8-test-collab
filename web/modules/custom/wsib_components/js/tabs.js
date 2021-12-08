/**
 * @file
 * Helper js for initializing tabs functionality.
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.tabs = {
    attach: function (context, settings) {
      let tab_controls = $('.tabs-controls > button');
      let tab_content = $('.field--name-field-tab-item > .field__item');
      var tab_index = tab_controls.index(this);

      tab_content.attr('role', 'tabpanel');
      tab_content.each(function() {
        var content_tab_index = tab_content.index(this);
        var content_id = tab_controls.eq(content_tab_index).attr('id');
        $(this).attr({'id': 'tab-content-' + content_id, 'aria-labelledby': content_id});
      });

      tab_content.not(':first-child').hide();
      tab_controls.unbind('click');
      tab_controls.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        tab_content.hide();
        var active_id = $(this).attr('id');
        // Show active
        $('.field--name-field-tab-item > .field__item#tab-content-' + active_id).show();

        // ==== Toggle attributes
        tab_controls.removeClass('active-tab');
        $(this).addClass('active-tab');
        tab_controls.attr('aria-selected', 'false');
        $(this).attr('aria-selected', 'true');


        // Reset the size of the slider when triggered
        $('.slick-slider').slick('setPosition');

        $(window).resize();
      });
    }
  };

})(jQuery, Drupal);
