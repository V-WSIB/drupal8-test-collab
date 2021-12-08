// JavaScript Document
(function ($, Drupal) {
  'use strict';
  Drupal.behaviors.wsib_colorbox = {
    attach: function (context, settings) {
      $('body').once('wsib_colorbox').each(function () {
        var $colorbox = $('.node--type-image .cboxElement .field--name-field-image');
        $colorbox.unbind('click');
        $colorbox.on('click', opencolorbox);

        function opencolorbox(e) {
          e.preventDefault();
          e.stopPropagation();
          $.colorbox({
            href: $(this).closest('.cboxElement'),
            inline: true,
            scrolling: false,
            overflow: 'hidden',
            className: 'colorboxSplash',
            maxWidth: '90%',
            overlayClose: true,
            closeButton: true,
          });
        }
      });
    }
  };
})(jQuery, Drupal);
