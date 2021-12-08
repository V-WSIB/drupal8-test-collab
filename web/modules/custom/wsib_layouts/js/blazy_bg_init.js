/**
 * @file
 * Helper js for initializing blazy on background.
 */
(function ($, Drupal) {
  var blazy = new Blazy();
  setTimeout(blazy.revalidate, 100);

  $(window).on('resize orientationchange', function() {
    blazy.revalidate();
  });
})(jQuery, Drupal);
