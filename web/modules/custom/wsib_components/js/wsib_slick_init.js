/**
 * @file
 * Helper js for initializing slider for image gallery.
 */

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.wsib_slick = {
    attach: function (context, settings) {
    var main_slider = $('.node--type-image-gallery .field--name-field-images');
    buildSlider();
    // Build Slick slider.
    function buildSlider() {
      main_slider.once().slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        speed: 500,
        autoplaySpeed: 900,
        autoplay: false,
        infinite: true
      });
    }
  }
}


})(jQuery, Drupal);
