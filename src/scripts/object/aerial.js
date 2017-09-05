'use strict';

import { Vector3, Mesh, MeshBasicMaterial } from 'three';
import { lathe, splineToVectorArray, latheRepeat } from  '../util/3dUtil'

export default function Aerial (
    length,
    width
) {
    let lathed = lathe(
        splineToVectorArray([
            [0, 0],
            [width, 0],
            [0, -length/8],
            [-width/5, -width/2],
            [-width/5, 0],
        ]),
        12, new Vector3(0, 0, 1), true
    );

    let mesh = new Mesh(lathed.geometry, new MeshBasicMaterial());

    return {
        geometry: lathed.geometry,
        mesh
    };

}
