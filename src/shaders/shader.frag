#version 300 es

precision mediump float;
in vec2 vTextureCoord;
in vec3 vLighting;

out vec4 outputColor;
uniform sampler2D uSampler;

void main()
{
	highp vec4 texelColor = texture(uSampler, vTextureCoord);

	outputColor = vec4(texelColor.rgb * vLighting, texelColor.a);
}

