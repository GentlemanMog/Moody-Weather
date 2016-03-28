if("geolocation" in navigator){
	$('.js-geolocation').show();
}
else{
	$('.js-geolocation').hide();
}

$(".getLocation").on('click', function(){
navigator.geolocation.getCurrentPosition(function(position){
	loadWeather(position.coords.latitude + ',' + position.coords.longitude);
	});
});

$(document).ready(function(){
	loadWeather('Auckland', '');
});

function loadWeather(location, woeid){
	$.simpleWeather({
		location: location,
		woeid: woeid,
		unit: 'f',
		success: function(weather){
			html = '<h2><i class="icon-' + weather.code + '"></i>' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
			$("#weatherTime").html(html);
		},
		error: function(error){
			$("#weatherTime").html('<p>' + error + '</p>')
		}
	});
}