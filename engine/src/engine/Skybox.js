import { Program } from ".";
import skyboxFrag from './shader/shaders/skybox.frag';
import skyboxVert from './shader/shaders/skybox.vert';
import skyboxObj from './skybox.obj';
import Mesh from "./mesh/Mesh";
import MeshLoader from "./mesh/ModelLoader";
import { vec3 } from "gl-matrix";

export default class Skybox extends Mesh {

    constructor(gl, texture, scale = 200) {
        let cube = MeshLoader.getModel(skyboxObj);
        let program = new Program(gl, { fragment: skyboxFrag, vertex: skyboxVert });
        super(gl, program, { aVertexPosition: cube.aVertexPosition, aTextureCoord: cube.aTextureCoord, indices: cube.indices });

        this.scale = vec3.fromValues(scale, scale, scale);

        this.enableSampler('uSampler', texture);
    }

}