import Mesh from './Mesh';
import { rad } from '../utils';

class Ocean extends Mesh {

    constructor(gl, program, size) {
        let geometry = Ocean.makeGeometry(size);

        super(gl, program, geometry);

        this.gl = gl;
        this.program = program;
        this.size = size;
    }

    static makeGeometry(size) {
        // Generate starting vertex positions
        let vertices = new Float32Array(size * size * 18);
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let index = (i * size + j) * 18;
                vertices[index  ] = i;
                vertices[index+2] = j;

                vertices[index+3] = i+1;
                vertices[index+5] = j;

                vertices[index+6] = i;
                vertices[index+8] = j+1;

                index += 9;
                vertices[index  ] = i+1;
                vertices[index+2] = j;

                vertices[index+3] = i;
                vertices[index+5] = j+1;

                vertices[index+6] = i+1;
                vertices[index+8] = j+1;
            }
        }

        // Starting vertex positions
        let normals = new Float32Array(vertices.length);
        normals = normals.map((x, i) => {
            if (i % 3 == 1) return 1;
            return 0;
        });

        // Starting indices
        let indices = new Float32Array(size * size * 6);
        indices = indices.map((x, i) => i);

        return {
            verts: vertices,
            normals: normals,
            indices: indices
        };
    }

}

export default Ocean;