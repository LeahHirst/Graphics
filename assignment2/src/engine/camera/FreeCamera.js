import { vec3, mat4, quat } from 'gl-matrix';
import { rad } from '../util/MathUtils';

export default class FreeCamera {

    /**
     * Construct a new instance of Camera
     */
    constructor(nearDepth = 0.1, farDepth = 1000, fieldOfView = rad(30), moveSpeed = 0.5, panSpeed = rad(2)) {
        this.nearDepth = nearDepth;
        this.farDepth = farDepth;
        this.fieldOfView = fieldOfView;
        this.moveSpeed = moveSpeed;
        this.panSpeed = panSpeed;

        // The position of the camera
        this.position = vec3.fromValues(5, 3, 5);
        // The rotation of the camera
        this.rotation = vec3.fromValues(0, 0, 0);
    }

    /**
     * Sets the position of the camera
     * @param {vec3} position the position to set the camera to
     */
    setPosition(position) {
        this.position = position;
    }

    /**
     * Gets the view
     */
    getView() {
        let up = vec3.fromValues(0, 1, 0);
        let view = mat4.create();
        mat4.rotateX(view, view, this.rotation[0]);
        mat4.rotateY(view, view, this.rotation[1]);
        mat4.rotateZ(view, view, this.rotation[2]);
        mat4.translate(view, view, this.position);
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

    moveForward() {
        let rX = this.rotation.x; // Rotation in X (left/right)
        let rY = this.rotation.y; // Rotation in Y (up/down)
    
        let dY = this.moveSpeed * Math.sin(rX); // Delta Y
        let H  = this.moveSpeed * Math.cos(rX); // Movement distance in XZ plane
    
        let dX = H * Math.sin(-rY); // Delta X
        let dZ = H * Math.cos(rY); // Delta Z
    
        // Update camera position
        this.position.y += dY;
        this.position.x += dX;
        this.position.z += dZ;
    }

    moveBackwards() {
        let rX = this.rotation.x; // Rotation in X (left/right)
        let rY = this.rotation.y; // Rotation in Y (up/down)

        let dY = this.moveSpeed * Math.sin(rX); // Delta Y
        let H  = this.moveSpeed * Math.cos(rX); // Movement distance in XZ plane

        let dX = H * Math.sin(-rY); // Delta X
        let dZ = H * Math.cos(rY); // Delta Z

        this.position[1] -= dY;
        this.position[0] -= dX;
        this.position[2] -= dZ;
    }

    moveLeft() {
        let rY = this.rotation.y;
        this.position.z += this.moveSpeed * Math.cos(rY - Math.PI/2);
        this.position.x -= this.moveSpeed * Math.sin(rY - Math.PI/2);
    }

    moveRight() {
        let rY = this.rotation.y;
        this.position.z += this.moveSpeed * Math.cos(rY + Math.PI/2);
        this.position.x -= this.moveSpeed *  Math.sin(rY + Math.PI/2);
    }

    panUp() {
        this.rotation.x -= this.panSpeed;
    }

    panDown() {
        this.rotation.x += this.panSpeed;
    }

    panLeft() {
        this.rotation.y -= this.panSpeed;
    }

    panRight() {
        this.rotation.y += this.panSpeed;
    }

}