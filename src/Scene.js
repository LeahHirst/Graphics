import { mat4, vec3, mat3 } from 'gl-matrix';
import Camera from './Camera';
import { rad } from './utils';
import MatrixStack from './MatrixStack';

class Scene {

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

    draw(time) {
        // Clear display
        this.gl.clearColor(0.152941176470588, 0.454901960784314, 0.411764705882353, 1.0);
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

}

export default Scene;