precision mediump float;

void main() {

    float depth = gl_FragCoord.z;

    const vec4 shift = vec4(
        pow(256, 3),
        pow(256, 2),
        256,
        1.0
    );
    const vec4 mask = vec4(
        0,
        1.0 / 256.0,
        1.0 / 256.0,
        1.0 / 256.0
    )
    vec4 comp = fract( depth * shift );
    
    gl_FragCoord = comp - comp.xxyz * mask;

}