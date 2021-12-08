(function($) {
  'use strict';
  $(document).ready(function() {
    var accordion = $('.block .sidebar-menu .link-wrapper .accordion-arrow');

    // Set ARIA attributes for default active accordion.
    accordion.each(function(index) {
      if ($(this).parent().hasClass('active')) {
        $(this).attr('aria-expanded', 'true');
        $(this).attr('aria-label', $(this).attr('aria-label').replace('expand', 'hide'));
      }
    });

    // Toggle accordion elements.
    function toggleAccordion(e) {
      e.preventDefault();
      let sublinks = $(e.target).siblings('.sublink-wrapper');
      sublinks.slideToggle(400);
      // Toggle aria-expanded attribute value.
      $(e.target).attr('aria-expanded', function(index, attr){
          return attr == 'false' ? 'true' : 'false';
      });
      // Toggle aria-label attribute description.
      $(e.target).attr('aria-label', function(index, attr){
          return attr.indexOf('expand') != -1 ? attr.replace('expand', 'hide') : attr.replace('hide', 'expand');
      });
    }

    // Event handlers to toggle accordions.
    accordion.unbind('click');
    accordion.unbind('keypress');
    accordion.on('click', toggleAccordion);
    accordion.on('keypress', function(e) {
      // Check if Enter (13) or Space key (32) pressed.
      if (e.which == 13 || e.which == 32) {
        toggleAccordion(e);
      }
    });
  });
})(jQuery);
