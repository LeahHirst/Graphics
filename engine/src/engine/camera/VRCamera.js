import Camera from './Camera';

export default class VRCamera extends Camera {

    constructor(nearDepth = 0.1, farDepth = 1024.0) {
        super(nearDepth, farDepth);
        
        // Fetch the VR display
        if (navigator.getVRDisplays) {
            navigator.getVRDisplays().then((displays) => {
                if (displays.length > 0) {
                    this.display = displays[displays.length - 1];
                    
                    
                }
            }, (err) => {
                
            });
        } else {
            alert('Your browser does not support WebVR.');
        }
        
    }
    
    getView() {

    }

}