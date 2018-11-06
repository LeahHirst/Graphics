class Shader {

    constructor(gl, type, source) {
        // Initialize shader
        this.shader = gl.createShader(type);
        gl.shaderSource(this.shader, source);
        gl.compileShader(this.shader);

        // Display any errors
        let shaderInfo = gl.getShaderInfoLog(this.shader);
        if (shaderInfo) console.log(shaderInfo);
    }

}

export default Shader;