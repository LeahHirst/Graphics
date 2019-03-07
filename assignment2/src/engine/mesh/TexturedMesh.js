import Mesh from './Mesh';
import Texture from '../Texture';
import { initBuffer } from '../util/WebGLUtils';

export default class TexturedMesh extends Mesh {

    constructor(gl, program, model, textureUrl) {
        super(gl, program, model);

        this.texcoords = new Float32Array(model.texcoords);
        this.texture = new Texture(gl, textureUrl);
    }

    /**
     * Initialises mesh buffers
     */
    initBuffers() {
        super.initBuffers();

        // Initiate texcoords buffer
        this.texcoordsBuffer = initBuffer(this.gl, this.texcoords);
    }

    /**
     * Binds the buffers for this mesh
     */
    bindBuffers() {
        super.bindBuffers();

        // Bind texture buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordsBuffer);
        this.gl.enableVertexAttribArray(this.program.attrib('aTextureCoord'));
        this.gl.vertexAttribPointer(this.program.attrib('aTextureCoord'), 2, this.gl.FLOAT, false, 0, 0);
    }

    /**
     * Sets the uniforms for this mesh
     */
    setUniforms(stack) {
        super.setUniforms(stack);

        // Set texture sample
        this.gl.uniform1i(this.program.uniform('uSampler'), this.texture.index);
    }

}