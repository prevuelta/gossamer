'use strict';

import * as THREE from 'three';
import Measure from '../util/measure';
import { lathe, splineToVectorArray } from  '../util/3dUtil'

export default function (
    direction = new THREE.Vector3(0, 1, 0),
    height = 100,
    radius = 10
) {
    let geometry = new THREE.Geometry();

    let hm = new Measure(Math.min(window.innerWidth, window.innerHeight) / (Math.sqrt(2) * 36)); 

    let headSpline = splineToVectorArray(
        [
            [hm.m(3), 0],
            [0, hm.d(4)],
            [-hm.d(3), 0],
            [0, hm.d(3)],
            [-hm.d(2), 0],
            [0, hm.d(1.5)],
            [-hm.d(1.5), hm.d(1.5)],
            [0, hm.d(2)],
            [-hm.d(6), 0],
            [0, -hm.u],
        ]
    );

    console.log(headSpline)

        // shape.addChild(lathe(
        //   headSpline,
        //   24,
        //   new IVec(0, 0, 1),
        //   true,
        //   c1,
        //   aC
        // ));

    // return {
    //     geometry,
    //     mesh
    // }
}
