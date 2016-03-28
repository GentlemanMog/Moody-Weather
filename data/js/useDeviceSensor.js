
// Gyroscope
if(window.DeviceOrientationEvent){
	window.addEventListener("deviceorientation", function(eventData){
		// tilt([event.beta, event.gamma]);

		var tiltRL = eventData.gamma;
		var tiltBF = eventData.beta;
		var dir = eventData.alpha;

		deviceOrientationHandler(tiltRL, tiltBF, dir);
	}, false);
}else if(window.DeviceMotionEvent){
	window.addEventListener('devicemotion', function(){
		tilt([event.acceleration.x * 2, event.acceleration.y * 2]);
	}, true);
} else {
    window.addEventListener("MozOrientation", function () {
        tilt([orientation.x * 50, orientation.y * 50]);
    }, true);
}

function deviceOrientationHandler(tiltRL, tiltBF, dir){
var deal = document.getElementById("video");
deal.style.webkitTransform = "rotate(" + tiltRL + "deg) rotate3d(1,0,0, " + (tiltBF * -1) + "deg)";
deal.style.MozTransform = "rotate("+ tiltRL +"deg)";
deal.style.transform = "rotate(" + tiltRL + "deg) rotate3d(1,0,0, " + (tiltBF * -1) + "deg)";
}

// Luminosity
window.addEventListener("devicelight", function(event){
	// alert(e.value);
	var luminosity = event.value;
	
	if(luminosity <= 5){
		// $("#pass").addClass("darker");
		document.body.className = "darker"
	}else{
		// $("#pass").removeClass("darker");
		document.body.className = "";
	}

	$("#pass").html('<h3>' + luminosity + '</h3>');
	// if(luminosity <= 5){}
});
