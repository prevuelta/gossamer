'use strict'

let frag = require('../shaders/spherefrag.shader');
let vert = require('../shaders/spherevert.shader');

let material =  new THREE.ShaderMaterial( {
    uniforms: {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() }
    },
    vertexShader: vert,
    fragmentShader: frag
});

module.exports = {
    BASIC: material
};
