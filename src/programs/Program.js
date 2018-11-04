import Shader from '../Shader';
import { mat4 } from 'gl-matrix';
import { rad } from '../utils';

class Program {

    /**
     * Construct a new program
     * @param {WebGLRenderingContext} gl the WebGL rendering context
     * @param {object} shaderSource contains fragment and vertex source
     */
    constructor(gl, shaderSource) {
        this.gl = gl;
        this.program = gl.createProgram();

        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        // Load and attach shaders
        let fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, shaderSource.fragment);
        let vertexShader = new Shader(gl, gl.VERTEX_SHADER, shaderSource.vertex);

        gl.attachShader(this.program, fragmentShader.shader);
        gl.attachShader(this.program, vertexShader.shader);

        // Link the program
        gl.linkProgram(this.program);

        // Print any errors
        let programLog = gl.getProgramInfoLog(this.program);
        if (programLog) console.log(programLog);
    }

    /**
     * returns the location of an attribute
     * @param {string} id the id of the attribute
     */
    attrib(id) {
        return this.gl.getAttribLocation(this.program, id);
    }

    /**
     * returns the location of a uniform
     * @param {string} id the id of the uniform
     */
    uniform(id) {
        return this.gl.getUniformLocation(this.program, id);
    }

    predraw(camera, time = 0) {
        this.gl.useProgram(this.program);

        let aspectRatio = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
        let projection = mat4.create();
        mat4.perspective(projection, rad(30), aspectRatio, 0.1, 1000);

        let model = mat4.create();

        this.gl.uniformMatrix4fv(this.uniform('uProjectionMatrix'), false, projection);
        this.gl.uniformMatrix4fv(this.uniform('uNormalMatrix'), false, model);
        this.gl.uniformMatrix4fv(this.uniform('uModelViewMatrix'), false, camera.getView());
        
        this.gl.useProgram(null);
    }

}

export default Program;