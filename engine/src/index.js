/**
 * Adam Hirst
 * 6/11/2018
 * 
 * index.js - App entry point
 */

import WebGLApp from './engine/WebGLApp';
import Scene from './engine/Scene';

const app = new WebGLApp('canvas');
const scene = new Scene(app.gl);
app.setScene(scene);

// Setup meshes, do other things here