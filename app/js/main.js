var THREE = require('./vendor/three.js'),
generator = require('./generator.js');

var camera, scene, renderer;
var updatable;
init();

renderer.render(scene, camera);
animate();
window.addEventListener( 'resize', onWindowResize, false );

function init() {
	camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -5000, 1000000 );
	camera.position.y = 1850;
	camera.position.x = -2500;
	camera.position.z = -2500;
	camera.rotation.order = 'YXZ';
	camera.rotation.y -= Math.PI / 4 * 3;
	camera.rotation.x -= Math.PI / 9;
	scene = new THREE.Scene();

	updatable = generator.make(scene);

	renderer =  new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize(window.innerWidth, window.innerHeight);

	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	renderer.shadowMapEnabled = true;
	renderer.shadowMapCullFace = THREE.CullFaceBack;

	document.body.appendChild(renderer.domElement);

}

function animate() {

	requestAnimationFrame(animate);

	for (var i = 0; i < updatable.length; i++) {
		updatable[i].update();
	}

	renderer.render(scene, camera);
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}


