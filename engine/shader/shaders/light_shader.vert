attribute vec3 aVertexPosition;

uniform mat4 uProjectionMatrix, uModelViewMatrix;

void main() {
    vec4 position_h = vec4(aVertexPosition, 1.0); // Get homogeneous position

    gl_Position = uProjectionMatrix * uModelViewMatrix * position_h;
}