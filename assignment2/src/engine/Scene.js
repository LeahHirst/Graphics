import { mat4, vec3, mat3 } from 'gl-matrix';
import Camera from './camera/Camera';
import { rad } from './util/MathUtils';
import MatrixStack from './MatrixStack';

export default class Scene {

    constructor(gl) {
        this.gl = gl;
        this.programs = [];

        this.camera = new Camera();
        this.objects = [];
    }

    /**
     * Adds an object to the scene
     * @param {Mesh} object 
     */
    addObject(object) {
        if (this.programs.indexOf(object.program) == -1)
            this.programs.push(object.program);
        this.objects.push(object);
    }

    setCamera(camera) {
        this.camera = camera;
    }

    draw(time) {
        // Clear display
        this.gl.clearColor(0, 0, 0, 1.0);
        this.gl.clearDepth(1.0);

        // Create a matrix stack
        let stack = new MatrixStack();

        // Setup display
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        
        this.programs.forEach(program => {
            program.predraw(this.camera, time);
        });

        // Draw objects
        this.objects.forEach(object => {
            object.draw(stack, time);
        });
    }

    addPredrawMap(program) {
        
    }

}