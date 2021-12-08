(function($) {
  'use strict';
  Drupal.behaviors.search_header = {
    attach: function (context, settings) {
      let searchHeaderFormBlock = $('.general-search-header-form');
      let searchHeaderFormWrapper = $('.general-search-header-form--form-wrapper');
      let searchHeaderFormInput = searchHeaderFormWrapper.find('#edit-search-content-header');
      let searchHeaderFormButton = searchHeaderFormWrapper.find('#edit-search');
      let searchFormHandler = $('#block-wsibgeneralsearchheadertriggerblock .header-search-trigger');
      searchFormHandler.unbind('click');
      searchFormHandler.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!searchFormHandler.hasClass('open')) {
          modalLoop(searchHeaderFormWrapper);
          setTimeout(function() {
            searchHeaderFormInput.focus();
          }, 100);
        }
        else {
          $('#block-wsibgeneralsearchheadertriggerblock > .header-search-trigger').focus();
        }
        $('html').toggleClass('no-scroll');
        searchFormHandler.toggleClass('open');
        searchHeaderFormBlock.toggleClass('open');
        searchHeaderFormWrapper.toggleClass('open');
        searchHeaderFormInput.toggleClass('element-invisible');
        searchHeaderFormButton.toggleClass('element-invisible');
      });
    }
  };

  function modalLoop(e) {
    // ===== Keyboard focus loop
    var modal_buttons = $(e).find('a, input, button, [role="button"]');
    var modal_button_first = modal_buttons[0];
    var modal_button_last = modal_buttons[modal_buttons.length - 1];
    modal_buttons.each(function() {
      $(this).on('keydown', function(e) {
        var tab = (e.key === 'Tab');
        if (!tab) {
          return;
        }
        // ==== back from first
        if ( e.shiftKey ) {
          if (document.activeElement === modal_button_first) {
            modal_button_last.focus();
            e.preventDefault();
          }
        }
        // ===== forward from last
        else {
          if (document.activeElement === modal_button_last) {
            modal_button_first.focus();
            e.preventDefault();
          }
        }
      });
    });
  }

})(jQuery);
