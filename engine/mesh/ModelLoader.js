/**
 * Adapted from http://kurilo.su/workingprocess/webgl/c
 */

export default class MeshLoader {

    static _parseFace(face) {
        let faceI = face.split('/');
        let index = {v:0, vt:0, vn:0};
        if (faceI.length >= 1){
            index.v = parseInt(faceI[0]-1) || 0;
        }
        if ( faceI.length === 3 ) {
            index.vt = parseInt(faceI[1]-1) || 0;
            index.vn = parseInt(faceI[2]-1) || 0;
        }
        return index;
    }

    static getModel(source) {

        let out = {
            aVertexPosition: [],
            aVertexNormal: [],
            aTextureCoord: [],
            indices: []
        };

        let v = [], vt = [], vn = [], f = [];
        const lines = source.split('\n');

        lines.forEach(line => {
            line = line.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
            line = line.split(' ');

            switch(line[0]) {
                case 'v':
                    if (line.length >= 4) {
                        v.push([parseFloat(line[1]) || 0, parseFloat(line[2]) || 0, parseFloat(line[3]) || 0]);
                    }
                    break;
                case 'vt':
                    if (line.length >= 3) {
                        vt.push([parseFloat(line[1]) || 0, parseFloat(line[2]) || 0]);
                    }
                    break;
                case 'vn':
                    if (line.length >= 4) {
                        vn.push([parseFloat(line[1]) || 0, parseFloat(line[2]) || 0, parseFloat(line[3]) || 0]);
                    }
                    break;
                case 'f':
                    if (line.length === 4) {
                        let f1 = line[1].split('/');
                        let f2 = line[2].split('/');
                        let f3 = line[3].split('/');

                        // Parse faces
                        line.forEach((face, i) => {
                            if (i == 0) return;
                            f.push(MeshLoader._parseFace(face));
                        });
                    }
                    break;
            }
        });

        f.forEach((x, i) => {
            out.indices.push(i);
            out.aVertexPosition.push(v[x.v]);
            out.aVertexNormal.push(vn[x.vn]);
            out.aTextureCoord.push([ vt[x.vt][0], 1 - vt[x.vt][1] ]);
        });

        return out;
    }

}