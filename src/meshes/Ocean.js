import Mesh from './Mesh';
import { rad } from '../utils';
import { mat4, vec3 } from 'gl-matrix';

class Ocean extends Mesh {

    constructor(gl, program, size) {
        let geometry = Ocean.makeGeometry(size);

        super(gl, program, geometry);

        this.gl = gl;
        this.program = program;
        this.size = size;

        this.position = vec3.fromValues(-size/2, 0, -size/2);
    }

    static makeGeometry(size) {
        // Generate starting vertex positions
        let vertices = new Float32Array(size * size * 18);
        for (let x = 0; x < size; x++) {
            for (let z = 0; z < size; z++) {
                let index = (x * size + z) * 18;
                vertices[index  ] = x;
                vertices[index+2] = z;

                vertices[index+3] = x+1;
                vertices[index+5] = z;

                vertices[index+6] = x;
                vertices[index+8] = z+1;

                index += 9;
                vertices[index  ] = x+1;
                vertices[index+2] = z;

                vertices[index+3] = x;
                vertices[index+5] = z+1;

                vertices[index+6] = x+1;
                vertices[index+8] = z+1;
            }
        }

        // Starting vertex positions
        let normals = new Float32Array(vertices.length);
        normals = normals.map((x, i) => {
            if (i % 3 == 1) return 1;
            return 0;
        });

        // Starting indices
        let indices = new Float32Array(size * size * 6 * 2);
        indices = indices.map((x, i) => Math.floor(i/2) % 6);

        return {
            verts: vertices,
            normals: normals,
            indices: indices
        };
    }

    draw(stack, time) {
        this.gl.useProgram(this.program.program);
        stack.push();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.enableVertexAttribArray(this.program.attrib('aVertexPosition'));
        this.gl.vertexAttribPointer(this.program.attrib('aVertexPosition'),
            3, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalsBuffer);
        this.gl.enableVertexAttribArray(this.program.attrib('aVertexNormal'));
        this.gl.vertexAttribPointer(this.program.attrib('aVertexNormal'), 3, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.indicesBuffer);
        this.gl.enableVertexAttribArray(this.program.attrib('aVertexIndices'));
        this.gl.vertexAttribPointer(this.program.attrib('aVertexIndices'), 2, this.gl.FLOAT, false, 0, 0);

        if (this.texcoords != undefined) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordsBuffer);
            this.gl.enableVertexAttribArray(this.program.attrib('aTextureCoord'));
            this.gl.vertexAttribPointer(this.program.attrib('aTextureCoord'), 2, this.gl.FLOAT, false, 0, 0);
        }

        let matrix = mat4.create();

        // Apply transformations
        mat4.multiply(matrix, matrix, stack.matrix);
        mat4.translate(matrix, matrix, this.position);
        mat4.scale(matrix, matrix, this.scale);

        mat4.rotate(matrix, matrix, this.rotation[0], [1, 0, 0]);
        mat4.rotate(matrix, matrix, this.rotation[1], [0, 1, 0]);
        mat4.rotate(matrix, matrix, this.rotation[2], [0, 0, 1]);

        this.gl.uniformMatrix4fv(this.program.uniform('uTranslationMatrix'), false, matrix);

        if (this.texcoords != undefined) {
            this.gl.uniform1i(this.program.uniform('uSampler'), 0);
        }

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.indices.length / 2);

        stack.pop();

        this.gl.useProgram(null);
    }
}

export default Ocean;