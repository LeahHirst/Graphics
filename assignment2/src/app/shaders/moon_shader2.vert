// Vertex attributes
attribute vec3 aVertexPosition;
attribute vec2 aNormalCoord; // Coordinates for large normal map
attribute vec2 aSmallNormalCoord; // Coordinates for small normal map (rocks etc.)

// Uniforms
uniform mat4 uViewMatrix, uModelMatrix, uProjectionMatrix;
uniform mat3 uNormalMatrix;
uniform sampler2D uHeightMap;
uniform sampler2D uNormalMap;

// Outputs
varying vec3 vVertPos;
varying vec3 vTransformedNormal;
varying vec2 vNormalCoord;
varying vec2 vTextureCoord;

// Options
const float maxHeight = 5.0;

void main()
{
    // Get the height of this vertex from the heightmap
    float height = texture2D(uHeightMap, aNormalCoord).r * maxHeight;
    // Get the normal from the normal map
    highp vec3 normal = texture2D(uNormalMap, aNormalCoord).rgb;

    // Set the height
    vec3 position = vec3(aVertexPosition.x, height, aVertexPosition.z);

    // Get the homogenous position
	vec4 position_h = vec4(position, 1.0);

    // Calculate the model view matrix
	mat4 modelView = uModelMatrix * uViewMatrix;

    // Define the vertex position
	gl_Position = uProjectionMatrix * modelView * position_h;
	
    // Pass the normal map coordinate
    vNormalCoord = aSmallNormalCoord;
    vTextureCoord = aNormalCoord;
    // Calculate the transformed normal
    vTransformedNormal = normalize(uNormalMatrix * normal);
    // Define the transformed vertex position
    vVertPos = (position_h * modelView).xyz;
}