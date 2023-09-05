import './style.css'

import * as THREE from 'three';

import{ OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(40);

renderer.render(scene, camera);

const texture = new THREE.TextureLoader().load( 'assets/logo-yellow.jpg' );

const geometry = new THREE.SphereGeometry(10,32, 20);
const material = new THREE.MeshStandardMaterial({
  map: texture,
});

const anchorGeometry = new THREE.SphereGeometry(5,5,5);
const anchor = new THREE.Mesh(anchorGeometry, material);

const aboutGeometry = new THREE.SphereGeometry(5,20,15);
//const aboutMaterial = new THREE.MeshStandardMaterial({map: THREE.Color(0x00FF00)});
const aboutMesh = new THREE.Mesh(aboutGeometry, material);


const sphere = new THREE.Mesh(geometry, material);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

scene.add(sphere);
scene.add(anchor);
anchor.add(aboutMesh);

aboutMesh.position.x = 20;

const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
  requestAnimationFrame( animate );
  
  controls.update();
  sphere.rotation.y += .05;
  anchor.rotateY(.03);
  anchor.rotateX(.03);
  aboutMesh.rotateY(.05);
  renderer.render( scene, camera);
}
animate();