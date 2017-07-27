'use strict';

import { Vector3 } from 'three';

function move (v, x, y) {
    moveAcross(v, x);
    moveUp(v, y);
}

function moveAcross (v, x) {
    v.add(new Vector3(1, 0, 0).multiplyScalar(x));
}

function moveUp (v, y) {
    v.add(new Vector3(0, 0, 1).multiplyScalar(y));
}

export function splineToVectorArray (splineArray) {

    let currentPoint = new Vector3(0, 0, 0);
    let splineVec = [];

    splineArray.forEach(p => {
        move(currentPoint, p[0], p[1]);
        splineVec.push(currentPoint.clone());
    });

    return splineVec;
}

export function lathe (
    spline,
    divisions,
    axis,
    capped,
    shapeFill,
    capFill
) {

    IVec[][] splines = new IVec[divisions][spline.length];
    let splines = [];
    // splines[0] = spline;
    splines[0] = spline;
    let rotationInc = Math.PI * 2 / divisions;

    for (let i = 1; i < divisions;i++) {
        for (let j = 0; j < spline.length; j++) {
            splines[i][j] = splines[i-1][j].clone().applyAxisAngle(axis, rotationInc);
        }
    }

    // Generate vertices
    let vertices = [];


        for (let k = 0; k < spline.length; k++) {
            if (k != 0) {
                for (let l = 1; l <= divisions; l++) {
                    let m = l == divisions ? 0 : l;
                    d.sVert(body, splines[m][k]);
                    d.sVert(body, splines[m][k-1]);
                    d.sVert(body, splines[l-1][k-1]);
                    d.sVert(body, splines[l-1][k]);
                }
            }
        }

    // if (capped) {

        // PShape bottom = createShape();
        // PShape top = createShape();

        // top.beginShape();
        //     top.fill(capFill);
        //     for (let n = 0; n < divisions; n++) {
        //         d.sVert(top, splines[n][0]);
        //     }
        // top.endShape();
        // bottom.beginShape();
        //     bottom.fill(capFill);
        //     for (let o = 0; o < divisions; o++) {
        //         d.sVert(bottom, splines[o][spline.length-1]);
        //     }
        // bottom.endShape();
        // shape.addChild(top);
        // shape.addChild(bottom);
    // }

    // shape.addChild(body);

    return vertices;
}


}