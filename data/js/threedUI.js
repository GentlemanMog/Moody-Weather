//Initialize
var tween;
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
	
	var virtualCamera, scene, renderer, united;
	var camera;

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
	var geometry, material;

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

	//Setup for virtual camera, for the illusion of movement. Attaches camera to the mouselistener
		// virtualCamera = new THREE.Camera();
		// virtualCamera.add( camera );
		// virtualCamera.position.z = cameraZ;

	//Important scene initialization
		scene = new THREE.Scene();

		// scene.add(virtualCamera);

		light = new THREE.DirectionalLight( 0xffffff );
		// light.position.set( 0, 0, 1 ).normalize();
		scene.add( light );

		// THREEx.WindowResize(renderer, camera);

			light.position.x = Math.random() - 0.5;
   			light.position.y = Math.random() - 0.5;
   			light.position.z = Math.random() - 0.5;

   		//Set a canvas to every div in the array
		var canvas = document.createElement( 'canvas' ); 
			
		// geometry = new THREE.PlaneGeometry(8000, 2000, 0);
		// material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: false});
		// material.color.setHex( Math.random() * 0xffffff);
		// // dynamicColor(material);
		// mesh = new THREE.Mesh(geometry, material);
		// scene.add(mesh);

		// geometry = new THREE.RingGeometry( radius*.7,radius, 3,3, 3, Math.PI*2);
		geometry = new THREE.OctahedronGeometry(radius*.7, 1)
		// geometry.rotation.y = Math.random()*Math.PI;
		material = new THREE.MeshBasicMaterial( { 
			color: 0xFF3399, 
			wireframe: false ,
			// blending: THREE.AdditiveBlending,
			depthWrite:false,
			depthTest:false,
			transparent:false,
			opacity:1,
			wireframeLinewidth: 50
			// side: THREE.DoubleSide
		} );
		dynamicColor(material, 'Honolulu', '', 'temp');


		var mesh = new THREE.Mesh(geometry, material);
		mesh1.add(mesh);
		scene.add(mesh1);

		geometry = new THREE.RingGeometry( radius*.7,radius, 100, 100, 8, Math.PI*2);

		material = new THREE.MeshLambertMaterial( { 
		color: 0xFF3399, 
		wireframe: true ,
		// blending: THREE.AdditiveBlending,
		depthWrite:false,
		depthTest:false,
		transparent:false,
		opacity:1,
		wireframeLinewidth: 50
		// side: THREE.DoubleSide
		} );
		dynamicColor(material, 'Honolulu', '', 'humidity');

		var mesh = new THREE.Mesh(geometry, material);
		mesh1.add(mesh);
		scene.add(mesh1);

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

	//BloomPass ew gross
		// bloomPass = new THREE.BloomPass();
		// united.addPass (bloomPass);

	//GlitchPass effect
		// glitchPass = new THREE.GlitchPass();
		// // glitchPass.renderToScreen = true;
		// united.addPass (glitchPass);

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

	//BadTV shader
		// effect = new THREE.ShaderPass(THREE.BadTVShader);
		// effect.uniforms['tDiffuse'].value = 1.0;
		// effect.uniforms['time'].value = 1.0;
		// effect.uniforms['distortion'].value = 2.5;
		// effect.uniforms['distortion2'].value = 1.0;
		// effect.uniforms['speed'].value = 0.1;
		// effect.uniforms['rollSpeed'].value = 8.0;
		// // effect.renderToScreen = true;
		// united.addPass(effect);

	//Colour displacment Shader
		// effect = new THREE.ShaderPass( THREE.RGBShiftShader );
		// // effect.uniforms[ 'amount' ].value = 0.07;	
		// united.addPass( effect );

		effect.renderToScreen = true;

	//Mouse event listeners for movement
		// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		// document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
		
	}
		//When Reloaded change the rotation of the mesh to a rantom rotation
		mesh1.rotation.z = Math.random()*Math.PI;

		//Mouse fucntions
			// function onDocumentMouseMove ( event ) {

			// 		mouseX = ( event.clientX - windowHalfX );
			// 		mouseY = ( event.clientY - windowHalfY );

			// 	}

			// 	function onDocumentMouseWheel ( event ) {

			// 		var delta = 0;

			// 		if ( event.wheelDelta ) {

			// 			delta = event.wheelDelta / 120;
			// 			if ( window.opera ) delta = -delta;

			// 		} else if ( event.detail ) {

			// 			delta = -event.detail / 3;

			// 		}

			// 		if ( delta ) {

			// 			if ( delta < 0 ) {

			// 				cameraZ -= 100;

			// 			} else {

			// 				cameraZ += 100;

			// 			}

			// 		}

			// 	}

		//update render time
			function update() {
				rendertime += 0.01;
				
			};


		//Resize
		function onResize(){
			var winResize = new THREEx.WindowResize(renderer, camera);
			renderer.devicePixelRatio   = 1/4;
			winResize.trigger();
		}
				
			//update renderer camera and Passes
				this.animate = function() {

					render();

				};

				function render() {
					mesh1.rotation.z += 0.01;
					mesh1.rotation.y += 0.01;

					window.addEventListener('devicelight', function(event){
						var prox = event.value;
						mesh1.scale.set(prox/2, prox/2, prox/2);
						$(".values").html("<p>" + prox + " Lux</p>");
					}, false);

				//Update Virtualcamera for mouse movement
					// virtualCamera.position.x = -mouseX * 3;
					// virtualCamera.position.y = -mouseY *-3;
					// virtualCamera.position.z = cameraZ;
					// virtualCamera.lookAt( scene.position );

					camera.position.x += ( mouseX - camera.position.x ) * 0.02;
					camera.position.y += ( - mouseY - camera.position.y ) * 0.02;
				
                	united.render(scene, camera);
				};

				
};

function dynamicColor(material, location, woeid, type){
	var color;
	var currentColor;
	$.simpleWeather({
		location: location,
		woeid: woeid,
		unit: 'c',
		success: function(weather){
			if(type == 'temp'){
				console.log(weather.temp);
				if (weather.alt.temp < 5) {
					color = new THREE.Color("#00299b");
					material.color.set(color);
				}else if (weather.temp < 10) {
					color = new THREE.Color("#00299b");
					material.color.set(color);
				}else if (weather.temp < 15) {
					color = new THREE.Color("#00299b");
					material.color.set(color);
				}else if (weather.temp < 20) {
					color = new THREE.Color("#00299b");
					material.color.set(color);
				}else if (weather.temp < 25) {
					color = new THREE.Color("#00299b");
					material.color.set(color);
				}else if (weather.temp < 30) {
					color = new THREE.Color("#00299b");
					material.color.set(color);
				}else{
					// color = new THREE.Color("#00299b");
					// material.color.set(color);
				}
			}else if(type == 'humidity'){
				console.log(weather.humidity);
				if (weather.humidity < 5) {
					color = new THREE.Color("#00299b");
					material.color.set(color);
				}
				//else if (weather.humidity < 10) {
				// 	color = new THREE.Color("#00299b");
				// 	material.color.set(color);
				// }else if (weather.humidity < 15) {
				// 	color = new THREE.Color("#00299b");
				// 	material.color.set(color);
				// }else if (weather.humidity < 20) {
				// 	color = new THREE.Color("#00299b");
				// 	material.color.set(color);
				// }else if (weather.humidity < 25) {
				// 	color = new THREE.Color("#00299b");
				// 	material.color.set(color);
				// }else if (weather.humidity < 30) {
				// 	color = new THREE.Color("#00299b");
				// 	material.color.set(color);
				// }else{
				// 	color = new THREE.Color("#00299b");
				// 	material.color.set(color);
				// }
			}else{

			}
		},
		error:function(error){

		}
	});
	
	tween = new TWEEN.Tween(material.color)
	.to({r:0, g:25, b:155}, 2000)
	.easing(TWEEN.Easing.Quartic.In)
	.start()
	
	// console.log(material.color.getHex());
}