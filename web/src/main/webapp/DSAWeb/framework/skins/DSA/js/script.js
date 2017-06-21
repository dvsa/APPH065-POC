$(document).ready(function() {

  var $publishToFniCode =  $('#ManageInstructorwlw-select_key\\:\\{pageFlow\\.instDtlsToShow\\.webindicator\\}');

  // On load.
  if ($($publishToFniCode).val() != null && ($($publishToFniCode).val() == '2501' || $($publishToFniCode).val() == '2502')) {
	$('#standardsCheckPublishOption').show();
  } else {
  	$('#standardsCheckPublishOption').hide();	
  }
  
  // On change.
  $($publishToFniCode).on('change', function() {
    if ($(this).val() == '2501' || $(this).val() == '2502') {
    	$('#standardsCheckPublishOption').show();
    } else {
    	$('#standardsCheckPublishOption').hide();	
    }
  });
});
