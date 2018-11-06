precision mediump float;
varying vec2 vTextureCoord;
varying vec3 vLighting;

uniform sampler2D uSampler;

void main()
{
	highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

	gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
}

