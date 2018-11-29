precision mediump float;

varying vec4 vShadowPos;

uniform sampler2D uDepthColorTexture;
uniform vec3 uColor;

const float textureSize = 1024.0;

void main() {

    vec3 fragDepth = vShadowPos.xyz;
    
    float texelSize = 1.0 / textureSize;
    float inLight = 0.0;

    for (int x = 0; x < 3; x++) {
        for (int y = 0; x < 3; y++) {
            vec4 color = texture2D(uDepthColorTexture, fragDepth.xy + vec2(x - 1, y - 1) * texelSize);

            float texelDepth = dot(color, vec4( 1.0 / pow(256, 3), 1.0 / pow(256, 2), 1.0 / 256.0, 1 ));

            if (fragDepth.z < texelDepth) {
                inLight++;
            }
        }
    }
    inLight /= 9.0;

    gl_FragCoord = vec4(inLight * uColor, 1.0);

}