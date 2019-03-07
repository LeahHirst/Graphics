
// Vertex attributes
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

// Uniforms
uniform mat4 uNormalMatrix, uModelViewMatrix, uProjectionMatrix, uTranslationMatrix;

// Outputs
varying vec2 vTextureCoord;
varying vec3 vVertPos;
varying vec3 vTransformedNormal;

void main()
{
	vec4 position_h = uTranslationMatrix * vec4(aVertexPosition, 1.0);
	
	// Define the vertex position
	gl_Position = uProjectionMatrix * uModelViewMatrix * uNormalMatrix * position_h;

	vTextureCoord = aTextureCoord;
    vec4 vertPos4 = uModelViewMatrix * position_h;
    vVertPos = vec3(vertPos4) / vertPos4.w;
	vTransformedNormal = vec3(uNormalMatrix * uTranslationMatrix * vec4(aVertexNormal, 1.0));
}