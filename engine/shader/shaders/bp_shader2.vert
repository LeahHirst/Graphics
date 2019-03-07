// Vertex attributes
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

// Uniforms
uniform mat4 uViewMatrix, uModelMatrix, uProjectionMatrix;
uniform mat3 uNormalMatrix;

// Outputs
varying vec2 vTextureCoord;
varying vec3 vVertPos;
varying vec3 vTransformedNormal;

void main()
{
	// Get the homogenous position
	vec4 position_h = vec4(aVertexPosition, 1.0);

	// Calculate the model view matrix
	mat4 modelView = uModelMatrix * uViewMatrix;

	// Define the vertex position
	gl_Position = uProjectionMatrix * modelView * position_h;

	// Pass the texture coord
	vTextureCoord = aTextureCoord;
	// Calculate the transformed normal
	vTransformedNormal = normalize(uNormalMatrix * aVertexNormal);
	// Define the transformed vertex position
	vVertPos = (position_h * modelView).xyz;
}