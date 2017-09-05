'use strict';

import { Vector3, LineBasicMaterial, BufferGeometry, BufferAttribute, Line } from 'three';

const style = {
    color: 0xff0000,
};

export default function (...vertices) {

    let geometry = new BufferGeometry();
    let bufferVertices = vertices.reduce((a, b) => a.concat(b.toArray()), []);

    geometry.addAttribute('position', new BufferAttribute(new Float32Array(bufferVertices), 3));

    return new Line(geometry, new LineBasicMaterial(style));
};
