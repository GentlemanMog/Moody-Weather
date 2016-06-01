//Initialize

if("geolocation" in navigator){
	$('.js-geolocation').show();
}
else{
	$('.js-geolocation').hide();
}






var currentWeather;
var woeid = '';
// $(document).ready(function(){

	if($("#loctField").val().length > 0){
		currentWeather = $("#loctField").val();
	}else{
		// currentWeather = ' ';
	}




document.getElementById("loctField").addEventListener("keydown", function(event){
	if(event.keyCode === 13){
		return false;
	}
}, false);

function save(){
	var textfieldSave = document.getElementById('loctField').value;
	localStorage.setItem("text", textfieldSave);
	currentWeather = textfieldSave;
}
function retrieve(){
	var textFieldNew = localStorage.getItem("text");
	//alert(textFieldNew);
	 document.getElementById('loctField').value = textFieldNew;
	 currentWeather = textFieldNew;
}

	
	setInterval(dynamicColor, 750);


// });

// console.log(currentWeather, woeid);
init();
animate();

function init(){

	function degToRad(d){
		return d * Math.PI/180;
	}

	var vizual = document.getElementById('triDtest');
	window.addEventListener('resize', triDtest.onResize, false);
	
	var fullWidth = 1920;
	var fullHeight = 1080;

	canvas = new triDtest( 'triDtest', fullWidth, fullHeight, 0, 0, vizual.clientWidth, vizual.clientHeight );
			

						
}



function animate(){
	canvas.animate();
	requestAnimationFrame(animate);
}



function triDtest(containerID, fullWidth, fullHeight, viewX, viewY, viewWidth, viewHeight){
	var container, stats;
	
	var scene, renderer, united;
	var camera, controls;

	var daeFile;
	var mesh1, light;

	var animation;

	var mouseX = 0, mouseY = 0;
	var cameraZ = 1000;

	var windowHalfX = window.innerWidth;
	var windowHalfY = window.innerHeight;
	var FIXED_SIZE_W = 800;
	var FIXED_SIZE_H = 600;

	var rendertime = 0;
	var renderToggle = false;
	var isGeoOn = false;
	
	var glitchPass, bloomPass;
	var geometry;
	var material = [
					new THREE.MeshBasicMaterial({
						color: 0x696969, 
						wireframe: false
					}),
					new THREE.MeshBasicMaterial( { 
						color: 0xFF3399, 
						wireframe: false ,
						blending: THREE.AdditiveBlending,
						depthWrite:false,
						depthTest:false,
						transparent:true,
						opacity:0.7,
						wireframeLinewidth: 50,
						side: THREE.DoubleSide
					} ),
					new THREE.MeshBasicMaterial( { 
						color: 0xFF3399, 
						wireframe: false ,
						blending: THREE.AdditiveBlending,
						depthWrite:false,
						depthTest:false,
						transparent:true,
						opacity:0.7,
						wireframeLinewidth: 10,
						side: THREE.DoubleSide
					} ),
					new THREE.MeshBasicMaterial( { 
						color: 0xFF3399, 
						wireframe: false ,
						blending: THREE.AdditiveBlending,
						depthWrite:false,
						depthTest:false,
						transparent:true,
						opacity:0.3,
						wireframeLinewidth: 10,
						side: THREE.DoubleSide
					} ),
					new THREE.MeshBasicMaterial( { 
						color: 0xFF3399, 
						wireframe: true ,
						blending: THREE.AdditiveBlending,
						depthWrite:false,
						depthTest:false,
						transparent:false,
						opacity:1,
						wireframeLinewidth: 10,
						// side: THREE.DoubleSide
					} )
				];

	var radius = 400;


	init();

	function init(){

		container = document.getElementById(containerID);
		mesh1 = new THREE.Object3D();

		window.addEventListener('resize', onResize, false);

	//Camera Setup
		camera = new THREE.PerspectiveCamera(90, 800 / 600, 1, 10000);
		// camera.position.x = 200;
		// camera.position.y = 100;
		camera.position.z = 1000;
		// camera.setViewOffset(fullWidth, fullHeight, viewX, viewY, viewWidth, viewHeight);
		

	//Important scene initialization
		scene = new THREE.Scene();

		light = new THREE.DirectionalLight( 0xffffff );
		// light.position.set( 0, 0, 1 ).normalize();
			// light.position.x = Math.random() - 0.5;
  			// light.position.y = Math.random() - 0.5;
  			// light.position.z = Math.random() - 0.5;
  		scene.add( light );

   		//Set a canvas to every div in the array
		var canvas = document.createElement( 'canvas' ); 


	//Background	
		geometry = new THREE.PlaneGeometry(8000, 2000, 0);
		// material.color.setHex( Math.random() * 0xffffff);
		mesh = new THREE.Mesh(geometry, material[0]);
		scene.add(mesh);

	//Load Model
		var loader = new THREE.ColladaLoader();
			
			loader.load('resources/weather-node.dae', function (collada){
				// console.log(collada.scene);
				collada.scene.traverse( function(child) {

        			console.log(child);
        			// console.log(child.material);
        		if (child.material) {
        			if ( child.material.name === 'Temp' || child.material.name === 'Temp2') {
        				child.material = material[1];
        			}else if (child.material.name === 'Humid' || child.material.name === 'Humid2') {
        				child.material = material[2];
        			}else if (child.material.name === 'Windy' || child.material.name === 'Windy2'){
        				child.material = material[3];
        			}

        		}
        		
        		if( child instanceof THREE.Mesh ) {
        			//sets a new material to the model
           				// child.material = material[1];

        			//scales the model to the appropriate size
           				child.scale.set(20,20,20);

           			//Adds the mesh to the scene
            			mesh1.add( child );
        				scene.add(mesh1);
        			}
        			
    			});



			});


	//Gyroscope Controls THREEJS
		// if(window.addEventListener("deviceorientation", handleOrientation, true)){
			controls = new THREE.DeviceOrientationControls( mesh1, true);
		// }else{

		// } 
		
	//Renderer setup
		renderer = new THREE.WebGLRenderer({ anialias: true });
		// renderer.setSize(1920,1080);
		renderer.setClearColor ( 0x000000 );
		renderer.setPixelRatio( window.devicePixelRatio);
		renderer.setSize( container.clientWidth, container.clientHeight);	
		container.appendChild( renderer.domElement );

	//Shader Setup	
	//Sets up a effectPass and pases everything in the group not the renderer
		united = new THREE.EffectComposer(renderer);
		united.addPass( new THREE.RenderPass(scene, camera));

	//BloomPass
		// bloomPass = new THREE.BloomPass(3,12,2.0,1512);
		// united.addPass (bloomPass);
		
	//GlitchPass effect
		// glitchPass = new THREE.GlitchPass();
		// glitchPass.renderToScreen = true;
		
	//FilmShader
		// effect = new THREE.ShaderPass(THREE.FilmShader);
		// united.addPass( effect );

	//Copy Shader
		effect = new THREE.ShaderPass(THREE.CopyShader);
		united.addPass( effect );

	//Mirror Shader
		// effect = new THREE.ShaderPass(THREE.MirrorShader)
		// united.addPass( effect );

	//Glitch Shader effect
		// effect = new THREE.ShaderPass( THREE.DigitalGlitch);
		// // // effect.renderToScreen = true;
		// effect.uniforms['tDisp'].value = 50.0;
		// united.addPass (effect);

	//Colour displacment Shader
		// effect = new THREE.ShaderPass( THREE.RGBShiftShader );
		// effect.uniforms[ 'amount' ].value = 0.001;	
		// united.addPass( effect );

		effect.renderToScreen = true;

	//Mouse event listeners for movement
		// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		// document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
		
		// dynamicColor(material[1], currentWeather, woeid, 'temp');
		// dynamicColor(material[2], currentWeather, woeid, 'humidity');
		// dynamicColor(material[3], currentWeather, woeid, 'Wind chill');
		// dynamicColor(material[4], currentWeather, woeid, 'Wind Speed'); 
	}
		//When Reloaded change the rotation of the mesh to a rantom rotation
		mesh1.rotation.z = Math.random()*Math.PI;

		//update render time
			function update() {
				rendertime += 0.001;
				
			};


		//Resize
		function onResize(){
			var winResize = new THREEx.WindowResize(renderer, camera);
			renderer.devicePixelRatio   = 1/4;
			winResize.trigger();
		}
				
			//update renderer camera and Passes
				this.animate = function() {
					// controls.update();
					render();

				};

				function render() {

					var time = -0.0002 * Date.now();

					//Gyroscope control 
						controls.update();

					//Gyroscope Simulation
						// mesh1.rotation.z += 0.01;
						// mesh1.rotation.y += 0.01;
	
				//Enables all Sensor methods		
					getAmbient();

			//	if (isGeoOn === true) {	
					dynamicColor(material[1], currentWeather, woeid, 'temp');
					dynamicColor(material[2], currentWeather, woeid, 'humidity');
					dynamicColor(material[3], currentWeather, woeid, 'Wind chill');
					// dynamicColor(material[4], currentWeather, woeid, 'Wind Speed');
			//	}else {
			//		dynamicColor(material[1], currentWeather, woeid, 'temp');
			//		dynamicColor(material[2], currentWeather, woeid, 'humidity');
			//		dynamicColor(material[3], currentWeather, woeid, 'Wind chill');
			//	}
					// camera.position.x += ( mouseX - camera.position.x ) * 0.02;
					// camera.position.y += ( - mouseY - camera.position.y ) * 0.02;

				//Update Renderer
                	united.render(scene, camera);
				};

		
};

function getAmbient(){
			var backColor;

			window.addEventListener("devicelight", function (value) {
   				var lunin = value.value;
   				var newcolor = mapRange(lumin, 0, 400, 84, 204);
   				newcolor = floatToInt(newcolor);
   				backColor = new THREE.Color('rgb('+ newcolor +',' + newcolor + ',' + newcolor +')');
   				material[0].color.set(backColor);
			}, false);

			$("#btn-1").on('click', function(){
				//isGeoOn = true;
				navigator.geolocation.getCurrentPosition(function(position){
					currentWeather = position.coords.latitude + ',' + position.coords.longitude;
				});

				// alert('GeoButton is on!');

				$('#Geo').attr('src', 'resources/Geolocation_Button_light.png');
        		$('.button1').attr('optacity', '1');
			});
			$("#btn-2").on('click', function(){
				retrieve();
			});

			$("#search").on('click', function(){
				save();
			});

	}			

function dynamicColor(material, location, woeid, type){


	var color;
	var currentColor;

	$.simpleWeather({
		location: location,
		woeid: woeid,
		unit: 'c',
		success: function(weather){
			var colorRed, colorBlue, colorGreen;
			// console.log(weather.wind.chill)
			if(type == 'temp'){
				
				if(weather.temp > 15){
					colorRed = 220;
					colorBlue = 0;
					colorGreen =  mapRange(weather.temp, 16, 50, 130, 40);
				}else if( weather.temp <= 15){
					colorRed = 0;
					colorBlue = 220;
					colorGreen =  mapRange(weather.temp, -10, 15, 40, 140);
				}
				
				colorGreen = floatToInt(colorGreen);

				// console.log(weather.temp);
				// console.log(colorGreen);
				color = new THREE.Color('rgb('+ colorRed +',' + colorGreen + ',' + colorBlue +')');
				
				material.color.set(color);

				$(".tempLegend").html( weather.temp + "&deg" + weather.units.temp);

			}else if(type == 'humidity'){
				// console.log(weather.humidity);

				colorRed = 30;
				colorGreen = 150;
				colorBlue = floatToInt(weather.humidity);

				// console.log(colorBlue);
				color = new THREE.Color('rgb(' + colorRed + ',' + colorGreen + ',' + colorBlue +')');
				
				material.color.set(color);
				$(".humidLegend").html( weather.humidity + "%");

			}else if (type == 'Wind chill'){
				// console.log(weather.wind.chill);

				colorBlue = 200;
				colorGreen = 200;
				colorRed = mapRange(weather.wind.chill, 100, -20, 150, 0);
				colorRed = floatToInt(colorRed);

				//console.log(colorRed);
				color = new THREE.Color('rgb(' + colorRed + ',' + colorGreen + ',' + colorBlue +')');
				
				material.color.set(color);
				$(".WindLegend").html( weather.wind.chill + "&degF");

			}else if (type == 'Wind Speed'){
				// console.log(weather.wind.speed);
				if (weather.wind.speed < 9.5) {
					color = new THREE.Color("#B0A393");
					material.color.set(color);
				}else if (weather.wind.speed < 12.5) {
					color = new THREE.Color("#ABA49C");
					material.color.set(color);
				}else if (weather.wind.speed < 15.5) {
					color = new THREE.Color("#00299b");
					material.color.set(color);
				}else if (weather.wind.speed < 18.5) {
					color = new THREE.Color("#B0B9B2");
					material.color.set(color);
				}else if (weather.wind.speed < 21.5) {
					color = new THREE.Color("#AFAEB0");
					material.color.set(color);
				}else if (weather.wind.speed < 25) {
					color = new THREE.Color("#78757D");
					material.color.set(color);
				}else{
					color = new THREE.Color("#67647D");
					material.color.set(color);
				}
			}else{

			}

		},
		error:function(error){

		}
	});
	

	// tween = new TWEEN.Tween(material.color)
	// .to({r:0, g:25, b:155}, 2000)
	// .easing(TWEEN.Easing.Quartic.In)
	// .start()
	
	// console.log(material.color.getHex());
}
function mapRange(value, minT, maxT, minG, maxG){
	return minG + (maxG - minG) * (value - minT) / (maxT - minT);
}
function floatToInt(value){
	return value | 0;
}