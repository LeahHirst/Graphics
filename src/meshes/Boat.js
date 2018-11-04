import Mesh from './Mesh';
import rawMesh from './raw_meshes/boat';
import texture from './textures/lighthouse.png';
import Oar from './Oar';
import { vec3 } from 'gl-matrix';
import { rad } from '../utils';

class Boat extends Mesh {

    constructor(gl, program) {
        super(gl, program, rawMesh, texture);

        this.leftOar = new Oar(gl, program, true);
        this.rightOar = new Oar(gl, program);

        this.animationLength = 2;
        this.animationRunning = false;
        this.animationState = 0;
        this.animationStateActive = 0;
        this.animationOffset = 0;
        this.animationValue = 0;
        this.animationPValue = 0;

        this.velocity = vec3.create();
        this.friction = 0.95;
    }

    draw(stack, time) {
        let position = vec3.create();
        vec3.add(position, this.position, this.velocity);
        this.position = position;
        
        // Apply friction value
        let velocity = vec3.create();
        vec3.scale(velocity, this.velocity, this.friction);
        this.velocity = velocity;

        super.draw(stack, time);

        stack.push();

        stack.translate(this.position);
        stack.rotate(this.rotation[0], [1, 0, 0]);
        stack.rotate(this.rotation[1], [0, 1, 0]);
        stack.rotate(this.rotation[2], [0, 0, 1]);

        // Translate oars into position
        let x = 0.65;
        let y = 0.6;
        let z = 0.14;
        let rY = rad(90);

        // Left oar
        stack.push();
        stack.translate(vec3.fromValues(-x, y, z));
        stack.rotate(-rY, vec3.fromValues(0, 1, 0));
        this.leftOar.draw(stack);
        stack.pop();
        
        // Right oar
        stack.push();
        stack.translate(vec3.fromValues(x, y, z));
        stack.rotate(rY, vec3.fromValues(0, 1, 0));
        this.rightOar.draw(stack);
        stack.pop();

        stack.pop();
    }

    setAnimationState(state) {
        this.animationState = state;
        if (!this.animationRunning) {
            this.animationStateActive = state;
        }
        if (state != 0) this.animationRunning = true;

    }

    setAnimationFrame(frame) {
        this.leftOar.setAnimationFrame(frame);
        this.rightOar.setAnimationFrame(frame);
    }

}

export default Boat;