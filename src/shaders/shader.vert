#version 300 es

// Vertex attributes
layout(location = 0) in vec3 aVertexPosition;
layout(location = 1) in vec3 aVertexNormal;
layout(location = 2) in vec2 aTextureCoord;

// Uniforms
uniform mat4 uNormalMatrix, uModelViewMatrix, uProjectionMatrix, uTranslationMatrix;

// Outputs
out vec2 vTextureCoord;
out vec3 vLighting;

void main()
{
	vec4 position_h = vec4(aVertexPosition, 1.0);
	
	// Define the vertex position
	gl_Position = uProjectionMatrix * uModelViewMatrix * uNormalMatrix * uTranslationMatrix * position_h;

	vTextureCoord = aTextureCoord;

	// Apply lighting effect
	highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
	highp vec3 directionalLightColor = vec3(1, 1, 1);
	highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

	highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0) * uTranslationMatrix;

	highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
	vLighting = ambientLight + (directionalLightColor * directional);
}