'use strict';

import * as THREE from 'three';
import Measure from '../util/measure';
import { lathe, splineToVectorArray, latheRepeat } from  '../util/3dUtil'

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

     let spline1 = splineToVectorArray([
         [0, 0],
         [-hm.m(4), 0],
         [0, -hm.d(1.5)],
         [hm.u,-hm.u],
         [hm.d(6), 0],
         [0, -hm.d(6)],
         [-hm.d(15), 0],
         [hm.m(1.3), -hm.m(1.6)],
         [0, -hm.m(4)],
         [hm.d(3), 0],
         [0, hm.m(4)]
    ]);

    let spline2 = splineToVectorArray([
        [0, 0],
        [-hm.m(4), 0],
        [0, -hm.d(1.5)],
        [hm.u,-hm.u],
        [hm.d(6), 0],
        [0, -hm.d(6)],
        [-hm.d(15), 0],
        [hm.m(1.3), -hm.m(1.6)],
        [0, 0],
        [hm.d(3), 0],
        [0, 0]
    ]);

    console.log(spline1, spline1.slice());

    let repeatGeometry = latheRepeat(
        [
            spline1.slice(),
            spline1.slice(),
            spline2.slice(),
            spline2.slice()
        ],
        4,
        new THREE.Vector3(0, 0, 1),
        true
    );

    let mesh = new THREE.Mesh(lathed.geometry, new THREE.MeshBasicMaterial());
    let meshRepeat = new THREE.Mesh(repeatGeometry.geometry, new THREE.MeshBasicMaterial());

    return {
        geometry: lathed,
        mesh,
        meshRepeat
    }
}
