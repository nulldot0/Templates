$(document).ready(function() {
	if ($(window).width() > 991) {
		$('nav').addClass('bg-dark')
		$('#navbarSupportedContent').removeClass('mt-2')
	}
	$(window).resize(function() {
		if ($(this).width() < 991) {
			$('nav').removeClass('bg-dark')
			$('nav div').addClass('mt-2')
			$('nav div ul li').removeClass('mr-2')
		}
		else {
			$('nav').addClass('bg-dark')
			$('nav div').removeClass('mt-2')
			$('nav div ul li').addClass('mr-2')
		}
	})
})

$("a").click(function() {
	idd = $(this).attr('id').replace('btn-', '')
  	$('html,body').animate({
        scrollTop: $("#" + idd).offset().top
    }, 'slow');

    $('a').removeClass('active')
    $(this).addClass('active')
});