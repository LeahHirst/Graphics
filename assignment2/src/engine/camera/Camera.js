import { vec3, mat4 } from 'gl-matrix';
import { rad } from '../util/MathUtils';

export default class Camera {

    /**
     * Construct a new instance of Camera
     */
    constructor(nearDepth = 0.1, farDepth = 1000, fieldOfView = rad(30)) {
        this.nearDepth = nearDepth;
        this.farDepth = farDepth;
        this.fieldOfView = fieldOfView;

        // The position of the camera
        this.position = vec3.fromValues(5, 3, 5);
        // The position to point the camera at
        this.target = vec3.fromValues(0, 3, 0);
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
        if (this.followObject != undefined) {
            this.target = this.followObject.position;
            let newPos = vec3.create();
            vec3.add(newPos, this.followObject.position, this.followDelta);
            this.position = newPos;
        }

        let up = vec3.fromValues(0, 1, 0);
        let view = mat4.create();
        mat4.lookAt(view, this.position, this.target, up);
        return view;
    }

    /**
     * Returns the projection matrix for the camera
     * @param {number} aspectRatio 
     */
    getProjection(aspectRatio) {
        let projection = mat4.create();
        mat4.perspective(projection, this.fieldOfView, aspectRatio, this.nearDepth, this.farDepth);
        return projection;
    }

    /**
     * Follow a Mesh
     * @param {Mesh} object 
     */
    follow(object) {
        this.followObject = object;
    }

}