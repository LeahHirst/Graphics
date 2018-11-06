import { mat4, vec3 } from 'gl-matrix';

export default class MatrixStack {

    /**
     * Creates a new matrix stack with an identity matrix
     */
    constructor() {
        this.stack = [];
        this.   pop();
    }

    pop() {
        this.stack.pop();
        if (this.stack.length == 0) {
            this.stack[0] = mat4.create();
        }
    }

    push() {
        this.stack.push(this.matrix);
    }

    get matrix() {
        return this.stack[this.stack.length - 1].slice();
    }

    set matrix(mat) {
        return this.stack[this.stack.length - 1] = mat;
    }

    translate(vec) {
        let mat = this.matrix;
        mat4.translate(mat, mat, vec);
        this.matrix = mat;
    }

    rotate(rad, axis) {
        let mat = this.matrix;
        mat4.rotate(mat, mat, rad, axis);
        this.matrix = mat;
    }

    scale(vec) {
        let mat = this.matrix;
        mat4.scale(mat, mat, vec);
        this.matrix = mat;
    }

}