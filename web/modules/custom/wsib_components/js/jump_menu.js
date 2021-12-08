(function($) {
  'use strict';
  $(document).ready(function() {
    var links = $('.view-jump-menus .view-content .views-row .jump-link');

    // Enhance Jump Links href attribute.
    links.each(function(index) {
      let href = $(this).attr('href');
      $(this).attr('href', '#' + href.split('#')[1]);
    });

    // Get information about section to scroll to.
    function getSectionNid(e) {
      e.preventDefault();
      let classes = $(e.target).attr('class').split(' ');
      classes.forEach(function(item) {
        if (item.startsWith('nid-')) {
          scrollToSection(item);
        }
      });
    }

    // Scroll to specific section.
    function scrollToSection(nid) {
      let selector = '.node__content .field--name-field-components .' + nid;
      $([document.documentElement, document.body]).animate({
        scrollTop: $(selector).offset().top
      }, 1000);
    }

    // Event listeners.
    links.on('click', getSectionNid);
    links.on('keypress', function(e) {
      if (e.which == 13 || e.which == 32) {
        getSectionNid();
      }
    });
  });
})(jQuery);
