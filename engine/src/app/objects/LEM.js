import Mesh from '../../engine/mesh/Mesh';
import texture from '../images/lem.png';
import normalMap from '../images/lem_normal.png';
import obj from './raw/lem.obj';
import MeshLoader from '../../engine/mesh/ModelLoader';

export default class LEM extends Mesh {

    constructor(gl, program) {
        const geometry = MeshLoader.getModel(obj);
        super(gl, program, geometry);

        // Enable samplers
        this.enableSampler('uSampler', texture);
        this.enableSampler('uNormalMap', normalMap);

        this.thrust = 0;
    }

}