// JavaScript Document
(function ($, Drupal) {

  $(function() {
    //Prevent click event on video launch
    $('.video-embed-field-launch-modal').each(function() {
      $(this).on("click", function(event){
        event.preventDefault();
      });
    });
  });
})(jQuery, Drupal);
