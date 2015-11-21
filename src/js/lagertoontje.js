
$('#collapse1').on('shown.bs.collapse', function() {
    $("#collapse1Chevron").addClass('glyphicon-chevron-up').removeClass('glyphicon-chevron-down');
  });

$('#collapse1').on('hidden.bs.collapse', function() {
    $("#collapse1Chevron").addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up');
  });

$('#collapse2').on('shown.bs.collapse', function() {
    $("#collapse2Chevron").addClass('glyphicon-chevron-up').removeClass('glyphicon-chevron-down');
  });

$('#collapse2').on('hidden.bs.collapse', function() {
    $("#collapse2Chevron").addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up');
  });

