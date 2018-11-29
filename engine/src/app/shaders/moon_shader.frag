precision mediump float;
varying vec3 vVertPos;
varying vec3 vTransformedNormal;
varying vec2 vNormalCoord;
varying vec2 vTextureCoord;

uniform sampler2D uRockNormalMap;
uniform sampler2D uTexture;

// Constants
const vec3 materialColor = vec3(0.6, 0.6, 0.6);
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
    highp vec4 textureMap = texture2D(uTexture, vTextureCoord);

    vec3 normalMapTrans = normalMap.rgb * 2.0 - 1.0;

    normalMapTrans *= vec3(1.0/gl_FragCoord.z, 1.0/gl_FragCoord.z, 1.0/gl_FragCoord.z);
    vec3 N = normalize(vTransformedNormal) * normalize(normalMapTrans); // Normal
    vec3 L = lightPosition - vVertPos; // Light direction
    
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

    vec3 color = textureMap.rgb * ambientColor +
                 textureMap.rgb * diffuseColor * lambertian * lightColor * lightPower +
                 textureMap.rgb * specColor * specular * lightColor * lightPower;

    gl_FragColor = vec4(color, 1.0);
}