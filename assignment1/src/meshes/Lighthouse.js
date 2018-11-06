import Mesh from './Mesh';
import rawMesh from './raw_meshes/lighthouse';
import texture from './textures/lighthouse.png';

class Lighthouse extends Mesh {

    constructor(gl, program) {
        super(gl, program, rawMesh, texture);
    }

}

export default Lighthouse;