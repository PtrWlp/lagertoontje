var $allPanels = $('#tl-accordion > div').hide();
var $allSections = $('#tl-accordion > h2');
var $activeSection = $(location.hash);
if ($activeSection.length !== 0) {
	$activeSection.next().slideDown()
}

$('#tl-accordion > h2').click(function() {
	$allPanels.slideUp();
	$(this).next().slideDown();
	// More things to do


	return false;
});