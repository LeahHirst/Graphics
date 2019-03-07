precision mediump float;
varying vec2 vTextureCoord;
varying vec3 vVertPos;
varying vec3 vTransformedNormal;

uniform sampler2D uSampler;
uniform sampler2D uNormalMap;

uniform int uLightMode;
uniform int uNormMode;

// Constants
const vec3 lightPosition = vec3(0.0,10.0,5.0);
const float lightPower = 2.0;
const vec3 lightColor = vec3(1.0, 1.0, 1.0);
const vec3 ambientColor = vec3(0.1, 0.1, 0.1);
const vec3 diffuseColor = vec3(0.5, 0.5, 0.5);
const vec3 specColor = vec3(0.8, 0.8, 0.8);
const float shininess = 12.0;

void main()
{
	highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
    highp vec4 normalMap = texture2D(uNormalMap, vTextureCoord);

    vec3 normalMapTrans = normalMap.rgb * 2.0 - 1.0;

    vec3 N = normalize(vTransformedNormal * normalMapTrans); // Normal
    vec3 L = lightPosition - vVertPos; // Light direction

    if (uNormMode > 0) N = normalize(vTransformedNormal);
    
    // Normalize light direction
    L = normalize(L);

    float lambertian = max(dot(L, N), 0.0);
    float specular = 0.0;

    if (lambertian > 0.0) {

        vec3 V = normalize(-vVertPos); // View direction
        vec3 H = normalize(L + V);      // Half direction
        float S = max(dot(H, N), 0.0); // Specular angle

        specular = pow(S, shininess);
        
    }

    if (uLightMode == 1) { lambertian = 0.0; }
    if (uLightMode == 1 || uLightMode == 2) { specular = 0.0; }

    vec3 color = texelColor.rgb * ambientColor +
                 texelColor.rgb * diffuseColor * lambertian * lightColor * lightPower +
                 texelColor.rgb * specColor * specular * lightColor * lightPower;

    gl_FragColor = vec4(color, 1.0);
}