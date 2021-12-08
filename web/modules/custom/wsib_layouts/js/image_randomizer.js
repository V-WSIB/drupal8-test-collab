// JavaScript Document
(function ($, Drupal, drupalSettings) {
  $(window).on('load', function() {
    // Select random image from array and set as banner background.
    var banner_images = drupalSettings.media_items;
    var random_image = banner_images[Math.floor(Math.random()*banner_images.length)];
    $('#block-frontpagebanner').css("background-image", "url("+random_image+")");
  });
})(jQuery, Drupal, drupalSettings);
