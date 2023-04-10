import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create blue LineBasicMesh
const material = new THREE.LineBasicMaterial( {color: 0x0000ff} );

// Create geometry with vertices
const points = [];
points.push( new THREE.Vector3( -10, 0, 0, ));
points.push( new THREE.Vector3( 0, 10, 0, ));
points.push( new THREE.Vector3( 10, 0, 0, ));

// Note, lines are only drawn between consecutive points,
// and not between first and last, i.e.,  the shape is not closed
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( geometry, material );
scene.add( line );

function animate() {

    renderer.render( scene, camera );
    requestAnimationFrame(animate)

}
animate()