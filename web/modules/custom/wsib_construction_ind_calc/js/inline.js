(function($) {
  $(document).ready(function() {
    $('#accept-button').click(function(e) {
      $('#intro').hide();
      $('#calculator').show();
    });
    $('#back-btn').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#general').show();
      $('#disclaimer').hide();
    });
    $('#nodecoration-info').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#ownership-help').show();
    });
    $('#just-nodecoration').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('.hiddencontent').hide();
    });
    $('#nodecoration-info-2').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#rate-help').show();
    });
    $('#just-nodecoration-2').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('.hiddencontent').hide();
    });
    $('#just-nodecoration-3').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('.hiddencontent').hide();
    });
    $('#direct-error-btn').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#direct-help').show();
    });
    $('#closebutton > a').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('.hiddencontent').hide();
    });
    $('#nodecoration-info-3').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#reporting-frequency-help').show();
    });
    $('#general-previous').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#intro').show();
      $('#calculator').hide();
    });
    $('.nodecoration.info.result-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#ss-result-help').show();
    });
    $('.nodecoration.close-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('.hiddencontent').hide()
    });
    $('.nodecoration.rate-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#ss-rate-help').show();
    });
    $('.nodecoration.close-rate').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('.hiddencontent').hide()
    });
    $('.nodecoration.work-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#ss-work-help').show();
    });
    $('#ss-previous-butt').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#general').show();
      $('#sole-single').hide();
    });
    $('#ss-previous-butt').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-single-questions').show();
      $('#sole-single-summary').hide();
    });
    $('.nodecoration.annual-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-annualNet-help').show();
    });
    $('#closebutton').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('.hiddencontent').hide();
    });
    $('.nodecoration.common-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-common-help').show();
    });
    $('.nodecoration.closebutton').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('.hiddencontent').hide();
    });
    $('.nodecoration.worker-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-workerPer-help').show();
    });
    $('.nodecoration.rate1-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate1-workearn-help').show();
    });
    $('.nodecoration.rate2-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate2-help').show();
    });
    $('.nodecoration.rate2-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate2-workearn-help').show();
    });
    $('.primary.sole-multi-rates-addnewrate1').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-rates-newrate1').show();
      $('#sole-multi-rates-addnewrate1').hide();
      $('#sm-rate3value').val('1');
    });
    $('.nodecoration.sm-rate3-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate3-help').show();
    });
    $('.nodecoration.rate3-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate3-workearn-help').show();
    });
    $('.secondary.removeSMRG3-1').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-rates-newrate1').hide();
      $('#sole-multi-rates-addnewrate1').show();
      $('#sm-rate3value').val('0');
    });
    $('#sole-multi-rates-addnewrate2.add-new-rate .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-rates-newrate2').show();
      $('#sole-multi-rates-addnewrate2').hide();
      $('#sm-rate4value').val('1');
    });
    $('.nodecoration.rate4-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate4-help').show();
    });
    $('nodecoration.rate4-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate4-workearn-help').show();
    });
    $('.secondary.sole-multi-rates-newrate2').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-rates-newrate2').hide();
      $('#sole-multi-rates-addnewrate2').show();
      $('#sm-rate4value').val('0');
    });
    $('.primary.sole-multi-rates-addnewrate3').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-rates-newrate3').show();
      $('#sole-multi-rates-addnewrate3').hide();
      $('#sm-rate5value').val('1');
    });
    $('.nodecoration.rate4-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate4-help').show();
    });
    $('.nodecoration.rate5-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate5-workearn-help').show();
    });
    $('.secondary.sole-multi-rates-newrate3').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-rates-newrate3').hide();
      $('#sole-multi-rates-addnewrate3').show();
      $('#sm-rate5value').val('0');
    });
    $('.primary.multi-rates-addnewrate4').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-rates-newrate4').show();
      $('#sole-multi-rates-addnewrate4').hide();
      $('#sm-rate6value').val('1');
    });
    $('.nodecoration.rate6-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate6-help').show();
    });
    $('.nodecoration.rate6-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate6-workearn-help').show();
    });
    $('.secondary.sole-multi-rates-newrate4').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-rates-newrate4').hide();
      $('#sole-multi-rates-addnewrate4').show();
      $('#sm-rate6value').val('0');
    });
    $('.primary.sole-multi-rates-newrate5').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-rates-newrate5').show();
      $('#sole-multi-rates-addnewrate5').hide();
      $('#sm-rate7value').val('1');
    });
    $('.nodecoration.rate7-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate7-help').show();
    });
    $('.nodecoration.rate7-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate7-workearn-help').show();
    });
    $('.secondary.sole-multi-rates-newrate5').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-rates-newrate5').hide();
      $('#sole-multi-rates-addnewrate5').show();
      $('#sm-rate7value').val('0');
    });
    $('.primary.sole-multi-rates-newrate6').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-rates-newrate6').show();
      $('#sole-multi-rates-addnewrate6').hide();
      $('#sm-rate8value').val('1');
    });
    $('.nodecoration.rate8-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate8-help').show();
    });
    $('.nodecoration.rate8-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate8-workearn-help').show();
    });
    $('.secondary.sole-multi-rates-newrate6').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-rates-newrate6').hide();
      $('#sole-multi-rates-addnewrate6').show();
      $('#sm-rate8value').val('0');
    });
    $('.primary.sole-multi-rates-newrate7').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-rates-newrate7').show();
      $('#sole-multi-rates-addnewrate7').hide();
      $('#sm-rate9value').val('1');
    });
    $('.nodecoration.rate9-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate9-help').show();
    });
    $('.nodecoration.rate9-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate9-workearn-help').show();
    });
    $('.secondary.sole-multi-rates-newrate7').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-rates-newrate7').hide();
      $('#sole-multi-rates-addnewrate7').show();
      $('#sm-rate9value').val('0');
    });
    $('.primary.sole-multi-rates-newrate8').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-rates-newrate8').show();
      $('#sole-multi-rates-addnewrate8').hide();
      $('#sm-rate10value').val('1');
    });
    $('.nodecoration.rate10-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate10-help').show();
    });
    $('.nodecoration.rate10-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sm-rate9-workearn-help').show();
    });
    $('.secondary.sole-multi-rates-newrate8').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-rates-newrate8').hide();
      $('#sole-multi-rates-addnewrate8').show();
      $('#sm-rate10value').val('0');
    });
    $('#sm-previous-butt').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#general').show();
      $('#sole-multi').hide();
    });
    $('#sm-sum-previous-butt').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-multi-questions').show();
      $('#sole-multi-summary').hide();
    });
    $('.nodecoration.separate-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#separate-help').show();
    });
    $('#is-previous-butt').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#general').show();
      $('#ind-single').hide();
    });
    $('#isy-previous-butt').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#general').show();
      $('#ind-single').hide();
    });
    $('.nodecoration.is-no-work-portion-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#is-no-work-portion-help').show();
    });
    $('#isn-previous-butt').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#general').show();
      $('#ind-single').hide();
    });
    $('#isy-sum-previous-butt').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#ind-single-questions').show();
      $('#ind-yes-single-summary').hide();
    });
    $('#isn-sum-previous-butt').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#ind-single-questions').show();
      $('#ind-no-single-summary').hide();
    });
    $('.nodecoration.psing-annualnet-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-annualNet-help').show();
    });
    $('.nodecoration.psing-part1declare-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-part1declare-help').show();
    });
    $('.nodecoration.psing-part1special-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-part1special-help').show();
    });
    $('.nodecoration.psing-part2declare-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-part2declare-help').show();
    });
    $('.nodecoration.psing-part2special-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-part2special-help').show();
    });
    $('#psing-addnewpartner1 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-newpartner1').show();
      $('#psing-addnewpartner1').hide();
      $('#psing-add3').val('1');
    });
    $('.nodecoration.psing-part3special-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-part3special-help').show();
    });
    $('.nodecoration.psing-part3special-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-part3special-help').show();
    });
    $('.delete-new-rate .secondary.psing-removepartner1').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-newpartner1').hide();
      $('#psing-addnewpartner1').show();
      $('#psing-add3').val('0');
    });
    $('#psing-addnewpartner2 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-newpartner2').show();
      $('#psing-addnewpartner2').hide();
      $('#psing-add4').val('1');
    });
    $('.nodecoration.psing-part4declare-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-part4declare-help').show();
    });
    $('.nodecoration.psing-part4special-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-part4special-help').show();
    });
    $('.delete-new-rate #removePsingPart4').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-newpartner2').hide();
      $('#psing-addnewpartner2').show();
      $('#psing-add4').val('0');
    });
    $('#psing-previous-button').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#general').show();
      $('#partner-no').hide();
    });
    $('.nodecoration.psing-rate-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-rate-help').show();
    });
    $('.nodecoration.psing-work-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-work-help').show();
    });
    $('#psing-previous-button2').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-questions1').show();
      $('#psing-questions2').hide();
    });
    $('#psing-previous-button3a').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-questions1').show();
      $('#psing-summary').hide();
    });
    $('#psing-previous-button3b').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-questions2').show();
      $('#psing-summary').hide();
    });
    $('#psing-previous-button3a').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-questions2').show();
      $('#psing-summary').hide();
    });
    $('.nodecoration.psing-rate-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#psing-rate-help').show();
    });
    $('.nodecoration.pmulti-annualnet-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-annualNet-help').show();
    });
    $('.nodecoration.pmulti-part1declare-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-part1declare-help').show();
    });
    $('.nodecoration.pmulti-part1special-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-part1special-help').show();
    });
    $('.nodecoration.pmulti-part2declare-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-part2declare-help').show();
    });
    $('.nodecoration.pmulti-part2special-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-part2special-help').show();
    });
    $('#pmulti-addnewpartner1 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-newpartner1').show();
      $('#pmulti-addnewpartner1').hide();
      $('#pmulti-add3').val('1');
    });
    $('.nodecoration.pmulti-part3declare-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-part3declare-help').show();
    });
    $('.nodecoration.pmulti-part3special-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-part3special-help').show();
    });
    $('.secondary.pmulti-addnewpartner1').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-newpartner1').hide();
      $('#pmulti-addnewpartner1').show();
      $('#pmulti-add3').val('0');
    });
    $('.secondary.pmulti-addnewpartner1').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-newpartner1').hide();
      $('#pmulti-addnewpartner1').show();
      $('#pmulti-add3').val('0');
    });
    $('.nodecoration.pmulti-part4declare-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-part4declare-help').show();
    });
    $('.nodecoration.pmulti-part4special-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-part4special-help').show();
    });
    $('#removepmultiPart4').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-newpartner2').hide();
      $('#pmulti-addnewpartner2').show();
      $('#pmulti-add4').val('0');
    });
    $('#pmulti-addnewpartner2 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-newpartner2').show();
      $('#pmulti-addnewpartner2').hide();
      $('#pmulti-add4').val('1');
    });
    $('#pmulti-previous-button-1').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#general').show();
      $('#partner-multi-yes').hide();
    });
    $('.nodecoration.pmulti-common-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-common-help').show();
    });
    $('.nodecoration.pmulti-workerPer-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-workerPer-help').show();
    });
    $('.nodecoration.pmulti-rate1-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate1-help').show();
    });
    $('.nodecoration.pmulti-rate1-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate1-workearn-help').show();
    });
    $('.nodecoration.pmulti-rate2-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate2-help').show();
    });
    $('.nodecoration.pmulti-rate2-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate2-workearn-help').show();
    });
    $('#part-multi-rates-addnewrate1 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#part-multi-rates-newrate1').show();
      $('#part-multi-rates-addnewrate1').hide();
      $('#pmulti-rate3value').val('1');
    });
    $('.nodecoration.pmulti-rate3-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate3-help').show();
    });
    $('.nodecoration.pmulti-rate3-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate3-help').show();
    });
    $('.nodecoration.pmulti-rate3-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate3-workearn-help').show();
    });
    $('.secondary.part-multi-rates-newrate1').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#part-multi-rates-newrate1').hide();
      $('#part-multi-rates-addnewrate1').show();
      $('#pmulti-rate3value').val('0');
    });
    $('#part-multi-rates-addnewrate2 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#part-multi-rates-newrate2').show();
      $('#part-multi-rates-addnewrate2').hide();
      $('#pmulti-rate4value').val('1');
    });
    $('.secondary.part-multi-rates-newrate2').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#part-multi-rates-newrate2').hide();
      $('#part-multi-rates-addnewrate2').show();
      $('#pmulti-rate4value').val('0');
    });
    $('#part-multi-rates-addnewrate3 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#part-multi-rates-newrate3').show();
      $('#part-multi-rates-addnewrate3').hide();
      $('#pmulti-rate5value').val('1');
    });
    $('.nodecoration.pmulti-rate5-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate5-help').show();
    });
    $('.nodecoration.pmulti-rate5-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      ('#pmulti-rate5-workearn-help').show();
    });
    $('.nodecoration.pmulti-rate4-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate4-help').show();
    });
    $('.nodecoration.pmulti-rate4-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate4-workearn-help').show();
    });
    $('.secondary.part-multi-rates-newrate3').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#part-multi-rates-newrate3').hide();
      $('#part-multi-rates-addnewrate3').show();
      $('#pmulti-rate5value').val('0');
    });
    $('#part-multi-rates-addnewrate4 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#part-multi-rates-newrate4').show();
      $('#part-multi-rates-addnewrate4').hide();
      $('#pmulti-rate6value').val('1');
    });
    $('.nodecoration.pmulti-rate6-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate6-help').show();
    });
    $('.nodecoration.pmulti-rate6-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate6-workearn-help').show();
    });
    $('.secondary.part-multi-rates-newrate4').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#part-multi-rates-newrate4').hide();
      $('#part-multi-rates-addnewrate4').show();
      $('#pmulti-rate6value').val('0');
    });
    $('#part-multi-rates-addnewrate5 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#part-multi-rates-newrate5').show();
      $('#part-multi-rates-addnewrate5').hide();
      $('#pmulti-rate7value').val('1');
    });
    $('.nodecoration.pmulti-rate7-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate7-help').show();
    });
    $('.nodecoration.pmulti-rate7-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate7-workearn-help').show();
    });
    $('.secondary.part-multi-rates-newrate5').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#part-multi-rates-newrate5').hide();
      $('#part-multi-rates-addnewrate5').show();
      $('#pmulti-rate7value').val('0');
    });
    $('#part-multi-rates-addnewrate6 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#part-multi-rates-newrate6').show();
      $('#part-multi-rates-addnewrate6').hide();
      $('#pmulti-rate8value').val('1');
    });
    $('.nodecoration.pmulti-rate8-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate8-help').show();
    });
    $('.nodecoration.pmulti-rate8-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate8-workearn-help').show();
    });
    $('.secondary.part-multi-rates-newrate6').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#part-multi-rates-newrate6').hide();
      $('#part-multi-rates-addnewrate6').show();
      $('#pmulti-rate8value').val('0');
    });
    $('#part-multi-rates-addnewrate7 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#part-multi-rates-newrate7').show();
      $('#part-multi-rates-addnewrate7').hide();
      $('#pmulti-rate9value').val('1');
    });
    $('.nodecoration.pmulti-rate9-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate9-help').show();
    });
    $('.nodecoration.pmulti-rate9-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate9-workearn-help').show();
    });
    $('.secondary.part-multi-rates-newrate7').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#part-multi-rates-newrate7').hide();
      $('#part-multi-rates-addnewrate7').show();
      $('#pmulti-rate9value').val('0');
    });
    $('#part-multi-rates-addnewrate8 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#part-multi-rates-newrate8').show();
      $('#part-multi-rates-addnewrate8').hide();
      $('#pmulti-rate10value').val('1');
    });
    $('.nodecoration.pmulti-rate10-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate10-help').show();
    });
    $('.nodecoration.pmulti-rate10-workearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-rate10-workearn-help').show();
    });
    $('#removeSMRG3-2').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#part-multi-rates-newrate8').hide();
      $('#part-multi-rates-addnewrate8').show();
      $('#pmulti-rate10value').val('0');
    });
    $('#pmulti-previous-button-2').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-questions1').show();
      $('#pmulti-questions2').hide();
    });
    $('#pmulti-previous-button-3').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#pmulti-questions2').show();
      $('#pmulti-summary').hide();
    });
    $('.nodecoration.corp-single-yes-1eo-annualIE-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-single-yes-1eo-annualIE-help').show();
    });
    $('.nodecoration.corp-single-yes-1eo-exempt-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-single-yes-1eo-qualify-help').show();
    });
    $('#csy1-previous-butt-1').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#general').show();
      $('#corp-single-yes-1eo').hide();
    });
    $('.nodecoration.corp-single-yes-1eo-rate-group-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-single-yes-1eo-rate-group-help').show();
    });
    $('.nodecoration.corp-single-yes-1eo-insEarn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-single-yes-1eo-insEarn-help').show();
    });
    $('#csy1-sum-previous-butt-2').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-single-yes-1eo-questions2').show();
      $('#corp-single-yes-1eo-summary').hide();
    });
    $('.nodecoration.corpm-corpeo1insearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-corpeo1insearn-help').show();
    });
    $('.nodecoration.corpm-corpeo1declare-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-corpeo1declare-help').show();
    });
    $('.nodecoration.corpm-corpeo1special-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-corpeo1special-help').show();
    });
    $('.nodecoration.corpm-corpeo2insearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-corpeo2insearn-help').show();
    });
    $('.nodecoration.corpm-corpeo2declare-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-corpeo2declare-help').show();
    });
    $('.nodecoration.corpm-corpeo2special-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-corpeo2special-help').show();
    });
    $('#corpm-addnewpartner1 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-newpartner1').show();
      $('#corpm-addnewpartner1').hide();
      $('#corpm-add3').val('1');
    });
    $('.nodecoration.corpm-corpeo3insearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-corpeo3insearn-help').show();
    });
    $('.nodecoration.corpm-corpeo3declare-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-corpeo3declare-help').show();
    });
    $('.nodecoration.corpm-corpeo3special-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-corpeo3special-help').show();
    });
    $('.secondary.corpm-addnewpartner1').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-newpartner1').hide();
      $('#corpm-addnewpartner1').show();
      $('#corpm-add3').val('0');
    });
    $('#corpm-addnewpartner2 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-newpartner2').show();
      $('#corpm-addnewpartner2').hide();
      $('#corpm-add4').val('1');
    });
    $('.nodecoration.corpm-corpeo4insearn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-corpeo4insearn-help').show();
    });
    $('.nodecoration.corpm-corpeo4declare-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-corpeo4declare-help').show();
    });
    $('.nodecoration.corpm-corpeo4special-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-corpeo4special-help').show();
    });
    $('#removecorpmcorpeo4').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-newpartner2').hide();
      $('#corpm-addnewpartner2').show();
      $('#corpm-add4').val('0');
    });
    $('#corpm-previous-button').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#general').show();
      $('#corp-single-no-meo').hide();
    });
    $('.nodecoration.corpm-commonw-select-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-commonw-select-help').show();
    });
    $('.nodecoration.corpm-common-work-earn-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-common-work-earn-help').show();
    });
    $('.nodecoration.corpm-rate-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-rate-help').show();
    });
    $('.nodecoration.corpm-work-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-work-help').show();
    });
    $('#corpm-previous-button2').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-questions1').show();
      $('#corpm-questions2').hide();
    });
    $('#corpm-previous-button31').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-questions1').show();
      $('#corpm-summary').hide();
    });
    $('#corpm-previous-button32').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corpm-questions2').show();
      $('#corpm-summary').hide();
    });
    $('.nodecoration.corp-multi-1eo-sr-step2-annual-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step2-annual-earnings-help').show();
    });
    $('.nodecoration.corp-multi-1eo-sr-step2-qualify-755-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step2-qualify-755-help').show();
    });
    $('#corp-multi-1eo-sr-prev-butt').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#general').show();
      $('#corp-multi-1eo-sr').hide();
    });
    $('.nodecoration.corp-multi-1eo-sr-step2-exempt-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step2-exempt-help').show();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-from-activity-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-from-activity-help').show();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-worker-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-worker-earnings-help').show();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group2-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group2-help').show();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group2-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group2-direct-earnings-help').show();
    });
    $('#add-new-rate2 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#rate-group3').show();
      $('#corp-multi-1eo-sr-step3-rate-group3').val(0);
      $('#corp-multi-1eo-sr-step3-rate-group3-direct-earnings').val(0);
      $('#add-new-rate2').hide();$('#delete-new-rate2').hide();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group3-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group3-help').show();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group3-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group3-direct-earnings-help').show();
    });
    $('#delete-new-rate3 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(3 <= 2) return false;
      $('#corp-multi-1eo-sr-step3-rate-group3').val(0);
      $('#corp-multi-1eo-sr-step3-rate-group3-direct-earnings').val(0);
      $('#rate-group3').hide();
      $('#corp-multi-1eo-sr-step3-rate-group3-error').hide();
      $('#corp-multi-1eo-sr-step3-rate-group3-direct-earnings-error').hide();
      $('#add-new-rate2').show();
      $('#delete-new-rate2').show();
    });
    $('#add-new-rate3 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#rate-group4').show();
      $('#corp-multi-1eo-sr-step3-rate-group4').val(0);
      $('#corp-multi-1eo-sr-step3-rate-group4-direct-earnings').val(0);
      $('#add-new-rate3').hide();
      $('#delete-new-rate3').hide();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group4-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group4-help').show();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group4-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group4-direct-earnings-help').show();
    });
    $('#delete-new-rate3.secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(4<=2) return false;
      $('#corp-multi-1eo-sr-step3-rate-group4').val(0);
      $('#corp-multi-1eo-sr-step3-rate-group4-direct-earnings').val(0);
      $('#rate-group4').hide(); $('#corp-multi-1eo-sr-step3-rate-group4-error').hide();
      $('#corp-multi-1eo-sr-step3-rate-group4-direct-earnings-error').hide();
      $('#add-new-rate3').show();$('#delete-new-rate3').show();
    });
    $('#add-new-rate4 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#rate-group5').show();
      $('#corp-multi-1eo-sr-step3-rate-group5').val(0);
      $('#corp-multi-1eo-sr-step3-rate-group5-direct-earnings').val(0);
      $('#add-new-rate4').hide();
      $('#delete-new-rate4').hide();
    });
    $('#delete-new-rate4 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(5 <= 2) return false;
       $('#corp-multi-1eo-sr-step3-rate-group4').val(0);
       $('#corp-multi-1eo-sr-step3-rate-group4-direct-earnings').val(0);
       $('#rate-group4').hide(); $('#corp-multi-1eo-sr-step3-rate-group4-error').hide();
       $('#corp-multi-1eo-sr-step3-rate-group5-direct-earnings-error').hide();
       $('#add-new-rate3').show();
       $('#delete-new-rate3').show();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group5-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group5-help').show();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group5-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group5-direct-earnings-help').show();
    });
    $('#delete-new-rate5 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(5 <= 2) return false;
       $('#corp-multi-1eo-sr-step3-rate-group5').val(0);
       $('#corp-multi-1eo-sr-step3-rate-group5-direct-earnings').val(0);
       $('#rate-group5').hide(); $('#corp-multi-1eo-sr-step3-rate-group5-error').hide();
       $('#corp-multi-1eo-sr-step3-rate-group5-direct-earnings-error').hide();
       $('#add-new-rate4').show();
       $('#delete-new-rate4').show();
    });
    $('#add-new-rate5 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#rate-group6').show();
      $('#corp-multi-1eo-sr-step3-rate-group6').val(0);
      $('#corp-multi-1eo-sr-step3-rate-group6-direct-earnings').val(0);
      $('#add-new-rate5').hide();$('#delete-new-rate5').hide();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group6-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group6-help').show();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group6-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group6-direct-earnings-help').show();
    });
    $('#delete-new-rate6 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(6<=2) return false;
      $('#corp-multi-1eo-sr-step3-rate-group6').val(0);
      $('#corp-multi-1eo-sr-step3-rate-group6-direct-earnings').val(0);
      $('#rate-group6').hide();
      $('#corp-multi-1eo-sr-step3-rate-group6-error').hide();
      $('#corp-multi-1eo-sr-step3-rate-group6-direct-earnings-error').hide();
      $('#add-new-rate5').show();$('#delete-new-rate5').show();
    });
    $('#add-new-rate6 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#rate-group7').show();
      $('#corp-multi-1eo-sr-step3-rate-group7').val(0);
      $('#corp-multi-1eo-sr-step3-rate-group7-direct-earnings').val(0);
      $('#add-new-rate6').hide();
      $('#delete-new-rate6').hide();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group7-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group7-help').show();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group7-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group7-direct-earnings-help').show();
    });
    $('#delete-new-rate7 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(7 <= 2) return false;
      $('#corp-multi-1eo-sr-step3-rate-group7').val(0);
      $('#corp-multi-1eo-sr-step3-rate-group7-direct-earnings').val(0);
      $('#rate-group7').hide();
      $('#corp-multi-1eo-sr-step3-rate-group7-error').hide();
      $('#corp-multi-1eo-sr-step3-rate-group7-direct-earnings-error').hide();
      $('#add-new-rate6').show();$('#delete-new-rate6').show();
    });
    $('#add-new-rate7 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#rate-group8').show();
      $('#corp-multi-1eo-sr-step3-rate-group8').val(0);
      $('#corp-multi-1eo-sr-step3-rate-group8-direct-earnings').val(0);
      $('#add-new-rate7').hide();
      $('#delete-new-rate7').hide();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group8-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group8-help').show();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group8-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group8-direct-earnings-help').show();
    });
    $('#delete-new-rate8 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(8 <= 2) return false;
      $('#corp-multi-1eo-sr-step3-rate-group8').val(0);
      $('#corp-multi-1eo-sr-step3-rate-group8-direct-earnings').val(0);
      $('#rate-group8').hide(); $('#corp-multi-1eo-sr-step3-rate-group8-error').hide();
      $('#corp-multi-1eo-sr-step3-rate-group8-direct-earnings-error').hide();
      $('#add-new-rate7').show();$('#delete-new-rate7').show();
    });
    $('#add-new-rate8 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#rate-group9').show();
      $('#corp-multi-1eo-sr-step3-rate-group9').val(0);
      $('#corp-multi-1eo-sr-step3-rate-group9-direct-earnings').val(0);
      $('#add-new-rate8').hide();$('#delete-new-rate8').hide();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group9-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group9-help').show();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group9-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group9-direct-earnings-help').show();
    });
    $('#delete-new-rate9 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(9&lt;=2) return false;
      $('#corp-multi-1eo-sr-step3-rate-group9').val(0);
      $('#corp-multi-1eo-sr-step3-rate-group9-direct-earnings').val(0);
      $('#rate-group9').hide();
      $('#corp-multi-1eo-sr-step3-rate-group9-error').hide();
      $('#corp-multi-1eo-sr-step3-rate-group9-direct-earnings-error').hide();
      $('#add-new-rate8').show();$('#delete-new-rate8').show();
    });
    $('#add-new-rate9 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#rate-group10').show();
      $('#corp-multi-1eo-sr-step3-rate-group10').val(0);
      $('#corp-multi-1eo-sr-step3-rate-group10-direct-earnings').val(0);
      $('#add-new-rate9').hide();
      $('#delete-new-rate9').hide();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group10-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group10-help').show();
    });
    $('.nodecoration.corp-multi-1eo-sr-step3-rate-group10-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3-rate-group10-direct-earnings-help').show();
    });
    $('#delete-new-rate10 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(10&lt;=2) return false;
      $('#corp-multi-1eo-sr-step3-rate-group10').val(0);
      $('#corp-multi-1eo-sr-step3-rate-group10-direct-earnings').val(0);
      $('#rate-group10').hide();
      $('#corp-multi-1eo-sr-step3-rate-group10-error').hide();
      $('#corp-multi-1eo-sr-step3-rate-group10-direct-earnings-error').hide();
      $('#add-new-rate9').show();$('#delete-new-rate9').show();
    });
    $('#add-new-rate10 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#rate-group11').show();
      $('#corp-multi-1eo-sr-step3-rate-group11').val(0);
      $('#corp-multi-1eo-sr-step3-rate-group11-direct-earnings').val(0);
      $('#add-new-rate10').hide();
      $('#delete-new-rate10').hide();
    });
    $('#previous-corp-multi-1eo-sr').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr').show();
      $('#corp-multi-1eo-sr-step3').hide();
    });
    $('#calculate-button').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr').show();
      $('#corp-multi-1eo-sr-step3').hide();
    });
    $('#previous-corp-multi-yes-meo').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-yes-meo').show();
      $('#corp-multi-yes-meo-step3').show();
      $('#corp-multi-yes-meo-summary').hide();
    });
    $('#another-estimate-click').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-1eo-sr-step3').show();
      $('#corp-multi-1eo-sr-summary').hide();
    });
    $('#corp-multi-yes-meo2-buttons .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#general').show();
      $('#corp-multi-yes-meo').hide();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-from-activity-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-from-activity-help').show();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-worker-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-worker-earnings-help').show();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group1-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group1-help').show();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group2-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group2-help').show();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group2-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group2-direct-earnings-help').show();
    });
    $('#meo-add-new-rate2 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-rate-group3').show();
      $('#meo-corp-multi-1eo-sr-step3-rate-group3').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group3-direct-earnings').val(0);
      $('#meo-add-new-rate2').hide();
      $('#meo-delete-new-rate2').hide();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group3-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group3-help').show();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group3-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group3-direct-earnings-help').show();
    });
    $('#meo-delete-new-rate3 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(3<=2) return false;
      $('#meo-corp-multi-1eo-sr-step3-rate-group3').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group3-direct-earnings').val(0);
      $('#meo-rate-group3').hide();
      $('#meo-corp-multi-1eo-sr-step3-rate-group3-error').hide();
      $('#meo-corp-multi-1eo-sr-step3-rate-group3-direct-earnings-error').hide();
      $('#meo-add-new-rate2').show();
      $('#meo-delete-new-rate2').show();
    });
    $('#meo-add-new-rate3 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-rate-group4').show();
      $('#meo-corp-multi-1eo-sr-step3-rate-group4').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group4-direct-earnings').val(0);
      $('#meo-add-new-rate3').hide();
      $('#meo-delete-new-rate3').hide();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group4-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group4-help').show();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group4-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group4-direct-earnings-help').show();
    });
    $('#meo-delete-new-rate4 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(4<=2) return false;
      $('#meo-corp-multi-1eo-sr-step3-rate-group4').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group4-direct-earnings').val(0);
      $('#meo-rate-group4').hide();
      $('#meo-corp-multi-1eo-sr-step3-rate-group4-error').hide();
      $('#meo-corp-multi-1eo-sr-step3-rate-group4-direct-earnings-error').hide();
      $('#meo-add-new-rate3').show();
      $('#meo-delete-new-rate3').show();
    });
    $('#meo-add-new-rate4 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-rate-group5').show();
      $('#meo-corp-multi-1eo-sr-step3-rate-group5').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group5-direct-earnings').val(0);
      $('#meo-add-new-rate4').hide();
      $('#meo-delete-new-rate4').hide();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group5-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group5-help').show();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group5-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group5-direct-earnings-help').show();
    });
    $('#meo-delete-new-rate5 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(5&lt;=2) return false;
      $('#meo-corp-multi-1eo-sr-step3-rate-group5').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group5-direct-earnings').val(0);
      $('#meo-rate-group5').hide();
      $('#meo-corp-multi-1eo-sr-step3-rate-group5-error').hide();
      $('#meo-corp-multi-1eo-sr-step3-rate-group5-direct-earnings-error').hide();
      $('#meo-add-new-rate4').show();
      $('#meo-delete-new-rate4').show();
    });
    $('#meo-add-new-rate5 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-rate-group6').show();
      $('#meo-corp-multi-1eo-sr-step3-rate-group6').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group6-direct-earnings').val(0);
      $('#meo-add-new-rate5').hide();
      $('#meo-delete-new-rate5').hide();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group6-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group6-help').show();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group6-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group6-direct-earnings-help').show();
    });
    $('#meo-delete-new-rate6 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(6&lt;=2) return false;
      $('#meo-corp-multi-1eo-sr-step3-rate-group6').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group6-direct-earnings').val(0);
      $('#meo-rate-group6').hide();
      $('#meo-corp-multi-1eo-sr-step3-rate-group6-error').hide();
      $('#meo-corp-multi-1eo-sr-step3-rate-group6-direct-earnings-error').hide();
      $('#meo-add-new-rate5').show();
      $('#meo-delete-new-rate5').show();
    });
    $('#meo-add-new-rate6 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-rate-group7').show();
      $('#meo-corp-multi-1eo-sr-step3-rate-group7').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group7-direct-earnings').val(0);
      $('#meo-add-new-rate6').hide();
      $('#meo-delete-new-rate6').hide();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group7-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group7-help').show();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group7-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group7-direct-earnings-help').show();
    });
    $('#meo-delete-new-rate7 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(7<=2) return false;
      $('#meo-corp-multi-1eo-sr-step3-rate-group7').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group7-direct-earnings').val(0);
      $('#meo-rate-group7').hide();
      $('#meo-corp-multi-1eo-sr-step3-rate-group7-error').hide();
      $('#meo-corp-multi-1eo-sr-step3-rate-group7-direct-earnings-error').hide();
      $('#meo-add-new-rate6').show();
      $('#meo-delete-new-rate6').show();
    });
    $('#meo-add-new-rate7 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-rate-group8').show();
      $('#meo-corp-multi-1eo-sr-step3-rate-group8').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group8-direct-earnings').val(0);
      $('#meo-add-new-rate7').hide();
      $('#meo-delete-new-rate7').hide();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group8-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group8-help').show();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group8-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group8-direct-earnings-help').show();
    });
    $('#meo-delete-new-rate8 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(8&lt;=2) return false;
      $('#meo-corp-multi-1eo-sr-step3-rate-group8').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group8-direct-earnings').val(0);
      $('#meo-rate-group8').hide();
      $('#meo-corp-multi-1eo-sr-step3-rate-group8-error').hide();
      $('#meo-corp-multi-1eo-sr-step3-rate-group8-direct-earnings-error').hide();
      $('#meo-add-new-rate7').show();
      $('#meo-delete-new-rate7').show();
    });
    $('#meo-add-new-rate8 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-rate-group9').show();
      $('#meo-corp-multi-1eo-sr-step3-rate-group9').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group9-direct-earnings').val(0);
      $('#meo-add-new-rate8').hide();
      $('#meo-delete-new-rate8').hide();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group9-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group9-help').show();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group9-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group9-direct-earnings-help').show();
    });
    $('#meo-delete-new-rate9 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(9 <= 2) return false;
      $('#meo-corp-multi-1eo-sr-step3-rate-group9').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group9-direct-earnings').val(0);
      $('#meo-rate-group9').hide();
      $('#meo-corp-multi-1eo-sr-step3-rate-group9-error').hide();
      $('#meo-corp-multi-1eo-sr-step3-rate-group9-direct-earnings-error').hide();
      $('#meo-add-new-rate8').show();
      $('#meo-delete-new-rate8').show();
    });
    $('#meo-add-new-rate9 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-rate-group10').show();
      $('#meo-corp-multi-1eo-sr-step3-rate-group10').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group10-direct-earnings').val(0);
      $('#meo-add-new-rate9').hide();
      $('#meo-delete-new-rate9').hide();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group10-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group10-help').show();
    });
    $('.nodecoration.meo-corp-multi-1eo-sr-step3-rate-group10-direct-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-corp-multi-1eo-sr-step3-rate-group10-direct-earnings-help').show();
    });
    $('#meo-delete-new-rate10 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      //if(10 <=2) return false;
      $('#meo-corp-multi-1eo-sr-step3-rate-group10').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group10-direct-earnings').val(0);
      $('#meo-rate-group10').hide();
      $('#meo-corp-multi-1eo-sr-step3-rate-group10-error').hide();
      $('#meo-corp-multi-1eo-sr-step3-rate-group10-direct-earnings-error').hide();
      $('#meo-add-new-rate9').show();
      $('#meo-delete-new-rate9').show();
    });
    $('#meo-add-new-rate10 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-rate-group11').show();
      $('#meo-corp-multi-1eo-sr-step3-rate-group11').val(0);
      $('#meo-corp-multi-1eo-sr-step3-rate-group11-direct-earnings').val(0);
      $('#meo-add-new-rate10').hide();
      $('#meo-delete-new-rate10').hide();
    });
    $('#corp-multi-yes-meo3-buttons .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-multi-yes-meo-step3').hide();
      $('#corp-multi-yes-meo-step2').show();
    });

    $('#delete-new-eo1').hide();
    $('#add-new-eo1').hide();
    $('#add-new-eo4').hide();

    $('#eo-group1 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#eo-group2').show();
      $('#add-new-eo1').hide();
      $('#delete-new-eo1').hide();
      $('#add-new-eo2').show();
      $('#delete-new-eo1').hide();
    });
    $('#eo-group1 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-eo1-corp-multi-1eo-sr-step2-annual-earnings').val(0);
      $('#eo-group1').hide();
      $('#add-new-eo0').show();
      $('#delete-new-eo0').show();
      $('#add-new-eo1').hide();
      $('#delete-new-eo1').hide();
      $('#delete-new-eo2').hide();
    });
    $('#eo-group2 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#eo-group3').show();
      $('#add-new-eo2').hide();
      $('#delete-new-eo2').hide();
      $('#add-new-eo3').show();
      $('#delete-new-eo2').hide();
    });
    $('#eo-group2 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-eo2-corp-multi-1eo-sr-step2-annual-earnings').val(0);
      $('#eo-group2').hide();
      $('#add-new-eo1').show();
      $('#delete-new-eo1').show();
      $('#add-new-eo2').hide();
      $('#delete-new-eo1').hide();
    });
    $('#eo-group3 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#eo-group4').show();
      $('#add-new-eo3').hide();
      $('#delete-new-eo3').hide();
      $('#add-new-eo3').hide();
      $('#delete-new-eo2').hide();
      $('#delete-new-eo1').hide();
    });
    $('#eo-group3 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-eo3-corp-multi-1eo-sr-step2-annual-earnings').val(0);
      $('#eo-group3').hide();
      $('#add-new-eo2').show();
      $('#delete-new-eo2').show();
      $('#add-new-eo3').hide();
      $('#delete-new-eo1').hide();
    });
    $('#eo-group4 .primary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#eo-group5').show();
      $('#add-new-eo4').hide();
      $('#delete-new-eo4').hide();
      $('#add-new-eo4').hide();
      $('#delete-new-eo3').hide();
      $('#delete-new-eo2').hide();
      $('#delete-new-eo1').hide();
    });
    $('#eo-group4 .secondary').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-eo4-corp-multi-1eo-sr-step2-annual-earnings').val(0);
      $('#eo-group4').hide();
      $('#add-new-eo3').show();
      $('#delete-new-eo3').show();
      $('#add-new-eo4').hide();
      $('#delete-new-eo1').hide();
    });

    $('#add-new-eo1').hide();


    $('.nodecoration.showarea.1-annual-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-eo1-corp-multi-1eo-sr-step2-annual-earnings-help').show();
    });
    $('.nodecoration.showarea.2-annual-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-eo2-corp-multi-1eo-sr-step2-annual-earnings-help').show();
    });
    $('.nodecoration.showarea.3-annual-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-eo3-corp-multi-1eo-sr-step2-annual-earnings-help').show();
    });
    $('.nodecoration.showarea.4-annual-earnings-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-eo4-corp-multi-1eo-sr-step2-annual-earnings-help').show();
    });

    $('.nodecoration.showarea.1-exempt-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-eo1-corp-multi-1eo-sr-step2-exempt-help').show();
    });
    $('.nodecoration.showarea.2-exempt-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-eo2-corp-multi-1eo-sr-step2-exempt-help').show();
    });
    $('.nodecoration.showarea.3-exempt-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-eo3-corp-multi-1eo-sr-step2-exempt-help').show();
    });
    $('.nodecoration.showarea.4-exempt-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-eo4-corp-multi-1eo-sr-step2-exempt-help').show();
    });

    $('.nodecoration.showarea.1-qualify-755-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-eo1-corp-multi-1eo-sr-step2-qualify-755-help').show();
    });
    $('.nodecoration.showarea.2-qualify-755-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-eo2-corp-multi-1eo-sr-step2-qualify-755-help').show();
    });
    $('.nodecoration.showarea.3-qualify-755-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-eo3-corp-multi-1eo-sr-step2-qualify-755-help').show();
    });
    $('.nodecoration.showarea.4-qualify-755-help').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#meo-eo4-corp-multi-1eo-sr-step2-qualify-755-help').show();
    });
    $('#csy1-previous-butt-2').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#corp-single-yes-1eo-questions2').hide();
      $('#corp-single-yes-1eo-questions').show();
    });
    $('#ss-summ-previous-butt').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('#sole-single-summary').hide();
      $('#sole-single-questions').show();
    });

  });
})(jQuery);
