'use strict';

import * as THREE from 'three';
import Measure from '../util/measure';
import { lathe, splineToVectorArray } from  '../util/3dUtil'

export default function (
    direction = new THREE.Vector3(0, 1, 0),
    height = 100,
    radius = 10
) {

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

    let lathed = lathe(headSpline, 16, new THREE.Vector3(0, 0, 1), true);

        // shape.addChild(lathe(
        //   headSpline,
        //   24,
        //   new IVec(0, 0, 1),
        //   true,
        //   c1,
        //   aC
        // ));
     IVec[] spline1 =  splineToVec(
            new int[][]{
                {0, 0},
                {-hm.m(4), 0},
                {0, -hm.d(1.5)},
                {hm.u,-hm.u},
                {hm.d(6), 0},
                {0, -hm.d(6)},
                {-hm.d(15), 0},
                {hm.m(1.3), -hm.m(1.6)},
                {0, -hm.m(4)},
                {hm.d(3), 0},
                {0, hm.m(4)}
            }
        );

        IVec[] spline2 =  splineToVec(
            new int[][]{
                {0, 0},
                {-hm.m(4), 0},
                {0, -hm.d(1.5)},
                {hm.u,-hm.u},
                {hm.d(6), 0},
                {0, -hm.d(6)},
                {-hm.d(15), 0},
                {hm.m(1.3), -hm.m(1.6)},
                {0, 0},
                {hm.d(3), 0},
                {0, 0}
            }
        );

        shape.addChild(latheRepeat(
            new IVec[][] {
                spline1.clone(),
                spline1.clone(),
                spline2.clone(),
                spline2.clone()
            },
            8,
            new IVec(0, 0, 1),
            true,
            c1,
            c2,
            aC
        ));


    let mesh = new THREE.Mesh(lathed.geometry, new THREE.MeshBasicMaterial());

    return {
        geometry: lathed,
        mesh
    }
}
