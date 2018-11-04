import Shader from './Shader';

/**
 * Initiates a buffer
 * @param {WebGLRenderingContext} gl the WebGL context
 * @param {Float32Array} data the data
 */
function initBuffer(gl, data) {
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return buffer;
}

/**
 * Converts degrees
 * @param {number} deg the degrees to convert
 */
function rad(deg) {
    return deg * Math.PI / 180;
}

function registerKeyboardEvent(keyCode, func) {
    window.addEventListener('keydown', (e) => {
        if (e.code == keyCode) func();
    });
}

export { initBuffer, rad, registerKeyboardEvent };