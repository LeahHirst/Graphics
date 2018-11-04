#version 300 es

precision mediump float;
in vec3 vLighting;
in vec3 vColor;

out vec4 outputColor;

void main()
{
	outputColor = vec4(vColor * vLighting, 1.0);
}

