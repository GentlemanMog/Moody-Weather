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

	$(".Pro").click(function(){
		// $(".info").toggle();
		if($(".info").is(":hidden")){
			$(".info").show(1000);
		}else{

		}
		if($(".concep").is(":hidden")){
			// $(".concep").toggle();
		}else{
			$(".concep").hide(1000);
		}
		if($(".devel").is(":hidden")){
			// $(".devel").toggle();
		}else{
			$(".devel").hide(1000);
		}
		if($(".expir").is(":hidden")){
			// $(".expir").toggle();
		}else{
			$(".expir").hide(1000);
		}
		// $(".concep").toggle();
	})
	$(".Con").click(function(){
		// $(".info").toggle();
		if($(".info").is(":hidden")){
			// $(".info").toggle();
		}else{
			$(".info").hide(1000);
		}
		if($(".concep").is(":hidden")){
			$(".concep").show(1000);
		}else{
			// $(".concep").hide();
		}
		if($(".devel").is(":hidden")){
			// $(".devel").toggle();
		}else{
			$(".devel").hide(1000);
		}
		if($(".expir").is(":hidden")){
			// $(".expir").toggle();
		}else{
			$(".expir").hide(1000);
		}
		// $(".concep").toggle();
	})
	$(".Dev").click(function(){
		// $(".info").toggle();
		if($(".info").is(":hidden")){
			// $(".info").toggle();
		}else{
			$(".info").hide(1000);
		}
		if($(".concep").is(":hidden")){
			// $(".concep").toggle();
		}else{
			$(".concep").hide(1000);
		}
		if($(".devel").is(":hidden")){
			$(".devel").show(1000);
		}else{
			// $(".devel").hide();
		}
		if($(".expir").is(":hidden")){
			// $(".expir").toggle();
		}else{
			$(".expir").hide(1000);
		}
	})
	$(".Exp").click(function(){
		if($(".info").is(":hidden")){
			// $(".info").toggle();
		}else{
			$(".info").hide(1000);
		}
		if($(".concep").is(":hidden")){
			// $(".concep").toggle();
		}else{
			$(".concep").hide(1000);
		}
		if($(".devel").is(":hidden")){
			// $(".devel").toggle();
		}else{
			$(".devel").hide(1000);
		}
		if($(".expir").is(":hidden")){
			$(".expir").show(1000);
		}else{
			// $(".expir").hide();
		}
		// $(".concep").toggle();
	})
	$(".showTabs").click(function(){
		if($(".info").is(":hidden")){
			$(".info").show(1000);
		}else{
			// $(".info").hide(1000);
		}
		if($(".concep").is(":hidden")){
			$(".concep").show(1000);
		}else{
			// $(".concep").hide(1000);
		}
		if($(".devel").is(":hidden")){
			$(".devel").show(1000);
		}else{
			// $(".devel").hide(1000);
		}
		if($(".expir").is(":hidden")){
			$(".expir").show(1000);
		}else{
			// $(".expir").hide();
		}
		// $(".concep").toggle();
	})
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