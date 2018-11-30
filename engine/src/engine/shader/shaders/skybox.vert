// Vertex attributes
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

// Uniforms
uniform mat4 uNormalMatrix, uModelViewMatrix, uProjectionMatrix, uTranslationMatrix;

// Outputs
varying vec2 vTextureCoord;

void main()
{
	vec4 position_h = vec4(aVertexPosition, 1.0);
	
	// Define the vertex position
	gl_Position = uProjectionMatrix * uModelViewMatrix * uNormalMatrix * uTranslationMatrix * position_h;

	vTextureCoord = aTextureCoord;
}