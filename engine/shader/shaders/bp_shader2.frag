precision mediump float;
varying vec2 vTextureCoord;
varying vec3 vVertPos;
varying vec3 vTransformedNormal;

uniform sampler2D uSampler;
uniform sampler2D uNormalMap;

// Constants
const vec3 lightDirection = vec3(-5.0,10.0,5.0);
const float lightPower = 2.0;
const vec3 lightColor = vec3(1.0, 1.0, 1.0);
const float ambientIntensity = 0.1;
const float diffuseIntensity = 0.5;
const vec3 specColor = vec3(0.8, 0.8, 0.8);
const float shininess = 12.0;

void main()
{
	highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
    highp vec3 normalMap = texture2D(uNormalMap, vTextureCoord).rgb * 2.0 - 1.0;

    vec3 L = normalize(lightDirection);
    vec3 N = normalize(vTransformedNormal) * normalize(normalMap);

    // Calculate ambient light component
    vec3 ambient = texelColor.rgb * ambientIntensity;
    
    // Calculate the diffuse light component
    vec3 diffuse = max(dot(L, N), 0.0) * texelColor.rgb * diffuseIntensity;

    // Calculate the specular light component using Blinn-Phong
    vec3 V = normalize(-vVertPos);
    vec3 R = reflect(-L, N);
    vec3 specular = pow(max(dot(R, V), 0.0), shininess) * specColor;

    // output the calculated frag colour
    gl_FragColor = vec4(ambient + diffuse + specular, 1.0);
}