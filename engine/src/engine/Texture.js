export default class Texture {

    /**
     * Create a new texture instance
     * @param {WebGLRenderingContext} gl the WebGL rendering context
     * @param {string} imageUrl the url of the texture
     */
    constructor(gl, imageUrl) {
        this.gl = gl;

        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        // Load the image
        this.image = new Image();
        this.image.onload = this.imageCallback.bind(this);
        this.image.src = imageUrl;
    }

    /**
     * Called when an image has loaded
     */
    imageCallback() {
        // Bind the texture
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.image);
        this.gl.generateMipmap(this.gl.TEXTURE_2D);

        let w = this.image.width;
        let h = this.image.height;

        if ((w & (w-1)) == 0 && (h & (h-1)) == 0) {
            this.gl.generateMipmap(this.gl.TEXTURE_2D);
        } else {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        }
    }

}