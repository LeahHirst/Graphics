precision mediump float;
varying vec3 vVertPos;
varying vec3 vTransformedNormal;
varying vec2 vNormalCoord;
varying vec2 vTextureCoord;

uniform sampler2D uTexture;
uniform sampler2D uRockNormalMap;

// Constants
const vec3 lightDirection = vec3(5.0,10.0,5.0);
const float lightPower = 2.0;
const vec3 lightColor = vec3(1.0, 1.0, 1.0);
const float ambientIntensity = 0.2;
const float diffuseIntensity = 0.8;
const vec3 specColor = vec3(0.8, 0.8, 0.8);
const float shininess = 12.0;

void main()
{
    // Get the texel color
    highp vec4 texelColor = texture2D(uTexture, vTextureCoord);
    // Get the normal map
    highp vec3 normalMap = texture2D(uRockNormalMap, vNormalCoord).rgb * 2.0 - 1.0;

    vec3 L = normalize(lightDirection);
    vec3 N = normalize(vTransformedNormal) * normalize(normalMap);

        // Calculate ambient light component
    vec3 ambient = texelColor.rgb * ambientIntensity;
    
    // Calculate the diffuse light component
    vec3 diffuse = max(dot(N, L), 0.0) * texelColor.rgb * diffuseIntensity;

    // Calculate the specular light component using Blinn-Phong
    vec3 V = normalize(-vVertPos);
    vec3 R = reflect(-L, N);
    vec3 specular = pow(max(dot(R, V), 0.0), shininess) * specColor;

    // output the calculated frag colour
    gl_FragColor = vec4(ambient + diffuse + specular, 1.0);
}