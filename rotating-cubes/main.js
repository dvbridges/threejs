import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

// make the cube
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const time = 1;
const geometry = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth);

// Create several cubes
const cubes = [
    makeCube(geometry, 0x44aa88, 0),
    makeCube(geometry, 0x8844aa, -2),
    makeCube(geometry, 0xaa8844, 2)
]

// Add some lighting
const color = 0xFFFFFF; 
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light)

camera.position.z = 5;

function makeCube(geometry, color, posX, posY) {
    const material = new THREE.MeshPhongMaterial( {color: color} );
    const cube = new THREE.Mesh( geometry, material );
    scene.add(cube);

    cube.position.x = posX;

    return cube;
}

function animate(time) {
    time *= 0.001;
    for (const cube of cubes) {
        let ndx = cubes.indexOf(cube);
        let speed = 1 + ndx * .1;
        let rot = time * speed;
        
        cube.rotation.x = rot;
        cube.rotation.y = rot;
    }
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

animate(time);