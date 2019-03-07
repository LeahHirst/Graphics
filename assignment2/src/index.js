/**
 * Adam Hirst
 * 6/11/2018
 * 
 * index.js - App entry point
 */

import { WebGLApp, Program, Scene } from './engine';
import { Camera, FreeCamera, VRCamera } from './engine/camera';
import { KeyboardController, VRController } from './engine/controls';

import { Shader, blinnPhongShader } from './engine/shader'

import MeshLoader from './engine/mesh/ModelLoader';

import Mesh from './engine/mesh/Mesh';
import MoonSurface from './app/objects/MoonSurface';

import skyboxTexture from './app/images/starmap.png';

// Moon surface
import { vec3 } from 'gl-matrix';
import { rad } from './engine/util/MathUtils';
import LEM from './app/objects/LEM';
import Skybox from './engine/Skybox';

const app = new WebGLApp('canvas');
const scene = new Scene(app.gl);
app.setScene(scene);

const camera = new FreeCamera();
camera.position[1] = 
scene.setCamera(camera);

let program = new Program(app.gl, blinnPhongShader);

// Load meshes
let lem = new LEM(app.gl, program);
lem.addTo(scene);

lem.position = vec3.fromValues(0, 2.5, 0);
lem.scale = vec3.fromValues(0.4, 0.4, 0.4);

// Moon surface
let moonSurface = new MoonSurface(app.gl);
moonSurface.addTo(scene);

let skybox = new Skybox(app.gl, skyboxTexture, 100);
skybox.addTo(scene);

// Set camera position
camera.position.x = -3;
camera.position.y = -3.5;
camera.position.z = -8;
camera.rotation.y = -.5;

let lightMode = 0, normMode = 0;
app.addAction('toggleLighting', () => {
    lightMode++;
    if (lightMode > 2) lightMode = 0;
    
    lem.lightingMode = lightMode;
    moonSurface.lightingMode = lightMode;
}, 500);
app.addAction('toggleNormal', () => {
    normMode++;
    if (normMode > 2) normMode = 0;
    
    lem.normalMode = normMode;
    moonSurface.normalMode = normMode;
}, 500);

let keyboardController = new KeyboardController();
keyboardController.on('KeyW', () => { camera.moveForward(); });
keyboardController.on('KeyS', () => { camera.moveBackwards(); });
keyboardController.on('KeyA', () => { camera.moveLeft(); });
keyboardController.on('KeyD', () => { camera.moveRight(); });

keyboardController.on('ArrowUp', () => { camera.panUp(); });
keyboardController.on('ArrowDown', () => { camera.panDown(); });
keyboardController.on('ArrowLeft', () => { camera.panLeft(); });
keyboardController.on('ArrowRight', () => { camera.panRight() });

keyboardController.on('KeyP', () => { lem.rotation.y += rad(2); });
keyboardController.on('KeyO', () => { lem.rotation.y -= rad(2); });

keyboardController.on('KeyR', 'toggleLighting');
keyboardController.on('KeyT', 'toggleNormal');

app.registerController(keyboardController);