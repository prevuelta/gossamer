'use strict';

import * as THREE from 'three';


// let Cross = require('./cross');

    //     let wireframe = new THREE.WireframeGeometry( geometry ); // or THREE.WireframeHelper
    // var line = new THREE.LineSegments( wireframe );
    // line.material.depthTest = false;
    // line.material.opacity = 0.5;
    // line.material.transparent = true;

    // mesh.add( line );


    // let markers = new THREE.Object3D();

    // geometry.vertices.forEach(f => {
    //     let cross = Cross(0.5);

    //     cross.position.x = f.x;
    //     cross.position.y = f.y;
    //     cross.position.z = f.z;

    //     markers.add(cross);
    // });

    // mesh.add(markers);;

        // var mS = (new THREE.Matrix4()).identity();
    //set -1 to the corresponding axis
    // mS.elements[0] = -1;
    // mS.elements[5] = -1;
    // mS.elements[10] = -1;

    // geometry.applyMatrix(mS);
    //mesh.applyMatrix(mS);
    //object.applyMatrix(mS);

export default {
    // marker (pos, weight = 0.5) {
    //     let cross = Cross(weight);

    //     cross.position.x = pos.x;
    //     cross.position.y = pos.y;
    //     cross.position.z = pos.z;

    //     return cross;
    // },
    normals (mesh) {
        return new THREE.VertexNormalsHelper( mesh );
    },
    boundingBox (mesh) {
        let helper = new THREE.BoundingBoxHelper(mesh, new THREE.Color(0xF0000));
        mesh.add(helper);
        helper.update();
    },
    wireframe (geometry) {
        let line = new THREE.LineSegments( new THREE.WireframeGeometry( geometry ), new THREE.LineBasicMaterial({
            opacity: 1,
            // color: 0xff2e1c,
            // color: 0x1a1a1a,
            color: 0xff0000,
            transparent: false
        }));
        // line.material.depthTest = false;
        // line.material.opacity = 0.5;
        // line.material.color = 0xFF0000;
        // line.material.transparent = true;
        return line;
    }
}
