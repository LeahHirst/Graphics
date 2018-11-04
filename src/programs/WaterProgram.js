import Program from './Program';

class WaterProgram extends Program {

    predraw(camera, time) {
        super.predraw(camera, time);

        this.gl.useProgram(this.program);
        this.gl.uniform1f(this.uniform('uWaveOffset'), (time % 6) / 6);
        this.gl.uniform1f(this.uniform('uWaveHeight'), .3);
        this.gl.useProgram(null);
    }

}

export default WaterProgram;