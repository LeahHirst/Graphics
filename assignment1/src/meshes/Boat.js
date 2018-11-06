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

    draw(stack, time = 0) {
        let position = vec3.create();
        vec3.add(position, this.position, this.velocity);
        this.position = position;
        
        // Apply friction value
        let velocity = vec3.create();
        vec3.scale(velocity, this.velocity, this.friction);
        this.velocity = velocity;

        function heightAtPos(x, z) {
            return .3 * (Math.sin((time % 6) / 3 * Math.PI + (x + z)/2) - Math.cos((time % 6) / 3 * Math.PI + (x - z)/2));
        }

        // Calculate height
        let x = this.position[0], z = this.position[2];
        let h = heightAtPos(x, z);
        this.position[1] = h + .3;

        // Calculate rotation
        let hX = heightAtPos(x + 1, z);
        let hZ = heightAtPos(x, z + 1);
        this.rotation[0] = -Math.asin(h - hX);
        this.rotation[2] = -Math.asin(h - hZ);

        let rotate = this.rotation[1];

        super.draw(stack, time);

        stack.push();

        stack.translate(this.position);
        stack.rotate(this.rotation[0], [1, 0, 0]);
        stack.rotate(this.rotation[1], [0, 1, 0]);
        stack.rotate(this.rotation[2], [0, 0, 1]);

        // Translate oars into position
        x = 0.65;
        let y = 0.6;
        z = 0.14;
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