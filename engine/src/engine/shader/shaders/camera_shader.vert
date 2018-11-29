attribute vec3 aVertexPosition;

uniform mat4 uModelViewMatrix, uProjectionMatrix, uLightModelViewMatrix, uLightProjectionMatrix;

const mat4 texUnitConverter = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 
0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0);

varying vec4 vShadowPos;

void main() { 
    vec4 position_h = vec4(aVertexPosition, 1.0);

    gl_Position = uProjectionMatrix * uModelViewMatrix * position_h;

    vShadowPos = texUnitConverter * uLightProjectionMatrix * uLightModelViewMatrix * position_h;
}