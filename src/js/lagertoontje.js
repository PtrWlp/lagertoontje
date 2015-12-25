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
		$this.addClass('tl-open');
		$this[0].scrollIntoView();


		$this.next().slideDown( 500, function() {
    		// Animation complete, scroll into view
			var offset = $(this).offset();
			$('html, body').animate({
			    scrollTop: offset.top - 80, 
			    scrollLeft: 0
			});
  		});


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
		//ga('send', 'event', 'button', 'click', 'agree');

	} else {
		Cookies.set(cookiename, true);
		//ga('send', 'event', 'button', 'click', 'disagree');

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


$(document).ready(function() {
    $('.image-popup-vertical-fit').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      mainClass: 'mfp-img-mobile',
      image: {
        verticalFit: true
      }
      
    });
});
