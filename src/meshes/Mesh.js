import { initBuffer } from '../utils';
import Texture from '../Texture';
import { mat4, vec3 } from 'gl-matrix';

/**
 * Mesh class.
 */
class Mesh {

    /**
     * Creates a new mesh
     * @param {WebGLRenderingContext} gl the WebGL context
     * @param {WebGLProgram} program the WebGL program
     * @param {object} model the model (verts, normals and indices)
     * @param {string} textureUrl string of the texture url
     */
    constructor(gl, program, model, textureUrl) {
        this.gl = gl;
        this.program = program;
        this.verts = new Float32Array(model.verts);
        this.normals = new Float32Array(model.normals);
        this.indices = new Float32Array(model.indices);

        this.position = vec3.fromValues(0, 0, 0);
        this.rotation = vec3.fromValues(0, 0, 0);
        this.scale = vec3.fromValues(1, 1, 1);

        if (textureUrl != undefined) {
            this.texcoords = new Float32Array(model.texcoords);
            this.texture = new Texture(gl, textureUrl);
        }

        this.initBuffers();
    }

    /**
     * Initialises mesh buffers
     */
    initBuffers() {
        this.vertexBuffer = initBuffer(this.gl, this.verts);
        this.normalsBuffer = initBuffer(this.gl, this.normals);
        if (this.texcoords != undefined)
            this.texcoordsBuffer = initBuffer(this.gl, this.texcoords);
    }

    /**
     * Adds this mesh to a scene
     * @param {Scene} scene 
     */
    addTo(scene) {
        scene.addObject(this);
    }

    /**
     * Draw function
     * @param {stack} MatrixStack
     */
    draw(stack, time) {
        this.gl.useProgram(this.program.program);
        stack.push();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.enableVertexAttribArray(this.program.attrib('aVertexPosition'));
        this.gl.vertexAttribPointer(this.program.attrib('aVertexPosition'),
            3, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalsBuffer);
        this.gl.enableVertexAttribArray(this.program.attrib('aVertexNormal'));
        this.gl.vertexAttribPointer(this.program.attrib('aVertexNormal'), 3, this.gl.FLOAT, false, 0, 0);

        if (this.texcoords != undefined) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordsBuffer);
            this.gl.enableVertexAttribArray(this.program.attrib('aTextureCoord'));
            this.gl.vertexAttribPointer(this.program.attrib('aTextureCoord'), 2, this.gl.FLOAT, false, 0, 0);
        }

        let matrix = mat4.create();

        // Apply transformations
        mat4.multiply(matrix, matrix, stack.matrix);
        mat4.translate(matrix, matrix, this.position);
        mat4.scale(matrix, matrix, this.scale);

        mat4.rotate(matrix, matrix, this.rotation[0], [1, 0, 0]);
        mat4.rotate(matrix, matrix, this.rotation[1], [0, 1, 0]);
        mat4.rotate(matrix, matrix, this.rotation[2], [0, 0, 1]);

        this.gl.uniformMatrix4fv(this.program.uniform('uTranslationMatrix'), false, matrix);

        if (this.texcoords != undefined) {
            this.gl.uniform1i(this.program.uniform('uSampler'), 0);
        }

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.indices.length);

        stack.pop();

        this.gl.useProgram(null);
    }

}

export default Mesh;