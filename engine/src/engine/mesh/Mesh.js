import { initBuffer } from '../util/WebGLUtils';
import { flatten } from '../util/Utils';
import { mat4, vec3 } from 'gl-matrix';
import Texture from '../Texture';

/**
 * Mesh class.
 */
export default class Mesh {

    /**
     * Creates a new mesh
     * @param {WebGLRenderingContext} gl the WebGL context
     * @param {WebGLProgram} program the WebGL program
     * @param {object} model the model (verts, normals and indices)
     * @param {string} textureUrl string of the texture url
     */
    constructor(gl, program, model) {
        this.gl = gl;
        this.program = program;

        this.attributes = [];
        Object.keys(model).forEach((k) => {
            let v = model[k];
            if (k[0] == 'a') {
                this.attributes.push({
                    id: k,
                    dimens: v[0].length,
                    value: new Float32Array(flatten(v))
                });
            }
        });

        this.indices = model.indices;

        this.position = vec3.fromValues(0, 0, 0);
        this.rotation = vec3.fromValues(0, 0, 0);
        this.scale = vec3.fromValues(1, 1, 1);

        this.samplers = [];

        this.buffersInitiated = false;
    }

    /**
     * Initialises mesh buffers
     */
    initBuffers() {
        // Initiate attrib buffers
        this.attributes.forEach(attr => {
            attr.buffer = initBuffer(this.gl, attr.value);
        });

        this.buffersInitiated = true;
    }

    /**
     * Adds this mesh to a scene
     * @param {Scene} scene 
     */
    addTo(scene) {
        scene.addObject(this);
    }

    /**
     * Binds the buffers for this mesh
     */
    bindBuffers() {
        // Initiate buffers if not initiated
        if (!this.buffersInitiated) this.initBuffers();

        this.attributes.forEach(attr => {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attr.buffer);
            this.gl.enableVertexAttribArray(this.program.attrib(attr.id));
            this.gl.vertexAttribPointer(this.program.attrib(attr.id), attr.dimens, this.gl.FLOAT, false, 0, 0);
        });
    }

    /**
     * Sets the uniforms for this mesh
     */
    setUniforms() {
        // Apply the transformation matrix
        const translateMat = this.getTranslationMatrix(this._stack);
        this.gl.uniformMatrix4fv(this.program.uniform('uTranslationMatrix'), false, translateMat);
    }

    /**
     * 
     * @param {*} samplerName 
     * @param {*} imageUrl 
     */
    enableSampler(samplerName, imageUrl) {
        this.samplers.push({
            name: samplerName,
            texture: new Texture(this.gl, imageUrl)
        });
    }

    /**
     * Bind samplers
     */
    bindSamplers() {
        // Bind the samplers
        this.samplers.forEach(sampler => {
            this.gl.uniform1i(this.program.uniform(sampler.name), sampler.texture.index);
        });
    }

    /**
     * Returns the translation matrix for this mesh
     * @param {MatrixStack} stack 
     */
    getTranslationMatrix(stack = new MatrixStack()) {
        let matrix = mat4.create();

        // Translate to current stack position
        mat4.multiply(matrix, matrix, stack.matrix);
        // Translation
        mat4.translate(matrix, matrix, this.position);
        // Scale 
        mat4.scale(matrix, matrix, this.scale);
        // Rotation
        mat4.rotate(matrix, matrix, this.rotation[0], [1, 0, 0]);
        mat4.rotate(matrix, matrix, this.rotation[1], [0, 1, 0]);
        mat4.rotate(matrix, matrix, this.rotation[2], [0, 0, 1]);

        return matrix;
    }

    /**
     * Draw function
     * @param {stack} MatrixStack
     */
    draw(stack, time, maintainProgram = false) {
        if (!maintainProgram) this.gl.useProgram(this.program.program);

        stack.push();

        this._stack = stack;

        this.bindBuffers();
        this.setUniforms();
        this.bindSamplers();

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.indices.length);

        stack.pop();

        if (!maintainProgram) this.gl.useProgram(null);
    }

}