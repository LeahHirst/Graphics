// Import classes
import Shader from './Shader';
import ShaderBuilder from './ShaderBuilder';

// Import stock shaders
import gourdTextureVertShader from './shaders/shader.vert';
import gourdTextureFragShader from './shaders/shader.frag';
import blinnPhongVertShader from './shaders/bp_shader.vert';
import blinnPhongFragShader from './shaders/bp_shader.frag';

const gourdShader = { vertex: gourdTextureVertShader, fragment: gourdTextureFragShader };
const blinnPhongShader = { vertex: blinnPhongVertShader, fragment: blinnPhongFragShader };

export { Shader, ShaderBuilder, gourdShader, blinnPhongShader };