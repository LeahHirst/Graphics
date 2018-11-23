export default class Controller {

    constructor() {
        this.events = [];
    }

    on(eventName, actionName) {
        this.events[eventName] = actionName;
    }

    onStateChange(listener) {
        this.onChange = listener;
    }

    /**
     * Returns the state of an event name. 
     * Overriden in inherited classes
     * @param {*} eventName 
     */
    getState(eventName) {
        return false;
    }

    update(app) {
        Object.keys(this.events).forEach(e => {
            if (e != undefined && this.getState(e)) {
                app.fireAction(this.events[e]);
            }
        });
    }

}