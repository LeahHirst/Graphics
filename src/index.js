import Scene from './Scene';
import Boat from './meshes/Boat';
import Lighthouse from './meshes/Lighthouse';
import Program from './programs/Program';
import WaterProgram from './programs/WaterProgram';
import Ocean from './meshes/Ocean';
import { vec3 } from 'gl-matrix';
import { rad, registerKeyboardEvent, updateEvents } from './utils';

import fragmentShader from './shaders/shader.frag';
import vertShader from './shaders/shader.vert';

import waterFragShader from './shaders/water_shader.frag';
import waterVertShader from './shaders/water_shader.vert';

main();

function main() {

  const canvas = document.getElementById('glCanvas');
  const gl = canvas.getContext('webgl2');

  let program = new Program(gl, {
    fragment: fragmentShader,
    vertex: vertShader
  });
  let scene = new Scene(gl, program);
  let lighthouse = new Lighthouse(gl, program);
  let boat = new Boat(gl, program);

  let waterProgram = new WaterProgram(gl, {
    fragment: waterFragShader,
    vertex: waterVertShader
  })

  let ocean = new Ocean(gl, waterProgram, 250);

  lighthouse.position = vec3.fromValues(0, 1.5, 0);
  lighthouse.addTo(scene);

  boat.position = vec3.fromValues(0, 0.3, 10);
  boat.addTo(scene);

  ocean.addTo(scene);

  scene.camera.follow(boat);
  let camR = 0;
  let camH = 5;
  let camDist = 10;

  function updateCameraAngle(angle, dist, height) {
    let camX = Math.sin(angle) * dist;
    let camZ = Math.cos(angle) * dist;
    scene.camera.followDelta = vec3.fromValues(camX, height, camZ);
  }
  registerKeyboardEvent('ArrowLeft', () => {
    camR -= rad(5);
    updateCameraAngle(camR, camDist, camH);
  });
  registerKeyboardEvent('ArrowRight', () => {
    camR += rad(5);
    updateCameraAngle(camR, camDist, camH);
  });
  registerKeyboardEvent('ArrowDown', () => {
    camH /= 1.05;
    camDist /= 1.1;
    updateCameraAngle(camR, camDist, camH);
  });
  registerKeyboardEvent('ArrowUp', () => {
    camH *= 1.05;
    camDist *= 1.1;
    updateCameraAngle(camR, camDist, camH);
  });

  registerKeyboardEvent('KeyW', () => {
    let dist = 0.002;
    let angle = boat.rotation[1];
    boat.velocity[0] -= dist * Math.sin(angle);
    boat.velocity[2] -= dist * Math.cos(angle);
  });
  registerKeyboardEvent('KeyA', () => {
    boat.rotation[1] += rad(2);
  });
  registerKeyboardEvent('KeyD', () => {
    boat.rotation[1] -= rad(2);
  });

  function render(time) {
    time *= 0.001;
    scene.draw(time);

    updateEvents();

    boat.setAnimationFrame((time / 2) % 1);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
