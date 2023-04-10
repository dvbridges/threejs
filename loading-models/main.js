import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const clock = new THREE.Clock();
const mixers = [];

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( 2, 3, - 6 );
camera.lookAt( 0, 1, 0 );

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
hemiLight.position.set( 0, 20, 0 );
scene.add( hemiLight );

const renderer = new THREE.WebGLRenderer({antialiasing: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

loader.load( './public/CesiumMan.gltf', function ( gltf ) {
	scene.add( gltf.scene );

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object

    gltf.scene.rotation.y = 135;
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction( gltf.animations[0] );
    action.play()
    mixers.push(mixer);
    
}, undefined, function ( error ) {
	console.error( error );
} );


function animate() {

    const delta = clock.getDelta();

    for ( const mixer of mixers ) {
        mixer.update( delta );
    }

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

animate();
