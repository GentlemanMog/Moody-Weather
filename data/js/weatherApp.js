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
	loadWeather('London', '');
	setInterval(loadWeather, 300000);
});

function loadWeather(location, woeid){
	$.simpleWeather({
		location: location,
		woeid: woeid,
		unit: 'f',
		success: function(weather){
			if(weather.alt.temp > 10){
				$('.MoodRing').animate({
					backgroundColor: 'blue'
				}, 1500);
			}else if (weather.alt.temp > 20) {
				$('.MoodRing').animate({
					backgroundColor: 'yellow'
				}, 1500);
			}else{
				$('.MoodRing').animate({
					backgroundColor: 'crimson'
				}, 1500);
			}
			if(weather.humidity > 40){
				$('.humidMood').animate({
					backgroundColor: 'blue'
				}, 1500);
			}else if (weather.humidity > 60) {
				$('.humidMood').animate({
					backgroundColor: 'yellow'
				}, 1500);
			}else{
				$('.humidMood').animate({
					backgroundColor: 'crimson'
				}, 1500);
			}

			html = '<h2><i class="icon-' + weather.code + '"></i>' + weather.alt.temp + '&deg;C' + /*weather.units.temp + */'</h2>';
			

			// var timestamp = moment(weather.updated);
			// html += '<p class="updated"> Updated' + moment(timestamp).fromNow() + '<p>';

			$("#weatherTime").html(html);
		},
		error: function(error){
			$("#weatherTime").html('<p>' + error + '</p>')
		}
	});
}