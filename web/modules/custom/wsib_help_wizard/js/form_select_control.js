(function($) {
  'use strict';
  $(document).ready(function() {
    var roles = $('#wsib-help-wizard-form #edit-role');
    var operations = $('#wsib-help-wizard-form .form-item-operation');
    var submit = $('#wsib-help-wizard-form #edit-submit');
    disableElements();
    if (roles.val() !== '') {
      enableElements(operations);
    }
    if (operations.find('select').val() !== '') {
      enableElements(submit);
    }

    // Add CSS class .disabled to elements.
    function disableElements() {
      operations.addClass('disabled');
      submit.addClass('disabled');
    }

    // Remove CSS class .disabled to elements.
    function enableElements(element) {
      element.removeClass('disabled');
    }

    // Set elements status regarding roles value.
    function setStatus(e) {
      e.preventDefault();
      if (roles.val() !== '') {
        enableElements(operations);
      }
      else {
        disableElements();
      }
    }

    roles.on('change', setStatus);
    operations.on('change', function(){
      if (operations.find('select').val() !== '') {
        enableElements(submit);
      }
      else {
        submit.addClass('disabled');
      }
    });
  });
})(jQuery);
