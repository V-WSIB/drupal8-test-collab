(function($) {
  'use strict';
  $(document).ready(function() {
    var items = $('#block-horizontalmenu .responsive-menu-block-wrapper #horizontal-menu .menu-item--expanded').children('a');
    var mobile_items = $('#off-canvas .mm-panels .mm-listview .mm-listitem .no-link');
    var menu_container = $('.horizontal-menu');
    var alertBlock = $('#block-alertblock');

    //Variable to control click on iframe elements.
    var myConfObj = {
      iframeMouseOver : false
    }

    // Change link on Off-canvas Menu to same as its sibling Next button.
    mobile_items.each(function(index) {
      let link = $(this).siblings('.mm-btn_next').attr('href');
      $(this).attr('href', link);
    });

    // Show the alert block
    function showAlerts() {
      if (alertBlock.length && alertBlock.is(':visible')) {
        alertBlock.css({
          'height': '',
          'padding': ''
        });
      }
    }

    // Hide the alert block
    function hideAlerts() {
      if (alertBlock.length && alertBlock.is(':visible')) {
        alertBlock.css({
          'height': '0px',
          'padding': '0px'
        });
      }
    }

    // Close all open menu items.
    function closeNav(e) {
      let open = $('#block-horizontalmenu .responsive-menu-block-wrapper #horizontal-menu .menu-item--expanded .item-open');
      let openItem = $('#block-horizontalmenu .responsive-menu-block-wrapper #horizontal-menu .menu-item--expanded .open');

      // Show the alerts block
      showAlerts();

      // Remove Body Scroll Freeze
      $('html').removeClass('main-nav--active');

      if (open.length > 0) {
        menu_container.removeClass('menu-open');
        open.each(function(index) {
          $(this).removeClass('item-open');
        });
      }

      if (openItem.length > 0) {
        openItem.removeClass('open');
      }
    }

    // Toggle sub-nav elements.
    function toggleSubNav(e) {
      e.stopPropagation();
      e.preventDefault();
      let subnav = $(e.target).siblings('.menu.sub-nav');

      hideAlerts()

      // Freeze the body scrolling
      $('html').addClass('main-nav--active');

      // Top level element.
      if ($(e.target).parents('.menu.sub-nav').length === 0) {
        // Add general open class to menu
        menu_container.addClass('menu-open');
        // If sub-nav is not open, close all other items and open sub-nav.
        if (!subnav.hasClass('item-open')) {
          // Hide the alerts block
          hideAlerts();

          items.each(function(index) {
            $(this).siblings('.menu.sub-nav').removeClass('item-open');
            $(this).removeClass('open');
          });
          subnav.addClass('item-open');
          $(e.target).addClass('open');
        }
        // If sub-nav was open, close it and all its children.
        else {
          // Show the alerts block
          showAlerts();

          // Remove Body Scroll Freeze
          $('html').removeClass('main-nav--active');

          $(e.target).removeClass('open');
          subnav.removeClass('item-open');
          subnav.find('.menu-item--expanded .sub-nav').removeClass('item-open');
          menu_container.removeClass('menu-open');
        }
      }
      // Sub-nav element.
      else {
        // If sub-nav is not open, close all sibling sub-nav items and open sub-nav.
        if (!subnav.hasClass('item-open')) {
          $(e.target).parents('.sub-nav').find('.menu-item--expanded .sub-nav.item-open').each(function(index) {
            $(this).removeClass('item-open');
          });
          $(e.target).parents('.sub-nav').find('.menu-item--expanded a.open').each(function(index) {
            $(this).removeClass('open');
          });
          subnav.addClass('item-open');
          $(e.target).addClass('open');
        }
      }
    }

    // Event handlers to close nav if click anywhere else on the page.
    $(document).on('click', closeNav);
    $(document).on('keypress', function(e) {
      // Check if Enter (13) or Space key (32) pressed.
      if (e.which == 13 || e.which == 32) {
        closeNav(e);
      }
    });

    // Event handlers to close nav if click on iframe.
    $(window).on('blur', function() {
      if(myConfObj.iframeMouseOver){
        closeNav();
      }
    });
    $('iframe').on('mouseover', function() {
      myConfObj.iframeMouseOver = true;
    });
    $('iframe').on('mouseout', function() {
      myConfObj.iframeMouseOver = false;
    });

    // Event handlers to toggle children menu items.
    items.on('click', toggleSubNav);
    items.on('keypress', function(e) {
      if (e.which == 13 || e.which == 32) {
        toggleSubNav(e);
      }
    });
  });
})(jQuery);
