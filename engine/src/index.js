/**
 * Adam Hirst
 * 6/11/2018
 * 
 * index.js - App entry point
 */

import WebGLApp from './engine/WebGLApp';
import Scene from './engine/Scene';
import VRCamera from './engine/camera/VRCamera';
import FreeCamera from './engine/camera/FreeCamera';
import KeyboardController from './engine/controls/KeyboardController';

import fragShader from './engine/shaders/bp_shader.frag';
import vertShader from './engine/shaders/bp_shader.vert';

import Program from './engine/Program';
import VRController from './engine/controls/VRController';
import Shader from './engine/shader/Shader';
import MeshLoader from './engine/mesh/ModelLoader';

import lemGeometry from './lem_final.obj';
import lemTexture from './app/images/lem.png';
import lemNormalMap from './app/images/lem_normal.png';
import Camera from './engine/camera/Camera';
import Mesh from './engine/mesh/Mesh';
import MoonSurface from './app/objects/MoonSurface';

// Moon surface
import moonFrag from './app/shaders/moon_shader.frag';
import moonVert from './app/shaders/moon_shader.vert';
import moonHeight from './app/images/test2.png';
import moonNormal from './app/images/test2norm.png';
import moonSmallNormal from './app/images/download.jpeg';
import { vec3 } from 'gl-matrix';
import { rad } from './engine/util/MathUtils';

const app = new WebGLApp('canvas');
const scene = new Scene(app.gl);
app.setScene(scene);

const camera = new FreeCamera();
scene.setCamera(camera);

let program = new Program(app.gl, { fragment: fragShader, vertex: vertShader });
let moonProgram = new Program(app.gl, { fragment: moonFrag, vertex: moonVert });

// Load meshes
let lemModel = MeshLoader.getModel(lemGeometry);
let lem = new Mesh(app.gl, program, lemModel);
lem.enableSampler('uSampler', lemTexture);
lem.enableSampler('uNormalMap', lemNormalMap);
lem.addTo(scene);

lem.position = vec3.fromValues(0, 2.5, 0);
lem.scale = vec3.fromValues(0.4, 0.4, 0.4);

let moonSurface = new MoonSurface(app.gl, moonProgram);
moonSurface.enableSampler('uHeightMap', moonHeight);
moonSurface.enableSampler('uNormalMap', moonNormal);
moonSurface.enableSampler('uRockNormalMap', moonSmallNormal);
moonSurface.addTo(scene);

camera.position[1] = 5;

// Register controls
let moveSpeed = 0.5;
app.addAction('moveForward', () => {
    let rX = camera.rotation[1]; // Rotation in X (left/right)
    let rY = camera.rotation[0]; // Rotation in Y (up/down)

    let dY = moveSpeed * Math.sin(rY); // Delta Y
    let H  = moveSpeed * Math.cos(rY); // Movement distance in XZ plane

    let dX = H * Math.sin(-rX); // Delta X
    let dZ = H * Math.cos(rX); // Delta Z

    // Update camera position
    camera.position[1] += dY;
    camera.position[0] += dX;
    camera.position[2] += dZ;
}, 1);
app.addAction('moveBackwards', () => {
    let rX = camera.rotation[1]; // Rotation in X (left/right)
    let rY = camera.rotation[0]; // Rotation in Y (up/down)

    let dY = moveSpeed * Math.sin(rY); // Delta Y
    let H  = moveSpeed * Math.cos(rY); // Movement distance in XZ plane

    let dX = H * Math.sin(-rX); // Delta X
    let dZ = H * Math.cos(rX); // Delta Z

    camera.position[1] -= dY;
    camera.position[0] -= dX;
    camera.position[2] -= dZ;
}, 1);
app.addAction('moveLeft', () => {
    let rX = camera.rotation[1];
    camera.position[2] += moveSpeed * Math.cos(rX - Math.PI/2);
    camera.position[0] -= moveSpeed * Math.sin(rX - Math.PI/2);
}, 1);
app.addAction('moveRight', () => {
    let rX = camera.rotation[1];
    camera.position[2] += moveSpeed * Math.cos(rX + Math.PI/2);
    camera.position[0] -= moveSpeed * Math.sin(rX + Math.PI/2);
}, 1);
app.addAction('moveUp', () => {
    camera.position[1] += moveSpeed;
}, 1);
app.addAction('moveDown', () => {
    camera.position[1] += moveSpeed;
}, 1);

let rotationSpeed = rad(2);
app.addAction('panUp', () => {
    camera.rotation[0] -= rotationSpeed;
}, 1);
app.addAction('panDown', () => {
    camera.rotation[0] += rotationSpeed;
}, 1);
app.addAction('panLeft', () => {
    camera.rotation[1] -= rotationSpeed;
}, 1);
app.addAction('panRight', () => {
    camera.rotation[1] += rotationSpeed;
}, 1);


let keyboardController = new KeyboardController();
keyboardController.on('KeyW', 'moveForward');
keyboardController.on('KeyS', 'moveBackwards');
keyboardController.on('KeyA', 'moveLeft');
keyboardController.on('KeyD', 'moveRight');

keyboardController.on('ArrowUp', 'panUp');
keyboardController.on('ArrowDown', 'panDown');
keyboardController.on('ArrowLeft', 'panLeft');
keyboardController.on('ArrowRight', 'panRight');

let vrController = new VRController();
vrController.onStateChange(e => {
    
})

app.registerController(keyboardController);
app.registerController(vrController);