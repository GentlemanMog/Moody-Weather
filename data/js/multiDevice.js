var windowWidth = document.body.clientWidth;

$(document).ready(function() {

	//Navigation Menu Small
	$(".nav li a").each(function(){
		if($(this).next().length > 0){
			$(this).addClass("parent");
		};
	})

	$(".smallnav").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$(".nav").toggle();
	});

	adjust();
})

$(window).bind('resize orientationchange', function(){
	windowWidth = document.body.clientWidth;
	adjust();
});




var adjust = function(){
	if(windowWidth < 800){
		$(".smallnav").css("display", "inline-block");

		if (!$(".smallnav").hasClass("active")) {
			$(".nav").hide();
		}else{
			$(".nav").show();
		}
		$(".nav li").unbind('mouseenter mouseleave');
		$(".nav li a.parent").unbind('click').bind('click', function(e){
			e.preventDefault();
			$(this).parent("li").toggleClass("hover");
		});
	}else if (windowWidth >= 800){
		$(".smallnav").css("display", "none");
		$(".nav").show();
		$(".nav li").removeClass("hover");
		$(".nav li a").unbind('click');
		$(".nav li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
		 	// must be attached to li so that mouseleave is not triggered when hover over submenu
		 	$(this).toggleClass('hover');
		});
	}
}