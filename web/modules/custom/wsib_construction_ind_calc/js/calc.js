// JavaScript Document
(function($) {
jQuery(function($) {
  //$.metadata.setType('attr', 'meta');
  $('input.auto').autoNumeric();
});

// decimal function
function formatDecimal(argvalue, addzero, decimaln) {
  if (argvalue != "") {
  var numOfDecimal = (decimaln == null) ? 2 : decimaln;
  var number = 1;
  number = Math.pow(10, numOfDecimal);
  argvalue = Math.round(parseFloat(argvalue) * number) / number;
  argvalue = "" + argvalue;
  if (argvalue.indexOf(".") == 0)
  argvalue = "0" + argvalue;
  if (addzero == true) {
  if ((argvalue.indexOf(".") == -1) && (decimaln!=0))
  argvalue = argvalue + ".";
  while ((argvalue.indexOf(".") + 1) > (argvalue.length - numOfDecimal))
  argvalue = argvalue + "0";
  }
  }
  return argvalue;
}

//Clear Form
function ClearForm(){
  document.MyForm.reset();
}

function tostart(){
  location.reload();
}

//Hide pop-up help
$(".closebutton").click(function(){
  $('.hiddencontent').hide();
});

//Reset form
$(".reset-form").click(function(e){
  tostart();
});
//Reset form
$("#reset-form").click(function(e){
  tostart();
});


//Various step button logic
$('#choose-path-butt').click(function(e) {
  e.preventDefault();
  e.stopPropagation();
  choosePath();
});
$('#ss-continue-butt').click(function(e) {
  e.preventDefault();
  e.stopPropagation();
  soleSingle();
});
$('#psing-cont-button').click(function(e) {
  partNoS1();
});
$('#csy1-calc-butt-1').click(function(e) {
  corpYesSingle1();
});
$('#csy1-calc-butt-2').click(function(e) {
  corpYesSingle2();
});
$('#corpm-cont-button').click(function(e) {
  corpMS1();
});
$('#sm-calc-butt').click(function(e) {
  soleMulti();
});
$('#isy-calc-butt').click(function(e) {
  indSingleYes();
});
$('#corpm-calculate-button2').click(function(e) {
  corpMS2();
});
$('#psing-calculate-button2').click(function(e) {
  partNoS2();
});
$('#calculate-button').click(function(e) {
   if (ValidateStep3corpMultiLeoSrCalculate()) {
    corpMultiLeoSrCalculate();
  }
});
$('#isn-calc-butt').click(function(e) {
  indSingleNo();
});
$('#pmulti-cont-button').click(function(e) {
  partMultiS1();
});
$('#pmulti-calc-butt').click(function(e) {
  partMultiS2();
});
$('#continue-3-3').click(function(e) {
  e.preventDefault();
  e.stopPropagation();
  if(ValidateStep2corpMultiLeoSrCalculate()) {
    $('#corp-multi-1eo-sr-step3').show();
    $('#corp-multi-1eo-sr').hide();
  }
});
$('#corp-multi-yes-meo2-buttons .primary').click(function(e) {
  e.preventDefault();
  e.stopPropagation();
  if(ValidateStep2meocorpMultiLeoSrCalculate()) {
    $('#corp-multi-yes-meo-step3').show();
    $('#corp-multi-yes-meo-step2').hide();
  }
});

//Option logic

$('#is-indentifiable-portion').change(function(e) {
  identifyPortionIS();
});
$('#sm-common-option').change(function(e) {
  identifyCommonSM();
});
$('#pmulti-common-option').change(function(e) {
  identifyCommonPM();
});
$('#corp-multi-1eo-sr-step2-exempt').change(function(e) {
  isThisExecutiveOfficerExempt(1,false);
});
$('#meo-eo1-corp-multi-1eo-sr-step2-exempt').change(function(e) {
  isThisExecutiveOfficerExempt(1,true);
});
$('#meo-eo2-corp-multi-1eo-sr-step2-exempt').change(function(e) {
  isThisExecutiveOfficerExempt(2,true);
});
$('#meo-eo3-corp-multi-1eo-sr-step2-exempt').change(function(e) {
  isThisExecutiveOfficerExempt(3,true);
});
$('#meo-eo4-corp-multi-1eo-sr-step2-exempt').change(function(e) {
  isThisExecutiveOfficerExempt(4,true);
});
$('#corp-multi-1eo-sr-step3-from-activity').change(function(e) {
  supportAdministrativeEarnings();
});
$('#meo-corp-multi-1eo-sr-step3-from-activity-2').change(function(e) {
  meosupportAdministrativeEarnings();
});

$('#corp-multi-yes-meo3-buttons .primary').click(function(e) {
  e.preventDefault();
  e.stopPropagation();
  if (ValidateStep3meocorpMultiLeoSrCalculate()) {
    meocorpMultiLeoSrCalculate();
    $('#corp-multi-yes-meo-summary').show();
    $('#corp-multi-yes-meo-step3').hide();
    $('#corp-multi-yes-meo').hide()
  };
});

//Don't show IO if yes workers
$(function() {
  $("#workers").change(function() {
    var cat = document.getElementById("workers");
    var categ = cat.options[cat.selectedIndex].value;
    var subcat = document.getElementById("ownership-type");

    if ( categ * 1 == 0 )  {
      subcat.options.length=0;
      subcat.options[0]=new Option("Please select","0");
    } else if ( categ * 1 == 2 ) {
      subcat.options.length=5;
      subcat.options[0]=new Option("Please select","0");
      subcat.options[1]=new Option("Sole Proprietorship","1");
      subcat.options[2]=new Option("Independent Operator","2");
      subcat.options[3]=new Option("Partnership","3");
      subcat.options[4]=new Option("Corporation with single executive officer","4");
      subcat.options[5]=new Option("Corporation with multiple executive officers","5");
    } else if ( categ * 1 == 1 ) {
      subcat.options.length=4;
      subcat.options[0]=new Option("Please select","0");
      subcat.options[1]=new Option("Sole Proprietorship","1");
      subcat.options[2]=new Option("Partnership","3");
      subcat.options[3]=new Option("Corporation with single executive officer","4");
      subcat.options[4]=new Option("Corporation with multiple executive officers","5");
    }
  });
});

// indentify Ownership Type - if IO then hide reporting frequency
$(function() {
  $(".option2").change(function() {

    var ot = document.getElementById("ownership-type");
    var ownType = ot.options[ot.selectedIndex].value;

    var w1 = document.getElementById("workers");
    var worker1 = w1.options[w1.selectedIndex].value;

    var rows = $('table#path-select-table tr');
    var timely = rows.filter('.display-freq');

    if (( ownType * 1 != 0 ) && ( worker1 * 1 != 0 )){
      if (( ownType * 1 == 2 ) && ( worker1 * 1 != 0 )){
        timely.hide();
        $("#report-frequency").val("1");
        $(".frequency").html( 'annual' );
      } else if (( ownType * 1 == 1 ) && ( worker1 * 1 == 2 )){
        timely.hide();
        $("#report-frequency").val("1");
        $(".frequency").html( 'annual' );
      } else if (( ownType * 1 == 4 ) && ( worker1 * 1 == 2 )){
        timely.hide();
        $("#report-frequency").val("1");
        $(".frequency").html( 'annual' );
      } else {
        timely.show();
        $("#report-frequency").val("0");
      }
    } else {
      timely.hide();
      $("#report-frequency").val("1");
      $(".frequency").html( 'annual' );
    }

  });
});

// if Multi-rate then display Direct Earnings field
$(function() {
  $(".option3").change(function() {
    var w2 = document.getElementById("workers");
    var worker2 = w2.options[w2.selectedIndex].value;

    var ot = document.getElementById("ownership-type");
    var ownType = ot.options[ot.selectedIndex].value;

    var ro = document.getElementById("rate-option");
    var rateOption = ro.options[ro.selectedIndex].value;

    var rows = $('table#path-select-table tr');
    var directs = rows.filter('.display-direct');

    if ( ownType * 1 == 2 ) {
      directs.hide();
      $("#direct-option").val("1");
    } else if (( worker2 * 1 == 1 ) && ( rateOption * 1 == 2 )) {
      directs.show();
      $("#direct-option").val("0");
    } else {
      directs.hide();
      $("#direct-option").val("1");
    }
  });
});

// indentify portion Ind Single
function identifyPortionIS() {
  var ip = document.getElementById("is-indentifiable-portion");
  var indentifyPort = ip.options[ip.selectedIndex].value;

  document.getElementById('is-indentify-portion-yes').style.display='none';
  document.getElementById('is-indentify-portion-no').style.display='none';
  document.getElementById('is-indentify-portion-previous').style.display='block';

  if ( indentifyPort == 0 ) {
    document.getElementById('is-indentify-portion-yes').style.display='none';
    document.getElementById('is-indentify-portion-no').style.display='none';
    document.getElementById('is-indentify-portion-previous').style.display='block';
  } else if ( indentifyPort == 1 ) {
    document.getElementById('is-indentify-portion-yes').style.display='block';
    document.getElementById('is-indentify-portion-no').style.display='none';
    document.getElementById('is-indentify-portion-previous').style.display='none';
  } else if ( indentifyPort == 2 ) {
    document.getElementById('is-indentify-portion-yes').style.display='none';
    document.getElementById('is-indentify-portion-no').style.display='block';
    document.getElementById('is-indentify-portion-previous').style.display='none';
  }
}

// indentify portion Ind Multi
function identifyPortionIM() {
  var ip = document.getElementById("im-indentifiable-portion");
  var indentifyPort = ip.options[ip.selectedIndex].value;

  var rows = $('table.im-indentify-portion-table tr');
  var black = rows.filter('.display-yes');
  var white = rows.filter('.display-no');

  document.getElementById('im-indentify-portion-yes-buttons').style.display='none';
  document.getElementById('im-indentify-portion-no-buttons').style.display='none';

  if ( indentifyPort == 0 ) {
    black.hide();
    white.hide();
    document.getElementById('im-indentify-portion-yes-buttons').style.display='none';
    document.getElementById('im-indentify-portion-no-buttons').style.display='none';
  } else if ( indentifyPort == 1 ) {
    black.show();
    white.hide();
    document.getElementById('im-indentify-portion-yes-buttons').style.display='block';
    document.getElementById('im-indentify-portion-no-buttons').style.display='none';
  } else if ( indentifyPort == 2 ) {
    black.hide();
    white.show();
    document.getElementById('im-indentify-portion-yes-buttons').style.display='none';
    document.getElementById('im-indentify-portion-no-buttons').style.display='block';
  }
}

function identifyPortionIMYesCheck() {
  var annualLabour = document.getElementById("im-yes-annualLP-IOC");
  var result = eval( $(annualLabour).autoNumeric('get') * 1 );

  var annualPortErrField = document.getElementById("im-yes-annual-error");

  document.getElementById('ind-multi-account').style.display='block';
  document.getElementById('im-indentify-portion-yes-rates').style.display='none';

  if ( result * 1 <= 0 ) {
    annualPortErrField.innerHTML = "Please enter a value." ;
  } else {
    annualPortErrField.innerHTML = "" ;
    document.getElementById('ind-multi-account').style.display='none';
    document.getElementById('im-indentify-portion-yes-rates').style.display='block';
  }
}

function identifyPortionIMNoCheck() {
  var annualLabour = document.getElementById("im-no-annualNet");
  var result = eval( $(annualLabour).autoNumeric('get') * 1 );

  var lp = document.getElementById("im-no-work-portion");
  var indentifyLPort = lp.options[lp.selectedIndex].value;

  var annualPortErrField = document.getElementById("im-no-annual-error");
  var workPortErrField = document.getElementById("im-no-work-portion-error");

  document.getElementById('ind-multi-account').style.display='block';
  document.getElementById('im-indentify-portion-no-rates').style.display='none';

  if ( result * 1 <= 0 ) {
    annualPortErrField.innerHTML = "Please enter a value." ;
  } else { annualPortErrField.innerHTML = "" ; }

  if ( indentifyLPort * 1 <= 0 ) {
    workPortErrField.innerHTML = "Please make a selection." ;
  } else { workPortErrField.innerHTML = "" ; }

  if (( result * 1 <= 0 ) || ( indentifyLPort * 1 <= 0 )) {
    document.getElementById('ind-multi-account').style.display='block';
    document.getElementById('im-indentify-portion-no-rates').style.display='none';
  } else {
    document.getElementById('ind-multi-account').style.display='none';
    document.getElementById('im-indentify-portion-no-rates').style.display='block';
  }
}

// reporting frequency
$(function() {
  $("#report-frequency").change(function() {
    var rf = document.getElementById("report-frequency");
    var reportfreq = rf.options[rf.selectedIndex].value;
    var reportingText = rf.options[rf.selectedIndex].text;

    $(".frequency").html( reportingText );
  });
});

// choose path
function choosePath() {
  var w = document.getElementById("workers");
  var worker = w.options[w.selectedIndex].value;
  var workerErrField = document.getElementById("workers-error");
  document.getElementById('workers-error').style.display='none';

  var ot = document.getElementById("ownership-type");
  var ownership = ot.options[ot.selectedIndex].value;
  var ownerErrField = document.getElementById("ownership-error");
  document.getElementById('ownership-error').style.display='none';

  var rt = document.getElementById("rate-option");
  var rateType = rt.options[rt.selectedIndex].value;
  var rateErrField = document.getElementById("rate-error");
  document.getElementById('rate-error').style.display='none';

  var rf = document.getElementById("report-frequency");
  var reportfreq = rf.options[rf.selectedIndex].value;
  var reportErrField = document.getElementById("report-error");
  document.getElementById('report-error').style.display='none';
  var reportingText = rf.options[rf.selectedIndex].text;

  var dio = document.getElementById("direct-option");
  var doption = dio.options[dio.selectedIndex].value;
  var directErrField = document.getElementById("direct-error");
  document.getElementById('direct-error').style.display='none';

  var pswsval = document.getElementById("psing-workers-select");
  var psws = eval( pswsval.value * 1 );

  document.getElementById('general').style.display='block';
  document.getElementById('sole-single').style.display='none';
  document.getElementById('sole-multi').style.display='none';
  document.getElementById('ind-single').style.display='none';
  document.getElementById('partner-no').style.display='none';
  document.getElementById('partner-multi-yes').style.display='none';
  document.getElementById('corp-single-yes-1eo').style.display='none';
  document.getElementById('corp-single-no-meo').style.display='none';
  document.getElementById('corp-multi-1eo-sr').style.display='none';
  document.getElementById('corp-multi-yes-meo').style.display='none';
  document.getElementById('disclaimer').style.display='none';

  /* Errors */

  if ( worker * 1 <= 0 ) {
    document.getElementById('workers-error').style.display='block';
  } else {
    document.getElementById('workers-error').style.display='none';
  }

  if ( ownership * 1 <= 0 ) {
    document.getElementById('ownership-error').style.display='block';
  } else {
    document.getElementById('ownership-error').style.display='none';
  }

  if ( rateType * 1 <= 0 ) {
    document.getElementById('rate-error').style.display='block';
  } else {
    document.getElementById('rate-error').style.display='none';
  }

  if ( doption * 1 <= 0 ) {
    document.getElementById('direct-error').style.display='block';
  } else {
    document.getElementById('direct-error').style.display='none';
  }

  if ( reportfreq * 1 <= 0 ) {
    document.getElementById('report-error').style.display='block';
  } else {
    document.getElementById('report-error').style.display='none';
  }

  /* Errors */

  if ( ( doption == 0 ) || ( worker == 0 ) || ( ownership == 0 ) || ( rateType == 0 ) || ( reportfreq == 0 ) ) {

  } else if ( doption == 2 ) {
    /*Disclaimer*/
    document.getElementById('general').style.display='none';
    document.getElementById('disclaimer').style.display='block';
  } else if ( doption * 1 == 1 ) {
    document.getElementById('disclaimer').style.display='none';

    if ( ( worker == 1 ) && ( ownership == 1 ) && ( rateType == 1 ) && ( reportfreq >= 1 ) ) {
      /*1 : Sole Proprietor - workers - single rate : 'sole-single'*/
      document.getElementById('general').style.display='none';
      document.getElementById('sole-single').style.display='block';
    } else if ( ( worker == 1 ) && ( ownership == 1 ) && ( rateType == 2 ) && ( reportfreq >= 1 ) ) {
      /*2 : Sole Proprietor - workers - multi rate : 'sole-multi'*/
      document.getElementById('general').style.display='none';
      document.getElementById('sole-multi').style.display='block';
      loadRates();
    } else if ( ( worker == 2 ) && ( ownership == 2 ) && ( rateType == 1 ) && ( reportfreq >= 1 ) ) {
      /*3 : Independent Operator - no workers - single rate : 'ind-single'*/
      document.getElementById('general').style.display='none';
      document.getElementById('ind-single').style.display='block';
    } else if ( ( worker == 2 ) && ( ownership == 2 ) && ( rateType == 2 ) && ( reportfreq >= 1 ) ) {
      /*4 : Independent Operator - no workers - multi rate : 'ind-multi'*/
      document.getElementById('general').style.display='none';
      document.getElementById('disclaimer').style.display='block';
    } else if ( ( worker == 2 ) && ( ownership == 3 ) && ( rateType == 1 ) && ( reportfreq >= 1 ) ) {
      /*5 : Partnership - no workers - single rate : 'partner-no'*/
      $('#psing-workers-select').val('0');
      document.getElementById('general').style.display='none';
      document.getElementById('partner-no').style.display='block';
    } else if ( ( worker == 2 ) && ( ownership == 3 ) && ( rateType == 2 ) && ( reportfreq >= 1 ) ) {
      /*5 : Partnership - no workers - multi rate : 'partner-no'*/
      document.getElementById('general').style.display='none';
      document.getElementById('disclaimer').style.display='block';
    } else if ( ( worker == 1 ) && ( ownership == 3 ) && ( rateType == 1 ) && ( reportfreq >= 1 ) ) {
      /*6 : Partnership - workers - single rate : 'partner-single-yes'*/
      $('#psing-workers-select').val('1');
      document.getElementById('general').style.display='none';
      document.getElementById('partner-no').style.display='block';
    } else if ( ( worker == 1 ) && ( ownership == 3 ) && ( rateType == 2 ) && ( reportfreq >= 1 ) ) {
      /*7 : Partnership - workers - multi rate : 'partner-multi-yes'*/
      $('#pmulti-workers-select').val('1');
      document.getElementById('general').style.display='none';
      document.getElementById('partner-multi-yes').style.display='block';
      loadRates();
    } else if ( ( worker == 1 ) && ( ownership == 4 ) && ( rateType == 1 ) && ( reportfreq >= 1 ) ) {
      /*8 : Corporation - single rate - 1 EO - workers : 'corp-single-yes-1eo'*/
      document.getElementById('general').style.display='none';
      document.getElementById('corp-single-yes-1eo').style.display='block';
    } else if ( ( worker == 2 ) && ( ownership == 5 ) && ( rateType == 1 ) && ( reportfreq >= 1 ) ) {
      /*9 : Corporation - single rate - M EO - no workers : 'corp-single-no-meo'*/
      $('#corpm-workers-select').val('0');
      document.getElementById('general').style.display='none';
      document.getElementById('corp-single-no-meo').style.display='block';
    } else if ( ( worker == 1 ) && ( ownership == 5 ) && ( rateType == 1 ) && ( reportfreq >= 1 ) ) {
      /*10 : Corporation - single rate - M EO - workers : 'corp-single-yes-meo'*/
      $('#corpm-workers-select').val('1');
      document.getElementById('general').style.display='none';
      document.getElementById('corp-single-no-meo').style.display='block';
    } else if ( ( worker == 1 ) && ( ownership == 4 ) && ( rateType == 2 ) && ( reportfreq >= 1 ) ) {
      /*11 : Corporation - multi rate - 1 EO - special rate : 'corp-multi-1eo-sr'*/
      document.getElementById('general').style.display='none';
      document.getElementById('corp-multi-1eo-sr').style.display='block';
    } else if ( ( worker == 1 ) && ( ownership == 4 ) && ( rateType == 1 ) && ( reportfreq >= 1 ) ) {
      /*12 : Corporation - multi rate - 1 EO - no special rate : 'corp-multi-1eo-nsr'*/
      document.getElementById('general').style.display='none';
      document.getElementById('disclaimer').style.display='block';
    } else if ( ( worker == 1 ) && ( ownership == 5 ) && ( rateType == 2 ) && ( reportfreq >= 1 ) ) {
      /*13 : Corporation - multi rate - M EO - workers : 'corp-multi-yes-meo'*/
      document.getElementById('general').style.display='none';
      document.getElementById('corp-multi-yes-meo').style.display='block';
    } else if ( ( worker == 2 ) && ( ownership == 5 ) && ( rateType == 2 ) && ( reportfreq >= 1 ) ) {
      /*14 : Corporation - multi rate - M EO - no workers : 'corp-multi-no-meo'*/
      document.getElementById('general').style.display='none';
      document.getElementById('disclaimer').style.display='block';
    } else if ( ( worker == 2 ) && ( ownership == 4 ) && ( rateType == 1 ) && ( reportfreq >= 1 ) ) {
      /*15 : Corporation - single rate - 1 EO - no workers : 'ind-single'*/
      document.getElementById('general').style.display='none';
      document.getElementById('ind-single').style.display='block';
    } else if ( ( worker == 2 ) && ( ownership == 4 ) && ( rateType == 2 ) && ( reportfreq >= 1 ) ) {
      /*16 : Corporation - multi rate - 1 EO - no workers : 'ind-multi'*/
      document.getElementById('general').style.display='none';
      document.getElementById('disclaimer').style.display='block';
    } else if ( ( worker == 2 ) && ( ownership == 1 ) && ( rateType == 1 ) && ( reportfreq >= 1 ) ) {
      /*17 : Sole Proprietor - no workers - single rate : 'ind-single'*/
      document.getElementById('general').style.display='none';
      document.getElementById('ind-single').style.display='block';
    } else if ( ( worker == 2 ) && ( ownership == 1 ) && ( rateType == 2 ) && ( reportfreq >= 1 ) ) {
      /*18 : Sole Proprietor - no workers - multi rate : 'ind-multi'*/
      document.getElementById('general').style.display='none';
      document.getElementById('disclaimer').style.display='block';
    }
  }
}

//check to see if a number is a number
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// ind single rate indentifiable portion yes
function indSingleYes() {
  var salary = document.getElementById("is-yes-annualLP");
  var result = eval( $(salary).autoNumeric('get') * 1 );
  var resultField = document.getElementById("is-yes-result");
  var annualField = document.getElementById("is-yes-annual");

  var e = document.getElementById("report-frequency");
  var strUser = e.options[e.selectedIndex].value;
  var reportingText = e.options[e.selectedIndex].text;
  var reportingField = document.getElementById("is-yes-reporting");
  var rateField = document.getElementById("is-yes-rate-text");

  var high = "90300.00"

  var payperField = document.getElementById("is-yes-payper");
  var payperField2 = document.getElementById("is-yes-payper2");
  var earningPer = document.getElementById("is-yes-earningPer");
  var earningPer2 = document.getElementById("is-yes-earningPer2");

  var rg = document.getElementById("is-yes-rate-group");
  var rateGroup = rg.options[rg.selectedIndex].value;
  var rateGroupText = rg.options[rg.selectedIndex].text;
  var rateGroupField = document.getElementById("is-yes-rate-group-display");
  var rateGroupValueField = document.getElementById("is-yes-rate-group-value-display");

  var rateGroupAdj = eval( rg.value / 100 );

  var calcPremField = document.getElementById("is-yes-calc-prem");

  <!-- defining error fields -->
  var annualErrField = document.getElementById("is-yes-annual-error");
  var rateErrField2 = document.getElementById("is-yes-rate-error2");
  <!-- defining error fields end -->

  <!-- errors -->
  if ( result * 1 <= 0 ) {
    document.getElementById('is-yes-annual-error').style.display='block';
  } else {
    document.getElementById('is-yes-annual-error').style.display='none';
  }

  if ( rateGroup * 1 <= 0 ) {
    document.getElementById('is-yes-rate-error2').style.display='block';
  } else {
    document.getElementById('is-yes-rate-error2').style.display='none';
  }
  <!-- errors end -->

  document.getElementById('ind-single-questions').style.display='block';
  document.getElementById('ind-yes-single-summary').style.display='none';

  <!-- calculation -->
  rateGroupField.innerHTML = rateGroupText ;
  rateGroupValueField.innerHTML = rateGroup ;

  if ( ( result * 1 <= 0 ) || ( rateGroup * 1 <= 0 ) ) {
    return false;
  } else if ( result * 1 >= 90300 ) {
    resultField.innerHTML = high ;
    payperField.innerHTML = formatDecimal( eval( high * 1 ), true, 2 ) ;
    payperField2.innerHTML = formatDecimal( eval( high * 1 ), true, 2 ) ;
    earningPer.innerHTML = formatDecimal( eval(( payperField.innerHTML * 1 ) * rateGroupAdj ), true, 2) ;
    earningPer2.innerHTML = formatDecimal( eval(( payperField.innerHTML * 1 ) * rateGroupAdj ), true, 2) ;
    annualField.innerHTML = formatDecimal( eval( result * 1 ), true, 2 ) ;
    document.getElementById('ind-single-questions').style.display='none';
    document.getElementById('ind-yes-single-summary').style.display='block';
  } else if (( result * 1 > 0 ) && ( result * 1 < 90300 )) {
    resultField.innerHTML = formatDecimal( eval( result * 1 ), true, 2 ) ;
    payperField.innerHTML = formatDecimal( eval( result * 1 ), true, 2 ) ;
    payperField2.innerHTML = formatDecimal( eval( result * 1 ), true, 2 ) ;
    earningPer.innerHTML = formatDecimal( eval(( payperField.innerHTML * 1 ) * rateGroupAdj ), true, 2) ;
    earningPer2.innerHTML = formatDecimal( eval(( payperField.innerHTML * 1 ) * rateGroupAdj ), true, 2) ;
    annualField.innerHTML = formatDecimal( eval( result * 1 ), true, 2 ) ;
    document.getElementById('ind-single-questions').style.display='none';
    document.getElementById('ind-yes-single-summary').style.display='block';
  }
  <!-- calculation end -->
}

// ind single rate indentifiable portion no
function indSingleNo() {
  var salary = document.getElementById("is-no-annualNet");
  var result = eval( $(salary).autoNumeric('get') * 1 );
  var resultField = document.getElementById("is-no-result");
  var annualField = document.getElementById("is-no-annual");

  var e = document.getElementById("report-frequency");
  var strUser = e.options[e.selectedIndex].value;
  var reportingText = e.options[e.selectedIndex].text;
  var reportingField = document.getElementById("is-no-reporting");
  var rateField = document.getElementById("is-no-rate-text");

  var high = "90300.00"

  var pf = document.getElementById("is-no-work-portion");
  var portion = pf.options[pf.selectedIndex].value;
  var portionField = document.getElementById("is-no-portion");
  var estPortionField = document.getElementById("is-no-estPortion");

  var payperField = document.getElementById("is-no-payper");
  var payperField2 = document.getElementById("is-no-payper2");
  var earningPer = document.getElementById("is-no-earningPer");

  var rg = document.getElementById("is-no-rate-group");
  var rateGroup = rg.options[rg.selectedIndex].value;
  var rateGroupText = rg.options[rg.selectedIndex].text;
  var rateGroupField = document.getElementById("is-no-rate-group-display");
  var rateGroupValueField = document.getElementById("is-no-rate-group-value-display");

  var rateGroupAdj = eval( rg.value / 100 );

  var calcPremField = document.getElementById("is-no-calc-prem");
  var calcPremField2 = document.getElementById("is-no-calc-prem2");

  <!-- defining error fields -->
  var annualErrField = document.getElementById("is-no-annual-error");
  var portionErrField = document.getElementById("is-no-work-portion-error");
  var rateErrField2 = document.getElementById("is-no-rate-error2");
  <!-- defining error fields end -->

  <!-- errors -->
  if ( result * 1 <= 0 ) {
    document.getElementById('is-no-annual-error').style.display='block';
  } else {
    document.getElementById('is-no-annual-error').style.display='none';
  }

  if ( portion * 1 <= 0 ) {
    document.getElementById('is-no-work-portion-error').style.display='block';
  } else {
    document.getElementById('is-no-work-portion-error').style.display='none';
  }

  if ( rateGroup * 1 <= 0 ) {
    document.getElementById('is-no-rate-error2').style.display='block';
  } else {
    document.getElementById('is-no-rate-error2').style.display='none';
  } <!-- errors end -->

  document.getElementById('ind-single-questions').style.display='block';
  document.getElementById('ind-no-single-summary').style.display='none';

  <!-- calculation -->

    rateGroupField.innerHTML = rateGroupText ;
    rateGroupValueField.innerHTML = rateGroup ;
    portionField.innerHTML = portion ;
    annualField.innerHTML = formatDecimal( eval( result * 1 ), true, 2 ) ;
    estPortionField.innerHTML = formatDecimal( eval(( result * 1 ) * (( portion * 1 ) / 100 )), true, 2 ) ;

  var adjMax = eval(( result * 1 ) * (( portion * 1 ) / 100 ));

  if ( ( adjMax * 1 <= 0 ) || ( rateGroup * 1 <= 0 ) ) {
    return false;
  } else if ( adjMax * 1 >= 90300 ) {
    resultField.innerHTML = formatDecimal( eval( result * 1 ), true, 2 ) ;
    payperField.innerHTML = formatDecimal( eval( high * 1 ), true, 2 ) ;
    payperField2.innerHTML = formatDecimal( eval( high * 1 ), true, 2 ) ;
    earningPer.innerHTML = formatDecimal( eval(( payperField.innerHTML * 1 ) * rateGroupAdj ), true, 2) ;
    calcPremField.innerHTML = formatDecimal( eval(( payperField.innerHTML * 1 ) * rateGroupAdj ), true, 2) ;
    calcPremField2.innerHTML = formatDecimal( eval(( payperField.innerHTML * 1 ) * rateGroupAdj ), true, 2) ;
    document.getElementById('ind-single-questions').style.display='none';
    document.getElementById('ind-no-single-summary').style.display='block';
  } else if (( adjMax * 1 > 0 ) && ( adjMax * 1 < 90300 )) {
    resultField.innerHTML = formatDecimal( eval( result * 1 ), true, 2 ) ;
    payperField.innerHTML = formatDecimal( eval( adjMax * 1 ), true, 2 ) ;
    payperField2.innerHTML = formatDecimal( eval( adjMax * 1 ), true, 2 ) ;
    earningPer.innerHTML = formatDecimal( eval(( payperField.innerHTML * 1 ) * rateGroupAdj ), true, 2) ;
    calcPremField.innerHTML = formatDecimal( eval(( payperField.innerHTML * 1 ) * rateGroupAdj ), true, 2) ;
    calcPremField2.innerHTML = formatDecimal( eval(( payperField.innerHTML * 1 ) * rateGroupAdj ), true, 2) ;
    document.getElementById('ind-single-questions').style.display='none';
    document.getElementById('ind-no-single-summary').style.display='block';
  }
  <!-- calculation end -->
}

// sole single rate with workers
function soleSingle() {
  var rate=document.getElementById("rate");
  var salary=document.getElementById("ss-annualNet");

  var result = eval( $(salary).autoNumeric('get') * 1 );
  var resultField = document.getElementById("ss-result");
  var resultField2 = document.getElementById("ss-result2");
  var resultField3 = document.getElementById("ss-result3");
  var resultField4 = document.getElementById("ss-result4");
  var annualField = document.getElementById("ss-annual");

  var e = document.getElementById("report-frequency");
  var strUser = e.options[e.selectedIndex].value;
  var reportingText = e.options[e.selectedIndex].text;
  var reportingField = document.getElementById("ss-reporting");
  var rateField1 = document.getElementById("ss-rate-text1");
  var rateField2 = document.getElementById("ss-rate-text2");
  var rateField3 = document.getElementById("ss-rate-text3");

  var high = "90300.00"

  var payperField = document.getElementById("ss-payper");
  var work = document.getElementById("ss-workerPer");
  var workPayPerField = document.getElementById("ss-workPayPer");
  var workPayPerField2 = document.getElementById("ss-workPayPer2");
  var workresult = eval( $(work).autoNumeric('get') / strUser );
  var workPerField = document.getElementById("ss-per-period");

  var rg = document.getElementById("ss-rate-group");
  var rateGroup = rg.options[rg.selectedIndex].value;
  var rateGroupText = rg.options[rg.selectedIndex].text;
  var rateGroupField = document.getElementById("ss-rate-group-display");
  var rateGroupValueField = document.getElementById("ss-rate-group-value-display");

  var rateGroupAdj = eval( rg.value / 100 );

  var calcPremField = document.getElementById("ss-calc-prem");
  var calcPremField2 = document.getElementById("ss-calc-prem2");

  <!-- defining error fields -->
  var reportErrField = document.getElementById("report-error");
  var resultErrField = document.getElementById("ss-result-error");
  var payperErrField = document.getElementById("ss-payper-error");
  var workErrField = document.getElementById("ss-work-error");
  var rateErrField2 = document.getElementById("ss-rate-error2");
  <!-- defining error fields end -->

  <!-- errors -->
  if ( result * 1 == 0 ) {
    document.getElementById('ss-result-error').style.display='block';
  } else {
    document.getElementById('ss-result-error').style.display='none';
  }

  if ( workresult * 1 <= 0 ) {
    document.getElementById('ss-work-error').style.display='block';
  } else {
    document.getElementById('ss-work-error').style.display='none';
  }

  if ( rateGroup * 1 <= 0 ) {
    document.getElementById('ss-rate-error2').style.display='block';
  } else {
    document.getElementById('ss-rate-error2').style.display='none';
  }
  <!-- errors end -->

  document.getElementById('sole-single-summary').style.display='none';
  document.getElementById('sole-single-questions').style.display='block';

  <!-- calculation -->
  if ( ( strUser * 1 <= 0 ) || ( workresult * 1 <= 0 ) || ( result * 1 <= 0 ) || ( rateGroup * 1 <= 0 ) ) {
    return false;
  } else if ( result * 1 >= 90300 ) {
    resultField.innerHTML = high ;
    resultField2.innerHTML = high ;
    resultField3.innerHTML = formatDecimal( eval(( high / strUser ) + workresult ), true, 2) ;
    resultField4.innerHTML = formatDecimal( eval(( high / strUser ) + workresult ), true, 2) ;
    payperField.innerHTML = formatDecimal(( high / strUser ), true, 2 ) ;
    workPayPerField.innerHTML = formatDecimal( eval(( high / strUser ) + workresult ), true, 2) ;
    workPayPerField2.innerHTML = formatDecimal( eval( result * 1 ), true, 2 ) ;
    calcPremField.innerHTML = formatDecimal( eval(( workPayPerField.innerHTML * 1 ) * rateGroupAdj ), true, 2) ;
    calcPremField2.innerHTML = formatDecimal( eval(( workPayPerField.innerHTML * 1 ) * rateGroupAdj ), true, 2) ;
    annualField.innerHTML = formatDecimal( eval( result * 1 ), true, 2 ) ;
    workPerField.innerHTML = formatDecimal( eval( workresult * 1 ), true, 2 ) ;
    rateGroupField.innerHTML = rateGroupText ;
    rateGroupValueField.innerHTML = rateGroup ;
    document.getElementById('sole-single-questions').style.display='none';
    document.getElementById('sole-single-summary').style.display='block';
  } else if (( result * 1 > 0 ) && ( result * 1 < 90300 )) {
    resultField.innerHTML = formatDecimal( result, true, 2 ) ;
    resultField2.innerHTML = formatDecimal( result, true, 2 ) ;
    resultField3.innerHTML = formatDecimal( eval(( result / strUser ) + workresult ), true, 2) ;
    resultField4.innerHTML = formatDecimal( eval(( result / strUser ) + workresult ), true, 2) ;
    payperField.innerHTML = formatDecimal(( result / strUser ), true, 2 ) ;
    workPayPerField.innerHTML = formatDecimal( eval(( result / strUser ) + workresult ), true, 2) ;
    workPayPerField2.innerHTML = formatDecimal( eval( result * 1 ), true, 2 ) ;
    calcPremField.innerHTML = formatDecimal( eval(( workPayPerField.innerHTML * 1 ) * rateGroupAdj ), true, 2) ;
    calcPremField2.innerHTML = formatDecimal( eval(( workPayPerField.innerHTML * 1 ) * rateGroupAdj ), true, 2) ;
    annualField.innerHTML = formatDecimal( eval( result * 1 ), true, 2 ) ;
    workPerField.innerHTML = formatDecimal( eval( workresult * 1 ), true, 2 ) ;
    rateGroupField.innerHTML = rateGroupText ;
    rateGroupValueField.innerHTML = rateGroup ;
    document.getElementById('sole-single-questions').style.display='none';
    document.getElementById('sole-single-summary').style.display='block';
  }
  <!-- calculation end -->
}

//Sole Multi Direct Earnings filter
function identifyCommonSM() {
  var sco = document.getElementById("sm-common-option");
  var indentifyComm = sco.options[sco.selectedIndex].value;

  var rows = $('table#sm-step2 tr');
  var black = rows.filter('.sm-display-common');

  if ( indentifyComm == 0 ) {
    black.hide();
  } else if ( indentifyComm == 1 ) {
    black.show();
  } else if ( indentifyComm == 2 ) {
    black.hide();
  }
}

// sole multi rate with workers
function soleMulti() {
  var rate=document.getElementById("rate");
  var salary=document.getElementById("sm-annualNet");
  var result = eval( $(salary).autoNumeric('get') * 1 );
  var resultField = document.getElementById("sm-result");
  var annualField = document.getElementById("sm-annual");
  var annualField2 = document.getElementById("sm-annual2");

  var e = document.getElementById("report-frequency");
  var strUser = e.options[e.selectedIndex].value;
  var reportingText = e.options[e.selectedIndex].text;
  var reportingField = document.getElementById("sm-reporting");

  var cs = document.getElementById("sm-common-option");
  var commonVal = cs.options[cs.selectedIndex].value;
  var commonValue = cs.options[cs.selectedIndex].text;
  var commonField1 = document.getElementById("sm-common-result");

  var high = "90300.00"

  var payperField = document.getElementById("sm-payper");
  var work = document.getElementById("sm-workerPer");
  var workPayPerField = document.getElementById("sm-workPayPer");
  var workresult = eval( $(work).autoNumeric('get') / strUser );
  var workPerField = document.getElementById("sm-per-period");

  var rg1 = document.getElementById("sm-rate1");
  var rateGroup1 = rg1.options[rg1.selectedIndex].value;
  var rateGroupText1 = rg1.options[rg1.selectedIndex].text;
  var rateGroupField1 = document.getElementById("sm-rate1-display");
  var rateGroupValueField1 = document.getElementById("sm-rate1-value-display");

  var rg2 = document.getElementById("sm-rate2-select1");
  var rateGroup2 = rg2.options[rg2.selectedIndex].value;
  var rateGroupText2 = rg2.options[rg2.selectedIndex].text;
  var rateGroupField2 = document.getElementById("sm-rate2-display");
  var rateGroupValueField2 = document.getElementById("sm-rate2-value-display");

  var rg3 = document.getElementById("sm-rate3-select1");
  var rateGroup3 = rg3.options[rg3.selectedIndex].value;
  var rateGroupText3 = rg3.options[rg3.selectedIndex].text;
  var rateGroupField3 = document.getElementById("sm-rate3-display");
  var rateGroupValueField3 = document.getElementById("sm-rate3-value-display");
  var rateGroup3val = document.getElementById("sm-rate3value");
  var rateGroup3value = eval( rateGroup3val.value * 1 );

  var rg4 = document.getElementById("sm-rate4-select1");
  var rateGroup4 = rg4.options[rg4.selectedIndex].value;
  var rateGroupText4 = rg4.options[rg4.selectedIndex].text;
  var rateGroupField4 = document.getElementById("sm-rate4-display");
  var rateGroupValueField4 = document.getElementById("sm-rate4-value-display");
  var rateGroup4val = document.getElementById("sm-rate4value");
  var rateGroup4value = eval( rateGroup4val.value * 1 );

  var rg5 = document.getElementById("sm-rate5-select1");
  var rateGroup5 = rg5.options[rg5.selectedIndex].value;
  var rateGroupText5 = rg5.options[rg5.selectedIndex].text;
  var rateGroupField5 = document.getElementById("sm-rate5-display");
  var rateGroupValueField5 = document.getElementById("sm-rate5-value-display");
  var rateGroup5val = document.getElementById("sm-rate5value");
  var rateGroup5value = eval( rateGroup5val.value * 1 );

  var rg6 = document.getElementById("sm-rate6-select1");
  var rateGroup6 = rg6.options[rg6.selectedIndex].value;
  var rateGroupText6 = rg6.options[rg6.selectedIndex].text;
  var rateGroupField6 = document.getElementById("sm-rate6-display");
  var rateGroupValueField6 = document.getElementById("sm-rate6-value-display");
  var rateGroup6val = document.getElementById("sm-rate6value");
  var rateGroup6value = eval( rateGroup6val.value * 1 );

  var rg7 = document.getElementById("sm-rate7-select1");
  var rateGroup7 = rg7.options[rg7.selectedIndex].value;
  var rateGroupText7 = rg7.options[rg7.selectedIndex].text;
  var rateGroupField7 = document.getElementById("sm-rate7-display");
  var rateGroupValueField7 = document.getElementById("sm-rate7-value-display");
  var rateGroup7val = document.getElementById("sm-rate7value");
  var rateGroup7value = eval( rateGroup7val.value * 1 );

  var rg8 = document.getElementById("sm-rate8-select1");
  var rateGroup8 = rg8.options[rg8.selectedIndex].value;
  var rateGroupText8 = rg8.options[rg8.selectedIndex].text;
  var rateGroupField8 = document.getElementById("sm-rate8-display");
  var rateGroupValueField8 = document.getElementById("sm-rate8-value-display");
  var rateGroup8val = document.getElementById("sm-rate8value");
  var rateGroup8value = eval( rateGroup8val.value * 1 );

  var rg9 = document.getElementById("sm-rate9-select1");
  var rateGroup9 = rg9.options[rg9.selectedIndex].value;
  var rateGroupText9 = rg9.options[rg9.selectedIndex].text;
  var rateGroupField9 = document.getElementById("sm-rate9-display");
  var rateGroupValueField9 = document.getElementById("sm-rate9-value-display");
  var rateGroup9val = document.getElementById("sm-rate9value");
  var rateGroup9value = eval( rateGroup9val.value * 1 );

  var rg10 = document.getElementById("sm-rate10-select1");
  var rateGroup10 = rg10.options[rg10.selectedIndex].value;
  var rateGroupText10 = rg10.options[rg10.selectedIndex].text;
  var rateGroupField10 = document.getElementById("sm-rate10-display");
  var rateGroupValueField10 = document.getElementById("sm-rate10-value-display");
  var rateGroup10val = document.getElementById("sm-rate10value");
  var rateGroup10value = eval( rateGroup10val.value * 1 );

  var rateGroup1Adj = eval( rg1.value / 100 );
  console.log('rateGroup1Adj: ' + rateGroup1Adj);

  var rateGroup2Adj = eval( rg2.value / 100 );
  var rateGroup3Adj = eval( rg3.value / 100 );
  var rateGroup4Adj = eval( rg4.value / 100 );
  var rateGroup5Adj = eval( rg5.value / 100 );
  var rateGroup6Adj = eval( rg6.value / 100 );
  var rateGroup7Adj = eval( rg7.value / 100 );
  var rateGroup8Adj = eval( rg8.value / 100 );
  var rateGroup9Adj = eval( rg9.value / 100 );
  var rateGroup10Adj = eval( rg10.value / 100 );

  var rate1WorkEarn=document.getElementById("sm-rate1-workearn");
  var rate1WorkEarnResult = eval( $(rate1WorkEarn).autoNumeric('get') * 1 );
  var rate1WorkEarnDisplay=document.getElementById("sm-rate1-workearnD");

  var rate2WorkEarn=document.getElementById("sm-rate2-workearn");
  var rate2WorkEarnResult = eval( $(rate2WorkEarn).autoNumeric('get') * 1 );
  var rate2WorkEarnDisplay=document.getElementById("sm-rate2-workearnD");

  var rate3WorkEarn=document.getElementById("sm-rate3-workearn");
  var rate3WorkEarnResult = eval( $(rate3WorkEarn).autoNumeric('get') * 1 );
  var rate3WorkEarnDisplay=document.getElementById("sm-rate3-workearnD");

  var rate4WorkEarn=document.getElementById("sm-rate4-workearn");
  var rate4WorkEarnResult = eval( $(rate4WorkEarn).autoNumeric('get') * 1 );
  var rate4WorkEarnDisplay=document.getElementById("sm-rate4-workearnD");

  var rate5WorkEarn=document.getElementById("sm-rate5-workearn");
  var rate5WorkEarnResult = eval( $(rate5WorkEarn).autoNumeric('get') * 1 );
  var rate5WorkEarnDisplay=document.getElementById("sm-rate5-workearnD");

  var rate6WorkEarn=document.getElementById("sm-rate6-workearn");
  var rate6WorkEarnResult = eval( $(rate6WorkEarn).autoNumeric('get') * 1 );
  var rate6WorkEarnDisplay=document.getElementById("sm-rate6-workearnD");

  var rate7WorkEarn=document.getElementById("sm-rate7-workearn");
  var rate7WorkEarnResult = eval( $(rate7WorkEarn).autoNumeric('get') * 1 );
  var rate7WorkEarnDisplay=document.getElementById("sm-rate7-workearnD");

  var rate8WorkEarn=document.getElementById("sm-rate8-workearn");
  var rate8WorkEarnResult = eval( $(rate8WorkEarn).autoNumeric('get') * 1 );
  var rate8WorkEarnDisplay=document.getElementById("sm-rate8-workearnD");

  var rate9WorkEarn=document.getElementById("sm-rate9-workearn");
  var rate9WorkEarnResult = eval( $(rate9WorkEarn).autoNumeric('get') * 1 );
  var rate9WorkEarnDisplay=document.getElementById("sm-rate9-workearnD");

  var rate10WorkEarn=document.getElementById("sm-rate10-workearn");
  var rate10WorkEarnResult = eval( $(rate10WorkEarn).autoNumeric('get') * 1 );
  var rate10WorkEarnDisplay=document.getElementById("sm-rate10-workearnD");

  var totalDirectField = document.getElementById("sm-totalDirect");

  var percentRate1Field = document.getElementById("sm-percentRate1");
  var percentRate2Field = document.getElementById("sm-percentRate2");
  var percentRate3Field = document.getElementById("sm-percentRate3");
  var percentRate4Field = document.getElementById("sm-percentRate4");
  var percentRate5Field = document.getElementById("sm-percentRate5");
  var percentRate6Field = document.getElementById("sm-percentRate6");
  var percentRate7Field = document.getElementById("sm-percentRate7");
  var percentRate8Field = document.getElementById("sm-percentRate8");
  var percentRate9Field = document.getElementById("sm-percentRate9");
  var percentRate10Field = document.getElementById("sm-percentRate10");

  var proratedRate1Field = document.getElementById("sm-proratedRate1");
  var proratedRate2Field = document.getElementById("sm-proratedRate2");
  var proratedRate3Field = document.getElementById("sm-proratedRate3");
  var proratedRate4Field = document.getElementById("sm-proratedRate4");
  var proratedRate5Field = document.getElementById("sm-proratedRate5");
  var proratedRate6Field = document.getElementById("sm-proratedRate6");
  var proratedRate7Field = document.getElementById("sm-proratedRate7");
  var proratedRate8Field = document.getElementById("sm-proratedRate8");
  var proratedRate9Field = document.getElementById("sm-proratedRate9");
  var proratedRate10Field = document.getElementById("sm-proratedRate10");

  var totalInsEarnRate1Field = document.getElementById("sm-totalInsEarnRate1");
  var totalInsEarnRate2Field = document.getElementById("sm-totalInsEarnRate2");
  var totalInsEarnRate3Field = document.getElementById("sm-totalInsEarnRate3");
  var totalInsEarnRate4Field = document.getElementById("sm-totalInsEarnRate4");
  var totalInsEarnRate5Field = document.getElementById("sm-totalInsEarnRate5");
  var totalInsEarnRate6Field = document.getElementById("sm-totalInsEarnRate6");
  var totalInsEarnRate7Field = document.getElementById("sm-totalInsEarnRate7");
  var totalInsEarnRate8Field = document.getElementById("sm-totalInsEarnRate8");
  var totalInsEarnRate9Field = document.getElementById("sm-totalInsEarnRate9");
  var totalInsEarnRate10Field = document.getElementById("sm-totalInsEarnRate10");

  var totalCurrentPremiumRate1Field = document.getElementById("sm-totalCurrentPremiumRate1");
  var totalCurrentPremiumRate2Field = document.getElementById("sm-totalCurrentPremiumRate2");
  var totalCurrentPremiumRate3Field = document.getElementById("sm-totalCurrentPremiumRate3");
  var totalCurrentPremiumRate4Field = document.getElementById("sm-totalCurrentPremiumRate4");
  var totalCurrentPremiumRate5Field = document.getElementById("sm-totalCurrentPremiumRate5");
  var totalCurrentPremiumRate6Field = document.getElementById("sm-totalCurrentPremiumRate6");
  var totalCurrentPremiumRate7Field = document.getElementById("sm-totalCurrentPremiumRate7");
  var totalCurrentPremiumRate8Field = document.getElementById("sm-totalCurrentPremiumRate8");
  var totalCurrentPremiumRate9Field = document.getElementById("sm-totalCurrentPremiumRate9");
  var totalCurrentPremiumRate10Field = document.getElementById("sm-totalCurrentPremiumRate10");

  var calcPremField = document.getElementById("sm-calc-prem");
  var calcPremField2 = document.getElementById("sm-calc-prem2");

  <!-- defining error fields -->
  var reportErrField = document.getElementById("report-error");
  var resultErrField = document.getElementById("sm-annualNet-error");
  var payperErrField = document.getElementById("sm-payper-error");
  var workErrField = document.getElementById("sm-workerPer-error");

  var rate1ErrField = document.getElementById("sm-rate1-error");
  var rate2ErrField = document.getElementById("sm-rate2-error");
  var rate3ErrField = document.getElementById("sm-rate3-error");
  var rate4ErrField = document.getElementById("sm-rate4-error");
  var rate5ErrField = document.getElementById("sm-rate5-error");
  var rate6ErrField = document.getElementById("sm-rate6-error");
  var rate7ErrField = document.getElementById("sm-rate7-error");
  var rate8ErrField = document.getElementById("sm-rate8-error");
  var rate9ErrField = document.getElementById("sm-rate9-error");
  var rate10ErrField = document.getElementById("sm-rate10-error");

  var rate1WorkEarnErrField = document.getElementById("sm-rate1-workearn-error");
  var rate2WorkEarnErrField = document.getElementById("sm-rate2-workearn-error");
  var rate3WorkEarnErrField = document.getElementById("sm-rate3-workearn-error");
  var rate4WorkEarnErrField = document.getElementById("sm-rate4-workearn-error");
  var rate5WorkEarnErrField = document.getElementById("sm-rate5-workearn-error");
  var rate6WorkEarnErrField = document.getElementById("sm-rate6-workearn-error");
  var rate7WorkEarnErrField = document.getElementById("sm-rate7-workearn-error");
  var rate8WorkEarnErrField = document.getElementById("sm-rate8-workearn-error");
  var rate9WorkEarnErrField = document.getElementById("sm-rate9-workearn-error");
  var rate10WorkEarnErrField = document.getElementById("sm-rate10-workearn-error");
  <!-- defining error fields end -->

  <!-- errors -->
  if ( result * 1 <= 0 ) {
    document.getElementById('sm-annualNet-error').style.display='block';
  } else {
    document.getElementById('sm-annualNet-error').style.display='none';
  }

  if ( commonVal * 1 <= 0 ) {
    document.getElementById('sm-common-error').style.display='block';
  } else {
    document.getElementById('sm-common-error').style.display='none';
  }

  if (( commonVal * 1 == 1 ) && ( workresult * 1 <= 0 )) {
    document.getElementById('sm-workerPer-error').style.display='block';
  } else {
    document.getElementById('sm-workerPer-error').style.display='none';
  }

  if ( rateGroup1 * 1 <= 0 ) {
    document.getElementById('sm-rate1-error').style.display='block';
  } else {
    document.getElementById('sm-rate1-error').style.display='none';
  }

  if ( rate1WorkEarnResult * 1 <= 0 ) {
    document.getElementById('sm-rate1-workearn-error').style.display='block';
  } else {
    document.getElementById('sm-rate1-workearn-error').style.display='none';
  }

  if ( rateGroup2 * 1 <= 0 ) {
    document.getElementById('sm-rate2-error').style.display='block';
  } else {
    document.getElementById('sm-rate2-error').style.display='none';
  }

  if ( rate2WorkEarnResult * 1 <= 0 ) {
    document.getElementById('sm-rate2-workearn-error').style.display='block';
  } else {
    document.getElementById('sm-rate2-workearn-error').style.display='none';
  }

  if ( rateGroup3value * 1 == 1 ) {
    if ( rateGroup3 * 1 <= 0 ) {
      document.getElementById('sm-rate3-error').style.display='block';
    } else {
      document.getElementById('sm-rate3-error').style.display='none';
    }

    if ( rate3WorkEarnResult * 1 <= 0 ) {
      document.getElementById('sm-rate3-workearn-error').style.display='block';
    } else {
      document.getElementById('sm-rate3-workearn-error').style.display='none';
    }
  } else if ( rateGroup3value * 1 == 0 ) {
    rateGroup3 = 0 ;
    rate3WorkEarnResult = 0 ;

    document.getElementById('sm-rate3-error').style.display='none';
    document.getElementById('sm-rate3-workearn-error').style.display='none';
  }


  if ( rateGroup4value * 1 == 1 ) {
    if ( rateGroup4 * 1 <= 0 ) {
      document.getElementById('sm-rate4-error').style.display='block';
    } else {
      document.getElementById('sm-rate4-error').style.display='none';
    }

    if ( rate4WorkEarnResult * 1 <= 0 ) {
      document.getElementById('sm-rate4-workearn-error').style.display='block';
    } else {
      document.getElementById('sm-rate4-workearn-error').style.display='none';
    }
  } else if ( rateGroup4value * 1 == 0 ) {
    rateGroup4 = 0 ;
    rate4WorkEarnResult = 0 ;

    document.getElementById('sm-rate4-error').style.display='none';
    document.getElementById('sm-rate4-workearn-error').style.display='none';
  }

  if ( rateGroup5value * 1 == 1 ) {
    if ( rateGroup5 * 1 <= 0 ) {
      document.getElementById('sm-rate5-error').style.display='block';
    } else {
      document.getElementById('sm-rate5-error').style.display='none';
    }

    if ( rate5WorkEarnResult * 1 <= 0 ) {
      document.getElementById('sm-rate5-workearn-error').style.display='block';
    } else {
      document.getElementById('sm-rate5-workearn-error').style.display='none';
    }
  } else if ( rateGroup5value * 1 == 0 ) {
    rateGroup5 = 0 ;
    rate5WorkEarnResult = 0 ;

    document.getElementById('sm-rate5-error').style.display='none';
    document.getElementById('sm-rate5-workearn-error').style.display='none';
  }

  if ( rateGroup6value * 1 == 1 ) {
    if ( rateGroup6 * 1 <= 0 ) {
      document.getElementById('sm-rate6-error').style.display='block';
    } else {
      document.getElementById('sm-rate6-error').style.display='none';
    }

    if ( rate6WorkEarnResult * 1 <= 0 ) {
      document.getElementById('sm-rate6-workearn-error').style.display='block';
    } else {
      document.getElementById('sm-rate6-workearn-error').style.display='none';
    }
  } else if ( rateGroup6value * 1 == 0 ) {
    rateGroup6 = 0 ;
    rate6WorkEarnResult = 0 ;

    document.getElementById('sm-rate6-error').style.display='none';
    document.getElementById('sm-rate6-workearn-error').style.display='none';
  }

  if ( rateGroup7value * 1 == 1 ) {
    if ( rateGroup7 * 1 <= 0 ) {
      document.getElementById('sm-rate7-error').style.display='block';
    } else {
      document.getElementById('sm-rate7-error').style.display='none';
    }

    if ( rate7WorkEarnResult * 1 <= 0 ) {
      document.getElementById('sm-rate7-workearn-error').style.display='block';
    } else {
      document.getElementById('sm-rate7-workearn-error').style.display='none';
    }
  } else if ( rateGroup7value * 1 == 0 ) {
    rateGroup7 = 0 ;
    rate7WorkEarnResult = 0 ;

    document.getElementById('sm-rate7-error').style.display='none';
    document.getElementById('sm-rate7-workearn-error').style.display='none';
  }

  if ( rateGroup8value * 1 == 1 ) {
    if ( rateGroup8 * 1 <= 0 ) {
      document.getElementById('sm-rate8-error').style.display='block';
    } else {
      document.getElementById('sm-rate8-error').style.display='none';
    }

    if ( rate8WorkEarnResult * 1 <= 0 ) {
      document.getElementById('sm-rate8-workearn-error').style.display='block';
    } else {
      document.getElementById('sm-rate8-workearn-error').style.display='none';
    }
  } else if ( rateGroup8value * 1 == 0 ) {
    rateGroup8 = 0 ;
    rate8WorkEarnResult = 0 ;

    document.getElementById('sm-rate8-error').style.display='none';
    document.getElementById('sm-rate8-workearn-error').style.display='none';
  }

  if ( rateGroup9value * 1 == 1 ) {
    if ( rateGroup9 * 1 <= 0 ) {
      document.getElementById('sm-rate9-error').style.display='block';
    } else {
      document.getElementById('sm-rate9-error').style.display='none';
    }

    if ( rate9WorkEarnResult * 1 <= 0 ) {
      document.getElementById('sm-rate9-workearn-error').style.display='block';
    } else {
      document.getElementById('sm-rate9-workearn-error').style.display='none';
    }
  } else if ( rateGroup9value * 1 == 0 ) {
    rateGroup9 = 0 ;
    rate9WorkEarnResult = 0 ;

    document.getElementById('sm-rate9-error').style.display='none';
    document.getElementById('sm-rate9-workearn-error').style.display='none';
  }

  if ( rateGroup10value * 1 == 1 ) {
    if ( rateGroup10 * 1 <= 0 ) {
      document.getElementById('sm-rate10-error').style.display='block';
    } else {
      document.getElementById('sm-rate10-error').style.display='none';
    }

    if ( rate10WorkEarnResult * 1 <= 0 ) {
      document.getElementById('sm-rate10-workearn-error').style.display='block';
    } else {
      document.getElementById('sm-rate10-workearn-error').style.display='none';
    }
  } else if ( rateGroup10value * 1 == 0 ) {
    rateGroup10 = 0 ;
    rate10WorkEarnResult = 0 ;

    document.getElementById('sm-rate10-error').style.display='none';
    document.getElementById('sm-rate10-workearn-error').style.display='none';
  }

  <!-- errors end -->

  var rows = $('table#sole-multi-summary-table tr');
  var row3 = rows.filter('.display-rg3');
  var row4 = rows.filter('.display-rg4');
  var row5 = rows.filter('.display-rg5');
  var row6 = rows.filter('.display-rg6');
  var row7 = rows.filter('.display-rg7');
  var row8 = rows.filter('.display-rg8');
  var row9 = rows.filter('.display-rg9');
  var row10 = rows.filter('.display-rg10');

  if ( rateGroup3value * 1 == 0 ) { row3.hide(); } else { row3.show(); }
  if ( rateGroup4value * 1 == 0 ) { row4.hide(); } else { row4.show(); }
  if ( rateGroup5value * 1 == 0 ) { row5.hide(); } else { row5.show(); }
  if ( rateGroup6value * 1 == 0 ) { row6.hide(); } else { row6.show(); }
  if ( rateGroup7value * 1 == 0 ) { row7.hide(); } else { row7.show(); }
  if ( rateGroup8value * 1 == 0 ) { row8.hide(); } else { row8.show(); }
  if ( rateGroup9value * 1 == 0 ) { row9.hide(); } else { row9.show(); }
  if ( rateGroup10value * 1 == 0 ) { row10.hide(); } else { row10.show(); }

  document.getElementById('sole-multi-summary').style.display='none';
  document.getElementById('sole-multi-questions').style.display='block';

  /*( strUser * 1 <= 0 ) || ( workresult * 1 <= 0 ) || ( result * 1 <= 0 ) || ( rateGroup * 1 <= 0 ) */
  <!-- calculation -->

  if ($("#sole-multi-questions span.error:visible").length) {
    return false;
  }

  if ( result * 1 <= 0 ) {
    resultField.innerHTML = "" ;
    annualField.innerHTML = "" ;
    annualField2.innerHTML = "" ;
    payperField.innerHTML = "" ;
    commonField1.innerHTML = commonValue ;
    workPayPerField.innerHTML = "" ;
    workPerField.innerHTML = "" ;
    rateGroupField1.innerHTML = "" ;
    rateGroupField2.innerHTML = "" ;
    rateGroupField3.innerHTML = "" ;
    rateGroupField4.innerHTML = "" ;
    rateGroupField5.innerHTML = "" ;
    rateGroupField6.innerHTML = "" ;
    rateGroupField7.innerHTML = "" ;
    rateGroupField8.innerHTML = "" ;
    rateGroupField9.innerHTML = "" ;
    rateGroupField10.innerHTML = "" ;
    rateGroupValueField1.innerHTML = "" ;
    rateGroupValueField2.innerHTML = "" ;
    rateGroupValueField3.innerHTML = "" ;
    rateGroupValueField4.innerHTML = "" ;
    rateGroupValueField5.innerHTML = "" ;
    rateGroupValueField6.innerHTML = "" ;
    rateGroupValueField7.innerHTML = "" ;
    rateGroupValueField8.innerHTML = "" ;
    rateGroupValueField9.innerHTML = "" ;
    rateGroupValueField10.innerHTML = "" ;
    rate1WorkEarnDisplay.innerHTML = "" ;
    rate2WorkEarnDisplay.innerHTML = "" ;
    rate3WorkEarnDisplay.innerHTML = "" ;
    rate4WorkEarnDisplay.innerHTML = "" ;
    rate5WorkEarnDisplay.innerHTML = "" ;
    rate6WorkEarnDisplay.innerHTML = "" ;
    rate7WorkEarnDisplay.innerHTML = "" ;
    rate8WorkEarnDisplay.innerHTML = "" ;
    rate9WorkEarnDisplay.innerHTML = "" ;
    rate10WorkEarnDisplay.innerHTML = "" ;
    totalDirectField.innerHTML = "" ;
    percentRate1Field.innerHTML = "" ;
    percentRate2Field.innerHTML = "" ;
    percentRate3Field.innerHTML = "" ;
    percentRate4Field.innerHTML = "" ;
    percentRate5Field.innerHTML = "" ;
    percentRate6Field.innerHTML = "" ;
    percentRate7Field.innerHTML = "" ;
    percentRate8Field.innerHTML = "" ;
    percentRate9Field.innerHTML = "" ;
    percentRate10Field.innerHTML = "" ;
    proratedRate1Field.innerHTML = "" ;
    proratedRate2Field.innerHTML = "" ;
    proratedRate3Field.innerHTML = "" ;
    proratedRate4Field.innerHTML = "" ;
    proratedRate5Field.innerHTML = "" ;
    proratedRate6Field.innerHTML = "" ;
    proratedRate7Field.innerHTML = "" ;
    proratedRate8Field.innerHTML = "" ;
    proratedRate9Field.innerHTML = "" ;
    proratedRate10Field.innerHTML = "" ;
    totalInsEarnRate1Field.innerHTML = "" ;
    totalInsEarnRate2Field.innerHTML = "" ;
    totalInsEarnRate3Field.innerHTML = "" ;
    totalInsEarnRate4Field.innerHTML = "" ;
    totalInsEarnRate5Field.innerHTML = "" ;
    totalInsEarnRate6Field.innerHTML = "" ;
    totalInsEarnRate7Field.innerHTML = "" ;
    totalInsEarnRate8Field.innerHTML = "" ;
    totalInsEarnRate9Field.innerHTML = "" ;
    totalInsEarnRate10Field.innerHTML = "" ;
    totalCurrentPremiumRate1Field.innerHTML = "" ;
    totalCurrentPremiumRate2Field.innerHTML = "" ;
    totalCurrentPremiumRate3Field.innerHTML = "" ;
    totalCurrentPremiumRate4Field.innerHTML = "" ;
    totalCurrentPremiumRate5Field.innerHTML = "" ;
    totalCurrentPremiumRate6Field.innerHTML = "" ;
    totalCurrentPremiumRate7Field.innerHTML = "" ;
    totalCurrentPremiumRate8Field.innerHTML = "" ;
    totalCurrentPremiumRate9Field.innerHTML = "" ;
    totalCurrentPremiumRate10Field.innerHTML = "" ;
    calcPremField.innerHTML = "" ;
    calcPremField2.innerHTML = "" ;
  } else if ( result * 1 >= 90300 ) {
    resultField.innerHTML = formatDecimal( eval( result * 1 ), true, 2 ) ;
    payperField.innerHTML = formatDecimal( eval( high / strUser ), true, 2 ) ;
    commonField1.innerHTML = commonValue ;
    workPayPerField.innerHTML = formatDecimal( eval(( high / strUser ) + workresult ), true, 2) ;
    workPerField.innerHTML = formatDecimal( eval( workresult * 1 ), true, 2 ) ;
    rateGroupField1.innerHTML = rateGroupText1 ;
    rateGroupField2.innerHTML = rateGroupText2 ;
    rateGroupField3.innerHTML = rateGroupText3 ;
    rateGroupField4.innerHTML = rateGroupText4 ;
    rateGroupField5.innerHTML = rateGroupText5 ;
    rateGroupField6.innerHTML = rateGroupText6 ;
    rateGroupField7.innerHTML = rateGroupText7 ;
    rateGroupField8.innerHTML = rateGroupText8 ;
    rateGroupField9.innerHTML = rateGroupText9 ;
    rateGroupField10.innerHTML = rateGroupText10 ;
    rateGroupValueField1.innerHTML = rateGroup1 ;
    rateGroupValueField2.innerHTML = rateGroup2 ;
    rateGroupValueField3.innerHTML = rateGroup3 ;
    rateGroupValueField4.innerHTML = rateGroup4 ;
    rateGroupValueField5.innerHTML = rateGroup5 ;
    rateGroupValueField6.innerHTML = rateGroup6 ;
    rateGroupValueField7.innerHTML = rateGroup7 ;
    rateGroupValueField8.innerHTML = rateGroup8 ;
    rateGroupValueField9.innerHTML = rateGroup9 ;
    rateGroupValueField10.innerHTML = rateGroup10 ;
    rate1WorkEarnDisplay.innerHTML = formatDecimal( eval( rate1WorkEarnResult * 1 ), true, 2 ) ;
    rate2WorkEarnDisplay.innerHTML = formatDecimal( eval( rate2WorkEarnResult * 1 ), true, 2 ) ;
    rate3WorkEarnDisplay.innerHTML = formatDecimal( eval( rate3WorkEarnResult * 1 ), true, 2 ) ;
    rate4WorkEarnDisplay.innerHTML = formatDecimal( eval( rate4WorkEarnResult * 1 ), true, 2 ) ;
    rate5WorkEarnDisplay.innerHTML = formatDecimal( eval( rate5WorkEarnResult * 1 ), true, 2 ) ;
    rate6WorkEarnDisplay.innerHTML = formatDecimal( eval( rate6WorkEarnResult * 1 ), true, 2 ) ;
    rate7WorkEarnDisplay.innerHTML = formatDecimal( eval( rate7WorkEarnResult * 1 ), true, 2 ) ;
    rate8WorkEarnDisplay.innerHTML = formatDecimal( eval( rate8WorkEarnResult * 1 ), true, 2 ) ;
    rate9WorkEarnDisplay.innerHTML = formatDecimal( eval( rate9WorkEarnResult * 1 ), true, 2 ) ;
    rate10WorkEarnDisplay.innerHTML = formatDecimal( eval( rate10WorkEarnResult * 1 ), true, 2 ) ;
    totalDirectField.innerHTML = formatDecimal( eval(( rate1WorkEarnResult * 1 ) + ( rate2WorkEarnResult * 1 ) + ( rate3WorkEarnResult * 1 ) + ( rate4WorkEarnResult * 1 ) + ( rate5WorkEarnResult * 1 ) + ( rate6WorkEarnResult * 1 ) + ( rate7WorkEarnResult * 1 ) + ( rate8WorkEarnResult * 1 ) + ( rate9WorkEarnResult * 1 ) + ( rate10WorkEarnResult * 1 ) ), true, 2 );
    percentRate1Field.innerHTML = formatDecimal( eval(( rate1WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate2Field.innerHTML = formatDecimal( eval(( rate2WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate3Field.innerHTML = formatDecimal( eval(( rate3WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate4Field.innerHTML = formatDecimal( eval(( rate4WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate5Field.innerHTML = formatDecimal( eval(( rate5WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate6Field.innerHTML = formatDecimal( eval(( rate6WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate7Field.innerHTML = formatDecimal( eval(( rate7WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate8Field.innerHTML = formatDecimal( eval(( rate8WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate9Field.innerHTML = formatDecimal( eval(( rate9WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate10Field.innerHTML = formatDecimal( eval(( rate10WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    proratedRate1Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate1Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate2Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate2Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate3Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate3Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate4Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate4Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate5Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate5Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate6Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate6Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate7Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate7Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate8Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate8Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate9Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate9Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate10Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate10Field.innerHTML ) / 100 ), true, 2) ;
    totalInsEarnRate1Field.innerHTML = formatDecimal( eval(( proratedRate1Field.innerHTML * 1 ) + ( rate1WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate2Field.innerHTML = formatDecimal( eval(( proratedRate2Field.innerHTML * 1 ) + ( rate2WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate3Field.innerHTML = formatDecimal( eval(( proratedRate3Field.innerHTML * 1 ) + ( rate3WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate4Field.innerHTML = formatDecimal( eval(( proratedRate4Field.innerHTML * 1 ) + ( rate4WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate5Field.innerHTML = formatDecimal( eval(( proratedRate5Field.innerHTML * 1 ) + ( rate5WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate6Field.innerHTML = formatDecimal( eval(( proratedRate6Field.innerHTML * 1 ) + ( rate6WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate7Field.innerHTML = formatDecimal( eval(( proratedRate7Field.innerHTML * 1 ) + ( rate7WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate8Field.innerHTML = formatDecimal( eval(( proratedRate8Field.innerHTML * 1 ) + ( rate8WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate9Field.innerHTML = formatDecimal( eval(( proratedRate9Field.innerHTML * 1 ) + ( rate9WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate10Field.innerHTML = formatDecimal( eval(( proratedRate10Field.innerHTML * 1 ) + ( rate10WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalCurrentPremiumRate1Field.innerHTML = formatDecimal( eval(( totalInsEarnRate1Field.innerHTML * 1 ) * rateGroup1Adj ), true, 2) ;
    totalCurrentPremiumRate2Field.innerHTML = formatDecimal( eval(( totalInsEarnRate2Field.innerHTML * 1 ) * rateGroup2Adj ), true, 2) ;
    totalCurrentPremiumRate3Field.innerHTML = formatDecimal( eval(( totalInsEarnRate3Field.innerHTML * 1 ) * rateGroup3Adj ), true, 2) ;
    totalCurrentPremiumRate4Field.innerHTML = formatDecimal( eval(( totalInsEarnRate4Field.innerHTML * 1 ) * rateGroup4Adj ), true, 2) ;
    totalCurrentPremiumRate5Field.innerHTML = formatDecimal( eval(( totalInsEarnRate5Field.innerHTML * 1 ) * rateGroup5Adj ), true, 2) ;
    totalCurrentPremiumRate6Field.innerHTML = formatDecimal( eval(( totalInsEarnRate6Field.innerHTML * 1 ) * rateGroup6Adj ), true, 2) ;
    totalCurrentPremiumRate7Field.innerHTML = formatDecimal( eval(( totalInsEarnRate7Field.innerHTML * 1 ) * rateGroup7Adj ), true, 2) ;
    totalCurrentPremiumRate8Field.innerHTML = formatDecimal( eval(( totalInsEarnRate8Field.innerHTML * 1 ) * rateGroup8Adj ), true, 2) ;
    totalCurrentPremiumRate9Field.innerHTML = formatDecimal( eval(( totalInsEarnRate9Field.innerHTML * 1 ) * rateGroup9Adj ), true, 2) ;
    totalCurrentPremiumRate10Field.innerHTML = formatDecimal( eval(( totalInsEarnRate10Field.innerHTML * 1 ) * rateGroup10Adj ), true, 2) ;
    annualField.innerHTML =  formatDecimal( eval(( totalInsEarnRate1Field.innerHTML * 1 ) + ( totalInsEarnRate2Field.innerHTML * 1 ) + ( totalInsEarnRate3Field.innerHTML * 1 ) + ( totalInsEarnRate4Field.innerHTML * 1 ) + ( totalInsEarnRate5Field.innerHTML * 1 ) + ( totalInsEarnRate6Field.innerHTML * 1 ) + ( totalInsEarnRate7Field.innerHTML * 1 ) + ( totalInsEarnRate8Field.innerHTML * 1 ) + ( totalInsEarnRate9Field.innerHTML * 1 ) + ( totalInsEarnRate10Field.innerHTML * 1 ) ), true, 2);
    annualField2.innerHTML =  formatDecimal( eval(( totalInsEarnRate1Field.innerHTML * 1 ) + ( totalInsEarnRate2Field.innerHTML * 1 ) + ( totalInsEarnRate3Field.innerHTML * 1 ) + ( totalInsEarnRate4Field.innerHTML * 1 ) + ( totalInsEarnRate5Field.innerHTML * 1 ) + ( totalInsEarnRate6Field.innerHTML * 1 ) + ( totalInsEarnRate7Field.innerHTML * 1 ) + ( totalInsEarnRate8Field.innerHTML * 1 ) + ( totalInsEarnRate9Field.innerHTML * 1 ) + ( totalInsEarnRate10Field.innerHTML * 1 ) ), true, 2);

    calcPremField.innerHTML = formatDecimal( eval(( totalCurrentPremiumRate1Field.innerHTML * 1 ) + ( totalCurrentPremiumRate2Field.innerHTML * 1 ) + ( totalCurrentPremiumRate3Field.innerHTML * 1 ) + ( totalCurrentPremiumRate4Field.innerHTML * 1 ) + ( totalCurrentPremiumRate5Field.innerHTML * 1 ) + ( totalCurrentPremiumRate6Field.innerHTML * 1 ) + ( totalCurrentPremiumRate7Field.innerHTML * 1 ) + ( totalCurrentPremiumRate8Field.innerHTML * 1 ) + ( totalCurrentPremiumRate9Field.innerHTML * 1 ) + ( totalCurrentPremiumRate10Field.innerHTML * 1 ) ), true, 2) ;
    calcPremField2.innerHTML = formatDecimal( eval(( totalCurrentPremiumRate1Field.innerHTML * 1 ) + ( totalCurrentPremiumRate2Field.innerHTML * 1 ) + ( totalCurrentPremiumRate3Field.innerHTML * 1 ) + ( totalCurrentPremiumRate4Field.innerHTML * 1 ) + ( totalCurrentPremiumRate5Field.innerHTML * 1 ) + ( totalCurrentPremiumRate6Field.innerHTML * 1 ) + ( totalCurrentPremiumRate7Field.innerHTML * 1 ) + ( totalCurrentPremiumRate8Field.innerHTML * 1 ) + ( totalCurrentPremiumRate9Field.innerHTML * 1 ) + ( totalCurrentPremiumRate10Field.innerHTML * 1 ) ), true, 2) ;
    document.getElementById('sole-multi-summary').style.display='block';
    document.getElementById('sole-multi-questions').style.display='none';
  } else if (( result * 1 > 0 ) && ( result * 1 < 90300 )) {
    resultField.innerHTML = formatDecimal( eval( result * 1 ), true, 2 ) ;
    payperField.innerHTML = formatDecimal( eval( result / strUser ), true, 2 ) ;
    commonField1.innerHTML = commonValue ;
    workPayPerField.innerHTML = formatDecimal( eval(( result / strUser ) + workresult ), true, 2) ;
    workPerField.innerHTML = formatDecimal( eval( workresult * 1 ), true, 2 ) ;
    rateGroupField1.innerHTML = rateGroupText1 ;
    rateGroupField2.innerHTML = rateGroupText2 ;
    rateGroupField3.innerHTML = rateGroupText3 ;
    rateGroupField4.innerHTML = rateGroupText4 ;
    rateGroupField5.innerHTML = rateGroupText5 ;
    rateGroupField6.innerHTML = rateGroupText6 ;
    rateGroupField7.innerHTML = rateGroupText7 ;
    rateGroupField8.innerHTML = rateGroupText8 ;
    rateGroupField9.innerHTML = rateGroupText9 ;
    rateGroupField10.innerHTML = rateGroupText10 ;
    rateGroupValueField1.innerHTML = rateGroup1 ;
    rateGroupValueField2.innerHTML = rateGroup2 ;
    rateGroupValueField3.innerHTML = rateGroup3 ;
    rateGroupValueField4.innerHTML = rateGroup4 ;
    rateGroupValueField5.innerHTML = rateGroup5 ;
    rateGroupValueField6.innerHTML = rateGroup6 ;
    rateGroupValueField7.innerHTML = rateGroup7 ;
    rateGroupValueField8.innerHTML = rateGroup8 ;
    rateGroupValueField9.innerHTML = rateGroup9 ;
    rateGroupValueField10.innerHTML = rateGroup10 ;
    rate1WorkEarnDisplay.innerHTML = formatDecimal( eval( rate1WorkEarnResult * 1 ), true, 2 ) ;
    rate2WorkEarnDisplay.innerHTML = formatDecimal( eval( rate2WorkEarnResult * 1 ), true, 2 ) ;
    rate3WorkEarnDisplay.innerHTML = formatDecimal( eval( rate3WorkEarnResult * 1 ), true, 2 ) ;
    rate4WorkEarnDisplay.innerHTML = formatDecimal( eval( rate4WorkEarnResult * 1 ), true, 2 ) ;
    rate5WorkEarnDisplay.innerHTML = formatDecimal( eval( rate5WorkEarnResult * 1 ), true, 2 ) ;
    rate6WorkEarnDisplay.innerHTML = formatDecimal( eval( rate6WorkEarnResult * 1 ), true, 2 ) ;
    rate7WorkEarnDisplay.innerHTML = formatDecimal( eval( rate7WorkEarnResult * 1 ), true, 2 ) ;
    rate8WorkEarnDisplay.innerHTML = formatDecimal( eval( rate8WorkEarnResult * 1 ), true, 2 ) ;
    rate9WorkEarnDisplay.innerHTML = formatDecimal( eval( rate9WorkEarnResult * 1 ), true, 2 ) ;
    rate10WorkEarnDisplay.innerHTML = formatDecimal( eval( rate10WorkEarnResult * 1 ), true, 2 ) ;
    totalDirectField.innerHTML = formatDecimal( eval(( rate1WorkEarnResult * 1 ) + ( rate2WorkEarnResult * 1 ) + ( rate3WorkEarnResult * 1 ) + ( rate4WorkEarnResult * 1 ) + ( rate5WorkEarnResult * 1 ) + ( rate6WorkEarnResult * 1 ) + ( rate7WorkEarnResult * 1 ) + ( rate8WorkEarnResult * 1 ) + ( rate9WorkEarnResult * 1 ) + ( rate10WorkEarnResult * 1 ) ), true, 2) ;
    percentRate1Field.innerHTML = formatDecimal( eval(( rate1WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate2Field.innerHTML = formatDecimal( eval(( rate2WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate3Field.innerHTML = formatDecimal( eval(( rate3WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate4Field.innerHTML = formatDecimal( eval(( rate4WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate5Field.innerHTML = formatDecimal( eval(( rate5WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate6Field.innerHTML = formatDecimal( eval(( rate6WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate7Field.innerHTML = formatDecimal( eval(( rate7WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate8Field.innerHTML = formatDecimal( eval(( rate8WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate9Field.innerHTML = formatDecimal( eval(( rate9WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    percentRate10Field.innerHTML = formatDecimal( eval(( rate10WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
    proratedRate1Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate1Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate2Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate2Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate3Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate3Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate4Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate4Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate5Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate5Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate6Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate6Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate7Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate7Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate8Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate8Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate9Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate9Field.innerHTML ) / 100 ), true, 2) ;
    proratedRate10Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate10Field.innerHTML ) / 100 ), true, 2) ;
    totalInsEarnRate1Field.innerHTML = formatDecimal( eval(( proratedRate1Field.innerHTML * 1 ) + ( rate1WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate2Field.innerHTML = formatDecimal( eval(( proratedRate2Field.innerHTML * 1 ) + ( rate2WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate3Field.innerHTML = formatDecimal( eval(( proratedRate3Field.innerHTML * 1 ) + ( rate3WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate4Field.innerHTML = formatDecimal( eval(( proratedRate4Field.innerHTML * 1 ) + ( rate4WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate5Field.innerHTML = formatDecimal( eval(( proratedRate5Field.innerHTML * 1 ) + ( rate5WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate6Field.innerHTML = formatDecimal( eval(( proratedRate6Field.innerHTML * 1 ) + ( rate6WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate7Field.innerHTML = formatDecimal( eval(( proratedRate7Field.innerHTML * 1 ) + ( rate7WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate8Field.innerHTML = formatDecimal( eval(( proratedRate8Field.innerHTML * 1 ) + ( rate8WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate9Field.innerHTML = formatDecimal( eval(( proratedRate9Field.innerHTML * 1 ) + ( rate9WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalInsEarnRate10Field.innerHTML = formatDecimal( eval(( proratedRate10Field.innerHTML * 1 ) + ( rate10WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
    totalCurrentPremiumRate1Field.innerHTML = formatDecimal( eval(( totalInsEarnRate1Field.innerHTML * 1 ) * rateGroup1Adj ), true, 2) ;
    totalCurrentPremiumRate2Field.innerHTML = formatDecimal( eval(( totalInsEarnRate2Field.innerHTML * 1 ) * rateGroup2Adj ), true, 2) ;
    totalCurrentPremiumRate3Field.innerHTML = formatDecimal( eval(( totalInsEarnRate3Field.innerHTML * 1 ) * rateGroup3Adj ), true, 2) ;
    totalCurrentPremiumRate4Field.innerHTML = formatDecimal( eval(( totalInsEarnRate4Field.innerHTML * 1 ) * rateGroup4Adj ), true, 2) ;
    totalCurrentPremiumRate5Field.innerHTML = formatDecimal( eval(( totalInsEarnRate5Field.innerHTML * 1 ) * rateGroup5Adj ), true, 2) ;
    totalCurrentPremiumRate6Field.innerHTML = formatDecimal( eval(( totalInsEarnRate6Field.innerHTML * 1 ) * rateGroup6Adj ), true, 2) ;
    totalCurrentPremiumRate7Field.innerHTML = formatDecimal( eval(( totalInsEarnRate7Field.innerHTML * 1 ) * rateGroup7Adj ), true, 2) ;
    totalCurrentPremiumRate8Field.innerHTML = formatDecimal( eval(( totalInsEarnRate8Field.innerHTML * 1 ) * rateGroup8Adj ), true, 2) ;
    totalCurrentPremiumRate9Field.innerHTML = formatDecimal( eval(( totalInsEarnRate9Field.innerHTML * 1 ) * rateGroup9Adj ), true, 2) ;
    totalCurrentPremiumRate10Field.innerHTML = formatDecimal( eval(( totalInsEarnRate10Field.innerHTML * 1 ) * rateGroup10Adj ), true, 2) ;
    calcPremField.innerHTML = formatDecimal( eval(( totalCurrentPremiumRate1Field.innerHTML * 1 ) + ( totalCurrentPremiumRate2Field.innerHTML * 1 ) + ( totalCurrentPremiumRate3Field.innerHTML * 1 ) + ( totalCurrentPremiumRate4Field.innerHTML * 1 ) + ( totalCurrentPremiumRate5Field.innerHTML * 1 ) + ( totalCurrentPremiumRate6Field.innerHTML * 1 ) + ( totalCurrentPremiumRate7Field.innerHTML * 1 ) + ( totalCurrentPremiumRate8Field.innerHTML * 1 ) + ( totalCurrentPremiumRate9Field.innerHTML * 1 ) + ( totalCurrentPremiumRate10Field.innerHTML * 1 ) ), true, 2);
    calcPremField2.innerHTML = formatDecimal( eval(( totalCurrentPremiumRate1Field.innerHTML * 1 ) + ( totalCurrentPremiumRate2Field.innerHTML * 1 ) + ( totalCurrentPremiumRate3Field.innerHTML * 1 ) + ( totalCurrentPremiumRate4Field.innerHTML * 1 ) + ( totalCurrentPremiumRate5Field.innerHTML * 1 ) + ( totalCurrentPremiumRate6Field.innerHTML * 1 ) + ( totalCurrentPremiumRate7Field.innerHTML * 1 ) + ( totalCurrentPremiumRate8Field.innerHTML * 1 ) + ( totalCurrentPremiumRate9Field.innerHTML * 1 ) + ( totalCurrentPremiumRate10Field.innerHTML * 1 ) ), true, 2);

    annualField.innerHTML =  formatDecimal( eval(( totalInsEarnRate1Field.innerHTML * 1 ) + ( totalInsEarnRate2Field.innerHTML * 1 ) + ( totalInsEarnRate3Field.innerHTML * 1 ) + ( totalInsEarnRate4Field.innerHTML * 1 ) + ( totalInsEarnRate5Field.innerHTML * 1 ) + ( totalInsEarnRate6Field.innerHTML * 1 ) + ( totalInsEarnRate7Field.innerHTML * 1 ) + ( totalInsEarnRate8Field.innerHTML * 1 ) + ( totalInsEarnRate9Field.innerHTML * 1 ) + ( totalInsEarnRate10Field.innerHTML * 1 ) ), true, 2);
    annualField2.innerHTML =  formatDecimal( eval(( totalInsEarnRate1Field.innerHTML * 1 ) + ( totalInsEarnRate2Field.innerHTML * 1 ) + ( totalInsEarnRate3Field.innerHTML * 1 ) + ( totalInsEarnRate4Field.innerHTML * 1 ) + ( totalInsEarnRate5Field.innerHTML * 1 ) + ( totalInsEarnRate6Field.innerHTML * 1 ) + ( totalInsEarnRate7Field.innerHTML * 1 ) + ( totalInsEarnRate8Field.innerHTML * 1 ) + ( totalInsEarnRate9Field.innerHTML * 1 ) + ( totalInsEarnRate10Field.innerHTML * 1 ) ), true, 2);

    document.getElementById('sole-multi-summary').style.display='block';
    document.getElementById('sole-multi-questions').style.display='none';
  }
  <!-- calculation end -->
}

//Partner yes/no Single
function partNoS1() {
  //Annual net earnings
  var totalNet = document.getElementById("psing-annualNet");
  var netResult = eval( $(totalNet).autoNumeric('get') * 1 );
  var netResultError = document.getElementById("psing-annualNet-error");

  //Partner 1
  var ps1name = document.getElementById("psing-p1name");
  var ps1per = document.getElementById("psing-part1percent");
  var ps1percent = eval( ps1per.value * 1 );

  var ps1d = document.getElementById("psing-part1declare");
  var ps1declare = ps1d.options[ps1d.selectedIndex].value;
  var ps1declareText = ps1d.options[ps1d.selectedIndex].text;

  var ps1s = document.getElementById("psing-part1special");
  var ps1special = ps1s.options[ps1s.selectedIndex].value;
  var ps1specialText = ps1s.options[ps1s.selectedIndex].text;

  //partner 2
  var ps2name = document.getElementById("psing-p2name");
  var ps2per = document.getElementById("psing-part2percent");
  var ps2percent = eval( ps2per.value * 1 );

  var ps2d = document.getElementById("psing-part2declare");
  var ps2declare = ps2d.options[ps2d.selectedIndex].value;
  var ps2declareText = ps2d.options[ps2d.selectedIndex].text;

  var ps2s = document.getElementById("psing-part2special");
  var ps2special = ps2s.options[ps2s.selectedIndex].value;
  var ps2specialText = ps2s.options[ps2s.selectedIndex].text;

  //partner 3
  var ps3val = document.getElementById("psing-add3");
  var ps3value = eval( ps3val.value * 1 );

    var ps3name = document.getElementById("psing-p3name");
    var ps3per = document.getElementById("psing-part3percent");
    var ps3percent = eval( ps3per.value * 1 );

    var ps3d = document.getElementById("psing-part3declare");
    var ps3declare = ps3d.options[ps3d.selectedIndex].value;
    var ps3declareText = ps3d.options[ps3d.selectedIndex].text;

    var ps3s = document.getElementById("psing-part3special");
    var ps3special = ps3s.options[ps3s.selectedIndex].value;
    var ps3specialText = ps3s.options[ps3s.selectedIndex].text;

  //partner 4
  var ps4val = document.getElementById("psing-add4");
  var ps4value = eval( ps4val.value * 1 );

    var ps4name = document.getElementById("psing-p4name");
    var ps4per = document.getElementById("psing-part4percent");
    var ps4percent = eval( ps4per.value * 1 );

    var ps4d = document.getElementById("psing-part4declare");
    var ps4declare = ps4d.options[ps4d.selectedIndex].value;
    var ps4declareText = ps4d.options[ps4d.selectedIndex].text;

    var ps4s = document.getElementById("psing-part4special");
    var ps4special = ps4s.options[ps4s.selectedIndex].value;
    var ps4specialText = ps4s.options[ps4s.selectedIndex].text;

  <!-- errors -->
  if ( netResult * 1 <= 0 ) {
    document.getElementById('psing-annualNet-error').style.display='block';
  } else {
    document.getElementById('psing-annualNet-error').style.display='none';
  }
  //Partner 1 errors
  if ( ps1percent * 1 <= 0 ) {
    document.getElementById('psing-part1percent-error').style.display='block';
  } else {
    document.getElementById('psing-part1percent-error').style.display='none';
  }
  if ( ps1declare * 1 <= 0 ) {
    document.getElementById('psing-part1declare-error').style.display='block';
  } else {
    document.getElementById('psing-part1declare-error').style.display='none';
  }
  if ( ps1special * 1 <= 0 ) {
    document.getElementById('psing-part1special-error').style.display='block';
  } else {
    document.getElementById('psing-part1special-error').style.display='none';
  }

  //Partner 2 errors
  if ( ps2percent * 1 <= 0 ) {
    document.getElementById('psing-part2percent-error').style.display='block';
  } else {
    document.getElementById('psing-part2percent-error').style.display='none';
  }
  if ( ps2declare * 1 <= 0 ) {
    document.getElementById('psing-part2declare-error').style.display='block';
  } else {
    document.getElementById('psing-part2declare-error').style.display='none';
  }
  if ( ps2special * 1 <= 0 ) {
    document.getElementById('psing-part2special-error').style.display='block';
  } else {
    document.getElementById('psing-part2special-error').style.display='none';
  }

  //Partner 3 errors
  if ( ps3value * 1 == 1 ) {
    if ( ps3percent * 1 <= 0 ) {
      document.getElementById('psing-part3percent-error').style.display='block';
    } else {
      document.getElementById('psing-part3percent-error').style.display='none';
    }
    if ( ps3declare * 1 <= 0 ) {
      document.getElementById('psing-part3declare-error').style.display='block';
    } else {
      document.getElementById('psing-part3declare-error').style.display='none';
    }
    if ( ps3special * 1 <= 0 ) {
      document.getElementById('psing-part3special-error').style.display='block';
    } else {
      document.getElementById('psing-part3special-error').style.display='none';
    }
  } else if ( ps3value * 1 == 0 ) {
    ps3name = "" ;
    ps3percent = 0 ;
    ps3declare = 1 ;
    ps3special = 2 ;

    document.getElementById('psing-part3percent-error').style.display='none';
    document.getElementById('psing-part3declare-error').style.display='none';
    document.getElementById('psing-part3special-error').style.display='none';
  }

  //Partner 4 errors
  if ( ps4value * 1 == 1 ) {
    if ( ps4percent * 1 <= 0 ) {
      document.getElementById('psing-part4percent-error').style.display='block';
    } else {
      document.getElementById('psing-part4percent-error').style.display='none';
    }
    if ( ps4declare * 1 <= 0 ) {
      document.getElementById('psing-part4declare-error').style.display='block';
    } else {
      document.getElementById('psing-part4declare-error').style.display='none';
    }
    if ( ps4special * 1 <= 0 ) {
      document.getElementById('psing-part4special-error').style.display='block';
    } else {
      document.getElementById('psing-part4special-error').style.display='none';
    }
  } else if ( ps4value * 1 == 0 ) {
    ps4name = "" ;
    ps4percent = 0 ;
    ps4declare = 1 ;
    ps4special = 2 ;

    document.getElementById('psing-part4percent-error').style.display='none';
    document.getElementById('psing-part4declare-error').style.display='none';
    document.getElementById('psing-part4special-error').style.display='none';
  }


  //Function errors
    //total percentage is not 100%
    if (( eval(( ps1percent * 1 ) + ( ps2percent * 1 ) + ( ps3percent * 1 ) + ( ps4percent * 1 )) ) != 100 ) {
      document.getElementById('psing-not100-error').style.display='block';
    } else {
      document.getElementById('psing-not100-error').style.display='none';
    }

    //more than 1 exempt
    if (( eval(( ps1declare * 1 ) + ( ps2declare * 1 ) + ( ps3declare * 1 ) + ( ps4declare * 1 )) ) > 7 ) {
      document.getElementById('psing-no2exempt-error').style.display='block';
    } else {
      document.getElementById('psing-no2exempt-error').style.display='none';
    }

    //can't be both exempt and special
    if ((( eval(( ps1declare * 1 ) + ( ps1special * 1 ))) == 5 ) || (( eval(( ps2declare * 1 ) + ( ps2special * 1 ))) == 5 ) || (( eval(( ps3declare * 1 ) + ( ps3special * 1 ))) == 5 ) || (( eval(( ps4declare * 1 ) + ( ps4special * 1 ))) == 5 )) {
      document.getElementById('psing-no2both-error').style.display='block';
    } else {
      document.getElementById('psing-no2both-error').style.display='none';
    }

  <!-- errors end -->

//show/hide workers on summary

  var pswsvalP = document.getElementById("psing-workers-select");

  var pswsP = eval( pswsvalP.value * 1 );

  var rowsP = $('table#partner-select-table tr');
  var workerY = rowsP.filter('.psing-worker-selected');
  var rowsWR = $('table#psing-summary-table2 tr');
  var workerShow = rowsWR.filter('.display-p-workers');

  if ( pswsP * 1 == 1 ) {
    workerY.show();
    workerShow.show();
  } else {
    workerY.hide();
    workerShow.hide();
  }

  if ($("#psing-questions1 span.error:visible").length) {
    return false;
  }

  var ps1skip = eval(( ps1declare * 1 ) + ( ps1special * 1 ));
  var ps2skip = eval(( ps2declare * 1 ) + ( ps2special * 1 ));
  var ps3skip = eval((( ps3declare * 1 ) + ( ps3special * 1 )) / ( ps3value * 1 ));
  var ps4skip = eval((( ps4declare * 1 ) + ( ps4special * 1 )) / ( ps4value * 1 ));

  if (( pswsP * 1 == 0 ) && ( eval( ps1skip * 1 ) != 3 ) && ( eval( ps2skip * 1 ) != 3 ) && ( eval( ps3skip * 1 ) != 3 ) && ( eval( ps4skip * 1 ) != 3 ) ) {
    $('#psing-rate-group option:eq(2)').attr('selected', 'selected');
    document.getElementById('psing-questions1').style.display='none';
    document.getElementById('psing-summary').style.display='block';
    document.getElementById('psing-back1').style.display='none';
    document.getElementById('psing-back2').style.display='block';
    partNoS2();
  } else {
    document.getElementById('psing-questions1').style.display='none';
    document.getElementById('psing-questions2').style.display='block';
    document.getElementById('psing-back1').style.display='block';
    document.getElementById('psing-back2').style.display='none';
  }
}

function partNoS2() {
  //Rate info
  var ps1r = document.getElementById("psing-rate-group");
  var ps1rateVal = ps1r.options[ps1r.selectedIndex].value;
  var ps1rateText = ps1r.options[ps1r.selectedIndex].text;

  if ( ps1rateVal * 1 <= 0 ) {
    document.getElementById('psing-rate-group-error').style.display='block';
  } else {
    document.getElementById('psing-rate-group-error').style.display='none';
  }

  var pswsvalP = document.getElementById("psing-workers-select");
  var pswsP = eval( $(pswsvalP).autoNumeric('init').autoNumeric('get') * 1 );

  if ( pswsP * 1 == 1 ) {
    var insEarn = document.getElementById("psing-ins-earn");
    var insEarnings = eval( $(insEarn).autoNumeric('init').autoNumeric('get') * 1 );

    if ( insEarnings * 1 <= 0 ) {
      document.getElementById('psing-ins-earn-error').style.display='block';
    } else {
      document.getElementById('psing-ins-earn-error').style.display='none';
    }
  } else {
    var insEarnings = 0 ;
  }

  if ($("#psing-questions2 span.error:visible").length) {
    return false;
  }

  document.getElementById('psing-summary').style.display='block';
  document.getElementById('psing-questions2').style.display='none';

  //Frequency
  var f = document.getElementById("report-frequency");
  var freq = f.options[f.selectedIndex].value;

  //Annual net earnings
  var totalNet = document.getElementById("psing-annualNet");
  var netResult = eval( $(totalNet).autoNumeric('init').autoNumeric('get') * 1 );

  //Partner 1
  var ps1name = document.getElementById("psing-p1name");
  var ps1nameValue = ( ps1name.value );
  var ps1per = document.getElementById("psing-part1percent");
  var ps1percent = ( ps1per.value );

  var ps1d = document.getElementById("psing-part1declare");
  var ps1declare = ps1d.options[ps1d.selectedIndex].value;
  var ps1declareText = ps1d.options[ps1d.selectedIndex].text;

  var ps1s = document.getElementById("psing-part1special");
  var ps1special = ps1s.options[ps1s.selectedIndex].value;
  var ps1specialText = ps1s.options[ps1s.selectedIndex].text;

  //partner 2
  var ps2name = document.getElementById("psing-p2name");
  var ps2nameValue = ( ps2name.value );
  var ps2per = document.getElementById("psing-part2percent");
  var ps2percent = ( ps2per.value );

  var ps2d = document.getElementById("psing-part2declare");
  var ps2declare = ps2d.options[ps2d.selectedIndex].value;
  var ps2declareText = ps2d.options[ps2d.selectedIndex].text;

  var ps2s = document.getElementById("psing-part2special");
  var ps2special = ps2s.options[ps2s.selectedIndex].value;
  var ps2specialText = ps2s.options[ps2s.selectedIndex].text;

  //partner 3
  var ps3val = document.getElementById("psing-add3");
  var ps3value = eval( $(ps3val).autoNumeric('init').autoNumeric('get') * 1 );

    var ps3name = document.getElementById("psing-p3name");
    var ps3nameValue = ( ps3name.value );
    var ps3per = document.getElementById("psing-part3percent");
    var ps3percent = ( ps3per.value );

    var ps3d = document.getElementById("psing-part3declare");
    var ps3declare = ps3d.options[ps3d.selectedIndex].value;
    var ps3declareText = ps3d.options[ps3d.selectedIndex].text;

    var ps3s = document.getElementById("psing-part3special");
    var ps3special = ps3s.options[ps3s.selectedIndex].value;
    var ps3specialText = ps3s.options[ps3s.selectedIndex].text;

  //partner 4
  var ps4val = document.getElementById("psing-add4");
  var ps4value = eval( $(ps4val).autoNumeric('init').autoNumeric('get') * 1 );

    var ps4name = document.getElementById("psing-p4name");
    var ps4nameValue = ( ps4name.value );
    var ps4per = document.getElementById("psing-part4percent");
    var ps4percent = ( ps4per.value );

    var ps4d = document.getElementById("psing-part4declare");
    var ps4declare = ps4d.options[ps4d.selectedIndex].value;
    var ps4declareText = ps4d.options[ps4d.selectedIndex].text;

    var ps4s = document.getElementById("psing-part4special");
    var ps4special = ps4s.options[ps4s.selectedIndex].value;
    var ps4specialText = ps4s.options[ps4s.selectedIndex].text;

  var rowsP3 = $('table#psing-summary-table tr');
  var partner3 = rowsP3.filter('.partner3');

  if ( ps3value * 1 == 1 ) {
    partner3.show();
  } else {
    partner3.hide();
  }

  var rowsP4 = $('table#psing-summary-table tr');
  var partner4 = rowsP4.filter('.partner4');

  if ( ps4value * 1 == 1 ) {
    partner4.show();
  } else {
    partner4.hide();
  }

  var pswsvalP = document.getElementById("psing-workers-select");
  var pswsP = eval( pswsvalP.value * 1 );
  var psworkers = document.getElementById("psing-sum-workers");

  if ( pswsP * 1 == 1 ) {
    psworkers.innerHTML = 'Yes' ;
  } else {
    psworkers.innerHTML = 'No' ;
  }

  var annualNet = document.getElementById("psing-est-annual");
  annualNet.innerHTML = formatDecimal(( netResult * 1 ), true, 2 ) ;


//partner1
  var p1name = document.getElementById("psing-sum-partner1");
  p1name.innerHTML = ps1nameValue ;
  var p1percent = document.getElementById("psing-sum-p1-percent");
  p1percent.innerHTML = ps1percent ;
  var p1exempt = document.getElementById("psing-sum-p1-exempt");
  p1exempt.innerHTML = ps1declareText ;
  var p1special = document.getElementById("psing-sum-p1-special");
  p1special.innerHTML = ps1specialText ;

//partner2
  var p2name = document.getElementById("psing-sum-partner2");
  p2name.innerHTML = ps2nameValue ;
  var p2percent = document.getElementById("psing-sum-p2-percent");
  p2percent.innerHTML = ps2percent ;
  var p2exempt = document.getElementById("psing-sum-p2-exempt");
  p2exempt.innerHTML = ps2declareText ;
  var p2special = document.getElementById("psing-sum-p2-special");
  p2special.innerHTML = ps2specialText ;

//partner3
  var p3name = document.getElementById("psing-sum-partner3");
  p3name.innerHTML = ps3nameValue ;
  var p3percent = document.getElementById("psing-sum-p3-percent");
  p3percent.innerHTML = ps3percent ;
  var p3exempt = document.getElementById("psing-sum-p3-exempt");
  p3exempt.innerHTML = ps3declareText ;
  var p3special = document.getElementById("psing-sum-p3-special");
  p3special.innerHTML = ps3specialText ;

//partner4
  var p4name = document.getElementById("psing-sum-partner4");
  p4name.innerHTML = ps4nameValue ;
  var p4percent = document.getElementById("psing-sum-p4-percent");
  p4percent.innerHTML = ps4percent ;
  var p4exempt = document.getElementById("psing-sum-p4-exempt");
  p4exempt.innerHTML = ps4declareText ;
  var p4special = document.getElementById("psing-sum-p4-special");
  p4special.innerHTML = ps4specialText ;

//bottom
  var rateGroupField = document.getElementById("psing-rate-group-display");
  rateGroupField.innerHTML = ps1rateText ;
  var rateGroupValueField = document.getElementById("psing-rate-group-value-display");
  rateGroupValueField.innerHTML = ps1rateVal ;
  var insSumEarnField = document.getElementById("psing-ins-earn-display");
  insSumEarnField.innerHTML = formatDecimal( eval( insEarnings * 1 ), true, 2 ) ;

  var high = "90300.00"
  var rateGroupAdj = eval( ps1r.value / 100 );

  var adjEarnField = document.getElementById("psing-adj-earn-display");
  var payperField = document.getElementById("psing-adj-payper-display");

  var payperCommonField = document.getElementById("psing-adj-pluscommon-display");

  var p1payPartField = document.getElementById("psing-adj-p1paypart-display");
  var p2payPartField = document.getElementById("psing-adj-p2paypart-display");
  var p3payPartField = document.getElementById("psing-adj-p3paypart-display");
  var p4payPartField = document.getElementById("psing-adj-p4paypart-display");

  //var p1payPart = formatDecimal( eval( p1payPartField.innerHTML * 1 ), true, 2);
  var total1DisplayField = document.getElementById("psing-tot-ins-earn");
  var total2DisplayField = document.getElementById("psing-tot-ins-earn2");
  var rate1DisplayField = document.getElementById("psing-tot-calc-prem");
  var rate2DisplayField = document.getElementById("psing-tot-calc-prem2");

//Partners adjusted for net income (partner can't make more than high, then divide by frequency)
  var p1adjEarn = formatDecimal( eval(( netResult * 1 ) * ( ps1percent / 100 ) ), true, 2);
  if ( p1adjEarn * 1 >= 90300 ) {
    p1payPartField.innerHTML = formatDecimal( eval( high / freq ), true, 2);
  } else {
    p1payPartField.innerHTML = formatDecimal( eval( p1adjEarn / freq ), true, 2);
  }

  var p2adjEarn = formatDecimal( eval(( netResult * 1 ) * ( ps2percent / 100 ) ), true, 2);
  if ( p2adjEarn * 1 >= 90300 ) {
    p2payPartField.innerHTML = formatDecimal( eval( high / freq ), true, 2);
  } else {
    p2payPartField.innerHTML = formatDecimal( eval( p2adjEarn / freq ), true, 2);
  }

  var p3adjEarn = formatDecimal( eval(( netResult * 1 ) * ( ps3percent / 100 ) ), true, 2);
  if ( p3adjEarn * 1 >= 90300 ) {
    p3payPartField.innerHTML = formatDecimal( eval( high / freq ), true, 2);
  } else {
    p3payPartField.innerHTML = formatDecimal( eval( p3adjEarn / freq ), true, 2);
  }

  var p4adjEarn = formatDecimal( eval(( netResult * 1 ) * ( ps4percent / 100 ) ), true, 2);
  if ( p4adjEarn * 1 >= 90300 ) {
    p4payPartField.innerHTML = formatDecimal( eval( high / freq ), true, 2);
  } else {
    p4payPartField.innerHTML = formatDecimal( eval( p4adjEarn / freq ), true, 2);
  }

  //common earnings are divided by partner percentages to get each partner's share
  var p1commonPortion = formatDecimal( eval(( ( insSumEarnField.innerHTML * 1 ) * ( ps1percent / 100 ) )), true, 2);
  var p2commonPortion = formatDecimal( eval(( ( insSumEarnField.innerHTML * 1 ) * ( ps2percent / 100 ) )), true, 2);
  var p3commonPortion = formatDecimal( eval(( ( insSumEarnField.innerHTML * 1 ) * ( ps3percent / 100 ) )), true, 2);
  var p4commonPortion = formatDecimal( eval(( ( insSumEarnField.innerHTML * 1 ) * ( ps4percent / 100 ) )), true, 2);


//total earnings maximum / minimum adjust of netResult
    adjEarnField.innerHTML = netResult ;
    payperField.innerHTML = eval( netResult / freq );
    payperCommonField.innerHTML = formatDecimal( eval(( payperField.innerHTML * 1 ) + ( insSumEarnField.innerHTML * 1 )), true, 2);

    p1payPartField.innerHTML = formatDecimal( eval( p1payPartField.innerHTML * 1 ), true, 2);
    p2payPartField.innerHTML = formatDecimal( eval( p2payPartField.innerHTML * 1 ), true, 2);
    p3payPartField.innerHTML = formatDecimal( eval( p3payPartField.innerHTML * 1 ), true, 2);
    p4payPartField.innerHTML = formatDecimal( eval( p4payPartField.innerHTML * 1 ), true, 2);

var insEarningsP1 = document.getElementById("psing-adj-p1insearn-display");
var insEarningsP2 = document.getElementById("psing-adj-p2insearn-display");
var insEarningsP3 = document.getElementById("psing-adj-p3insearn-display");
var insEarningsP4 = document.getElementById("psing-adj-p4insearn-display");

var specialEarningsP1 = document.getElementById("psing-adj-p1specialearn-display");
var specialEarningsP2 = document.getElementById("psing-adj-p2specialearn-display");
var specialEarningsP3 = document.getElementById("psing-adj-p3specialearn-display");
var specialEarningsP4 = document.getElementById("psing-adj-p4specialearn-display");

//if partners are exempt - total earnings - % of adjusted
if ( ps1declare * 1 == 4 ) {
  var ps1finalVal = 0 ;
  insEarningsP1.innerHTML = ps1finalVal ;
  var ps1specialVal = 0 ;
  specialEarningsP1.innerHTML = ps1specialVal ;
} else if ( ps1special * 1 == 1 ) {
  var ps1finalVal = 0 ;
  insEarningsP1.innerHTML = ps1finalVal ;
  var ps1specialVal = formatDecimal( eval( p1payPartField.innerHTML * 1 ), true, 2);
  specialEarningsP1.innerHTML = ps1specialVal ;
} else {
  var ps1finalVal = formatDecimal( eval( p1payPartField.innerHTML * 1 ), true, 2);
  insEarningsP1.innerHTML = ps1finalVal ;
  var ps1specialVal = 0 ;
  specialEarningsP1.innerHTML = ps1specialVal ;
}

if ( ps2declare * 1 == 4 ) {
  var ps2finalVal = 0 ;
  insEarningsP2.innerHTML = ps2finalVal ;
  var ps2specialVal = 0 ;
  specialEarningsP2.innerHTML = ps2specialVal ;
} else if ( ps2special * 1 == 1 ) {
  var ps2finalVal = 0 ;
  insEarningsP2.innerHTML = ps2finalVal ;
  var ps2specialVal = formatDecimal( eval( p2payPartField.innerHTML * 1 ), true, 2);
  specialEarningsP2.innerHTML = ps2specialVal ;
} else {
  var ps2finalVal = formatDecimal( eval( p2payPartField.innerHTML * 1 ), true, 2);
  insEarningsP2.innerHTML = ps2finalVal ;
  var ps2specialVal = 0 ;
  specialEarningsP2.innerHTML = ps2specialVal ;
}

if ( ps3declare * 1 == 4 ) {
  var ps3finalVal = 0 ;
  insEarningsP3.innerHTML = ps3finalVal ;
  var ps3specialVal = 0 ;
  specialEarningsP3.innerHTML = ps3specialVal ;
} else if ( ps3special * 1 == 1 ) {
  var ps3finalVal = 0 ;
  insEarningsP3.innerHTML = ps3finalVal ;
  var ps3specialVal = formatDecimal( eval( p3payPartField.innerHTML * 1 ), true, 2);
  specialEarningsP3.innerHTML = ps3specialVal ;
} else {
  var ps3finalVal = formatDecimal( eval( p3payPartField.innerHTML * 1 ), true, 2);
  insEarningsP3.innerHTML = ps3finalVal ;
  var ps3specialVal = 0 ;
  specialEarningsP3.innerHTML = ps3specialVal ;
}

if ( ps4declare * 1 == 4 ) {
  var ps4finalVal = 0 ;
  insEarningsP4.innerHTML = ps4finalVal ;
  var ps4specialVal = 0 ;
  specialEarningsP4.innerHTML = ps4specialVal ;
} else if (( ps4special * 1 ) == 1 ) {
  var ps4finalVal = 0 ;
  insEarningsP4.innerHTML = ps4finalVal ;
  var ps4specialVal = formatDecimal( eval( p4payPartField.innerHTML * 1 ), true, 2);
  specialEarningsP4.innerHTML = ps4specialVal ;
} else {
  var ps4finalVal = formatDecimal( eval( p4payPartField.innerHTML * 1 ), true, 2);
  insEarningsP4.innerHTML = ps4finalVal ;
  var ps4specialVal = 0 ;
  specialEarningsP4.innerHTML = ps4specialVal ;
}

//show/hide special rate values on summary
  var rowsSkipR = $('table#psing-summary-table2 tr');
  var skipRateShow = rowsSkipR.filter('.display-p-skipr');

  var ps1skip = eval(( ps1declare * 1 ) + ( ps1special * 1 ));
  var ps2skip = eval(( ps2declare * 1 ) + ( ps2special * 1 ));
  var ps3skip = eval((( ps3declare * 1 ) + ( ps3special * 1 )) / ( ps3value * 1 ));
  var ps4skip = eval((( ps4declare * 1 ) + ( ps4special * 1 )) / ( ps4value * 1 ));

  if (( pswsP * 1 == 0 ) && ( eval( ps1skip * 1 ) != 3 ) && ( eval( ps2skip * 1 ) != 3 ) && ( eval( ps3skip * 1 ) != 3 ) && ( eval( ps4skip * 1 ) != 3 )) {
    skipRateShow.hide();
  } else {
    skipRateShow.show();
  }

  var rowsSR = $('table#psing-summary-table2 tr');
  var specialRateShow = rowsSR.filter('.display-p-sr');

  if (( ps1special * 1 == 1 ) || ( ps2special * 1 == 1 ) || ( ps3special * 1 == 1 ) || ( ps4special * 1 == 1 )) {
    specialRateShow.show();
  } else {
    specialRateShow.hide();
  }

  var insEarningsFINALTOTAL = document.getElementById("psing-adj-p1finalinsearntottrue-display");
  var insEarningsFINAL = document.getElementById("psing-adj-p1finalinsearntot-display");
  var insEarningsFINAL2 = document.getElementById("psing-adj-p1finalinsearntot-display2");
  var specialEarningsFINAL = document.getElementById("psing-adj-p1specialtot-display");
  var specialEarningsFINAL2 = document.getElementById("psing-adj-p1specialtot-display2");
  var finalPremiumFINAL = document.getElementById("psing-final-premium-display");
  var finalPremiumFINAL2 = document.getElementById("psing-final-premium-display2");
  var finalSpecialFINAL = document.getElementById("psing-final-special-display");
  var finalSpecialFINAL2 = document.getElementById("psing-final-special-display2");
  var finalTotalPremiumFINAL = document.getElementById("psing-adj-p1finalpremium-display");

//total ins earnings = ps1finalVal + ps2finalVal + ps3finalVal + ps4finalVal
  insEarningsFINAL.innerHTML = formatDecimal( eval( ( ps1finalVal * 1 ) + ( ps2finalVal * 1 ) + ( ps3finalVal * 1 ) + ( ps4finalVal * 1 ) + ( insSumEarnField.innerHTML * 1 ) ), true, 2);
  insEarningsFINAL2.innerHTML = formatDecimal( eval( ( ps1finalVal * 1 ) + ( ps2finalVal * 1 ) + ( ps3finalVal * 1 ) + ( ps4finalVal * 1 ) + ( insSumEarnField.innerHTML * 1 ) ), true, 2);
//multiply by RG
  finalPremiumFINAL.innerHTML = formatDecimal( eval(( insEarningsFINAL.innerHTML * 1 ) * rateGroupAdj ), true, 2);
  finalPremiumFINAL2.innerHTML = formatDecimal( eval(( insEarningsFINAL.innerHTML * 1 ) * rateGroupAdj ), true, 2);
//total special = ps1specialVal + ps2specialVal + ps3specialVal + ps4specialVal
  specialEarningsFINAL.innerHTML = formatDecimal( eval( ( ps1specialVal * 1 ) + ( ps2specialVal * 1 ) + ( ps3specialVal * 1 ) + ( ps4specialVal * 1 ) ), true, 2);
  specialEarningsFINAL2.innerHTML = formatDecimal( eval( ( ps1specialVal * 1 ) + ( ps2specialVal * 1 ) + ( ps3specialVal * 1 ) + ( ps4specialVal * 1 ) ), true, 2);
//multiply by .19
  finalSpecialFINAL.innerHTML = formatDecimal( eval(( specialEarningsFINAL.innerHTML * 1 ) * 0.0019 ), true, 2);
  finalSpecialFINAL2.innerHTML = formatDecimal( eval(( specialEarningsFINAL.innerHTML * 1 ) * 0.0019 ), true, 2);
//final Total ins earnings all inclusive
  insEarningsFINALTOTAL.innerHTML = formatDecimal( eval( ( insEarningsFINAL.innerHTML * 1 ) + ( specialEarningsFINAL.innerHTML * 1 ) ), true, 2);

//final Total Premium all inclusive
  finalTotalPremiumFINAL.innerHTML = formatDecimal( eval( ( finalPremiumFINAL.innerHTML * 1 ) + ( finalSpecialFINAL.innerHTML * 1 ) ), true, 2);

  total1DisplayField.innerHTML = formatDecimal( eval( ( insEarningsFINAL.innerHTML * 1 ) + ( specialEarningsFINAL.innerHTML * 1 ) ), true, 2);
  total2DisplayField.innerHTML = formatDecimal( eval( ( insEarningsFINAL.innerHTML * 1 ) + ( specialEarningsFINAL.innerHTML * 1 ) ), true, 2);

  rate1DisplayField.innerHTML = formatDecimal( eval( ( finalPremiumFINAL.innerHTML * 1 ) + ( finalSpecialFINAL.innerHTML * 1 ) ), true, 2);
  rate2DisplayField.innerHTML = formatDecimal( eval( ( finalPremiumFINAL.innerHTML * 1 ) + ( finalSpecialFINAL.innerHTML * 1 ) ), true, 2);

//.substring(0,3)

}

//Corp yes Single
function corpYesSingle1() {
  var salary = document.getElementById("corp-single-yes-1eo-annualIE");
  var result = eval( $(salary).autoNumeric('get') * 1 );

  var e = document.getElementById("report-frequency");
  var strUser = e.options[e.selectedIndex].value;
  var reportingText = e.options[e.selectedIndex].text;

  var ex = document.getElementById("corp-single-yes-1eo-exempt");
  var exemptVal = ex.options[ex.selectedIndex].value;
  var exemptText = ex.options[ex.selectedIndex].text;

  var qy = document.getElementById("corp-single-yes-1eo-qualify");
  var qualifyVal = qy.options[qy.selectedIndex].value;
  var qualifyText = qy.options[qy.selectedIndex].text;

  var workerEarn = document.getElementById("corp-single-yes-1eo-wearn");
  var wearn = formatDecimal( eval( workerEarn.value * 1 ), true, 2 );

  var rg = document.getElementById("corp-single-yes-1eo-rate-group");
  var rateGroup = rg.options[rg.selectedIndex].value;
  var rateGroupText = rg.options[rg.selectedIndex].text;

  <!-- errors -->
  if ( result * 1 <= 0 ) {
    document.getElementById('corp-single-yes-1eo-annualIE-error').style.display='block';
  } else {
    document.getElementById('corp-single-yes-1eo-annualIE-error').style.display='none';
  }

  if ( exemptVal * 1 <= 0 ) {
    document.getElementById('corp-single-yes-1eo-exempt-error').style.display='block';
  } else {
    document.getElementById('corp-single-yes-1eo-exempt-error').style.display='none';
  }

  if ( qualifyVal * 1 <= 0 ) {
    document.getElementById('corp-single-yes-1eo-qualify-error').style.display='block';
  } else {
    document.getElementById('corp-single-yes-1eo-qualify-error').style.display='none';
  }

  if (( exemptVal * 1 == 1 ) && ( qualifyVal * 1 == 1 )) {
    document.getElementById('corp-single-yes-1eo-both-error').style.display='block';
  } else {
    document.getElementById('corp-single-yes-1eo-both-error').style.display='none';
  }

  <!-- errors end -->
  if ( ( result * 1 <= 0 ) || ( exemptVal * 1 <= 0 ) || ( qualifyVal * 1 <= 0 ) || ( ( exemptVal * 1 == 1 ) && ( qualifyVal * 1 == 1 ) ) ) {
    return false;
  } else {
    document.getElementById('corp-single-yes-1eo-questions').style.display='none';
    document.getElementById('corp-single-yes-1eo-questions2').style.display='block';
  }
}

function corpYesSingle2() {
  var salary = document.getElementById("corp-single-yes-1eo-annualIE");
  var result = eval( $(salary).autoNumeric('get') * 1 );
  var resultField = document.getElementById("corp-single-yes-1eo-result");
  var annualField = document.getElementById("corp-single-yes-1eo-annual");

  var e = document.getElementById("report-frequency");
  var strUser = e.options[e.selectedIndex].value;
  var reportingText = e.options[e.selectedIndex].text;
  var reportingField = document.getElementById("corp-single-yes-1eo-reporting");
  var rateField = document.getElementById("corp-single-yes-1eo-IEpayper-text");
  var rateField2 = document.getElementById("corp-single-yes-1eo-Wpayper-text");

  var ex = document.getElementById("corp-single-yes-1eo-exempt");
  var exemptVal = ex.options[ex.selectedIndex].value;
  var exemptText = ex.options[ex.selectedIndex].text;
  var exemptDisplay = document.getElementById("corp-single-yes-1eo-exempttext");

  var qy = document.getElementById("corp-single-yes-1eo-qualify");
  var qualifyVal = qy.options[qy.selectedIndex].value;
  var qualifyText = qy.options[qy.selectedIndex].text;

  var qualifyValueDisplay = document.getElementById("corp-single-yes-1eo-qualifytext2");
  var qualifyDisplay = document.getElementById("corp-single-yes-1eo-qualifytext");

  var high = "90300.00"
  var zero = "0.00"

  var workerEarn = document.getElementById("corp-single-yes-1eo-wearn");
  var wearn = formatDecimal( eval( $(workerEarn).autoNumeric('get') * 1 ), true, 2 );

  var payperField = document.getElementById("corp-single-yes-1eo-IEpayper");
  var workerperField = document.getElementById("corp-single-yes-1eo-Wpayper");
  var totalPer = document.getElementById("corp-single-yes-1eo-totalearnings");
  var totalPer1 = document.getElementById("corp-single-yes-1eo-totalearnings1");
  var earningPer = document.getElementById("corp-single-yes-1eo-earningPer");
  var earningPer1 = document.getElementById("corp-single-yes-1eo-earningPer1");

  var rg = document.getElementById("corp-single-yes-1eo-rate-group");
  var rateGroup = rg.options[rg.selectedIndex].value;
  var rateGroupText = rg.options[rg.selectedIndex].text;
  var rateGroupField = document.getElementById("corp-single-yes-1eo-rate-group-display");
  var rateGroupValueField = document.getElementById("corp-single-yes-1eo-rate-group-value-display");
  var rateGroupAdjValueField = document.getElementById("corp-single-yes-1eo-rate-group-adj-value-display");

  var specialValueField = document.getElementById("corp-single-yes-1eo-special-rate-group-value-display");
  var specialTotValueField = document.getElementById("corp-single-yes-1eo-special-tot-rate-group-value-display");

  var rateGroupAdj = eval( rg.value / 100 );

  var calcPremField = document.getElementById("corp-single-yes-1eo-calc-prem");

  <!-- errors -->

  if ( wearn * 1 <= 0 ) {
    document.getElementById('corp-single-yes-1eo-wearn-error').style.display='block';
  } else {
    document.getElementById('corp-single-yes-1eo-wearn-error').style.display='none';
  }

  if ( rateGroup * 1 <= 0 ) {
    document.getElementById('corp-single-yes-1eo-rate-group-error').style.display='block';
  } else {
    document.getElementById('corp-single-yes-1eo-rate-group-error').style.display='none';
  }

  if (( wearn * 1 <= 0 ) || ( rateGroup * 1 <= 0 )) {
    return false;
  }

  <!-- errors end -->

  document.getElementById('corp-single-yes-1eo-questions2').style.display='block';
  document.getElementById('corp-single-yes-1eo-summary').style.display='none';

//show/hide special rate values on summary
  var rowsCSR = $('table#corp-sing-summary-table tr');
  var cSpecialRateShow = rowsCSR.filter('.display-cs-sr');

  if ( qualifyVal * 1 == 1 ) {
    cSpecialRateShow.show();
  } else {
    cSpecialRateShow.hide();
  }

  <!-- calculation -->
  if ( eval( exemptVal * 1 ) == 1 ){
    resultField.innerHTML = zero ;
    specialValueField.innerHTML = zero ;
    specialTotValueField.innerHTML = zero ;
  } else if ( eval( qualifyVal * 1 ) == 1 ){
    if ( result * 1 >= 90300 ) {
      resultField.innerHTML = formatDecimal( eval( high / strUser ), true, 2 ) ;
      specialTotValueField.innerHTML = formatDecimal( eval( high / strUser ), true, 2 ) ;
    } else if ( result * 1 < 90300 ) {
      resultField.innerHTML = formatDecimal( eval(( result * 1 ) / strUser ), true, 2 ) ;
      specialTotValueField.innerHTML = formatDecimal( eval(( result * 1 ) / strUser ), true, 2 ) ;
    }
    specialValueField.innerHTML = formatDecimal( eval(( resultField.innerHTML * 1 ) * 0.0019 ), true, 2 ) ;
  } else {
    if ( result * 1 >= 90300 ){
      resultField.innerHTML = formatDecimal( eval( high / strUser ), true, 2 );
    } else if ( result * 1 < 90300 ){
      resultField.innerHTML = formatDecimal( eval(( result * 1 ) / strUser ), true, 2 );
    }
    specialValueField.innerHTML =  zero ;
    specialTotValueField.innerHTML = zero ;
  }

  if (( exemptVal * 1 == 1 ) && ( qualifyVal * 1 == 1 )) {

  } else {
    payperField.innerHTML = formatDecimal( eval( resultField.innerHTML * 1 ), true, 2 ) ;
    totalPer.innerHTML = formatDecimal( eval(( payperField.innerHTML * 1 ) + ( wearn * 1 )), true, 2) ;
    totalPer1.innerHTML = formatDecimal( eval(( payperField.innerHTML * 1 ) + ( wearn * 1 )), true, 2) ;
    annualField.innerHTML = formatDecimal( eval( result * 1 ), true, 2 ) ;
    var adjustedTotEarn = formatDecimal( eval(( totalPer.innerHTML * 1 ) - ( specialTotValueField.innerHTML * 1 )), true, 2 ) ;
    rateGroupField.innerHTML = rateGroupText ;
    rateGroupValueField.innerHTML = rateGroup ;
    workerperField.innerHTML = wearn ;
    exemptDisplay.innerHTML = exemptText ;
    qualifyDisplay.innerHTML = qualifyText ;
    rateGroupAdjValueField.innerHTML = formatDecimal( eval(( adjustedTotEarn * 1 ) * rateGroupAdj ), true, 2 );
    earningPer.innerHTML = formatDecimal( eval((( adjustedTotEarn * 1 ) * rateGroupAdj ) + ( specialValueField.innerHTML * 1 )), true, 2) ;
    earningPer1.innerHTML = formatDecimal( eval((( adjustedTotEarn * 1 ) * rateGroupAdj ) + ( specialValueField.innerHTML * 1 )), true, 2) ;
    document.getElementById('corp-single-yes-1eo-questions2').style.display='none';
    document.getElementById('corp-single-yes-1eo-summary').style.display='block';
  }
  <!-- calculation end -->
}


//Corp Multi CEO yes Single
function corpMS1() {
  //Annual net earnings
//  var totalNet = document.getElementById("corpm-annualNet");
//  var netResult = eval( totalNet.value * 1 );
//  var netResultError = document.getElementById("corpm-annualNet-error");

  //EO 1
//  var cm1name = document.getElementById("corpm-p1name");
  var cm1per = document.getElementById("corpm-corpeo1insearn");
  var cm1insearn = eval( $(cm1per).autoNumeric('get') * 1 );

  var cm1d = document.getElementById("corpm-corpeo1declare");
  var cm1declare = cm1d.options[cm1d.selectedIndex].value;
  var cm1declareText = cm1d.options[cm1d.selectedIndex].text;

  var cm1s = document.getElementById("corpm-corpeo1special");
  var cm1special = cm1s.options[cm1s.selectedIndex].value;
  var cm1specialText = cm1s.options[cm1s.selectedIndex].text;

  //EO 2
//  var cm2name = document.getElementById("corpm-p2name");
  var cm2per = document.getElementById("corpm-corpeo2insearn");
  var cm2insearn = eval( $(cm2per).autoNumeric('get') * 1 );

  var cm2d = document.getElementById("corpm-corpeo2declare");
  var cm2declare = cm2d.options[cm2d.selectedIndex].value;
  var cm2declareText = cm2d.options[cm2d.selectedIndex].text;

  var cm2s = document.getElementById("corpm-corpeo2special");
  var cm2special = cm2s.options[cm2s.selectedIndex].value;
  var cm2specialText = cm2s.options[cm2s.selectedIndex].text;

  //EO 3
  var cm3val = document.getElementById("corpm-add3");
  var cm3value = eval( cm3val.value * 1 );

//    var cm3name = document.getElementById("corpm-p3name");
    var cm3per = document.getElementById("corpm-corpeo3insearn");
    var cm3insearn = eval( $(cm3per).autoNumeric('get') * 1 );

    var cm3d = document.getElementById("corpm-corpeo3declare");
    var cm3declare = cm3d.options[cm3d.selectedIndex].value;
    var cm3declareText = cm3d.options[cm3d.selectedIndex].text;

    var cm3s = document.getElementById("corpm-corpeo3special");
    var cm3special = cm3s.options[cm3s.selectedIndex].value;
    var cm3specialText = cm3s.options[cm3s.selectedIndex].text;

  //EO 4
  var cm4val = document.getElementById("corpm-add4");
  var cm4value = eval( cm4val.value * 1 );

//    var cm4name = document.getElementById("corpm-p4name");
    var cm4per = document.getElementById("corpm-corpeo4insearn");
    var cm4insearn = eval( $(cm4per).autoNumeric('get') * 1 );

    var cm4d = document.getElementById("corpm-corpeo4declare");
    var cm4declare = cm4d.options[cm4d.selectedIndex].value;
    var cm4declareText = cm4d.options[cm4d.selectedIndex].text;

    var cm4s = document.getElementById("corpm-corpeo4special");
    var cm4special = cm4s.options[cm4s.selectedIndex].value;
    var cm4specialText = cm4s.options[cm4s.selectedIndex].text;

  <!-- errors -->

  //EO 1 errors
  if ( cm1insearn * 1 <= 0 ) {
    document.getElementById('corpm-corpeo1insearn-error').style.display='block';
  } else {
    document.getElementById('corpm-corpeo1insearn-error').style.display='none';
  }
  if ( cm1declare * 1 <= 0 ) {
    document.getElementById('corpm-corpeo1declare-error').style.display='block';
  } else {
    document.getElementById('corpm-corpeo1declare-error').style.display='none';
  }
  if ( cm1special * 1 <= 0 ) {
    document.getElementById('corpm-corpeo1special-error').style.display='block';
  } else {
    document.getElementById('corpm-corpeo1special-error').style.display='none';
  }

  //EO 2 errors
  if ( cm2insearn * 1 <= 0 ) {
    document.getElementById('corpm-corpeo2insearn-error').style.display='block';
  } else {
    document.getElementById('corpm-corpeo2insearn-error').style.display='none';
  }
  if ( cm2declare * 1 <= 0 ) {
    document.getElementById('corpm-corpeo2declare-error').style.display='block';
  } else {
    document.getElementById('corpm-corpeo2declare-error').style.display='none';
  }
  if ( cm2special * 1 <= 0 ) {
    document.getElementById('corpm-corpeo2special-error').style.display='block';
  } else {
    document.getElementById('corpm-corpeo2special-error').style.display='none';
  }

  //EO 3 errors
  if ( cm3value * 1 == 1 ) {
    if ( cm3insearn * 1 <= 0 ) {
      document.getElementById('corpm-corpeo3insearn-error').style.display='block';
    } else {
      document.getElementById('corpm-corpeo3insearn-error').style.display='none';
    }
    if ( cm3declare * 1 <= 0 ) {
      document.getElementById('corpm-corpeo3declare-error').style.display='block';
    } else {
      document.getElementById('corpm-corpeo3declare-error').style.display='none';
    }
    if ( cm3special * 1 <= 0 ) {
      document.getElementById('corpm-corpeo3special-error').style.display='block';
    } else {
      document.getElementById('corpm-corpeo3special-error').style.display='none';
    }
  } else if ( cm3value * 1 == 0 ) {
    cm3insearn = 0 ;
    cm3declare = 1 ;
    cm3special = 2 ;

    document.getElementById('corpm-corpeo3insearn-error').style.display='none';
    document.getElementById('corpm-corpeo3declare-error').style.display='none';
    document.getElementById('corpm-corpeo3special-error').style.display='none';
  }

  //EO 4 errors
  if ( cm4value * 1 == 1 ) {
    if ( cm4insearn * 1 <= 0 ) {
      document.getElementById('corpm-corpeo4insearn-error').style.display='block';
    } else {
      document.getElementById('corpm-corpeo4insearn-error').style.display='none';
    }
    if ( cm4declare * 1 <= 0 ) {
      document.getElementById('corpm-corpeo4declare-error').style.display='block';
    } else {
      document.getElementById('corpm-corpeo4declare-error').style.display='none';
    }
    if ( cm4special * 1 <= 0 ) {
      document.getElementById('corpm-corpeo4special-error').style.display='block';
    } else {
      document.getElementById('corpm-corpeo4special-error').style.display='none';
    }
  } else if ( cm4value * 1 == 0 ) {
    cm4insearn = 0 ;
    cm4declare = 1 ;
    cm4special = 2 ;

    document.getElementById('corpm-corpeo4insearn-error').style.display='none';
    document.getElementById('corpm-corpeo4declare-error').style.display='none';
    document.getElementById('corpm-corpeo4special-error').style.display='none';
  }

  //Function errors
    //more than 1 exempt
    if (( eval(( cm1declare * 1 ) + ( cm2declare * 1 ) + ( cm3declare * 1 ) + ( cm4declare * 1 )) ) > 7 ) {
      document.getElementById('corpm-no2exempt-error').style.display='block';
    } else {
      document.getElementById('corpm-no2exempt-error').style.display='none';
    }

    //can't be both exempt and special
    if ((( eval(( cm1declare * 1 ) + ( cm1special * 1 ))) == 5 ) || (( eval(( cm2declare * 1 ) + ( cm2special * 1 ))) == 5 ) || (( eval(( cm3declare * 1 ) + ( cm3special * 1 ))) == 5 ) || (( eval(( cm4declare * 1 ) + ( cm4special * 1 ))) == 5 )) {
      document.getElementById('corpm-no2both-error').style.display='block';
    } else {
      document.getElementById('corpm-no2both-error').style.display='none';
    }

  <!-- errors end -->

  var cmwsvalP = document.getElementById("corpm-workers-select");
  var cmwsP = eval( cmwsvalP.value * 1 );

  var rowsCM = $('table#corpm-select-table2 tr');
  var workerCM = rowsCM.filter('.corpm-worker-selected');

  if ( cmwsP * 1 == 1 ) {
    workerCM.show();
  } else {
    workerCM.hide();
  }

  if ($("#corpm-questions1 span.error:visible").length) {
    return false;
  }

  var cm1skip = eval(( cm1declare * 1 ) + ( cm1special * 1 ));
  var cm2skip = eval(( cm2declare * 1 ) + ( cm2special * 1 ));
  var cm3skip = eval((( cm3declare * 1 ) + ( cm3special * 1 )) / ( cm3value * 1 ));
  var cm4skip = eval((( cm4declare * 1 ) + ( cm4special * 1 )) / ( cm4value * 1 ));

  if (( cmwsP * 1 == 0 ) && ( eval( cm1skip * 1 ) != 3 ) && ( eval( cm2skip * 1 ) != 3 ) && ( eval( cm3skip * 1 ) != 3 ) && ( eval( cm4skip * 1 ) != 3 ) ) {
    $('#corpm-rate-group option:eq(2)').attr('selected', 'selected');
    document.getElementById('corpm-questions1').style.display='none';
    document.getElementById('corpm-summary').style.display='block';
    document.getElementById('corpm-back1').style.display='none';
    document.getElementById('corpm-back2').style.display='block';
    corpMS2();
  } else {
    document.getElementById('corpm-questions1').style.display='none';
    document.getElementById('corpm-questions2').style.display='block';
    document.getElementById('corpm-back1').style.display='block';
    document.getElementById('corpm-back2').style.display='none';
  }
}


$(function() {
  $("#corpm-commonw-select").change(function() {
    var cw = document.getElementById("corpm-commonw-select");
    var cwSelect = cw.options[cw.selectedIndex].value;

    var rowsCW = $('table#corpm-select-table tr');
    var rowsCWsum = $('table#corpm-summary-table2 tr');

    var workerCW = rowsCW.filter('.corpm-cworker-selected');
    var workerCWsum = rowsCWsum.filter('.corpm-cworker-selected2');

    if ( cwSelect * 1 == 1 ) {
      workerCW.show();
      workerCWsum.show();
    } else {
      workerCW.hide();
      workerCWsum.hide();
    }
  });
});

function corpMS2() {
  //Common Earnings
  var cmCWS = document.getElementById("corpm-commonw-select");
  var cmCWSVal = cmCWS.options[cmCWS.selectedIndex].value;
  var cmCWSText = cmCWS.options[cmCWS.selectedIndex].text;

  var cmComWorkEarn=document.getElementById("corpm-common-work-earn");
  var cmComWorkEarnResult = eval( $(cmComWorkEarn).autoNumeric('get') * 1 );

  //Rate info
  var cm1r = document.getElementById("corpm-rate-group");
  var cm1rateVal = cm1r.options[cm1r.selectedIndex].value;
  var cm1rateText = cm1r.options[cm1r.selectedIndex].text;

  if ( cm1rateVal * 1 <= 0 ) {
    document.getElementById('corpm-rate-group-error').style.display='block';
  } else {
    document.getElementById('corpm-rate-group-error').style.display='none';
  }

  var cmwsvalP = document.getElementById("corpm-workers-select");
  var cmwsP = eval( cmwsvalP.value * 1 );

  if ( cmwsP * 1 == 1 ) {
    var insEarn = document.getElementById("corpm-ins-earn");
    var insEarnings = eval( $(insEarn).autoNumeric('get') * 1 );

    if ( insEarnings * 1 <= 0 ) {
      document.getElementById('corpm-ins-earn-error').style.display='block';
    } else {
      document.getElementById('corpm-ins-earn-error').style.display='none';
    }
  } else {
    var insEarnings = 0 ;
  }

  if ($("#corpm-questions2 span.error:visible").length) {
    return false;
  }

  document.getElementById('corpm-summary').style.display='block';
  document.getElementById('corpm-questions2').style.display='none';

  //Frequency
  var f = document.getElementById("report-frequency");
  var freq = f.options[f.selectedIndex].value;

  //CEO 1
//  var cm1name = document.getElementById("corpm-p1name");
//  var cm1nameValue = ( cm1name.value );
  var cm1per = document.getElementById("corpm-corpeo1insearn");
  var cm1insearn = ( $(cm1per).autoNumeric('get') );

  var cm1d = document.getElementById("corpm-corpeo1declare");
  var cm1declare = cm1d.options[cm1d.selectedIndex].value;
  var cm1declareText = cm1d.options[cm1d.selectedIndex].text;

  var cm1s = document.getElementById("corpm-corpeo1special");
  var cm1special = cm1s.options[cm1s.selectedIndex].value;
  var cm1specialText = cm1s.options[cm1s.selectedIndex].text;

  //CEO 2
//  var cm2name = document.getElementById("corpm-p2name");
//  var cm2nameValue = ( cm2name.value );
  var cm2per = document.getElementById("corpm-corpeo2insearn");
  var cm2insearn = ( $(cm2per).autoNumeric('get') );

  var cm2d = document.getElementById("corpm-corpeo2declare");
  var cm2declare = cm2d.options[cm2d.selectedIndex].value;
  var cm2declareText = cm2d.options[cm2d.selectedIndex].text;

  var cm2s = document.getElementById("corpm-corpeo2special");
  var cm2special = cm2s.options[cm2s.selectedIndex].value;
  var cm2specialText = cm2s.options[cm2s.selectedIndex].text;

  //partner 3
  var cm3val = document.getElementById("corpm-add3");
  var cm3value = eval( cm3val.value * 1 );

//    var cm3name = document.getElementById("corpm-p3name");
//    var cm3nameValue = ( cm3name.value );
    var cm3per = document.getElementById("corpm-corpeo3insearn");
    var cm3insearn = ( $(cm3per).autoNumeric('get') );

    var cm3d = document.getElementById("corpm-corpeo3declare");
    var cm3declare = cm3d.options[cm3d.selectedIndex].value;
    var cm3declareText = cm3d.options[cm3d.selectedIndex].text;

    var cm3s = document.getElementById("corpm-corpeo3special");
    var cm3special = cm3s.options[cm3s.selectedIndex].value;
    var cm3specialText = cm3s.options[cm3s.selectedIndex].text;

  //partner 4
  var cm4val = document.getElementById("corpm-add4");
  var cm4value = eval( cm4val.value * 1 );

//    var cm4name = document.getElementById("corpm-p4name");
//    var cm4nameValue = ( cm4name.value );
    var cm4per = document.getElementById("corpm-corpeo4insearn");
    var cm4insearn = ( $(cm4per).autoNumeric('get') );

    var cm4d = document.getElementById("corpm-corpeo4declare");
    var cm4declare = cm4d.options[cm4d.selectedIndex].value;
    var cm4declareText = cm4d.options[cm4d.selectedIndex].text;

    var cm4s = document.getElementById("corpm-corpeo4special");
    var cm4special = cm4s.options[cm4s.selectedIndex].value;
    var cm4specialText = cm4s.options[cm4s.selectedIndex].text;

  //Annual net earnings
//  var totalNet = document.getElementById("corpm-annualNet");
  var netResult = formatDecimal( eval( ( cm1insearn * 1 ) + ( cm2insearn * 1 ) + ( cm3insearn *1 ) + ( cm4insearn * 1 ) ), true, 2 ) ;

  var rowsCEO3 = $('table#corpm-summary-table tr');
  var ceo3 = rowsCEO3.filter('.ceo3');

  if ( cm3value * 1 == 1 ) {
    ceo3.show();
  } else {
    ceo3.hide();

    cm3insearn = 0 ;
    cm3declare = 1 ;
    cm3special = 2 ;
  }



  var rowsCEO4 = $('table#corpm-summary-table tr');
  var ceo4 = rowsCEO4.filter('.ceo4');

  if ( cm4value * 1 == 1 ) {
    ceo4.show();
  } else {
    ceo4.hide();

    cm4insearn = 0 ;
    cm4declare = 1 ;
    cm4special = 2 ;
  }


  var cmworkers = document.getElementById("corpm-sum-workers");

  if ( cmwsP * 1 == 1 ) {
    cmworkers.innerHTML = 'Yes' ;
  } else {
    cmworkers.innerHTML = 'No' ;
  }

  var annualNet = document.getElementById("corpm-est-annual");
  annualNet.innerHTML = formatDecimal( eval( ( cm1insearn * 1 ) + ( cm2insearn * 1 ) + ( cm3insearn *1 ) + ( cm4insearn * 1 ) ), true, 2 ) ;

    var cw = document.getElementById("corpm-commonw-select");
    var cwSelect = cw.options[cw.selectedIndex].value;
    var cwSelectText = cw.options[cw.selectedIndex].text;

  var cwSelectDisplay = document.getElementById("corpm-common-result");
  cwSelectDisplay.innerHTML = cwSelectText ;

  var cwPerPeriod = document.getElementById("corpm-per-period");
  cwPerPeriod.innerHTML = formatDecimal( eval( cmComWorkEarnResult * 1 ), true, 2 ) ;



//partner1
//  var p1name = document.getElementById("corpm-sum-partner1");
//  p1name.innerHTML = cm1nameValue ;
  var p1insearn = document.getElementById("corpm-sum-p1-insearn");
  p1insearn.innerHTML = formatDecimal( eval( cm1insearn * 1 ), true, 2 ) ;
  var p1exempt = document.getElementById("corpm-sum-p1-exempt");
  p1exempt.innerHTML = cm1declareText ;
  var p1special = document.getElementById("corpm-sum-p1-special");
  p1special.innerHTML = cm1specialText ;

//partner2
//  var p2name = document.getElementById("corpm-sum-partner2");
//  p2name.innerHTML = cm2nameValue ;
  var p2insearn = document.getElementById("corpm-sum-p2-insearn");
  p2insearn.innerHTML = formatDecimal( eval( cm2insearn * 1 ), true, 2 ) ;
  var p2exempt = document.getElementById("corpm-sum-p2-exempt");
  p2exempt.innerHTML = cm2declareText ;
  var p2special = document.getElementById("corpm-sum-p2-special");
  p2special.innerHTML = cm2specialText ;

//partner3
//  var p3name = document.getElementById("corpm-sum-partner3");
//  p3name.innerHTML = cm3nameValue ;
  var p3insearn = document.getElementById("corpm-sum-p3-insearn");
  p3insearn.innerHTML = formatDecimal( eval( cm3insearn * 1 ), true, 2 ) ;
  var p3exempt = document.getElementById("corpm-sum-p3-exempt");
  p3exempt.innerHTML = cm3declareText ;
  var p3special = document.getElementById("corpm-sum-p3-special");
  p3special.innerHTML = cm3specialText ;

//partner4
//  var p4name = document.getElementById("corpm-sum-partner4");
//  p4name.innerHTML = cm3nameValue ;
  var p4insearn = document.getElementById("corpm-sum-p4-insearn");
  p4insearn.innerHTML = formatDecimal( eval( cm4insearn * 1 ), true, 2 ) ;
  var p4exempt = document.getElementById("corpm-sum-p4-exempt");
  p4exempt.innerHTML = cm4declareText ;
  var p4special = document.getElementById("corpm-sum-p4-special");
  p4special.innerHTML = cm4specialText ;

//bottom
  var rateGroupField = document.getElementById("corpm-rate-group-display");
  rateGroupField.innerHTML = cm1rateText ;
  var rateGroupValueField = document.getElementById("corpm-rate-group-value-display");
  rateGroupValueField.innerHTML = cm1rateVal ;
  var insSumEarnField = document.getElementById("corpm-ins-earn-display");
  insSumEarnField.innerHTML = formatDecimal(( insEarnings * 1 ), true, 2 ) ;

  var high = "90300.00"
  var rateGroupAdj = eval( cm1r.value / 100 );

  var adjEarnField = document.getElementById("corpm-adj-earn-display");
  var payperField = document.getElementById("corpm-adj-payper-display");

  var payperCommonField = document.getElementById("corpm-adj-pluscommon-display");

  var p1payPartField = document.getElementById("corpm-adj-p1paypart-display");
  var p2payPartField = document.getElementById("corpm-adj-p2paypart-display");
  var p3payPartField = document.getElementById("corpm-adj-p3paypart-display");
  var p4payPartField = document.getElementById("corpm-adj-p4paypart-display");

  //var p1payPart = formatDecimal( eval( p1payPartField.innerHTML * 1 ), true, 2);
  var total1DisplayField = document.getElementById("corpm-tot-ins-earn");
  var total2DisplayField = document.getElementById("corpm-tot-ins-earn2");
  var rate1DisplayField = document.getElementById("corpm-tot-calc-prem");
  var rate2DisplayField = document.getElementById("corpm-tot-calc-prem2");

//Partners adjusted for net income (partner can't make more than high, then divide by frequency)
  var p1adjEarn = formatDecimal( eval( cm1insearn * 1 ), true, 2);
  if ( p1adjEarn * 1 >= 90300 ) {
    p1payPartField.innerHTML = formatDecimal( eval( high / freq ), true, 2);
  } else {
    p1payPartField.innerHTML = formatDecimal( eval( p1adjEarn / freq ), true, 2);
  }

  var p2adjEarn = formatDecimal( eval( cm2insearn * 1 ), true, 2);
  if ( p2adjEarn * 1 >= 90300 ) {
    p2payPartField.innerHTML = formatDecimal( eval( high / freq ), true, 2);
  } else {
    p2payPartField.innerHTML = formatDecimal( eval( p2adjEarn / freq ), true, 2);
  }

  var p3adjEarn = formatDecimal( eval( cm3insearn * 1 ), true, 2);
  if ( p3adjEarn * 1 >= 90300 ) {
    p3payPartField.innerHTML = formatDecimal( eval( high / freq ), true, 2);
  } else {
    p3payPartField.innerHTML = formatDecimal( eval( p3adjEarn / freq ), true, 2);
  }

  var p4adjEarn = formatDecimal( eval( cm4insearn * 1 ), true, 2);
  if ( p4adjEarn * 1 >= 90300 ) {
    p4payPartField.innerHTML = formatDecimal( eval( high / freq ), true, 2);
  } else {
    p4payPartField.innerHTML = formatDecimal( eval( p4adjEarn / freq ), true, 2);
  }

  //common earnings are divided by partner insearnages to get each partner's share
  var p1commonPortion = formatDecimal( eval(( ( insSumEarnField.innerHTML * 1 ) * ( cm1insearn / 100 ) )), true, 2);
  var p2commonPortion = formatDecimal( eval(( ( insSumEarnField.innerHTML * 1 ) * ( cm2insearn / 100 ) )), true, 2);
  var p3commonPortion = formatDecimal( eval(( ( insSumEarnField.innerHTML * 1 ) * ( cm3insearn / 100 ) )), true, 2);
  var p4commonPortion = formatDecimal( eval(( ( insSumEarnField.innerHTML * 1 ) * ( cm4insearn / 100 ) )), true, 2);


//total earnings maximum / minimum adjust of netResult
    adjEarnField.innerHTML = formatDecimal( eval( netResult * 1 ), true, 2 ) ;
    payperField.innerHTML = formatDecimal( eval( netResult / freq ), true, 2 ) ;
    payperCommonField.innerHTML = formatDecimal( eval(( payperField.innerHTML * 1 ) + ( insSumEarnField.innerHTML * 1 )), true, 2);

    p1payPartField.innerHTML = formatDecimal( eval( p1payPartField.innerHTML * 1 ), true, 2);
    p2payPartField.innerHTML = formatDecimal( eval( p2payPartField.innerHTML * 1 ), true, 2);
    p3payPartField.innerHTML = formatDecimal( eval( p3payPartField.innerHTML * 1 ), true, 2);
    p4payPartField.innerHTML = formatDecimal( eval( p4payPartField.innerHTML * 1 ), true, 2);

var insEarningsP1 = document.getElementById("corpm-adj-p1insearn-display");
var insEarningsP2 = document.getElementById("corpm-adj-p2insearn-display");
var insEarningsP3 = document.getElementById("corpm-adj-p3insearn-display");
var insEarningsP4 = document.getElementById("corpm-adj-p4insearn-display");

var specialEarningsP1 = document.getElementById("corpm-adj-p1specialearn-display");
var specialEarningsP2 = document.getElementById("corpm-adj-p2specialearn-display");
var specialEarningsP3 = document.getElementById("corpm-adj-p3specialearn-display");
var specialEarningsP4 = document.getElementById("corpm-adj-p4specialearn-display");

//if partners are exempt - total earnings - % of adjusted
if ( cm1declare * 1 == 4 ) {
  var cm1finalVal = 0 ;
  insEarningsP1.innerHTML = cm1finalVal ;
  var cm1specialVal = 0 ;
  specialEarningsP1.innerHTML = cm1specialVal ;
} else if ( cm1special * 1 == 1 ) {
  var cm1finalVal = 0 ;
  insEarningsP1.innerHTML = cm1finalVal ;
  var cm1specialVal = formatDecimal( eval( p1payPartField.innerHTML * 1 ), true, 2);
  specialEarningsP1.innerHTML = cm1specialVal ;
} else {
  var cm1finalVal = formatDecimal( eval( p1payPartField.innerHTML * 1 ), true, 2);
  insEarningsP1.innerHTML = cm1finalVal ;
  var cm1specialVal = 0 ;
  specialEarningsP1.innerHTML = cm1specialVal ;
}

if ( cm2declare * 1 == 4 ) {
  var cm2finalVal = 0 ;
  insEarningsP2.innerHTML = cm2finalVal ;
  var cm2specialVal = 0 ;
  specialEarningsP2.innerHTML = cm2specialVal ;
} else if ( cm2special * 1 == 1 ) {
  var cm2finalVal = 0 ;
  insEarningsP2.innerHTML = cm2finalVal ;
  var cm2specialVal = formatDecimal( eval( p2payPartField.innerHTML * 1 ), true, 2);
  specialEarningsP2.innerHTML = cm2specialVal ;
} else {
  var cm2finalVal = formatDecimal( eval( p2payPartField.innerHTML * 1 ), true, 2);
  insEarningsP2.innerHTML = cm2finalVal ;
  var cm2specialVal = 0 ;
  specialEarningsP2.innerHTML = cm2specialVal ;
}

if ( cm3declare * 1 == 4 ) {
  var cm3finalVal = 0 ;
  insEarningsP3.innerHTML = cm3finalVal ;
  var cm3specialVal = 0 ;
  specialEarningsP3.innerHTML = cm3specialVal ;
} else if ( cm3special * 1 == 1 ) {
  var cm3finalVal = 0 ;
  insEarningsP3.innerHTML = cm3finalVal ;
  var cm3specialVal = formatDecimal( eval( p3payPartField.innerHTML * 1 ), true, 2);
  specialEarningsP3.innerHTML = cm3specialVal ;
} else {
  var cm3finalVal = formatDecimal( eval( p3payPartField.innerHTML * 1 ), true, 2);
  insEarningsP3.innerHTML = cm3finalVal ;
  var cm3specialVal = 0 ;
  specialEarningsP3.innerHTML = cm3specialVal ;
}

if ( cm4declare * 1 == 4 ) {
  var cm4finalVal = 0 ;
  insEarningsP4.innerHTML = cm4finalVal ;
  var cm4specialVal = 0 ;
  specialEarningsP4.innerHTML = cm4specialVal ;
} else if (( cm4special * 1 ) == 1 ) {
  var cm4finalVal = 0 ;
  insEarningsP4.innerHTML = cm4finalVal ;
  var cm4specialVal = formatDecimal( eval( p4payPartField.innerHTML * 1 ), true, 2);
  specialEarningsP4.innerHTML = cm4specialVal ;
} else {
  var cm4finalVal = formatDecimal( eval( p4payPartField.innerHTML * 1 ), true, 2);
  insEarningsP4.innerHTML = cm4finalVal ;
  var cm4specialVal = 0 ;
  specialEarningsP4.innerHTML = cm4specialVal ;
}

//show/hide special rate values on summary
  var rowsSkipR = $('table#corpm-summary-table2 tr');
  var skipRateShow = rowsSkipR.filter('.display-ceom-skipr');

  var cm1skip = eval(( cm1declare * 1 ) + ( cm1special * 1 ));
  var cm2skip = eval(( cm2declare * 1 ) + ( cm2special * 1 ));
  var cm3skip = eval((( cm3declare * 1 ) + ( cm3special * 1 )) / ( cm3value * 1 ));
  var cm4skip = eval((( cm4declare * 1 ) + ( cm4special * 1 )) / ( cm4value * 1 ));

  if (( cmwsP * 1 == 0 ) && ( eval( cm1skip * 1 ) != 3 ) && ( eval( cm2skip * 1 ) != 3 ) && ( eval( cm3skip * 1 ) != 3 ) && ( eval( cm4skip * 1 ) != 3 )) {
    skipRateShow.hide();
  } else {
    skipRateShow.show();
  }

  var rowsSR = $('table#corpm-summary-table2 tr');
  var speacialRateShow = rowsSR.filter('.display-ceom-sr');

  if (( cm1special * 1 == 1 ) || ( cm2special * 1 == 1 ) || ( cm3special * 1 == 1 ) || ( cm4special * 1 == 1 )) {
    speacialRateShow.show();
  } else {
    speacialRateShow.hide();
  }

  var insEarningsFINALTOTAL = document.getElementById("corpm-adj-p1finalinsearntottrue-display");
  var insEarningsFINAL = document.getElementById("corpm-adj-p1finalinsearntot-display");
  var insEarningsFINAL2 = document.getElementById("corpm-adj-p1finalinsearntot-display2");
  var specialEarningsFINAL = document.getElementById("corpm-adj-p1specialtot-display");
  var specialEarningsFINAL2 = document.getElementById("corpm-adj-p1specialtot-display2");
  var finalPremiumFINAL = document.getElementById("corpm-final-premium-display");
  var finalPremiumFINAL2 = document.getElementById("corpm-final-premium-display2");
  var finalSpecialFINAL = document.getElementById("corpm-final-special-display");
  var finalSpecialFINAL2 = document.getElementById("corpm-final-special-display2");
  var finalTotalPremiumFINAL = document.getElementById("corpm-adj-p1finalpremium-display");
  var commonEarningsDisplay = document.getElementById("corpm-common-earnings-display");

//total ins earnings = cm1finalVal + cm2finalVal + cm3finalVal + cm4finalVal
  insEarningsFINAL.innerHTML = formatDecimal( eval( ( cm1finalVal * 1 ) + ( cm2finalVal * 1 ) + ( cm3finalVal * 1 ) + ( cm4finalVal * 1 ) + ( insSumEarnField.innerHTML * 1 ) /*+ ( commonEarningsDisplay.innerHTML * 1 )*/ ), true, 2);
  insEarningsFINAL2.innerHTML = formatDecimal( eval( ( cm1finalVal * 1 ) + ( cm2finalVal * 1 ) + ( cm3finalVal * 1 ) + ( cm4finalVal * 1 ) + ( insSumEarnField.innerHTML * 1 ) /*+ ( commonEarningsDisplay.innerHTML * 1 )*/ ), true, 2);
//multiply by RG
  finalPremiumFINAL.innerHTML = formatDecimal( eval(( insEarningsFINAL.innerHTML * 1 ) * rateGroupAdj ), true, 2);
  finalPremiumFINAL2.innerHTML = formatDecimal( eval(( insEarningsFINAL.innerHTML * 1 ) * rateGroupAdj ), true, 2);
//total special = cm1specialVal + cm2specialVal + cm3specialVal + cm4specialVal
  specialEarningsFINAL.innerHTML = formatDecimal( eval( ( cm1specialVal * 1 ) + ( cm2specialVal * 1 ) + ( cm3specialVal * 1 ) + ( cm4specialVal * 1 ) ), true, 2);
  specialEarningsFINAL2.innerHTML = formatDecimal( eval( ( cm1specialVal * 1 ) + ( cm2specialVal * 1 ) + ( cm3specialVal * 1 ) + ( cm4specialVal * 1 ) ), true, 2);
//multiply by .19
  finalSpecialFINAL.innerHTML = formatDecimal( eval(( specialEarningsFINAL.innerHTML * 1 ) * 0.0019 ), true, 2);
  finalSpecialFINAL2.innerHTML = formatDecimal( eval(( specialEarningsFINAL.innerHTML * 1 ) * 0.0019 ), true, 2);

  commonEarningsDisplay.innerHTML = formatDecimal( eval( cmComWorkEarnResult * 1 ), true, 2 ) ;

//final Total ins earnings all inclusive
  insEarningsFINALTOTAL.innerHTML = formatDecimal( eval( ( insEarningsFINAL.innerHTML * 1 ) + ( specialEarningsFINAL.innerHTML * 1 ) /*+ ( commonEarningsDisplay.innerHTML * 1 )*/ ), true, 2);

//final Total Premium all inclusive
  finalTotalPremiumFINAL.innerHTML = formatDecimal( eval( ( finalPremiumFINAL.innerHTML * 1 ) + ( finalSpecialFINAL.innerHTML * 1 ) ), true, 2);

  total1DisplayField.innerHTML = formatDecimal( eval( ( insEarningsFINAL.innerHTML * 1 ) + ( specialEarningsFINAL.innerHTML * 1 ) /*+ ( commonEarningsDisplay.innerHTML * 1 )*/ ), true, 2);
  total2DisplayField.innerHTML = formatDecimal( eval( ( insEarningsFINAL.innerHTML * 1 ) + ( specialEarningsFINAL.innerHTML * 1 ) /*+ ( commonEarningsDisplay.innerHTML * 1 )*/ ), true, 2);

  rate1DisplayField.innerHTML = formatDecimal( eval( ( finalPremiumFINAL.innerHTML * 1 ) + ( finalSpecialFINAL.innerHTML * 1 ) ), true, 2);
  rate2DisplayField.innerHTML = formatDecimal( eval( ( finalPremiumFINAL.innerHTML * 1 ) + ( finalSpecialFINAL.innerHTML * 1 ) ), true, 2);

//.substring(0,3)

}

function corpYesMultiM() {
  var salary = document.getElementById("corp-multi-1eo-sr-step2-annual-earnings");
  var cmresult = eval( $(salary).autoNumeric('get') * 1 );

  var cmex = document.getElementById("corp-multi-1eo-sr-step2-exempt");
  var cmexemptVal = cmex.options[cmex.selectedIndex].value;
  var cmexemptText = cmex.options[cmex.selectedIndex].text;

  var cmqy = document.getElementById("corp-multi-1eo-sr-step2-qualify-755");
  var cmqualifyVal = cmqy.options[cmqy.selectedIndex].value;
  var cmqualifyText = cmqy.options[cmqy.selectedIndex].text;

  if ( ( cmresult * 1 <= 0 ) || ( cmexemptVal * 1 <= 0 ) || ( cmqualifyVal * 1 <= 0 ) ) {
    if ( cmresult * 1 <= 0 ) {
      document.getElementById('corp-multi-1eo-sr-step2-annual-earnings-error').style.display='block';
    } else {
      document.getElementById('corp-multi-1eo-sr-step2-annual-earnings-error').style.display='none';
    }

    if ( cmexemptVal * 1 <= 0 ) {
      document.getElementById('corp-multi-1eo-sr-step2-exempt-error').style.display='block';
    } else {
      document.getElementById('corp-multi-1eo-sr-step2-exempt-error').style.display='none';
    }

    if ( cmqualifyVal * 1 <= 0 ) {
      document.getElementById('corp-multi-1eo-sr-step2-qualify-755-error').style.display='block';
    } else {
      document.getElementById('corp-multi-1eo-sr-step2-qualify-755-error').style.display='none';
    }
  } else {
    document.getElementById('corp-multi-1eo-sr-step2-annual-earnings-error').style.display='none';
    document.getElementById('corp-multi-1eo-sr-step2-exempt-error').style.display='none';
    document.getElementById('corp-multi-1eo-sr-step2-qualify-755-error').style.display='none';

    document.getElementById('corp-multi-1eo-sr-step3').style.display='block';
    document.getElementById('corp-multi-1eo-sr-step2').style.display='none';
  }
}

//corp Multi Leo single rate indentifiable joejoe portion.
//joe and Ele functions start
function corpMultiLeoSrCalculate() {
<!-- calculation start-->

  <!-- step1 -->
  var e = document.getElementById("report-frequency");
  var reportFrequency = e.options[e.selectedIndex].value;
  var reportFrequencyText = e.options[e.selectedIndex].text;

  <!-- step2 -->
  var corpMultiLeoSr_step2_annual_earnings = document.getElementById("corp-multi-1eo-sr-step2-annual-earnings").value;
  var corpMultiLeoSr_step2_annual_earnings_display = corpMultiLeoSr_step2_annual_earnings;

  var exempt = document.getElementById("corp-multi-1eo-sr-step2-exempt");
  var corpMultiLeoSr_step2_exempt = exempt.options[exempt.selectedIndex].value;
  var corpMultiLeoSr_step2_exempt_text = exempt.options[exempt.selectedIndex].text;

  var qualify755 = document.getElementById("corp-multi-1eo-sr-step2-qualify-755");
  var corpMultiLeoSr_step2_qualify755 = qualify755.options[qualify755.selectedIndex].value;
  var corpMultiLeoSr_step2_qualify755_text = qualify755.options[qualify755.selectedIndex].text;

  <!-- step3 -->
  var fromActivity = document.getElementById("corp-multi-1eo-sr-step3-from-activity");
  var corpMultiLeoSr_step3_from_activity = fromActivity.options[fromActivity.selectedIndex].value;
  var corpMultiLeoSr_step3_from_activity_text = fromActivity.options[fromActivity.selectedIndex].text;

  var corpMultiLeoSr_step3_worker_earnings = $(document.getElementById("corp-multi-1eo-sr-step3-worker-earnings")).autoNumeric('get');

  // preCalculation. conditions apply
  var corpMultiLeoSr_step2_annual_earnings_period_value;
  var corpMultiLeoSr_step2_annual_earnings_br1;
  var corpMultiLeoSr_step2_annual_earnings_br2;
  var corpMultiLeoSr_step3_worker_earnings_display = corpMultiLeoSr_step3_worker_earnings;

  if (corpMultiLeoSr_step2_exempt_text == 'Yes'){
    corpMultiLeoSr_step2_annual_earnings = 0;

    //need to reset qulify755 to No.
    corpMultiLeoSr_step2_qualify755 =2;
    corpMultiLeoSr_step2_qualify755_text = 'No';
}

//  alert(corpMultiLeoSr_step2_annual_earnings);

  if (corpMultiLeoSr_step3_from_activity_text == 'No'){
    corpMultiLeoSr_step3_worker_earnings = 0;
  }

  if ( corpMultiLeoSr_step2_annual_earnings >= 90300){
     corpMultiLeoSr_step2_annual_earnings_br1 = 90300;
  } else {
    corpMultiLeoSr_step2_annual_earnings_br1 = corpMultiLeoSr_step2_annual_earnings;
  }

//  alert(corpMultiLeoSr_step2_annual_earnings_br1);
  if (reportFrequency == 1){
    corpMultiLeoSr_step2_annual_earnings_period_value = corpMultiLeoSr_step2_annual_earnings_br1;
    corpMultiLeoSr_step2_annual_earnings_br2 = corpMultiLeoSr_step2_annual_earnings_br1;
  } else if (reportFrequency == 4) {
    corpMultiLeoSr_step2_annual_earnings_period_value = parseFloat(corpMultiLeoSr_step2_annual_earnings_br1)/4;
    corpMultiLeoSr_step2_annual_earnings_br2 = parseFloat(corpMultiLeoSr_step2_annual_earnings_br1)/4;
  } else if (reportFrequency == 12){
    corpMultiLeoSr_step2_annual_earnings_period_value  = parseFloat(corpMultiLeoSr_step2_annual_earnings_br1)/12;
    corpMultiLeoSr_step2_annual_earnings_br2 = parseFloat(corpMultiLeoSr_step2_annual_earnings_br1)/12;
  }

// alert("totalEarning: " + corpMultiLeoSr_step2_annual_earnings_period_value);
  if ( corpMultiLeoSr_step2_exempt_text=='No' && corpMultiLeoSr_step2_qualify755_text=='No') { /////////////////////////////xxxxxxxxxxxx
    corpMultiLeoSr_step3_worker_earnings = parseFloat(corpMultiLeoSr_step3_worker_earnings) + parseFloat(corpMultiLeoSr_step2_annual_earnings_br2);
  }

//  alert(corpMultiLeoSr_step3_worker_earnings);

  <!-- rate group1-->
  var rategroup1 = document.getElementById("corp-multi-1eo-sr-step3-rate-group1");
  var corpMultiLeoSr_step3_rate_group1 = rategroup1.options[rategroup1.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group1_text = rategroup1.options[rategroup1.selectedIndex].text;

  var corpMultiLeoSr_step3_rate_group1_direct_earnings = $(document.getElementById("corp-multi-1eo-sr-step3-rate-group1-direct-earnings")).autoNumeric('get');

  <!-- rate group2-->
  var rategroup2 = document.getElementById("corp-multi-1eo-sr-step3-rate-group2");
  var corpMultiLeoSr_step3_rate_group2 = rategroup2.options[rategroup2.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group2_text = rategroup2.options[rategroup2.selectedIndex].text;

  var corpMultiLeoSr_step3_rate_group2_direct_earnings = $(document.getElementById("corp-multi-1eo-sr-step3-rate-group2-direct-earnings")).autoNumeric('get');

    <!-- rate group3-->
  var rategroup3 = document.getElementById("corp-multi-1eo-sr-step3-rate-group3");
  var corpMultiLeoSr_step3_rate_group3 = rategroup3.options[rategroup3.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group3_text = rategroup3.options[rategroup3.selectedIndex].text;

  var corpMultiLeoSr_step3_rate_group3_direct_earnings = $(document.getElementById("corp-multi-1eo-sr-step3-rate-group3-direct-earnings")).autoNumeric('get');

    <!-- rate group4-->
  var rategroup4 = document.getElementById("corp-multi-1eo-sr-step3-rate-group4");
  var corpMultiLeoSr_step3_rate_group4 = rategroup4.options[rategroup4.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group4_text = rategroup4.options[rategroup4.selectedIndex].text;

  var corpMultiLeoSr_step3_rate_group4_direct_earnings = $(document.getElementById("corp-multi-1eo-sr-step3-rate-group4-direct-earnings")).autoNumeric('get');

    <!-- rate group5-->
  var rategroup5 = document.getElementById("corp-multi-1eo-sr-step3-rate-group5");
  var corpMultiLeoSr_step3_rate_group5 = rategroup5.options[rategroup5.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group5_text = rategroup5.options[rategroup5.selectedIndex].text;

  var corpMultiLeoSr_step3_rate_group5_direct_earnings = $(document.getElementById("corp-multi-1eo-sr-step3-rate-group5-direct-earnings")).autoNumeric('get');

   <!-- rate group6-->
  var rategroup6 = document.getElementById("corp-multi-1eo-sr-step3-rate-group6");
  var corpMultiLeoSr_step3_rate_group6 = rategroup6.options[rategroup6.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group6_text = rategroup6.options[rategroup6.selectedIndex].text;

  var corpMultiLeoSr_step3_rate_group6_direct_earnings = $(document.getElementById("corp-multi-1eo-sr-step3-rate-group6-direct-earnings")).autoNumeric('get');

  <!-- rate group7-->
  var rategroup7 = document.getElementById("corp-multi-1eo-sr-step3-rate-group7");
  var corpMultiLeoSr_step3_rate_group7 = rategroup7.options[rategroup7.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group7_text = rategroup7.options[rategroup7.selectedIndex].text;

  var corpMultiLeoSr_step3_rate_group7_direct_earnings = $(document.getElementById("corp-multi-1eo-sr-step3-rate-group7-direct-earnings")).autoNumeric('get');

  <!-- rate group8-->
  var rategroup8 = document.getElementById("corp-multi-1eo-sr-step3-rate-group8");
  var corpMultiLeoSr_step3_rate_group8 = rategroup8.options[rategroup8.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group8_text = rategroup8.options[rategroup8.selectedIndex].text;

  var corpMultiLeoSr_step3_rate_group8_direct_earnings = $(document.getElementById("corp-multi-1eo-sr-step3-rate-group8-direct-earnings")).autoNumeric('get');

  <!-- rate group9-->
  var rategroup9 = document.getElementById("corp-multi-1eo-sr-step3-rate-group9");
  var corpMultiLeoSr_step3_rate_group9 = rategroup9.options[rategroup9.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group9_text = rategroup9.options[rategroup9.selectedIndex].text;

  var corpMultiLeoSr_step3_rate_group9_direct_earnings = $(document.getElementById("corp-multi-1eo-sr-step3-rate-group9-direct-earnings")).autoNumeric('get');

  <!-- rate group10-->
  var rategroup10 = document.getElementById("corp-multi-1eo-sr-step3-rate-group10");
  var corpMultiLeoSr_step3_rate_group10 = rategroup10.options[rategroup10.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group10_text = rategroup10.options[rategroup10.selectedIndex].text;

  var corpMultiLeoSr_step3_rate_group10_direct_earnings = $(document.getElementById("corp-multi-1eo-sr-step3-rate-group10-direct-earnings")).autoNumeric('get');

  <!-- summary -->
  var corpMultiLeoSr_summary_step1_how_often = document.getElementById("corp-multi-1eo-sr-summary-step1-how-often");

  var corpMultiLeoSr_summary_step2_annual_earnings = document.getElementById("corp-multi-1eo-sr-summary-step2-annual-earnings");
  var corpMultiLeoSr_summary_step2_exempt = document.getElementById("corp-multi-1eo-sr-summary-step2-exempt");
  var corpMultiLeoSr_summary_step2_qualify_755 = document.getElementById("corp-multi-1eo-sr-summary-step2-qualify-755");


  var corpMultiLeoSr_summary_step3_from_activity = document.getElementById("corp-multi-1eo-sr-summary-step3-from-activity");
  var corpMultiLeoSr_summary_step3_worker_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-worker-earnings");

  var corpMultiLeoSr_summary_step3_rategroup755 = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup755");
  var corpMultiLeoSr_summary_step3_rategroup755_name = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup755-name");
  var corpMultiLeoSr_summary_step3_rategroup755_value = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup755-value");
  var corpMultiLeoSr_summary_step3_rategroup755_premium_amount = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup755-premium-amount");
  var corpMultiLeoSr_summary_step3_rategroup755_insurable_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup755-insurable-earnings");

  var corpMultiLeoSr_summary_step3_rategroup1 = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup1");
  var corpMultiLeoSr_summary_step3_rategroup1_name = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup1-name");
  var corpMultiLeoSr_summary_step3_rategroup1_value = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup1-value");
  var corpMultiLeoSr_summary_step3_rategroup1_how_often = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup1-how-often");
  var corpMultiLeoSr_summary_step3_rategroup1_direct_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup1-direct-earnings");
  var corpMultiLeoSr_summary_step3_rategroup1_premium_amount = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup1-premium-amount");
  var corpMultiLeoSr_summary_step3_rategroup1_insurable_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup1-insurable-earnings");

  var corpMultiLeoSr_summary_step3_rategroup2 = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup2");
  var corpMultiLeoSr_summary_step3_rategroup2_name = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup2-name");
  var corpMultiLeoSr_summary_step3_rategroup2_value = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup2-value");
  var corpMultiLeoSr_summary_step3_rategroup2_how_often = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup2-how-often");
  var corpMultiLeoSr_summary_step3_rategroup2_direct_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup2-direct-earnings");
  var corpMultiLeoSr_summary_step3_rategroup2_premium_amount = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup2-premium-amount");
  var corpMultiLeoSr_summary_step3_rategroup2_insurable_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup2-insurable-earnings");

  var corpMultiLeoSr_summary_step3_rategroup3 = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup3");
  var corpMultiLeoSr_summary_step3_rategroup3_name = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup3-name");
  var corpMultiLeoSr_summary_step3_rategroup3_value = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup3-value");
  var corpMultiLeoSr_summary_step3_rategroup3_how_often = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup3-how-often");
  var corpMultiLeoSr_summary_step3_rategroup3_direct_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup3-direct-earnings");
  var corpMultiLeoSr_summary_step3_rategroup3_premium_amount = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup3-premium-amount");
  var corpMultiLeoSr_summary_step3_rategroup3_insurable_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup3-insurable-earnings");

  var corpMultiLeoSr_summary_step3_rategroup4 = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup4");
  var corpMultiLeoSr_summary_step3_rategroup4_name = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup4-name");
  var corpMultiLeoSr_summary_step3_rategroup4_value = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup4-value");
  var corpMultiLeoSr_summary_step3_rategroup4_how_often = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup4-how-often");
  var corpMultiLeoSr_summary_step3_rategroup4_direct_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup4-direct-earnings");
  var corpMultiLeoSr_summary_step3_rategroup4_premium_amount = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup4-premium-amount");
  var corpMultiLeoSr_summary_step3_rategroup4_insurable_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup4-insurable-earnings");

  var corpMultiLeoSr_summary_step3_rategroup5 = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup5");
  var corpMultiLeoSr_summary_step3_rategroup5_name = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup5-name");
  var corpMultiLeoSr_summary_step3_rategroup5_value = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup5-value");
  var corpMultiLeoSr_summary_step3_rategroup5_how_often = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup5-how-often");
  var corpMultiLeoSr_summary_step3_rategroup5_direct_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup5-direct-earnings");
  var corpMultiLeoSr_summary_step3_rategroup5_premium_amount = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup5-premium-amount");
  var corpMultiLeoSr_summary_step3_rategroup5_insurable_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup5-insurable-earnings");

  var corpMultiLeoSr_summary_step3_rategroup6 = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup6");
  var corpMultiLeoSr_summary_step3_rategroup6_name = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup6-name");
  var corpMultiLeoSr_summary_step3_rategroup6_value = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup6-value");
  var corpMultiLeoSr_summary_step3_rategroup6_how_often = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup6-how-often");
  var corpMultiLeoSr_summary_step3_rategroup6_direct_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup6-direct-earnings");
  var corpMultiLeoSr_summary_step3_rategroup6_premium_amount = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup6-premium-amount");
  var corpMultiLeoSr_summary_step3_rategroup6_insurable_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup6-insurable-earnings");

  var corpMultiLeoSr_summary_step3_rategroup7 = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup7");
  var corpMultiLeoSr_summary_step3_rategroup7_name = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup7-name");
  var corpMultiLeoSr_summary_step3_rategroup7_value = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup7-value");
  var corpMultiLeoSr_summary_step3_rategroup7_how_often = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup7-how-often");
  var corpMultiLeoSr_summary_step3_rategroup7_direct_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup7-direct-earnings");
  var corpMultiLeoSr_summary_step3_rategroup7_premium_amount = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup7-premium-amount");
  var corpMultiLeoSr_summary_step3_rategroup7_insurable_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup7-insurable-earnings");

  var corpMultiLeoSr_summary_step3_rategroup8 = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup8");
  var corpMultiLeoSr_summary_step3_rategroup8_name = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup8-name");
  var corpMultiLeoSr_summary_step3_rategroup8_value = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup8-value");
  var corpMultiLeoSr_summary_step3_rategroup8_how_often = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup8-how-often");
  var corpMultiLeoSr_summary_step3_rategroup8_direct_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup8-direct-earnings");
  var corpMultiLeoSr_summary_step3_rategroup8_premium_amount = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup8-premium-amount");
  var corpMultiLeoSr_summary_step3_rategroup8_insurable_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup8-insurable-earnings");

  var corpMultiLeoSr_summary_step3_rategroup9 = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup9");
  var corpMultiLeoSr_summary_step3_rategroup9_name = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup9-name");
  var corpMultiLeoSr_summary_step3_rategroup9_value = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup9-value");
  var corpMultiLeoSr_summary_step3_rategroup9_how_often = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup9-how-often");
  var corpMultiLeoSr_summary_step3_rategroup9_direct_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup9-direct-earnings");
  var corpMultiLeoSr_summary_step3_rategroup9_premium_amount = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup9-premium-amount");
  var corpMultiLeoSr_summary_step3_rategroup9_insurable_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup9-insurable-earnings");

  var corpMultiLeoSr_summary_step3_rategroup10 = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup10");
  var corpMultiLeoSr_summary_step3_rategroup10_name = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup10-name");
  var corpMultiLeoSr_summary_step3_rategroup10_value = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup10-value");
  var corpMultiLeoSr_summary_step3_rategroup10_how_often = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup10-how-often");
  var corpMultiLeoSr_summary_step3_rategroup10_direct_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup10-direct-earnings");
  var corpMultiLeoSr_summary_step3_rategroup10_premium_amount = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup10-premium-amount");
  var corpMultiLeoSr_summary_step3_rategroup10_insurable_earnings = document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup10-insurable-earnings");

  //var corpMultiLeoSr_summary_result_insurable_premium_total = document.getElementById("corp-multi-1eo-sr-summary-result-insurable-premium-total");
  var corpMultiLeoSr_summary_result_insurable_total = document.getElementById("corp-multi-1eo-sr-summary-result-insurable-total");
  var corpMultiLeoSr_summary_result_premium_total = document.getElementById("corp-multi-1eo-sr-summary-result-premium-total");

  var corpMultiLeoSr_step3_rate_group1_premium_rate = rategroup1.options[rategroup1.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group2_premium_rate = rategroup2.options[rategroup2.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group3_premium_rate = rategroup3.options[rategroup3.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group4_premium_rate = rategroup4.options[rategroup4.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group5_premium_rate = rategroup5.options[rategroup5.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group6_premium_rate = rategroup6.options[rategroup6.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group7_premium_rate = rategroup7.options[rategroup7.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group8_premium_rate = rategroup8.options[rategroup8.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group9_premium_rate = rategroup9.options[rategroup9.selectedIndex].value;
  var corpMultiLeoSr_step3_rate_group10_premium_rate = rategroup10.options[rategroup10.selectedIndex].value;

  var corpMultiLeoSr_step3_rate_group=document.getElementsByName("corp-multi-1eo-sr-step3-rate-group");

    document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup1").style.display='block';
    document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup2").style.display='block';
    document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup3").style.display='block';
    document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup4").style.display='block';
    document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup5").style.display='block';
    document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup6").style.display='block';
    document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup7").style.display='block';
    document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup8").style.display='block';
    document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup9").style.display='block';
    document.getElementById("corp-multi-1eo-sr-summary-step3-rategroup10").style.display='block';
  for(var i=0;i<10;i++){

      //alert(corpMultiLeoSr_step3_rate_group[i].value);

    if (corpMultiLeoSr_step3_rate_group[i].value == 0){

      switch (i+1)
      {
      case 1:
        corpMultiLeoSr_step3_rate_group1_direct_earnings = 0;
          corpMultiLeoSr_step3_rate_group1_premium_rate = 0;
        corpMultiLeoSr_summary_step3_rategroup1.style.display='none';
        break;
      case 2:
        corpMultiLeoSr_step3_rate_group2_direct_earnings = 0;
        corpMultiLeoSr_step3_rate_group2_premium_rate = 0;
        corpMultiLeoSr_summary_step3_rategroup2.style.display='none';
        break;
      case 3:
        corpMultiLeoSr_step3_rate_group3_direct_earnings = 0;
        corpMultiLeoSr_step3_rate_group3_premium_rate =0;
        corpMultiLeoSr_summary_step3_rategroup3.style.display='none';
        break;
      case 4:
        corpMultiLeoSr_step3_rate_group4_direct_earnings = 0;
        corpMultiLeoSr_step3_rate_group4_premium_rate =0;
        corpMultiLeoSr_summary_step3_rategroup4.style.display='none';
        break;
      case 5:
        corpMultiLeoSr_step3_rate_group5_direct_earnings = 0;
        corpMultiLeoSr_step3_rate_group5_premium_rate =0;
        corpMultiLeoSr_summary_step3_rategroup5.style.display='none';
        break;

      case 6:
        corpMultiLeoSr_step3_rate_group6_direct_earnings = 0;
        corpMultiLeoSr_step3_rate_group6_premium_rate =0;
        corpMultiLeoSr_summary_step3_rategroup6.style.display='none';
        break;
      case 7:
        corpMultiLeoSr_step3_rate_group7_direct_earnings = 0;
        corpMultiLeoSr_step3_rate_group7_premium_rate =0;
        corpMultiLeoSr_summary_step3_rategroup7.style.display='none';
        break;
      case 8:
        corpMultiLeoSr_step3_rate_group8_direct_earnings = 0;
        corpMultiLeoSr_step3_rate_group8_premium_rate =0;
        corpMultiLeoSr_summary_step3_rategroup8.style.display='none';
        break;
      case 9:
        corpMultiLeoSr_step3_rate_group9_direct_earnings = 0;
        corpMultiLeoSr_step3_rate_group9_premium_rate =0;
        corpMultiLeoSr_summary_step3_rategroup9.style.display='none';
        break;
      case 10:
        corpMultiLeoSr_step3_rate_group10_direct_earnings = 0;
        corpMultiLeoSr_step3_rate_group10_premium_rate =0;
        corpMultiLeoSr_summary_step3_rategroup10.style.display='none';
        break;
      }
     }
    }

  var corpMultiLeoSr_step3_rate_group_direct_earnings_total = parseFloat(corpMultiLeoSr_step3_rate_group1_direct_earnings) + parseFloat(corpMultiLeoSr_step3_rate_group2_direct_earnings)
    + parseFloat(corpMultiLeoSr_step3_rate_group3_direct_earnings) + parseFloat(corpMultiLeoSr_step3_rate_group4_direct_earnings) + parseFloat(corpMultiLeoSr_step3_rate_group5_direct_earnings)
    + parseFloat(corpMultiLeoSr_step3_rate_group6_direct_earnings) + parseFloat(corpMultiLeoSr_step3_rate_group7_direct_earnings) + parseFloat(corpMultiLeoSr_step3_rate_group8_direct_earnings)
    + parseFloat(corpMultiLeoSr_step3_rate_group9_direct_earnings) + parseFloat(corpMultiLeoSr_step3_rate_group10_direct_earnings);

  var corpMultiLeoSr_step3_rate_group1_direct_earnings_percentage = corpMultiLeoSr_step3_rate_group1_direct_earnings/corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var corpMultiLeoSr_step3_rate_group2_direct_earnings_percentage = corpMultiLeoSr_step3_rate_group2_direct_earnings/corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var corpMultiLeoSr_step3_rate_group3_direct_earnings_percentage = corpMultiLeoSr_step3_rate_group3_direct_earnings/corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var corpMultiLeoSr_step3_rate_group4_direct_earnings_percentage = corpMultiLeoSr_step3_rate_group4_direct_earnings/corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var corpMultiLeoSr_step3_rate_group5_direct_earnings_percentage = corpMultiLeoSr_step3_rate_group5_direct_earnings/corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var corpMultiLeoSr_step3_rate_group6_direct_earnings_percentage = corpMultiLeoSr_step3_rate_group6_direct_earnings/corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var corpMultiLeoSr_step3_rate_group7_direct_earnings_percentage = corpMultiLeoSr_step3_rate_group7_direct_earnings/corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var corpMultiLeoSr_step3_rate_group8_direct_earnings_percentage = corpMultiLeoSr_step3_rate_group8_direct_earnings/corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var corpMultiLeoSr_step3_rate_group9_direct_earnings_percentage = corpMultiLeoSr_step3_rate_group9_direct_earnings/corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var corpMultiLeoSr_step3_rate_group10_direct_earnings_percentage = corpMultiLeoSr_step3_rate_group10_direct_earnings/corpMultiLeoSr_step3_rate_group_direct_earnings_total;

  var corpMultiLeoSr_step3_rate_group1_direct_earnings_prorated = corpMultiLeoSr_step3_worker_earnings * corpMultiLeoSr_step3_rate_group1_direct_earnings_percentage;
  var corpMultiLeoSr_step3_rate_group2_direct_earnings_prorated = corpMultiLeoSr_step3_worker_earnings * corpMultiLeoSr_step3_rate_group2_direct_earnings_percentage;
  var corpMultiLeoSr_step3_rate_group3_direct_earnings_prorated = corpMultiLeoSr_step3_worker_earnings * corpMultiLeoSr_step3_rate_group3_direct_earnings_percentage;
  var corpMultiLeoSr_step3_rate_group4_direct_earnings_prorated = corpMultiLeoSr_step3_worker_earnings * corpMultiLeoSr_step3_rate_group4_direct_earnings_percentage;
  var corpMultiLeoSr_step3_rate_group5_direct_earnings_prorated = corpMultiLeoSr_step3_worker_earnings * corpMultiLeoSr_step3_rate_group5_direct_earnings_percentage;
  var corpMultiLeoSr_step3_rate_group6_direct_earnings_prorated = corpMultiLeoSr_step3_worker_earnings * corpMultiLeoSr_step3_rate_group6_direct_earnings_percentage;
  var corpMultiLeoSr_step3_rate_group7_direct_earnings_prorated = corpMultiLeoSr_step3_worker_earnings * corpMultiLeoSr_step3_rate_group7_direct_earnings_percentage;
  var corpMultiLeoSr_step3_rate_group8_direct_earnings_prorated = corpMultiLeoSr_step3_worker_earnings * corpMultiLeoSr_step3_rate_group8_direct_earnings_percentage;
  var corpMultiLeoSr_step3_rate_group9_direct_earnings_prorated = corpMultiLeoSr_step3_worker_earnings * corpMultiLeoSr_step3_rate_group9_direct_earnings_percentage;
  var corpMultiLeoSr_step3_rate_group10_direct_earnings_prorated = corpMultiLeoSr_step3_worker_earnings * corpMultiLeoSr_step3_rate_group10_direct_earnings_percentage;

  var corpMultiLeoSr_step3_rate_group1_direct_earnings_insurable = parseFloat(corpMultiLeoSr_step3_rate_group1_direct_earnings) + parseFloat(corpMultiLeoSr_step3_rate_group1_direct_earnings_prorated);
  var corpMultiLeoSr_step3_rate_group2_direct_earnings_insurable = parseFloat(corpMultiLeoSr_step3_rate_group2_direct_earnings) + parseFloat(corpMultiLeoSr_step3_rate_group2_direct_earnings_prorated);
  var corpMultiLeoSr_step3_rate_group3_direct_earnings_insurable = parseFloat(corpMultiLeoSr_step3_rate_group3_direct_earnings) + parseFloat(corpMultiLeoSr_step3_rate_group3_direct_earnings_prorated);
  var corpMultiLeoSr_step3_rate_group4_direct_earnings_insurable = parseFloat(corpMultiLeoSr_step3_rate_group4_direct_earnings) + parseFloat(corpMultiLeoSr_step3_rate_group4_direct_earnings_prorated);
  var corpMultiLeoSr_step3_rate_group5_direct_earnings_insurable = parseFloat(corpMultiLeoSr_step3_rate_group5_direct_earnings) + parseFloat(corpMultiLeoSr_step3_rate_group5_direct_earnings_prorated);
  var corpMultiLeoSr_step3_rate_group6_direct_earnings_insurable = parseFloat(corpMultiLeoSr_step3_rate_group6_direct_earnings) + parseFloat(corpMultiLeoSr_step3_rate_group6_direct_earnings_prorated);
  var corpMultiLeoSr_step3_rate_group7_direct_earnings_insurable = parseFloat(corpMultiLeoSr_step3_rate_group7_direct_earnings) + parseFloat(corpMultiLeoSr_step3_rate_group7_direct_earnings_prorated);
  var corpMultiLeoSr_step3_rate_group8_direct_earnings_insurable = parseFloat(corpMultiLeoSr_step3_rate_group8_direct_earnings) + parseFloat(corpMultiLeoSr_step3_rate_group8_direct_earnings_prorated);
  var corpMultiLeoSr_step3_rate_group9_direct_earnings_insurable = parseFloat(corpMultiLeoSr_step3_rate_group9_direct_earnings) + parseFloat(corpMultiLeoSr_step3_rate_group9_direct_earnings_prorated);
  var corpMultiLeoSr_step3_rate_group10_direct_earnings_insurable = parseFloat(corpMultiLeoSr_step3_rate_group10_direct_earnings) + parseFloat(corpMultiLeoSr_step3_rate_group10_direct_earnings_prorated);

  var corpMultiLeoSr_step3_rate_group1_premium_owed = corpMultiLeoSr_step3_rate_group1_premium_rate/100 * corpMultiLeoSr_step3_rate_group1_direct_earnings_insurable;
  var corpMultiLeoSr_step3_rate_group2_premium_owed = corpMultiLeoSr_step3_rate_group2_premium_rate/100 * corpMultiLeoSr_step3_rate_group2_direct_earnings_insurable;
  var corpMultiLeoSr_step3_rate_group3_premium_owed = corpMultiLeoSr_step3_rate_group3_premium_rate/100 * corpMultiLeoSr_step3_rate_group3_direct_earnings_insurable;
  var corpMultiLeoSr_step3_rate_group4_premium_owed = corpMultiLeoSr_step3_rate_group4_premium_rate/100 * corpMultiLeoSr_step3_rate_group4_direct_earnings_insurable;
  var corpMultiLeoSr_step3_rate_group5_premium_owed = corpMultiLeoSr_step3_rate_group5_premium_rate/100 * corpMultiLeoSr_step3_rate_group5_direct_earnings_insurable;
  var corpMultiLeoSr_step3_rate_group6_premium_owed = corpMultiLeoSr_step3_rate_group6_premium_rate/100 * corpMultiLeoSr_step3_rate_group6_direct_earnings_insurable;
  var corpMultiLeoSr_step3_rate_group7_premium_owed = corpMultiLeoSr_step3_rate_group7_premium_rate/100 * corpMultiLeoSr_step3_rate_group7_direct_earnings_insurable;
  var corpMultiLeoSr_step3_rate_group8_premium_owed = corpMultiLeoSr_step3_rate_group8_premium_rate/100 * corpMultiLeoSr_step3_rate_group8_direct_earnings_insurable;
  var corpMultiLeoSr_step3_rate_group9_premium_owed = corpMultiLeoSr_step3_rate_group9_premium_rate/100 * corpMultiLeoSr_step3_rate_group9_direct_earnings_insurable;
  var corpMultiLeoSr_step3_rate_group10_premium_owed = corpMultiLeoSr_step3_rate_group10_premium_rate/100 * corpMultiLeoSr_step3_rate_group10_direct_earnings_insurable;


  var corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var corpMultiLeoSr_step3_rate_group_premium_owed_total;

   if ( corpMultiLeoSr_step2_exempt_text=='Yes') {

    corpMultiLeoSr_step3_rate_group_direct_earnings_total = parseFloat(corpMultiLeoSr_step3_rate_group1_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group2_direct_earnings_insurable)
    + parseFloat(corpMultiLeoSr_step3_rate_group3_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group4_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group5_direct_earnings_insurable)
    + parseFloat(corpMultiLeoSr_step3_rate_group6_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group7_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group8_direct_earnings_insurable)
    + parseFloat(corpMultiLeoSr_step3_rate_group9_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group10_direct_earnings_insurable);

    corpMultiLeoSr_step3_rate_group_premium_owed_total = parseFloat(corpMultiLeoSr_step3_rate_group1_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group2_premium_owed)
    + parseFloat(corpMultiLeoSr_step3_rate_group3_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group4_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group5_premium_owed)
    + parseFloat(corpMultiLeoSr_step3_rate_group6_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group7_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group8_premium_owed)
    + parseFloat(corpMultiLeoSr_step3_rate_group9_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group10_premium_owed);

   } else if ( corpMultiLeoSr_step2_exempt_text=='No' && corpMultiLeoSr_step2_qualify755_text=='Yes') {

    corpMultiLeoSr_step3_rate_group_direct_earnings_total = parseFloat(corpMultiLeoSr_step3_rate_group1_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group2_direct_earnings_insurable)
    + parseFloat(corpMultiLeoSr_step3_rate_group3_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group4_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group5_direct_earnings_insurable)
    + parseFloat(corpMultiLeoSr_step3_rate_group6_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group7_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group8_direct_earnings_insurable)
    + parseFloat(corpMultiLeoSr_step3_rate_group9_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group10_direct_earnings_insurable)
     + parseFloat(corpMultiLeoSr_step2_annual_earnings_br2)   ;

    corpMultiLeoSr_step3_rate_group_premium_owed_total = parseFloat(corpMultiLeoSr_step3_rate_group1_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group2_premium_owed)
    + parseFloat(corpMultiLeoSr_step3_rate_group3_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group4_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group5_premium_owed)
    + parseFloat(corpMultiLeoSr_step3_rate_group6_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group7_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group8_premium_owed)
    + parseFloat(corpMultiLeoSr_step3_rate_group9_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group10_premium_owed)
      + parseFloat(corpMultiLeoSr_step2_annual_earnings_period_value * 0.0019);

  } else if (corpMultiLeoSr_step2_exempt_text=='No' && corpMultiLeoSr_step2_qualify755_text=='No' ) {

    corpMultiLeoSr_step3_rate_group_direct_earnings_total = parseFloat(corpMultiLeoSr_step3_rate_group1_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group2_direct_earnings_insurable)
    + parseFloat(corpMultiLeoSr_step3_rate_group3_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group4_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group5_direct_earnings_insurable)
    + parseFloat(corpMultiLeoSr_step3_rate_group6_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group7_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group8_direct_earnings_insurable)
    + parseFloat(corpMultiLeoSr_step3_rate_group9_direct_earnings_insurable) + parseFloat(corpMultiLeoSr_step3_rate_group10_direct_earnings_insurable);

    corpMultiLeoSr_step3_rate_group_premium_owed_total = parseFloat(corpMultiLeoSr_step3_rate_group1_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group2_premium_owed)
    + parseFloat(corpMultiLeoSr_step3_rate_group3_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group4_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group5_premium_owed)
    + parseFloat(corpMultiLeoSr_step3_rate_group6_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group7_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group8_premium_owed)
    + parseFloat(corpMultiLeoSr_step3_rate_group9_premium_owed) + parseFloat(corpMultiLeoSr_step3_rate_group10_premium_owed);
  }

  var corpMultiLeoSr_step3_rate_group_direct_earnings_premium_owed_total = parseFloat(corpMultiLeoSr_step3_rate_group_direct_earnings_total)
                + parseFloat(corpMultiLeoSr_step3_rate_group_premium_owed_total);

  //to display the page.

  corpMultiLeoSr_summary_step1_how_often.innerHTML = reportFrequencyText;

  corpMultiLeoSr_summary_step2_annual_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step2_annual_earnings_display, true, 2 ) ;
  corpMultiLeoSr_summary_step2_exempt.innerHTML =corpMultiLeoSr_step2_exempt_text;
  corpMultiLeoSr_summary_step2_qualify_755.innerHTML = corpMultiLeoSr_step2_qualify755_text;

  corpMultiLeoSr_summary_step3_from_activity.innerHTML = corpMultiLeoSr_step3_from_activity_text;
  corpMultiLeoSr_summary_step3_worker_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_worker_earnings_display, true, 2 )  ;

  if (corpMultiLeoSr_step2_qualify755_text =='Yes') {
    corpMultiLeoSr_summary_step3_rategroup755.style.display='block';

    corpMultiLeoSr_summary_step3_rategroup755_name.innerHTML = '755 Non-Exempt Partners and Executive Officers in Construction.';
    corpMultiLeoSr_summary_step3_rategroup755_value.innerHTML = '0.19';
    corpMultiLeoSr_summary_step3_rategroup755_premium_amount.innerHTML = formatDecimal((corpMultiLeoSr_step2_annual_earnings_period_value * 0.0019), true, 2 ) ;
    corpMultiLeoSr_summary_step3_rategroup755_insurable_earnings.innerHTML =formatDecimal(corpMultiLeoSr_step2_annual_earnings_period_value, true, 2 ) ;
  } else if (corpMultiLeoSr_step2_qualify755_text =='No' ){
     corpMultiLeoSr_summary_step3_rategroup755.style.display='none';
  }

   // corpMultiLeoSr_summary_result_insurable_premium_total.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group_direct_earnings_premium_owed_total, true, 2 );
  corpMultiLeoSr_summary_result_insurable_total.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group_direct_earnings_total, true, 2 );
  corpMultiLeoSr_summary_result_premium_total.innerHTML =formatDecimal(corpMultiLeoSr_step3_rate_group_premium_owed_total, true, 2 );

   <!-- summary step3 normal rate groups -->
  corpMultiLeoSr_summary_step3_rategroup1_name.innerHTML = rategroup1.options[rategroup1.selectedIndex].text;
  corpMultiLeoSr_summary_step3_rategroup1_value.innerHTML = corpMultiLeoSr_step3_rate_group1_premium_rate;
  corpMultiLeoSr_summary_step3_rategroup1_direct_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group1_direct_earnings, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup1_premium_amount.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group1_premium_owed, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup1_insurable_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group1_direct_earnings_insurable, true, 2 ) ;

  corpMultiLeoSr_summary_step3_rategroup2_name.innerHTML = rategroup2.options[rategroup2.selectedIndex].text;
  corpMultiLeoSr_summary_step3_rategroup2_value.innerHTML = corpMultiLeoSr_step3_rate_group2_premium_rate;
  corpMultiLeoSr_summary_step3_rategroup2_direct_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group2_direct_earnings, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup2_premium_amount.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group2_premium_owed, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup2_insurable_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group2_direct_earnings_insurable, true, 2 ) ;

  corpMultiLeoSr_summary_step3_rategroup3_name.innerHTML = rategroup3.options[rategroup3.selectedIndex].text;
  corpMultiLeoSr_summary_step3_rategroup3_value.innerHTML = corpMultiLeoSr_step3_rate_group3_premium_rate;
  corpMultiLeoSr_summary_step3_rategroup3_direct_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group3_direct_earnings, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup3_premium_amount.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group3_premium_owed, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup3_insurable_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group3_direct_earnings_insurable, true, 2 ) ;

  corpMultiLeoSr_summary_step3_rategroup4_name.innerHTML = rategroup4.options[rategroup4.selectedIndex].text;
  corpMultiLeoSr_summary_step3_rategroup4_value.innerHTML = corpMultiLeoSr_step3_rate_group4_premium_rate;
  corpMultiLeoSr_summary_step3_rategroup4_direct_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group4_direct_earnings, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup4_premium_amount.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group4_premium_owed, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup4_insurable_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group4_direct_earnings_insurable, true, 2 ) ;

  corpMultiLeoSr_summary_step3_rategroup5_name.innerHTML = rategroup5.options[rategroup5.selectedIndex].text;
  corpMultiLeoSr_summary_step3_rategroup5_value.innerHTML = corpMultiLeoSr_step3_rate_group5_premium_rate;
  corpMultiLeoSr_summary_step3_rategroup5_direct_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group5_direct_earnings, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup5_premium_amount.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group5_premium_owed, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup5_insurable_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group5_direct_earnings_insurable, true, 2 ) ;

  corpMultiLeoSr_summary_step3_rategroup6_name.innerHTML = rategroup6.options[rategroup6.selectedIndex].text;
  corpMultiLeoSr_summary_step3_rategroup6_value.innerHTML = corpMultiLeoSr_step3_rate_group6_premium_rate;
  corpMultiLeoSr_summary_step3_rategroup6_direct_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group6_direct_earnings, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup6_premium_amount.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group6_premium_owed, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup6_insurable_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group6_direct_earnings_insurable, true, 2 ) ;

  corpMultiLeoSr_summary_step3_rategroup7_name.innerHTML = rategroup7.options[rategroup7.selectedIndex].text;
  corpMultiLeoSr_summary_step3_rategroup7_value.innerHTML = corpMultiLeoSr_step3_rate_group7_premium_rate;
  corpMultiLeoSr_summary_step3_rategroup7_direct_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group7_direct_earnings, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup7_premium_amount.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group7_premium_owed, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup7_insurable_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group7_direct_earnings_insurable, true, 2 ) ;

  corpMultiLeoSr_summary_step3_rategroup8_name.innerHTML = rategroup8.options[rategroup8.selectedIndex].text;
  corpMultiLeoSr_summary_step3_rategroup8_value.innerHTML = corpMultiLeoSr_step3_rate_group8_premium_rate;
  corpMultiLeoSr_summary_step3_rategroup8_direct_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group8_direct_earnings, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup8_premium_amount.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group8_premium_owed, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup8_insurable_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group8_direct_earnings_insurable, true, 2 ) ;

  corpMultiLeoSr_summary_step3_rategroup9_name.innerHTML = rategroup9.options[rategroup9.selectedIndex].text;
  corpMultiLeoSr_summary_step3_rategroup9_value.innerHTML = corpMultiLeoSr_step3_rate_group9_premium_rate;
  corpMultiLeoSr_summary_step3_rategroup9_direct_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group9_direct_earnings, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup9_premium_amount.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group9_premium_owed, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup9_insurable_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group9_direct_earnings_insurable, true, 2 ) ;

  corpMultiLeoSr_summary_step3_rategroup10_name.innerHTML = rategroup10.options[rategroup10.selectedIndex].text;
  corpMultiLeoSr_summary_step3_rategroup10_value.innerHTML = corpMultiLeoSr_step3_rate_group10_premium_rate;
  corpMultiLeoSr_summary_step3_rategroup10_direct_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group10_direct_earnings, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup10_premium_amount.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group10_premium_owed, true, 2 ) ;
  corpMultiLeoSr_summary_step3_rategroup10_insurable_earnings.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group10_direct_earnings_insurable, true, 2 ) ;

  //setFrequencys
  setFrequency('corp-multi-1eo-sr-summary-report-frequency');
  setFrequency('corp-multi-1eo-sr-summary-step3-rategroup1-how-often');
  setFrequency('corp-multi-1eo-sr-summary-step3-rategroup2-how-often');
  setFrequency('corp-multi-1eo-sr-summary-step3-rategroup3-how-often');
  setFrequency('corp-multi-1eo-sr-summary-step3-rategroup4-how-often');
  setFrequency('corp-multi-1eo-sr-summary-step3-rategroup5-how-often');
  setFrequency('corp-multi-1eo-sr-summary-step3-rategroup6-how-often');
  setFrequency('corp-multi-1eo-sr-summary-step3-rategroup7-how-often');
  setFrequency('corp-multi-1eo-sr-summary-step3-rategroup8-how-often');
  setFrequency('corp-multi-1eo-sr-summary-step3-rategroup9-how-often');
  setFrequency('corp-multi-1eo-sr-summary-step3-rategroup10-how-often');

  if ($("#corp-multi-1eo-sr-step3 span.error:visible").length) {
    return false;
  }

  document.getElementById('corp-multi-1eo-sr-step3').style.display='none';
  document.getElementById('corp-multi-1eo-sr-summary').style.display='block';

  <!-- calculation end -->
}

function isExecutiveOfficerExempt(exempt) {

  var corp_multi_1eo_sr_step2_qualify_755 = document.getElementById("corp-multi-1eo-sr-step2-qualify-755");

  var addoption0=document.createElement("option");
    addoption0.text ="Please select";
    addoption0.value ="0";

  var addoption1=document.createElement("option");
    addoption1.text ="Yes";
    addoption1.value ="1";

  var addoption2=document.createElement("option");
    addoption2.text ="No";
    addoption2.value ="2";

  var select = document.getElementById("corp-multi-1eo-sr-step2-qualify-755");

  if (exempt == 'Yes') {
    document.getElementById("corp-multi-1eo-sr-step2-qualify-755").options.length=0;
    corp_multi_1eo_sr_step2_qualify_755.add(addoption0);
    corp_multi_1eo_sr_step2_qualify_755.add(addoption2);
  } else if (exempt == 'No') {
    document.getElementById("corp-multi-1eo-sr-step2-qualify-755").options.length=0;
    corp_multi_1eo_sr_step2_qualify_755.add(addoption0);
    corp_multi_1eo_sr_step2_qualify_755.add(addoption1);
    corp_multi_1eo_sr_step2_qualify_755.add(addoption2);
  }
}

function supportAdministrativeEarnings() {
  var ip = document.getElementById("corp-multi-1eo-sr-step3-from-activity");
  var supportAdministrative = ip.options[ip.selectedIndex].value;

  if ( supportAdministrative == 0 ) {
    document.getElementById('supportAdministrative-portion-yes').style.display='none';
  } else if ( supportAdministrative == 1 ) {
    document.getElementById('supportAdministrative-portion-yes').style.display='block';
    var e = document.getElementById("report-frequency");
    var reportFrequencyText = e.options[e.selectedIndex].text;
    document.getElementById('corp-multi-1eo-sr-step3-report-frequency').innerHTML = reportFrequencyText;
  } else if ( supportAdministrative == 2 ) {
    document.getElementById('supportAdministrative-portion-yes').style.display='none';
    $('#corp-multi-1eo-sr-step3-worker-earnings').val(0);
  }
}

function meosupportAdministrativeEarnings() {
  var ip = document.getElementById("meo-corp-multi-1eo-sr-step3-from-activity-2");
  var supportAdministrative = ip.options[ip.selectedIndex].value;

  if ( supportAdministrative == 0 ) {
    document.getElementById('meo-supportAdministrative-portion-yes').style.display='none';
  } else if ( supportAdministrative == 1 ) {
    document.getElementById('meo-supportAdministrative-portion-yes').style.display='block';
    var e = document.getElementById("report-frequency");
    var reportFrequencyText = e.options[e.selectedIndex].text;
    document.getElementById('meo-corp-multi-1eo-sr-step3-report-frequency').innerHTML = reportFrequencyText;
  } else if ( supportAdministrative == 2 ) {
    document.getElementById('meo-supportAdministrative-portion-yes').style.display='none';
    $('#meo-corp-multi-1eo-sr-step3-worker-earnings').val(0);
  }
}

function setFrequency(elementId) {
  var e = document.getElementById("report-frequency");
  var reportFrequencyText = e.options[e.selectedIndex].text;
  document.getElementById(elementId).innerHTML = reportFrequencyText ;
}

//validation start


//var err_common = "The following question requires an answer to proceed: ";

function ValidateStep2corpMultiLeoSrCalculate() {

   // var corpMultiLeoSr_step2_annual_earnings = document.getElementById("corp-multi-1eo-sr-step2-annual-earnings").value;

  var exempt = document.getElementById("corp-multi-1eo-sr-step2-exempt");
  var corpMultiLeoSr_step2_exempt = exempt.options[exempt.selectedIndex].value;
  var corpMultiLeoSr_step2_exempt_text = exempt.options[exempt.selectedIndex].text;

  var qualify755 = document.getElementById("corp-multi-1eo-sr-step2-qualify-755");
  var corpMultiLeoSr_step2_qualify755 = qualify755.options[qualify755.selectedIndex].value;
  var corpMultiLeoSr_step2_qualify755_text = qualify755.options[qualify755.selectedIndex].text;

  var corpMultiLeoSr_step2_annual_earnings_error = document.getElementById("corp-multi-1eo-sr-step2-annual-earnings-error");
  var exempt_error = document.getElementById("corp-multi-1eo-sr-step2-exempt-error");
  var qualify755_error = document.getElementById("corp-multi-1eo-sr-step2-qualify-755-error");


  if (!isPositiveNumber('corp-multi-1eo-sr-step2-annual-earnings')) {
    document.getElementById('corp-multi-1eo-sr-step2-annual-earnings-error').style.display='block';
  } else {
    document.getElementById('corp-multi-1eo-sr-step2-annual-earnings-error').style.display='none';
  }

  if (corpMultiLeoSr_step2_exempt_text == 'Please select'){
    document.getElementById('corp-multi-1eo-sr-step2-exempt-error').style.display='block';
  }else {
    document.getElementById('corp-multi-1eo-sr-step2-exempt-error').style.display='none';
  }

  if (corpMultiLeoSr_step2_qualify755_text == 'Please select'){
    document.getElementById('corp-multi-1eo-sr-step2-qualify-755-error').style.display='block';
  }else {
     document.getElementById('corp-multi-1eo-sr-step2-qualify-755-error').style.display='none';
  }

  if ($("#corp-multi-1eo-sr span.error:visible").length) {
    return false;
  }

   setFrequency('corp-multi-1eo-sr-step3-report-frequency');
   setFrequency('corp-multi-1eo-sr-step3-error-report-frequency');

  for (var i=1; i<=10; i++){
   setFrequency('corp-multi-1eo-sr-step3-rate-group'+i+'-direct-earnings-frequency');
   setFrequency('corp-multi-1eo-sr-step3-rate-group'+i+'-direct-earnings-error-frequency');
   setFrequency('corp-multi-1eo-sr-step3-rate-group'+i+'-direct-earnings-zero-error-frequency');
  }

  return true;
}

function ValidateStep2meocorpMultiLeoSrCalculate() {

  for (var i=1; i<=4; i++){

    if ( !$('#eo-group'+i).is(":hidden") ){

      var corpMultiLeoSr_step2_exempt_text = $('#meo-eo'+i+'-corp-multi-1eo-sr-step2-exempt option:selected').text()
      var corpMultiLeoSr_step2_qualify755_text =  $('#meo-eo'+i+'-corp-multi-1eo-sr-step2-qualify-755 option:selected').text()

      if (!isPositiveNumber("meo-eo"+i+"-corp-multi-1eo-sr-step2-annual-earnings")) {
         $('#meo-eo'+i+'-corp-multi-1eo-sr-step2-annual-earnings-error').show();
      } else {
        $('#meo-eo'+i+'-corp-multi-1eo-sr-step2-annual-earnings-error').hide();
      }

      if (corpMultiLeoSr_step2_exempt_text == 'Please select'){
        $('#meo-eo'+i+'-corp-multi-1eo-sr-step2-exempt-error').show();
      }else {
        $('#meo-eo'+i+'-corp-multi-1eo-sr-step2-exempt-error').hide();
      }

      if (corpMultiLeoSr_step2_qualify755_text == 'Please select'){
        $('#meo-eo'+i+'-corp-multi-1eo-sr-step2-qualify-755-error').show();
      }else {
         $('#meo-eo'+i+'-corp-multi-1eo-sr-step2-qualify-755-error').hide();
      }
    }
  }

  if ($("#corp-multi-yes-meo-step2 span.error:visible").length) {
    return false;
  }

  setFrequency('meo-corp-multi-1eo-sr-step3-report-frequency');
  setFrequency('meo-corp-multi-1eo-sr-step3-error-report-frequency');

  for (var i=1; i<=10; i++){
    setFrequency('meo-corp-multi-1eo-sr-step3-rate-group'+i+'-direct-earnings-frequency');
    setFrequency('meo-corp-multi-1eo-sr-step3-rate-group'+i+'-direct-earnings-error-frequency');
    setFrequency('meo-corp-multi-1eo-sr-step3-rate-group'+i+'-direct-earnings-zero-error-frequency');
  }

  return true;
}

function ValidateStep3corpMultiLeoSrCalculate() {

  var fromActivity = document.getElementById("corp-multi-1eo-sr-step3-from-activity");
  var corpMultiLeoSr_step3_from_activity = fromActivity.options[fromActivity.selectedIndex].value;
  var corpMultiLeoSr_step3_from_activity_text = fromActivity.options[fromActivity.selectedIndex].text;

  var corpMultiLeoSr_step3_worker_earnings = document.getElementById("corp-multi-1eo-sr-step3-worker-earnings").value;

  if (corpMultiLeoSr_step3_from_activity_text == 'Please select'){
     document.getElementById('corp-multi-1eo-sr-step3-from-activity-error').style.display='block';
  } else {
    document.getElementById('corp-multi-1eo-sr-step3-from-activity-error').style.display='none';
  }

  if (corpMultiLeoSr_step3_from_activity_text == 'Yes' && !isPositiveNumber('corp-multi-1eo-sr-step3-worker-earnings')){
     document.getElementById('corp-multi-1eo-sr-step3-worker-earnings-error').style.display='block';
  } else {
    document.getElementById('corp-multi-1eo-sr-step3-worker-earnings-error').style.display='none';
  }

  <!-- rate groups-->
  var rategroup1 = document.getElementById("corp-multi-1eo-sr-step3-rate-group1");
  var corpMultiLeoSr_step3_rate_group1_text = rategroup1.options[rategroup1.selectedIndex].text;

   for (var i=1; i<=10; i++){
    //$('#meo-eo'+i+'-corp-multi-1eo-sr-step2-qualify-755').attr('disabled', false);
    if ( !$('#rate-group'+i).is(":hidden") ){

      if ($('#corp-multi-1eo-sr-step3-rate-group'+i+' option:selected').text() == 'Please select'){
        $('#corp-multi-1eo-sr-step3-rate-group'+i+'-error').show();
      } else {
        $('#corp-multi-1eo-sr-step3-rate-group'+i+'-error').hide();
      }

      if (!isPositiveNumber('corp-multi-1eo-sr-step3-rate-group'+i+'-direct-earnings')){
        $('#corp-multi-1eo-sr-step3-rate-group'+i+'-direct-earnings-error').show();
      } else {
        $('#corp-multi-1eo-sr-step3-rate-group'+i+'-direct-earnings-error').hide();
      }

    } else {
       $('#corp-multi-1eo-sr-step3-rate-group'+i+'-error').hide();
       $('#corp-multi-1eo-sr-step3-rate-group'+i+'-direct-earnings-error').hide();
    }
   }

  return true;
}

function ValidateStep3meocorpMultiLeoSrCalculate() {

  var fromActivity = document.getElementById("meo-corp-multi-1eo-sr-step3-from-activity-2");
  var corpMultiLeoSr_step3_from_activity = fromActivity.options[fromActivity.selectedIndex].value;
  var corpMultiLeoSr_step3_from_activity_text = fromActivity.options[fromActivity.selectedIndex].text;

  var corpMultiLeoSr_step3_worker_earnings = document.getElementById("meo-corp-multi-1eo-sr-step3-worker-earnings").value;

  if (corpMultiLeoSr_step3_from_activity_text == 'Please select'){
     document.getElementById('meo-corp-multi-1eo-sr-step3-from-activity-error').style.display='block';
  } else {
    document.getElementById('meo-corp-multi-1eo-sr-step3-from-activity-error').style.display='none';
  }

  if (corpMultiLeoSr_step3_from_activity_text == 'Yes' && !isPositiveNumber('meo-corp-multi-1eo-sr-step3-worker-earnings')){
     document.getElementById('meo-corp-multi-1eo-sr-step3-worker-earnings-error').style.display='block';
  } else {
    document.getElementById('meo-corp-multi-1eo-sr-step3-worker-earnings-error').style.display='none';
  }

  <!-- rate groups-->
  var rategroup1 = document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group1");
  var corpMultiLeoSr_step3_rate_group1_text = rategroup1.options[rategroup1.selectedIndex].text;

  for (var i=1; i<=10; i++){
    //$('#meo-eo'+i+'-corp-multi-1eo-sr-step2-qualify-755').attr('disabled', false);
    if ( !$('#meo-rate-group'+i).is(":hidden") ){

       if ($('#meo-corp-multi-1eo-sr-step3-rate-group'+i+' option:selected').text() == 'Please select'){
         $('#meo-corp-multi-1eo-sr-step3-rate-group'+i+'-error').show();
       } else {
         $('#meo-corp-multi-1eo-sr-step3-rate-group'+i+'-error').hide();
       }

       if (!isPositiveNumber('meo-corp-multi-1eo-sr-step3-rate-group'+i+'-direct-earnings')){
         $('#meo-corp-multi-1eo-sr-step3-rate-group'+i+'-direct-earnings-error').show();
       } else {
         $('#meo-corp-multi-1eo-sr-step3-rate-group'+i+'-direct-earnings-error').hide();
       }

    } else {
       $('#meo-corp-multi-1eo-sr-step3-rate-group'+i+'-error').hide();
       $('#meo-corp-multi-1eo-sr-step3-rate-group'+i+'-direct-earnings-error').hide();
    }
   }

  if ($("#corp-multi-yes-meo-step3 span.error:visible").length) {
    return false;
  } else {
    return true;
  }
}

//should use regexp, no time now :(
function isPositiveNumber(elementId) {

  var vlNumber=new Number($(document.getElementById(elementId)).autoNumeric('get'));
   // alert(vlNumber);
  if(isNaN(vlNumber))
    return false;
  else if(vlNumber.valueOf()> 0)
    return true;
  else
    return false;
}

//multi Executive officers - only one can be exempt
function isThisExecutiveOfficerExempt(ind, isMulti) {

  if (isMulti){
    var isExempt=$('#meo-eo'+ind+'-corp-multi-1eo-sr-step2-exempt').val();
    for (var i=1; i<=4; i++){
    $('#meo-eo'+i+'-corp-multi-1eo-sr-step2-qualify-755').attr('disabled', false);
  }

  if (isExempt==1){
    for (var i=1; i<=4; i++){
      if (i!=ind){
        $('#meo-eo'+i+'-corp-multi-1eo-sr-step2-exempt').val(2);
      } else {
        $('#meo-eo'+i+'-corp-multi-1eo-sr-step2-qualify-755').val(2);
        $('#meo-eo'+i+'-corp-multi-1eo-sr-step2-qualify-755').attr('disabled', true);
      }
    }
  }
  } else {
    var isExempt=$('#corp-multi-1eo-sr-step2-exempt').val();

    $('#corp-multi-1eo-sr-step2-qualify-755').attr('disabled', false);

    if (isExempt==1){
      $('#corp-multi-1eo-sr-step2-qualify-755').val(2);
      $('#corp-multi-1eo-sr-step2-qualify-755').attr('disabled', true);
    }
  }
}

//multi-multi complicated scenario start

function meocorpMultiLeoSrCalculate() {


<!-- calculation start-->

  <!-- step1 -->
  var e = document.getElementById("report-frequency");
  var reportFrequency = e.options[e.selectedIndex].value;
  var reportFrequencyText = e.options[e.selectedIndex].text;

  <!-- step2 -->
  //eo1
  var meo_eo1_corpMultiLeoSr_step2_annual_earnings = document.getElementById("meo-eo1-corp-multi-1eo-sr-step2-annual-earnings").value;
  var meo_eo1_corpMultiLeoSr_step2_annual_earnings_display = meo_eo1_corpMultiLeoSr_step2_annual_earnings;

  var meo_eo1_exempt = document.getElementById("meo-eo1-corp-multi-1eo-sr-step2-exempt");
  var meo_eo1_corpMultiLeoSr_step2_exempt = meo_eo1_exempt.options[meo_eo1_exempt.selectedIndex].value;
  var meo_eo1_corpMultiLeoSr_step2_exempt_text = meo_eo1_exempt.options[meo_eo1_exempt.selectedIndex].text;

  var meo_eo1_qualify755 = document.getElementById("meo-eo1-corp-multi-1eo-sr-step2-qualify-755");
  var meo_eo1_corpMultiLeoSr_step2_qualify755 = meo_eo1_qualify755.options[meo_eo1_qualify755.selectedIndex].value;
  var meo_eo1_corpMultiLeoSr_step2_qualify755_text = meo_eo1_qualify755.options[meo_eo1_qualify755.selectedIndex].text;

  //eo2
  var meo_eo2_corpMultiLeoSr_step2_annual_earnings = document.getElementById("meo-eo2-corp-multi-1eo-sr-step2-annual-earnings").value;
  var meo_eo2_corpMultiLeoSr_step2_annual_earnings_display = meo_eo2_corpMultiLeoSr_step2_annual_earnings;

  var meo_eo2_exempt = document.getElementById("meo-eo2-corp-multi-1eo-sr-step2-exempt");
  var meo_eo2_corpMultiLeoSr_step2_exempt = meo_eo2_exempt.options[meo_eo2_exempt.selectedIndex].value;
  var meo_eo2_corpMultiLeoSr_step2_exempt_text = meo_eo2_exempt.options[meo_eo2_exempt.selectedIndex].text;

  var meo_eo2_qualify755 = document.getElementById("meo-eo2-corp-multi-1eo-sr-step2-qualify-755");
  var meo_eo2_corpMultiLeoSr_step2_qualify755 = meo_eo2_qualify755.options[meo_eo2_qualify755.selectedIndex].value;
  var meo_eo2_corpMultiLeoSr_step2_qualify755_text = meo_eo2_qualify755.options[meo_eo2_qualify755.selectedIndex].text;

  //eo3
  var meo_eo3_corpMultiLeoSr_step2_annual_earnings = document.getElementById("meo-eo3-corp-multi-1eo-sr-step2-annual-earnings").value;
  var meo_eo3_corpMultiLeoSr_step2_annual_earnings_display = meo_eo3_corpMultiLeoSr_step2_annual_earnings;

  var meo_eo3_exempt = document.getElementById("meo-eo3-corp-multi-1eo-sr-step2-exempt");
  var meo_eo3_corpMultiLeoSr_step2_exempt = meo_eo3_exempt.options[meo_eo3_exempt.selectedIndex].value;
  var meo_eo3_corpMultiLeoSr_step2_exempt_text = meo_eo3_exempt.options[meo_eo3_exempt.selectedIndex].text;

  var meo_eo3_qualify755 = document.getElementById("meo-eo3-corp-multi-1eo-sr-step2-qualify-755");
  var meo_eo3_corpMultiLeoSr_step2_qualify755 = meo_eo3_qualify755.options[meo_eo3_qualify755.selectedIndex].value;
  var meo_eo3_corpMultiLeoSr_step2_qualify755_text = meo_eo3_qualify755.options[meo_eo3_qualify755.selectedIndex].text;

  //eo4
  var meo_eo4_corpMultiLeoSr_step2_annual_earnings = document.getElementById("meo-eo4-corp-multi-1eo-sr-step2-annual-earnings").value;
  var meo_eo4_corpMultiLeoSr_step2_annual_earnings_display = meo_eo4_corpMultiLeoSr_step2_annual_earnings;

  var meo_eo4_exempt = document.getElementById("meo-eo4-corp-multi-1eo-sr-step2-exempt");
  var meo_eo4_corpMultiLeoSr_step2_exempt = meo_eo4_exempt.options[meo_eo4_exempt.selectedIndex].value;
  var meo_eo4_corpMultiLeoSr_step2_exempt_text = meo_eo4_exempt.options[meo_eo4_exempt.selectedIndex].text;

  var meo_eo4_qualify755 = document.getElementById("meo-eo4-corp-multi-1eo-sr-step2-qualify-755");
  var meo_eo4_corpMultiLeoSr_step2_qualify755 = meo_eo4_qualify755.options[meo_eo4_qualify755.selectedIndex].value;
  var meo_eo4_corpMultiLeoSr_step2_qualify755_text = meo_eo4_qualify755.options[meo_eo4_qualify755.selectedIndex].text;

  <!-- step3 -->
  var meo_fromActivity = document.getElementById("meo-corp-multi-1eo-sr-step3-from-activity-2");
  var meo_corpMultiLeoSr_step3_from_activity = meo_fromActivity.options[meo_fromActivity.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_from_activity_text = meo_fromActivity.options[meo_fromActivity.selectedIndex].text;

  var meo_corpMultiLeoSr_step3_worker_earnings = $(document.getElementById("meo-corp-multi-1eo-sr-step3-worker-earnings")).autoNumeric('get');

  // preCalculation. conditions apply
  var meo_eo1_corpMultiLeoSr_step2_annual_earnings_period_value;
  var meo_eo1_corpMultiLeoSr_step2_annual_earnings_br1;
  var meo_eo1_corpMultiLeoSr_step2_annual_earnings_br2;

   var meo_eo2_corpMultiLeoSr_step2_annual_earnings_period_value;
  var meo_eo2_corpMultiLeoSr_step2_annual_earnings_br1;
  var meo_eo2_corpMultiLeoSr_step2_annual_earnings_br2;

   var meo_eo3_corpMultiLeoSr_step2_annual_earnings_period_value;
  var meo_eo3_corpMultiLeoSr_step2_annual_earnings_br1;
  var meo_eo3_corpMultiLeoSr_step2_annual_earnings_br2;

   var meo_eo4_corpMultiLeoSr_step2_annual_earnings_period_value;
  var meo_eo4_corpMultiLeoSr_step2_annual_earnings_br1;
  var meo_eo4_corpMultiLeoSr_step2_annual_earnings_br2;


  var meo_corpMultiLeoSr_step3_worker_earnings_display = meo_corpMultiLeoSr_step3_worker_earnings;

  if (meo_eo1_corpMultiLeoSr_step2_exempt_text == 'Yes'){
    meo_eo1_corpMultiLeoSr_step2_annual_earnings = 0;

    //need to reset qulify755 to No.
    meo_eo1_corpMultiLeoSr_step2_qualify755 =2;
    meo_eo1_corpMultiLeoSr_step2_qualify755_text = 'No';
  }
  if (meo_eo2_corpMultiLeoSr_step2_exempt_text == 'Yes'){
    meo_eo2_corpMultiLeoSr_step2_annual_earnings = 0;

    //need to reset qulify755 to No.
    meo_eo2_corpMultiLeoSr_step2_qualify755 =2;
    meo_eo2_corpMultiLeoSr_step2_qualify755_text = 'No';
  }
  if (meo_eo3_corpMultiLeoSr_step2_exempt_text == 'Yes'){
    meo_eo3_corpMultiLeoSr_step2_annual_earnings = 0;

    //need to reset qulify755 to No.
    meo_eo3_corpMultiLeoSr_step2_qualify755 =2;
    meo_eo3_corpMultiLeoSr_step2_qualify755_text = 'No';
  }
  if (meo_eo4_corpMultiLeoSr_step2_exempt_text == 'Yes'){
    meo_eo4_corpMultiLeoSr_step2_annual_earnings = 0;

    //need to reset qulify755 to No.
    meo_eo4_corpMultiLeoSr_step2_qualify755 =2;
    meo_eo4_corpMultiLeoSr_step2_qualify755_text = 'No';
  }

//  alert(corpMultiLeoSr_step2_annual_earnings);

  if (meo_corpMultiLeoSr_step3_from_activity_text == 'No'){
    meo_corpMultiLeoSr_step3_worker_earnings = 0;
  }

  if ( meo_eo1_corpMultiLeoSr_step2_annual_earnings >= 90300){
    meo_eo1_corpMultiLeoSr_step2_annual_earnings_br1 = 90300;
  } else {
    meo_eo1_corpMultiLeoSr_step2_annual_earnings_br1 = meo_eo1_corpMultiLeoSr_step2_annual_earnings;
  }
  if ( meo_eo2_corpMultiLeoSr_step2_annual_earnings >= 90300){
    meo_eo2_corpMultiLeoSr_step2_annual_earnings_br1 = 90300;
  } else {
    meo_eo2_corpMultiLeoSr_step2_annual_earnings_br1 = meo_eo2_corpMultiLeoSr_step2_annual_earnings;
  }
  if ( meo_eo3_corpMultiLeoSr_step2_annual_earnings >= 90300){
    meo_eo3_corpMultiLeoSr_step2_annual_earnings_br1 = 90300;
  } else {
    meo_eo3_corpMultiLeoSr_step2_annual_earnings_br1 = meo_eo3_corpMultiLeoSr_step2_annual_earnings;
  }
  if ( meo_eo4_corpMultiLeoSr_step2_annual_earnings >= 90300){
    meo_eo4_corpMultiLeoSr_step2_annual_earnings_br1 = 90300;
  } else {
    meo_eo4_corpMultiLeoSr_step2_annual_earnings_br1 = meo_eo4_corpMultiLeoSr_step2_annual_earnings;
  }

//  alert(corpMultiLeoSr_step2_annual_earnings_br1);
  if (reportFrequency == 1){
    meo_eo1_corpMultiLeoSr_step2_annual_earnings_period_value = meo_eo1_corpMultiLeoSr_step2_annual_earnings_br1;
    meo_eo1_corpMultiLeoSr_step2_annual_earnings_br2 = meo_eo1_corpMultiLeoSr_step2_annual_earnings_br1;

    meo_eo2_corpMultiLeoSr_step2_annual_earnings_period_value = meo_eo2_corpMultiLeoSr_step2_annual_earnings_br1;
    meo_eo2_corpMultiLeoSr_step2_annual_earnings_br2 = meo_eo2_corpMultiLeoSr_step2_annual_earnings_br1;

    meo_eo3_corpMultiLeoSr_step2_annual_earnings_period_value = meo_eo3_corpMultiLeoSr_step2_annual_earnings_br1;
    meo_eo3_corpMultiLeoSr_step2_annual_earnings_br2 = meo_eo3_corpMultiLeoSr_step2_annual_earnings_br1;

    meo_eo4_corpMultiLeoSr_step2_annual_earnings_period_value = meo_eo4_corpMultiLeoSr_step2_annual_earnings_br1;
    meo_eo4_corpMultiLeoSr_step2_annual_earnings_br2 = meo_eo4_corpMultiLeoSr_step2_annual_earnings_br1;

  } else if (reportFrequency == 4) {
    meo_eo1_corpMultiLeoSr_step2_annual_earnings_period_value = parseFloat(meo_eo1_corpMultiLeoSr_step2_annual_earnings_br1)/4;
    meo_eo1_corpMultiLeoSr_step2_annual_earnings_br2 = parseFloat(meo_eo1_corpMultiLeoSr_step2_annual_earnings_br1)/4;

    meo_eo2_corpMultiLeoSr_step2_annual_earnings_period_value = parseFloat(meo_eo2_corpMultiLeoSr_step2_annual_earnings_br1)/4;
    meo_eo2_corpMultiLeoSr_step2_annual_earnings_br2 = parseFloat(meo_eo2_corpMultiLeoSr_step2_annual_earnings_br1)/4;

    meo_eo3_corpMultiLeoSr_step2_annual_earnings_period_value = parseFloat(meo_eo3_corpMultiLeoSr_step2_annual_earnings_br1)/4;
    meo_eo3_corpMultiLeoSr_step2_annual_earnings_br2 = parseFloat(meo_eo3_corpMultiLeoSr_step2_annual_earnings_br1)/4;

    meo_eo4_corpMultiLeoSr_step2_annual_earnings_period_value = parseFloat(meo_eo4_corpMultiLeoSr_step2_annual_earnings_br1)/4;
    meo_eo4_corpMultiLeoSr_step2_annual_earnings_br2 = parseFloat(meo_eo4_corpMultiLeoSr_step2_annual_earnings_br1)/4;

  } else if (reportFrequency == 12){
    meo_eo1_corpMultiLeoSr_step2_annual_earnings_period_value  = parseFloat(meo_eo1_corpMultiLeoSr_step2_annual_earnings_br1)/12;
    meo_eo1_corpMultiLeoSr_step2_annual_earnings_br2 = parseFloat(meo_eo1_corpMultiLeoSr_step2_annual_earnings_br1)/12;

    meo_eo2_corpMultiLeoSr_step2_annual_earnings_period_value  = parseFloat(meo_eo2_corpMultiLeoSr_step2_annual_earnings_br1)/12;
    meo_eo2_corpMultiLeoSr_step2_annual_earnings_br2 = parseFloat(meo_eo2_corpMultiLeoSr_step2_annual_earnings_br1)/12;

    meo_eo3_corpMultiLeoSr_step2_annual_earnings_period_value  = parseFloat(meo_eo3_corpMultiLeoSr_step2_annual_earnings_br1)/12;
    meo_eo3_corpMultiLeoSr_step2_annual_earnings_br2 = parseFloat(meo_eo3_corpMultiLeoSr_step2_annual_earnings_br1)/12;

    meo_eo4_corpMultiLeoSr_step2_annual_earnings_period_value  = parseFloat(meo_eo4_corpMultiLeoSr_step2_annual_earnings_br1)/12;
    meo_eo4_corpMultiLeoSr_step2_annual_earnings_br2 = parseFloat(meo_eo4_corpMultiLeoSr_step2_annual_earnings_br1)/12;
  }

// alert("totalEarning: " + corpMultiLeoSr_step2_annual_earnings_period_value); workingOnNow
  if ( meo_eo1_corpMultiLeoSr_step2_exempt_text=='No' && meo_eo1_corpMultiLeoSr_step2_qualify755_text=='No' && isPositiveNumber('meo-eo1-corp-multi-1eo-sr-step2-annual-earnings')) { //////////workingOnNow///////////////////xxxxxxxxxxxx
    meo_corpMultiLeoSr_step3_worker_earnings = parseFloat(meo_corpMultiLeoSr_step3_worker_earnings) + parseFloat(meo_eo1_corpMultiLeoSr_step2_annual_earnings_br2);
  }

  if ( meo_eo2_corpMultiLeoSr_step2_exempt_text=='No' && meo_eo2_corpMultiLeoSr_step2_qualify755_text=='No' && isPositiveNumber('meo-eo2-corp-multi-1eo-sr-step2-annual-earnings')) {
    meo_corpMultiLeoSr_step3_worker_earnings = parseFloat(meo_corpMultiLeoSr_step3_worker_earnings) + parseFloat(meo_eo2_corpMultiLeoSr_step2_annual_earnings_br2);
  }

  if ( meo_eo3_corpMultiLeoSr_step2_exempt_text=='No' && meo_eo3_corpMultiLeoSr_step2_qualify755_text=='No' && isPositiveNumber('meo-eo3-corp-multi-1eo-sr-step2-annual-earnings')) {
    meo_corpMultiLeoSr_step3_worker_earnings = parseFloat(meo_corpMultiLeoSr_step3_worker_earnings) + parseFloat(meo_eo3_corpMultiLeoSr_step2_annual_earnings_br2);
  }

   if ( meo_eo4_corpMultiLeoSr_step2_exempt_text=='No' && meo_eo4_corpMultiLeoSr_step2_qualify755_text=='No' && isPositiveNumber('meo-eo4-corp-multi-1eo-sr-step2-annual-earnings')) {
    meo_corpMultiLeoSr_step3_worker_earnings = parseFloat(meo_corpMultiLeoSr_step3_worker_earnings) + parseFloat(meo_eo4_corpMultiLeoSr_step2_annual_earnings_br2);
  }

//  alert(corpMultiLeoSr_step3_worker_earnings);

  <!-- rate group1-->
  var rategroup1 = document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group1");
  var meo_corpMultiLeoSr_step3_rate_group1 = rategroup1.options[rategroup1.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group1_text = rategroup1.options[rategroup1.selectedIndex].text;

  var meo_corpMultiLeoSr_step3_rate_group1_direct_earnings = $(document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group1-direct-earnings")).autoNumeric('get');

  <!-- rate group2-->
  var rategroup2 = document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group2");
  var meo_corpMultiLeoSr_step3_rate_group2 = rategroup2.options[rategroup2.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group2_text = rategroup2.options[rategroup2.selectedIndex].text;

  var meo_corpMultiLeoSr_step3_rate_group2_direct_earnings = $(document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group2-direct-earnings")).autoNumeric('get');

    <!-- rate group3-->
  var rategroup3 = document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group3");
  var meo_corpMultiLeoSr_step3_rate_group3 = rategroup3.options[rategroup3.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group3_text = rategroup3.options[rategroup3.selectedIndex].text;

  var meo_corpMultiLeoSr_step3_rate_group3_direct_earnings = $(document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group3-direct-earnings")).autoNumeric('get');

    <!-- rate group4-->
  var rategroup4 = document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group4");
  var meo_corpMultiLeoSr_step3_rate_group4 = rategroup4.options[rategroup4.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group4_text = rategroup4.options[rategroup4.selectedIndex].text;

  var meo_corpMultiLeoSr_step3_rate_group4_direct_earnings = $(document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group4-direct-earnings")).autoNumeric('get');

    <!-- rate group5-->
  var rategroup5 = document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group5");
  var meo_corpMultiLeoSr_step3_rate_group5 = rategroup5.options[rategroup5.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group5_text = rategroup5.options[rategroup5.selectedIndex].text;

  var meo_corpMultiLeoSr_step3_rate_group5_direct_earnings = $(document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group5-direct-earnings")).autoNumeric('get');

   <!-- rate group6-->
  var rategroup6 = document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group6");
  var meo_corpMultiLeoSr_step3_rate_group6 = rategroup6.options[rategroup6.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group6_text = rategroup6.options[rategroup6.selectedIndex].text;

  var meo_corpMultiLeoSr_step3_rate_group6_direct_earnings = $(document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group6-direct-earnings")).autoNumeric('get');

  <!-- rate group7-->
  var rategroup7 = document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group7");
  var meo_corpMultiLeoSr_step3_rate_group7 = rategroup7.options[rategroup7.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group7_text = rategroup7.options[rategroup7.selectedIndex].text;

  var meo_corpMultiLeoSr_step3_rate_group7_direct_earnings = $(document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group7-direct-earnings")).autoNumeric('get');

  <!-- rate group8-->
  var rategroup8 = document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group8");
  var meo_corpMultiLeoSr_step3_rate_group8 = rategroup8.options[rategroup8.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group8_text = rategroup8.options[rategroup8.selectedIndex].text;

  var meo_corpMultiLeoSr_step3_rate_group8_direct_earnings = $(document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group8-direct-earnings")).autoNumeric('get');

  <!-- rate group9-->
  var rategroup9 = document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group9");
  var meo_corpMultiLeoSr_step3_rate_group9 = rategroup9.options[rategroup9.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group9_text = rategroup9.options[rategroup9.selectedIndex].text;

  var meo_corpMultiLeoSr_step3_rate_group9_direct_earnings = $(document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group9-direct-earnings")).autoNumeric('get');

  <!-- rate group10-->
  var rategroup10 = document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group10");
  var meo_corpMultiLeoSr_step3_rate_group10 = rategroup10.options[rategroup10.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group10_text = rategroup10.options[rategroup10.selectedIndex].text;

  var meo_corpMultiLeoSr_step3_rate_group10_direct_earnings = $(document.getElementById("meo-corp-multi-1eo-sr-step3-rate-group10-direct-earnings")).autoNumeric('get');

  <!-- summary -->
  var meo_corpMultiLeoSr_summary_step1_how_often = document.getElementById("meo-corp-multi-1eo-sr-summary-step1-how-often");

  //summary step2 eo1
  var meo_eo1_corpMultiLeoSr_summary_step2_annual_earnings = document.getElementById("meo-eo1-corp-multi-1eo-sr-summary-step2-annual-earnings");
  var meo_eo1_corpMultiLeoSr_summary_step2_exempt = document.getElementById("meo-eo1-corp-multi-1eo-sr-summary-step2-exempt");
  var meo_eo1_corpMultiLeoSr_summary_step2_qualify_755 = document.getElementById("meo-eo1-corp-multi-1eo-sr-summary-step2-qualify-755");

  //summary step2 eo2
  var meo_eo2_corpMultiLeoSr_summary_step2_annual_earnings = document.getElementById("meo-eo2-corp-multi-1eo-sr-summary-step2-annual-earnings");
  var meo_eo2_corpMultiLeoSr_summary_step2_exempt = document.getElementById("meo-eo2-corp-multi-1eo-sr-summary-step2-exempt");
  var meo_eo2_corpMultiLeoSr_summary_step2_qualify_755 = document.getElementById("meo-eo2-corp-multi-1eo-sr-summary-step2-qualify-755");

  //summary step2 eo3
  var meo_eo3_corpMultiLeoSr_summary_step2_annual_earnings = document.getElementById("meo-eo3-corp-multi-1eo-sr-summary-step2-annual-earnings");
  var meo_eo3_corpMultiLeoSr_summary_step2_exempt = document.getElementById("meo-eo3-corp-multi-1eo-sr-summary-step2-exempt");
  var meo_eo3_corpMultiLeoSr_summary_step2_qualify_755 = document.getElementById("meo-eo3-corp-multi-1eo-sr-summary-step2-qualify-755");

  //summary step2 eo4
  var meo_eo4_corpMultiLeoSr_summary_step2_annual_earnings = document.getElementById("meo-eo4-corp-multi-1eo-sr-summary-step2-annual-earnings");
  var meo_eo4_corpMultiLeoSr_summary_step2_exempt = document.getElementById("meo-eo4-corp-multi-1eo-sr-summary-step2-exempt");
  var meo_eo4_corpMultiLeoSr_summary_step2_qualify_755 = document.getElementById("meo-eo4-corp-multi-1eo-sr-summary-step2-qualify-755");

  //summary step3
  var meo_corpMultiLeoSr_summary_step3_from_activity = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-from-activity");
  var meo_corpMultiLeoSr_summary_step3_worker_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-worker-earnings");

  var meo_corpMultiLeoSr_summary_step3_rategroup755 = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup755");
  var meo_corpMultiLeoSr_summary_step3_rategroup755_name = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup755-name");
  var meo_corpMultiLeoSr_summary_step3_rategroup755_value = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup755-value");
  var meo_corpMultiLeoSr_summary_step3_rategroup755_premium_amount = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup755-premium-amount");
  var meo_corpMultiLeoSr_summary_step3_rategroup755_insurable_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup755-insurable-earnings");

  var meo_corpMultiLeoSr_summary_step3_rategroup1 = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup1");
  var meo_corpMultiLeoSr_summary_step3_rategroup1_name = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup1-name");
  var meo_corpMultiLeoSr_summary_step3_rategroup1_value = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup1-value");
  var meo_corpMultiLeoSr_summary_step3_rategroup1_how_often = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup1-how-often");
  var meo_corpMultiLeoSr_summary_step3_rategroup1_direct_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup1-direct-earnings");
  var meo_corpMultiLeoSr_summary_step3_rategroup1_premium_amount = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup1-premium-amount");
  var meo_corpMultiLeoSr_summary_step3_rategroup1_insurable_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup1-insurable-earnings");

  var meo_corpMultiLeoSr_summary_step3_rategroup2 = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup2");
  var meo_corpMultiLeoSr_summary_step3_rategroup2_name = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup2-name");
  var meo_corpMultiLeoSr_summary_step3_rategroup2_value = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup2-value");
  var meo_corpMultiLeoSr_summary_step3_rategroup2_how_often = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup2-how-often");
  var meo_corpMultiLeoSr_summary_step3_rategroup2_direct_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup2-direct-earnings");
  var meo_corpMultiLeoSr_summary_step3_rategroup2_premium_amount = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup2-premium-amount");
  var meo_corpMultiLeoSr_summary_step3_rategroup2_insurable_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup2-insurable-earnings");

  var meo_corpMultiLeoSr_summary_step3_rategroup3 = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup3");
  var meo_corpMultiLeoSr_summary_step3_rategroup3_name = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup3-name");
  var meo_corpMultiLeoSr_summary_step3_rategroup3_value = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup3-value");
  var meo_corpMultiLeoSr_summary_step3_rategroup3_how_often = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup3-how-often");
  var meo_corpMultiLeoSr_summary_step3_rategroup3_direct_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup3-direct-earnings");
  var meo_corpMultiLeoSr_summary_step3_rategroup3_premium_amount = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup3-premium-amount");
  var meo_corpMultiLeoSr_summary_step3_rategroup3_insurable_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup3-insurable-earnings");

  var meo_corpMultiLeoSr_summary_step3_rategroup4 = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup4");
  var meo_corpMultiLeoSr_summary_step3_rategroup4_name = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup4-name");
  var meo_corpMultiLeoSr_summary_step3_rategroup4_value = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup4-value");
  var meo_corpMultiLeoSr_summary_step3_rategroup4_how_often = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup4-how-often");
  var meo_corpMultiLeoSr_summary_step3_rategroup4_direct_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup4-direct-earnings");
  var meo_corpMultiLeoSr_summary_step3_rategroup4_premium_amount = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup4-premium-amount");
  var meo_corpMultiLeoSr_summary_step3_rategroup4_insurable_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup4-insurable-earnings");

  var meo_corpMultiLeoSr_summary_step3_rategroup5 = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup5");
  var meo_corpMultiLeoSr_summary_step3_rategroup5_name = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup5-name");
  var meo_corpMultiLeoSr_summary_step3_rategroup5_value = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup5-value");
  var meo_corpMultiLeoSr_summary_step3_rategroup5_how_often = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup5-how-often");
  var meo_corpMultiLeoSr_summary_step3_rategroup5_direct_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup5-direct-earnings");
  var meo_corpMultiLeoSr_summary_step3_rategroup5_premium_amount = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup5-premium-amount");
  var meo_corpMultiLeoSr_summary_step3_rategroup5_insurable_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup5-insurable-earnings");

  var meo_corpMultiLeoSr_summary_step3_rategroup6 = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup6");
  var meo_corpMultiLeoSr_summary_step3_rategroup6_name = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup6-name");
  var meo_corpMultiLeoSr_summary_step3_rategroup6_value = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup6-value");
  var meo_corpMultiLeoSr_summary_step3_rategroup6_how_often = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup6-how-often");
  var meo_corpMultiLeoSr_summary_step3_rategroup6_direct_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup6-direct-earnings");
  var meo_corpMultiLeoSr_summary_step3_rategroup6_premium_amount = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup6-premium-amount");
  var meo_corpMultiLeoSr_summary_step3_rategroup6_insurable_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup6-insurable-earnings");

  var meo_corpMultiLeoSr_summary_step3_rategroup7 = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup7");
  var meo_corpMultiLeoSr_summary_step3_rategroup7_name = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup7-name");
  var meo_corpMultiLeoSr_summary_step3_rategroup7_value = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup7-value");
  var meo_corpMultiLeoSr_summary_step3_rategroup7_how_often = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup7-how-often");
  var meo_corpMultiLeoSr_summary_step3_rategroup7_direct_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup7-direct-earnings");
  var meo_corpMultiLeoSr_summary_step3_rategroup7_premium_amount = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup7-premium-amount");
  var meo_corpMultiLeoSr_summary_step3_rategroup7_insurable_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup7-insurable-earnings");

  var meo_corpMultiLeoSr_summary_step3_rategroup8 = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup8");
  var meo_corpMultiLeoSr_summary_step3_rategroup8_name = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup8-name");
  var meo_corpMultiLeoSr_summary_step3_rategroup8_value = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup8-value");
  var meo_corpMultiLeoSr_summary_step3_rategroup8_how_often = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup8-how-often");
  var meo_corpMultiLeoSr_summary_step3_rategroup8_direct_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup8-direct-earnings");
  var meo_corpMultiLeoSr_summary_step3_rategroup8_premium_amount = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup8-premium-amount");
  var meo_corpMultiLeoSr_summary_step3_rategroup8_insurable_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup8-insurable-earnings");

  var meo_corpMultiLeoSr_summary_step3_rategroup9 = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup9");
  var meo_corpMultiLeoSr_summary_step3_rategroup9_name = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup9-name");
  var meo_corpMultiLeoSr_summary_step3_rategroup9_value = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup9-value");
  var meo_corpMultiLeoSr_summary_step3_rategroup9_how_often = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup9-how-often");
  var meo_corpMultiLeoSr_summary_step3_rategroup9_direct_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup9-direct-earnings");
  var meo_corpMultiLeoSr_summary_step3_rategroup9_premium_amount = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup9-premium-amount");
  var meo_corpMultiLeoSr_summary_step3_rategroup9_insurable_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup9-insurable-earnings");

  var meo_corpMultiLeoSr_summary_step3_rategroup10 = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup10");
  var meo_corpMultiLeoSr_summary_step3_rategroup10_name = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup10-name");
  var meo_corpMultiLeoSr_summary_step3_rategroup10_value = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup10-value");
  var meo_corpMultiLeoSr_summary_step3_rategroup10_how_often = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup10-how-often");
  var meo_corpMultiLeoSr_summary_step3_rategroup10_direct_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup10-direct-earnings");
  var meo_corpMultiLeoSr_summary_step3_rategroup10_premium_amount = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup10-premium-amount");
  var meo_corpMultiLeoSr_summary_step3_rategroup10_insurable_earnings = document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup10-insurable-earnings");

  //var meo_corpMultiLeoSr_summary_result_insurable_premium_total = document.getElementById("meo-corp-multi-1eo-sr-summary-result-insurable-premium-total");
  var meo_corpMultiLeoSr_summary_result_insurable_total = document.getElementById("meo-corp-multi-1eo-sr-summary-result-insurable-total");
  var meo_corpMultiLeoSr_summary_result_premium_total = document.getElementById("meo-corp-multi-1eo-sr-summary-result-premium-total");

  var meo_corpMultiLeoSr_step3_rate_group1_premium_rate = rategroup1.options[rategroup1.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group2_premium_rate = rategroup2.options[rategroup2.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group3_premium_rate = rategroup3.options[rategroup3.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group4_premium_rate = rategroup4.options[rategroup4.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group5_premium_rate = rategroup5.options[rategroup5.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group6_premium_rate = rategroup6.options[rategroup6.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group7_premium_rate = rategroup7.options[rategroup7.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group8_premium_rate = rategroup8.options[rategroup8.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group9_premium_rate = rategroup9.options[rategroup9.selectedIndex].value;
  var meo_corpMultiLeoSr_step3_rate_group10_premium_rate = rategroup10.options[rategroup10.selectedIndex].value;

  var meo_corpMultiLeoSr_step3_rate_group=document.getElementsByName("meo-corp-multi-1eo-sr-step3-rate-group");

    document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup1").style.display='block';
    document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup2").style.display='block';
    document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup3").style.display='block';
    document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup4").style.display='block';
    document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup5").style.display='block';
    document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup6").style.display='block';
    document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup7").style.display='block';
    document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup8").style.display='block';
    document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup9").style.display='block';
    document.getElementById("meo-corp-multi-1eo-sr-summary-step3-rategroup10").style.display='block';
  for(var i=0;i<10;i++){

    // alert(corpMultiLeoSr_step3_rate_group[i].value);

    if (meo_corpMultiLeoSr_step3_rate_group[i].value == 0){

      switch (i+1)
      {
      case 1:
        meo_corpMultiLeoSr_step3_rate_group1_direct_earnings = 0;
          meo_corpMultiLeoSr_step3_rate_group1_premium_rate = 0;
        meo_corpMultiLeoSr_summary_step3_rategroup1.style.display='none';
        break;
      case 2:
        meo_corpMultiLeoSr_step3_rate_group2_direct_earnings = 0;
        meo_corpMultiLeoSr_step3_rate_group2_premium_rate = 0;
        meo_corpMultiLeoSr_summary_step3_rategroup2.style.display='none';
        break;
      case 3:
        meo_corpMultiLeoSr_step3_rate_group3_direct_earnings = 0;
        meo_corpMultiLeoSr_step3_rate_group3_premium_rate =0;
        meo_corpMultiLeoSr_summary_step3_rategroup3.style.display='none';
        break;
      case 4:
        meo_corpMultiLeoSr_step3_rate_group4_direct_earnings = 0;
        meo_corpMultiLeoSr_step3_rate_group4_premium_rate =0;
        meo_corpMultiLeoSr_summary_step3_rategroup4.style.display='none';
        break;
      case 5:
        meo_corpMultiLeoSr_step3_rate_group5_direct_earnings = 0;
        meo_corpMultiLeoSr_step3_rate_group5_premium_rate =0;
        meo_corpMultiLeoSr_summary_step3_rategroup5.style.display='none';
        break;

      case 6:
        meo_corpMultiLeoSr_step3_rate_group6_direct_earnings = 0;
        meo_corpMultiLeoSr_step3_rate_group6_premium_rate =0;
        meo_corpMultiLeoSr_summary_step3_rategroup6.style.display='none';
        break;
      case 7:
        meo_corpMultiLeoSr_step3_rate_group7_direct_earnings = 0;
        meo_corpMultiLeoSr_step3_rate_group7_premium_rate =0;
        meo_corpMultiLeoSr_summary_step3_rategroup7.style.display='none';
        break;
      case 8:
        meo_corpMultiLeoSr_step3_rate_group8_direct_earnings = 0;
        meo_corpMultiLeoSr_step3_rate_group8_premium_rate =0;
        meo_corpMultiLeoSr_summary_step3_rategroup8.style.display='none';
        break;
      case 9:
        meo_corpMultiLeoSr_step3_rate_group9_direct_earnings = 0;
        meo_corpMultiLeoSr_step3_rate_group9_premium_rate =0;
        meo_corpMultiLeoSr_summary_step3_rategroup9.style.display='none';
        break;
      case 10:
        meo_corpMultiLeoSr_step3_rate_group10_direct_earnings = 0;
        meo_corpMultiLeoSr_step3_rate_group10_premium_rate =0;
        meo_corpMultiLeoSr_summary_step3_rategroup10.style.display='none';
        break;
      }
     }
    }

  var meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group1_direct_earnings) + parseFloat(meo_corpMultiLeoSr_step3_rate_group2_direct_earnings)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group3_direct_earnings) + parseFloat(meo_corpMultiLeoSr_step3_rate_group4_direct_earnings) + parseFloat(meo_corpMultiLeoSr_step3_rate_group5_direct_earnings)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group6_direct_earnings) + parseFloat(meo_corpMultiLeoSr_step3_rate_group7_direct_earnings) + parseFloat(meo_corpMultiLeoSr_step3_rate_group8_direct_earnings)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group9_direct_earnings) + parseFloat(meo_corpMultiLeoSr_step3_rate_group10_direct_earnings);

  var meo_corpMultiLeoSr_step3_rate_group1_direct_earnings_percentage = meo_corpMultiLeoSr_step3_rate_group1_direct_earnings/meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var meo_corpMultiLeoSr_step3_rate_group2_direct_earnings_percentage = meo_corpMultiLeoSr_step3_rate_group2_direct_earnings/meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var meo_corpMultiLeoSr_step3_rate_group3_direct_earnings_percentage = meo_corpMultiLeoSr_step3_rate_group3_direct_earnings/meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var meo_corpMultiLeoSr_step3_rate_group4_direct_earnings_percentage = meo_corpMultiLeoSr_step3_rate_group4_direct_earnings/meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var meo_corpMultiLeoSr_step3_rate_group5_direct_earnings_percentage = meo_corpMultiLeoSr_step3_rate_group5_direct_earnings/meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var meo_corpMultiLeoSr_step3_rate_group6_direct_earnings_percentage = meo_corpMultiLeoSr_step3_rate_group6_direct_earnings/meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var meo_corpMultiLeoSr_step3_rate_group7_direct_earnings_percentage = meo_corpMultiLeoSr_step3_rate_group7_direct_earnings/meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var meo_corpMultiLeoSr_step3_rate_group8_direct_earnings_percentage = meo_corpMultiLeoSr_step3_rate_group8_direct_earnings/meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var meo_corpMultiLeoSr_step3_rate_group9_direct_earnings_percentage = meo_corpMultiLeoSr_step3_rate_group9_direct_earnings/meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var meo_corpMultiLeoSr_step3_rate_group10_direct_earnings_percentage = meo_corpMultiLeoSr_step3_rate_group10_direct_earnings/meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total;

  var meo_corpMultiLeoSr_step3_rate_group1_direct_earnings_prorated = meo_corpMultiLeoSr_step3_worker_earnings * meo_corpMultiLeoSr_step3_rate_group1_direct_earnings_percentage;
  var meo_corpMultiLeoSr_step3_rate_group2_direct_earnings_prorated = meo_corpMultiLeoSr_step3_worker_earnings * meo_corpMultiLeoSr_step3_rate_group2_direct_earnings_percentage;
  var meo_corpMultiLeoSr_step3_rate_group3_direct_earnings_prorated = meo_corpMultiLeoSr_step3_worker_earnings * meo_corpMultiLeoSr_step3_rate_group3_direct_earnings_percentage;
  var meo_corpMultiLeoSr_step3_rate_group4_direct_earnings_prorated = meo_corpMultiLeoSr_step3_worker_earnings * meo_corpMultiLeoSr_step3_rate_group4_direct_earnings_percentage;
  var meo_corpMultiLeoSr_step3_rate_group5_direct_earnings_prorated = meo_corpMultiLeoSr_step3_worker_earnings * meo_corpMultiLeoSr_step3_rate_group5_direct_earnings_percentage;
  var meo_corpMultiLeoSr_step3_rate_group6_direct_earnings_prorated = meo_corpMultiLeoSr_step3_worker_earnings * meo_corpMultiLeoSr_step3_rate_group6_direct_earnings_percentage;
  var meo_corpMultiLeoSr_step3_rate_group7_direct_earnings_prorated = meo_corpMultiLeoSr_step3_worker_earnings * meo_corpMultiLeoSr_step3_rate_group7_direct_earnings_percentage;
  var meo_corpMultiLeoSr_step3_rate_group8_direct_earnings_prorated = meo_corpMultiLeoSr_step3_worker_earnings * meo_corpMultiLeoSr_step3_rate_group8_direct_earnings_percentage;
  var meo_corpMultiLeoSr_step3_rate_group9_direct_earnings_prorated = meo_corpMultiLeoSr_step3_worker_earnings * meo_corpMultiLeoSr_step3_rate_group9_direct_earnings_percentage;
  var meo_corpMultiLeoSr_step3_rate_group10_direct_earnings_prorated = meo_corpMultiLeoSr_step3_worker_earnings * meo_corpMultiLeoSr_step3_rate_group10_direct_earnings_percentage;

  var meo_corpMultiLeoSr_step3_rate_group1_direct_earnings_insurable = parseFloat(meo_corpMultiLeoSr_step3_rate_group1_direct_earnings) + parseFloat(meo_corpMultiLeoSr_step3_rate_group1_direct_earnings_prorated);
  var meo_corpMultiLeoSr_step3_rate_group2_direct_earnings_insurable = parseFloat(meo_corpMultiLeoSr_step3_rate_group2_direct_earnings) + parseFloat(meo_corpMultiLeoSr_step3_rate_group2_direct_earnings_prorated);
  var meo_corpMultiLeoSr_step3_rate_group3_direct_earnings_insurable = parseFloat(meo_corpMultiLeoSr_step3_rate_group3_direct_earnings) + parseFloat(meo_corpMultiLeoSr_step3_rate_group3_direct_earnings_prorated);
  var meo_corpMultiLeoSr_step3_rate_group4_direct_earnings_insurable = parseFloat(meo_corpMultiLeoSr_step3_rate_group4_direct_earnings) + parseFloat(meo_corpMultiLeoSr_step3_rate_group4_direct_earnings_prorated);
  var meo_corpMultiLeoSr_step3_rate_group5_direct_earnings_insurable = parseFloat(meo_corpMultiLeoSr_step3_rate_group5_direct_earnings) + parseFloat(meo_corpMultiLeoSr_step3_rate_group5_direct_earnings_prorated);
  var meo_corpMultiLeoSr_step3_rate_group6_direct_earnings_insurable = parseFloat(meo_corpMultiLeoSr_step3_rate_group6_direct_earnings) + parseFloat(meo_corpMultiLeoSr_step3_rate_group6_direct_earnings_prorated);
  var meo_corpMultiLeoSr_step3_rate_group7_direct_earnings_insurable = parseFloat(meo_corpMultiLeoSr_step3_rate_group7_direct_earnings) + parseFloat(meo_corpMultiLeoSr_step3_rate_group7_direct_earnings_prorated);
  var meo_corpMultiLeoSr_step3_rate_group8_direct_earnings_insurable = parseFloat(meo_corpMultiLeoSr_step3_rate_group8_direct_earnings) + parseFloat(meo_corpMultiLeoSr_step3_rate_group8_direct_earnings_prorated);
  var meo_corpMultiLeoSr_step3_rate_group9_direct_earnings_insurable = parseFloat(meo_corpMultiLeoSr_step3_rate_group9_direct_earnings) + parseFloat(meo_corpMultiLeoSr_step3_rate_group9_direct_earnings_prorated);
  var meo_corpMultiLeoSr_step3_rate_group10_direct_earnings_insurable = parseFloat(meo_corpMultiLeoSr_step3_rate_group10_direct_earnings) + parseFloat(meo_corpMultiLeoSr_step3_rate_group10_direct_earnings_prorated);

  var meo_corpMultiLeoSr_step3_rate_group1_premium_owed = meo_corpMultiLeoSr_step3_rate_group1_premium_rate/100 * meo_corpMultiLeoSr_step3_rate_group1_direct_earnings_insurable;
  var meo_corpMultiLeoSr_step3_rate_group2_premium_owed = meo_corpMultiLeoSr_step3_rate_group2_premium_rate/100 * meo_corpMultiLeoSr_step3_rate_group2_direct_earnings_insurable;
  var meo_corpMultiLeoSr_step3_rate_group3_premium_owed = meo_corpMultiLeoSr_step3_rate_group3_premium_rate/100 * meo_corpMultiLeoSr_step3_rate_group3_direct_earnings_insurable;
  var meo_corpMultiLeoSr_step3_rate_group4_premium_owed = meo_corpMultiLeoSr_step3_rate_group4_premium_rate/100 * meo_corpMultiLeoSr_step3_rate_group4_direct_earnings_insurable;
  var meo_corpMultiLeoSr_step3_rate_group5_premium_owed = meo_corpMultiLeoSr_step3_rate_group5_premium_rate/100 * meo_corpMultiLeoSr_step3_rate_group5_direct_earnings_insurable;
  var meo_corpMultiLeoSr_step3_rate_group6_premium_owed = meo_corpMultiLeoSr_step3_rate_group6_premium_rate/100 * meo_corpMultiLeoSr_step3_rate_group6_direct_earnings_insurable;
  var meo_corpMultiLeoSr_step3_rate_group7_premium_owed = meo_corpMultiLeoSr_step3_rate_group7_premium_rate/100 * meo_corpMultiLeoSr_step3_rate_group7_direct_earnings_insurable;
  var meo_corpMultiLeoSr_step3_rate_group8_premium_owed = meo_corpMultiLeoSr_step3_rate_group8_premium_rate/100 * meo_corpMultiLeoSr_step3_rate_group8_direct_earnings_insurable;
  var meo_corpMultiLeoSr_step3_rate_group9_premium_owed = meo_corpMultiLeoSr_step3_rate_group9_premium_rate/100 * meo_corpMultiLeoSr_step3_rate_group9_direct_earnings_insurable;
  var meo_corpMultiLeoSr_step3_rate_group10_premium_owed = meo_corpMultiLeoSr_step3_rate_group10_premium_rate/100 * meo_corpMultiLeoSr_step3_rate_group10_direct_earnings_insurable;


  var meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total;
  var meo_corpMultiLeoSr_step3_rate_group_premium_owed_total;

  var meo_corpMultiLeoSr_step3_rate_group755_direct_earnings_total=0;

   //calculate eo1 (based on)
   if ( meo_eo1_corpMultiLeoSr_step2_exempt_text=='Yes') {

    meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group1_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group2_direct_earnings_insurable)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group3_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group4_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group5_direct_earnings_insurable)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group6_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group7_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group8_direct_earnings_insurable)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group9_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group10_direct_earnings_insurable);

    meo_corpMultiLeoSr_step3_rate_group_premium_owed_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group1_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group2_premium_owed)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group3_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group4_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group5_premium_owed)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group6_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group7_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group8_premium_owed)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group9_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group10_premium_owed);

   } else if ( meo_eo1_corpMultiLeoSr_step2_exempt_text=='No' && meo_eo1_corpMultiLeoSr_step2_qualify755_text=='Yes') {

    meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group1_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group2_direct_earnings_insurable)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group3_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group4_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group5_direct_earnings_insurable)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group6_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group7_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group8_direct_earnings_insurable)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group9_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group10_direct_earnings_insurable)
     + parseFloat(meo_eo1_corpMultiLeoSr_step2_annual_earnings_br2)   ;

    meo_corpMultiLeoSr_step3_rate_group_premium_owed_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group1_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group2_premium_owed)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group3_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group4_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group5_premium_owed)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group6_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group7_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group8_premium_owed)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group9_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group10_premium_owed)
      + parseFloat(meo_eo1_corpMultiLeoSr_step2_annual_earnings_period_value * 0.0019);

    meo_corpMultiLeoSr_step3_rate_group755_direct_earnings_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group755_direct_earnings_total) + parseFloat(meo_eo1_corpMultiLeoSr_step2_annual_earnings_period_value);

  } else if (meo_eo1_corpMultiLeoSr_step2_exempt_text=='No' && meo_eo1_corpMultiLeoSr_step2_qualify755_text=='No' ) {

    meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group1_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group2_direct_earnings_insurable)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group3_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group4_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group5_direct_earnings_insurable)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group6_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group7_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group8_direct_earnings_insurable)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group9_direct_earnings_insurable) + parseFloat(meo_corpMultiLeoSr_step3_rate_group10_direct_earnings_insurable);

    meo_corpMultiLeoSr_step3_rate_group_premium_owed_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group1_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group2_premium_owed)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group3_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group4_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group5_premium_owed)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group6_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group7_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group8_premium_owed)
    + parseFloat(meo_corpMultiLeoSr_step3_rate_group9_premium_owed) + parseFloat(meo_corpMultiLeoSr_step3_rate_group10_premium_owed);
  }

  //calculate eo2 (adding up)
  if ( meo_eo2_corpMultiLeoSr_step2_exempt_text=='No' && meo_eo2_corpMultiLeoSr_step2_qualify755_text=='Yes' && isPositiveNumber('meo-eo2-corp-multi-1eo-sr-step2-annual-earnings')) {

    meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total)
     + parseFloat(meo_eo2_corpMultiLeoSr_step2_annual_earnings_br2)   ;

    meo_corpMultiLeoSr_step3_rate_group_premium_owed_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group_premium_owed_total)
      + parseFloat(meo_eo2_corpMultiLeoSr_step2_annual_earnings_period_value * 0.0019);

    meo_corpMultiLeoSr_step3_rate_group755_direct_earnings_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group755_direct_earnings_total) + parseFloat(meo_eo2_corpMultiLeoSr_step2_annual_earnings_period_value);
  }

  //calculate eo3 (adding up)
  if ( meo_eo3_corpMultiLeoSr_step2_exempt_text=='No' && meo_eo3_corpMultiLeoSr_step2_qualify755_text=='Yes' && isPositiveNumber('meo-eo3-corp-multi-1eo-sr-step2-annual-earnings')) {

    meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total)
     + parseFloat(meo_eo3_corpMultiLeoSr_step2_annual_earnings_br2)   ;

    meo_corpMultiLeoSr_step3_rate_group_premium_owed_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group_premium_owed_total)
      + parseFloat(meo_eo3_corpMultiLeoSr_step2_annual_earnings_period_value * 0.0019);

    meo_corpMultiLeoSr_step3_rate_group755_direct_earnings_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group755_direct_earnings_total) + parseFloat(meo_eo3_corpMultiLeoSr_step2_annual_earnings_period_value);
  }

  //calculate eo4 (adding up)
  if ( meo_eo4_corpMultiLeoSr_step2_exempt_text=='No' && meo_eo4_corpMultiLeoSr_step2_qualify755_text=='Yes' && isPositiveNumber('meo-eo4-corp-multi-1eo-sr-step2-annual-earnings')) {

    meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total)
     + parseFloat(meo_eo4_corpMultiLeoSr_step2_annual_earnings_br2)   ;

    meo_corpMultiLeoSr_step3_rate_group_premium_owed_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group_premium_owed_total)
      + parseFloat(meo_eo4_corpMultiLeoSr_step2_annual_earnings_period_value * 0.0019);

    meo_corpMultiLeoSr_step3_rate_group755_direct_earnings_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group755_direct_earnings_total) + parseFloat(meo_eo4_corpMultiLeoSr_step2_annual_earnings_period_value);
  }

  var meo_corpMultiLeoSr_step3_rate_group_direct_earnings_premium_owed_total = parseFloat(meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total)
                + parseFloat(meo_corpMultiLeoSr_step3_rate_group_premium_owed_total);


    //show/hide the eo1, eo2, eo3, eo4
  if (!isPositiveNumber('meo-eo1-corp-multi-1eo-sr-step2-annual-earnings')){
    document.getElementById('meo-eo1-table-corp-multi-1eo-sr-summary-step2').style.display='none';
  } else {
    document.getElementById('meo-eo1-table-corp-multi-1eo-sr-summary-step2').style.display='block';
  }

  if (!isPositiveNumber('meo-eo2-corp-multi-1eo-sr-step2-annual-earnings')){
    document.getElementById('meo-eo2-table-corp-multi-1eo-sr-summary-step2').style.display='none';
  } else {
    document.getElementById('meo-eo2-table-corp-multi-1eo-sr-summary-step2').style.display='block';
  }

  if (!isPositiveNumber('meo-eo3-corp-multi-1eo-sr-step2-annual-earnings')){
    document.getElementById('meo-eo3-table-corp-multi-1eo-sr-summary-step2').style.display='none';
  } else {
    document.getElementById('meo-eo3-table-corp-multi-1eo-sr-summary-step2').style.display='block';
  }

  if (!isPositiveNumber('meo-eo4-corp-multi-1eo-sr-step2-annual-earnings')){
    document.getElementById('meo-eo4-table-corp-multi-1eo-sr-summary-step2').style.display='none';
  } else {
    document.getElementById('meo-eo4-table-corp-multi-1eo-sr-summary-step2').style.display='block';
  }

  //to display the page.

  meo_corpMultiLeoSr_summary_step1_how_often.innerHTML = reportFrequencyText;

  //display summary step2 eo1
  meo_eo1_corpMultiLeoSr_summary_step2_annual_earnings.innerHTML = formatDecimal(meo_eo1_corpMultiLeoSr_step2_annual_earnings_display, true, 2 ) ;
  meo_eo1_corpMultiLeoSr_summary_step2_exempt.innerHTML =meo_eo1_corpMultiLeoSr_step2_exempt_text;
  meo_eo1_corpMultiLeoSr_summary_step2_qualify_755.innerHTML = meo_eo1_corpMultiLeoSr_step2_qualify755_text;

  //display summary step2 eo2
  meo_eo2_corpMultiLeoSr_summary_step2_annual_earnings.innerHTML = formatDecimal(meo_eo2_corpMultiLeoSr_step2_annual_earnings_display, true, 2 ) ;
  meo_eo2_corpMultiLeoSr_summary_step2_exempt.innerHTML =meo_eo2_corpMultiLeoSr_step2_exempt_text;
  meo_eo2_corpMultiLeoSr_summary_step2_qualify_755.innerHTML = meo_eo2_corpMultiLeoSr_step2_qualify755_text;

  //display summary step2 eo3
  meo_eo3_corpMultiLeoSr_summary_step2_annual_earnings.innerHTML = formatDecimal(meo_eo3_corpMultiLeoSr_step2_annual_earnings_display, true, 2 ) ;
  meo_eo3_corpMultiLeoSr_summary_step2_exempt.innerHTML =meo_eo3_corpMultiLeoSr_step2_exempt_text;
  meo_eo3_corpMultiLeoSr_summary_step2_qualify_755.innerHTML = meo_eo3_corpMultiLeoSr_step2_qualify755_text;

  //display summary step2 eo4
  meo_eo4_corpMultiLeoSr_summary_step2_annual_earnings.innerHTML = formatDecimal(meo_eo4_corpMultiLeoSr_step2_annual_earnings_display, true, 2 ) ;
  meo_eo4_corpMultiLeoSr_summary_step2_exempt.innerHTML =meo_eo4_corpMultiLeoSr_step2_exempt_text;
  meo_eo4_corpMultiLeoSr_summary_step2_qualify_755.innerHTML = meo_eo4_corpMultiLeoSr_step2_qualify755_text;

  meo_corpMultiLeoSr_summary_step3_from_activity.innerHTML = meo_corpMultiLeoSr_step3_from_activity_text;
  meo_corpMultiLeoSr_summary_step3_worker_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_worker_earnings_display, true, 2 )  ;

  if (meo_eo1_corpMultiLeoSr_step2_qualify755_text =='Yes' || meo_eo2_corpMultiLeoSr_step2_qualify755_text =='Yes'
       || meo_eo3_corpMultiLeoSr_step2_qualify755_text=='Yes' || meo_eo4_corpMultiLeoSr_step2_qualify755_text == 'Yes') {
    meo_corpMultiLeoSr_summary_step3_rategroup755.style.display='block';

    meo_corpMultiLeoSr_summary_step3_rategroup755_name.innerHTML = '755 Non-Exempt Partners and Executive Officers in Construction.';
    meo_corpMultiLeoSr_summary_step3_rategroup755_value.innerHTML = '0.19';
    meo_corpMultiLeoSr_summary_step3_rategroup755_premium_amount.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group755_direct_earnings_total * 0.0019, true, 2 ) ;
    meo_corpMultiLeoSr_summary_step3_rategroup755_insurable_earnings.innerHTML =formatDecimal(meo_corpMultiLeoSr_step3_rate_group755_direct_earnings_total, true, 2 ) ;
  } else {
     meo_corpMultiLeoSr_summary_step3_rategroup755.style.display='none';
  }

   // corpMultiLeoSr_summary_result_insurable_premium_total.innerHTML = formatDecimal(corpMultiLeoSr_step3_rate_group_direct_earnings_premium_owed_total, true, 2 );
  meo_corpMultiLeoSr_summary_result_insurable_total.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group_direct_earnings_total, true, 2 );
  meo_corpMultiLeoSr_summary_result_premium_total.innerHTML =formatDecimal(meo_corpMultiLeoSr_step3_rate_group_premium_owed_total, true, 2 );

   <!-- summary step3 normal rate groups -->
  meo_corpMultiLeoSr_summary_step3_rategroup1_name.innerHTML = rategroup1.options[rategroup1.selectedIndex].text;
  meo_corpMultiLeoSr_summary_step3_rategroup1_value.innerHTML = meo_corpMultiLeoSr_step3_rate_group1_premium_rate;
  meo_corpMultiLeoSr_summary_step3_rategroup1_direct_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group1_direct_earnings, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup1_premium_amount.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group1_premium_owed, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup1_insurable_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group1_direct_earnings_insurable, true, 2 ) ;

  meo_corpMultiLeoSr_summary_step3_rategroup2_name.innerHTML = rategroup2.options[rategroup2.selectedIndex].text;
  meo_corpMultiLeoSr_summary_step3_rategroup2_value.innerHTML = meo_corpMultiLeoSr_step3_rate_group2_premium_rate;
  meo_corpMultiLeoSr_summary_step3_rategroup2_direct_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group2_direct_earnings, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup2_premium_amount.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group2_premium_owed, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup2_insurable_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group2_direct_earnings_insurable, true, 2 ) ;

  meo_corpMultiLeoSr_summary_step3_rategroup3_name.innerHTML = rategroup3.options[rategroup3.selectedIndex].text;
  meo_corpMultiLeoSr_summary_step3_rategroup3_value.innerHTML = meo_corpMultiLeoSr_step3_rate_group3_premium_rate;
  meo_corpMultiLeoSr_summary_step3_rategroup3_direct_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group3_direct_earnings, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup3_premium_amount.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group3_premium_owed, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup3_insurable_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group3_direct_earnings_insurable, true, 2 ) ;

  meo_corpMultiLeoSr_summary_step3_rategroup4_name.innerHTML = rategroup4.options[rategroup4.selectedIndex].text;
  meo_corpMultiLeoSr_summary_step3_rategroup4_value.innerHTML = meo_corpMultiLeoSr_step3_rate_group4_premium_rate;
  meo_corpMultiLeoSr_summary_step3_rategroup4_direct_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group4_direct_earnings, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup4_premium_amount.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group4_premium_owed, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup4_insurable_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group4_direct_earnings_insurable, true, 2 ) ;

  meo_corpMultiLeoSr_summary_step3_rategroup5_name.innerHTML = rategroup5.options[rategroup5.selectedIndex].text;
  meo_corpMultiLeoSr_summary_step3_rategroup5_value.innerHTML = meo_corpMultiLeoSr_step3_rate_group5_premium_rate;
  meo_corpMultiLeoSr_summary_step3_rategroup5_direct_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group5_direct_earnings, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup5_premium_amount.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group5_premium_owed, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup5_insurable_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group5_direct_earnings_insurable, true, 2 ) ;

  meo_corpMultiLeoSr_summary_step3_rategroup6_name.innerHTML = rategroup6.options[rategroup6.selectedIndex].text;
  meo_corpMultiLeoSr_summary_step3_rategroup6_value.innerHTML = meo_corpMultiLeoSr_step3_rate_group6_premium_rate;
  meo_corpMultiLeoSr_summary_step3_rategroup6_direct_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group6_direct_earnings, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup6_premium_amount.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group6_premium_owed, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup6_insurable_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group6_direct_earnings_insurable, true, 2 ) ;

  meo_corpMultiLeoSr_summary_step3_rategroup7_name.innerHTML = rategroup7.options[rategroup7.selectedIndex].text;
  meo_corpMultiLeoSr_summary_step3_rategroup7_value.innerHTML = meo_corpMultiLeoSr_step3_rate_group7_premium_rate;
  meo_corpMultiLeoSr_summary_step3_rategroup7_direct_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group7_direct_earnings, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup7_premium_amount.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group7_premium_owed, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup7_insurable_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group7_direct_earnings_insurable, true, 2 ) ;

  meo_corpMultiLeoSr_summary_step3_rategroup8_name.innerHTML = rategroup8.options[rategroup8.selectedIndex].text;
  meo_corpMultiLeoSr_summary_step3_rategroup8_value.innerHTML = meo_corpMultiLeoSr_step3_rate_group8_premium_rate;
  meo_corpMultiLeoSr_summary_step3_rategroup8_direct_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group8_direct_earnings, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup8_premium_amount.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group8_premium_owed, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup8_insurable_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group8_direct_earnings_insurable, true, 2 ) ;

  meo_corpMultiLeoSr_summary_step3_rategroup9_name.innerHTML = rategroup9.options[rategroup9.selectedIndex].text;
  meo_corpMultiLeoSr_summary_step3_rategroup9_value.innerHTML = meo_corpMultiLeoSr_step3_rate_group9_premium_rate;
  meo_corpMultiLeoSr_summary_step3_rategroup9_direct_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group9_direct_earnings, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup9_premium_amount.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group9_premium_owed, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup9_insurable_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group9_direct_earnings_insurable, true, 2 ) ;

  meo_corpMultiLeoSr_summary_step3_rategroup10_name.innerHTML = rategroup10.options[rategroup10.selectedIndex].text;
  meo_corpMultiLeoSr_summary_step3_rategroup10_value.innerHTML = meo_corpMultiLeoSr_step3_rate_group10_premium_rate;
  meo_corpMultiLeoSr_summary_step3_rategroup10_direct_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group10_direct_earnings, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup10_premium_amount.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group10_premium_owed, true, 2 ) ;
  meo_corpMultiLeoSr_summary_step3_rategroup10_insurable_earnings.innerHTML = formatDecimal(meo_corpMultiLeoSr_step3_rate_group10_direct_earnings_insurable, true, 2 ) ;

  //setFrequencys
  setFrequency('meo-corp-multi-1eo-sr-summary-report-frequency');
  setFrequency('meo-corp-multi-1eo-sr-summary-step3-rategroup1-how-often');
  setFrequency('meo-corp-multi-1eo-sr-summary-step3-rategroup2-how-often');
  setFrequency('meo-corp-multi-1eo-sr-summary-step3-rategroup3-how-often');
  setFrequency('meo-corp-multi-1eo-sr-summary-step3-rategroup4-how-often');
  setFrequency('meo-corp-multi-1eo-sr-summary-step3-rategroup5-how-often');
  setFrequency('meo-corp-multi-1eo-sr-summary-step3-rategroup6-how-often');
  setFrequency('meo-corp-multi-1eo-sr-summary-step3-rategroup7-how-often');
  setFrequency('meo-corp-multi-1eo-sr-summary-step3-rategroup8-how-often');
  setFrequency('meo-corp-multi-1eo-sr-summary-step3-rategroup9-how-often');
  setFrequency('meo-corp-multi-1eo-sr-summary-step3-rategroup10-how-often');

  if ($("#corp-multi-yes-meo-step3 span.error:visible").length) {
    return false;
  }

  document.getElementById('corp-multi-yes-meo-step3').style.display='none';
  document.getElementById('corp-multi-yes-meo-summary').style.display='block';

  <!-- calculation end -->
}
//multi-multi complicated end



//joe and Ele functions end

//Partner Multi
function partMultiS1() {
  //Annual net earnings
  var totalNet = document.getElementById("pmulti-annualNet");
  var netResult = eval( $(totalNet).autoNumeric('get') * 1 );
  var netResultError = document.getElementById("pmulti-annualNet-error");

  //Partner 1
  var pm1name = document.getElementById("pmulti-p1name");
  var pm1per = document.getElementById("pmulti-part1percent");
  var pm1percent = eval( pm1per.value * 1 );

  var pm1d = document.getElementById("pmulti-part1declare");
  var pm1declare = pm1d.options[pm1d.selectedIndex].value;
  var pm1declareText = pm1d.options[pm1d.selectedIndex].text;

  var pm1s = document.getElementById("pmulti-part1special");
  var pm1special = pm1s.options[pm1s.selectedIndex].value;
  var pm1specialText = pm1s.options[pm1s.selectedIndex].text;

  //partner 2
  var pm2name = document.getElementById("pmulti-p2name");
  var pm2per = document.getElementById("pmulti-part2percent");
  var pm2percent = eval( pm2per.value * 1 );

  var pm2d = document.getElementById("pmulti-part2declare");
  var pm2declare = pm2d.options[pm2d.selectedIndex].value;
  var pm2declareText = pm2d.options[pm2d.selectedIndex].text;

  var pm2s = document.getElementById("pmulti-part2special");
  var pm2special = pm2s.options[pm2s.selectedIndex].value;
  var pm2specialText = pm2s.options[pm2s.selectedIndex].text;

  //partner 3
  var pm3val = document.getElementById("pmulti-add3");
  var pm3value = eval( pm3val.value * 1 );

    var pm3name = document.getElementById("pmulti-p3name");
    var pm3per = document.getElementById("pmulti-part3percent");
    var pm3percent = eval( pm3per.value * 1 );

    var pm3d = document.getElementById("pmulti-part3declare");
    var pm3declare = pm3d.options[pm3d.selectedIndex].value;
    var pm3declareText = pm3d.options[pm3d.selectedIndex].text;

    var pm3s = document.getElementById("pmulti-part3special");
    var pm3special = pm3s.options[pm3s.selectedIndex].value;
    var pm3specialText = pm3s.options[pm3s.selectedIndex].text;

  //partner 4
  var pm4val = document.getElementById("pmulti-add4");
  var pm4value = eval( pm4val.value * 1 );

    var pm4name = document.getElementById("pmulti-p4name");
    var pm4per = document.getElementById("pmulti-part4percent");
    var pm4percent = eval( pm4per.value * 1 );

    var pm4d = document.getElementById("pmulti-part4declare");
    var pm4declare = pm4d.options[pm4d.selectedIndex].value;
    var pm4declareText = pm4d.options[pm4d.selectedIndex].text;

    var pm4s = document.getElementById("pmulti-part4special");
    var pm4special = pm4s.options[pm4s.selectedIndex].value;
    var pm4specialText = pm4s.options[pm4s.selectedIndex].text;

  <!-- errors -->
  if ( netResult * 1 <= 0 ) {
    document.getElementById('pmulti-annualNet-error').style.display='block';
  } else {
    document.getElementById('pmulti-annualNet-error').style.display='none';
  }
  //Partner 1 errors
  if ( pm1percent * 1 <= 0 ) {
    document.getElementById('pmulti-part1percent-error').style.display='block';
  } else {
    document.getElementById('pmulti-part1percent-error').style.display='none';
  }
  if ( pm1declare * 1 <= 0 ) {
    document.getElementById('pmulti-part1declare-error').style.display='block';
  } else {
    document.getElementById('pmulti-part1declare-error').style.display='none';
  }
  if ( pm1special * 1 <= 0 ) {
    document.getElementById('pmulti-part1special-error').style.display='block';
  } else {
    document.getElementById('pmulti-part1special-error').style.display='none';
  }

  //Partner 2 errors
  if ( pm2percent * 1 <= 0 ) {
    document.getElementById('pmulti-part2percent-error').style.display='block';
  } else {
    document.getElementById('pmulti-part2percent-error').style.display='none';
  }
  if ( pm2declare * 1 <= 0 ) {
    document.getElementById('pmulti-part2declare-error').style.display='block';
  } else {
    document.getElementById('pmulti-part2declare-error').style.display='none';
  }
  if ( pm2special * 1 <= 0 ) {
    document.getElementById('pmulti-part2special-error').style.display='block';
  } else {
    document.getElementById('pmulti-part2special-error').style.display='none';
  }

  //Partner 3 errors
  if ( pm3value * 1 == 1 ) {
    if ( pm3percent * 1 <= 0 ) {
      document.getElementById('pmulti-part3percent-error').style.display='block';
    } else {
      document.getElementById('pmulti-part3percent-error').style.display='none';
    }
    if ( pm3declare * 1 <= 0 ) {
      document.getElementById('pmulti-part3declare-error').style.display='block';
    } else {
      document.getElementById('pmulti-part3declare-error').style.display='none';
    }
    if ( pm3special * 1 <= 0 ) {
      document.getElementById('pmulti-part3special-error').style.display='block';
    } else {
      document.getElementById('pmulti-part3special-error').style.display='none';
    }
  } else if ( pm3value * 1 == 0 ) {
    pm3name = "" ;
    pm3percent = 0 ;
    pm3declare = 1 ;
    pm3special = 2 ;

    document.getElementById('pmulti-part3percent-error').style.display='none';
    document.getElementById('pmulti-part3declare-error').style.display='none';
    document.getElementById('pmulti-part3special-error').style.display='none';
  }

  //Partner 4 errors
  if ( pm4value * 1 == 1 ) {
    if ( pm4percent * 1 <= 0 ) {
      document.getElementById('pmulti-part4percent-error').style.display='block';
    } else {
      document.getElementById('pmulti-part4percent-error').style.display='none';
    }
    if ( pm4declare * 1 <= 0 ) {
      document.getElementById('pmulti-part4declare-error').style.display='block';
    } else {
      document.getElementById('pmulti-part4declare-error').style.display='none';
    }
    if ( pm4special * 1 <= 0 ) {
      document.getElementById('pmulti-part4special-error').style.display='block';
    } else {
      document.getElementById('pmulti-part4special-error').style.display='none';
    }
  } else if ( pm4value * 1 == 0 ) {
    pm4name = "" ;
    pm4percent = 0 ;
    pm4declare = 1 ;
    pm4special = 2 ;

    document.getElementById('pmulti-part4percent-error').style.display='none';
    document.getElementById('pmulti-part4declare-error').style.display='none';
    document.getElementById('pmulti-part4special-error').style.display='none';
  }


  //Function errors
    //total percentage is not 100%
    if (( eval(( pm1percent * 1 ) + ( pm2percent * 1 ) + ( pm3percent * 1 ) + ( pm4percent * 1 )) ) != 100 ) {
      document.getElementById('pmulti-not100-error').style.display='block';
    } else {
      document.getElementById('pmulti-not100-error').style.display='none';
    }

    //more than 1 exempt
    if (( eval(( pm1declare * 1 ) + ( pm2declare * 1 ) + ( pm3declare * 1 ) + ( pm4declare * 1 )) ) > 7 ) {
      document.getElementById('pmulti-no2exempt-error').style.display='block';
    } else {
      document.getElementById('pmulti-no2exempt-error').style.display='none';
    }

    //can't be both exempt and special
    if ((( eval(( pm1declare * 1 ) + ( pm1special * 1 ))) == 5 ) || (( eval(( pm2declare * 1 ) + ( pm2special * 1 ))) == 5 ) || (( eval(( pm3declare * 1 ) + ( pm3special * 1 ))) == 5 ) || (( eval(( pm4declare * 1 ) + ( pm4special * 1 ))) == 5 )) {
      document.getElementById('pmulti-no2both-error').style.display='block';
    } else {
      document.getElementById('pmulti-no2both-error').style.display='none';
    }

  <!-- errors end -->

//show/hide workers on summary

  var pmwsvalP = document.getElementById("pmulti-workers-select");

  if ($("#pmulti-questions1 span.error:visible").length) {
    return false;
  }

  document.getElementById('pmulti-questions1').style.display='none';
  document.getElementById('pmulti-questions2').style.display='block';

}

function partMultiS2() {
// new content start!!
//  var insEarnings = 0 ;
  //Frequency
  var f = document.getElementById("report-frequency");
  var freq = f.options[f.selectedIndex].value;

  //Annual net earnings
  var totalNet = document.getElementById("pmulti-annualNet");
  var netResult = eval( $(totalNet).autoNumeric('get') * 1 );

  //Partner 1
  var pm1name = document.getElementById("pmulti-p1name");
  var pm1nameValue = ( pm1name.value );
  var pm1per = document.getElementById("pmulti-part1percent");
  var pm1percent = ( pm1per.value );

  var pm1d = document.getElementById("pmulti-part1declare");
  var pm1declare = pm1d.options[pm1d.selectedIndex].value;
  var pm1declareText = pm1d.options[pm1d.selectedIndex].text;

  var pm1s = document.getElementById("pmulti-part1special");
  var pm1special = pm1s.options[pm1s.selectedIndex].value;
  var pm1specialText = pm1s.options[pm1s.selectedIndex].text;

  //partner 2
  var pm2name = document.getElementById("pmulti-p2name");
  var pm2nameValue = ( pm2name.value );
  var pm2per = document.getElementById("pmulti-part2percent");
  var pm2percent = ( pm2per.value );

  var pm2d = document.getElementById("pmulti-part2declare");
  var pm2declare = pm2d.options[pm2d.selectedIndex].value;
  var pm2declareText = pm2d.options[pm2d.selectedIndex].text;

  var pm2s = document.getElementById("pmulti-part2special");
  var pm2special = pm2s.options[pm2s.selectedIndex].value;
  var pm2specialText = pm2s.options[pm2s.selectedIndex].text;

  //partner 3
  var pm3val = document.getElementById("pmulti-add3");
  var pm3value = eval( pm3val.value * 1 );

    var pm3name = document.getElementById("pmulti-p3name");
    var pm3nameValue = ( pm3name.value );
    var pm3per = document.getElementById("pmulti-part3percent");
    var pm3percent = ( pm3per.value );

    var pm3d = document.getElementById("pmulti-part3declare");
    var pm3declare = pm3d.options[pm3d.selectedIndex].value;
    var pm3declareText = pm3d.options[pm3d.selectedIndex].text;

    var pm3s = document.getElementById("pmulti-part3special");
    var pm3special = pm3s.options[pm3s.selectedIndex].value;
    var pm3specialText = pm3s.options[pm3s.selectedIndex].text;

  //partner 4
  var pm4val = document.getElementById("pmulti-add4");
  var pm4value = eval( pm4val.value * 1 );

    var pm4name = document.getElementById("pmulti-p4name");
    var pm4nameValue = ( pm4name.value );
    var pm4per = document.getElementById("pmulti-part4percent");
    var pm4percent = ( pm4per.value );

    var pm4d = document.getElementById("pmulti-part4declare");
    var pm4declare = pm4d.options[pm4d.selectedIndex].value;
    var pm4declareText = pm4d.options[pm4d.selectedIndex].text;

    var pm4s = document.getElementById("pmulti-part4special");
    var pm4special = pm4s.options[pm4s.selectedIndex].value;
    var pm4specialText = pm4s.options[pm4s.selectedIndex].text;

  var rowsP3 = $('table#pmulti-summary-table tr');
  var partner3 = rowsP3.filter('.partner3');

  if ( pm3value * 1 == 1 ) {
    partner3.show();
  } else {
    partner3.hide();
  }

  var rowsP4 = $('table#pmulti-summary-table tr');
  var partner4 = rowsP4.filter('.partner4');

  if ( pm4value * 1 == 1 ) {
    partner4.show();
  } else {
    partner4.hide();
  }

  var pmwsvalP = document.getElementById("pmulti-workers-select");
  var pmwsP = eval( pmwsvalP.value * 1 );
  var pmworkers = document.getElementById("pmulti-sum-workers");

  if ( pmwsP * 1 == 1 ) {
    pmworkers.innerHTML = 'Yes' ;
  } else {
    pmworkers.innerHTML = 'No' ;
  }

  var annualNet = document.getElementById("pmulti-est-annual");
  annualNet.innerHTML = formatDecimal( eval( netResult * 1 ), true, 2 ) ;


//partner1
  var p1name = document.getElementById("pmulti-sum-partner1");
  p1name.innerHTML = pm1nameValue ;
  var p1percent = document.getElementById("pmulti-sum-p1-percent");
  p1percent.innerHTML = pm1percent ;
  var p1exempt = document.getElementById("pmulti-sum-p1-exempt");
  p1exempt.innerHTML = pm1declareText ;
  var p1special = document.getElementById("pmulti-sum-p1-special");
  p1special.innerHTML = pm1specialText ;

//partner2
  var p2name = document.getElementById("pmulti-sum-partner2");
  p2name.innerHTML = pm2nameValue ;
  var p2percent = document.getElementById("pmulti-sum-p2-percent");
  p2percent.innerHTML = pm2percent ;
  var p2exempt = document.getElementById("pmulti-sum-p2-exempt");
  p2exempt.innerHTML = pm2declareText ;
  var p2special = document.getElementById("pmulti-sum-p2-special");
  p2special.innerHTML = pm2specialText ;

//partner3
  var p3name = document.getElementById("pmulti-sum-partner3");
  p3name.innerHTML = pm3nameValue ;
  var p3percent = document.getElementById("pmulti-sum-p3-percent");
  p3percent.innerHTML = pm3percent ;
  var p3exempt = document.getElementById("pmulti-sum-p3-exempt");
  p3exempt.innerHTML = pm3declareText ;
  var p3special = document.getElementById("pmulti-sum-p3-special");
  p3special.innerHTML = pm3specialText ;

//partner4
  var p4name = document.getElementById("pmulti-sum-partner4");
  p4name.innerHTML = pm4nameValue ;
  var p4percent = document.getElementById("pmulti-sum-p4-percent");
  p4percent.innerHTML = pm4percent ;
  var p4exempt = document.getElementById("pmulti-sum-p4-exempt");
  p4exempt.innerHTML = pm4declareText ;
  var p4special = document.getElementById("pmulti-sum-p4-special");
  p4special.innerHTML = pm4specialText ;

//bottom
//  var rateGroupField = document.getElementById("pmulti-rate-group-display");
//  rateGroupField.innerHTML = pm1rateText ;
//  var rateGroupValueField = document.getElementById("pmulti-rate-group-value-display");
//  rateGroupValueField.innerHTML = pm1rateVal ;
//  var insSumEarnField = document.getElementById("pmulti-ins-earn-display");
//  insSumEarnField.innerHTML = formatDecimal( eval( insEarnings * 1 ), true, 2 ) ;

  var high = "90300.00"

  var adjEarnField = document.getElementById("pmulti-adj-earn-display");
  var payperField = document.getElementById("pmulti-adj-payper-display");

  var payperCommonField = document.getElementById("pmulti-adj-pluscommon-display");

  var p1payPartField = document.getElementById("pmulti-adj-p1paypart-display");
  var p2payPartField = document.getElementById("pmulti-adj-p2paypart-display");
  var p3payPartField = document.getElementById("pmulti-adj-p3paypart-display");
  var p4payPartField = document.getElementById("pmulti-adj-p4paypart-display");

  //var p1payPart = formatDecimal( eval( p1payPartField.innerHTML * 1 ), true, 2);
  var total1DisplayField = document.getElementById("pmulti-tot-ins-earn");
  var total2DisplayField = document.getElementById("pmulti-tot-ins-earn2");
  var rate1DisplayField = document.getElementById("pmulti-tot-calc-prem");
  var rate2DisplayField = document.getElementById("pmulti-tot-calc-prem2");

//Partners adjusted for net income (partner can't make more than high, then divide by frequency)
  var p1adjEarn = formatDecimal( eval(( netResult * 1 ) * ( pm1percent / 100 ) ), true, 2);
  if ( p1adjEarn * 1 >= 90300 ) {
    p1payPartField.innerHTML = formatDecimal( eval( high / freq ), true, 2);
  } else {
    p1payPartField.innerHTML = formatDecimal( eval( p1adjEarn / freq ), true, 2);
  }

  var p2adjEarn = formatDecimal( eval(( netResult * 1 ) * ( pm2percent / 100 ) ), true, 2);
  if ( p2adjEarn * 1 >= 90300 ) {
    p2payPartField.innerHTML = formatDecimal( eval( high / freq ), true, 2);
  } else {
    p2payPartField.innerHTML = formatDecimal( eval( p2adjEarn / freq ), true, 2);
  }

  var p3adjEarn = formatDecimal( eval(( netResult * 1 ) * ( pm3percent / 100 ) ), true, 2);
  if ( p3adjEarn * 1 >= 90300 ) {
    p3payPartField.innerHTML = formatDecimal( eval( high / freq ), true, 2);
  } else {
    p3payPartField.innerHTML = formatDecimal( eval( p3adjEarn / freq ), true, 2);
  }

  var p4adjEarn = formatDecimal( eval(( netResult * 1 ) * ( pm4percent / 100 ) ), true, 2);
  if ( p4adjEarn * 1 >= 90300 ) {
    p4payPartField.innerHTML = formatDecimal( eval( high / freq ), true, 2);
  } else {
    p4payPartField.innerHTML = formatDecimal( eval( p4adjEarn / freq ), true, 2);
  }

  //common earnings are divided by partner percentages to get each partner's share
  //var p1commonPortion = formatDecimal( eval(( ( insSumEarnField.innerHTML * 1 ) * ( pm1percent / 100 ) )), true, 2);
  //var p2commonPortion = formatDecimal( eval(( ( insSumEarnField.innerHTML * 1 ) * ( pm2percent / 100 ) )), true, 2);
  //var p3commonPortion = formatDecimal( eval(( ( insSumEarnField.innerHTML * 1 ) * ( pm3percent / 100 ) )), true, 2);
  //var p4commonPortion = formatDecimal( eval(( ( insSumEarnField.innerHTML * 1 ) * ( pm4percent / 100 ) )), true, 2);

//total earnings maximum / minimum adjust of netResult
  adjEarnField.innerHTML = netResult ;
  payperField.innerHTML = eval( netResult / freq );
  //payperCommonField.innerHTML = formatDecimal( eval(( payperField.innerHTML * 1 ) + ( insSumEarnField.innerHTML * 1 )), true, 2);

//  p1payPartField.innerHTML = formatDecimal( eval( p1payPartField.innerHTML * 1 ), true, 2);
//  p2payPartField.innerHTML = formatDecimal( eval( p2payPartField.innerHTML * 1 ), true, 2);
//  p3payPartField.innerHTML = formatDecimal( eval( p3payPartField.innerHTML * 1 ), true, 2);
//  p4payPartField.innerHTML = formatDecimal( eval( p4payPartField.innerHTML * 1 ), true, 2);

  var insEarningsP1 = document.getElementById("pmulti-adj-p1insearn-display");
  var insEarningsP2 = document.getElementById("pmulti-adj-p2insearn-display");
  var insEarningsP3 = document.getElementById("pmulti-adj-p3insearn-display");
  var insEarningsP4 = document.getElementById("pmulti-adj-p4insearn-display");

  var specialEarningsP1 = document.getElementById("pmulti-adj-p1specialearn-display");
  var specialEarningsP2 = document.getElementById("pmulti-adj-p2specialearn-display");
  var specialEarningsP3 = document.getElementById("pmulti-adj-p3specialearn-display");
  var specialEarningsP4 = document.getElementById("pmulti-adj-p4specialearn-display");

//if partners are exempt - total earnings - % of adjusted
  if ( pm1declare * 1 == 4 ) {
    var pm1finalVal = 0 ;
    insEarningsP1.innerHTML = pm1finalVal ;
    var pm1specialVal = 0 ;
    specialEarningsP1.innerHTML = pm1specialVal ;
  } else if ( pm1special * 1 == 1 ) {
    var pm1finalVal = 0 ;
    insEarningsP1.innerHTML = pm1finalVal ;
    var pm1specialVal = formatDecimal( eval( p1payPartField.innerHTML * 1 ), true, 2);
    specialEarningsP1.innerHTML = pm1specialVal ;
  } else {
    var pm1finalVal = formatDecimal( eval( p1payPartField.innerHTML * 1 ), true, 2);
    insEarningsP1.innerHTML = pm1finalVal ;
    var pm1specialVal = 0 ;
    specialEarningsP1.innerHTML = pm1specialVal ;
  }

  if ( pm2declare * 1 == 4 ) {
    var pm2finalVal = 0 ;
    insEarningsP2.innerHTML = pm2finalVal ;
    var pm2specialVal = 0 ;
    specialEarningsP2.innerHTML = pm2specialVal ;
  } else if ( pm2special * 1 == 1 ) {
    var pm2finalVal = 0 ;
    insEarningsP2.innerHTML = pm2finalVal ;
    var pm2specialVal = formatDecimal( eval( p2payPartField.innerHTML * 1 ), true, 2);
    specialEarningsP2.innerHTML = pm2specialVal ;
  } else {
    var pm2finalVal = formatDecimal( eval( p2payPartField.innerHTML * 1 ), true, 2);
    insEarningsP2.innerHTML = pm2finalVal ;
    var pm2specialVal = 0 ;
    specialEarningsP2.innerHTML = pm2specialVal ;
  }

  if ( pm3declare * 1 == 4 ) {
    var pm3finalVal = 0 ;
    insEarningsP3.innerHTML = pm3finalVal ;
    var pm3specialVal = 0 ;
    specialEarningsP3.innerHTML = pm3specialVal ;
  } else if ( pm3special * 1 == 1 ) {
    var pm3finalVal = 0 ;
    insEarningsP3.innerHTML = pm3finalVal ;
    var pm3specialVal = formatDecimal( eval( p3payPartField.innerHTML * 1 ), true, 2);
    specialEarningsP3.innerHTML = pm3specialVal ;
  } else {
    var pm3finalVal = formatDecimal( eval( p3payPartField.innerHTML * 1 ), true, 2);
    insEarningsP3.innerHTML = pm3finalVal ;
    var pm3specialVal = 0 ;
    specialEarningsP3.innerHTML = pm3specialVal ;
  }

  if ( pm4declare * 1 == 4 ) {
    var pm4finalVal = 0 ;
    insEarningsP4.innerHTML = pm4finalVal ;
    var pm4specialVal = 0 ;
    specialEarningsP4.innerHTML = pm4specialVal ;
  } else if (( pm4special * 1 ) == 1 ) {
    var pm4finalVal = 0 ;
    insEarningsP4.innerHTML = pm4finalVal ;
    var pm4specialVal = formatDecimal( eval( p4payPartField.innerHTML * 1 ), true, 2);
    specialEarningsP4.innerHTML = pm4specialVal ;
  } else {
    var pm4finalVal = formatDecimal( eval( p4payPartField.innerHTML * 1 ), true, 2);
    insEarningsP4.innerHTML = pm4finalVal ;
    var pm4specialVal = 0 ;
    specialEarningsP4.innerHTML = pm4specialVal ;
  }

//show/hide special rate values on summary
  var rowsSR = $('table#pmulti-summary-table2 tr');
  var specialRateShow = rowsSR.filter('.display-pm-sr');

  if (( pm1special * 1 == 1 ) || ( pm2special * 1 == 1 ) || ( pm3special * 1 == 1 ) || ( pm4special * 1 == 1 )) {
    specialRateShow.show();
  } else {
    specialRateShow.hide();
  }

  var insEarningsFINALTOTAL = document.getElementById("pmulti-adj-p1finalinsearntottrue-display");
  var insEarningsFINAL = document.getElementById("pmulti-adj-p1finalinsearntot-display");
//  var insEarningsFINAL2 = document.getElementById("pmulti-adj-p1finalinsearntot-display2");
  var specialEarningsFINAL = document.getElementById("pmulti-adj-p1specialtot-display");
  var specialEarningsFINAL2 = document.getElementById("pmulti-adj-p1specialtot-display2");
  var finalPremiumFINAL = document.getElementById("pmulti-final-premium-display");
  var finalPremiumFINAL2 = document.getElementById("pmulti-final-premium-display2");
  var finalSpecialFINAL = document.getElementById("pmulti-final-special-display");
  var finalSpecialFINAL2 = document.getElementById("pmulti-final-special-display2");
  var finalTotalPremiumFINAL = document.getElementById("pmulti-adj-p1finalpremium-display");

//total ins earnings = pm1finalVal + pm2finalVal + pm3finalVal + pm4finalVal
  insEarningsFINAL.innerHTML = formatDecimal( eval( ( pm1finalVal * 1 ) + ( pm2finalVal * 1 ) + ( pm3finalVal * 1 ) + ( pm4finalVal * 1 ) ), true, 2);
//  insEarningsFINAL2.innerHTML = formatDecimal( eval( ( pm1finalVal * 1 ) + ( pm2finalVal * 1 ) + ( pm3finalVal * 1 ) + ( pm4finalVal * 1 ) ), true, 2);

//multiply by RG
//  finalPremiumFINAL.innerHTML = formatDecimal( eval(( insEarningsFINAL.innerHTML * 1 ) * rateGroupAdj ), true, 2);
//  finalPremiumFINAL2.innerHTML = formatDecimal( eval(( insEarningsFINAL.innerHTML * 1 ) * rateGroupAdj ), true, 2);
//total special = pm1specialVal + pm2specialVal + pm3specialVal + pm4specialVal
  specialEarningsFINAL.innerHTML = formatDecimal( eval( ( pm1specialVal * 1 ) + ( pm2specialVal * 1 ) + ( pm3specialVal * 1 ) + ( pm4specialVal * 1 ) ), true, 2);
  specialEarningsFINAL2.innerHTML = formatDecimal( eval( ( pm1specialVal * 1 ) + ( pm2specialVal * 1 ) + ( pm3specialVal * 1 ) + ( pm4specialVal * 1 ) ), true, 2);
//multiply by .19
  finalSpecialFINAL.innerHTML = formatDecimal( eval(( specialEarningsFINAL.innerHTML * 1 ) * 0.0019 ), true, 2);
  finalSpecialFINAL2.innerHTML = formatDecimal( eval(( specialEarningsFINAL.innerHTML * 1 ) * 0.0019 ), true, 2);
//final Total ins earnings all inclusive
  insEarningsFINALTOTAL.innerHTML = formatDecimal( eval( ( insEarningsFINAL.innerHTML * 1 ) + ( specialEarningsFINAL.innerHTML * 1 ) ), true, 2);

//final Total Premium all inclusive
//  finalTotalPremiumFINAL.innerHTML = formatDecimal( eval( ( finalPremiumFINAL.innerHTML * 1 ) + ( finalSpecialFINAL.innerHTML * 1 ) ), true, 2);

    total1DisplayField.innerHTML = formatDecimal( eval( ( insEarningsFINAL.innerHTML * 1 ) + ( specialEarningsFINAL.innerHTML * 1 ) ), true, 2);
    total2DisplayField.innerHTML = formatDecimal( eval( ( insEarningsFINAL.innerHTML * 1 ) + ( specialEarningsFINAL.innerHTML * 1 ) ), true, 2);

//    rate1DisplayField.innerHTML = formatDecimal( eval( ( finalPremiumFINAL.innerHTML * 1 ) + ( finalSpecialFINAL.innerHTML * 1 ) ), true, 2);
//    rate2DisplayField.innerHTML = formatDecimal( eval( ( finalPremiumFINAL.innerHTML * 1 ) + ( finalSpecialFINAL.innerHTML * 1 ) ), true, 2);

//.substring(0,3)

// new content end!!

  var salary=document.getElementById("pmulti-annualNet");
  var result = eval( $(salary).autoNumeric('get') * 1 );
  var resultField = document.getElementById("pmulti-result");
  var annualField = document.getElementById("pmulti-annual");
  var annualField2 = document.getElementById("pmulti-annual2");

  var pme = document.getElementById("report-frequency");
  var strUser = pme.options[pme.selectedIndex].value;
  var reportingText = pme.options[pme.selectedIndex].text;

  var pmcs = document.getElementById("pmulti-common-option");
  var commonVal = pmcs.options[pmcs.selectedIndex].value;
  var commonValue = pmcs.options[pmcs.selectedIndex].text;
  var commonField1 = document.getElementById("pmulti-common-result");

  var high = "90300.00"

  var payperField = document.getElementById("pmulti-payper");
  var work = document.getElementById("pmulti-workerPer");
  var workPayPerField = document.getElementById("pmulti-workPayPer");
  var workresult = eval( $(work).autoNumeric('init').autoNumeric('get') / strUser );
  var workPerField = document.getElementById("pmulti-per-period");

  var rg1 = document.getElementById("pmulti-rate1");
  var rateGroup1 = rg1.options[rg1.selectedIndex].value;
  var rateGroupText1 = rg1.options[rg1.selectedIndex].text;
  var rateGroupField1 = document.getElementById("pmulti-rate1-display");
  var rateGroupValueField1 = document.getElementById("pmulti-rate1-value-display");

  var rg2 = document.getElementById("pmulti-rate2-select1");
  var rateGroup2 = rg2.options[rg2.selectedIndex].value;
  var rateGroupText2 = rg2.options[rg2.selectedIndex].text;
  var rateGroupField2 = document.getElementById("pmulti-rate2-display");
  var rateGroupValueField2 = document.getElementById("pmulti-rate2-value-display");

  var rg3 = document.getElementById("pmulti-rate3-select1");
  var rateGroup3 = rg3.options[rg3.selectedIndex].value;
  var rateGroupText3 = rg3.options[rg3.selectedIndex].text;
  var rateGroupField3 = document.getElementById("pmulti-rate3-display");
  var rateGroupValueField3 = document.getElementById("pmulti-rate3-value-display");
  var rateGroup3val = document.getElementById("pmulti-rate3value");
  var rateGroup3value = eval( rateGroup3val.value * 1 );

  var rg4 = document.getElementById("pmulti-rate4-select1");
  var rateGroup4 = rg4.options[rg4.selectedIndex].value;
  var rateGroupText4 = rg4.options[rg4.selectedIndex].text;
  var rateGroupField4 = document.getElementById("pmulti-rate4-display");
  var rateGroupValueField4 = document.getElementById("pmulti-rate4-value-display");
  var rateGroup4val = document.getElementById("pmulti-rate4value");
  var rateGroup4value = eval( rateGroup4val.value * 1 );

  var rg5 = document.getElementById("pmulti-rate5-select1");
  var rateGroup5 = rg5.options[rg5.selectedIndex].value;
  var rateGroupText5 = rg5.options[rg5.selectedIndex].text;
  var rateGroupField5 = document.getElementById("pmulti-rate5-display");
  var rateGroupValueField5 = document.getElementById("pmulti-rate5-value-display");
  var rateGroup5val = document.getElementById("pmulti-rate5value");
  var rateGroup5value = eval( rateGroup5val.value * 1 );

  var rg6 = document.getElementById("pmulti-rate6-select1");
  var rateGroup6 = rg6.options[rg6.selectedIndex].value;
  var rateGroupText6 = rg6.options[rg6.selectedIndex].text;
  var rateGroupField6 = document.getElementById("pmulti-rate6-display");
  var rateGroupValueField6 = document.getElementById("pmulti-rate6-value-display");
  var rateGroup6val = document.getElementById("pmulti-rate6value");
  var rateGroup6value = eval( rateGroup6val.value * 1 );

  var rg7 = document.getElementById("pmulti-rate7-select1");
  var rateGroup7 = rg7.options[rg7.selectedIndex].value;
  var rateGroupText7 = rg7.options[rg7.selectedIndex].text;
  var rateGroupField7 = document.getElementById("pmulti-rate7-display");
  var rateGroupValueField7 = document.getElementById("pmulti-rate7-value-display");
  var rateGroup7val = document.getElementById("pmulti-rate7value");
  var rateGroup7value = eval( rateGroup7val.value * 1 );

  var rg8 = document.getElementById("pmulti-rate8-select1");
  var rateGroup8 = rg8.options[rg8.selectedIndex].value;
  var rateGroupText8 = rg8.options[rg8.selectedIndex].text;
  var rateGroupField8 = document.getElementById("pmulti-rate8-display");
  var rateGroupValueField8 = document.getElementById("pmulti-rate8-value-display");
  var rateGroup8val = document.getElementById("pmulti-rate8value");
  var rateGroup8value = eval( rateGroup8val.value * 1 );

  var rg9 = document.getElementById("pmulti-rate9-select1");
  var rateGroup9 = rg9.options[rg9.selectedIndex].value;
  var rateGroupText9 = rg9.options[rg9.selectedIndex].text;
  var rateGroupField9 = document.getElementById("pmulti-rate9-display");
  var rateGroupValueField9 = document.getElementById("pmulti-rate9-value-display");
  var rateGroup9val = document.getElementById("pmulti-rate9value");
  var rateGroup9value = eval( rateGroup9val.value * 1 );

  var rg10 = document.getElementById("pmulti-rate10-select1");
  var rateGroup10 = rg10.options[rg10.selectedIndex].value;
  var rateGroupText10 = rg10.options[rg10.selectedIndex].text;
  var rateGroupField10 = document.getElementById("pmulti-rate10-display");
  var rateGroupValueField10 = document.getElementById("pmulti-rate10-value-display");
  var rateGroup10val = document.getElementById("pmulti-rate10value");
  var rateGroup10value = eval( rateGroup10val.value * 1 );

  var rateGroup1Adj = eval( rg1.value / 100 );
  var rateGroup2Adj = eval( rg2.value / 100 );
  var rateGroup3Adj = eval( rg3.value / 100 );
  var rateGroup4Adj = eval( rg4.value / 100 );
  var rateGroup5Adj = eval( rg5.value / 100 );
  var rateGroup6Adj = eval( rg6.value / 100 );
  var rateGroup7Adj = eval( rg7.value / 100 );
  var rateGroup8Adj = eval( rg8.value / 100 );
  var rateGroup9Adj = eval( rg9.value / 100 );
  var rateGroup10Adj = eval( rg10.value / 100 );

  var rate1WorkEarn=document.getElementById("pmulti-rate1-workearn");
  var rate1WorkEarnResult = eval( $(rate1WorkEarn).autoNumeric('get') * 1 );
  var rate1WorkEarnDisplay=document.getElementById("pmulti-rate1-workearnD");

  var rate2WorkEarn=document.getElementById("pmulti-rate2-workearn");
  var rate2WorkEarnResult = eval( $(rate2WorkEarn).autoNumeric('get') * 1 );
  var rate2WorkEarnDisplay=document.getElementById("pmulti-rate2-workearnD");

  var rate3WorkEarn=document.getElementById("pmulti-rate3-workearn");
  var rate3WorkEarnResult = eval( $(rate3WorkEarn).autoNumeric('get') * 1 );
  var rate3WorkEarnDisplay=document.getElementById("pmulti-rate3-workearnD");

  var rate4WorkEarn=document.getElementById("pmulti-rate4-workearn");
  var rate4WorkEarnResult = eval( $(rate4WorkEarn).autoNumeric('get') * 1 );
  var rate4WorkEarnDisplay=document.getElementById("pmulti-rate4-workearnD");

  var rate5WorkEarn=document.getElementById("pmulti-rate5-workearn");
  var rate5WorkEarnResult = eval( $(rate5WorkEarn).autoNumeric('get') * 1 );
  var rate5WorkEarnDisplay=document.getElementById("pmulti-rate5-workearnD");

  var rate6WorkEarn=document.getElementById("pmulti-rate6-workearn");
  var rate6WorkEarnResult = eval( $(rate6WorkEarn).autoNumeric('get') * 1 );
  var rate6WorkEarnDisplay=document.getElementById("pmulti-rate6-workearnD");

  var rate7WorkEarn=document.getElementById("pmulti-rate7-workearn");
  var rate7WorkEarnResult = eval( $(rate7WorkEarn).autoNumeric('get') * 1 );
  var rate7WorkEarnDisplay=document.getElementById("pmulti-rate7-workearnD");

  var rate8WorkEarn=document.getElementById("pmulti-rate8-workearn");
  var rate8WorkEarnResult = eval( $(rate8WorkEarn).autoNumeric('get') * 1 );
  var rate8WorkEarnDisplay=document.getElementById("pmulti-rate8-workearnD");

  var rate9WorkEarn=document.getElementById("pmulti-rate9-workearn");
  var rate9WorkEarnResult = eval( $(rate9WorkEarn).autoNumeric('get') * 1 );
  var rate9WorkEarnDisplay=document.getElementById("pmulti-rate9-workearnD");

  var rate10WorkEarn=document.getElementById("pmulti-rate10-workearn");
  var rate10WorkEarnResult = eval( $(rate10WorkEarn).autoNumeric('get') * 1 );
  var rate10WorkEarnDisplay=document.getElementById("pmulti-rate10-workearnD");

  var totalDirectField = document.getElementById("pmulti-totalDirect");

  var percentRate1Field = document.getElementById("pmulti-percentRate1");
  var percentRate2Field = document.getElementById("pmulti-percentRate2");
  var percentRate3Field = document.getElementById("pmulti-percentRate3");
  var percentRate4Field = document.getElementById("pmulti-percentRate4");
  var percentRate5Field = document.getElementById("pmulti-percentRate5");
  var percentRate6Field = document.getElementById("pmulti-percentRate6");
  var percentRate7Field = document.getElementById("pmulti-percentRate7");
  var percentRate8Field = document.getElementById("pmulti-percentRate8");
  var percentRate9Field = document.getElementById("pmulti-percentRate9");
  var percentRate10Field = document.getElementById("pmulti-percentRate10");

  var proratedRate1Field = document.getElementById("pmulti-proratedRate1");
  var proratedRate2Field = document.getElementById("pmulti-proratedRate2");
  var proratedRate3Field = document.getElementById("pmulti-proratedRate3");
  var proratedRate4Field = document.getElementById("pmulti-proratedRate4");
  var proratedRate5Field = document.getElementById("pmulti-proratedRate5");
  var proratedRate6Field = document.getElementById("pmulti-proratedRate6");
  var proratedRate7Field = document.getElementById("pmulti-proratedRate7");
  var proratedRate8Field = document.getElementById("pmulti-proratedRate8");
  var proratedRate9Field = document.getElementById("pmulti-proratedRate9");
  var proratedRate10Field = document.getElementById("pmulti-proratedRate10");

  var totalInsEarnRate1Field = document.getElementById("pmulti-totalInsEarnRate1");
  var totalInsEarnRate2Field = document.getElementById("pmulti-totalInsEarnRate2");
  var totalInsEarnRate3Field = document.getElementById("pmulti-totalInsEarnRate3");
  var totalInsEarnRate4Field = document.getElementById("pmulti-totalInsEarnRate4");
  var totalInsEarnRate5Field = document.getElementById("pmulti-totalInsEarnRate5");
  var totalInsEarnRate6Field = document.getElementById("pmulti-totalInsEarnRate6");
  var totalInsEarnRate7Field = document.getElementById("pmulti-totalInsEarnRate7");
  var totalInsEarnRate8Field = document.getElementById("pmulti-totalInsEarnRate8");
  var totalInsEarnRate9Field = document.getElementById("pmulti-totalInsEarnRate9");
  var totalInsEarnRate10Field = document.getElementById("pmulti-totalInsEarnRate10");

  var totalCurrentPremiumRate1Field = document.getElementById("pmulti-totalCurrentPremiumRate1");
  var totalCurrentPremiumRate2Field = document.getElementById("pmulti-totalCurrentPremiumRate2");
  var totalCurrentPremiumRate3Field = document.getElementById("pmulti-totalCurrentPremiumRate3");
  var totalCurrentPremiumRate4Field = document.getElementById("pmulti-totalCurrentPremiumRate4");
  var totalCurrentPremiumRate5Field = document.getElementById("pmulti-totalCurrentPremiumRate5");
  var totalCurrentPremiumRate6Field = document.getElementById("pmulti-totalCurrentPremiumRate6");
  var totalCurrentPremiumRate7Field = document.getElementById("pmulti-totalCurrentPremiumRate7");
  var totalCurrentPremiumRate8Field = document.getElementById("pmulti-totalCurrentPremiumRate8");
  var totalCurrentPremiumRate9Field = document.getElementById("pmulti-totalCurrentPremiumRate9");
  var totalCurrentPremiumRate10Field = document.getElementById("pmulti-totalCurrentPremiumRate10");

  var calcPremField = document.getElementById("pmulti-calc-prem");
  var calcPremField2 = document.getElementById("pmulti-calc-prem2");

  <!-- defining error fields -->
  var resultErrField = document.getElementById("pmulti-annualNet-error");
  var workErrField = document.getElementById("pmulti-workerPer-error");

  var rate1ErrField = document.getElementById("pmulti-rate1-error");
  var rate2ErrField = document.getElementById("pmulti-rate2-error");
  var rate3ErrField = document.getElementById("pmulti-rate3-error");
  var rate4ErrField = document.getElementById("pmulti-rate4-error");
  var rate5ErrField = document.getElementById("pmulti-rate5-error");
  var rate6ErrField = document.getElementById("pmulti-rate6-error");
  var rate7ErrField = document.getElementById("pmulti-rate7-error");
  var rate8ErrField = document.getElementById("pmulti-rate8-error");
  var rate9ErrField = document.getElementById("pmulti-rate9-error");
  var rate10ErrField = document.getElementById("pmulti-rate10-error");

  var rate1WorkEarnErrField = document.getElementById("pmulti-rate1-workearn-error");
  var rate2WorkEarnErrField = document.getElementById("pmulti-rate2-workearn-error");
  var rate3WorkEarnErrField = document.getElementById("pmulti-rate3-workearn-error");
  var rate4WorkEarnErrField = document.getElementById("pmulti-rate4-workearn-error");
  var rate5WorkEarnErrField = document.getElementById("pmulti-rate5-workearn-error");
  var rate6WorkEarnErrField = document.getElementById("pmulti-rate6-workearn-error");
  var rate7WorkEarnErrField = document.getElementById("pmulti-rate7-workearn-error");
  var rate8WorkEarnErrField = document.getElementById("pmulti-rate8-workearn-error");
  var rate9WorkEarnErrField = document.getElementById("pmulti-rate9-workearn-error");
  var rate10WorkEarnErrField = document.getElementById("pmulti-rate10-workearn-error");

  <!-- defining error fields end -->

  <!-- errors -->
  if ( result * 1 <= 0 ) {
    document.getElementById('pmulti-annualNet-error').style.display='block';
  } else {
    document.getElementById('pmulti-annualNet-error').style.display='none';
  }

  if ( commonVal * 1 <= 0 ) {
    document.getElementById('pmulti-common-error').style.display='block';
  } else {
    document.getElementById('pmulti-common-error').style.display='none';
  }

  if (( commonVal * 1 == 1 ) && ( workresult * 1 <= 0 )) {
    document.getElementById('pmulti-workerPer-error').style.display='block';
  } else {
    document.getElementById('pmulti-workerPer-error').style.display='none';
  }

  if ( rateGroup1 * 1 <= 0 ) {
    document.getElementById('pmulti-rate1-error').style.display='block';
  } else {
    document.getElementById('pmulti-rate1-error').style.display='none';
  }

  if ( rate1WorkEarnResult * 1 <= 0 ) {
    document.getElementById('pmulti-rate1-workearn-error').style.display='block';
  } else {
    document.getElementById('pmulti-rate1-workearn-error').style.display='none';
  }

  if ( rateGroup2 * 1 <= 0 ) {
    document.getElementById('pmulti-rate2-error').style.display='block';
  } else {
    document.getElementById('pmulti-rate2-error').style.display='none';
  }

  if ( rate2WorkEarnResult * 1 <= 0 ) {
    document.getElementById('pmulti-rate2-workearn-error').style.display='block';
  } else {
    document.getElementById('pmulti-rate2-workearn-error').style.display='none';
  }

  if ( rateGroup3value * 1 == 1 ) {
    if ( rateGroup3 * 1 <= 0 ) {
      document.getElementById('pmulti-rate3-error').style.display='block';
    } else {
      document.getElementById('pmulti-rate3-error').style.display='none';
    }

    if ( rate3WorkEarnResult * 1 <= 0 ) {
      document.getElementById('pmulti-rate3-workearn-error').style.display='block';
    } else {
      document.getElementById('pmulti-rate3-workearn-error').style.display='none';
    }
  } else if ( rateGroup3value * 1 == 0 ) {
    rateGroup3 = 0 ;
    rate3WorkEarnResult = 0 ;

    document.getElementById('pmulti-rate3-error').style.display='none';
    document.getElementById('pmulti-rate3-workearn-error').style.display='none';
  }

  if ( rateGroup4value * 1 == 1 ) {
    if ( rateGroup4 * 1 <= 0 ) {
      document.getElementById('pmulti-rate4-error').style.display='block';
    } else {
      document.getElementById('pmulti-rate4-error').style.display='none';
    }

    if ( rate4WorkEarnResult * 1 <= 0 ) {
      document.getElementById('pmulti-rate4-workearn-error').style.display='block';
    } else {
      document.getElementById('pmulti-rate4-workearn-error').style.display='none';
    }
  } else if ( rateGroup4value * 1 == 0 ) {
    rateGroup4 = 0 ;
    rate4WorkEarnResult = 0 ;

    document.getElementById('pmulti-rate4-error').style.display='none';
    document.getElementById('pmulti-rate4-workearn-error').style.display='none';
  }

  if ( rateGroup5value * 1 == 1 ) {
    if ( rateGroup5 * 1 <= 0 ) {
      document.getElementById('pmulti-rate5-error').style.display='block';
    } else {
      document.getElementById('pmulti-rate5-error').style.display='none';
    }

    if ( rate5WorkEarnResult * 1 <= 0 ) {
      document.getElementById('pmulti-rate5-workearn-error').style.display='block';
    } else {
      document.getElementById('pmulti-rate5-workearn-error').style.display='none';
    }
  } else if ( rateGroup5value * 1 == 0 ) {
    rateGroup5 = 0 ;
    rate5WorkEarnResult = 0 ;

    document.getElementById('pmulti-rate5-error').style.display='none';
    document.getElementById('pmulti-rate5-workearn-error').style.display='none';
  }

  if ( rateGroup6value * 1 == 1 ) {
    if ( rateGroup6 * 1 <= 0 ) {
      document.getElementById('pmulti-rate6-error').style.display='block';
    } else {
      document.getElementById('pmulti-rate6-error').style.display='none';
    }

    if ( rate6WorkEarnResult * 1 <= 0 ) {
      document.getElementById('pmulti-rate6-workearn-error').style.display='block';
    } else {
      document.getElementById('pmulti-rate6-workearn-error').style.display='none';
    }
  } else if ( rateGroup6value * 1 == 0 ) {
    rateGroup6 = 0 ;
    rate6WorkEarnResult = 0 ;

    document.getElementById('pmulti-rate6-error').style.display='none';
    document.getElementById('pmulti-rate6-workearn-error').style.display='none';
  }

  if ( rateGroup7value * 1 == 1 ) {
    if ( rateGroup7 * 1 <= 0 ) {
      document.getElementById('pmulti-rate7-error').style.display='block';
    } else {
      document.getElementById('pmulti-rate7-error').style.display='none';
    }

    if ( rate7WorkEarnResult * 1 <= 0 ) {
      document.getElementById('pmulti-rate7-workearn-error').style.display='block';
    } else {
      document.getElementById('pmulti-rate7-workearn-error').style.display='none';
    }
  } else if ( rateGroup7value * 1 == 0 ) {
    rateGroup7 = 0 ;
    rate7WorkEarnResult = 0 ;

    document.getElementById('pmulti-rate7-error').style.display='none';
    document.getElementById('pmulti-rate7-workearn-error').style.display='none';
  }

  if ( rateGroup8value * 1 == 1 ) {
    if ( rateGroup8 * 1 <= 0 ) {
      document.getElementById('pmulti-rate8-error').style.display='block';
    } else {
      document.getElementById('pmulti-rate8-error').style.display='none';
    }

    if ( rate8WorkEarnResult * 1 <= 0 ) {
      document.getElementById('pmulti-rate8-workearn-error').style.display='block';
    } else {
      document.getElementById('pmulti-rate8-workearn-error').style.display='none';
    }
  } else if ( rateGroup8value * 1 == 0 ) {
    rateGroup8 = 0 ;
    rate8WorkEarnResult = 0 ;

    document.getElementById('pmulti-rate8-error').style.display='none';
    document.getElementById('pmulti-rate8-workearn-error').style.display='none';
  }

  if ( rateGroup9value * 1 == 1 ) {
    if ( rateGroup9 * 1 <= 0 ) {
      document.getElementById('pmulti-rate9-error').style.display='block';
    } else {
      document.getElementById('pmulti-rate9-error').style.display='none';
    }

    if ( rate9WorkEarnResult * 1 <= 0 ) {
      document.getElementById('pmulti-rate9-workearn-error').style.display='block';
    } else {
      document.getElementById('pmulti-rate9-workearn-error').style.display='none';
    }
  } else if ( rateGroup9value * 1 == 0 ) {
    rateGroup9 = 0 ;
    rate9WorkEarnResult = 0 ;

    document.getElementById('pmulti-rate9-error').style.display='none';
    document.getElementById('pmulti-rate9-workearn-error').style.display='none';
  }

  if ( rateGroup10value * 1 == 1 ) {
    if ( rateGroup10 * 1 <= 0 ) {
      document.getElementById('pmulti-rate10-error').style.display='block';
    } else {
      document.getElementById('pmulti-rate10-error').style.display='none';
    }

    if ( rate10WorkEarnResult * 1 <= 0 ) {
      document.getElementById('pmulti-rate10-workearn-error').style.display='block';
    } else {
      document.getElementById('pmulti-rate10-workearn-error').style.display='none';
    }
  } else if ( rateGroup10value * 1 == 0 ) {
    rateGroup10 = 0 ;
    rate10WorkEarnResult = 0 ;

    document.getElementById('pmulti-rate10-error').style.display='none';
    document.getElementById('pmulti-rate10-workearn-error').style.display='none';
  }

  <!-- errors end -->

  var rows = $('table#pmulti-summary-table tr');
  var row3 = rows.filter('.display-rg3');
  var row4 = rows.filter('.display-rg4');
  var row5 = rows.filter('.display-rg5');
  var row6 = rows.filter('.display-rg6');
  var row7 = rows.filter('.display-rg7');
  var row8 = rows.filter('.display-rg8');
  var row9 = rows.filter('.display-rg9');
  var row10 = rows.filter('.display-rg10');

  if ( rateGroup3value * 1 == 0 ) { row3.hide(); } else { row3.show(); }
  if ( rateGroup4value * 1 == 0 ) { row4.hide(); } else { row4.show(); }
  if ( rateGroup5value * 1 == 0 ) { row5.hide(); } else { row5.show(); }
  if ( rateGroup6value * 1 == 0 ) { row6.hide(); } else { row6.show(); }
  if ( rateGroup7value * 1 == 0 ) { row7.hide(); } else { row7.show(); }
  if ( rateGroup8value * 1 == 0 ) { row8.hide(); } else { row8.show(); }
  if ( rateGroup9value * 1 == 0 ) { row9.hide(); } else { row9.show(); }
  if ( rateGroup10value * 1 == 0 ) { row10.hide(); } else { row10.show(); }

//  document.getElementById('pmulti-summary').style.display='none';
//  document.getElementById('pmulti-questions2').style.display='block';

  /*( strUser * 1 <= 0 ) || ( workresult * 1 <= 0 ) || ( result * 1 <= 0 ) || ( rateGroup * 1 <= 0 ) */
  <!-- calculation -->

  if ( result * 1 >= 90300 ) {
    payperField.innerHTML = formatDecimal(( high / strUser ), true, 2 ) ;
    workPayPerField.innerHTML = formatDecimal( eval(( high / strUser ) + workresult ), true, 2) ;
  } else if ( result * 1 < 90300 ) {
    payperField.innerHTML = formatDecimal(( result / strUser ), true, 2 ) ;
    workPayPerField.innerHTML = formatDecimal( eval(( result / strUser ) + workresult ), true, 2) ;
  }

  commonField1.innerHTML = commonValue ;
  resultField.innerHTML = formatDecimal( eval( result * 1 ), true, 2 ) ;
  workPerField.innerHTML = formatDecimal( eval( workresult * 1 ), true, 2 ) ;
  rateGroupField1.innerHTML = rateGroupText1 ;
  rateGroupField2.innerHTML = rateGroupText2 ;
  rateGroupField3.innerHTML = rateGroupText3 ;
  rateGroupField4.innerHTML = rateGroupText4 ;
  rateGroupField5.innerHTML = rateGroupText5 ;
  rateGroupField6.innerHTML = rateGroupText6 ;
  rateGroupField7.innerHTML = rateGroupText7 ;
  rateGroupField8.innerHTML = rateGroupText8 ;
  rateGroupField9.innerHTML = rateGroupText9 ;
  rateGroupField10.innerHTML = rateGroupText10 ;
  rateGroupValueField1.innerHTML = rateGroup1 ;
  rateGroupValueField2.innerHTML = rateGroup2 ;
  rateGroupValueField3.innerHTML = rateGroup3 ;
  rateGroupValueField4.innerHTML = rateGroup4 ;
  rateGroupValueField5.innerHTML = rateGroup5 ;
  rateGroupValueField6.innerHTML = rateGroup6 ;
  rateGroupValueField7.innerHTML = rateGroup7 ;
  rateGroupValueField8.innerHTML = rateGroup8 ;
  rateGroupValueField9.innerHTML = rateGroup9 ;
  rateGroupValueField10.innerHTML = rateGroup10 ;
  rate1WorkEarnDisplay.innerHTML = formatDecimal( eval( rate1WorkEarnResult * 1 ), true, 2 ) ;
  rate2WorkEarnDisplay.innerHTML = formatDecimal( eval( rate2WorkEarnResult * 1 ), true, 2 ) ;
  rate3WorkEarnDisplay.innerHTML = formatDecimal( eval( rate3WorkEarnResult * 1 ), true, 2 ) ;
  rate4WorkEarnDisplay.innerHTML = formatDecimal( eval( rate4WorkEarnResult * 1 ), true, 2 ) ;
  rate5WorkEarnDisplay.innerHTML = formatDecimal( eval( rate5WorkEarnResult * 1 ), true, 2 ) ;
  rate6WorkEarnDisplay.innerHTML = formatDecimal( eval( rate6WorkEarnResult * 1 ), true, 2 ) ;
  rate7WorkEarnDisplay.innerHTML = formatDecimal( eval( rate7WorkEarnResult * 1 ), true, 2 ) ;
  rate8WorkEarnDisplay.innerHTML = formatDecimal( eval( rate8WorkEarnResult * 1 ), true, 2 ) ;
  rate9WorkEarnDisplay.innerHTML = formatDecimal( eval( rate9WorkEarnResult * 1 ), true, 2 ) ;
  rate10WorkEarnDisplay.innerHTML = formatDecimal( eval( rate10WorkEarnResult * 1 ), true, 2 ) ;
  totalDirectField.innerHTML = formatDecimal( eval(( rate1WorkEarnResult * 1 ) + ( rate2WorkEarnResult * 1 ) + ( rate3WorkEarnResult * 1 ) + ( rate4WorkEarnResult * 1 ) + ( rate5WorkEarnResult * 1 ) + ( rate6WorkEarnResult * 1 ) + ( rate7WorkEarnResult * 1 ) + ( rate8WorkEarnResult * 1 ) + ( rate9WorkEarnResult * 1 ) + ( rate10WorkEarnResult * 1 ) ), true, 2 );
  percentRate1Field.innerHTML = formatDecimal( eval(( rate1WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
  percentRate2Field.innerHTML = formatDecimal( eval(( rate2WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
  percentRate3Field.innerHTML = formatDecimal( eval(( rate3WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
  percentRate4Field.innerHTML = formatDecimal( eval(( rate4WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
  percentRate5Field.innerHTML = formatDecimal( eval(( rate5WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
  percentRate6Field.innerHTML = formatDecimal( eval(( rate6WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
  percentRate7Field.innerHTML = formatDecimal( eval(( rate7WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
  percentRate8Field.innerHTML = formatDecimal( eval(( rate8WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
  percentRate9Field.innerHTML = formatDecimal( eval(( rate9WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
  percentRate10Field.innerHTML = formatDecimal( eval(( rate10WorkEarnResult / totalDirectField.innerHTML ) * 100 ), true, 2) ;
  proratedRate1Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate1Field.innerHTML ) / 100 ), true, 2) ;
  proratedRate2Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate2Field.innerHTML ) / 100 ), true, 2) ;
  proratedRate3Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate3Field.innerHTML ) / 100 ), true, 2) ;
  proratedRate4Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate4Field.innerHTML ) / 100 ), true, 2) ;
  proratedRate5Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate5Field.innerHTML ) / 100 ), true, 2) ;
  proratedRate6Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate6Field.innerHTML ) / 100 ), true, 2) ;
  proratedRate7Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate7Field.innerHTML ) / 100 ), true, 2) ;
  proratedRate8Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate8Field.innerHTML ) / 100 ), true, 2) ;
  proratedRate9Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate9Field.innerHTML ) / 100 ), true, 2) ;
  proratedRate10Field.innerHTML = formatDecimal( eval((( workPayPerField.innerHTML * 1 ) * percentRate10Field.innerHTML ) / 100 ), true, 2) ;
  totalInsEarnRate1Field.innerHTML = formatDecimal( eval(( proratedRate1Field.innerHTML * 1 ) + ( rate1WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
  totalInsEarnRate2Field.innerHTML = formatDecimal( eval(( proratedRate2Field.innerHTML * 1 ) + ( rate2WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
  totalInsEarnRate3Field.innerHTML = formatDecimal( eval(( proratedRate3Field.innerHTML * 1 ) + ( rate3WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
  totalInsEarnRate4Field.innerHTML = formatDecimal( eval(( proratedRate4Field.innerHTML * 1 ) + ( rate4WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
  totalInsEarnRate5Field.innerHTML = formatDecimal( eval(( proratedRate5Field.innerHTML * 1 ) + ( rate5WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
  totalInsEarnRate6Field.innerHTML = formatDecimal( eval(( proratedRate6Field.innerHTML * 1 ) + ( rate6WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
  totalInsEarnRate7Field.innerHTML = formatDecimal( eval(( proratedRate7Field.innerHTML * 1 ) + ( rate7WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
  totalInsEarnRate8Field.innerHTML = formatDecimal( eval(( proratedRate8Field.innerHTML * 1 ) + ( rate8WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
  totalInsEarnRate9Field.innerHTML = formatDecimal( eval(( proratedRate9Field.innerHTML * 1 ) + ( rate9WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
  totalInsEarnRate10Field.innerHTML = formatDecimal( eval(( proratedRate10Field.innerHTML * 1 ) + ( rate10WorkEarnDisplay.innerHTML * 1 ) ), true, 2) ;
  totalCurrentPremiumRate1Field.innerHTML = formatDecimal( eval(( totalInsEarnRate1Field.innerHTML * 1 ) * rateGroup1Adj ), true, 2) ;
  totalCurrentPremiumRate2Field.innerHTML = formatDecimal( eval(( totalInsEarnRate2Field.innerHTML * 1 ) * rateGroup2Adj ), true, 2) ;
  totalCurrentPremiumRate3Field.innerHTML = formatDecimal( eval(( totalInsEarnRate3Field.innerHTML * 1 ) * rateGroup3Adj ), true, 2) ;
  totalCurrentPremiumRate4Field.innerHTML = formatDecimal( eval(( totalInsEarnRate4Field.innerHTML * 1 ) * rateGroup4Adj ), true, 2) ;
  totalCurrentPremiumRate5Field.innerHTML = formatDecimal( eval(( totalInsEarnRate5Field.innerHTML * 1 ) * rateGroup5Adj ), true, 2) ;
  totalCurrentPremiumRate6Field.innerHTML = formatDecimal( eval(( totalInsEarnRate6Field.innerHTML * 1 ) * rateGroup6Adj ), true, 2) ;
  totalCurrentPremiumRate7Field.innerHTML = formatDecimal( eval(( totalInsEarnRate7Field.innerHTML * 1 ) * rateGroup7Adj ), true, 2) ;
  totalCurrentPremiumRate8Field.innerHTML = formatDecimal( eval(( totalInsEarnRate8Field.innerHTML * 1 ) * rateGroup8Adj ), true, 2) ;
  totalCurrentPremiumRate9Field.innerHTML = formatDecimal( eval(( totalInsEarnRate9Field.innerHTML * 1 ) * rateGroup9Adj ), true, 2) ;
  totalCurrentPremiumRate10Field.innerHTML = formatDecimal( eval(( totalInsEarnRate10Field.innerHTML * 1 ) * rateGroup10Adj ), true, 2) ;

//  annualField.innerHTML =  formatDecimal( eval(( totalInsEarnRate1Field.innerHTML * 1 ) + ( totalInsEarnRate2Field.innerHTML * 1 ) + ( totalInsEarnRate3Field.innerHTML * 1 ) + ( totalInsEarnRate4Field.innerHTML * 1 ) + ( totalInsEarnRate5Field.innerHTML * 1 ) + ( totalInsEarnRate6Field.innerHTML * 1 ) + ( totalInsEarnRate7Field.innerHTML * 1 ) + ( totalInsEarnRate8Field.innerHTML * 1 ) + ( totalInsEarnRate9Field.innerHTML * 1 ) + ( totalInsEarnRate10Field.innerHTML * 1 ) ), true, 2);
//  annualField2.innerHTML =  formatDecimal( eval(( totalInsEarnRate1Field.innerHTML * 1 ) + ( totalInsEarnRate2Field.innerHTML * 1 ) + ( totalInsEarnRate3Field.innerHTML * 1 ) + ( totalInsEarnRate4Field.innerHTML * 1 ) + ( totalInsEarnRate5Field.innerHTML * 1 ) + ( totalInsEarnRate6Field.innerHTML * 1 ) + ( totalInsEarnRate7Field.innerHTML * 1 ) + ( totalInsEarnRate8Field.innerHTML * 1 ) + ( totalInsEarnRate9Field.innerHTML * 1 ) + ( totalInsEarnRate10Field.innerHTML * 1 ) ), true, 2);

//  calcPremField.innerHTML = formatDecimal( eval(( totalCurrentPremiumRate1Field.innerHTML * 1 ) + ( totalCurrentPremiumRate2Field.innerHTML * 1 ) + ( totalCurrentPremiumRate3Field.innerHTML * 1 ) + ( totalCurrentPremiumRate4Field.innerHTML * 1 ) + ( totalCurrentPremiumRate5Field.innerHTML * 1 ) + ( totalCurrentPremiumRate6Field.innerHTML * 1 ) + ( totalCurrentPremiumRate7Field.innerHTML * 1 ) + ( totalCurrentPremiumRate8Field.innerHTML * 1 ) + ( totalCurrentPremiumRate9Field.innerHTML * 1 ) + ( totalCurrentPremiumRate10Field.innerHTML * 1 ) ), true, 2) ;
//  calcPremField2.innerHTML = formatDecimal( eval(( totalCurrentPremiumRate1Field.innerHTML * 1 ) + ( totalCurrentPremiumRate2Field.innerHTML * 1 ) + ( totalCurrentPremiumRate3Field.innerHTML * 1 ) + ( totalCurrentPremiumRate4Field.innerHTML * 1 ) + ( totalCurrentPremiumRate5Field.innerHTML * 1 ) + ( totalCurrentPremiumRate6Field.innerHTML * 1 ) + ( totalCurrentPremiumRate7Field.innerHTML * 1 ) + ( totalCurrentPremiumRate8Field.innerHTML * 1 ) + ( totalCurrentPremiumRate9Field.innerHTML * 1 ) + ( totalCurrentPremiumRate10Field.innerHTML * 1 ) ), true, 2) ;

// for testing

var pmmtotalField = document.getElementById('pmmtotal');
pmmtotalField.innerHTML =  formatDecimal( eval( annualNet.innerHTML * 1 ), true, 2);

  //Partner 1 start
  var pmm1perField = document.getElementById('pmm1per');
  pmm1perField.innerHTML = pm1percent ;

  var pmm1adjearnField = document.getElementById('pmm1adjearn');
  pmm1adjearnField.innerHTML = formatDecimal( eval(( annualNet.innerHTML * 1 ) * (( pmm1perField.innerHTML * 1 ) / 100 )), true, 2);

  var pmm1maxcheckField = document.getElementById('pmm1maxcheck');
  if (( pmm1adjearnField.innerHTML * 1 ) >= 90300.00 ){
    pmm1maxcheckField.innerHTML = high ;
  } else if (( pmm1adjearnField.innerHTML * 1 ) < 90300.00 ){
    pmm1maxcheckField.innerHTML = formatDecimal( eval( pmm1adjearnField.innerHTML * 1 ), true, 2);;
  }

  var pmm1adjtotearnField = document.getElementById('pmm1adjtotearn');
  pmm1adjtotearnField.innerHTML = formatDecimal( eval(( pmm1maxcheckField.innerHTML * 1 ) / strUser ), true, 2);
  //Partner 1 end

  //Partner 2 start
  var pmm2perField = document.getElementById('pmm2per');
  pmm2perField.innerHTML = pm2percent ;

  var pmm2adjearnField = document.getElementById('pmm2adjearn');
  pmm2adjearnField.innerHTML = formatDecimal( eval(( annualNet.innerHTML * 1 ) * (( pmm2perField.innerHTML * 1 ) / 100 )), true, 2);

  var pmm2maxcheckField = document.getElementById('pmm2maxcheck');
  if (( pmm2adjearnField.innerHTML * 1 ) >= 90300.00 ){
    pmm2maxcheckField.innerHTML = high ;
  } else if (( pmm2adjearnField.innerHTML * 1 ) < 90300.00 ){
    pmm2maxcheckField.innerHTML = formatDecimal( eval( pmm2adjearnField.innerHTML * 1 ), true, 2);;
  }

  var pmm2adjtotearnField = document.getElementById('pmm2adjtotearn');
  pmm2adjtotearnField.innerHTML = formatDecimal( eval(( pmm2maxcheckField.innerHTML * 1 ) / strUser ), true, 2);
  //Partner 2 end

  //Partner 3 start
  var pmm3perField = document.getElementById('pmm3per');
  pmm3perField.innerHTML = pm3percent ;

  var pmm3adjearnField = document.getElementById('pmm3adjearn');
  pmm3adjearnField.innerHTML = formatDecimal( eval(( annualNet.innerHTML * 1 ) * (( pmm3perField.innerHTML * 1 ) / 100 )), true, 2);

  var pmm3maxcheckField = document.getElementById('pmm3maxcheck');
  if (( pmm3adjearnField.innerHTML * 1 ) >= 90300.00 ){
    pmm3maxcheckField.innerHTML = high ;
  } else if (( pmm3adjearnField.innerHTML * 1 ) < 90300.00 ){
    pmm3maxcheckField.innerHTML = formatDecimal( eval( pmm3adjearnField.innerHTML * 1 ), true, 2);;
  }

  var pmm3adjtotearnField = document.getElementById('pmm3adjtotearn');
  pmm3adjtotearnField.innerHTML = formatDecimal( eval(( pmm3maxcheckField.innerHTML * 1 ) / strUser ), true, 2);
  //Partner 3 end


  //Partner 4 start
  var pmm4perField = document.getElementById('pmm4per');
  pmm4perField.innerHTML = pm4percent ;

  var pmm4adjearnField = document.getElementById('pmm4adjearn');
  pmm4adjearnField.innerHTML = formatDecimal( eval(( annualNet.innerHTML * 1 ) * (( pmm4perField.innerHTML * 1 ) / 100 )), true, 2);

  var pmm4maxcheckField = document.getElementById('pmm4maxcheck');
  if (( pmm4adjearnField.innerHTML * 1 ) >= 90300.00 ){
    pmm4maxcheckField.innerHTML = high ;
  } else if (( pmm4adjearnField.innerHTML * 1 ) < 90300.00 ){
    pmm4maxcheckField.innerHTML = formatDecimal( eval( pmm4adjearnField.innerHTML * 1 ), true, 2);;
  }

  var pmm4adjtotearnField = document.getElementById('pmm4adjtotearn');
  pmm4adjtotearnField.innerHTML = formatDecimal( eval(( pmm4maxcheckField.innerHTML * 1 ) / strUser ), true, 2);
  //Partner 4 end

  var pmmpartnerinsearnbefcommonField = document.getElementById('pmmpartnerinsearnbefcommon');
  pmmpartnerinsearnbefcommonField.innerHTML = formatDecimal( eval( insEarningsFINAL.innerHTML * 1 ), true, 2);

  var pmmpartnertotalspecialField = document.getElementById('pmmpartnertotalspecial');
  pmmpartnertotalspecialField.innerHTML = formatDecimal( eval( specialEarningsFINAL.innerHTML * 1 ), true, 2);

  //total partner earnings per period
  var pmmtotpartearnperField = document.getElementById('pmmpartnertotal');
  pmmtotpartearnperField.innerHTML = formatDecimal( eval(( pmm1adjtotearnField.innerHTML * 1 ) + ( pmm2adjtotearnField.innerHTML * 1 ) + ( pmm3adjtotearnField.innerHTML * 1 ) + ( pmm4adjtotearnField.innerHTML * 1 )), true, 2);

  //Common Earnings = <span id="pmmcommon">&nbsp;</span> ( $10,000 )<br>
  var commearnearnField = document.getElementById('pmmcommon');
  commearnearnField.innerHTML = formatDecimal( eval( workPerField.innerHTML * 1 ), true, 2);

  //total common + partner earnings per period
  var pmmcommpartnertotalField = document.getElementById('pmmcommpartnertotal');
  pmmcommpartnertotalField.innerHTML = formatDecimal( eval(( pmmpartnerinsearnbefcommonField.innerHTML * 1 ) + ( commearnearnField.innerHTML * 1 )), true, 2);

  //RG1 = <span id="pmmrg1">&nbsp;</span> ( 704 / 3.69% )<br>
  var pmmrg1Field = document.getElementById('pmmrg1');
  pmmrg1Field.innerHTML = rateGroup1 ;

  //RG1DE = <span id="pmmrg1de">&nbsp;</span> ( $7777.00 )<br>
  var RG1DEField = document.getElementById('pmmrg1de');
  RG1DEField.innerHTML = formatDecimal( eval( rate1WorkEarnDisplay.innerHTML * 1 ), true, 2);

  //RG2 = <span id="pmmrg2">&nbsp;</span> ( 030 / 13.04% )<br>
  var pmmrg2Field = document.getElementById('pmmrg2');
  pmmrg2Field.innerHTML = rateGroup2 ;

  //RG2DE = <span id="pmmrg2de">&nbsp;</span> ( $999.00 )<br>
  var RG2DEField = document.getElementById('pmmrg2de');
  RG2DEField.innerHTML = formatDecimal( eval( rate2WorkEarnDisplay.innerHTML * 1 ), true, 2);

  //RG3 = <span id="pmmrg3">&nbsp;</span> ( 030 / 13.04% )<br>
  var pmmrg3Field = document.getElementById('pmmrg3');
  pmmrg3Field.innerHTML = rateGroup3 ;

  //RG3DE = <span id="pmmrg3de">&nbsp;</span> ( $999.00 )<br>
  var RG3DEField = document.getElementById('pmmrg3de');
  RG3DEField.innerHTML = formatDecimal( eval( rate3WorkEarnDisplay.innerHTML * 1 ), true, 2);

  //RG4 = <span id="pmmrg4">&nbsp;</span> ( 030 / 13.04% )<br>
  var pmmrg4Field = document.getElementById('pmmrg4');
  pmmrg4Field.innerHTML = rateGroup4 ;

  //RG4DE = <span id="pmmrg4de">&nbsp;</span> ( $999.00 )<br>
  var RG4DEField = document.getElementById('pmmrg4de');
  RG4DEField.innerHTML = formatDecimal( eval( rate4WorkEarnDisplay.innerHTML * 1 ), true, 2);

  //RG5 = <span id="pmmrg5">&nbsp;</span> ( 030 / 13.04% )<br>
  var pmmrg5Field = document.getElementById('pmmrg5');
  pmmrg5Field.innerHTML = rateGroup5 ;

  //RG5DE = <span id="pmmrg5de">&nbsp;</span> ( $999.00 )<br>
  var RG5DEField = document.getElementById('pmmrg5de');
  RG5DEField.innerHTML = formatDecimal( eval( rate5WorkEarnDisplay.innerHTML * 1 ), true, 2);

  //RG6 = <span id="pmmrg6">&nbsp;</span> ( 030 / 13.04% )<br>
  var pmmrg6Field = document.getElementById('pmmrg6');
  pmmrg6Field.innerHTML = rateGroup6 ;

  //RG6DE = <span id="pmmrg6de">&nbsp;</span> ( $999.00 )<br>
  var RG6DEField = document.getElementById('pmmrg6de');
  RG6DEField.innerHTML = formatDecimal( eval( rate6WorkEarnDisplay.innerHTML * 1 ), true, 2);

  //RG7 = <span id="pmmrg7">&nbsp;</span> ( 030 / 13.04% )<br>
  var pmmrg7Field = document.getElementById('pmmrg7');
  pmmrg7Field.innerHTML = rateGroup7 ;

  //RG7DE = <span id="pmmrg7de">&nbsp;</span> ( $999.00 )<br>
  var RG7DEField = document.getElementById('pmmrg7de');
  RG7DEField.innerHTML = formatDecimal( eval( rate7WorkEarnDisplay.innerHTML * 1 ), true, 2);

  //RG8 = <span id="pmmrg8">&nbsp;</span> ( 030 / 13.04% )<br>
  var pmmrg8Field = document.getElementById('pmmrg8');
  pmmrg8Field.innerHTML = rateGroup8 ;

  //RG8DE = <span id="pmmrg8de">&nbsp;</span> ( $999.00 )<br>
  var RG8DEField = document.getElementById('pmmrg8de');
  RG8DEField.innerHTML = formatDecimal( eval( rate8WorkEarnDisplay.innerHTML * 1 ), true, 2);

  //RG9 = <span id="pmmrg9">&nbsp;</span> ( 030 / 13.04% )<br>
  var pmmrg9Field = document.getElementById('pmmrg9');
  pmmrg9Field.innerHTML = rateGroup9 ;

  //RG9DE = <span id="pmmrg9de">&nbsp;</span> ( $999.00 )<br>
  var RG9DEField = document.getElementById('pmmrg9de');
  RG9DEField.innerHTML = formatDecimal( eval( rate9WorkEarnDisplay.innerHTML * 1 ), true, 2);

  //RG10 = <span id="pmmrg10">&nbsp;</span> ( 030 / 13.04% )<br>
  var pmmrg10Field = document.getElementById('pmmrg10');
  pmmrg10Field.innerHTML = rateGroup10 ;

  //RG10DE = <span id="pmmrg10de">&nbsp;</span> ( $999.00 )<br>
  var RG10DEField = document.getElementById('pmmrg10de');
  RG10DEField.innerHTML = formatDecimal( eval( rate10WorkEarnDisplay.innerHTML * 1 ), true, 2);

  //Total Other Earnings = <span id="pmmtotothearn">&nbsp;</span> ( $25,000 [ Ps Adj Earn + common ] )<br>
  var toeField = document.getElementById('pmmtotothearn');
  toeField.innerHTML = formatDecimal( eval(( pmmcommpartnertotalField.innerHTML * 1 )), true, 2);

  //RG1DE + RG2DE = <span id="pmmrgz">&nbsp;</span> ( RGZ )<br>
  var RGZField = document.getElementById('pmmrgz');
  RGZField.innerHTML = formatDecimal( eval(( RG1DEField.innerHTML * 1 ) + ( RG2DEField.innerHTML * 1 ) + ( RG3DEField.innerHTML * 1 ) + ( RG4DEField.innerHTML * 1 ) + ( RG5DEField.innerHTML * 1 ) + ( RG6DEField.innerHTML * 1 ) + ( RG7DEField.innerHTML * 1 ) + ( RG8DEField.innerHTML * 1 ) + ( RG9DEField.innerHTML * 1 ) + ( RG10DEField.innerHTML * 1 )), true, 2);

  //RG1% = <span id="pmmrg1per">&nbsp;</span> ( RG1DE / RGZ )<br>
  var RG1perField = document.getElementById('pmmrg1per');
  RG1perField.innerHTML = eval(( RG1DEField.innerHTML * 1 ) / ( RGZField.innerHTML * 1 ));

  //RG2% = <span id="pmmrg2per">&nbsp;</span> ( RG2DE / RGZ )<br><br>
  var RG2perField = document.getElementById('pmmrg2per');
  RG2perField.innerHTML = eval(( RG2DEField.innerHTML * 1 ) / ( RGZField.innerHTML * 1 ));

  //RG3% = <span id="pmmrg3per">&nbsp;</span> ( RG3DE / RGZ )<br><br>
  var RG3perField = document.getElementById('pmmrg3per');
  RG3perField.innerHTML = eval(( RG3DEField.innerHTML * 1 ) / ( RGZField.innerHTML * 1 ));

  //RG4% = <span id="pmmrg4per">&nbsp;</span> ( RG4DE / RGZ )<br><br>
  var RG4perField = document.getElementById('pmmrg4per');
  RG4perField.innerHTML = eval(( RG4DEField.innerHTML * 1 ) / ( RGZField.innerHTML * 1 ));

  //RG5% = <span id="pmmrg5per">&nbsp;</span> ( RG5DE / RGZ )<br><br>
  var RG5perField = document.getElementById('pmmrg5per');
  RG5perField.innerHTML = eval(( RG5DEField.innerHTML * 1 ) / ( RGZField.innerHTML * 1 ));

  //RG6% = <span id="pmmrg6per">&nbsp;</span> ( RG6DE / RGZ )<br><br>
  var RG6perField = document.getElementById('pmmrg6per');
  RG6perField.innerHTML = eval(( RG6DEField.innerHTML * 1 ) / ( RGZField.innerHTML * 1 ));

  //RG7% = <span id="pmmrg7per">&nbsp;</span> ( RG7DE / RGZ )<br><br>
  var RG7perField = document.getElementById('pmmrg7per');
  RG7perField.innerHTML = eval(( RG7DEField.innerHTML * 1 ) / ( RGZField.innerHTML * 1 ));

  //RG8% = <span id="pmmrg8per">&nbsp;</span> ( RG8DE / RGZ )<br><br>
  var RG8perField = document.getElementById('pmmrg8per');
  RG8perField.innerHTML = eval(( RG8DEField.innerHTML * 1 ) / ( RGZField.innerHTML * 1 ));

  //RG9% = <span id="pmmrg9per">&nbsp;</span> ( RG9DE / RGZ )<br><br>
  var RG9perField = document.getElementById('pmmrg9per');
  RG9perField.innerHTML = eval(( RG9DEField.innerHTML * 1 ) / ( RGZField.innerHTML * 1 ));

  //RG10% = <span id="pmmrg10per">&nbsp;</span> ( RG10DE / RGZ )<br><br>
  var RG10perField = document.getElementById('pmmrg10per');
  RG10perField.innerHTML = eval(( RG10DEField.innerHTML * 1 ) / ( RGZField.innerHTML * 1 ));

  //  Total Insurable (Comm + Part Earnings) for RG1 = TERG1 = <span id="pmmterg1">&nbsp;</span> ( RG1% x Total Other Earnings )<br>
  var TERG1Field = document.getElementById('pmmterg1');
  TERG1Field.innerHTML = formatDecimal( eval(( RG1perField.innerHTML * 1 ) * ( toeField.innerHTML * 1 )), true, 2);

  //  Total Insurable (Comm + Part Earnings) for RG2 = TERG2 = <span id="pmmterg2">&nbsp;</span> ( RG2% x Total Other Earnings )<br><br>
  var TERG2Field = document.getElementById('pmmterg2');
  TERG2Field.innerHTML = formatDecimal( eval(( RG2perField.innerHTML * 1 ) * ( toeField.innerHTML * 1 )), true, 2);

  //  Total Insurable (Comm + Part Earnings) for RG3 = TERG3 = <span id="pmmterg3">&nbsp;</span> ( RG3% x Total Other Earnings )<br><br>
  var TERG3Field = document.getElementById('pmmterg3');
  TERG3Field.innerHTML = formatDecimal( eval(( RG3perField.innerHTML * 1 ) * ( toeField.innerHTML * 1 )), true, 2);

  //  Total Insurable (Comm + Part Earnings) for RG4 = TERG4 = <span id="pmmterg4">&nbsp;</span> ( RG4% x Total Other Earnings )<br><br>
  var TERG4Field = document.getElementById('pmmterg4');
  TERG4Field.innerHTML = formatDecimal( eval(( RG4perField.innerHTML * 1 ) * ( toeField.innerHTML * 1 )), true, 2);

  //  Total Insurable (Comm + Part Earnings) for RG5 = TERG5 = <span id="pmmterg5">&nbsp;</span> ( RG5% x Total Other Earnings )<br><br>
  var TERG5Field = document.getElementById('pmmterg5');
  TERG5Field.innerHTML = formatDecimal( eval(( RG5perField.innerHTML * 1 ) * ( toeField.innerHTML * 1 )), true, 2);

  //  Total Insurable (Comm + Part Earnings) for RG6 = TERG6 = <span id="pmmterg6">&nbsp;</span> ( RG6% x Total Other Earnings )<br><br>
  var TERG6Field = document.getElementById('pmmterg6');
  TERG6Field.innerHTML = formatDecimal( eval(( RG6perField.innerHTML * 1 ) * ( toeField.innerHTML * 1 )), true, 2);

  //  Total Insurable (Comm + Part Earnings) for RG7 = TERG7 = <span id="pmmterg7">&nbsp;</span> ( RG7% x Total Other Earnings )<br><br>
  var TERG7Field = document.getElementById('pmmterg7');
  TERG7Field.innerHTML = formatDecimal( eval(( RG7perField.innerHTML * 1 ) * ( toeField.innerHTML * 1 )), true, 2);

  //  Total Insurable (Comm + Part Earnings) for RG8 = TERG8 = <span id="pmmterg8">&nbsp;</span> ( RG8% x Total Other Earnings )<br><br>
  var TERG8Field = document.getElementById('pmmterg8');
  TERG8Field.innerHTML = formatDecimal( eval(( RG8perField.innerHTML * 1 ) * ( toeField.innerHTML * 1 )), true, 2);

  //  Total Insurable (Comm + Part Earnings) for RG9 = TERG9 = <span id="pmmterg9">&nbsp;</span> ( RG9% x Total Other Earnings )<br><br>
  var TERG9Field = document.getElementById('pmmterg9');
  TERG9Field.innerHTML = formatDecimal( eval(( RG9perField.innerHTML * 1 ) * ( toeField.innerHTML * 1 )), true, 2);

  //  Total Insurable (Comm + Part Earnings) for RG10 = TERG10 = <span id="pmmterg10">&nbsp;</span> ( RG10% x Total Other Earnings )<br><br>
  var TERG10Field = document.getElementById('pmmterg10');
  TERG10Field.innerHTML = formatDecimal( eval(( RG10perField.innerHTML * 1 ) * ( toeField.innerHTML * 1 )), true, 2);

  //Total Earnings for RG1
  var pmmtotsumearnrg1Field = document.getElementById('pmmtotsumearnrg1');
  pmmtotsumearnrg1Field.innerHTML = formatDecimal( eval(( RG1DEField.innerHTML * 1 ) + ( TERG1Field.innerHTML * 1 )), true, 2);

  var pmmtotsumearnrg1Field2 = document.getElementById('pmulti-totalInsEarnRate1');
  pmmtotsumearnrg1Field2.innerHTML = formatDecimal( eval(( RG1DEField.innerHTML * 1 ) + ( TERG1Field.innerHTML * 1 )), true, 2);

  //Total Earnings for RG2
  var pmmtotsumearnrg2Field = document.getElementById('pmmtotsumearnrg2');
  pmmtotsumearnrg2Field.innerHTML = formatDecimal( eval(( RG2DEField.innerHTML * 1 ) + ( TERG2Field.innerHTML * 1 )), true, 2);

  var pmmtotsumearnrg2Field2 = document.getElementById('pmulti-totalInsEarnRate2');
  pmmtotsumearnrg2Field2.innerHTML = formatDecimal( eval(( RG2DEField.innerHTML * 1 ) + ( TERG2Field.innerHTML * 1 )), true, 2);

  //Total Earnings for RG3
  var pmmtotsumearnrg3Field = document.getElementById('pmmtotsumearnrg3');
  pmmtotsumearnrg3Field.innerHTML = formatDecimal( eval(( RG3DEField.innerHTML * 1 ) + ( TERG3Field.innerHTML * 1 )), true, 2);

  var pmmtotsumearnrg3Field2 = document.getElementById('pmulti-totalInsEarnRate3');
  pmmtotsumearnrg3Field2.innerHTML = formatDecimal( eval(( RG3DEField.innerHTML * 1 ) + ( TERG3Field.innerHTML * 1 )), true, 2);

  //Total Earnings for RG4
  var pmmtotsumearnrg4Field = document.getElementById('pmmtotsumearnrg4');
  pmmtotsumearnrg4Field.innerHTML = formatDecimal( eval(( RG4DEField.innerHTML * 1 ) + ( TERG4Field.innerHTML * 1 )), true, 2);

  var pmmtotsumearnrg4Field2 = document.getElementById('pmulti-totalInsEarnRate4');
  pmmtotsumearnrg4Field2.innerHTML = formatDecimal( eval(( RG4DEField.innerHTML * 1 ) + ( TERG4Field.innerHTML * 1 )), true, 2);

  //Total Earnings for RG5
  var pmmtotsumearnrg5Field = document.getElementById('pmmtotsumearnrg5');
  pmmtotsumearnrg5Field.innerHTML = formatDecimal( eval(( RG5DEField.innerHTML * 1 ) + ( TERG5Field.innerHTML * 1 )), true, 2);

  var pmmtotsumearnrg5Field2 = document.getElementById('pmulti-totalInsEarnRate5');
  pmmtotsumearnrg5Field2.innerHTML = formatDecimal( eval(( RG5DEField.innerHTML * 1 ) + ( TERG5Field.innerHTML * 1 )), true, 2);

  //Total Earnings for RG6
  var pmmtotsumearnrg6Field = document.getElementById('pmmtotsumearnrg6');
  pmmtotsumearnrg6Field.innerHTML = formatDecimal( eval(( RG6DEField.innerHTML * 1 ) + ( TERG6Field.innerHTML * 1 )), true, 2);

  var pmmtotsumearnrg6Field2 = document.getElementById('pmulti-totalInsEarnRate6');
  pmmtotsumearnrg6Field2.innerHTML = formatDecimal( eval(( RG6DEField.innerHTML * 1 ) + ( TERG6Field.innerHTML * 1 )), true, 2);

  //Total Earnings for RG7
  var pmmtotsumearnrg7Field = document.getElementById('pmmtotsumearnrg7');
  pmmtotsumearnrg7Field.innerHTML = formatDecimal( eval(( RG7DEField.innerHTML * 1 ) + ( TERG7Field.innerHTML * 1 )), true, 2);

  var pmmtotsumearnrg7Field2 = document.getElementById('pmulti-totalInsEarnRate7');
  pmmtotsumearnrg7Field2.innerHTML = formatDecimal( eval(( RG7DEField.innerHTML * 1 ) + ( TERG7Field.innerHTML * 1 )), true, 2);

  //Total Earnings for RG8
  var pmmtotsumearnrg8Field = document.getElementById('pmmtotsumearnrg8');
  pmmtotsumearnrg8Field.innerHTML = formatDecimal( eval(( RG8DEField.innerHTML * 1 ) + ( TERG8Field.innerHTML * 1 )), true, 2);

  var pmmtotsumearnrg8Field2 = document.getElementById('pmulti-totalInsEarnRate8');
  pmmtotsumearnrg8Field2.innerHTML = formatDecimal( eval(( RG8DEField.innerHTML * 1 ) + ( TERG8Field.innerHTML * 1 )), true, 2);

  //Total Earnings for RG9
  var pmmtotsumearnrg9Field = document.getElementById('pmmtotsumearnrg9');
  pmmtotsumearnrg9Field.innerHTML = formatDecimal( eval(( RG9DEField.innerHTML * 1 ) + ( TERG9Field.innerHTML * 1 )), true, 2);

  var pmmtotsumearnrg9Field2 = document.getElementById('pmulti-totalInsEarnRate9');
  pmmtotsumearnrg9Field2.innerHTML = formatDecimal( eval(( RG9DEField.innerHTML * 1 ) + ( TERG9Field.innerHTML * 1 )), true, 2);

  //Total Earnings for RG10
  var pmmtotsumearnrg10Field = document.getElementById('pmmtotsumearnrg10');
  pmmtotsumearnrg10Field.innerHTML = formatDecimal( eval(( RG10DEField.innerHTML * 1 ) + ( TERG10Field.innerHTML * 1 )), true, 2);

  var pmmtotsumearnrg10Field2 = document.getElementById('pmulti-totalInsEarnRate10');
  pmmtotsumearnrg10Field2.innerHTML = formatDecimal( eval(( RG10DEField.innerHTML * 1 ) + ( TERG10Field.innerHTML * 1 )), true, 2);


//total premiums
  //  Total premium for RG1 = TOTPRRG1 = <span id="pmmtotprrg1">&nbsp;</span> ( TERG1 x RG1 )<br>
  var TOTPRRG1Field = document.getElementById('pmmtotprrg1');
  TOTPRRG1Field.innerHTML = formatDecimal( eval((( pmmtotsumearnrg1Field.innerHTML * 1 ) * rateGroup1 ) / 100 ), true, 2);

  var TOTPRRG1Field2 = document.getElementById('pmulti-totalCurrentPremiumRate1');
  TOTPRRG1Field2.innerHTML = formatDecimal( eval((( pmmtotsumearnrg1Field.innerHTML * 1 ) * rateGroup1 ) / 100 ), true, 2);

  //  Total premium for RG2 = TOTPRRG2 = <span id="pmmtotprrg2">&nbsp;</span> ( TERG2 x RG2 )<br><br>
  var TOTPRRG2Field = document.getElementById('pmmtotprrg2');
  TOTPRRG2Field.innerHTML = formatDecimal( eval((( pmmtotsumearnrg2Field.innerHTML * 1 ) * rateGroup2 ) / 100 ), true, 2);

  var TOTPRRG2Field2 = document.getElementById('pmulti-totalCurrentPremiumRate2');
  TOTPRRG2Field2.innerHTML = formatDecimal( eval((( pmmtotsumearnrg2Field.innerHTML * 1 ) * rateGroup2 ) / 100 ), true, 2);

  //  Total premium for RG3 = TOTPRRG3 = <span id="pmmtotprrg3">&nbsp;</span> ( TERG3 x RG3 )<br><br>
  var TOTPRRG3Field = document.getElementById('pmmtotprrg3');
  TOTPRRG3Field.innerHTML = formatDecimal( eval((( pmmtotsumearnrg3Field.innerHTML * 1 ) * rateGroup3 ) / 100 ), true, 2);

  var TOTPRRG3Field3 = document.getElementById('pmulti-totalCurrentPremiumRate3');
  TOTPRRG3Field3.innerHTML = formatDecimal( eval((( pmmtotsumearnrg3Field.innerHTML * 1 ) * rateGroup3 ) / 100 ), true, 2);

  //  Total premium for RG4 = TOTPRRG4 = <span id="pmmtotprrg4">&nbsp;</span> ( TERG4 x RG4 )<br><br>
  var TOTPRRG4Field = document.getElementById('pmmtotprrg4');
  TOTPRRG4Field.innerHTML = formatDecimal( eval((( pmmtotsumearnrg4Field.innerHTML * 1 ) * rateGroup4 ) / 100 ), true, 2);

  var TOTPRRG4Field4 = document.getElementById('pmulti-totalCurrentPremiumRate4');
  TOTPRRG4Field4.innerHTML = formatDecimal( eval((( pmmtotsumearnrg4Field.innerHTML * 1 ) * rateGroup4 ) / 100 ), true, 2);

  //  Total premium for RG5 = TOTPRRG5 = <span id="pmmtotprrg5">&nbsp;</span> ( TERG5 x RG5 )<br><br>
  var TOTPRRG5Field = document.getElementById('pmmtotprrg5');
  TOTPRRG5Field.innerHTML = formatDecimal( eval((( pmmtotsumearnrg5Field.innerHTML * 1 ) * rateGroup5 ) / 100 ), true, 2);

  var TOTPRRG5Field5 = document.getElementById('pmulti-totalCurrentPremiumRate5');
  TOTPRRG5Field5.innerHTML = formatDecimal( eval((( pmmtotsumearnrg5Field.innerHTML * 1 ) * rateGroup5 ) / 100 ), true, 2);

  //  Total premium for RG6 = TOTPRRG6 = <span id="pmmtotprrg6">&nbsp;</span> ( TERG6 x RG6 )<br><br>
  var TOTPRRG6Field = document.getElementById('pmmtotprrg6');
  TOTPRRG6Field.innerHTML = formatDecimal( eval((( pmmtotsumearnrg6Field.innerHTML * 1 ) * rateGroup6 ) / 100 ), true, 2);

  var TOTPRRG6Field6 = document.getElementById('pmulti-totalCurrentPremiumRate6');
  TOTPRRG6Field6.innerHTML = formatDecimal( eval((( pmmtotsumearnrg6Field.innerHTML * 1 ) * rateGroup6 ) / 100 ), true, 2);

  //  Total premium for RG7 = TOTPRRG7 = <span id="pmmtotprrg7">&nbsp;</span> ( TERG7 x RG7 )<br><br>
  var TOTPRRG7Field = document.getElementById('pmmtotprrg7');
  TOTPRRG7Field.innerHTML = formatDecimal( eval((( pmmtotsumearnrg7Field.innerHTML * 1 ) * rateGroup7 ) / 100 ), true, 2);

  var TOTPRRG7Field7 = document.getElementById('pmulti-totalCurrentPremiumRate7');
  TOTPRRG7Field7.innerHTML = formatDecimal( eval((( pmmtotsumearnrg7Field.innerHTML * 1 ) * rateGroup7 ) / 100 ), true, 2);

  //  Total premium for RG8 = TOTPRRG8 = <span id="pmmtotprrg8">&nbsp;</span> ( TERG8 x RG8 )<br><br>
  var TOTPRRG8Field = document.getElementById('pmmtotprrg8');
  TOTPRRG8Field.innerHTML = formatDecimal( eval((( pmmtotsumearnrg8Field.innerHTML * 1 ) * rateGroup8 ) / 100 ), true, 2);

  var TOTPRRG8Field8 = document.getElementById('pmulti-totalCurrentPremiumRate8');
  TOTPRRG8Field8.innerHTML = formatDecimal( eval((( pmmtotsumearnrg8Field.innerHTML * 1 ) * rateGroup8 ) / 100 ), true, 2);

  //  Total premium for RG9 = TOTPRRG9 = <span id="pmmtotprrg9">&nbsp;</span> ( TERG9 x RG9 )<br><br>
  var TOTPRRG9Field = document.getElementById('pmmtotprrg9');
  TOTPRRG9Field.innerHTML = formatDecimal( eval((( pmmtotsumearnrg9Field.innerHTML * 1 ) * rateGroup9 ) / 100 ), true, 2);

  var TOTPRRG9Field9 = document.getElementById('pmulti-totalCurrentPremiumRate9');
  TOTPRRG9Field9.innerHTML = formatDecimal( eval((( pmmtotsumearnrg9Field.innerHTML * 1 ) * rateGroup9 ) / 100 ), true, 2);

  //  Total premium for RG10 = TOTPRRG10 = <span id="pmmtotprrg10">&nbsp;</span> ( TERG10 x RG10 )<br><br>
  var TOTPRRG10Field = document.getElementById('pmmtotprrg10');
  TOTPRRG10Field.innerHTML = formatDecimal( eval((( pmmtotsumearnrg10Field.innerHTML * 1 ) * rateGroup10 ) / 100 ), true, 2);

  var TOTPRRG10Field10 = document.getElementById('pmulti-totalCurrentPremiumRate10');
  TOTPRRG10Field10.innerHTML = formatDecimal( eval((( pmmtotsumearnrg10Field.innerHTML * 1 ) * rateGroup10 ) / 100 ), true, 2);


  //  Total Insurable Earnings = <span id="pmmtotinsearn">&nbsp;</span> ( TERG1 + TERG2 + Special Earn )<br>
  var pmmtotinsearnField = document.getElementById('pmmtotinsearn');
  pmmtotinsearnField.innerHTML = formatDecimal( eval(( pmmtotsumearnrg1Field.innerHTML * 1 ) + ( pmmtotsumearnrg2Field.innerHTML * 1 ) + ( pmmtotsumearnrg3Field.innerHTML * 1 ) + ( pmmtotsumearnrg4Field.innerHTML * 1 ) + ( pmmtotsumearnrg5Field.innerHTML * 1 ) + ( pmmtotsumearnrg6Field.innerHTML * 1 ) + ( pmmtotsumearnrg7Field.innerHTML * 1 ) + ( pmmtotsumearnrg8Field.innerHTML * 1 ) + ( pmmtotsumearnrg9Field.innerHTML * 1 ) + ( pmmtotsumearnrg10Field.innerHTML * 1 ) + ( pmmpartnertotalspecialField.innerHTML * 1 )), true, 2);

  var pmmtotinsearnField2 = document.getElementById('pmmtotinsearn2');
  pmmtotinsearnField2.innerHTML = formatDecimal( eval(( pmmtotsumearnrg1Field.innerHTML * 1 ) + ( pmmtotsumearnrg2Field.innerHTML * 1 ) + ( pmmtotsumearnrg3Field.innerHTML * 1 ) + ( pmmtotsumearnrg4Field.innerHTML * 1 ) + ( pmmtotsumearnrg5Field.innerHTML * 1 ) + ( pmmtotsumearnrg6Field.innerHTML * 1 ) + ( pmmtotsumearnrg7Field.innerHTML * 1 ) + ( pmmtotsumearnrg8Field.innerHTML * 1 ) + ( pmmtotsumearnrg9Field.innerHTML * 1 ) + ( pmmtotsumearnrg10Field.innerHTML * 1 ) + ( pmmpartnertotalspecialField.innerHTML * 1 )), true, 2);

  var pmmtotinsearnField3 = document.getElementById('pmmtotinsearn3');
  pmmtotinsearnField3.innerHTML = formatDecimal( eval(( pmmtotsumearnrg1Field.innerHTML * 1 ) + ( pmmtotsumearnrg2Field.innerHTML * 1 ) + ( pmmtotsumearnrg3Field.innerHTML * 1 ) + ( pmmtotsumearnrg4Field.innerHTML * 1 ) + ( pmmtotsumearnrg5Field.innerHTML * 1 ) + ( pmmtotsumearnrg6Field.innerHTML * 1 ) + ( pmmtotsumearnrg7Field.innerHTML * 1 ) + ( pmmtotsumearnrg8Field.innerHTML * 1 ) + ( pmmtotsumearnrg9Field.innerHTML * 1 ) + ( pmmtotsumearnrg10Field.innerHTML * 1 ) + ( pmmpartnertotalspecialField.innerHTML * 1 )), true, 2);

  //  Total premium = <span id="pmmtotpremium">&nbsp;</span> ( TOTPRRG1 + TOTPRRG2 + Special Premium )<br><br>
  var pmmtotpremiumField = document.getElementById('pmmtotpremium');
  pmmtotpremiumField.innerHTML = formatDecimal( eval(( TOTPRRG1Field.innerHTML * 1 ) + ( TOTPRRG2Field.innerHTML * 1 ) + ( TOTPRRG3Field.innerHTML * 1 ) + ( TOTPRRG4Field.innerHTML * 1 ) + ( TOTPRRG5Field.innerHTML * 1 ) + ( TOTPRRG6Field.innerHTML * 1 ) + ( TOTPRRG7Field.innerHTML * 1 ) + ( TOTPRRG8Field.innerHTML * 1 ) + ( TOTPRRG9Field.innerHTML * 1 ) + ( TOTPRRG10Field.innerHTML * 1 ) + ( finalSpecialFINAL.innerHTML * 1 )), true, 2);

  var pmmtotpremiumField2 = document.getElementById('pmmtotpremium2');
  pmmtotpremiumField2.innerHTML = formatDecimal( eval(( TOTPRRG1Field.innerHTML * 1 ) + ( TOTPRRG2Field.innerHTML * 1 ) + ( TOTPRRG3Field.innerHTML * 1 ) + ( TOTPRRG4Field.innerHTML * 1 ) + ( TOTPRRG5Field.innerHTML * 1 ) + ( TOTPRRG6Field.innerHTML * 1 ) + ( TOTPRRG7Field.innerHTML * 1 ) + ( TOTPRRG8Field.innerHTML * 1 ) + ( TOTPRRG9Field.innerHTML * 1 ) + ( TOTPRRG10Field.innerHTML * 1 ) + ( finalSpecialFINAL.innerHTML * 1 )), true, 2);

  var pmmtotpremiumField3 = document.getElementById('pmmtotpremium3');
  pmmtotpremiumField3.innerHTML = formatDecimal( eval(( TOTPRRG1Field.innerHTML * 1 ) + ( TOTPRRG2Field.innerHTML * 1 ) + ( TOTPRRG3Field.innerHTML * 1 ) + ( TOTPRRG4Field.innerHTML * 1 ) + ( TOTPRRG5Field.innerHTML * 1 ) + ( TOTPRRG6Field.innerHTML * 1 ) + ( TOTPRRG7Field.innerHTML * 1 ) + ( TOTPRRG8Field.innerHTML * 1 ) + ( TOTPRRG9Field.innerHTML * 1 ) + ( TOTPRRG10Field.innerHTML * 1 ) + ( finalSpecialFINAL.innerHTML * 1 )), true, 2);

// end testing

  if ($("#pmulti-questions2 span.error:visible").length) {
    return false;
  }

  document.getElementById('pmulti-questions2').style.display='none';
  document.getElementById('pmulti-summary').style.display='block';
  <!-- calculation end -->
}

//Partner Multi common worker check
function identifyCommonPM() {
  var pco = document.getElementById("pmulti-common-option");
  var indentifyComm = pco.options[pco.selectedIndex].value;

  var rows = $('table#pmulti-step2 tr');
  var black = rows.filter('.pmulti-display-common');

  if ( indentifyComm == 0 ) {
    black.hide();
  } else if ( indentifyComm == 1 ) {
    black.show();
  } else if ( indentifyComm == 2 ) {
    black.hide();
  }
}


// format form fields for numbers and decimals source
(function($){
  $.fn.alphanumeric = function(p) {
    p = $.extend({
      ichars: "!@#$%^&*()+=[]\\\';,/{}|\":<>?~`.- ",
      nchars: "",
      allow: ""
      }, p);
    return this.each
      (
        function()
        {

          if (p.nocaps) p.nchars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          if (p.allcaps) p.nchars += "abcdefghijklmnopqrstuvwxyz";

          s = p.allow.split('');
          for ( i=0;i<s.length;i++) if (p.ichars.indexOf(s[i]) != -1) s[i] = "\\" + s[i];
          p.allow = s.join('|');

          var reg = new RegExp(p.allow,'gi');
          var ch = p.ichars + p.nchars;
          ch = ch.replace(reg,'');
          $(this).keypress
            (
              function (e)
                {
                  if (!e.charCode) k = String.fromCharCode(e.which);
                    else k = String.fromCharCode(e.charCode);
                  if (ch.indexOf(k) != -1) e.preventDefault();
                  //if (e.ctrlKey&&k=='v') e.preventDefault();
                }
            );
          $(this).bind('contextmenu',function () {return false});
        }
      );
  };
  $.fn.numeric = function(p) {
    var az = "abcdefghijklmnopqrstuvwxyz";
    az += az.toUpperCase();
    p = $.extend({
      nchars: az
      }, p);
    return this.each (function()
      {
        $(this).alphanumeric(p);
      }
    );
  };
  $.fn.alpha = function(p) {
    var nm = "1234567890";
    p = $.extend({
      nchars: nm
      }, p);
    return this.each (function()
      {
        $(this).alphanumeric(p);
      }
    );
  };
})(jQuery);

function loadRates() {
  var subcat =  document.getElementsByName('full-rates');

  for ( var i = 0 ;  i <= 17 ; i ++ ) {

  subcat[i].options.length = 155 ;
  subcat[i].options[0]=new Option("Please select", "0");
  subcat[i].options[1]=new Option("030 : Logging", "13.35");
  subcat[i].options[2]=new Option("033 : Mill Products And Forestry Services", "7.95");
  subcat[i].options[3]=new Option("036 : Veneers, Plywood And Wood Preservation", "4.58");
  subcat[i].options[4]=new Option("039 : Pulp, Newsprint And Specialty Papers", "3.02");
  subcat[i].options[5]=new Option("041 : Corrugated Boxes", "3.00");
  subcat[i].options[6]=new Option("110 : Gold Mines", "6.48");
  subcat[i].options[7]=new Option("113 : Nickel Mines", "5.31");
  subcat[i].options[8]=new Option("119 : Other Mines", "6.10");
  subcat[i].options[9]=new Option("134 : Aggregates", "5.65");
  subcat[i].options[10]=new Option("159 : Livestock Farms", "6.89");
  subcat[i].options[11]=new Option("167 : Field Crop, Fruit And Vegetable Farms", "2.87");
  subcat[i].options[12]=new Option("174 : Tobacco And Mushroom Farms", "4.38");
  subcat[i].options[13]=new Option("181 : Fishing And Miscellaneous Farming", "3.72");
  subcat[i].options[14]=new Option("184 : Poultry Farms And Agricultural Services", "3.33");
  subcat[i].options[15]=new Option("190 : Landscaping And Related Services", "5.00");
  subcat[i].options[16]=new Option("207 : Meat And Fish Products", "4.49");
  subcat[i].options[17]=new Option("210 : Poultry Products", "3.38");
  subcat[i].options[18]=new Option("214 : Fruit And Vegetable Products", "2.26");
  subcat[i].options[19]=new Option("216 : Dairy Products", "2.14");
  subcat[i].options[20]=new Option("220 : Other Bakery Products", "3.28");
  subcat[i].options[21]=new Option("222 : Confectionery", "1.88");
  subcat[i].options[22]=new Option("223 : Biscuits, Snack Foods And Other Food Products", "2.66");
  subcat[i].options[23]=new Option("226 : Crushed And Ground Foods", "1.77");
  subcat[i].options[24]=new Option("230 : Alcoholic Beverages", "1.62");
  subcat[i].options[25]=new Option("231 : Soft Drinks", "2.85");
  subcat[i].options[26]=new Option("238 : Other Rubber Products", "4.17");
  subcat[i].options[27]=new Option("258 : Foamed And Expanded Plastic Products", "2.94");
  subcat[i].options[28]=new Option("261 : Plastic Film And Sheeting", "2.46");
  subcat[i].options[29]=new Option("263 : Other Plastic Products", "3.25");
  subcat[i].options[30]=new Option("289 : Cloth, Carpets And Textile Products", "3.43");
  subcat[i].options[31]=new Option("301 : Clothing, Fibre And Yarn", "2.23");
  subcat[i].options[32]=new Option("308 : Millwork And Other Wood Industries", "5.64");
  subcat[i].options[33]=new Option("311 : Wooden Cabinets", "4.19");
  subcat[i].options[34]=new Option("312 : Wooden Boxes And Pallets", "7.26");
  subcat[i].options[35]=new Option("322 : Upholstered Furniture", "3.37");
  subcat[i].options[36]=new Option("323 : Metal Furniture", "1.98");
  subcat[i].options[37]=new Option("325 : Wooden And Other Non-Metal Furniture", "3.86");
  subcat[i].options[38]=new Option("328 : Furniture Parts And Fixtures", "3.99");
  subcat[i].options[39]=new Option("333 : Printing, Platemaking And Binding", "1.65");
  subcat[i].options[40]=new Option("335 : Publishing", "0.51");
  subcat[i].options[41]=new Option("338 : Folding Cartons", "2.38");
  subcat[i].options[42]=new Option("341 : Paper Products", "3.10");
  subcat[i].options[43]=new Option("352 : Steel And Other Smelting And Refining Industries", "2.68");
  subcat[i].options[44]=new Option("358 : Foundries", "4.37");
  subcat[i].options[45]=new Option("361 : Non-Ferrous Metal Industries", "3.06");
  subcat[i].options[46]=new Option("374 : Doors And Windows", "3.59");
  subcat[i].options[47]=new Option("375 : Structural And Architectural Products", "4.78");
  subcat[i].options[48]=new Option("377 : Coating Of Metal Products", "4.22");
  subcat[i].options[49]=new Option("379 : Hardware, Tools And Cutlery", "2.34");
  subcat[i].options[50]=new Option("382 : Metal Dies, Moulds And Patterns", "2.31");
  subcat[i].options[51]=new Option("383 : Heating, Refrigeration And Air Conditioning Equipment", "2.41");
  subcat[i].options[52]=new Option("385 : Machine Shops", "2.64");
  subcat[i].options[53]=new Option("387 : Other Metal Fabricating Industries", "3.70");
  subcat[i].options[54]=new Option("389 : Metal Closures And Containers", "2.62");
  subcat[i].options[55]=new Option("390 : Other Stamped And Pressed Metal Products", "3.06");
  subcat[i].options[56]=new Option("393 : Wire Products", "2.99");
  subcat[i].options[57]=new Option("402 : Major Appliances And Transmission Equipment", "2.38");
  subcat[i].options[58]=new Option("403 : Other Machinery And Equipment", "1.82");
  subcat[i].options[59]=new Option("406 : Elevators And Escalators", "2.74");
  subcat[i].options[60]=new Option("408 : Boilers, Pumps And Fans", "2.56");
  subcat[i].options[61]=new Option("411 : Agricultural, Construction And Mining Machinery", "2.91");
  subcat[i].options[62]=new Option("417 : Aircraft Manufacturing", "1.38");
  subcat[i].options[63]=new Option("419 : Motor Vehicle Assembly", "3.06");
  subcat[i].options[64]=new Option("420 : Motor Vehicle Engine Manufacturing", "1.98");
  subcat[i].options[65]=new Option("421 : Other Motor Vehicle Parts And Equipment", "3.06");
  subcat[i].options[66]=new Option("424 : Motor Vehicle Stampings", "3.06");
  subcat[i].options[67]=new Option("425 : Motor Vehicle Wheels And Brakes", "3.06");
  subcat[i].options[68]=new Option("428 : Motor Vehicle Fabric Accessories", "3.70");
  subcat[i].options[69]=new Option("432 : Trucks, Buses And Trailers", "4.44");
  subcat[i].options[70]=new Option("442 : Railroad Rolling Stock", "2.22");
  subcat[i].options[71]=new Option("460 : Lighting And Small Electrical Appliances", "2.67");
  subcat[i].options[72]=new Option("466 : Communication And Energy Wire Products", "2.54");
  subcat[i].options[73]=new Option("468 : Electronic Equipment & Other Communication Devices", "0.34");
  subcat[i].options[74]=new Option("477 : Industrial Electrical Equipment", "1.47");
  subcat[i].options[75]=new Option("485 : Bricks, Ceramics And Abrasives", "4.58");
  subcat[i].options[76]=new Option("496 : Concrete Products", "4.64");
  subcat[i].options[77]=new Option("497 : Ready-Mix Concrete", "3.97");
  subcat[i].options[78]=new Option("501 : Non-Metallic Mineral Products", "3.02");
  subcat[i].options[79]=new Option("502 : Glass Products", "3.07");
  subcat[i].options[80]=new Option("507 : Petroleum And Coal Products", "1.22");
  subcat[i].options[81]=new Option("512 : Resins, Paint, Ink And Adhesives", "1.83");
  subcat[i].options[82]=new Option("514 : Pharmaceuticals And Medicines", "0.89");
  subcat[i].options[83]=new Option("517 : Soap And Toiletries", "1.34");
  subcat[i].options[84]=new Option("524 : Chemical Industries", "2.05");
  subcat[i].options[85]=new Option("529 : Jewelry And Instruments", "1.04");
  subcat[i].options[86]=new Option("533 : Signs And Displays", "2.55");
  subcat[i].options[87]=new Option("538 : Sporting Goods And Toys", "4.07");
  subcat[i].options[88]=new Option("542 : Other Manufactured Products", "2.18");
  subcat[i].options[89]=new Option("551 : Air Transport Industries", "2.16");
  subcat[i].options[90]=new Option("553 : Air Transport Services", "2.00");
  subcat[i].options[91]=new Option("560 : Warehousing", "2.73");
  subcat[i].options[92]=new Option("570 : General Trucking", "6.97");
  subcat[i].options[93]=new Option("577 : Courier Services", "3.14");
  subcat[i].options[94]=new Option("580 : Miscellaneous Transport Industries", "5.24");
  subcat[i].options[95]=new Option("584 : School Buses", "2.81");
  subcat[i].options[96]=new Option("590 : Ambulance Services", "7.09");
  subcat[i].options[97]=new Option("604 : Food, Sales", "2.27");
  subcat[i].options[98]=new Option("606 : Grocery And Convenience Stores", "2.04");
  subcat[i].options[99]=new Option("607 : Specialty Food Stores", "2.97");
  subcat[i].options[100]=new Option("608 : Beer Stores", "3.32");
  subcat[i].options[101]=new Option("612 : Agricultural Products, Sales", "2.40");
  subcat[i].options[102]=new Option("630 : Vehicle Services And Repairs", "3.71");
  subcat[i].options[103]=new Option("633 : Petroleum Products, Sales", "2.56");
  subcat[i].options[104]=new Option("636 : Other Sales", "1.23");
  subcat[i].options[105]=new Option("638 : Pharmacies", "0.61");
  subcat[i].options[106]=new Option("641 : Clothing Stores", "1.27");
  subcat[i].options[107]=new Option("657 : Automobile And Truck Dealers", "0.85");
  subcat[i].options[108]=new Option("668 : Computer, Electronic And Electrical Equipment, Sales", "0.43");
  subcat[i].options[109]=new Option("670 : Machinery And Other Vehicles, Sales", "1.92");
  subcat[i].options[110]=new Option("681 : Lumber And Builders Supply", "2.77");
  subcat[i].options[111]=new Option("685 : Metal Products, Wholesale", "3.41");
  subcat[i].options[112]=new Option("689 : Waste Materials Recycling", "5.93");
  subcat[i].options[113]=new Option("704 : Electrical And Incidental Construction Services", "3.15");
  subcat[i].options[114]=new Option("707 : Mechanical And Sheet Metal Work", "3.75");
  subcat[i].options[115]=new Option("711 : Roadbuilding And Excavating", "4.50");
  subcat[i].options[116]=new Option("719 : Inside Finishing", "6.15");
  subcat[i].options[117]=new Option("723 : Industrial, Commercial & Institutional Construction", "4.07");
  subcat[i].options[118]=new Option("728 : Roofing", "12.59");
  subcat[i].options[119]=new Option("732 : Heavy Civil Construction", "5.98");
  subcat[i].options[120]=new Option("737 : Millwrighting And Welding", "5.88");
  subcat[i].options[121]=new Option("741 : Masonry", "11.29");
  subcat[i].options[122]=new Option("748 : Form Work And Demolition", "14.56");
  subcat[i].options[123]=new Option("751 : Siding And Outside Finishing", "8.15");
  subcat[i].options[124]=new Option("764 : Homebuilding", "7.24");
  subcat[i].options[125]=new Option("810 : School Boards", "0.85");
  subcat[i].options[126]=new Option("817 : Educational Facilities", "0.37");
  subcat[i].options[127]=new Option("830 : Power And Telecommunication Lines", "4.02");
  subcat[i].options[128]=new Option("833 : Electric Power Generation", "0.74");
  subcat[i].options[129]=new Option("835 : Oil, Power And Water Distribution", "1.12");
  subcat[i].options[130]=new Option("838 : Natural Gas Distribution", "0.61");
  subcat[i].options[131]=new Option("845 : Local Government Services", "3.20");
  subcat[i].options[132]=new Option("851 : Homes For Nursing Care", "3.23");
  subcat[i].options[133]=new Option("852 : Homes For Residential Care", "2.98");
  subcat[i].options[134]=new Option("853 : Hospitals", "1.02");
  subcat[i].options[135]=new Option("857 : Nursing Services", "3.20");
  subcat[i].options[136]=new Option("858 : Group Homes", "3.29");
  subcat[i].options[137]=new Option("861 : Treatment Clinics And Specialized Services", "1.02");
  subcat[i].options[138]=new Option("875 : Professional Offices And Agencies", "0.76");
  subcat[i].options[139]=new Option("905 : Apartment And Condominium Services", "2.83");
  subcat[i].options[140]=new Option("908 : Other Real Estate Services", "1.05");
  subcat[i].options[141]=new Option("911 : Security And Investigation Services", "1.65");
  subcat[i].options[142]=new Option("919 : Restaurants And Catering", "1.52");
  subcat[i].options[143]=new Option("921 : Hotels, Motels And Camping", "2.82");
  subcat[i].options[144]=new Option("923 : Janitorial Services", "2.97");
  subcat[i].options[145]=new Option("929 : Supply Of Non-Clerical Labour", "4.02");
  subcat[i].options[146]=new Option("933 : Equipment Rental And Repair Services", "2.63");
  subcat[i].options[147]=new Option("937 : Recreational Services And Facilities", "2.15");
  subcat[i].options[148]=new Option("944 : Personal Services", "2.60");
  subcat[i].options[149]=new Option("956 : Legal And Financial Services", "0.19");
  subcat[i].options[150]=new Option("958 : Technical And Business Services", "0.33");
  subcat[i].options[151]=new Option("962 : Advertising And Entertainment", "1.12");
  subcat[i].options[152]=new Option("975 : Linen And Laundry Services", "3.29");
  subcat[i].options[153]=new Option("981 : Membership Organizations", "0.75");
  subcat[i].options[154]=new Option("983 : Communications Industries", "0.31");

  }
}

$('#sole-multi-questions .select').change(function() {
  $('#sole-multi-questions .select').not(this).children('option[value=' + $(this).val() + ']').remove();
});

$('#pmulti-questions2 .select').change(function() {
  $('#pmulti-questions2 .select').not(this).children('option[value=' + $(this).val() + ']').remove();
});

$('#corp-multi-1eo-sr-step3 .select').change(function() {
  $('#sole-multi-questions .select').not(this).children('option[value=' + $(this).val() + ']').remove();
});

$('#corp-multi-yes-meo-step3 .select').change(function() {
  $('#corp-multi-yes-meo-step3 .select').not(this).children('option[value=' + $(this).val() + ']').remove();
});
})(jQuery);
