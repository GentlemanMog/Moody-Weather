
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
// var luminosity;
var luminOver;
var magneticflux = 0;

window.addEventListener('devicelight', function(event){
	// alert(e.value);
	var luminosity = event.value;
	// showLuminosity(luminosity);

	if(luminosity <= 5){
		$(".lightlevel").css("opticity", "0.7");
		$(".lightlevel").html("<h2>" + luminosity + " Lux</h2> <h2>" + magneticflux + " MgFlux</h2>");
		// document.getElementById("sensor").addClass("veryDark");
		// document.body.className = "veryDark";
	}else if(luminosity <= 20){
		$(".lightlevel").css("opticity", "0.5");
		$(".lightlevel").html("<h2>" + luminosity + " Lux</h2> <h2>" + magneticflux + " MgFlux</h2>");
		// document.getElementById("sensor").addClass("lighter");
		// document.body.className = "lighter"
	}else if (luminosity <= 50) {
		$(".lightlevel").css("opticity", "0.3");
		$(".lightlevel").html("<h2>" + luminosity + " Lux</h2> <h2>" + magneticflux + " MgFlux</h2>");
		// document.getElementById("sensor").addClass("toobright");
		// document.body.className = "toobright";
    }else{
		// document.body.className = ""
		$(".lightlevel").css("opticity", "0");
    }
    // luminosity = luminOver;
});
// window.addEventListener("magneticflux", function(event){
// 	magneticflux = event.value;
// });

// $(document).ready(function(){
// 	showLuminosity();
// });

// function showLuminosity(){
	
// 	}
