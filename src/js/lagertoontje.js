var $allPanels = $('#tl-accordion > div').hide();
var $allSections = $('#tl-accordion > h2');
var $activeSection = $(location.hash);
if ($activeSection.length !== 0) {
	$activeSection.next().slideDown()
	$activeSection.addClass('tl-open');
}

$('#tl-accordion > h2').click(function() {
	var $this = $(this);

	if (!$this.hasClass('tl-open')) {
		$allPanels.slideUp();
		$allSections.removeClass('tl-open');
		location.hash = $this.attr('id');
		$this.next().slideDown();
		$this.addClass('tl-open');
	}

	return false;
});