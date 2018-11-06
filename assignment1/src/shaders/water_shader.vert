
// Vertex attributes
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aVertexIndices;

// Uniforms
uniform mat4 uNormalMatrix, uModelViewMatrix, uProjectionMatrix, uTranslationMatrix;
uniform float uWaveOffset, uWaveHeight;

// Outputs
varying vec3 vLighting;
varying vec3 vColor;

// Consts
const float PI = 3.1415926535897932384626433832795;
const float TAU = PI * 2.0; // TAU > PI

vec3 calculateNormal(vec3 v0, vec3 v1, vec3 v2) {
	return normalize(cross(v1 - v0, v2 - v0));
}

float calculateYPosition(float x, float z) {
	return uWaveHeight * (sin(uWaveOffset * TAU + (x + z)/2.0) - cos(uWaveOffset * TAU + (x - z)/2.0));
}

void main()
{
	float x = aVertexPosition[0];
	float z = aVertexPosition[2];

	vec4 position_h = vec4(aVertexPosition.x, calculateYPosition(x, z), aVertexPosition.z, 1.0);

	// Recalculate normal
	// Find the other vertices in this triangle
	int i = int(aVertexIndices[0]);
	float dX1, dZ1, dX2, dZ2;
	if (i == 0) { dZ1++; dX2++; }
	if (i == 1) { dX2--; dX1--; dZ1++; }
	if (i == 2) { dZ1--; dX2++; dZ2--; }
	if (i == 3) { dZ1++; dX2--; dZ2++; }
	if (i == 4) { dX2++; dX1++; dZ1--; }
	if (i == 5) { dX2--; dZ1--; }

	vec3 v1 = vec3(x + dX1, calculateYPosition(x + dX1, z + dZ1), z + dZ1);
	vec3 v2 = vec3(x + dX2, calculateYPosition(x + dX2, z + dZ2), z + dZ2);

	vec3 normal;
	if      (i == 0) normal = calculateNormal(position_h.xyz, v1, v2);
	else if (i == 5) normal = calculateNormal(position_h.xyz, v1, v2);
	else 		     normal = calculateNormal(v1, position_h.xyz, v2);
	
	// Define the vertex position
	gl_Position = uProjectionMatrix * uModelViewMatrix * uNormalMatrix * uTranslationMatrix * position_h;

	// Apply lighting effect
	highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
	highp vec3 directionalLightColor = vec3(1, 1, 1);
	highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

	highp vec4 transformedNormal = uNormalMatrix * vec4(normal, 1.0);

	highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
	vLighting = ambientLight + (directionalLightColor * directional);

    vColor = vec3(0.13, 0.59, 0.95);
}