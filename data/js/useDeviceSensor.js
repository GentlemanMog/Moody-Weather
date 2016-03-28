

window.addEventListener("devicelight", function(event){
	// alert(e.value);
	var luminosity = event.value;
	
	$(".lightlevel").html('<h3>' + luminosity + '</h3>');
	if(luminosity <= 5){
		$("#pass").addClass("darker");
	}else{
		$("#pass").removeClass("darker");
	}
	// if(luminosity <= 5){}
});
