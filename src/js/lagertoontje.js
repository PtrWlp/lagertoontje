var $allPanels = $('#tl-accordion > div').hide();
var $allSections = $('#tl-accordion > h2');
var $activeSection = $(location.hash.replace('-section', ''));
if ($activeSection.length !== 0) {
	$activeSection.next().slideDown()
	$activeSection.addClass('tl-open');
}

$('#tl-accordion > h2').click(function() {
	var $this = $(this);

	if (!$this.hasClass('tl-open')) {
		$allPanels.slideUp();
		$allSections.removeClass('tl-open');
		location.hash = $this.attr('id') + '-section';
		$this.next().slideDown();
		$this.addClass('tl-open');
	} else {
		$this.removeClass('tl-open');
		$this.next().slideUp();
		location.hash = '';
	}

	return false;
});

// Handle voting buttons. set cookie if disagree
$('.tl-factor button').on("click", function () {
	var cookiename = 'tl-' + $(this).data('factor');
	if ($(this).data('agree')) {
		Cookies.remove(cookiename);	
	} else {
		Cookies.set(cookiename, true);
	}
	setFactorVote($('.tl-factor .tl-checkmark'));
	
});


// Set voting when you encounter one. set unchecked when disagree
function setFactorVote($el) {
	var factor = $el.attr('id');
	if (Cookies.get('tl-' + factor)) {
		$el.removeClass('checked');
	} else {
		$el.addClass('checked');
	}
}

// Set all factor checkmarks
$( document ).ready(function() {
 	$('.tl-checkmark').each(function( index ) {
		setFactorVote($(this));
	})
})
