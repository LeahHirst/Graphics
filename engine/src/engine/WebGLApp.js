/**
 * (c) Adam Hirst 2018
 * Last modified: 6/11/2018
 */

export default class WebGLApp {

    /**
     * Creates a new WebGLApp
     * @param {string} canvasId the ID of the canvas element
     * @param {object} opts the options to initiate the app with
     */
    constructor(canvasId, opts = {}) {
        /**
         * @type {HTMLCanvasElement} canvas - the canvas element on the page
         */
        this.canvas = document.getElementById(canvasId);
        if (this.canvas == undefined) throw new Error('Could not find the canvas with ID "' + canvasId + '"');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        /**
         * @type {Controller} controllers - the control schemes
         */
        this.controllers = [];
        this.actions = {};

        /**
         * @type {WebGLRenderingContext} gl - the WebGL rendering context
         */
        this.gl = this.canvas.getContext('webgl');
        if (this.gl == undefined) throw new Error('Could not get the WebGL rendering context. Does this browser support WebGL?');

        this.gl.enable(this.gl.DEPTH_TEST);

        // Start drawing
        this.update(performance.now());
    }

    /**
     * Sets the active scene
     * @param {Scene} scene the scene to set
     */
    setScene(scene) {
        this.scene = scene;
    }

    initWebGL(preserveDrawingBuffer) {
        this.gl = this.canvas.getContext();
    }

    /**
     * Registers a control scheme
     * @param {Controller} controller 
     */
    registerController(controller) {
        controller.app
        this.controllers.push(controller);
    }

    /**
     * Registers an action
     * @param {string} name the name of the action
     * @param {function} event the event function
     * @param {number} timeout the timeout of the action
     */
    addAction(name, event, timeout = 100) {
        this.actions[name] = {
            e: event,
            timeout: timeout,
            lastCall: -1
        };
    }

    /**
     * Fires an action by its name
     * @param {string} name the name of the action
     */
    fireAction(name) {
        if (this.actions[name] != undefined) {
            // Check timeout conditions before calling
            const lc = this.actions[name].lastCall,
                  to = this.actions[name].timeout,
                  ct = performance.now();
            
            if (ct - lc > to) {
                this.actions[name].e();
                this.actions[name].lastCall = ct;
            }
        }
    }

    /**
     * Draws a new frame
     * @param {DOMHighResTimeStamp} t the current time 
     */
    update(t) {
        // Update controls
        this.controllers.forEach(controller => {
            controller.update(this);
        });
        // Draw scene
        if (this.scene != undefined) {
            this.scene.draw(t);
        }
        requestAnimationFrame(this.update.bind(this));
    }

}