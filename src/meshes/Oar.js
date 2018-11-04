import Mesh from './Mesh';
import rawMesh from './raw_meshes/oar';
import texture from './textures/lighthouse.png';
import { rad } from '../utils';
import { vec3 } from 'gl-matrix';

class Oar extends Mesh {

    constructor(gl, program, invertAnimation = false) {
        super(gl, program, rawMesh, texture);

        this.invertAnimation = invertAnimation;
    }

    setAnimationFrame(frame) {
        const rXVar = rad(15);
        const rYVar = rad(45);
        const rZVar = rad(40);

        const x = frame*2*Math.PI;

        let rX = rXVar * (1-Math.cos(x));
        let rY = rYVar * Math.sin(x);
        let rZ = rZVar * (1-Math.cos(x));

        if (this.invertAnimation) rY = -rY;
        if (!this.invertAnimation) rZ = -rZ;

        this.rotation = vec3.fromValues(rX, rY, rZ);
    }

}

export default Oar;