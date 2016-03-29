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
			//temperature
			if(weather.alt.temp > 5){
				$('.MoodRing').animate({
					backgroundColor: '#110F56'
				}, 1500);
			}else if (weather.alt.temp > 10) {
				$('.MoodRing').animate({
					backgroundColor: '#2A2856'
				}, 1500);
			}else if (weather.alt.temp > 15) {
				$('.MoodRing').animate({
					backgroundColor: '#503356'
				}, 1500);
			}else if (weather.alt.temp > 20) {
				$('.MoodRing').animate({
					backgroundColor: '#561435'
				}, 1500);
			}else if (weather.alt.temp > 25) {
				$('.MoodRing').animate({
					backgroundColor: '#560923'
				}, 1500);
			}else if (weather.alt.temp > 30) {
				$('.MoodRing').animate({
					backgroundColor: '#561A1C'
				}, 1500);
			}else{
				$('.MoodRing').animate({
					backgroundColor: '#A22607'
				}, 1500);
			}

			//Humidity
			if(weather.humidity > 10){
				$('.humidMood').animate({
					backgroundColor: '#56413B'
				}, 1500);
			}else if (weather.humidity > 20) {
				$('.humidMood').animate({
					backgroundColor: '#330D0D'
				}, 1500);
			}else if (weather.humidity > 30) {
				$('.humidMood').animate({
					backgroundColor: '#562A29'
				}, 1500);
			}else if (weather.humidity > 40) {
				$('.humidMood').animate({
					backgroundColor: '#562112'
				}, 1500);
			}else if (weather.humidity > 50) {
				$('.humidMood').animate({
					backgroundColor: '#560201'
				}, 1500);
			}else{
				$('.humidMood').animate({
					backgroundColor: '#A20302'
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