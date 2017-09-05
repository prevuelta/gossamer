'use strict';

import * as THREE from 'three';

import OrbitControls from 'three-orbit-controls';
const orbitControls = OrbitControls(THREE);

import Helpers from './util/helpers';
import Util from './util/util';

import Head from './object/head';

let scene,
    camera,
    renderer,
    controls;

function init () {

    scene = new THREE.Scene();
    // scene.add(new THREE.AxisHelper(50));

    camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 300;
    camera.position.y = 20;
    camera.target = new THREE.Vector3( 0, 0, 0 );

    controls = new orbitControls( camera );

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x1a1a1a, 1);

    let head = new Head();

    scene.add(head);

    // scene.add(Helpers.wireframe(head.mesh.geometry));
    // scene.add(Helpers.wireframe(head.meshRepeat.geometry));
    // scene.add(Helpers.normals(head.meshRepeat));

    document.body.appendChild( renderer.domElement );

}

window.addEventListener( 'resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

function animate () {
    requestAnimationFrame(animate);
    render();
}

function render () {
    renderer.render( scene, camera );
}

init();
animate();
