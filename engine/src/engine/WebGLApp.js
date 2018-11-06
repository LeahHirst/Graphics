/**
 * (c) Adam Hirst 2018
 * Last modified: 6/11/2018
 */

export default class WebGLApp {

    /**
     * Creates a new WebGLApp
     * @param {string} canvasId the ID of the canvas element
     */
    constructor(canvasId) {

        /**
         * @type {HTMLCanvasElement} canvas - the canvas element on the page
         */
        this.canvas = document.getElementById(canvasId);

        if (this.canvas == undefined) throw new Error('Could not find the canvas with ID "' + canvasId + '"');

        /**
         * @type {WebGLRenderingContext} gl - the WebGL rendering context
         */
        this.gl = this.canvas.getContext('webgl');

        // Start drawing
        this.draw(performance.now());
    }

    /**
     * Sets the active scene
     * @param {Scene} scene the scene to set
     */
    setScene(scene) {
        this.scene = scene;
    }

    /**
     * 
     * @param {DOMHighResTimeStamp} time 
     */
    draw(time) {
        if (this.scene != undefined) {
            this.scene.draw(time);
        }
        requestAnimationFrame(this.draw);
    }

}