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
	setInterval(dynamicColor, 75000);

	if($("#loctField").val().length > 0){
		currentWeather = $("#loctField").val();
	}else{
		// currentWeather = ' ';
	}

	$(".getLocation").on('click', function(){
		navigator.geolocation.getCurrentPosition(function(position){
			currentWeather = position.coords.latitude + ',' + position.coords.longitude;
		});
	});

	



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

	
	var mesh1, light;

	var mouseX = 0, mouseY = 0;
	var cameraZ = 1000;

	var windowHalfX = window.innerWidth;
	var windowHalfY = window.innerHeight;
	var FIXED_SIZE_W = 800;
	var FIXED_SIZE_H = 600;

	var rendertime = 0;
	var renderToggle = false;
	
	var glitchPass, bloomPass;
	var geometry;
	var material = [
					new THREE.MeshBasicMaterial({
						color: 0x1F1F1F, 
						wireframe: false
					}),
					new THREE.MeshBasicMaterial( { 
						color: 0xFF3399, 
						wireframe: true ,
						blending: THREE.AdditiveBlending,
						depthWrite:false,
						depthTest:false,
						transparent:false,
						opacity:1,
						wireframeLinewidth: 50
						// side: THREE.DoubleSide
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

	//Temperature
		geometry = new THREE.OctahedronGeometry(radius*.7, 1)
		// geometry.rotation.y = Math.random()*Math.PI;
		var mesh = new THREE.Mesh(geometry, material[1]);
		mesh1.add(mesh);
		scene.add(mesh1);

	//Humidity
		geometry = new THREE.OctahedronGeometry( 200*.7,0);
		geometry.translate(230, 0, 0);
		
		var mesh = new THREE.Mesh(geometry, material[2]);
		mesh1.add(mesh);
		scene.add(mesh1);

	//Wind chill
		geometry = new THREE.TorusKnotGeometry( 150*.7,20, 30, 3);
		geometry.translate(-230, 0, 450);
		
		var mesh = new THREE.Mesh(geometry, material[3]);
		mesh1.add(mesh);
		scene.add(mesh1);

	//Wind Speed
		geometry = new THREE.TorusKnotGeometry( 150*.7,20, 30, 3);
		geometry.translate(-100, 180, 450);
		
		var mesh = new THREE.Mesh(geometry, material[4]);
		mesh1.add(mesh);
		scene.add(mesh1);


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
		glitchPass = new THREE.GlitchPass();
		// glitchPass.renderToScreen = true;
		

	//FilmShader
		// effect = new THREE.ShaderPass(THREE.FilmShader);
		// united.addPass( effect );

	//Copy Shader
		// effect = new THREE.ShaderPass(THREE.CopyShader);
		// united.addPass( effect );

	//Mirror Shader
		// effect = new THREE.ShaderPass(THREE.MirrorShader)
		// united.addPass( effect );

	//Glitch Shader effect
		// effect = new THREE.ShaderPass( THREE.DigitalGlitch);
		// // // effect.renderToScreen = true;
		// effect.uniforms['tDisp'].value = 50.0;
		// united.addPass (effect);

	//Colour displacment Shader
		effect = new THREE.ShaderPass( THREE.RGBShiftShader );
		effect.uniforms[ 'amount' ].value = 0.001;	
		united.addPass( effect );

		effect.renderToScreen = true;

	//Mouse event listeners for movement
		// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		// document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
		
	}
		//When Reloaded change the rotation of the mesh to a rantom rotation
		mesh1.rotation.z = Math.random()*Math.PI;

		//update render time
			function update() {
				rendertime += 0.01;

				 window.addEventListener('devicelight', function(event){
						var prox = event.value;
						effect.uniforms[ 'amount' ].value = prox/40;
				}, false);
				
			};


		//Resize
		function onResize(){
			var winResize = new THREEx.WindowResize(renderer, camera);
			renderer.devicePixelRatio   = 1/4;
			winResize.trigger();
		}
				
			//update renderer camera and Passes
				this.animate = function() {
					controls.update();
					render();

				};

				function render() {
					

					// if(window.addEventListener("deviceorientation", handleOrientation, true)){
						// controls.update();
					// }else{
						mesh1.rotation.z += 0.01;
						mesh1.rotation.y += 0.01;
					// }
		
					dynamicColor(material[1], currentWeather, woeid, 'temp');
					dynamicColor(material[2], currentWeather, woeid, 'humidity');
					dynamicColor(material[3], currentWeather, woeid, 'Wind chill');
					dynamicColor(material[4], currentWeather, woeid, 'Wind Speed');

					getAmbient();
					// window.addEventListener('devicelight', function(event){
					// 	var prox = event.value;
					// 	mesh1.scale.set(prox/2, prox/2, prox/2);
					// 	$(".values").html("<p>" + prox + " Lux</p>");
					// }, false);

					camera.position.x += ( mouseX - camera.position.x ) * 0.02;
					camera.position.y += ( - mouseY - camera.position.y ) * 0.02;
				
                	united.render(scene, camera);
				};

	function getAmbient(){
		$(".getAmbient").on('click', function(){
			window.addEventListener("temperature", function (value) {
   				if (value < 5) {
					color = new THREE.Color("#4A8BCC");
					material.color.set(color);
				}else if (value < 10) {
					color = new THREE.Color("#33404C");
					material.color.set(color);
				}else if (value < 15) {
					color = new THREE.Color("#8C8C85");
					material.color.set(color);
				}else if (value < 20) {
					color = new THREE.Color("#8C6F6F");
					material.color.set(color);
				}else if (value < 25) {
					color = new THREE.Color("#52302E");
					material.color.set(color);
				}else if (value < 30) {
					color = new THREE.Color("#A22607");
					material.color.set(color);
				}else{
					color = new THREE.Color("#D46D00");
					material.color.set(color);
				}
			}, false);
			window.addEventListener("devicelight", function (value) {
   				var lunin = value.value;
   				if (lumin/4 < 100) {
   					for (var i = 0; i < material.length; i++) {
   						material[i].wireframe.set(false);
   					};
   				}else{

   				}
			}, false);
			window.addEventListener("humidity", function (value) {
  				if (value < 65) {
					color = new THREE.Color("#8FA9B0");
					material.color.set(color);
				}else if (value < 70) {
					color = new THREE.Color("#6D7A7D");
					material.color.set(color);
				}else if (value < 75) {
					color = new THREE.Color("#B9B8B0");
					material.color.set(color);
				}else if (value < 80) {
					color = new THREE.Color("#B99391");
					material.color.set(color);
				}else if (value < 85) {
					color = new THREE.Color("#AB6D82");
					material.color.set(color);
				}else if (value < 90) {
					color = new THREE.Color("#B04468");
					material.color.set(color);
				}else{
					color = new THREE.Color("#B02349");
					material.color.set(color);
				}
			}, false);
			window.addEventListener("devicemagneticfield", function (value) {
				glitchPass.uniforms['seed'].value = value;
				united.addPass (glitchPass);
			}, false);
			window.addEventListener("atmpressure", function (value) {
       
   			}, false);
		});
	}				
};


function dynamicColor(material, location, woeid, type){


	var color;
	var currentColor;

	$.simpleWeather({
		location: location,
		woeid: woeid,
		unit: 'c',
		success: function(weather){
			// console.log(weather.wind.chill)
			if(type == 'temp'){
				// console.log(weather.temp);
				if (weather.temp < 5) {
					color = new THREE.Color("#4A8BCC");
					material.color.set(color);
				}else if (weather.temp < 10) {
					color = new THREE.Color("#33404C");
					material.color.set(color);
				}else if (weather.temp < 15) {
					color = new THREE.Color("#8C8C85");
					material.color.set(color);
				}else if (weather.temp < 20) {
					color = new THREE.Color("#8C6F6F");
					material.color.set(color);
				}else if (weather.temp < 25) {
					color = new THREE.Color("#52302E");
					material.color.set(color);
				}else if (weather.temp < 30) {
					color = new THREE.Color("#A22607");
					material.color.set(color);
				}else{
					color = new THREE.Color("#D46D00");
					material.color.set(color);
				}
			}else if(type == 'humidity'){
				// console.log(weather.humidity);
				if (weather.humidity < 65) {
					color = new THREE.Color("#8FA9B0");
					material.color.set(color);
				}else if (weather.humidity < 70) {
					color = new THREE.Color("#6D7A7D");
					material.color.set(color);
				}else if (weather.humidity < 75) {
					color = new THREE.Color("#B9B8B0");
					material.color.set(color);
				}else if (weather.humidity < 80) {
					color = new THREE.Color("#B99391");
					material.color.set(color);
				}else if (weather.humidity < 85) {
					color = new THREE.Color("#AB6D82");
					material.color.set(color);
				}else if (weather.humidity < 90) {
					color = new THREE.Color("#B04468");
					material.color.set(color);
				}else{
					color = new THREE.Color("#B02349");
					material.color.set(color);
				}
			}else if (type == 'Wind chill'){
				// console.log(weather.wind.chill);
				if (weather.wind.chill < 35) {
					color = new THREE.Color("#63A1B4");
					material.color.set(color);
				}else if (weather.wind.chill < 40) {
					color = new THREE.Color("#425F67");
					material.color.set(color);
				}else if (weather.wind.chill < 45) {
					color = new THREE.Color("#A3B3C0");
					material.color.set(color);
				}else if (weather.wind.chill < 50) {
					color = new THREE.Color("#C0BABC");
					material.color.set(color);
				}else if (weather.wind.chill < 55) {
					color = new THREE.Color("#818072");
					material.color.set(color);
				}else if (weather.wind.chill < 60) {
					color = new THREE.Color("#67664F");
					material.color.set(color);
				}else{
					color = new THREE.Color("#67663A");
					material.color.set(color);
				}
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
