precision mediump float;
varying vec3 vVertPos;
varying vec3 vTransformedNormal;
varying vec2 vNormalCoord;
varying vec2 vTextureCoord;

uniform sampler2D uRockNormalMap;
uniform sampler2D uTexture;

uniform int uLightMode;
uniform highp int uNormMode;

// Constants
vec3 materialColor = vec3(0.6, 0.6, 0.6);
const vec3 lightPosition = vec3(0.0,10.0,5.0);
const float lightPower = 2.0;
const vec3 lightColor = vec3(1.0, 1.0, 1.0);
const vec3 ambientColor = vec3(0.1, 0.1, 0.1);
const vec3 diffuseColor = vec3(0.5, 0.5, 0.5);
const vec3 specColor = vec3(0.7, 0.7, 0.7);
const float shininess = 20.0;

void main()
{
    highp vec4 normalMap = texture2D(uRockNormalMap, vNormalCoord);
    highp vec4 texelColor = texture2D(uTexture, vTextureCoord);

    materialColor = texelColor.rgb;

    vec3 normalMapTrans = normalMap.rgb * 2.0 - 1.0;

    normalMapTrans *= vec3(1.0/gl_FragCoord.z, 1.0/gl_FragCoord.z, 1.0/gl_FragCoord.z);
    vec3 N = normalize(vTransformedNormal) * normalize(normalMapTrans); // Normal
    vec3 L = lightPosition - vVertPos; // Light direction

    if (uNormMode == 1 || uNormMode == 2) { N = normalize(vTransformedNormal); }
    
    // Normalize light direction
    L = normalize(L);

    // Calculate the diffuse component
    float lambertian = max(dot(L, N), 0.0);

    // Calculate the specular component
    vec3 V = normalize(-vVertPos);
    vec3 H = normalize(L + V);
    float S = max(dot(H, N), 0.0);
    float specular = pow(S, shininess);

    if (uLightMode == 1) { lambertian = 0.0; }
    if (uLightMode == 1 || uLightMode == 2) { specular = 0.0; }

    vec3 color = materialColor * ambientColor +
                 materialColor * diffuseColor * lambertian * lightPower +
                 materialColor * specColor * specular * lightColor * lightPower;

    gl_FragColor = vec4(color, 1.0);
}