import Mesh from "../../engine/mesh/Mesh";

export default class MoonSurface extends Mesh {

    constructor(gl, program) {
        let geometry = MoonSurface.generateModel();
        super(gl, program, geometry);
    }

    static getVert(x, z) {
        return [ x, 0, z ];
    }

    static generateModel(size = 200, scale = 1) {

        let texFactor = 1/1024;

        let vertices = [];
        let texcoords = [];
        let texcoords2 = [];
        let indices = [];

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let s = scale;
                let sPos = -(size*scale/2);
                let x = i * s;
                let z = j * s;

                for (let k = 0; k < 6; k++) {
                    let tX = x;
                    let tZ = z;
                    let nX = 0;
                    let nZ = 0;

                    if (k % 2 == 1) {
                        tX += s;
                        nX = 1;
                    }

                    if (k == 0 || k == 1 || k == 3) {
                        tZ += s;
                        nZ = 1;
                    }

                    vertices.push(MoonSurface.getVert(sPos + tX, sPos + tZ));
                    texcoords.push([ (tX / (size*s)), (tZ / (size*s)) ]);
                    texcoords2.push([ nX, nZ ]);
                    indices.push(indices.length+1);
                }
            }
        }

        return {
            aVertexPosition: vertices,
            aNormalCoord: texcoords,
            aSmallNormalCoord: texcoords2,
            indices: indices
        }

    }

}