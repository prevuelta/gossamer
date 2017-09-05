'use strict'

import { ShaderMaterial } from 'three';
import frag from '../shaders/frag.shader';
import vert from '../shaders/vert.shader';

let material =  new ShaderMaterial( {
    uniforms: {
    },
    vertexShader: vert,
    fragmentShader: frag
});

export default {
    BASIC: material
};
