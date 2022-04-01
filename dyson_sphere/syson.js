

import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';

import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js'




import Stats from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/libs/stats.module.js';
import { GUI } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/libs/dat.gui.module.js';


import { EffectComposer } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/UnrealBloomPass.js';

let composer, clock;

const params = {
    exposure: 1,
    bloomStrength: 1,
    bloomThreshold: 0,
    bloomRadius: 1.0,
    HaloLoc: 20 , 
};

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)


var width = window.innerWidth;
var height = window.innerHeight;


//const camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 10000000);


const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

renderer.setSize(window.innerWidth, window.innerHeight)
// sets renderer background color
renderer.setClearColor("#000000", 0)
//renderer.toneMapping = THREE.ReinhardToneMapping;

//scene.fog = new THREE.Fog( new THREE.Color("rgb(100, 100, 100)"), 10, 50 )


var canvas = document.getElementById('viewport');

//stats = new Stats();
//canvas.appendChild(stats.dom);

clock = new THREE.Clock();

canvas.appendChild(renderer.domElement);



//document.body.appendChild( renderer.domElement )
camera.position.z = 600



const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = 0.9 * Math.PI / 2;
controls.enableZoom = true;







//scene.add(new THREE.AmbientLight(0x404040));

const pointLight_02 = new THREE.PointLight(0xffffff, 1);
camera.add(pointLight_02);


const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;
bloomPass.ClearColor = {r: 100, g: 0, b: 0}
console.log(bloomPass)

composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);









// resize canvas on resize window



// ambient light
var ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
//scene.add(ambientLight)

// point light
var pointLight = new THREE.PointLight(0x554444, 1);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);




/*
const loader = new GLTFLoader();

loader.load( '../model/untitled.glb', function ( gltf ) {
 
    scene.add( gltf.scene );
 
}, undefined, function ( error ) {
 
    console.error( error );
 
} );

*/















var wire_mat = new THREE.MeshStandardMaterial({
    color: "#000000", wireframe: false, transparent: false
})

// point light
var bb_light = new THREE.PointLight('#ff2986', 100, 0);
bb_light.position.set(0, 0, 0);
//scene.add(bb_light);

var bb_cold_light = new THREE.PointLight('#1111ff', 100, 0);
bb_cold_light.position.set(0, 0, 0);
//scene.add(bb_cold_light);


const material = new THREE.MeshStandardMaterial({
    color: 0xFF0000,    // red (can also use a CSS color string here)
    flatShading: true,
  });


var cmb = new THREE.Object3D
var scatter_particle_set = new THREE.Object3D
var structure_formation = new THREE.Object3D

// {
//     const objLoader = new OBJLoader();
//     objLoader.load('dyson_sphere/ring.obj', (root) => {

//         root.traverse(function (child) {
//             if (child instanceof THREE.Mesh) {
//                 child.material = material;
//             }
//         });
//         cmb = root;
//         cmb.scale.set(1, 1, 1);
//         cmb.rotation.x = 10;
//         cmb.position.set(-0.05 * width, 0, 0)
//         scene.add(cmb);
//     });
   
    
// }

// adding position plane
var model 

const loader = new GLTFLoader();
loader.load(
	// resource URL
	'dyson_sphere/ds3.glb',
	// called when the resource is loaded
	function ( gltf ) {
        model = gltf
		scene.add( gltf.scene );
        //cmb = gltf
		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		//cmb = gltf.asset; // Object
        init()
	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);



function init(){
    model.scene.position.set(0,0,-100)
    model.scene.scale.set(2.5,2.5,2.5)
    model.scene.rotation.set(-4,5,10)
    model.scene.children[0].rotation.set(0,0,0)
    model.scene.children[0].scale.set(1,2,2)
    console.log(model)
}


window.addEventListener('resize', () => {
    let width = window.innerWidth
    let height = window.innerHeight
    renderer.setSize(width, height)
    camera.left = width / - 2;
    camera.right = width / 2;
    camera.top = height / 2
    camera.bottom = height / -2
    camera.updateProjectionMatrix()
})


function animate() {
    requestAnimationFrame(animate)
    model.scene.children[0].rotation.x += 0.002;
    //scatter_particle_set.rotation.x += 0.002
    //structure_formation.rotation.x += 0.002
    //cmb.rotation.y += 0.04;

    //stats.update();
    renderer.render(scene, camera);
    composer.render();
}
animate()



/*
let big_bang = 0 
let epoch_of_recom = 370*10^3
let dark_age = 150*10^6
let epoch_of_reion = 700*10^6
*/


//var norm_factor = max_age / 13935216939.08 
//console.log("Max age now" , max_age)
//console.log("NOrm factor" , norm_factor)
