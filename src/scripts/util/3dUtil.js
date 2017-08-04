'use strict';

import { Vector3, Geometry, BufferGeometry, BufferAttribute } from 'three';

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
    shapeFill = 0xff0000,
    capFill = 0x00ff00
) {

    let splines = [];
    splines[0] = spline;
    let rotationInc = Math.PI * 2 / divisions;

    for (let i = 1; i < divisions;i++) {
        splines[i] = [];
        for (let j = 0; j < spline.length; j++) {
            splines[i][j] = splines[i-1][j].clone().applyAxisAngle(axis, rotationInc);
        }
    }

    let geometry = new BufferGeometry({ flat: true });

    let vertices = splines.reduce((a, b) => a.concat(b)).map(v => [v.x, v.y, v.z]).reduce((a, b) => a.concat(b));

    geometry.addAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));

    let indices = [];
    let x = spline.length;

    for (let i = 0; i < vertices.length / 3; i++) {
        if (!i || (i+1) % x > 0) {
            if(i < x*divisions-x) {
                indices.push(i, i+x, i+1, i+x, i+x+1, i+1);
            } else if ( i > x*divisions-x-1) {
                indices.push(i, i%x, i+1, i%x, i%x+1, i+1);
            }
        }
    };

    geometry.setIndex(new BufferAttribute(new Uint8Array(indices), 1));

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

    return {
        vertices,
        geometry
    };
}

export function latheRepeat(
    splines,
    repeats,
    axis,
    capped,
    shapeFill1,
    shapeFill2,
    capFill
) {

    let splineCount = splines.length;
    let divisions = repeats * splineCount;
    let newSplines = []; //[][]
    let rotationInc = Math.PI * 2 / (divisions / 2);

    let s = new BufferGeometry({ flat: true });

    PShape s = createShape(GROUP);
    PShape body = createShape();

    if(divisions % splineCount != 0 || divisions < splineCount) {
        throw new IllegalArgumentException("Divisions must be multiple of splines");
    }

    float currentRot = rotationInc;

    for (int i = 0; i < divisions; i++) {
        System.arraycopy(splines[i % splineCount], 0, newSplines[i], 0, splines[i % splineCount].length);
        if (i != 0) {
            for(int j = 0; j < newSplines[i].length; j++) {
                newSplines[i][j] = newSplines[i][j].dup().rot(axis, currentRot);
            }
            if(i % 2 == 0) {
                currentRot += rotationInc;
            }
        }
    }

    body.setStroke(c3);
    body.setStrokeWeight(globalStrokeWeight);

    body.beginShape(QUADS);
        // body.fill(shapeFill);
        for (int l = 0; l < newSplines[0].length; l++) {
            float colorInterval = (float)l / (float)newSplines[0].length;
            body.fill(lerpColor(shapeFill1, shapeFill2, colorInterval ));
            if (l != 0) {
                for (int m = 1; m <= divisions; m++) {
                    int n = m == divisions ? 0 : m;
                    d.sVert(body, newSplines[n][l]);
                    d.sVert(body, newSplines[n][l-1]);
                    d.sVert(body, newSplines[m-1][l-1]);
                    d.sVert(body, newSplines[m-1][l]);
                }
            }
        }
    body.endShape();

    if (capped) {

        PShape bottom = createShape();
        PShape top = createShape();

        top.beginShape();
            top.fill(capFill);
            for (int n = 0; n < divisions; n++) {
                d.sVert(top, newSplines[n][0]);
            }
        top.endShape();
        bottom.beginShape();
            bottom.fill(capFill);
            for (int o = 0; o < divisions; o++) {
                d.sVert(bottom, newSplines[o][newSplines[0].length-1]);
            }
        bottom.endShape();
        s.addChild(top);
        s.addChild(bottom);
    }

    s.addChild(body);

    return s;

}


