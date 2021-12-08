(function($) {

  'use strict';

  let form_id = drupalSettings.search_form_id;
  $(document).ready(function(){
    let value = getParameterByName('search');
    if (form_id.length) {
      $(form_id + ' .form-text').val(value);
    }
  });
  Drupal.behaviors.trigger_search = {
    attach: function (context, settings) {
      if (!form_id.length) {
        return;
      }

      let masterSearch = $(form_id + ' .form-text');
      let slaveSearch = $('.search-view form .form-text');
      if (masterSearch.length && slaveSearch.length) {
        masterSearch.on('keyup', function() {
          slaveSearch.val($(this).val());
        });
      }
      let masterSubmit = $(form_id).parent().find('.search-trigger');
      let slaveSubmit = $('.search-view form .form-submit');
      if (masterSubmit.length && slaveSubmit.length) {
        masterSubmit.unbind('click');
        masterSubmit.on('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          window.historyInitiated = true;
          var href = window.location.href;
          var currentValue = slaveSearch.val();
          if (currentValue.length) {
            href = updateURLParameter(href, 'search', currentValue);
          }
          else {
            href = updateURLParameter(href, 'search', '');
          }
          window.history.pushState(null, document.title, href);
          slaveSubmit.click();
        });
      }
      if (slaveSubmit.length) {
        let masterForm = $(form_id).on('submit', function(e) {
          e.preventDefault();
          e.stopPropagation();
          // Update url.
          window.historyInitiated = true;
          var href = window.location.href;
          var currentValue = slaveSearch.val();
          if (currentValue.length) {
            href = updateURLParameter(href, 'search', currentValue);
          }
          else {
            href = updateURLParameter(href, 'search', '');
          }
          window.history.pushState(null, document.title, href);
          slaveSubmit.click();
        });
      }
      let tabs = $('.block-wsib-search .tab');
      tabs.each(function(){
        $(this).unbind('click');
        $(this).on('click', function(e){
          e.preventDefault();
          e.stopPropagation();
          var search_val = getParameterByName('search');
          var href = $(this).attr('href');
          if (search_val && search_val.length) {
            href += '?search=' + search_val;
          }
          window.location.href = href;
        });
      });
    }
  };

  // Helper function to get query parameter by name.
  var getParameterByName = function (name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  // Helper function to update query parameter by name.
  function updateURLParameter(url, param, paramVal) {
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
      tempArray = additionalURL.split("&");
      for (var i = 0; i < tempArray.length; i++) {
        if (tempArray[i].split('=')[0] != param) {
          newAdditionalURL += temp + tempArray[i];
          temp = "&";
        }
      }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
  }

})(jQuery);
