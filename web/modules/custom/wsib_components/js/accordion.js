// JavaScript Document
(function ($, Drupal) {
  var accordion = $('.node--type-page .field--type-entity-reference .field__item .node--type-accordion .field__item h2');

  accordion.each(function(){
    $(this).find('span').wrap('<button></button>');
    let text = $(this).find('span').text();
    $(this).find('button').attr('aria-expanded', 'false')
      .attr('aria-label', text + ' Click to expand the content')
      .addClass('accordion-closed')
      .removeClass('accordion-open');
  });

  function toggleaccordion(e) {
    // Click target = span, space/enter target = h2 set consistent vars
    if($(e.target).is('button')) {
      var button = $(e.target);
    }
    else {
      var button = $(e.target).parent('button');
    }

    let text = button.find('span').text();
    button.toggleClass('accordion-closed accordion-open');
    button.attr('aria-expanded', function(index, attr) {
      return attr == 'false' ? 'true' : 'false';
    });
    button.attr('aria-label', function(index, attr) {
      return attr == text + ' Click to expand the content' ? text + ' Click to hide the content' : text + ' Click to expand the content';
    });

    // If accordion is closed then open accordion
    if(button.hasClass('accordion-closed')) {
      button.closest('div').find('.node__content').slideToggle('250');
    }
    // If accordion is open then close accordion
    else if(button.hasClass('accordion-open')) {
      button.closest('div').find('.node__content').slideToggle('50');
    }
  }

  accordion = accordion.find('button');
  accordion.on('click', function(e) {
    toggleaccordion(e);
  });
  accordion.on('keydown', function(e) {
    if (e.which == 13 || e.which == 32) {
      e.preventDefault();
      toggleaccordion(e);
    }
  });

})(jQuery, Drupal);
