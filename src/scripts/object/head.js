'use strict';

import * as THREE from 'three';
import Measure from '../util/measure';
import Materials from '../util/materials';
import Aerial from './aerial';
import { lathe, splineToVectorArray, latheRepeat } from  '../util/3dUtil'

export default function (
    direction = new THREE.Vector3(0, 1, 0),
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

    let repeatGeometry = latheRepeat(
        [
            spline1.slice(),
            spline1.slice(),
            spline2.slice(),
            spline2.slice()
        ],
        8,
        new THREE.Vector3(0, 0, 1),
        true
    );

    let apex = new THREE.Vector3(0, 0, -hm.m(8));

    console.log(Materials);

    let group = new THREE.Mesh();

    // lathed.geometry.computeFaceNormals()t

    lathed.computeVertexNormals();

    let mesh = new THREE.Mesh(lathed, Materials.BASIC);
    // mesh.computeFaceNormals();
    // mesh.computeVerticeNormals();
    let aerial = Aerial(hm.m(8), hm.d(2));
    aerial.position.set(apex.x, apex.y, -hm.m(3.5));
    group.add(mesh);
    group.add(aerial);

    repeatGeometry.computeVertexNormals();

    let meshRepeat = new THREE.Mesh(repeatGeometry, Materials.BASIC);
    group.add(meshRepeat);

    return group;
}
