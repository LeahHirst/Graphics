import { vec3, mat4 } from 'gl-matrix';

class Camera {

    /**
     * Construct a new instance of Camera
     */
    constructor() {
        // The position of the camera
        this.position = vec3.fromValues(20, 10, 20);
        // The position to point the camera at
        this.target = vec3.fromValues(0, 0, 0);
        // The follow delta is used to calculate the camera position if the camera is following an object.
        this.followDelta = vec3.fromValues(10, 20, 10);
    }

    /**
     * Sets the position of the camera
     * @param {vec3} position the position to set the camera to
     */
    setPosition(position) {
        this.position = position;
    }

    /**
     * Set the camera to look at a position
     * @param {vec3} targetPos the position to look at
     */
    lookAt(targetPos) {
        this.target = targetPos;
    }

    /**
     * Gets the view
     */
    getView() {
        if (this.follow != undefined) {
            this.target = this.follow.position;
            let newPos = vec3.create();
            vec3.add(newPos, this.follow.position, this.followDelta);
            this.position = newPos;
        }

        let up = vec3.fromValues(0, 1, 0);
        let view = mat4.create();
        mat4.lookAt(view, this.position, this.target, up);
        return view;
    }

    /**
     * Follow a Mesh
     * @param {Mesh} object 
     */
    follow(object) {
        this.follow = object;
    }

}

export default Camera;