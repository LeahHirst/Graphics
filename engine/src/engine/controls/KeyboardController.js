import Controller from './Controller';

export default class KeyboardController extends Controller {

    constructor() {
        super();

        this.keyStates = {};

        // Add event listeners
        window.addEventListener('keydown', this.keypress.bind(this));
        window.addEventListener('keyup', this.keyup.bind(this));
    }

    getState(e) {
        return this.keyStates[e];
    }

    keypress(e) {
        this.keyStates[e.code] = true;
    }

    keyup(e) {
        this.keyStates[e.code] = false;
    }

}