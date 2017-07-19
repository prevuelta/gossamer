'use strict';

import * as THREE from 'three';

import OrbitControls from 'three-orbit-controls';
const orbitControls = OrbitControls(THREE);

const Helpers = require('./util/helpers');
const Util = require('./util/util');

let scene,
    camera,
    clock,
    renderer,
    mixer,
    mixers = [],
    rocks = [],
    controls;

function init () {

    scene = new THREE.Scene();
    // scene.add(new THREE.AxisHelper(50));
    clock = new THREE.Clock();

    camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 100;
    camera.position.y = 20;
    camera.target = new THREE.Vector3( 0, 0, 0 );

    for (let i = 0; i < ROCK_COUNT; i++) {

        let position = [Util.randomInt(-BOUNDS, BOUNDS), Util.randomInt(-BOUNDS, BOUNDS), Util.randomInt(-BOUNDS, BOUNDS)];
        let dist = new THREE.Vector3(...position).distanceTo(new THREE.Vector3(0,0,0));
        let size = 24/dist;

        let rock = Rock(size);

        rock.mesh.position.set(...position);
        // let wf = Helpers.wireframe(rock.geometry)
        // wf.position.set(...position);
        // scene.add(wf);
        // scene.add(Helpers.normals(rock));

        let mixer = new THREE.AnimationMixer(rock.mesh);
        let animation = mixer.clipAction(rock.clip);
        animation.setLoop( THREE.Loop );
        animation.play();
        rocks.push(rock);
        mixers.push(mixer);
        scene.add(rock.mesh);
    }

    controls = new orbitControls( camera );

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x1a1a1a, 1);
    document.body.appendChild( renderer.domElement );

}

window.addEventListener( 'resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

function animate () {
    let delta = clock.getDelta();
    mixers.forEach(m => m.update(delta));
    requestAnimationFrame(animate);
    render();
}

function render () {
    renderer.render( scene, camera );
}

init();
animate();
