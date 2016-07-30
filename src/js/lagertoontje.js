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
		ga('send', 'event', 'link', 'open ' + $this.attr('id'));

	} else {
		$this.removeClass('tl-open');
		$this.next().slideUp();
		location.hash = '';
	}

	return false;
});

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
