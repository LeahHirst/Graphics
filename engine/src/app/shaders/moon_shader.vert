// Vertex attributes
attribute vec3 aVertexPosition;
attribute vec2 aNormalCoord; // Coordinates for large normal map
attribute vec2 aSmallNormalCoord; // Coordinates for small normal map (rocks etc.)

// Uniforms
uniform mat4 uNormalMatrix, uModelViewMatrix, uProjectionMatrix, uTranslationMatrix;
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
    float height = texture2D(uHeightMap, aNormalCoord).r * maxHeight;
    highp vec4 normal = texture2D(uNormalMap, aNormalCoord);

	vec4 position_h = uTranslationMatrix * vec4(aVertexPosition, 1.0);
    position_h[1] = height;
	
	// Define the vertex position
	gl_Position = uProjectionMatrix * uModelViewMatrix * uNormalMatrix * position_h;

    vec4 vertPos4 = uModelViewMatrix * position_h;
    vNormalCoord = aSmallNormalCoord;
    vTextureCoord = aNormalCoord;
    vVertPos = vec3(vertPos4) / vertPos4.w;
	vTransformedNormal = vec3(uNormalMatrix * uTranslationMatrix * normal);
}